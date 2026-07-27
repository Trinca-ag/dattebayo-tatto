/**
 * Lê as dimensões intrínsecas de todo .webp em public/ e gera src/lib/image-sizes.ts.
 *
 *   node scripts/image-sizes.mjs
 *
 * Rodar sempre que fotos forem adicionadas/trocadas em public/artists ou public/studio.
 * Ter as dimensões em build-time deixa o next/image reservar o espaço certo (zero CLS)
 * sem precisar de `fill` + wrapper em cada foto do portfólio.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const OUT_FILE = join(ROOT, "src", "lib", "image-sizes.ts");

/** Extrai width/height de um buffer WebP lendo o chunk RIFF (VP8 | VP8L | VP8X). */
function webpSize(buf) {
  if (buf.length < 30) return null;
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  switch (buf.toString("ascii", 12, 16)) {
    case "VP8 ": // lossy
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    case "VP8L": {
      // lossless: 14 bits de largura e 14 de altura, ambos -1, logo após a assinatura 0x2f
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    case "VP8X": // extended: canvas de 24 bits, -1
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    default:
      return null;
  }
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.toLowerCase().endsWith(".webp")) out.push(p);
  }
  return out;
}

const files = walk(PUBLIC_DIR).sort();
const entries = [];
const failures = [];

for (const file of files) {
  const key = "/" + relative(PUBLIC_DIR, file).split(sep).join("/");
  const size = webpSize(readFileSync(file));
  if (size) entries.push([key, size]);
  else failures.push(key);
}

const body = entries.map(([k, s]) => `  "${k}": [${s.width}, ${s.height}],`).join("\n");

writeFileSync(
  OUT_FILE,
  `// GERADO AUTOMATICAMENTE — não editar à mão.
// Fonte: dimensões intrínsecas dos .webp em public/. Regenerar com \`npm run image-sizes\`.

export const IMAGE_SIZES: Record<string, readonly [number, number]> = {
${body}
};

export type Img = { src: string; width: number; height: number };

/** Resolve um caminho de /public para as props \`src\`/\`width\`/\`height\` do next/image. */
export function img(src: string): Img {
  const size = IMAGE_SIZES[src];
  // Fallback quadrado: mantém a página renderizável se um asset novo entrar antes de regenerar.
  return size ? { src, width: size[0], height: size[1] } : { src, width: 1080, height: 1080 };
}
`,
  "utf8",
);

console.log(`image-sizes: ${entries.length} arquivo(s) mapeado(s)${failures.length ? `, ${failures.length} ignorado(s): ${failures.join(", ")}` : ""}`);

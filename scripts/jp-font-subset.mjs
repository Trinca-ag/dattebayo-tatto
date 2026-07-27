/**
 * Baixa subsets mínimos da Zen Kaku Gothic New com exatamente os glifos japoneses
 * que o site usa, para src/app/fonts/.
 *
 *   node scripts/jp-font-subset.mjs
 *
 * Por que não `next/font/google`: o loader do Google no next/font não expõe o subset
 * japonês dessa família, então os kanji cairiam numa fonte de sistema. Pedindo a CSS
 * com `&text=`, o Google devolve um arquivo com só os caracteres pedidos — ~4,7 KB
 * por peso, contra vários MB da fonte CJK inteira.
 *
 * Ao usar um caractere japonês novo em algum componente, acrescente-o em GLYPHS e
 * rode o script de novo.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app", "fonts");

/** Todo caractere japonês que aparece na interface. */
const GLYPHS = [
  "だってばよ", // header, rodapé, hero da home, títulos de Sobre e Contato
  "タトゥー", // menu mobile
  "刺青", // hero de /tatuadores
  "連絡", // hero de /contato
  "侍", // CTA final da home
  "迷子", // página 404
  "物語尊重技術", // cards de filosofia em /sobre
  "改善", // bio do Thiago Kaizen
].join("");

const WEIGHTS = [400, 700, 900];

// A CSS v2 do Google só devolve woff2 para user agents modernos.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

mkdirSync(OUT_DIR, { recursive: true });

for (const weight of WEIGHTS) {
  const cssUrl =
    `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@${weight}` +
    `&text=${encodeURIComponent(GLYPHS)}`;

  const css = await fetch(cssUrl, { headers: { "User-Agent": UA } }).then((r) => {
    if (!r.ok) throw new Error(`CSS ${weight}: HTTP ${r.status}`);
    return r.text();
  });

  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`Peso ${weight}: não achei a URL da fonte na CSS retornada.`);

  const buf = Buffer.from(await fetch(fontUrl).then((r) => r.arrayBuffer()));
  if (buf.subarray(0, 4).toString("ascii") !== "wOF2") {
    throw new Error(`Peso ${weight}: o arquivo baixado não é WOFF2.`);
  }

  const out = join(OUT_DIR, `zen-kaku-${weight}.woff2`);
  writeFileSync(out, buf);
  console.log(`zen-kaku-${weight}.woff2 — ${buf.length} bytes`);
}

console.log(`\n${[...new Set(GLYPHS)].length} glifos únicos em ${WEIGHTS.length} pesos.`);

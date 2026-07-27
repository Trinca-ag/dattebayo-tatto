/**
 * Dattebayo Tattoo — dados reais dos 13 residentes (fonte única).
 *
 * Todo perfil, card e galeria deriva deste arquivo. Adicionar tatuador = +1 objeto em `RAW`.
 * `workCounts[i]` = nº de fotos do "Trabalho i+1"; obras com mais de uma foto viram
 * carrossel dentro do lightbox.
 *
 * Assets esperados em public/artists/<slug>/:
 *   perfil2.webp  → estado padrão do card (camiseta preta / fundo laranja)
 *   perfil.webp   → estado hover do card e retrato da página do artista (laranja / preto)
 *   w<obra>-<foto>.webp
 *
 * Depois de mexer nas fotos, rode `npm run image-sizes` para atualizar as dimensões.
 */
import { img, type Img } from "./image-sizes";

/** Categoria usada pelos chips de filtro em /tatuadores. */
export type ArtistCategory =
  | "Anime/Geek"
  | "Blackwork"
  | "Cybergoth"
  | "Cybertribal"
  | "Cute"
  | "Pixel Art";

/** Uma obra do portfólio: uma ou mais fotos do mesmo trabalho. */
export type Work = {
  /** Número da obra, 1-indexado (usado no badge e no contador do lightbox). */
  n: number;
  photos: Img[];
};

export type Artist = {
  slug: string;
  name: string;
  handle: string;
  ig: string;
  /** Rótulo livre do estilo, exibido no card e no perfil. */
  style: string;
  cat: ArtistCategory;
  /** Cor de destaque do artista (hex), usada em bordas, badges e brilhos. */
  theme: string;
  bio: string;
  temas: string;
  /** Índice 1-based na equipe — exibido como "[ 01 / 13 ]" no card. */
  idx: number;
  profile: Img;
  profileHover: Img;
  works: Work[];
};

type RawArtist = Omit<Artist, "idx" | "profile" | "profileHover" | "works"> & {
  workCounts: number[];
};

const RAW: RawArtist[] = [
  {
    slug: "ana-byte",
    name: "Ana Bitencourt",
    handle: "@ana.byte",
    ig: "https://www.instagram.com/ana.byte/",
    style: "Cybergoth Tattoos",
    cat: "Cybergoth",
    theme: "#E02EFF",
    bio: "Especialista em cybergoth, a Ana leva o lado mais dark do anime pra pele: traço marcado, atmosfera sombria e muita atitude alt. Se o seu projeto pede intensidade e estética de submundo, é com ela.",
    temas: "Personagens dark · lettering · estética alt",
    workCounts: [1, 1, 1, 1, 1, 4],
  },
  {
    slug: "a-aliotitattoo",
    name: "Andre Alioti",
    handle: "@a.aliotitattoo",
    ig: "https://instagram.com/a.aliotitattoo/",
    style: "Anime & Geek",
    cat: "Anime/Geek",
    theme: "#FF5C00",
    bio: "Anime e geek no sangue. O Andre curte transformar personagens e cenas favoritas em tatuagens com fidelidade de traço e a energia certeira de um bom frame de mangá. Fã tatuando pra fã.",
    temas: "Personagens de anime · cenas icônicas · color",
    workCounts: [1, 1, 1, 1, 1, 1],
  },
  {
    slug: "breny-ttt",
    name: "Breno Rodrigues",
    handle: "@breny.ttt",
    ig: "https://www.instagram.com/breny.ttt/",
    style: "Anime & Geek",
    cat: "Anime/Geek",
    theme: "#8C5BFF",
    bio: "Do shōnen ao seinen, o Breno domina o universo anime/geek com traço limpo e composições que respeitam a obra original. Traz o personagem preferido que ele resolve o resto.",
    temas: "Shōnen · retratos de personagens · blackwork anime",
    workCounts: [1, 1, 1, 1, 1, 1],
  },
  {
    slug: "brvnink",
    name: "Bruno Guimarães",
    handle: "@brvnink",
    ig: "https://www.instagram.com/brvnink/",
    style: "Blackwork",
    cat: "Blackwork",
    theme: "#FF7A1A",
    bio: "Blackwork puro: preto sólido, contraste alto e desenho que impõe presença. O Bruno aposta na força do preto pra criar peças gráficas, marcantes e atemporais.",
    temas: "Blackwork · gráfico · alto contraste",
    workCounts: [3, 2, 1, 2, 1, 1],
  },
  {
    slug: "gichanttt",
    name: "GI-CHAN",
    handle: "@gichanttt",
    ig: "https://www.instagram.com/gichanttt/",
    style: "Neo & Cybertribal · Anime/Geek",
    cat: "Cybertribal",
    theme: "#A855F7",
    bio: "Neo e cybertribal com alma geek. A GI-CHAN cria padrões simétricos, pontas agressivas e energia futurista — pra quem quer algo autoral que foge completamente do óbvio.",
    temas: "Cybertribal · neotribal · padrões autorais",
    workCounts: [2, 2, 2, 2, 2, 2],
  },
  {
    slug: "kahkillian",
    name: "Katherine Killian",
    handle: "@kahkillian",
    ig: "https://www.instagram.com/kahkillian/",
    style: "Anime & Geek",
    cat: "Anime/Geek",
    theme: "#FF7A1A",
    bio: "Pura shōnen energy. A Katherine tatua anime e geek com dinamismo, diagonais e aquele impacto de cena de luta. Ideal pra quem quer movimento e força na pele.",
    temas: "Shōnen · ação · personagens",
    workCounts: [1, 1, 1, 1, 1, 1],
  },
  {
    slug: "laura-arroz",
    name: "Laura Arroz",
    handle: "@laura.arroz",
    ig: "https://www.instagram.com/laura.arroz/",
    style: "Cute Tattoo",
    cat: "Cute",
    theme: "#C77DFF",
    bio: "Cute tattoo é a praia da Laura: personagens fofos, traço delicado e paleta afetuosa. Perfeita pra quem quer uma lembrança meiga do que ama, sem abrir mão do capricho.",
    temas: "Cute · pets · personagens fofos · color",
    workCounts: [2, 1, 2, 1, 1, 2],
  },
  {
    slug: "luahermanni",
    name: "Lua Hermanni",
    handle: "@luahermanni",
    ig: "https://www.instagram.com/luahermanni/",
    style: "Ragnarok & Pixel Art",
    cat: "Pixel Art",
    theme: "#FF5C00",
    bio: "Nostalgia gamer na veia. A Lua manda bem em pixel art e no universo de Ragnarok — dá pra levar aquele item, sprite ou boss favorito pra pele com o carinho de quem também joga.",
    temas: "Pixel art · Ragnarok · itens & sprites",
    workCounts: [2, 2, 2, 2, 1, 2],
  },
  {
    slug: "miasminha-ink",
    name: "Lucas Sena",
    handle: "@miasminha_ink",
    ig: "https://www.instagram.com/miasminha_ink/",
    style: "Gaming & Anime",
    cat: "Anime/Geek",
    theme: "#8C5BFF",
    bio: "Gaming e anime são o terreno do Lucas: personagens, HUDs e referências que todo player reconhece na hora. Um verdadeiro fã que fala a sua língua na hora de criar.",
    temas: "Games · anime · referências pop",
    workCounts: [3, 1, 2, 1, 1, 1],
  },
  {
    slug: "luistattooer",
    name: "Luis Ronchi",
    handle: "@luistattooer",
    ig: "https://www.instagram.com/luistattooer/",
    style: "Blackwork & Anime/Geek",
    cat: "Blackwork",
    theme: "#FF5C00",
    bio: "Meio blackwork, meio anime — o Luis costura o preto pesado do gráfico com a expressividade dos personagens. Contraste forte e composição autoral são a marca dele.",
    temas: "Blackwork · anime · composição autoral",
    workCounts: [3, 1, 1, 1, 1, 1],
  },
  {
    slug: "matzz-ink",
    name: "Matt Carvalho",
    handle: "@matzz.ink",
    ig: "https://www.instagram.com/matzz.ink/",
    style: "Anime & Geek",
    cat: "Anime/Geek",
    theme: "#FF7A1A",
    bio: "Street-anime com pegada de quem viveu a cultura. O Matt traz personagens e referências geek com um toque urbano e muita personalidade no traço.",
    temas: "Anime · street · cultura pop",
    workCounts: [1, 1, 1, 1, 1, 1],
  },
  {
    slug: "honeyblt",
    name: "Nathalie",
    handle: "@honeyblt",
    ig: "https://www.instagram.com/honeyblt/",
    style: "Anime & Geek",
    cat: "Anime/Geek",
    theme: "#A855F7",
    bio: "Doce e elétrica: a Nathalie tatua anime e geek com cor vibrante e clima slice-of-life. Pra quem quer aquela cena querida em fullcolor, cheia de vida.",
    temas: "Anime · fullcolor · slice-of-life",
    workCounts: [2, 2, 3, 1, 1, 1],
  },
  {
    slug: "thiagokaizen",
    name: "Thiago Kaizen",
    handle: "@thiagokaizen_",
    ig: "https://www.instagram.com/thiagokaizen_/",
    style: "Anime Tattoos • Geek",
    cat: "Anime/Geek",
    theme: "#FF5C00",
    bio: "Anime com espírito japonês clássico-moderno. O Thiago (改善, kaizen = melhoria contínua) capricha em cada linha, honrando a obra com traço firme e composição equilibrada.",
    temas: "Anime · linhas firmes · estética japonesa",
    workCounts: [1, 1, 1, 1, 1, 1],
  },
];

/** Os 13 residentes, com caminhos de imagem e dimensões já resolvidos. */
export const ARTISTS: Artist[] = RAW.map(({ workCounts, ...artist }, i) => {
  const base = `/artists/${artist.slug}`;
  return {
    ...artist,
    idx: i + 1,
    profile: img(`${base}/perfil2.webp`),
    profileHover: img(`${base}/perfil.webp`),
    works: workCounts.map((count, w) => ({
      n: w + 1,
      photos: Array.from({ length: count }, (_, p) => img(`${base}/w${w + 1}-${p + 1}.webp`)),
    })),
  };
});

export const ARTIST_COUNT = ARTISTS.length;

/** Ordem dos chips de filtro em /tatuadores. */
export const CATEGORIES: readonly ArtistCategory[] = [
  "Anime/Geek",
  "Blackwork",
  "Cybergoth",
  "Cybertribal",
  "Cute",
  "Pixel Art",
];

export function bySlug(slug: string): Artist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}

/** Vizinhos circulares, para a navegação anterior/próximo do perfil. */
export function neighbours(slug: string): { prev: Artist; next: Artist } | null {
  const i = ARTISTS.findIndex((a) => a.slug === slug);
  if (i < 0) return null;
  const n = ARTISTS.length;
  return { prev: ARTISTS[(i - 1 + n) % n], next: ARTISTS[(i + 1) % n] };
}

/** Achata as obras de um artista numa lista linear de fotos para o lightbox. */
export type FlatPhoto = Img & {
  /** Número da obra a que a foto pertence. */
  workN: number;
  /** Índice da foto dentro da obra (0-based). */
  photoIdx: number;
  /** Total de fotos da obra. */
  workTotal: number;
};

export function flattenWorks(artist: Artist): FlatPhoto[] {
  return artist.works.flatMap((work) =>
    work.photos.map((photo, photoIdx) => ({
      ...photo,
      workN: work.n,
      photoIdx,
      workTotal: work.photos.length,
    })),
  );
}

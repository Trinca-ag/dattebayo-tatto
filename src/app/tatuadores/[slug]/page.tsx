import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortfolioGallery } from "@/components/artista/PortfolioGallery";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SolidCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { ARTISTS, bySlug, neighbours, type Artist } from "@/lib/artists";
import { hexA, safeAccent } from "@/lib/color";
import { waLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** Máscara dupla que apaga as bordas do brilho do hero (topo/base e laterais). */
const HERO_MASK =
  "linear-gradient(to bottom,transparent 0,#000 34%,#000 66%,transparent 100%), linear-gradient(to right,transparent 0,#000 20%,#000 82%,transparent 100%)";

const FICHA_LABEL = "font-mono text-dim text-[9.5px] leading-none font-bold tracking-[.14em]";

export async function generateStaticParams() {
  return ARTISTS.map((artist) => ({ slug: artist.slug }));
}

/** Corta a bio num limite de palavra para caber numa meta description. */
function metaDescription(bio: string): string {
  if (bio.length <= 155) return bio;
  const cut = bio.slice(0, 155);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const artist = bySlug(slug);
  if (!artist) return { title: "Tatuador(a) não encontrado(a)" };

  const title = `${artist.name} — Tatuador(a) ${artist.style}`;
  const description = metaDescription(artist.bio);
  const url = `/tatuadores/${artist.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      images: [artist.profileHover.src],
    },
  };
}

export default async function ArtistaPage({ params }: Params) {
  const { slug } = await params;
  const artist = bySlug(slug);
  if (!artist) notFound();

  const around = neighbours(artist.slug);
  if (!around) notFound();

  const accent = safeAccent(artist.theme);
  const glow = hexA(accent, 0.5);
  const firstName = artist.name.split(" ")[0];

  return (
    <main>
      <nav
        aria-label="Trilha de navegação"
        className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] pt-[clamp(96px,14vh,128px)]"
      >
        <p className="font-mono text-dim text-[10px] leading-none font-bold tracking-[.14em]">
          <Link
            href="/tatuadores"
            className="text-dim hover:text-bone no-underline transition-colors"
          >
            TATUADORES
          </Link>{" "}
          <span className="text-[#3a3a3a]">/</span>{" "}
          <span style={{ color: accent }}>{artist.slug.toUpperCase()}</span>
        </p>
      </nav>

      <section aria-label="Perfil" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: HERO_MASK,
            maskImage: HERO_MASK,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          <div
            className="animate-orb absolute top-[-30%] right-[-6%] h-[160%] w-[76%] rounded-full blur-[40px] will-change-transform"
            style={{
              background: `radial-gradient(closest-side, ${hexA(accent, 0.26)}, ${hexA(accent, 0.1)} 55%, transparent 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(26px,5vw,56px)] px-[clamp(18px,4vw,40px)] pt-[clamp(26px,4vw,44px)] pb-[clamp(40px,6vw,70px)]">
          <Reveal className="relative">
            {/* O `heroFrame` do protótipo declara `maxWidth` duas vezes no mesmo objeto
                literal; a segunda (440px) sobrescreve o `clamp(260px,32vw,400px)` já na
                criação do objeto, então o clamp nunca chegou a valer. Vale o 440px. */}
            <div
              className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-[18px]"
              style={{
                border: `1px solid ${hexA(accent, 0.4)}`,
                boxShadow: `0 0 60px -12px ${glow}, 0 30px 70px -30px rgba(0,0,0,.9)`,
              }}
            >
              <Image
                src={artist.profileHover.src}
                width={artist.profileHover.width}
                height={artist.profileHover.height}
                alt={`Retrato de ${artist.name}, tatuador(a) ${artist.style} da Dattebayo`}
                preload
                sizes="(min-width: 1000px) 440px, (min-width: 640px) 50vw, 100vw"
                className="bg-surface block h-full w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 h-[26px] w-[26px] rounded-tl-[4px]"
                style={{ borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}
              />
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 h-[26px] w-[26px] rounded-br-[4px]"
                style={{ borderRight: `2px solid ${accent}`, borderBottom: `2px solid ${accent}` }}
              />
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p
              className="font-mono inline-block rounded-full px-3 py-[7px] text-[11px] leading-none font-bold tracking-[.16em] uppercase"
              style={{
                color: accent,
                border: `1px solid ${hexA(accent, 0.35)}`,
                background: hexA(accent, 0.08),
              }}
            >
              {artist.style}
            </p>
            <h1 className="font-display mt-2 text-[clamp(40px,7vw,80px)] leading-[.9] font-bold tracking-[-.03em]">
              {artist.name}
            </h1>
            <p className="font-mono text-ash mt-3.5 text-[13px] tracking-[.06em]">
              {artist.handle}
            </p>

            <div className="mt-[26px] flex flex-wrap gap-3">
              <SolidCta
                size="sm"
                external
                href={waLink(
                  `Olá! Vim pelo site e quero agendar uma tatuagem com ${artist.name} (${artist.handle}) 🧡`,
                )}
              >
                Agendar com {firstName}
              </SolidCta>
              <a
                href={artist.ig}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Seguir ${artist.name} no Instagram (nova aba)`}
                className="font-display text-bone inline-flex items-center gap-2 rounded-full bg-white/3 px-5 py-[13px] text-sm font-semibold no-underline transition-colors hover:bg-white/6"
                style={{ border: `1px solid ${hexA(accent, 0.5)}` }}
              >
                <InstagramIcon size={17} /> Seguir no Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Sobre o artista"
        className="px-[clamp(18px,4vw,40px)] pt-[clamp(20px,3vw,30px)] pb-[clamp(50px,7vw,80px)]"
      >
        {/* O original usava 1.5fr 1fr em qualquer largura; no celular as colunas ficavam
            estreitas demais, então a ficha só sai do fluxo a partir de 640px. */}
        <Reveal className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-[clamp(26px,5vw,52px)] sm:grid-cols-[1.5fr_1fr]">
          <p className="text-bone-soft max-w-[34ch] text-[clamp(17px,2.4vw,22px)] leading-[1.6] font-normal">
            {artist.bio}
          </p>
          <div className="pl-[18px]" style={{ borderLeft: `2px solid ${accent}` }}>
            <div className="mb-4">
              <p className={FICHA_LABEL}>ESTILO</p>
              <p className="text-bone mt-1 text-[14.5px] font-semibold">{artist.style}</p>
            </div>
            <div className="mb-4">
              <p className={FICHA_LABEL}>TEMAS QUE MAIS TATUA</p>
              <p className="text-bone mt-1 text-[14.5px] font-semibold">{artist.temas}</p>
            </div>
            <div>
              <p className={FICHA_LABEL}>DISPONIBILIDADE</p>
              <p className="text-bone mt-1 text-[14.5px] font-semibold">
                Agenda aberta — consulte via WhatsApp
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-label="Portfólio"
        className="border-t border-white/6 px-[clamp(18px,4vw,40px)] pt-[clamp(40px,6vw,70px)] pb-[clamp(56px,8vw,100px)]"
      >
        <div className="mx-auto max-w-[1200px]">
          <h2 className="sr-only">Portfólio de {artist.name}</h2>
          <Reveal className="mb-7">
            <Eyebrow accent={accent}>PORTFÓLIO — 6 TRABALHOS</Eyebrow>
          </Reveal>
          <PortfolioGallery artist={artist} />
        </div>
      </section>

      <nav aria-label="Navegar entre artistas" className="bg-ink-soft border-t border-white/8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3.5 px-[clamp(18px,4vw,40px)] py-6">
          <NeighbourLink artist={around.prev} accent={accent} dir="prev" />
          <NeighbourLink artist={around.next} accent={accent} dir="next" />
        </div>
      </nav>
      {/* A conversa já começa com o nome do artista desta página. */}
      <WhatsAppFab
        message={`Olá! Vim pelo site e quero agendar uma tatuagem com ${artist.name} (${artist.handle}) 🧡`}
      />
    </main>
  );
}

/** Um dos dois atalhos do rodapé do perfil: seta, miniatura e nome do vizinho. */
function NeighbourLink({
  artist,
  accent,
  dir,
}: {
  artist: Artist;
  accent: string;
  dir: "prev" | "next";
}) {
  const isNext = dir === "next";
  const label = isNext ? "PRÓXIMO" : "ANTERIOR";
  const arrow = (
    <span aria-hidden="true" className="text-[22px] leading-none" style={{ color: accent }}>
      {isNext ? "→" : "←"}
    </span>
  );
  const thumb = (
    <Image
      src={artist.profile.src}
      width={52}
      height={52}
      alt=""
      className="h-[52px] w-[52px] rounded-[10px] border border-white/10 object-cover"
    />
  );
  const text = (
    <span>
      <span className="font-mono text-dim block text-[9px] leading-none font-bold tracking-[.14em]">
        {label}
      </span>
      <span className="font-display text-bone mt-1 block text-base font-bold">{artist.name}</span>
    </span>
  );

  const align = isNext ? "justify-end text-right" : "";

  return (
    <Link
      href={`/tatuadores/${artist.slug}`}
      className={`flex min-w-[180px] flex-1 items-center gap-3.5 no-underline transition-opacity hover:opacity-80 ${align}`}
    >
      {isNext ? (
        <>
          {text}
          {thumb}
          {arrow}
        </>
      ) : (
        <>
          {arrow}
          {thumb}
          {text}
        </>
      )}
    </Link>
  );
}

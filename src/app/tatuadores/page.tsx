import type { Metadata } from "next";

import { ArtistGrid } from "@/components/tatuadores/ArtistGrid";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SolidCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ARTISTS, ARTIST_COUNT } from "@/lib/artists";
import { waLink } from "@/lib/site";

const TITLE = "Tatuadores — 13 artistas especialistas em anime, geek e blackwork";
const DESCRIPTION =
  "Conheça os 13 tatuadores da Dattebayo Tattoo: especialistas em anime, geek, blackwork, cybergoth, pixel art, cute e cybertribal na Liberdade, SP.";

export const metadata: Metadata = {
  // O template do layout já acrescenta " | Dattebayo Tattoo".
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tatuadores" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/tatuadores",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TatuadoresPage() {
  return (
    <main>
      <section
        aria-label="Tatuadores"
        className="relative overflow-hidden px-[clamp(18px,4vw,40px)] pt-[clamp(120px,17vh,170px)] pb-[clamp(30px,4vw,44px)]"
      >
        {/* A cor/sombra estáticas são o estado aceso: é o que vale para quem pede
            menos movimento, quando o CSS global corta a animação `dbNeon`. */}
        <span
          lang="ja"
          aria-hidden="true"
          className="font-jp animate-neon pointer-events-none absolute top-[22%] right-[-2vw] text-[22vw] leading-[.8] font-black text-[rgba(255,122,26,.26)] [text-shadow:0_0_18px_rgba(255,92,0,.5),0_0_60px_rgba(255,92,0,.3)] select-none"
        >
          刺青
        </span>

        <Reveal className="relative mx-auto max-w-[1280px]">
          <Eyebrow className="mb-[18px]" dashWidth={38}>
            A EQUIPE — [ {ARTIST_COUNT} ]
          </Eyebrow>
          <h1 className="font-display max-w-[16ch] text-[clamp(38px,7vw,88px)] leading-[.92] font-bold tracking-[-.03em] uppercase">
            {ARTIST_COUNT} artistas.
            <br />
            Cada um, <span className="text-gradient-brand">um universo.</span>
          </h1>
          <p className="text-mist mt-[22px] max-w-[540px] text-[clamp(15px,2.2vw,18px)] leading-[1.6]">
            Passe o mouse em cada card: preto vira laranja, laranja vira preto — o negativo da marca.
            Clique para ver o portfólio completo.
          </p>
        </Reveal>
      </section>

      <ArtistGrid artists={ARTISTS} />

      <Reveal
        as="section"
        className="border-t border-white/6 px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)]"
      >
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-display mb-3 text-[clamp(26px,4.4vw,46px)] font-bold tracking-[-.02em]">
            Achou seu artista?
          </h2>
          <p className="text-ash mb-[26px] text-[15px]">
            Chama no WhatsApp com sua ideia — a gente indica o melhor artista pro seu projeto.
          </p>
          <SolidCta href={waLink()} external size="md">
            Agendar pelo WhatsApp
          </SolidCta>
        </div>
      </Reveal>
      <WhatsAppFab />
    </main>
  );
}

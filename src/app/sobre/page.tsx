import type { Metadata } from "next";
import Image from "next/image";

import { StudioGallery } from "@/components/sobre/StudioGallery";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { GhostCta, SolidCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/image-sizes";
import { INFO, waLink } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` porque o título original já traz o nome do estúdio — o template do layout duplicaria.
  title: {
    absolute: "Sobre o Estúdio | Dattebayo Tattoo — Liberdade, São Paulo",
  },
  description:
    "A história da Dattebayo Tattoo — um estúdio dedicado à cultura anime e geek no coração da Liberdade, São Paulo. Arte autoral, biossegurança e experiência imersiva.",
  alternates: { canonical: "/sobre" },
};

const HERO = img("/studio/lo1.webp");
const FOTO_AMBIENTE = img("/studio/lo2.webp");
const FOTO_FIGURES = img("/studio/lo3.webp");

const FILOSOFIA = [
  {
    kanji: "物語",
    titulo: "Arte que conta a sua história",
    texto: "Cada tatuagem é um capítulo da jornada de quem a carrega. A gente desenha pra durar.",
  },
  {
    kanji: "尊重",
    titulo: "Respeito à cultura",
    texto: "Referências tratadas com fidelidade e carinho de quem também é fã da obra.",
  },
  {
    kanji: "技術",
    titulo: "Excelência técnica",
    texto:
      "Artistas especialistas em cada estilo — do blackwork ao pixel art, do cute ao cybergoth.",
  },
];

export default function SobrePage() {
  return (
    <main>
      <section aria-label="Sobre" className="relative flex min-h-[72svh] items-end overflow-hidden">
        <Image
          src={HERO.src}
          width={HERO.width}
          height={HERO.height}
          alt="Parede de arte de anime emoldurada no estúdio Dattebayo"
          preload
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.6),rgba(10,10,11,.4)_40%,#0A0A0B)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_30%,rgba(255,92,0,.22),transparent_60%)]"
        />
        <div className="relative mx-auto w-full max-w-[1100px] px-[clamp(18px,4vw,40px)] pb-[clamp(50px,8vh,90px)]">
          <Eyebrow dashWidth={38} className="mb-[18px]">
            NOSSA HISTÓRIA
          </Eyebrow>
          <h1 className="font-display max-w-[18ch] text-[clamp(38px,7vw,86px)] leading-[.92] font-bold tracking-[-.03em]">
            <span lang="ja" className="font-jp text-brand-light">
              だってばよ.
            </span>
            <br />A palavra que virou estúdio.
          </h1>
        </div>
      </section>

      <section
        aria-label="História"
        className="px-[clamp(18px,4vw,40px)] py-[clamp(60px,9vw,120px)]"
      >
        {/* TODO(estúdio): confirmar ano de fundação, fundadores e marcos reais. */}
        <div className="mx-auto grid max-w-[1100px] gap-[clamp(30px,5vw,60px)]">
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(24px,4vw,48px)]">
            <div>
              <h2 className="font-display mb-4 text-[clamp(26px,4vw,42px)] leading-none font-bold tracking-[-.02em]">
                Nascida da cultura, feita por fãs
              </h2>
              <p className="text-mist mb-3.5 text-base leading-[1.7]">
                &ldquo;Dattebayo&rdquo; é o bordão do Naruto — e diz tudo sobre o nosso DNA. A
                Dattebayo é um estúdio para quem vive anime, mangá, games e cultura geek, no bairro
                que é o coração da cultura japonesa no Brasil: a Liberdade.
              </p>
              <p className="text-mist text-base leading-[1.7]">
                Reunimos 13 artistas residentes, cada um com um estilo próprio, num espaço que é
                metade galeria de arte geek, metade living gamer.
              </p>
            </div>
            <Image
              src={FOTO_AMBIENTE.src}
              width={FOTO_AMBIENTE.width}
              height={FOTO_AMBIENTE.height}
              alt="Ambiente do estúdio com colecionáveis e plantas"
              sizes="(min-width: 1180px) 526px, (min-width: 660px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </Reveal>

          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(24px,4vw,48px)]">
            <Image
              src={FOTO_FIGURES.src}
              width={FOTO_FIGURES.width}
              height={FOTO_FIGURES.height}
              alt="Estantes com action figures no estúdio Dattebayo"
              sizes="(min-width: 1180px) 526px, (min-width: 660px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-display mb-4 text-[clamp(26px,4vw,42px)] leading-none font-bold tracking-[-.02em]">
                Um ambiente que é destino
              </h2>
              <p className="text-mist text-base leading-[1.7]">
                Tijolo aparente, preto fosco, parquet de madeira e neon em trilho. Quadros autorais
                de Naruto, Demon Slayer, Attack on Titan e Jujutsu Kaisen dividem parede com{" "}
                <span lang="ja" className="font-jp">
                  だってばよ
                </span>
                . Tem figures, bonsai, sofá, café na chegada e um terraço grafitado com a bandeira
                do One Piece.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Filosofia"
        className="border-t border-white/6 px-[clamp(18px,4vw,40px)] py-[clamp(56px,8vw,100px)]"
      >
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-[30px]">
            <Eyebrow>FILOSOFIA · MISSÃO · VALORES</Eyebrow>
          </Reveal>
          <Reveal delay={80} className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {FILOSOFIA.map((item) => (
              <div
                key={item.kanji}
                className="bg-surface rounded-2xl border border-white/9 px-6 py-7"
              >
                <div aria-hidden="true" className="font-jp text-brand-light mb-3.5 text-2xl">
                  {item.kanji}
                </div>
                <h3 className="font-display mb-2 text-xl font-bold">{item.titulo}</h3>
                <p className="text-ash text-[14.5px] leading-[1.65]">{item.texto}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        aria-label="O espaço"
        className="px-[clamp(18px,4vw,40px)] py-[clamp(56px,8vw,100px)]"
      >
        <div className="mx-auto max-w-[1100px]">
          <StudioGallery />
        </div>
      </section>

      <section
        aria-label="Visite"
        className="relative overflow-hidden border-t border-white/6 px-[clamp(18px,4vw,40px)] pt-[clamp(72px,11vw,150px)] pb-[clamp(64px,9vw,120px)] text-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-cta-glow absolute top-1/2 left-1/2 -mt-[75%] -ml-[50%] h-[150%] w-[min(1000px,120%)] rounded-full bg-[radial-gradient(closest-side,rgba(255,92,0,.22),rgba(255,92,0,.07)_55%,transparent_100%)] blur-[30px]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_40%,#0A0A0B_100%)]" />
        </div>
        <Reveal className="relative mx-auto max-w-[820px]">
          <div className="font-mono text-brand-light mb-5 text-[11px] leading-none font-bold tracking-[.24em]">
            VISITA SEM COMPROMISSO
          </div>
          <h2 className="font-display text-[clamp(32px,5.6vw,62px)] leading-none font-bold tracking-[-.03em] text-balance">
            Vem conhecer o estúdio
          </h2>
          <p className="text-mist mx-auto mt-[22px] max-w-[56ch] text-[clamp(15px,2.1vw,17.5px)] leading-[1.7] text-pretty">
            Agende uma visita para conhecer o espaço, conversar sobre o seu projeto e escolher o
            artista entre os 13 residentes. Definimos juntos referências, tamanho, local e orçamento
            antes de marcar a sessão.
          </p>
          <div className="mt-[34px] flex flex-wrap justify-center gap-3.5">
            <SolidCta href={waLink()} size="lg" external shine>
              Agendar pelo WhatsApp
            </SolidCta>
            <GhostCta href="/tatuadores" size="lg">
              Ver os 13 tatuadores
            </GhostCta>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px max-w-[340px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)]"
          />
          <div className="text-dim font-mono mt-[22px] flex flex-wrap justify-center gap-x-[26px] gap-y-2.5 text-[12.5px] leading-[1.6] tracking-[.08em]">
            <a
              href={INFO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash no-underline transition-colors hover:text-brand-light"
            >
              {INFO.addrShort} ↗
            </a>
            <span>{INFO.hoursShort}</span>
          </div>
        </Reveal>
      </section>
      <WhatsAppFab />
    </main>
  );
}

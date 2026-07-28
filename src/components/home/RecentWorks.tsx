"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { GhostCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { ARTISTS } from "@/lib/artists";
import type { Img } from "@/lib/image-sizes";
import { REDUCED_MOTION_QUERY, prefersReducedMotion } from "@/lib/motion";

type RecentPhoto = Img & { artistName: string; slug: string };

/**
 * Índice da obra usada como amostra na home (padrão: a primeira, 0).
 * Exceção: a 1ª obra do Luis é uma peça de peito quase idêntica à do Bruno —
 * lado a lado parecem a mesma tatuagem repetida, então mostramos outra obra dele.
 */
const SAMPLE_WORK: Record<string, number> = {
  luistattooer: 3, // Ryuk (Death Note), no lugar da peça de peito duplicada
};

/** Uma amostra por artista: a primeira foto da obra escolhida do portfólio. */
const RECENT: RecentPhoto[] = ARTISTS.map((artist) => ({
  ...artist.works[SAMPLE_WORK[artist.slug] ?? 0].photos[0],
  artistName: artist.name,
  slug: artist.slug,
}));

/**
 * No mobile as fotos passam uma de cada vez, então mostrar as 13 renderia uma
 * seção de dez telas: paramos em 8 e o resto fica a um toque em /tatuadores.
 */
const STACK_COUNT = 8;
const STACK = RECENT.slice(0, STACK_COUNT);

/** Rolagem gasta por foto, em svh — quanto maior, mais lento o arremesso. */
const STACK_RUNWAY = 78;

/** Fração de rolagem extra com a última foto parada, antes do palco soltar. */
const STACK_TAIL = 0.35;

/** Altura total da pista: uma tela para o palco preso + a rolagem das fotos. */
const STACK_HEIGHT = `${(STACK_COUNT - 1 + STACK_TAIL) * STACK_RUNWAY + 100}svh`;

const altFor = (photo: RecentPhoto) => `Tatuagem por ${photo.artistName} — Dattebayo Tattoo`;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const pad = (n: number) => String(n).padStart(2, "0");

const BADGE =
  "text-bone absolute bottom-2.5 left-2.5 rounded-[7px] border border-white/14 bg-[rgba(10,10,11,.6)] px-[9px] py-1.5 font-mono text-[10px] leading-none font-bold tracking-[.08em] backdrop-blur-[6px]";

export function RecentWorks() {
  const [index, setIndex] = useState<number | null>(null);

  const stackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  // Pilha do mobile: enquanto o palco está preso na tela, a rolagem vira a
  // posição das fotos. Tudo direto no DOM — um `setState` por frame de scroll
  // custaria caro e não muda nada do que o React precisa saber.
  useEffect(() => {
    const stack = stackRef.current;
    const stage = stageRef.current;
    if (!stack || !stage) return;

    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".work-card"));
    const small = window.matchMedia("(max-width: 639px)");
    const still = window.matchMedia(REDUCED_MOTION_QUERY);

    let frame = 0;
    let on = false;

    const paint = () => {
      frame = 0;

      const rect = stack.getBoundingClientRect();
      const span = rect.height - stage.offsetHeight; // rolagem com o palco preso
      const progress = span > 0 ? clamp01(-rect.top / span) : 0;

      // Foto atual em ponto flutuante: a parte inteira diz qual está na frente,
      // a fracionária, o quanto ela já foi arremessada.
      const current = Math.min(progress * (STACK_COUNT - 1 + STACK_TAIL), STACK_COUNT - 1);
      const active = Math.min(STACK_COUNT - 1, Math.round(current));

      cards.forEach((card, i) => {
        const u = current - i;
        const out = clamp01(u); // 0 = parada na frente, 1 = já saiu por cima
        const up = clamp01(u + 1); // 0 = fundo da pilha, 1 = assumiu a frente
        const thrown = out * out; // sai acelerando, como se fosse jogada
        const scale = (0.9 + 0.1 * up) * (1 - 0.05 * thrown);

        card.style.transform = `translate3d(0, ${-138 * thrown}%, 0) rotate(${-7 * thrown}deg) scale(${scale})`;
        // O fade só entra no fim do arremesso, quando a foto já saiu de cima da
        // próxima: apagando antes, as duas apareceriam sobrepostas.
        card.style.opacity = `${out < 0.7 ? 1 : clamp01((1 - out) / 0.3)}`;
        // Só a foto da frente recebe toque: as outras ocupam a mesma célula.
        card.style.pointerEvents = i === active ? "auto" : "none";
      });

      const count = countRef.current;
      if (count) count.textContent = `${pad(active + 1)} / ${pad(STACK_COUNT)}`;
    };

    const reset = () => {
      for (const card of cards) {
        card.style.transform = "";
        card.style.opacity = "";
        card.style.pointerEvents = "";
      }
    };

    const onScroll = () => {
      if (!on || frame) return;
      frame = requestAnimationFrame(paint);
    };

    // Fora do mobile (ou com "menos movimento" ligado) a pilha volta a ser a
    // coluna simples que o HTML já entrega.
    const sync = () => {
      const next = small.matches && !prefersReducedMotion();
      if (next !== on) {
        on = next;
        if (on) stack.dataset.stack = "on";
        else {
          delete stack.dataset.stack;
          reset();
        }
      }
      if (on) paint();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    small.addEventListener("change", sync);
    still.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      small.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
      delete stack.dataset.stack;
      reset();
    };
  }, []);

  // O mesmo título serve às duas versões — no desktop ele encabeça o mosaico, no
  // mobile mora dentro do palco. Só uma das duas árvores existe por vez (a outra
  // fica em `display: none`), então a página nunca tem dois h2 visíveis.
  const heading = (
    <div>
      <Eyebrow className="mb-4">TRABALHOS RECENTES</Eyebrow>
      <h2 className="font-display text-[clamp(30px,5vw,56px)] leading-[.98] font-bold tracking-[-.025em]">
        Tinta fresca na Liberdade
      </h2>
    </div>
  );

  return (
    <section aria-label="Trabalhos recentes" className="py-[clamp(56px,8vw,100px)]">
      {/* Do `sm` para cima: título, CTA e mosaico. */}
      <Reveal className="mx-auto hidden max-w-[1280px] px-[clamp(18px,4vw,40px)] sm:block">
        <div className="mb-[34px] flex flex-wrap items-end justify-between gap-5">
          {heading}
          <GhostCta href="/tatuadores" size="sm" className="whitespace-nowrap">
            Explorar por artista
          </GhostCta>
        </div>

        <div className="columns-[240px] gap-4">
          {RECENT.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              className="relative mb-4 block w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 break-inside-avoid"
            >
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={altFor(photo)}
                sizes="300px"
                className="block h-auto w-full rounded-xl"
              />
              <span className={BADGE}>{photo.artistName}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Mobile: uma foto por vez. O palco fica preso na tela — título em cima,
          contador e CTA embaixo — enquanto a rolagem arremessa a foto da frente
          para cima e descobre a de baixo. */}
      <div
        ref={stackRef}
        className="work-stack mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)] sm:hidden"
        style={{ "--stack-height": STACK_HEIGHT } as React.CSSProperties}
      >
        <div ref={stageRef} className="work-stage relative">
          <div className="work-head mb-6">{heading}</div>

          {STACK.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              style={{ zIndex: STACK_COUNT - i }}
              className="work-card relative mb-4 block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-transparent p-0 shadow-[0_24px_60px_-20px_rgba(0,0,0,.9)]"
            >
              <Image
                src={photo.src}
                alt={altFor(photo)}
                fill
                sizes="(max-width: 480px) 100vw, 480px"
                className="object-cover"
              />
              <span className={BADGE}>{photo.artistName}</span>
            </button>
          ))}

          {/* Rodapé do palco: só existe no modo pilha (o CSS liga o `display`). */}
          <div className="work-foot hidden flex-col items-center gap-3.5">
            <span
              ref={countRef}
              aria-hidden="true"
              className="text-dim font-mono text-[11px] leading-none font-bold tracking-[.18em]"
            >
              {pad(1)} / {pad(STACK_COUNT)}
            </span>
            <GhostCta href="/tatuadores" size="sm">
              Explorar por artista
            </GhostCta>
          </div>
        </div>
      </div>

      <Lightbox
        photos={RECENT}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        label="Visualizador de trabalho"
        alt={altFor}
        caption={(photo, i) => (
          <div className="text-mist flex items-center gap-4 text-[13.5px]">
            <span className="font-display text-bone font-semibold">{photo.artistName}</span>
            <Link
              href={`/tatuadores/${photo.slug}`}
              onClick={() => setIndex(null)}
              className="text-brand-light font-mono text-[11px] tracking-[.1em] no-underline"
            >
              VER PERFIL →
            </Link>
            <span className="text-dim font-mono text-[11px]">
              {i + 1} / {RECENT.length}
            </span>
          </div>
        )}
      />
    </section>
  );
}

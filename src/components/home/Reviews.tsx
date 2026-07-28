"use client";

import { useEffect, useRef, useState } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Avaliações reais do perfil do Google (Google Meu Negócio) do estúdio — 5,0★.
 * Nomes e textos são de clientes verdadeiros, capturados do Google Maps
 * (lightly trimmed para caber no card, sem alterar o sentido).
 * Ao atualizar: use SÓ avaliações reais; nunca invente nomes ou depoimentos.
 */
const REVIEWS = [
  {
    quote:
      "Estúdio super legal, próximo ao metrô Vergueiro e fácil de chegar caminhando. Ambiente limpo e bem cuidado, atendimento excelente. Pretendo voltar mais vezes, com certeza!",
    author: "Carol Carvalho Aragão",
  },
  {
    quote:
      "Se tem um lugar que eu recomendo sem pestanejar, é aqui. O ambiente é muito bom e os profissionais são todos fantásticos. Fiz meu trabalho com o Kyoto — um cara gente boa demais.",
    author: "Eduardo Rodrigues",
  },
  {
    quote:
      "Dattebayo é sensacional! Todo mundo aqui é gente boa demais e, o melhor, tattoo de qualidade brabíssima! Deixaria eles me tatuarem de olhos fechados. Ambiente estiloso, limpo e super agradável.",
    author: "Vinicius Martins de Andrade",
  },
];

/**
 * Três cópias da lista dão o carrossel infinito do mobile: a rolagem vive na cópia
 * do meio e, sempre que sai dela, volta um bloco inteiro — como as cópias são
 * idênticas, o salto é invisível. As cópias extras somem no desktop, onde a seção
 * volta a ser uma grade de três colunas.
 */
const LOOP = [0, 1, 2].flatMap((copy) => REVIEWS.map((review, i) => ({ ...review, copy, i })));

/** Intervalo do avanço automático do carrossel do mobile. */
const AUTOPLAY_MS = 6000;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Prova social da home: avaliações reais do Google Meu Negócio. */
export function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.children) as HTMLElement[];
    const small = window.matchMedia("(max-width: 639px)");

    let half = 0; // largura de uma cópia da lista
    let step = 0; // passo de um card (card + gap)
    let frame = 0;
    let settle = 0;
    let timer = 0;
    let on = false;
    let onScreen = false;
    let held = false; // dedo (ou foco) no carrossel

    const measure = () => {
      const first = cards[0];
      const twin = cards[REVIEWS.length];
      half = first && twin ? twin.offsetLeft - first.offsetLeft : 0;
      step = first && cards[1] ? cards[1].offsetLeft - first.offsetLeft : 0;
    };

    // Quanto mais perto do centro, mais opaco e maior o card — o do meio fica
    // cheio e os vizinhos apenas espiam pelas bordas.
    const paint = () => {
      frame = 0;
      const center = scroller.scrollLeft + scroller.clientWidth / 2;

      let closest = 0;
      let nearest = Infinity;

      cards.forEach((card, i) => {
        const width = card.offsetWidth || 1;
        const distance = Math.abs(card.offsetLeft + width / 2 - center) / width;
        const focus = clamp01(1 - distance);

        card.style.opacity = `${(0.34 + 0.66 * focus).toFixed(3)}`;
        card.style.transform = `scale(${(0.93 + 0.07 * focus).toFixed(3)})`;
        card.style.boxShadow = `0 0 0 1px rgba(255,122,26,${(0.45 * focus).toFixed(3)})`;

        if (distance < nearest) {
          nearest = distance;
          closest = i;
        }
      });

      setActive(closest % REVIEWS.length);
    };

    // Mantém a rolagem dentro da cópia do meio, onde sobra um bloco inteiro para
    // cada lado. O deslocamento é múltiplo do passo dos cards, então o snap
    // continua alinhado.
    const normalize = () => {
      if (!on || !half) return;
      const x = scroller.scrollLeft;
      if (x >= half * 2) scroller.scrollLeft = x - half;
      else if (x < half) scroller.scrollLeft = x + half;
    };

    const onScroll = () => {
      if (!on) return;
      if (!frame) frame = requestAnimationFrame(paint);
      window.clearTimeout(settle);
      settle = window.setTimeout(normalize, 170);
    };

    const reset = () => {
      for (const card of cards) {
        card.style.opacity = "";
        card.style.transform = "";
        card.style.boxShadow = "";
      }
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    // O avanço automático só corre com o carrossel ligado, à vista e sem ninguém
    // mexendo nele. Qualquer uma dessas condições cai, `play()` só desliga.
    const play = () => {
      stop();
      if (!on || !onScreen || held || !step || document.hidden) return;
      timer = window.setInterval(() => {
        scroller.scrollBy({ left: step, behavior: "smooth" });
      }, AUTOPLAY_MS);
    };

    const hold = () => {
      held = true;
      stop();
    };

    // Ao soltar, o relógio recomeça do zero — não corta o depoimento pela metade.
    const release = () => {
      held = false;
      play();
    };

    const onVisibility = () => (document.hidden ? stop() : play());

    // Fora da tela o carrossel não gasta nada — e ninguém volta para a seção no
    // meio de um depoimento que passou sozinho.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        play();
      },
      { threshold: 0.4 },
    );

    // No desktop a grade não rola: o carrossel inteiro fica desligado.
    const sync = () => {
      const next = small.matches;
      if (next !== on) {
        on = next;
        if (!on) {
          reset();
          stop();
          return;
        }
      }
      if (!on) return;
      measure();
      // Também é o que planta a rolagem na cópia do meio na primeira vez, e o que
      // a recoloca lá se o giro da tela mudar as medidas.
      normalize();
      paint();
      play();
    };

    sync();
    io.observe(scroller);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", hold);
    scroller.addEventListener("pointerup", release);
    scroller.addEventListener("pointercancel", release);
    scroller.addEventListener("focusin", hold);
    scroller.addEventListener("focusout", release);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", sync);
    small.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      stop();
      io.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", hold);
      scroller.removeEventListener("pointerup", release);
      scroller.removeEventListener("pointercancel", release);
      scroller.removeEventListener("focusin", hold);
      scroller.removeEventListener("focusout", release);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", sync);
      small.removeEventListener("change", sync);
      reset();
    };
  }, []);

  return (
    <section aria-label="Avaliações" className="py-[clamp(56px,8vw,100px)]">
      <Reveal className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <Eyebrow className="mb-7">QUEM TATUOU, RECOMENDA</Eyebrow>

        {/* Mobile: carrossel de um depoimento por vez. Do `sm` para cima, a grade
            de sempre — o `overflow-visible` desarma a rolagem lateral. */}
        <div
          ref={scrollerRef}
          // `relative` não é enfeite: é ele que faz o `offsetLeft` dos cards ser
          // medido a partir do scroller, na mesma régua do `scrollLeft`.
          className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] sm:overflow-visible sm:px-0"
        >
          {LOOP.map((review) => (
            <figure
              key={`${review.i}-${review.copy}`}
              // As cópias existem só para o loop do mobile: some no desktop e não
              // são lidas por leitor de tela.
              aria-hidden={review.copy > 0 || undefined}
              // O card ocupa a caixa de conteúdo inteira e o `px-8` do scroller
              // vira o espaço onde os vizinhos espiam — assim o card do meio fica
              // exatamente no centro da tela.
              className={`bg-surface flex-[0_0_100%] snap-center rounded-2xl border border-white/9 px-[22px] py-6 ${
                review.copy > 0 ? "sm:hidden" : ""
              }`}
            >
              <div aria-hidden="true" className="text-brand-light mb-3 text-sm tracking-[3px]">
                ★★★★★
              </div>
              <blockquote className="text-bone-soft mb-4 text-[14.5px] leading-[1.65]">
                {review.quote}
              </blockquote>
              <figcaption>
                <div className="font-display text-bone text-sm font-semibold">{review.author}</div>
                <div className="font-mono text-dim mt-1 text-[10px] leading-none font-bold tracking-[.14em]">
                  AVALIAÇÃO NO GOOGLE
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Tracinhos embaixo, centralizados — mesma dica do carrossel de artistas. */}
        <div aria-hidden="true" className="mt-5 flex justify-center gap-[5px] sm:hidden">
          {REVIEWS.map((review, i) => (
            <span
              key={review.author}
              className="h-[2px] rounded-[2px] transition-[width,background-color] duration-300"
              style={{
                width: i === active ? 18 : 12,
                background: i === active ? "var(--color-brand)" : "rgba(245,245,242,.24)",
              }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

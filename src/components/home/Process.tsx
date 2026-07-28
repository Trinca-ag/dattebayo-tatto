"use client";

import { useEffect, useRef } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SwipeIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Ideia & orçamento",
    text: "Chama no WhatsApp com a ideia e referências. A gente alinha tudo e faz o orçamento.",
  },
  {
    n: "02",
    title: "Criação da arte",
    text: "Seu artista desenha uma arte exclusiva, pensada pro seu corpo e seu estilo.",
  },
  {
    n: "03",
    title: "Sessão no estúdio",
    text: "Você vem pra Liberdade e a gente tatua com todo cuidado e conforto.",
  },
  {
    n: "04",
    title: "Cicatrização",
    text: "Orientação de cuidados e acompanhamento até cicatrizar 100%.",
  },
] as const;

/** As quatro etapas do atendimento, com a trilha que se preenche conforme o scroll. */
export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    // Sem movimento, a barra já nasce completa: ela é decoração, não informação.
    if (reduced) {
      fill.style.width = "100%";
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const prog = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.78 - rect.top) / (rect.height * 0.72)),
      );
      // Largura escrita direto no DOM — passar por estado re-renderizaria a seção a cada frame.
      fill.style.width = `${prog * 100}%`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section aria-label="Como funciona" className="py-[clamp(56px,8vw,100px)]">
      <div ref={wrapRef} className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <Reveal className="mb-10">
          <Eyebrow className="mb-4">COMO FUNCIONA</Eyebrow>
          <h2 className="font-display text-[clamp(30px,5vw,56px)] leading-[.98] font-bold tracking-[-.025em]">
            Do &quot;e aí&quot; ao &quot;cicatrizou&quot;
          </h2>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-[14px] right-0 left-0 h-0.5 bg-white/10"
          />
          <div
            ref={fillRef}
            aria-hidden="true"
            className="absolute top-[14px] left-0 h-0.5 w-0 bg-[linear-gradient(90deg,var(--color-brand),var(--color-brand-deep))] shadow-[0_0_12px_rgba(255,92,0,.6)] transition-[width] duration-150 ease-linear"
          />
          {/* Mobile: carrossel horizontal com snap (swipe nativo). sm+: volta ao grid.
              `relative z-1` é o que põe os cards na frente: as duas barras acima são
              `absolute` e, sem isso, pintariam por cima dos números (elemento
              posicionado sempre pinta depois de conteúdo estático). Com os cards na
              frente, o fundo opaco de cada bolinha corta a trilha, que passa a correr
              atrás delas. */}
          <Reveal
            delay={80}
            className="no-scrollbar relative z-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] sm:gap-x-5 sm:gap-y-[26px] sm:overflow-visible sm:pb-0"
          >
            {STEPS.map((step) => (
              <div key={step.n} className="flex-[0_0_78%] snap-start sm:flex-none">
                <div className="border-brand bg-ink text-brand-light font-mono mb-[18px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 text-[11px] leading-none font-bold">
                  {step.n}
                </div>
                <h3 className="font-display mb-[7px] text-[17px] font-bold">{step.title}</h3>
                <p className="text-ash text-[13.5px] leading-[1.6]">{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Dica de arrasto embaixo e centralizada; só no carrossel mobile (some no grid sm+). */}
        <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-2.5 sm:hidden">
          <span className="inline-flex w-9 shrink-0 justify-center">
            <SwipeIcon size={22} className="text-brand-light animate-swipe" />
          </span>
          <span className="text-dim font-mono text-[10px] leading-none font-bold tracking-[.16em]">
            ARRASTE PARA O LADO
          </span>
        </div>
      </div>
    </section>
  );
}

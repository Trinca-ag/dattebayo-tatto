"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ArtistCard } from "@/components/ui/ArtistCard";
import { GhostCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronIcon, SwipeIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ARTISTS, ARTIST_COUNT } from "@/lib/artists";

/** Espaço entre os cards, em px — precisa bater com o `gap-[18px]` do scroller. */
const GAP = 18;

/** Tempo até o scroll suave das setas assentar, antes de normalizar o loop. */
const ANIM_MS = 750;

/** Lista duplicada: a segunda cópia é o que dá a sensação de carrossel infinito. */
const CARDS = [...ARTISTS, ...ARTISTS].map((artist, i) => ({
  artist,
  key: `${artist.slug}-${Math.floor(i / ARTIST_COUNT)}`,
}));

export function ArtistCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  // Medidas do carrossel: largura de um card + gap, comprimento de uma cópia da
  // lista (`half`) e o quanto uma seta avança (`step`).
  const metrics = useRef({ half: 0, step: 0 });
  const frameRef = useRef(0);
  const settleRef = useRef(0);
  const animRef = useRef(false);
  const animTimerRef = useRef(0);
  const dragRef = useRef<{
    x: number;
    scrollLeft: number;
    moved: boolean;
  } | null>(null);
  const draggedRef = useRef(false);

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const children = scroller.children;
    const first = children[0] as HTMLElement | undefined;
    const twin = children[ARTIST_COUNT] as HTMLElement | undefined;

    const cardW = (first ? first.getBoundingClientRect().width : 290) + GAP;
    const half = first && twin ? twin.offsetLeft - first.offsetLeft : 0;
    const fits = Math.max(1, Math.floor((scroller.clientWidth - 56) / cardW));
    const step = fits * cardW;
    metrics.current = { half, step };

    const total = Math.max(
      1,
      Math.ceil((half || Math.max(0, scroller.scrollWidth - scroller.clientWidth)) / step),
    );
    const current = ((Math.round(scroller.scrollLeft / step) % total) + total) % total;

    setPages(total);
    setPage(current);
  }, []);

  // Volta um ciclo inteiro quando passa da primeira cópia — o salto é invisível
  // porque as duas cópias são idênticas.
  const normalize = useCallback(() => {
    const scroller = scrollerRef.current;
    const { half } = metrics.current;
    if (!scroller || !half || animRef.current || dragRef.current) return;

    // Tabular pelos cards faz o navegador rolar o scroller, o que dispara esta
    // normalização; recuar `half` aqui arrancaria o elemento focado da tela.
    const focused = document.activeElement;
    if (focused && focused !== document.body && scroller.contains(focused)) return;

    if (scroller.scrollLeft >= half) scroller.scrollLeft -= half;
  }, []);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(measure);
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(normalize, 170);
  }, [measure, normalize]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const first = requestAnimationFrame(measure);
    window.addEventListener("resize", handleScroll);

    // O card é dimensionado por clamp(), então observamos também o primeiro item.
    const observer = new ResizeObserver(handleScroll);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(settleRef.current);
      window.clearTimeout(animTimerRef.current);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, [measure, handleScroll]);

  const navigate = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { half, step } = metrics.current;
    const distance = step || scroller.clientWidth * 0.82;

    window.clearTimeout(settleRef.current);
    window.clearTimeout(animTimerRef.current);
    animRef.current = true;

    // Indo para trás sem espaço: pula uma cópia à frente antes de animar.
    if (direction < 0 && half && scroller.scrollLeft - distance < 0) {
      scroller.scrollLeft += half;
    }

    scroller.scrollBy({
      left: direction * distance,
      behavior: reduced ? "auto" : "smooth",
    });

    animTimerRef.current = window.setTimeout(() => {
      animRef.current = false;
      normalize();
    }, ANIM_MS);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    // No toque o scroll nativo já resolve — duplicar o movimento só atrapalha.
    if (!scroller || event.pointerType === "touch") return;
    draggedRef.current = false;
    dragRef.current = {
      x: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const drag = dragRef.current;
    if (!scroller || !drag) return;

    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - dx;
  };

  const onPointerEnd = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    draggedRef.current = drag?.moved ?? false;
  };

  // Sem isso, soltar o arrasto em cima de um card abre o perfil errado.
  //
  // `detail > 0` limita o bloqueio a cliques de mouse de verdade: Enter num link
  // gera um clique com `detail === 0`, e como o arrasto pode terminar fora do
  // scroller (sem clique depois), a marca ficaria pendurada e engoliria a próxima
  // ativação por teclado.
  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedRef.current || event.detail === 0) return;
    draggedRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  // O navegador inicia o drag-and-drop nativo do link/imagem ao arrastar a partir
  // de um card, o que cancela o pointermove e congela o carrossel no meio do gesto.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <section
      aria-label="A equipe"
      className="pt-[clamp(66px,9vw,120px)] pb-[clamp(56px,8vw,100px)]"
    >
      <Reveal className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-5 px-[clamp(18px,4vw,40px)]">
        <div>
          <Eyebrow className="mb-4">A EQUIPE</Eyebrow>
          <h2 className="font-display text-[clamp(30px,5vw,56px)] leading-[.98] font-bold tracking-[-.025em]">
            13 artistas. 13 universos.
          </h2>
        </div>
        <GhostCta href="/tatuadores" size="sm" className="whitespace-nowrap">
          Ver todos os tatuadores
        </GhostCta>
      </Reveal>

      <div className="mx-auto mt-3.5 flex max-w-[1280px] items-center justify-end gap-4 px-[clamp(18px,4vw,40px)] sm:justify-between">
        {/* No mobile, a dica de arrasto vira a animação embaixo do carrossel. */}
        <span className="text-dim font-mono hidden text-[10px] leading-none font-bold tracking-[.16em] sm:block">
          ◂ ARRASTE PARA EXPLORAR ▸
        </span>
        <div aria-hidden="true" className="flex shrink-0 gap-[5px]">
          {Array.from({ length: pages }, (_, i) => (
            <span
              key={i}
              className="h-[2px] rounded-[2px] transition-[width,background-color] duration-300"
              style={{
                width: i === page ? 18 : 12,
                background: i === page ? "var(--color-brand)" : "rgba(245,245,242,.24)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerLeave={onPointerEnd}
          onClickCapture={onClickCapture}
          onDragStart={onDragStart}
          className="no-scrollbar flex snap-x snap-proximity cursor-grab gap-[18px] overflow-x-auto px-[clamp(18px,4vw,40px)] pt-[22px] pb-[30px] active:cursor-grabbing"
        >
          {CARDS.map(({ artist, key }) => (
            <div key={key} className="flex-[0_0_clamp(238px,72vw,290px)] snap-start">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Artistas anteriores"
          className="text-bone hover:text-brand-light absolute top-[22px] bottom-[30px] left-0 z-4 hidden w-[clamp(38px,4vw,52px)] cursor-pointer items-center justify-center sm:flex rounded-r-[14px] border-0 bg-[rgba(10,10,11,.66)] p-0 backdrop-blur-[3px] transition-[background-color,color] duration-250 hover:bg-[rgba(10,10,11,.9)]"
        >
          <ChevronIcon dir="left" />
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          aria-label="Próximos artistas"
          className="text-bone hover:text-brand-light absolute top-[22px] right-0 bottom-[30px] z-4 hidden w-[clamp(38px,4vw,52px)] cursor-pointer items-center justify-center sm:flex rounded-l-[14px] border-0 bg-[rgba(10,10,11,.66)] p-0 backdrop-blur-[3px] transition-[background-color,color] duration-250 hover:bg-[rgba(10,10,11,.9)]"
        >
          <ChevronIcon dir="right" />
        </button>
      </div>

      {/* Dica de arrasto embaixo e centralizada; só no mobile (o desktop usa as setas). */}
      <div
        aria-hidden="true"
        className="mt-1 flex items-center justify-center gap-2.5 px-[clamp(18px,4vw,40px)] sm:hidden"
      >
        <span className="inline-flex w-9 shrink-0 justify-center">
          <SwipeIcon size={22} className="text-brand-light animate-swipe" />
        </span>
        <span className="text-dim font-mono text-[10px] leading-none font-bold tracking-[.16em]">
          ARRASTE PARA O LADO
        </span>
      </div>
    </section>
  );
}

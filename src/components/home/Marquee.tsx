"use client";

import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const JP = "だってばよ";

const WORDS = [
  "ANIME",
  "GEEK",
  "BLACKWORK",
  "CYBERGOTH",
  "PIXEL ART",
  "CUTE",
  "FINE LINE",
  "IREZUMI",
  JP,
] as const;

/**
 * Faixa rolante de estilos entre o hero e a equipe.
 *
 * O conjunto de palavras é renderizado duas vezes porque o keyframe translada
 * -50% — a segunda cópia entra exatamente onde a primeira sai.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const setPlayState = (state: "paused" | "running") => {
    if (reduced) return;
    const track = trackRef.current;
    if (track) track.style.animationPlayState = state;
  };

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setPlayState("paused")}
      onMouseLeave={() => setPlayState("running")}
      className="bg-ink-soft overflow-hidden border-y border-white/8 py-4"
    >
      <div
        ref={trackRef}
        className="animate-marquee font-display flex w-max text-[clamp(17px,2.4vw,24px)] font-bold tracking-[.02em] whitespace-nowrap uppercase"
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="flex">
            {WORDS.map((word) => (
              <span key={word} className="inline-flex items-center">
                <span
                  lang={word === JP ? "ja" : undefined}
                  className={`px-[26px] ${word === JP ? "text-brand-light" : "text-bone"}`}
                >
                  {word}
                </span>
                <span className="text-brand">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

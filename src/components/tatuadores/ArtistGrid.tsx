"use client";

import { useState } from "react";

import { ArtistCard } from "@/components/ui/ArtistCard";
import { CATEGORIES, type Artist, type ArtistCategory } from "@/lib/artists";

type Filter = "Todos" | ArtistCategory;

/** "Todos" não é uma categoria de dado — só o estado inicial do filtro. */
const FILTERS: readonly Filter[] = ["Todos", ...CATEGORIES];

/** Barra de filtros por estilo + grade dos cards. */
export function ArtistGrid({ artists }: { artists: Artist[] }) {
  const [filter, setFilter] = useState<Filter>("Todos");

  const countOf = (f: Filter) =>
    f === "Todos" ? artists.length : artists.filter((a) => a.cat === f).length;

  const filtered = filter === "Todos" ? artists : artists.filter((a) => a.cat === filter);
  const suffix = filter === "Todos" ? " ARTISTAS" : ` · ${filter.toUpperCase()}`;

  return (
    <>
      <section
        aria-label="Filtrar por estilo"
        className="sticky top-[58px] z-40 border-y border-white/6 bg-[rgba(10,10,11,.82)] px-[clamp(18px,4vw,40px)] py-[14px] backdrop-blur-[12px]"
      >
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`inline-flex cursor-pointer items-center gap-[7px] rounded-full border px-[14px] py-[9px] font-mono text-xs leading-none font-bold tracking-[.04em] uppercase transition-colors duration-[250ms] ${
                  on
                    ? "bg-brand-gradient text-ink border-brand"
                    : "text-mist border-white/16 bg-white/3 hover:border-white/30"
                }`}
              >
                {f}
                <span className="text-[10px] font-bold opacity-70">{countOf(f)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-label="Grade de tatuadores"
        className="px-[clamp(18px,4vw,40px)] pt-[clamp(30px,5vw,56px)] pb-[clamp(60px,8vw,100px)]"
      >
        <div className="mx-auto max-w-[1280px]">
          <div
            aria-live="polite"
            className="text-dim mb-[22px] font-mono text-[11px] leading-none font-bold tracking-[.14em]"
          >
            MOSTRANDO {filtered.length} DE {artists.length}
            {suffix}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(232px,1fr))] gap-5">
            {filtered.map((artist) => (
              // Chave pelo slug: ao trocar de filtro os cards novos remontam e a
              // animação de entrada roda de novo (com índice, o React os reusaria).
              <div key={artist.slug} className="animate-fade-up">
                <ArtistCard artist={artist} total={artists.length} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

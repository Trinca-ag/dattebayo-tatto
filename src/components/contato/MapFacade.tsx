"use client";

import { useState } from "react";

import { INFO } from "@/lib/site";

/**
 * Fachada estática do mapa.
 *
 * O iframe do Google só é montado depois do clique: embutido de saída ele puxaria
 * os scripts e cookies do Google em toda visita, mesmo para quem nunca olha o mapa.
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  // Depois de carregado o bloco vira um contêiner comum — nada de botão focável sobre o iframe.
  if (loaded) {
    return (
      <div className="h-[180px] w-full overflow-hidden rounded-[18px] border border-white/10 bg-black">
        <iframe
          title="Mapa — Dattebayo Tattoo"
          src={INFO.mapEmbed}
          loading="lazy"
          className="h-full w-full border-0 [filter:invert(.92)_hue-rotate(180deg)_saturate(.6)]"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Carregar mapa do estúdio"
      className="bg-map-grid relative h-[180px] w-full cursor-pointer overflow-hidden rounded-[18px] border border-white/10 p-0"
    >
      <span className="text-mist absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span
          aria-hidden="true"
          className="bg-brand h-4 w-4 rounded-full shadow-[0_0_0_6px_rgba(255,92,0,.25)]"
        />
        <span className="font-display text-sm font-semibold">Carregar mapa</span>
      </span>
    </button>
  );
}

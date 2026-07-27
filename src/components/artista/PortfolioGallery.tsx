"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/ui/Lightbox";
import { flattenWorks, type Artist } from "@/lib/artists";
import { hexA, safeAccent } from "@/lib/color";

/**
 * Grade de 6 obras do portfólio do artista.
 *
 * Cada botão abre o lightbox já posicionado na primeira foto da obra: o visualizador
 * percorre a lista achatada de fotos, então uma obra com várias fotos vira um
 * "carrossel" natural ao navegar com as setas.
 */
export function PortfolioGallery({ artist }: { artist: Artist }) {
  const [index, setIndex] = useState<number | null>(null);

  const accent = safeAccent(artist.theme);
  // Sem useMemo de propósito: são 6–10 fotos por artista e o React Compiler já
  // memoiza sozinho — o memo manual só fazia ele desistir de otimizar o componente.
  const photos = flattenWorks(artist);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
        {artist.works.map((work) => {
          const multi = work.photos.length > 1;
          const cover = work.photos[0];

          return (
            <button
              key={work.n}
              type="button"
              aria-label={`Abrir trabalho ${work.n} de ${artist.name}`}
              onClick={() => {
                const start = photos.findIndex((photo) => photo.workN === work.n);
                setIndex(start < 0 ? 0 : start);
              }}
              className="animate-fade-up group bg-surface relative cursor-pointer overflow-hidden rounded-[14px] border border-white/8 p-0"
            >
              <Image
                src={cover.src}
                width={cover.width}
                height={cover.height}
                alt={`Tatuagem por ${artist.name} — trabalho ${work.n}`}
                sizes="(min-width: 1100px) 380px, (min-width: 700px) 50vw, 100vw"
                className="block aspect-square h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
              <span
                className="font-mono text-bone absolute top-2.5 right-2.5 rounded-[7px] border border-white/16 px-2 py-1.5 text-[9px] leading-none font-bold tracking-[.08em] backdrop-blur-[6px]"
                style={{ background: multi ? hexA(accent, 0.85) : "rgba(10,10,11,.6)" }}
              >
                {multi ? `+${work.photos.length} fotos` : String(work.n).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <Lightbox
        photos={photos}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        label={`Portfólio de ${artist.name}`}
        alt={(photo) => `Tatuagem por ${artist.name} — trabalho ${photo.workN}`}
        caption={(photo) => (
          <div className="flex items-center gap-3.5">
            {photo.workTotal > 1 && (
              <div aria-hidden="true" className="flex items-center gap-[7px]">
                {Array.from({ length: photo.workTotal }, (_, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full transition-colors duration-200"
                    style={{
                      background: i === photo.photoIdx ? accent : "rgba(255,255,255,.25)",
                    }}
                  />
                ))}
              </div>
            )}
            <span className="font-mono text-ash text-[11px] tracking-[.1em]">
              TRABALHO {photo.workN} · {photo.photoIdx + 1}/{photo.workTotal}
            </span>
          </div>
        )}
      />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { GhostCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { ARTISTS } from "@/lib/artists";
import type { Img } from "@/lib/image-sizes";

type RecentPhoto = Img & { artistName: string; slug: string };

/** Uma amostra por artista: a primeira foto da primeira obra do portfólio. */
const RECENT: RecentPhoto[] = ARTISTS.map((artist) => ({
  ...artist.works[0].photos[0],
  artistName: artist.name,
  slug: artist.slug,
}));

const altFor = (photo: RecentPhoto) => `Tatuagem por ${photo.artistName} — Dattebayo Tattoo`;

export function RecentWorks() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section aria-label="Trabalhos recentes" className="py-[clamp(56px,8vw,100px)]">
      <Reveal className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <div className="mb-[34px] flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow className="mb-4">TRABALHOS RECENTES</Eyebrow>
            <h2 className="font-display text-[clamp(30px,5vw,56px)] leading-[.98] font-bold tracking-[-.025em]">
              Tinta fresca na Liberdade
            </h2>
          </div>
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
                sizes="(max-width: 560px) 100vw, 300px"
                className="block h-auto w-full rounded-xl"
              />
              <span className="text-bone absolute bottom-2.5 left-2.5 rounded-[7px] border border-white/14 bg-[rgba(10,10,11,.6)] px-[9px] py-1.5 font-mono text-[10px] leading-none font-bold tracking-[.08em] backdrop-blur-[6px]">
                {photo.artistName}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

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

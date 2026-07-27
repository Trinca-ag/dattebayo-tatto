"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { InstagramIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ARTIST_COUNT, type Artist } from "@/lib/artists";
import { hexA, safeAccent } from "@/lib/color";

/** "[ 01 / 13 ]" — zero à esquerda em ambos os números do badge. */
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Card de tatuador: o negativo da marca em movimento.
 *
 * Em repouso mostra `profile` (camiseta preta sobre laranja); no hover troca para
 * `profileHover` (o negativo) e acende borda, cantos e rótulo de estilo na cor do
 * artista.
 */
export function ArtistCard({ artist, total = ARTIST_COUNT }: { artist: Artist; total?: number }) {
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Em telas sem hover o visitante nunca veria a troca de estado: quando o card
  // entra bem visível na viewport ele se apresenta sozinho por 1,5s.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setHovered(true);
          clearTimeout(timer);
          timer = setTimeout(() => setHovered(false), 1500);
        }
      },
      { threshold: 0.65 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const accent = safeAccent(artist.theme);
  const glow = hexA(accent, 0.34);
  const dur = reduced ? "0ms" : "500ms";

  const imageStyle: React.CSSProperties = {
    transform: hovered ? "scale(1.04)" : "scale(1)",
    transition: `opacity ${dur} ease-in-out, transform ${dur} ease-in-out`,
  };

  const cornerStyle: React.CSSProperties = {
    borderColor: accent,
    opacity: hovered ? 0.95 : 0,
    transition: `opacity ${dur}`,
  };

  return (
    <div
      ref={wrapperRef}
      className="font-display relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // `onFocus`/`onBlur` do React sobem na árvore: quem navega por teclado vê o
      // mesmo estado que quem usa mouse ao chegar no link do card.
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Link
        href={`/tatuadores/${artist.slug}`}
        aria-label={`Ver perfil de ${artist.name}, tatuador(a) ${artist.style}`}
        className="bg-surface relative block overflow-hidden rounded-2xl border text-inherit no-underline"
        style={{
          borderColor: hovered ? accent : "rgba(255,255,255,.09)",
          boxShadow: hovered
            ? `0 0 0 1px ${glow}, 0 6px 16px -8px ${glow}`
            : "0 12px 30px -20px rgba(0,0,0,.85)",
          transition: `border-color ${dur}, box-shadow ${dur}`,
        }}
      >
        <div className="bg-ink relative aspect-square overflow-hidden">
          <Image
            src={artist.profile.src}
            alt={`Foto de ${artist.name}, tatuador(a) ${artist.style} da Dattebayo Tattoo`}
            width={artist.profile.width}
            height={artist.profile.height}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ ...imageStyle, opacity: hovered ? 0 : 1 }}
          />
          <Image
            src={artist.profileHover.src}
            alt=""
            aria-hidden="true"
            width={artist.profileHover.width}
            height={artist.profileHover.height}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ ...imageStyle, opacity: hovered ? 1 : 0 }}
          />

          {/* Cantos decorativos: o "[ ]" da identidade, abrindo em volta da foto. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[10px] left-[10px] h-[22px] w-[22px] rounded-tl-[4px] border-t-2 border-l-2"
            style={cornerStyle}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[10px] bottom-[84px] h-[22px] w-[22px] rounded-br-[4px] border-r-2 border-b-2"
            style={cornerStyle}
          />

          <div className="absolute top-3 left-3 rounded-md border border-white/12 bg-[rgba(10,10,11,.5)] px-2 py-[5px] font-mono text-[10px] leading-none font-bold tracking-[.14em] text-[rgba(245,245,242,.85)] backdrop-blur-[6px]">
            [ {pad(artist.idx)} / {pad(total)} ]
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[66px] bg-[linear-gradient(to_top,rgba(10,10,11,.85),transparent)]"
          />
        </div>

        <div className="bg-surface px-[15px] pt-[14px] pb-[15px]">
          <div className="text-bone text-[17px] font-bold tracking-[-.01em]">{artist.name}</div>
          <div
            className="mt-[5px] font-mono text-[10.5px] leading-none font-bold tracking-[.12em] uppercase"
            style={{
              color: hovered ? accent : "var(--color-ash)",
              transition: `color ${dur}`,
            }}
          >
            {artist.style}
          </div>
        </div>
      </Link>

      {/* Fora do <Link> de propósito: um link dentro do outro é HTML inválido. */}
      <a
        href={artist.ig}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir Instagram (nova aba)"
        aria-label={`Abrir Instagram de ${artist.name} em nova aba`}
        className="text-bone absolute top-3 right-3 z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/16 bg-[rgba(10,10,11,.55)] backdrop-blur-[8px] transition-colors hover:border-white/30 hover:bg-[rgba(10,10,11,.8)]"
      >
        <InstagramIcon size={16} />
      </a>
    </div>
  );
}

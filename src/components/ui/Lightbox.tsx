"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { useFocusTrap, useScrollLock } from "@/hooks/use-modal";
import type { Img } from "@/lib/image-sizes";

export type LightboxProps<T extends Img> = {
  photos: readonly T[];
  /** Índice aberto, ou `null` quando fechado. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Rótulo acessível do diálogo (ex.: "Visualizador de trabalho"). */
  label: string;
  alt: (photo: T, index: number) => string;
  /** Legenda opcional exibida abaixo da foto. */
  caption?: (photo: T, index: number) => React.ReactNode;
};

const FADE_MS = 220;

/**
 * Visualizador em tela cheia compartilhado por home, perfil do artista e página Sobre.
 *
 * Fora do intervalo de abertura/fechamento ele não existe no DOM — assim nenhum botão
 * focável fica escondido atrás de `visibility: hidden`, como acontecia no site original.
 * Teclado: Esc fecha, ←/→ navegam e Tab circula dentro do diálogo.
 */
export function Lightbox<T extends Img>({
  photos,
  index,
  onIndexChange,
  onClose,
  label,
  alt,
  caption,
}: LightboxProps<T>) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [closing, setClosing] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);
  // Último índice válido: durante o fade-out `index` já é `null`, e sem guardá-lo
  // não haveria foto para desenhar — a saída sumiria de uma vez em vez de esmaecer.
  const [lastIndex, setLastIndex] = useState(0);

  if (index !== null && index !== lastIndex) setLastIndex(index);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setClosing(true);
  }

  const shown = index ?? lastIndex;

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => setClosing(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [closing]);

  useScrollLock(open);
  useFocusTrap(open, dialogRef, closeRef);

  const count = photos.length;

  const navigate = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, navigate]);

  if (!open && !closing) return null;

  const photo = photos[shown];
  if (!photo) return null;

  const arrowClass =
    "absolute top-1/2 z-2 flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/6 text-[26px] text-white transition-colors hover:bg-white/12";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      // `pointer-events-none` durante a saída: por 220 ms o overlay ainda cobre a
      // tela inteira e, sem isso, engoliria o clique seguinte do usuário.
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/93 backdrop-blur-[8px] transition-opacity duration-200 ${
        open ? "animate-fade-in" : "pointer-events-none"
      }`}
      style={{ opacity: open ? 1 : 0 }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 z-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/6 text-xl text-white transition-colors hover:bg-white/12"
      >
        ✕
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className={`${arrowClass} left-[clamp(8px,3vw,28px)]`}
            onClick={(event) => {
              event.stopPropagation();
              navigate(-1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próximo"
            className={`${arrowClass} right-[clamp(8px,3vw,28px)]`}
            onClick={(event) => {
              event.stopPropagation();
              navigate(1);
            }}
          >
            ›
          </button>
        </>
      )}

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-w-[92vw] flex-col items-center gap-3.5"
      >
        {/* A altura é o limite real (`max-h-[74vh]` + `object-contain`), então `sizes`
            reflete a largura efetiva e não os 92vw que a caixa poderia ocupar. */}
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={alt(photo, shown)}
          sizes="(min-width: 1280px) 900px, (min-width: 768px) 70vw, 92vw"
          className="max-h-[74vh] w-auto rounded-[10px] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]"
        />
        {caption?.(photo, shown)}
      </div>
    </div>
  );
}

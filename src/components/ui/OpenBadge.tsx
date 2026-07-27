"use client";

import { useIsOpenNow } from "@/hooks/use-is-open-now";

/**
 * Selo "aberto agora / fechado agora".
 *
 * Fica invisível (mas ocupando o espaço) até o cliente resolver o horário local —
 * o servidor não sabe o fuso do visitante, então renderizar um valor ali criaria
 * divergência de hidratação e um piscar de "FECHADO" para quem está chegando aberto.
 */
export function OpenBadge({
  size = "md",
  openLabel = "ABERTO AGORA",
  closedLabel = "FECHADO AGORA",
}: {
  size?: "sm" | "md";
  openLabel?: string;
  closedLabel?: string;
}) {
  const open = useIsOpenNow();

  const color = open ? "var(--color-open)" : "var(--color-ash)";
  const small = size === "sm";

  return (
    <span
      // `aria-hidden` enquanto indefinido: nada de leitor de tela anunciar um estado que ainda não existe.
      aria-hidden={open === null}
      className={`inline-flex items-center gap-2 rounded-full border transition-opacity duration-300 ${
        small ? "px-[9px] py-[3px]" : "px-[11px] py-[5px]"
      }`}
      style={{
        opacity: open === null ? 0 : 1,
        borderColor: open ? "rgba(56,255,156,.35)" : "rgba(255,255,255,.12)",
        background: open ? "rgba(56,255,156,.08)" : "rgba(255,255,255,.03)",
      }}
    >
      <span
        className={`rounded-full ${small ? "h-1.5 w-1.5" : "h-[7px] w-[7px]"}`}
        style={{ background: color }}
      />
      <span
        className={`font-mono leading-none font-bold tracking-[.08em] ${small ? "text-[9px]" : "text-[11px]"}`}
        style={{ color }}
      >
        {open === null ? " " : open ? openLabel : closedLabel}
      </span>
    </span>
  );
}

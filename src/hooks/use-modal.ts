"use client";

import { useEffect, type RefObject } from "react";

/**
 * Elementos que recebem foco por Tab. A lista é filtrada por visibilidade antes do
 * uso: o header, por exemplo, mantém a nav desktop no DOM com `display:none` abaixo
 * de 921px, e mirar nela deixaria o Tab preso num elemento invisível.
 */
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function visibleFocusables(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.getClientRects().length > 0,
  );
}

// Contador global: se dois componentes travarem o scroll ao mesmo tempo, só o
// último a soltar restaura o valor original — sem isso um deles devolveria
// `overflow: hidden` como se fosse o estado anterior e a página ficaria travada.
let lockCount = 0;
let savedOverflow = "";

/** Impede o scroll do body enquanto `active` for true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) document.body.style.overflow = savedOverflow;
    };
  }, [active]);
}

/**
 * Prende o Tab dentro de `containerRef` enquanto `active` for true e devolve o foco
 * ao elemento que abriu o diálogo quando ele fecha.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  /** Elemento que recebe o foco inicial; sem ele, o primeiro focável do container. */
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    (initialFocusRef?.current ?? visibleFocusables(containerRef.current)[0])?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const items = visibleFocusables(containerRef.current);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      restoreTo?.focus?.();
    };
  }, [active, containerRef, initialFocusRef]);
}

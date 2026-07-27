"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// No servidor não dá para saber a preferência: assumimos "sem restrição" e o
// cliente re-renderiza logo após a hidratação com o valor real.
const getServerSnapshot = () => false;

/**
 * `true` quando o usuário pede menos movimento.
 *
 * O CSS global já zera animações e transições; este hook existe para o que é feito
 * em JS — autoplay de vídeo, parallax e scroll suave programático.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

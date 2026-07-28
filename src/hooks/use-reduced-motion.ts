"use client";

import { useSyncExternalStore } from "react";

import { REDUCED_MOTION_QUERY, prefersReducedMotion } from "@/lib/motion";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => prefersReducedMotion();

// No servidor não dá para saber a preferência: assumimos "sem restrição" e o
// cliente re-renderiza logo após a hidratação com o valor real.
const getServerSnapshot = () => false;

/**
 * `true` quando o usuário pede menos movimento — e o site está configurado para
 * respeitar isso (veja `RESPECT_REDUCED_MOTION` em `@/lib/motion`).
 *
 * O CSS global já zera animações e transições; este hook existe para o que é feito
 * em JS — autoplay de vídeo, parallax e scroll suave programático.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

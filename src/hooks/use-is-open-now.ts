"use client";

import { useSyncExternalStore } from "react";

import { isOpenNow } from "@/lib/site";

/** Reavalia de minuto em minuto, para o selo virar sozinho na hora do abre/fecha. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

const getSnapshot = (): boolean | null => isOpenNow();

// O servidor renderiza no fuso dele; devolver `null` evita divergência de hidratação
// e deixa o componente esconder o selo até o cliente saber a resposta de verdade.
const getServerSnapshot = (): boolean | null => null;

/**
 * Estado "aberto agora" do estúdio.
 *
 * Retorna `null` no render do servidor e no primeiro render do cliente; quem consome
 * deve tratar `null` como "ainda não sei" e não afirmar nada.
 */
export function useIsOpenNow(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Interruptor único do movimento do site.
 *
 * Com `false`, o site anima para todo mundo e ignora o `prefers-reduced-motion`
 * do sistema. É uma decisão consciente: no Windows essa preferência vem junto
 * com o desligamento dos efeitos visuais da própria interface, então muita gente
 * a tem ligada sem nunca ter pedido um site estático — e aqui o movimento (hero,
 * marquee, revelações, pilha de trabalhos) é parte da identidade do estúdio.
 *
 * Trocar para `true` devolve o comportamento acessível padrão de uma vez: os
 * guardas de JS passam a olhar a media query e o `<html>` recebe a classe que
 * liga os blocos `prefers-reduced-motion` do `globals.css`.
 */
export const RESPECT_REDUCED_MOTION: boolean = false;

/** Media query da preferência de sistema. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Classe no `<html>` que arma os blocos de CSS — só quando respeitamos a preferência. */
export const REDUCED_MOTION_CLASS = "respect-reduced-motion";

/**
 * `true` apenas quando o usuário pede menos movimento **e** o site respeita isso.
 * Só pode ser chamada no cliente.
 */
export function prefersReducedMotion(): boolean {
  return RESPECT_REDUCED_MOTION && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

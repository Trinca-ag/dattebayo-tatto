/** Converte um hex `#RRGGBB` em `rgba(...)` com o alpha informado. */
export function hexA(hex: string, alpha: number): string {
  const m = (hex || "#FF5C00").replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Branco puro como accent apagaria as bordas no fundo preto; nesses casos os
 * componentes caem para o laranja da marca. Nenhum residente usa #FFFFFF hoje,
 * mas a regra existe desde o site original e evita um card invisível no futuro.
 */
export function isWhite(hex: string): boolean {
  return hex.toUpperCase() === "#FFFFFF";
}

/** Accent seguro para bordas e brilhos: troca branco puro pelo laranja da marca. */
export function safeAccent(hex: string): string {
  return isWhite(hex) ? "#FF5C00" : hex;
}

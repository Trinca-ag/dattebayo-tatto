/**
 * Rótulo de seção: um traço em degradê seguido de um texto mono em caixa alta.
 * Aparece antes de praticamente todo `h2` do site.
 */
export function Eyebrow({
  children,
  className = "",
  /** Cor do traço e do texto — a página do artista passa o accent dele. */
  accent,
  dashWidth = 34,
  /** Repete o traço espelhado depois do texto, para rótulos centralizados. */
  bookend = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  dashWidth?: number;
  bookend?: boolean;
}) {
  const dashColor = accent ?? "var(--color-brand)";

  // Cada traço nasce sólido na ponta de fora e some ao encostar no texto.
  const dash = (side: "left" | "right") => (
    <span
      aria-hidden="true"
      className="h-px shrink-0"
      style={{
        width: dashWidth,
        background:
          side === "left"
            ? `linear-gradient(90deg, ${dashColor}, transparent)`
            : `linear-gradient(90deg, transparent, ${dashColor})`,
      }}
    />
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {dash("left")}
      <span
        className="font-mono text-[11px] leading-none font-bold tracking-[.22em]"
        style={{ color: accent ?? "var(--color-brand-light)" }}
      >
        {children}
      </span>
      {bookend && dash("right")}
    </div>
  );
}

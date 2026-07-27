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
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  dashWidth?: number;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="h-px shrink-0"
        style={{
          width: dashWidth,
          background: `linear-gradient(90deg, ${accent ?? "var(--color-brand)"}, transparent)`,
        }}
      />
      <span
        className="font-mono text-[11px] leading-none font-bold tracking-[.22em]"
        style={{ color: accent ?? "var(--color-brand-light)" }}
      >
        {children}
      </span>
    </div>
  );
}

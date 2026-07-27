import Link from "next/link";

type Size = "sm" | "md" | "lg";

const SOLID_SIZES: Record<Size, string> = {
  sm: "px-[26px] py-[15px] text-[15px]",
  md: "px-7 py-4 text-base",
  lg: "px-8 py-[17px] text-[17px]",
};

const GHOST_SIZES: Record<Size, string> = {
  sm: "px-[22px] py-[13px] text-[15px]",
  md: "px-7 py-4 text-base",
  lg: "px-[30px] py-[17px] text-[17px]",
};

/** Pílula laranja preenchida — o CTA principal do site. */
export function SolidCta({
  href,
  children,
  size = "md",
  external = false,
  className = "",
  shine = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  size?: Size;
  external?: boolean;
  className?: string;
  /** Brilho que atravessa o botão, usado nos CTAs de fechamento de página. */
  shine?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  const classes = `bg-brand-gradient text-ink font-display inline-flex items-center justify-center gap-2.5 rounded-full font-bold no-underline shadow-[0_12px_34px_-8px_rgba(255,92,0,.7)] transition-transform hover:-translate-y-px ${SOLID_SIZES[size]} ${shine ? "relative overflow-hidden" : ""} ${className}`;

  const content = shine ? (
    <>
      <span className="relative z-1">{children}</span>
      <span
        aria-hidden="true"
        className="animate-shine pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent)]"
      />
    </>
  ) : (
    children
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Pílula vazada, usada como ação secundária ao lado do CTA principal. */
export function GhostCta({
  href,
  children,
  size = "md",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  size?: Size;
  external?: boolean;
  className?: string;
}) {
  const classes = `font-display text-bone inline-flex items-center justify-center gap-2 rounded-full border border-white/24 bg-white/3 font-semibold no-underline transition-colors hover:border-white/40 hover:bg-white/6 ${GHOST_SIZES[size]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

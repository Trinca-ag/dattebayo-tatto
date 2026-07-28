type IconProps = { size?: number; className?: string };

export function WhatsAppIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.31-1.94 1.36-.52.05-1.01.24-3.4-.71-2.87-1.13-4.7-4.06-4.85-4.25-.14-.19-1.16-1.54-1.16-2.94s.73-2.09 1-2.37c.26-.29.57-.36.76-.36l.55.01c.18.01.42-.07.65.5.24.57.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.42.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.67.79 1.95.93.29.14.48.21.55.33.07.12.07.68-.17 1.35z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Ícone de linha simples usado nos cards de diferenciais da home. */
export function StrokeIcon({ d, size = 24, className }: IconProps & { d: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

/** Mão/dedo de toque — usada no aviso de arrastar do carrossel mobile. */
export function SwipeIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* arcos de movimento nas laterais, sugerindo o vaivém */}
      <path
        d="M4 8C5.1 6.6 6.6 5.7 8.4 5.4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.45}
      />
      <path
        d="M20 8C18.9 6.6 17.4 5.7 15.6 5.4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.45}
      />
      {/* dedo indicador + mão */}
      <rect x="10.6" y="3.5" width="2.8" height="11" rx="1.4" fill="currentColor" />
      <rect x="7" y="11" width="10" height="10" rx="4.5" fill="currentColor" />
    </svg>
  );
}

export function ChevronIcon({ dir, size = 26 }: { dir: "left" | "right"; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
    </svg>
  );
}

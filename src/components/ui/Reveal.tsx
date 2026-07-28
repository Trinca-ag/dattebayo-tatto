"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  /** Atraso da transição, em ms, para escalonar itens irmãos. */
  delay?: number;
  className?: string;
  /** Elemento renderizado. Padrão `div`; use `span` dentro de heading ou parágrafo. */
  as?: "div" | "span" | "section" | "header" | "li" | "article";
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * O estado vive no atributo `data-reveal` do DOM, não no React: nada aqui provoca
 * re-render, e o conteúdo só é escondido depois que o efeito roda — ou seja, sem JS
 * (e durante a hidratação) a página continua visível e indexável.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    el.dataset.reveal = "out";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "in";
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

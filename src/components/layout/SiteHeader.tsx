"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useFocusTrap, useScrollLock } from "@/hooks/use-modal";
import { INFO, NAV, NAV_WITH_SHOP, waLink } from "@/lib/site";

/** Duração do fade do overlay — o menu só sai do DOM depois dela. */
const OVERLAY_MS = 400;

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

/** `/` só casa exato; as demais rotas também valem para subrotas (`/tatuadores/ana-byte`). */
function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // O overlay continua montado durante o fade-out; fora disso ele some do DOM,
  // para que nenhum link focável fique escondido atrás de `opacity: 0`.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // O foco circula pelo header E pelo overlay: o header é z-90 contra z-88 do
  // overlay, então o logo e o hambúrguer-virado-X continuam visíveis por cima e
  // precisam seguir alcançáveis por teclado.
  const trapRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setVisible(false);
  }, []);

  // Trocar de rota fecha o menu — ajuste durante o render, não em efeito, para
  // não pintar um frame com o overlay aberto sobre a página nova.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    closeMenu();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll(); // o navegador pode restaurar a posição antes da hidratação
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Espera um frame antes de animar a entrada, senão o navegador não vê o estado inicial.
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const timer = window.setTimeout(() => setMounted(false), OVERLAY_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useScrollLock(open);
  useFocusTrap(open, trapRef, closeRef);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // O menu só existe abaixo de 920px; ao passar para desktop ele precisa fechar,
  // senão a trava de scroll ficaria ativa com o overlay já escondido por CSS.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 920px)");
    const onChange = () => {
      if (!mq.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const barClass = "h-0.5 w-5 rounded-[2px] bg-bone transition-transform duration-300";

  return (
    <div ref={trapRef}>
      <header
        className={`fixed inset-x-0 top-0 z-90 border-b backdrop-blur-[14px] transition-[background-color,border-color] duration-[350ms] ${
          scrolled
            ? "border-white/9 bg-[rgba(10,10,11,.74)]"
            : "border-white/5 bg-[rgba(10,10,11,.34)]"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(18px,4vw,40px)] transition-[height] duration-[350ms] ${EASE} ${
            scrolled ? "h-[60px]" : "h-[78px]"
          }`}
        >
          <Link
            href="/"
            aria-label="Dattebayo Tattoo — início"
            className="flex items-center gap-[11px] leading-none no-underline"
          >
            <Image
              src="/logo-dattebayo.png"
              alt=""
              width={42}
              height={42}
              loading="eager"
              className="block h-[42px] w-[42px] shrink-0 object-contain"
            />
            <span className="flex flex-col gap-px">
              <span
                lang="ja"
                aria-hidden="true"
                className="font-jp text-brand text-[11px] font-bold tracking-[.32em]"
              >
                だってばよ
              </span>
              <span className="font-display text-bone text-[19px] font-bold tracking-[-.01em]">
                DATTEBAYO <span className="text-ash font-medium">TATTOO</span>
              </span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-[30px] min-[921px]:flex">
            {NAV.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group font-display relative py-1.5 text-[14.5px] font-semibold tracking-[.01em] no-underline transition-colors duration-[250ms] ${
                    active ? "text-bone" : "text-ash hover:text-bone"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-[2px] bg-[linear-gradient(90deg,var(--color-brand),var(--color-brand-deep))] transition-transform duration-300 ${EASE} ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            <a
              href={INFO.supply}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dattebayo Supply — loja (abre em nova aba)"
              className="font-display text-ash hover:text-brand relative text-[14.5px] font-semibold no-underline transition-colors duration-[250ms]"
            >
              Loja{" "}
              <span aria-hidden="true" className="text-[.8em]">
                ↗
              </span>
            </a>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gradient text-ink font-display rounded-full px-5 py-[11px] text-sm font-bold no-underline shadow-[0_6px_18px_-8px_rgba(255,92,0,.6)] transition-[box-shadow,transform] duration-[280ms] hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(255,122,26,.6),0_10px_26px_-6px_rgba(255,92,0,.7)]"
            >
              Agendar horário
            </a>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => (open ? closeMenu() : openMenu())}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex h-[46px] w-[46px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/6 p-0 min-[921px]:hidden"
          >
            <span
              aria-hidden="true"
              className={barClass}
              style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
            />
            <span
              aria-hidden="true"
              className={barClass}
              style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </header>

      {mounted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          // Durante os 400 ms de saída o overlay ainda cobre `inset-0`; sem
          // `pointer-events-none` ele engoliria cliques e o scroll por toque.
          className={`bg-ink fixed inset-0 z-88 flex flex-col justify-center transition-opacity duration-[400ms] ${
            open ? "" : "pointer-events-none"
          }`}
          style={{ opacity: visible ? 1 : 0 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_12%,rgba(255,92,0,.24),transparent_60%)]"
          />
          <span
            lang="ja"
            aria-hidden="true"
            className="font-jp pointer-events-none absolute right-[-4vw] bottom-[2vh] text-[34vw] leading-[.8] font-black text-[rgba(255,92,0,.06)] select-none"
          >
            タトゥー
          </span>

          <button
            ref={closeRef}
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="text-bone absolute top-5 right-5 flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-xl border border-white/14 bg-white/6 text-xl"
          >
            ✕
          </button>

          <nav aria-label="Menu" className="relative flex flex-col gap-1.5 px-[30px]">
            {NAV_WITH_SHOP.map((link, i) => {
              const style = {
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transitionDelay: visible ? `${i * 60 + 90}ms` : "0ms",
              };
              const className = `font-display text-bone block py-[9px] text-[clamp(30px,9vw,46px)] font-bold tracking-[-.02em] no-underline transition-[opacity,transform] duration-500 ${EASE}`;

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className={className}
                    style={style}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-brand ml-2.5 inline-block align-middle text-[.55em]"
                    >
                      ↗
                    </span>
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href, pathname) ? "page" : undefined}
                  onClick={closeMenu}
                  className={className}
                  style={style}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="bg-brand-gradient text-ink font-display mt-[26px] self-start rounded-full px-[26px] py-[15px] text-base font-bold no-underline shadow-[0_10px_30px_-8px_rgba(255,92,0,.6)] transition-[opacity,transform] duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transitionDelay: visible ? "420ms" : "0ms",
              }}
            >
              Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

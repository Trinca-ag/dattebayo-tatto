"use client";

import { useEffect, useRef } from "react";

import { GhostCta, SolidCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { waLink } from "@/lib/site";

const VIDEO_CLASS =
  "absolute inset-0 h-full w-full object-cover object-center [transition:opacity_.7s_ease]";

/** Abertura da home: dois clipes em crossfade, parallax leve e o CTA principal. */
export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Crossfade infinito: quem termina apaga, o outro reinicia do zero.
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    // Vários navegadores só liberam autoplay com o mute aplicado no próprio elemento.
    for (const video of [a, b]) {
      video.muted = true;
      video.defaultMuted = true;
    }

    const swap = (from: HTMLVideoElement, to: HTMLVideoElement) => () => {
      to.currentTime = 0;
      // Autoplay bloqueado não pode derrubar a página.
      to.play().catch(() => {});
      to.style.opacity = "1";
      from.style.opacity = "0";
    };

    const onEndedA = swap(a, b);
    const onEndedB = swap(b, a);
    a.addEventListener("ended", onEndedA);
    b.addEventListener("ended", onEndedB);

    // O segundo clipe tem 12,8 MB e só aparece quando o primeiro termina. Ele fica
    // com `preload="none"` no HTML e só começa a baixar depois que o primeiro está
    // rodando — antes disso estaria disputando banda com o LCP da página.
    const onPlayingA = () => b.load();
    a.addEventListener("playing", onPlayingA, { once: true });

    if (reduced) {
      // Sem movimento: fica no primeiro frame (poster) e não toca nada.
      a.pause();
      b.pause();
    } else {
      a.play().catch(() => {});
    }

    return () => {
      a.removeEventListener("ended", onEndedA);
      b.removeEventListener("ended", onEndedB);
      a.removeEventListener("playing", onPlayingA);
    };
  }, [reduced]);

  // Parallax do fundo — só no desktop, onde a barra de endereço não briga com o svh.
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || reduced) return;

    let frame = 0;

    const apply = () => {
      frame = 0;
      if (window.innerWidth <= 720) {
        bg.style.transform = "scale(1.08)";
        return;
      }
      bg.style.transform = `scale(1.08) translateY(${Math.min(window.scrollY * 0.14, 90)}px)`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <section aria-label="Início" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div
        ref={bgRef}
        aria-hidden="true"
        className="bg-ink pointer-events-none absolute inset-0 [transform:scale(1.08)] will-change-transform"
      >
        <video
          ref={videoARef}
          src="/hero-tattoo.mp4"
          poster="/studio/lo1.webp"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          className={`${VIDEO_CLASS} opacity-100`}
        />
        <video
          ref={videoBRef}
          src="/hero-tattoo-2.mp4"
          muted
          playsInline
          preload="none"
          tabIndex={-1}
          className={`${VIDEO_CLASS} opacity-0`}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.72)_0%,rgba(10,10,11,.35)_38%,rgba(10,10,11,.82)_82%,#0A0A0B_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(80%_70%_at_82%_18%,rgba(255,92,0,.28),transparent_58%)]"
      />
      <span
        lang="ja"
        aria-hidden="true"
        className="font-jp pointer-events-none absolute top-[16vh] right-[2vw] text-[20vw] leading-[.8] font-black tracking-[-.04em] text-[rgba(255,92,0,.07)] select-none"
      >
        だってばよ
      </span>

      <div className="relative mx-auto w-full max-w-[1280px] px-[clamp(18px,4vw,40px)] pb-[clamp(70px,10vh,120px)]">
        <Reveal className="mb-[22px]">
          <Eyebrow dashWidth={38}>EST. LIBERDADE — SÃO PAULO</Eyebrow>
        </Reveal>

        {/* As três linhas são `span` em bloco: `div` dentro de `h1` é HTML inválido. */}
        <h1 className="font-display text-[clamp(44px,9.2vw,116px)] leading-[.9] font-bold tracking-[-.035em] uppercase">
          <Reveal as="span" delay={60} className="block">
            Tatuagem
          </Reveal>
          <Reveal as="span" delay={150} className="block">
            para quem
          </Reveal>
          <Reveal as="span" delay={240} className="text-gradient-brand block">
            vive anime
          </Reveal>
        </h1>

        <Reveal delay={360}>
          <p className="text-mist mt-[26px] max-w-[520px] text-[clamp(15px,2.2vw,18px)] leading-[1.6]">
            13 artistas residentes. Anime, geek, blackwork, cybergoth, pixel art e muito mais — arte
            autoral no coração da Liberdade.
          </p>
        </Reveal>

        <Reveal delay={440} className="mt-[34px] flex flex-wrap gap-3.5">
          <SolidCta href={waLink()} external>
            Agendar pelo WhatsApp
          </SolidCta>
          <GhostCta href="/tatuadores">Conhecer os tatuadores</GhostCta>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="text-ash absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-[7px]"
      >
        <span className="font-mono text-[9px] leading-none font-bold tracking-[.2em]">SCROLL</span>
        <span className="flex h-[34px] w-[22px] justify-center rounded-xl border-[1.5px] border-white/30 pt-1.5">
          <span className="animate-float bg-brand h-[7px] w-[3px] rounded-[2px]" />
        </span>
      </div>
    </section>
  );
}

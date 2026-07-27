import type { Metadata } from "next";

import { GhostCta, SolidCta } from "@/components/ui/CtaLink";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80svh] items-center overflow-hidden px-[clamp(18px,4vw,40px)] py-[clamp(120px,17vh,170px)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(255,92,0,.16),transparent_60%)]"
      />
      <span
        lang="ja"
        aria-hidden="true"
        className="font-jp pointer-events-none absolute top-[10%] right-[-4vw] leading-[.8] font-black text-[rgba(255,92,0,.06)] select-none text-[28vw]"
      >
        迷子
      </span>

      <div className="relative mx-auto max-w-[720px]">
        <Eyebrow dashWidth={38}>ERRO 404</Eyebrow>
        <h1 className="font-display mt-4 text-[clamp(38px,7vw,84px)] leading-[.92] font-bold tracking-[-.03em] uppercase">
          Essa página não <span className="text-gradient-brand">cicatrizou</span>
        </h1>
        <p className="text-mist mt-5 max-w-[46ch] text-[clamp(15px,2.2vw,18px)] leading-relaxed">
          O link que você seguiu não existe mais — ou nunca existiu. Volte para o começo, conheça os
          13 residentes ou chama a gente no WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <SolidCta href="/">Voltar para a home</SolidCta>
          <GhostCta href="/tatuadores">Ver os 13 tatuadores</GhostCta>
          <GhostCta href={waLink()} external>
            Falar no WhatsApp
          </GhostCta>
        </div>
      </div>
      <WhatsAppFab />
    </main>
  );
}

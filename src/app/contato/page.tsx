import type { Metadata } from "next";

import { BookingForm } from "@/components/contato/BookingForm";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Faq } from "@/components/contato/Faq";
import { MapFacade } from "@/components/contato/MapFacade";
import { GhostCta, SolidCta } from "@/components/ui/CtaLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ARTIST_COUNT } from "@/lib/artists";
import { INFO, SITE_URL, waLink } from "@/lib/site";

const DESCRIPTION =
  "Fale com a Dattebayo Tattoo — agende sua tatuagem anime/geek na Liberdade, SP. WhatsApp (11) 91666-1991, endereço, horários e perguntas frequentes.";

export const metadata: Metadata = {
  // `absolute` porque o título do original já traz a marca e o bairro — o template do layout duplicaria.
  title: { absolute: "Contato e Agendamento | Dattebayo Tattoo — Liberdade, SP" },
  description: DESCRIPTION,
  alternates: { canonical: "/contato" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: INFO.name,
    url: `${SITE_URL}/contato`,
    title: "Contato e Agendamento | Dattebayo Tattoo — Liberdade, SP",
    description: DESCRIPTION,
  },
};

const CARD_LABEL = "font-mono text-dim text-[10px] leading-none font-bold tracking-[.14em]";

export default function ContatoPage() {
  return (
    <main>
      <section
        aria-label="Contato"
        className="relative overflow-hidden px-[clamp(18px,4vw,40px)] pt-[clamp(120px,17vh,168px)] pb-[clamp(28px,4vw,44px)]"
      >
        <span
          lang="ja"
          aria-hidden="true"
          className="font-jp pointer-events-none absolute top-[26%] right-[-1vw] text-[20vw] leading-[.8] font-black select-none"
          style={{ color: "rgba(255,92,0,.055)" }}
        >
          連絡
        </span>
        <div className="relative mx-auto max-w-[1200px]">
          <Eyebrow className="mb-[18px]" dashWidth={38}>
            AGENDAMENTO
          </Eyebrow>
          <h1 className="font-display m-0 text-[clamp(40px,7.5vw,90px)] leading-[.9] font-bold tracking-[-.03em] uppercase">
            Bora tatuar?{" "}
            <span lang="ja" className="font-jp text-brand-light">
              だってばよ!
            </span>
          </h1>
          <p className="text-mist mt-5 max-w-[520px] text-[clamp(15px,2.2vw,18px)] leading-[1.6]">
            Conta sua ideia que a gente te responde rapidinho no WhatsApp. Sem compromisso.
          </p>
        </div>
      </section>

      <section
        aria-label="Formulário e informações"
        className="px-[clamp(18px,4vw,40px)] pt-[clamp(20px,3vw,32px)] pb-[clamp(56px,8vw,90px)]"
      >
        <div className="mx-auto grid max-w-[1200px] gap-[clamp(24px,4vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <Reveal className="flex">
            <BookingForm />
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-4">
            <div className="border-white/9 bg-panel rounded-[18px] border p-[clamp(22px,3vw,30px)]">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gradient text-ink font-display mb-[18px] flex items-center justify-center gap-2.5 rounded-xl py-[15px] text-base font-bold no-underline"
              >
                <WhatsAppIcon size={20} />
                {INFO.phone}
              </a>

              <div className="grid gap-3.5">
                <div>
                  <div className={CARD_LABEL}>ENDEREÇO</div>
                  <p className="text-bone-soft mt-[5px] mb-0 text-[14.5px] leading-[1.6]">
                    {INFO.addr}
                  </p>
                  <a
                    href={INFO.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-light mt-2 inline-flex gap-1.5 text-sm font-semibold no-underline"
                  >
                    Traçar rota <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div>
                  <div className={CARD_LABEL}>INSTAGRAM</div>
                  {/* TODO(estúdio): confirmar o @ oficial do Instagram. */}
                  <a
                    href={INFO.igStudio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone mt-[5px] inline-flex gap-1.5 text-sm font-semibold no-underline"
                  >
                    {INFO.igStudioHandle}{" "}
                    <span aria-hidden="true" className="text-brand-light">
                      ↗
                    </span>
                  </a>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <div className={CARD_LABEL}>HORÁRIO</div>
                    <OpenBadge size="sm" openLabel="ABERTO" closedLabel="FECHADO" />
                  </div>
                  {INFO.hours.map(([day, time], index) => (
                    <div
                      key={day}
                      className={`flex justify-between py-1.5 text-[13.5px] ${
                        index < INFO.hours.length - 1 ? "border-b border-white/6" : ""
                      }`}
                    >
                      <span className="text-mist">{day}</span>
                      <span className="text-ash font-mono text-xs">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <MapFacade />
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Perguntas frequentes"
        className="border-t border-white/6 px-[clamp(18px,4vw,40px)] py-[clamp(56px,8vw,100px)]"
      >
        <div className="mx-auto max-w-[820px]">
          <Reveal className="mb-9 text-center">
            <div className="font-mono text-brand-light mb-3.5 text-[11px] leading-none font-bold tracking-[.22em]">
              FAQ
            </div>
            <h2 className="font-display m-0 text-[clamp(28px,4.6vw,50px)] font-bold tracking-[-.025em]">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <Faq />
          </Reveal>
        </div>
      </section>

      <section
        aria-label="Agende"
        className="relative overflow-hidden border-t border-white/6 px-[clamp(18px,4vw,40px)] pt-[clamp(72px,10vw,140px)] pb-[clamp(64px,9vw,120px)] text-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-cta-glow absolute top-1/2 left-1/2 -mt-[75%] -ml-[50%] h-[150%] w-[min(1000px,120%)] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,92,0,.2),rgba(255,92,0,.06)_55%,transparent_100%)] blur-[30px]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_40%,#0A0A0B_100%)]" />
        </div>

        <Reveal className="relative mx-auto max-w-[820px]">
          <div className="font-mono text-brand-light mb-5 text-[11px] leading-none font-bold tracking-[.24em]">
            ATENDIMENTO NO WHATSAPP
          </div>
          <h2 className="font-display m-0 text-[clamp(30px,5.2vw,58px)] leading-none font-bold tracking-[-.03em] text-balance">
            Fale com o estúdio
          </h2>
          <p className="text-mist mx-auto mt-[22px] max-w-[56ch] text-[clamp(15px,2.1vw,17.5px)] leading-[1.7] text-pretty">
            Envie suas referências, a região do corpo e o tamanho aproximado. Indicamos o artista
            mais adequado ao estilo, passamos o orçamento e reservamos a data da sessão.
          </p>
          <div className="mt-[34px] flex flex-wrap justify-center gap-3.5">
            <SolidCta href={waLink()} size="lg" external shine>
              Chamar no WhatsApp
            </SolidCta>
            <GhostCta href="/tatuadores" size="lg">
              Ver os {ARTIST_COUNT} tatuadores
            </GhostCta>
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px max-w-[340px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)]"
          />
          <div className="font-mono text-dim mt-[22px] flex flex-wrap justify-center gap-x-[26px] gap-y-2.5 text-[12.5px] leading-[1.6] tracking-[.08em]">
            <a
              href={INFO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash no-underline"
            >
              {INFO.addrShort} ↗
            </a>
            <span>{INFO.hoursShort}</span>
          </div>
        </Reveal>
      </section>
      <WhatsAppFab />
    </main>
  );
}

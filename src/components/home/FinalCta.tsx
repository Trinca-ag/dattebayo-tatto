import { SolidCta } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { INFO, waLink } from "@/lib/site";

/** Fechamento da home: kanji gigante, CTA do WhatsApp e o mini-mapa que abre o Google Maps. */
export function FinalCta() {
  return (
    <section
      aria-label="Agende sua tatuagem"
      className="relative overflow-hidden py-[clamp(70px,11vw,150px)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_60%,rgba(255,92,0,.22),transparent_62%)]"
      />
      <span
        lang="ja"
        aria-hidden="true"
        className="font-jp text-brand/6 pointer-events-none absolute top-[8%] left-1/2 -translate-x-1/2 text-[26vw] leading-[.8] font-black select-none"
      >
        侍
      </span>

      <Reveal className="relative mx-auto max-w-[900px] px-[clamp(18px,4vw,40px)] text-center">
        <h2 className="font-display mx-auto max-w-[15ch] text-[clamp(32px,6vw,68px)] leading-[.98] font-bold tracking-[-.03em]">
          Sua próxima tatuagem começa com um{" "}
          <span lang="ja" className="font-jp text-brand-light">
            だってばよ
          </span>
        </h2>

        <div className="mt-[34px] mb-[30px] flex flex-wrap justify-center gap-3.5">
          <SolidCta href={waLink()} size="lg" external>
            Agendar pelo WhatsApp
          </SolidCta>
        </div>

        <div className="text-ash flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-[13.5px]">
          <span>{INFO.addrShort}</span>
          <span aria-hidden="true" className="text-[#3a3a3a]">
            |
          </span>
          <span>Ter–Sáb · 11h–18h30</span>
        </div>

        <a
          href={INFO.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-[26px] block max-w-[520px] no-underline"
        >
          <div className="bg-map-grid relative h-[120px] overflow-hidden rounded-2xl border border-white/12">
            <div
              aria-hidden="true"
              className="bg-brand absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_6px_rgba(255,92,0,.25)]"
            />
            <div className="text-bone-soft absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(to_top,rgba(10,10,11,.9),transparent)] px-3.5 py-2.5 text-[12.5px]">
              <span>Como chegar</span>
              <span className="text-brand-light">Abrir no Google Maps ↗</span>
            </div>
          </div>
        </a>
      </Reveal>
    </section>
  );
}

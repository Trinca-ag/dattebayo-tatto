import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Placeholders idênticos, mantidos do original — o conteúdo real vem do Google. */
const REVIEWS = [
  {
    quote: "Espaço da avaliação real do Google. Substituir por depoimento verdadeiro de cliente.",
    tag: "AVALIAÇÃO DE EXEMPLO — SUBSTITUIR",
  },
  {
    quote: "Espaço da avaliação real do Google. Substituir por depoimento verdadeiro de cliente.",
    tag: "AVALIAÇÃO DE EXEMPLO — SUBSTITUIR",
  },
  {
    quote: "Espaço da avaliação real do Google. Substituir por depoimento verdadeiro de cliente.",
    tag: "AVALIAÇÃO DE EXEMPLO — SUBSTITUIR",
  },
];

/** Prova social da home. Os três cards são reservas de espaço, não depoimentos reais. */
export function Reviews() {
  return (
    <section aria-label="Avaliações" className="py-[clamp(56px,8vw,100px)]">
      <Reveal className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <Eyebrow className="mb-7">QUEM TATUOU, RECOMENDA</Eyebrow>
        {/* TODO(estúdio): substituir pelas avaliações reais do Google — não inventar nomes de clientes. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-white/9 px-[22px] py-6">
              <div aria-hidden="true" className="text-brand-light mb-3 text-sm tracking-[3px]">
                ★★★★★
              </div>
              <p className="text-bone-soft mb-4 text-[14.5px] leading-[1.65]">{review.quote}</p>
              <div className="font-mono text-dim text-[10px] leading-none font-bold tracking-[.14em]">
                {review.tag}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

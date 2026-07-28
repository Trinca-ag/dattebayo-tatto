import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Avaliações reais do perfil do Google (Google Meu Negócio) do estúdio — 5,0★.
 * Nomes e textos são de clientes verdadeiros, capturados do Google Maps
 * (lightly trimmed para caber no card, sem alterar o sentido).
 * Ao atualizar: use SÓ avaliações reais; nunca invente nomes ou depoimentos.
 */
const REVIEWS = [
  {
    quote:
      "Estúdio super legal, próximo ao metrô Vergueiro e fácil de chegar caminhando. Ambiente limpo e bem cuidado, atendimento excelente. Pretendo voltar mais vezes, com certeza!",
    author: "Carol Carvalho Aragão",
  },
  {
    quote:
      "Se tem um lugar que eu recomendo sem pestanejar, é aqui. O ambiente é muito bom e os profissionais são todos fantásticos. Fiz meu trabalho com o Kyoto — um cara gente boa demais.",
    author: "Eduardo Rodrigues",
  },
  {
    quote:
      "Dattebayo é sensacional! Todo mundo aqui é gente boa demais e, o melhor, tattoo de qualidade brabíssima! Deixaria eles me tatuarem de olhos fechados. Ambiente estiloso, limpo e super agradável.",
    author: "Vinicius Martins de Andrade",
  },
];

/** Prova social da home: avaliações reais do Google Meu Negócio. */
export function Reviews() {
  return (
    <section aria-label="Avaliações" className="py-[clamp(56px,8vw,100px)]">
      <Reveal className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <Eyebrow className="mb-7">QUEM TATUOU, RECOMENDA</Eyebrow>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {REVIEWS.map((review) => (
            <figure
              key={review.author}
              className="bg-surface rounded-2xl border border-white/9 px-[22px] py-6"
            >
              <div aria-hidden="true" className="text-brand-light mb-3 text-sm tracking-[3px]">
                ★★★★★
              </div>
              <blockquote className="text-bone-soft mb-4 text-[14.5px] leading-[1.65]">
                {review.quote}
              </blockquote>
              <figcaption>
                <div className="font-display text-bone text-sm font-semibold">{review.author}</div>
                <div className="font-mono text-dim mt-1 text-[10px] leading-none font-bold tracking-[.14em]">
                  AVALIAÇÃO NO GOOGLE
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { useState } from "react";

/** Perguntas frequentes do estúdio, na ordem em que aparecem na página. */
const FAQ: readonly (readonly [string, string])[] = [
  [
    "Como funciona o orçamento?",
    "Você manda a ideia e as referências pelo WhatsApp e a gente monta o orçamento com base no tamanho, no nível de detalhe, na região do corpo e no artista escolhido. Sem custo pra tirar dúvidas.",
  ],
  [
    "Precisa pagar sinal?",
    "Normalmente pedimos um sinal para reservar a data — ele é abatido do valor final. Os detalhes são confirmados no atendimento.",
  ],
  [
    "Dói muito?",
    "Depende da região e de cada pessoa. A gente trabalha pra deixar a sessão o mais confortável possível, com pausas sempre que precisar.",
  ],
  [
    "Posso levar minha própria arte ou referência?",
    "Com certeza — adoramos! Seu artista adapta a referência ao seu corpo e ao estilo dele, mantendo a essência do que você quer.",
  ],
  [
    "Como cuido da tatuagem depois?",
    "Você sai com todas as orientações. No geral: manter limpa e hidratada, evitar sol, mar e piscina até cicatrizar, e nada de coçar. A gente acompanha esse processo com você.",
  ],
  [
    "A partir de que idade posso tatuar?",
    "Maiores de 18 anos, com documento com foto. Menores de idade dependem da política do estúdio e presença dos responsáveis.",
  ],
  [
    "Vocês cobrem trabalhos de outros estúdios?",
    "Sim, fazemos cobertura e reparo — o que é possível depende de uma avaliação do artista sobre a tattoo atual.",
  ],
  [
    "Quais as formas de pagamento?",
    "Aceitamos as principais formas de pagamento; confirme as opções e condições no atendimento.",
  ],
];

/** Acordeão de item único: abrir uma pergunta fecha a anterior. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div>
      {FAQ.map(([question, answer], index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={question} className="border-b border-white/9">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="font-display text-bone flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-1 py-5 text-left text-[clamp(15px,2.2vw,18px)] font-semibold"
              >
                <span>{question}</span>
                <span
                  aria-hidden="true"
                  className={`text-brand-light flex-none text-[22px] leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            {/*
              Truque do grid 0fr → 1fr: anima altura automática sem medir o conteúdo em JS.
              O filho precisa de `overflow-hidden` para o texto ser cortado durante a transição.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-ash mx-1 mt-0 mb-[22px] text-[14.5px] leading-[1.7]">{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

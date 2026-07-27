import { Reveal } from "@/components/ui/Reveal";
import { StrokeIcon } from "@/components/ui/icons";

const PERKS = [
  {
    d: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
    title: "Especialistas em anime/geek",
    text: "O traço do seu personagem favorito, com fidelidade de quem também é fã.",
  },
  {
    d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
    title: "Biossegurança total",
    text: "Material descartável e esterilização, do jeito certo — sem abrir mão de nada.",
  },
  {
    d: "M4 20l4-1 9-9-3-3-9 9-1 4zM14 5l3 3",
    title: "Projetos autorais",
    text: "Arte exclusiva, desenhada do zero para o seu projeto.",
  },
  {
    d: "M3 5h18v11H3zM3 20h18M8 16v4M16 16v4",
    title: "Experiência imersiva",
    text: "Um estúdio que parece uma galeria geek no coração da Liberdade.",
  },
] as const;

/** Quatro cards de diferenciais do estúdio, logo abaixo da galeria de trabalhos. */
export function Perks() {
  return (
    <section
      aria-label="Diferenciais"
      className="border-t border-white/6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,40px)]">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="relative rounded-2xl border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01))] px-[22px] py-[26px] backdrop-blur-[6px]"
            >
              <div className="border-brand/25 bg-brand/10 text-brand-light mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-xl border">
                <StrokeIcon d={perk.d} />
              </div>
              <h3 className="font-display mb-2 text-[19px] font-bold tracking-[-.01em]">
                {perk.title}
              </h3>
              <p className="text-ash text-sm leading-[1.6]">{perk.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

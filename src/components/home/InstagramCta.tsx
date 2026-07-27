import { SolidCta } from "@/components/ui/CtaLink";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { INFO } from "@/lib/site";

/** Faixa de comunidade entre as avaliações e o CTA final. */
export function InstagramCta() {
  return (
    <section aria-label="Comunidade" className="border-y border-white/6 py-[clamp(50px,7vw,90px)]">
      <Reveal className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-[26px] px-[clamp(18px,4vw,40px)]">
        <div>
          <h2 className="font-display mb-2.5 text-[clamp(26px,4vw,44px)] font-bold tracking-[-.02em]">
            Siga a Dattebayo
          </h2>
          <p className="text-ash text-[15px]">
            Flash days, novidades e o dia a dia do estúdio no Instagram.
          </p>
        </div>
        {/* TODO(estúdio): confirmar o @ oficial do Instagram. */}
        <SolidCta
          href={INFO.igStudio}
          size="sm"
          external
          aria-label="Instagram do estúdio (abre em nova aba)"
        >
          <InstagramIcon />
          Seguir no Instagram <span aria-hidden="true">↗</span>
        </SolidCta>
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/image-sizes";

const MAIN = img("/studio/lo2.webp");
const DETAIL = img("/studio/lo3.webp");
const LOUNGE = img("/studio/lo4.webp");

// O mosaico ocupa metade do container (máx. 1280px) e se divide em duas colunas.
const MOSAIC_SIZES = "(max-width: 700px) 47vw, 290px";

/** Chamada para a página Sobre, com um mosaico de três fotos do espaço. */
export function StudioTeaser() {
  return (
    <section aria-label="O estúdio" className="border-t border-white/6 py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 px-[clamp(18px,4vw,40px)]">
        <Reveal>
          <Eyebrow className="mb-4">O ESPAÇO</Eyebrow>
          <h2 className="font-display mb-[18px] text-[clamp(28px,4.6vw,50px)] leading-none font-bold tracking-[-.025em]">
            Uma galeria geek na Liberdade
          </h2>
          <p className="text-mist mb-4 text-[15px] leading-[1.7]">
            Tijolo aparente, preto fosco, neon em trilho e uma parede de arte autoral de anime.
            Estantes cheias de figures, café na chegada e um terraço grafitado — o estúdio é um
            destino, não só um serviço.
          </p>
          <Link
            href="/sobre"
            className="font-display text-brand-light inline-flex items-center gap-2 text-[15px] font-semibold no-underline"
          >
            Conheça nossa história <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-3">
          <Image
            src={MAIN.src}
            width={MAIN.width}
            height={MAIN.height}
            alt="Ambiente do estúdio Dattebayo"
            sizes={MOSAIC_SIZES}
            className="row-span-2 aspect-[3/4] h-full w-full rounded-[14px] object-cover"
          />
          <Image
            src={DETAIL.src}
            width={DETAIL.width}
            height={DETAIL.height}
            alt="Detalhe do estúdio com colecionáveis"
            sizes={MOSAIC_SIZES}
            className="aspect-square w-full rounded-[14px] object-cover"
          />
          <Image
            src={LOUNGE.src}
            width={LOUNGE.width}
            height={LOUNGE.height}
            alt="Espaço de atendimento do estúdio"
            sizes={MOSAIC_SIZES}
            className="aspect-square w-full rounded-[14px] object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

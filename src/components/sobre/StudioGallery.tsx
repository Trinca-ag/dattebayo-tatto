"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/image-sizes";
import { STUDIO_PHOTOS } from "@/lib/site";

/** As 5 fotos com as dimensões reais; a ordem da lista é a ordem do lightbox. */
const PHOTOS = STUDIO_PHOTOS.map((photo) => ({
  ...img(photo.src),
  alt: photo.alt,
}));

type Photo = (typeof PHOTOS)[number];

function PhotoButton({
  photo,
  sizes,
  onOpen,
}: {
  photo: Photo;
  sizes: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar: ${photo.alt}`}
      className="group border-white/8 bg-surface block w-full cursor-pointer overflow-hidden rounded-[14px] border p-0"
    >
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        // O nome acessível já vem do aria-label do botão — repetir aqui faria o leitor de tela ler duas vezes.
        alt=""
        sizes={sizes}
        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
      />
    </button>
  );
}

/** Galeria do espaço: foto de destaque + grade 2×2, todas abrindo o mesmo lightbox. */
export function StudioGallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <Reveal className="mb-3.5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(20px,3.4vw,40px)]">
        <PhotoButton
          photo={PHOTOS[0]}
          sizes="(min-width: 1180px) 530px, 100vw"
          onOpen={() => setIndex(0)}
        />
        <div>
          <h2 className="font-display text-[clamp(28px,4.6vw,50px)] font-bold tracking-[-.025em]">
            O espaço
          </h2>
          <p className="text-mist mt-3.5 text-base leading-[1.7] text-pretty">
            Duas salas, um terraço e cada canto pensado pra quem ama a cultura: parede-galeria com
            quadros autorais, estantes de figures, bonsai, sofá pra esperar sem pressa e o grafite
            do terraço pra fechar a visita. Clique em qualquer foto para ampliar.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60} className="grid grid-cols-2 gap-3.5">
        {PHOTOS.slice(1).map((photo, i) => (
          <PhotoButton
            key={photo.src}
            photo={photo}
            sizes="(min-width: 1180px) 543px, 50vw"
            onOpen={() => setIndex(i + 1)}
          />
        ))}
      </Reveal>

      <Lightbox
        photos={PHOTOS}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        label="Fotos do estúdio Dattebayo"
        alt={(photo) => photo.alt}
      />
    </>
  );
}

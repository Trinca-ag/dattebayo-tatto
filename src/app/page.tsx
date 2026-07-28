import type { Metadata } from "next";

import { ArtistCarousel } from "@/components/home/ArtistCarousel";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Perks } from "@/components/home/Perks";
import { Process } from "@/components/home/Process";
import { RecentWorks } from "@/components/home/RecentWorks";
import { Reviews } from "@/components/home/Reviews";
import { StudioTeaser } from "@/components/home/StudioTeaser";
import { StudioJsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  description:
    "Dattebayo Tattoo — estúdio de tatuagem anime & geek na Liberdade, São Paulo. 13 artistas residentes: anime, blackwork, cybergoth, pixel art e mais.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <StudioJsonLd />
      <Hero />
      <Marquee />
      <ArtistCarousel />
      <RecentWorks />
      <Perks />
      <Process />
      <StudioTeaser />
      <Reviews />
      <FinalCta />
      <WhatsAppFab />
    </main>
  );
}

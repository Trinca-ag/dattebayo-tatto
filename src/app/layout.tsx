import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { INFO, SITE_URL } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Zen Kaku Gothic New, usada só nos ornamentos japoneses (だってばよ, タトゥー, 刺青,
// 連絡, 侍, 物語, 尊重, 技術…).
//
// Vem de arquivo local em vez do `next/font/google` de propósito: o subset japonês
// não é exposto pelo loader do Google no next/font, então os kanji cairiam numa
// fonte de sistema. Os .woff2 em ./fonts são subsets com exatamente os glifos que
// o site usa (~4,7 KB cada, contra vários MB da fonte CJK completa).
// Para incluir um novo caractere japonês, gere o subset de novo — veja o README.
const zenKaku = localFont({
  src: [
    { path: "./fonts/zen-kaku-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/zen-kaku-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/zen-kaku-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dattebayo Tattoo — Estúdio de Tatuagem Anime & Geek na Liberdade, SP",
    template: "%s | Dattebayo Tattoo",
  },
  description:
    "Dattebayo Tattoo — estúdio de tatuagem anime & geek na Liberdade, São Paulo. 13 artistas residentes: anime, blackwork, cybergoth, pixel art e mais.",
  applicationName: INFO.name,
  keywords: [
    "tatuagem anime",
    "tattoo geek",
    "estúdio de tatuagem Liberdade",
    "tatuador São Paulo",
    "blackwork",
    "cybergoth",
    "pixel art tattoo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: INFO.name,
    title: "Dattebayo Tattoo — Estúdio de Tatuagem Anime & Geek na Liberdade, SP",
    description:
      "13 artistas residentes. Anime, geek, blackwork, cybergoth, pixel art e muito mais — arte autoral no coração da Liberdade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dattebayo Tattoo — Tatuagem Anime & Geek na Liberdade, SP",
    description: "13 artistas residentes. Arte autoral no coração da Liberdade, São Paulo.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `data-scroll-behavior="smooth"` faz o Next neutralizar o scroll suave durante a
    // troca de rota (o Next 16 deixou de fazer isso por padrão), mantendo o
    // `scroll-behavior: smooth` apenas para âncoras internas.
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${zenKaku.variable}`}
    >
      <body className="bg-ink text-bone font-body antialiased">
        <a
          href="#conteudo"
          className="bg-brand-gradient text-ink font-display sr-only rounded-full px-5 py-3 text-sm font-bold focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120]"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        {/* O botão flutuante do WhatsApp é renderizado por cada página, e não aqui,
            para que a página do artista possa personalizar a mensagem no servidor. */}
        <div id="conteudo">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

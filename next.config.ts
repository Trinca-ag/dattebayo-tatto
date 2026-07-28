import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Todas as fotos são locais (public/) e já vêm em WebP; o AVIF rende mais
    // alguns KB nos retratos grandes do portfólio.
    formats: ["image/avif", "image/webp"],
  },
  // Cabeçalhos de segurança básicos — o site não tem backend nem login, então
  // o essencial é impedir embed de terceiros e vazamento de referrer.
  async headers() {
    // O padrão do /public é `max-age=0, must-revalidate`: toda visita gasta uma
    // ida ao servidor (304) antes do primeiro byte do vídeo. Uma hora de cache
    // deixa a volta instantânea sem travar uma futura troca do clipe.
    const heroMedia = {
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, stale-while-revalidate=604800",
        },
      ],
    };

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      { source: "/hero-tattoo.mp4", ...heroMedia },
      { source: "/hero-tattoo-2.mp4", ...heroMedia },
      { source: "/hero-poster.webp", ...heroMedia },
    ];
  },
};

export default nextConfig;

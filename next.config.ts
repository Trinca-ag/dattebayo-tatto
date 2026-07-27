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
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

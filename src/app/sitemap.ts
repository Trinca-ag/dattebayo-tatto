import type { MetadataRoute } from "next";

import { ARTISTS } from "@/lib/artists";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/tatuadores", priority: 0.9 },
    { path: "/sobre", priority: 0.7 },
    { path: "/contato", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...ARTISTS.map((artist) => ({
      url: `${SITE_URL}/tatuadores/${artist.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

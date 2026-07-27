import { INFO, SITE_URL } from "@/lib/site";

/**
 * Dados estruturados do estúdio (schema.org/TattooParlor).
 * Ajuda o Google a mostrar endereço, telefone e horário direto na busca local.
 */
export function StudioJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: INFO.name,
    url: SITE_URL,
    telephone: INFO.phoneE164,
    image: `${SITE_URL}/studio/lo1.webp`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: INFO.street,
      addressLocality: INFO.city,
      addressRegion: INFO.region,
      postalCode: INFO.postalCode,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "18:30",
      },
    ],
    sameAs: [INFO.igStudio, INFO.supply],
  };

  return (
    <script
      type="application/ld+json"
      // O objeto é totalmente estático e definido aqui, sem entrada de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

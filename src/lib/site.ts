/**
 * Fonte única de verdade dos dados do estúdio: endereço, contato, horário e navegação.
 * Nenhum componente deve repetir número de telefone, link do WhatsApp ou endereço.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dattebayotattoo.com.br";

export const INFO = {
  name: "Dattebayo Tattoo",
  addr: "R. Sen. Felício dos Santos, 373 — Liberdade, São Paulo — SP, 01511-010",
  addrShort: "R. Sen. Felício dos Santos, 373 — Liberdade, SP",
  street: "R. Sen. Felício dos Santos, 373",
  bairro: "Liberdade, São Paulo",
  city: "São Paulo",
  region: "SP",
  postalCode: "01511-010",
  phone: "(11) 91666-1991",
  phoneE164: "+5511916661991",
  wa: "https://wa.me/5511916661991",
  waText: "Olá! Vim pelo site e quero agendar uma tatuagem 🧡",
  maps: "https://www.google.com/maps/search/?api=1&query=R.%20Sen.%20Fel%C3%ADcio%20dos%20Santos%2C%20373%20-%20Liberdade%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001511-010",
  mapEmbed:
    "https://www.google.com/maps?q=R.%20Sen.%20Fel%C3%ADcio%20dos%20Santos%2C%20373%20-%20Liberdade%2C%20S%C3%A3o%20Paulo&output=embed",
  igStudio: "https://www.instagram.com/dattebayotattoo/",
  igStudioHandle: "@dattebayotattoo",
  supply: "https://www.dattebayosupply.com.br/",
  /** Horário de funcionamento: Ter–Sáb 11:00–18:30 · Dom/Seg fechado. */
  hours: [
    ["Terça — Sábado", "11:00 – 18:30"],
    ["Domingo & Segunda", "Fechado"],
  ] as const,
  /** Forma corrida do horário, para linhas de texto (não para a tabela do rodapé). */
  hoursShort: "Terça a sábado · 11:00 – 18:30",
  openDays: [2, 3, 4, 5, 6] as const, // 0 = domingo … 6 = sábado
  openFrom: 11 * 60,
  openTo: 18 * 60 + 30,
} as const;

/** Monta um link do WhatsApp já com a mensagem pré-preenchida. */
export function waLink(msg?: string): string {
  return `${INFO.wa}?text=${encodeURIComponent(msg || INFO.waText)}`;
}

/**
 * "Está aberto agora?" a partir do relógio informado.
 *
 * Depende da hora local, então NUNCA deve ser chamado durante a renderização no
 * servidor — o resultado divergiria do cliente e quebraria a hidratação.
 * Use o hook `useIsOpenNow`, que só resolve depois da montagem.
 */
export function isOpenNow(date: Date = new Date()): boolean {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return (
    (INFO.openDays as readonly number[]).includes(date.getDay()) &&
    minutes >= INFO.openFrom &&
    minutes < INFO.openTo
  );
}

export type NavKey = "home" | "sobre" | "tatuadores" | "contato";

export type NavLink = {
  label: string;
  href: string;
  key?: NavKey;
  external?: boolean;
};

/** Navegação principal (header e rodapé compartilham esta lista). */
export const NAV: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Sobre", href: "/sobre", key: "sobre" },
  { label: "Tatuadores", href: "/tatuadores", key: "tatuadores" },
  { label: "Contato", href: "/contato", key: "contato" },
];

/** Navegação do menu mobile e do rodapé — inclui a loja externa entre Tatuadores e Contato. */
export const NAV_WITH_SHOP: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Sobre", href: "/sobre", key: "sobre" },
  { label: "Tatuadores", href: "/tatuadores", key: "tatuadores" },
  { label: "Loja", href: INFO.supply, external: true },
  { label: "Contato", href: "/contato", key: "contato" },
];

/** Fotos do espaço, na ordem em que aparecem no lightbox da página Sobre. */
export const STUDIO_PHOTOS = [
  { src: "/studio/lo1.webp", alt: "Galeria de quadros de anime do estúdio Dattebayo" },
  { src: "/studio/lo4.webp", alt: "Espaço de atendimento do estúdio" },
  { src: "/studio/lo5.webp", alt: "Detalhe do terraço grafitado" },
  { src: "/studio/lo2.webp", alt: "Ambiente com colecionáveis e plantas" },
  { src: "/studio/lo3.webp", alt: "Estantes com action figures" },
] as const;

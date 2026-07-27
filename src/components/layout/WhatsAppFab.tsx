import { WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/site";

/**
 * Botão flutuante do WhatsApp, presente em todas as páginas.
 *
 * É um Server Component de propósito: como fica no rodapé de toda rota, qualquer
 * dependência de cliente aqui entraria no bundle compartilhado do site inteiro.
 * A personalização por artista chega pela prop `message`, resolvida no servidor —
 * antes isso vinha de `usePathname()` + `bySlug()`, o que arrastava as 13 biografias
 * para o JS de páginas como /sobre e a 404, onde nada daquilo é usado.
 *
 * A pulsação não precisa de `useReducedMotion()`: o `globals.css` já zera animações
 * sob `prefers-reduced-motion`.
 */
export function WhatsAppFab({ message }: { message?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp (abre em nova aba)"
      className="bg-brand-gradient text-ink animate-pulse-ring fixed right-[clamp(16px,4vw,28px)] bottom-[clamp(16px,4vw,28px)] z-70 flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-[0_10px_30px_-6px_rgba(255,92,0,.7)]"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

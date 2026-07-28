import { INFO } from "@/lib/site";

/**
 * Mapa do estúdio incorporado do Google Maps.
 *
 * Preenche o contêiner pai, que define altura, borda e cantos.
 * `loading="lazy"` adia a carga até o mapa chegar perto da viewport — quem não
 * rola até aqui não baixa os scripts do Google. O filtro escurece o mapa (claro
 * por padrão) para casar com o tema do site.
 */
export function StudioMap() {
  return (
    <iframe
      title="Mapa do estúdio Dattebayo Tattoo — R. Sen. Felício dos Santos, 373, Liberdade, São Paulo"
      src={INFO.mapEmbed}
      loading="lazy"
      className="block h-full w-full border-0 [filter:invert(.92)_hue-rotate(180deg)_saturate(.6)]"
    />
  );
}

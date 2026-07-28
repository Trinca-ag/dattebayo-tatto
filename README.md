# Dattebayo Tattoo — site

Site institucional do estúdio Dattebayo Tattoo (Liberdade, São Paulo), reescrito em
**Next.js 16 · React 19 · TypeScript · Tailwind CSS v4**.

É a reconstrução do protótipo original em formato DesignCode (`.dc.html`), que ficou preservado
na pasta acima (`../*.dc.html`) como referência visual.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack, padrão no Next 16) |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (o `next lint` foi removido no Next 16) |
| `npm run image-sizes` | Relê as dimensões dos `.webp` e regenera `src/lib/image-sizes.ts` |
| `npm run jp-font` | Regera os subsets da fonte japonesa |

## Estrutura

```
src/
  app/
    layout.tsx              fontes, metadata global, header/rodapé/FAB
    globals.css             tokens do Tailwind v4, keyframes, base
    page.tsx                /            (home)
    sobre/page.tsx          /sobre
    tatuadores/page.tsx     /tatuadores
    tatuadores/[slug]/      /tatuadores/ana-byte  (13 páginas estáticas)
    contato/page.tsx        /contato
    not-found.tsx           404
    sitemap.ts · robots.ts
    fonts/                  subsets .woff2 da Zen Kaku Gothic New
  components/
    layout/                 SiteHeader · SiteFooter · WhatsAppFab
    ui/                     ArtistCard · Lightbox · Reveal · OpenBadge · Eyebrow · CtaLink · icons · JsonLd
    home/ tatuadores/ artista/ sobre/ contato/    seções específicas de cada página
  lib/
    site.ts                 endereço, contato, horário, navegação  ← fonte única
    artists.ts              os 13 residentes                        ← fonte única
    image-sizes.ts          GERADO — dimensões dos .webp
    color.ts                helpers de cor para o accent por artista
  hooks/                    useReducedMotion · useIsOpenNow
scripts/                    geradores (image-sizes, jp-font-subset)
public/
  artists/<slug>/           perfil.webp · perfil2.webp · w<obra>-<foto>.webp
  studio/lo1..lo5.webp      fotos do espaço
  hero-tattoo*.mp4          vídeos do hero
```

## Editando conteúdo

Quase tudo sai de dois arquivos:

- **`src/lib/site.ts`** — endereço, telefone, WhatsApp, horário, links de Instagram/loja, navegação.
  Nenhum componente repete esses valores: mudou aqui, mudou no site inteiro.
- **`src/lib/artists.ts`** — os 13 residentes.

### Adicionar um tatuador

1. Crie `public/artists/<slug>/` com `perfil.webp`, `perfil2.webp` e as fotos `w1-1.webp`…`w6-N.webp`.
   - `perfil2.webp` é o estado padrão do card (camiseta preta / fundo laranja);
     `perfil.webp` é o negativo, usado no hover e como retrato na página do artista.
2. Acrescente um objeto no array `RAW` de `src/lib/artists.ts`. `workCounts[i]` é quantas fotos a
   obra `i+1` tem — obras com mais de uma foto viram carrossel dentro do lightbox.
3. Rode `npm run image-sizes`.

A grade, o carrossel da home, o filtro por estilo, o sitemap, o `<select>` do formulário e a
navegação anterior/próximo se atualizam sozinhos. O texto "13 artistas" vem de `ARTIST_COUNT`.

### Fotos

`src/lib/image-sizes.ts` é **gerado** — não edite à mão. Ele guarda a largura e a altura reais de
cada `.webp`, lidas dos cabeçalhos RIFF pelo `scripts/image-sizes.mjs`. Com isso o `next/image`
reserva o espaço certo antes de carregar (zero layout shift) sem precisar de `fill` em toda foto.

### Caracteres japoneses

Os ornamentos (だってばよ, 刺青, 連絡, 侍…) usam a Zen Kaku Gothic New servida de
`src/app/fonts/`. Os arquivos são subsets com **só** os glifos usados (~5 KB por peso).
O `next/font/google` não expõe o subset japonês dessa família, então os kanji cairiam numa fonte
de sistema — daí o arquivo local.

Ao usar um caractere japonês novo, some-o à constante `GLYPHS` em `scripts/jp-font-subset.mjs` e
rode `npm run jp-font`. Sem isso, o caractere novo não existe no arquivo e o navegador cai no
fallback.

## Decisões que valem saber

- **Header e rodapé ficam no `layout.tsx`**; a página ativa no menu sai de `usePathname()`.
- **O botão flutuante do WhatsApp é renderizado por cada página**, não pelo layout, e é um Server
  Component. Assim a página do artista personaliza a mensagem no servidor
  (`Olá! … com {nome} ({handle})`) sem que o dataset dos 13 artistas entre no JS de rotas como
  /sobre e a 404. Ao criar uma página nova, lembre de incluir `<WhatsAppFab />`.
- **Dois tons foram clareados em relação ao protótipo** para passar no contraste AA (WCAG 1.4.3):
  `--color-dim` de `#6E6E75` (3.91:1) para `#787880` (4.52:1), e o placeholder dos campos de
  `#5a5a60` (2.63:1) para `#82828A` (4.73:1). Ambos carregam texto real — telefone, endereço,
  horário, formato do telefone.
- **Horário de funcionamento é resolvido no cliente.** `useIsOpenNow()` retorna `null` até a
  montagem: o servidor renderiza no fuso dele e o resultado divergiria do relógio do visitante.
  O selo só aparece depois que o valor existe.
- **O reveal ao rolar esconde o conteúdo via JS, não no HTML.** Sem JavaScript (ou antes da
  hidratação) tudo continua visível e indexável.
- **O mapa do Google carrega sob demanda** na página de contato — um clique troca a fachada
  estática pelo iframe, evitando o request e os cookies de terceiro em toda visita.
- **`prefers-reduced-motion`** é respeitado tanto no CSS (`globals.css`) quanto no JS
  (`useReducedMotion()`), que desliga autoplay de vídeo, parallax e scroll suave programático.
- **O lightbox só existe no DOM quando aberto**, com trava de foco e devolução do foco ao fechar.

## Pendências de conteúdo

Marcadas no código como `TODO(estúdio)`:

- Substituir as **avaliações de exemplo** da home por depoimentos reais do Google.
- Confirmar **ano de fundação, fundadores e marcos** citados na página Sobre.
- Definir a `NEXT_PUBLIC_SITE_URL` de produção (o padrão em `src/lib/site.ts` é um palpite e
  alimenta canonical, sitemap e Open Graph).

## Deploy

Sem backend, banco ou variável de ambiente obrigatória — qualquer host de Next.js serve.
A única variável opcional é:

```bash
NEXT_PUBLIC_SITE_URL="https://dominio-do-estudio.com.br"
```

As 13 páginas de artista são pré-renderizadas em build via `generateStaticParams`.

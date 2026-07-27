import Image from "next/image";
import Link from "next/link";

import { SolidCta } from "@/components/ui/CtaLink";
import { InstagramIcon } from "@/components/ui/icons";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { INFO, NAV_WITH_SHOP, waLink } from "@/lib/site";

const COL_HEAD = "font-mono text-[11px] tracking-[.16em] uppercase text-dim mb-4";

export function SiteFooter() {
  // Server Component não re-renderiza no cliente, então o ano do build não diverge na hidratação.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone font-body relative overflow-hidden border-t border-white/7">
      <div
        aria-hidden="true"
        className="animate-slide-bar h-0.5 bg-[linear-gradient(90deg,var(--color-brand-deep),var(--color-brand-light),var(--color-brand),var(--color-brand-deep))] bg-[length:200%_100%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_0%,rgba(255,92,0,.08),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-10 gap-y-11 px-[clamp(18px,4vw,40px)] pt-[clamp(48px,6vw,84px)] pb-[34px]">
        <div className="col-span-full flex flex-wrap items-end justify-between gap-5 border-b border-white/8 pb-[34px]">
          <div className="flex items-center gap-[clamp(16px,2.4vw,26px)]">
            <Image
              src="/logo-dattebayo.png"
              alt=""
              width={104}
              height={104}
              className="block h-[clamp(66px,9vw,104px)] w-[clamp(66px,9vw,104px)] shrink-0 object-contain"
            />
            <div>
              <div
                lang="ja"
                aria-hidden="true"
                className="font-jp text-brand mb-1.5 text-sm font-bold tracking-[.34em]"
              >
                だってばよ
              </div>
              <div className="font-display text-[clamp(32px,6vw,58px)] leading-[.92] font-bold tracking-[-.02em]">
                DATTEBAYO
                <br />
                TATTOO
              </div>
            </div>
          </div>

          <SolidCta href={waLink()} size="sm" external className="whitespace-nowrap">
            Agendar pelo WhatsApp
          </SolidCta>
        </div>

        <div>
          <h2 className={COL_HEAD}>Estúdio</h2>
          <p className="text-mist m-0 text-sm leading-[1.6]">{INFO.addr}</p>
          <a
            href={INFO.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-light mt-3.5 inline-flex items-center gap-[7px] text-sm font-semibold no-underline"
          >
            Como chegar <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div>
          <h2 className={COL_HEAD}>Horário</h2>
          <div className="mb-3">
            <OpenBadge />
          </div>
          {INFO.hours.map(([day, time]) => (
            <div
              key={day}
              className="flex justify-between gap-3.5 border-b border-white/6 py-1.5 text-[13.5px]"
            >
              <span className="text-mist">{day}</span>
              <span className="text-ash font-mono text-xs">{time}</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className={COL_HEAD}>Navegar</h2>
          <nav aria-label="Rodapé" className="flex flex-col gap-[9px]">
            {NAV_WITH_SHOP.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist w-fit text-sm font-medium no-underline"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-brand-light">
                    {" "}
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-mist w-fit text-sm font-medium no-underline"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div>
          <h2 className={COL_HEAD}>Comunidade</h2>
          <a
            href={INFO.igStudio}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram do estúdio ${INFO.igStudioHandle} (abre em nova aba)`}
            className="text-mist mb-4 inline-flex items-center gap-2 text-sm font-medium no-underline"
          >
            <InstagramIcon size={17} />
            Instagram <span aria-hidden="true">↗</span>
          </a>
          <a
            href={INFO.supply}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,92,0,.14),rgba(255,92,0,.03))] px-4 py-3.5 no-underline"
          >
            <div className="text-brand-light font-mono text-[10px] tracking-[.16em]">
              DATTEBAYO SUPPLY ↗
            </div>
            <div className="font-display text-bone mt-1 text-[15px] font-bold">Vista a cultura</div>
          </a>
        </div>

        <div className="text-dim col-span-full flex flex-wrap justify-between gap-3 border-t border-white/8 pt-[26px] text-[12.5px]">
          <span>
            © {year} Dattebayo Tattoo · {INFO.phone} · Liberdade, SP
          </span>
          <span className="font-mono tracking-[.08em]">EST. LIBERDADE — SP</span>
        </div>
      </div>
    </footer>
  );
}

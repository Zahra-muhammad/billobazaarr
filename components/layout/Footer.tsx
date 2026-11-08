import type { Content } from "@/content";
import { parseEm } from "@/lib/utils";
import { BorderStrip } from "@/components/ui/BorderStrip";
import { Wordmark } from "./Wordmark";

export function Footer({
  t,
  nav,
  brand,
}: {
  t: Content["footer"];
  nav: Content["nav"];
  brand: Content["brand"];
}) {
  return (
    <footer data-theme="dark" className="cv-auto relative overflow-hidden bg-maroon text-beige">
      <BorderStrip tone="maroon" height={22} />
      <BorderStrip tone="mustard" height={10} className="mt-1.5 opacity-50" />

      <div className="shell grid-12 gap-y-12 pt-20 md:pt-28">
        <p className="col-span-12 max-w-[14ch] font-display text-display-lg lg:col-span-6">
          {parseEm(t.tagline).map((s, i) =>
            s.em ? (
              <em key={i} className="italic text-mustard">
                {s.text}
              </em>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </p>

        <nav aria-label="Footer" className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-8">
          <p className="eyebrow text-beige/80">{t.exploreLabel}</p>
          <ul className="mt-5 space-y-2.5">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-beige transition-colors hover:text-mustard">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
          <p className="eyebrow text-beige/80">{t.followLabel}</p>
          <ul className="mt-5 space-y-2.5">
            {t.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-beige transition-colors hover:text-mustard"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 sm:col-span-4 lg:col-span-1 lg:text-end">
          <a href="#top" className="eyebrow inline-flex items-center gap-2 whitespace-nowrap text-beige transition-colors hover:text-mustard">
            {t.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden="true" className="shell mt-16 md:mt-24">
        <Wordmark
          parts={brand.wordmark}
          className="block whitespace-nowrap text-[min(calc((100vw-2*var(--gutter))/3.8),24.5rem)] leading-[0.8] tracking-[-0.045em] text-beige"
        />
      </div>

      <div className="shell">
        <div className="eyebrow mt-8 flex flex-col gap-3 border-t border-beige/20 py-7 text-beige/80 md:flex-row md:items-center md:justify-between">
          <p>{t.copyright}</p>
          <p className="normal-case tracking-normal">{t.note}</p>
          <p lang="ur" dir="rtl" className="urdu -my-2 text-[1rem] text-mustard">
            {brand.urdu}
          </p>
        </div>
      </div>
    </footer>
  );
}

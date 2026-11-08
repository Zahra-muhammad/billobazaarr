import type { Content } from "@/content";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealImage, RevealWords } from "@/components/ui/Reveal";

/**
 * Seven pillars in an asymmetric 12-column magazine grid.
 * (Every responsive col-span is paired with a col-start at the same breakpoint;
 * in Tailwind v4 the span shorthand would otherwise reset the start.)
 */
const LAYOUT = [
  { cell: "md:col-span-6 md:col-start-1 lg:col-span-7 lg:col-start-1", img: "aspect-[4/3]", sizes: "(min-width: 1024px) 52vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-7 md:mt-28 lg:col-span-4 lg:col-start-9 lg:mt-44", img: "aspect-[4/3] md:aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-1 lg:col-span-4 lg:col-start-1 lg:mt-0", img: "aspect-[4/3] md:aspect-[3/4]", sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-7 md:mt-28 lg:col-span-4 lg:col-start-5 lg:mt-28", img: "aspect-[4/3] md:aspect-[3/4]", sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-1 lg:col-span-4 lg:col-start-9 lg:mt-56", img: "aspect-[4/3] md:aspect-[3/4]", sizes: "(min-width: 1024px) 30vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-7 md:mt-28 lg:col-span-5 lg:col-start-2 lg:mt-0", img: "aspect-[4/3] md:aspect-[4/5]", sizes: "(min-width: 1024px) 38vw, (min-width: 768px) 48vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-1 lg:col-span-5 lg:col-start-8 lg:mt-40", img: "aspect-[4/3]", sizes: "(min-width: 1024px) 38vw, (min-width: 768px) 48vw, 100vw" },
];

export function WhatWeDo({ t }: { t: Content["whatWeDo"] }) {
  const total = String(t.pillars.length).padStart(2, "0");
  return (
    <section id="what-we-do" aria-labelledby="wwd-title" className="cv-auto section-y relative bg-offwhite">
      <div className="shell">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} />
        <RevealWords
          id="wwd-title"
          text={t.heading}
          className="mt-10 max-w-[16ch] font-display text-display-xl text-ink md:mt-14"
        />
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-[44ch] text-lead text-ink-soft text-pretty">{t.intro}</p>
        </FadeUp>

        <ol className="grid-12 mt-20 gap-y-16 md:mt-28 md:gap-y-20 lg:gap-y-28">
          {t.pillars.map((p, i) => {
            const L = LAYOUT[i % LAYOUT.length];
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={p.title} className={cn("group col-span-12", L.cell)}>
                <article>
                  <RevealImage
                    src={p.image.src}
                    alt={p.image.alt}
                    sizes={L.sizes}
                    className={L.img}
                    imgClassName="transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045]"
                    parallax={4}
                  />
                  <FadeUp className="mt-6 md:mt-7" delay={0.1}>
                    <p className="eyebrow flex items-center gap-3 text-heritage">
                      <span className="tabular-nums">{n}</span>
                      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
                      <span className="tabular-nums text-ink-soft">{total}</span>
                    </p>
                    <h3 className="mt-3 font-display text-display-sm text-ink">{p.title}</h3>
                    <p className="mt-3 max-w-[40ch] text-[0.98rem] leading-relaxed text-ink-soft text-pretty">
                      {p.line}
                    </p>
                  </FadeUp>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

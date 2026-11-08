import type { Content } from "@/content";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealWords } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";

// Heritage red, olive and (sparingly) indigo: one colour per audience.
const TONES = ["bg-heritage", "bg-olive", "bg-indigo"];
const OFFSETS = ["lg:mt-0", "lg:mt-20", "lg:mt-40"];

function Bullet() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className="mt-[0.45em] size-2.5 shrink-0 text-mustard">
      <path fill="currentColor" d="M6 0h2v2h2v2h2v2h2v2h-2v2h-2v2H8v2H6v-2H4v-2H2V8H0V6h2V4h2V2h2z" />
    </svg>
  );
}

export function WhoItsFor({ t }: { t: Content["audience"] }) {
  return (
    <section id="partner" aria-labelledby="audience-title" className="cv-auto section-y relative bg-offwhite">
      <div className="shell">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} />
        <RevealWords
          id="audience-title"
          text={t.heading}
          className="mt-10 max-w-[15ch] font-display text-display-xl text-ink md:mt-14"
        />

        <ul className="grid-12 mt-16 gap-y-8 md:mt-24 lg:gap-y-0">
          {t.cards.map((card, i) => (
            <FadeUp
              as="li"
              key={card.title}
              delay={i * 0.1}
              className={cn("col-span-12 lg:col-span-4", OFFSETS[i])}
            >
              <article
                data-theme="dark"
                className={cn(
                  "group flex h-full flex-col text-offwhite md:grid md:grid-cols-2 lg:flex lg:flex-col",
                  TONES[i],
                )}
              >
                <div
                  data-cursor="image"
                  className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-auto md:min-h-full lg:aspect-[4/3] lg:min-h-0"
                >
                  <Img
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9 lg:p-10">
                  <p className="eyebrow text-offwhite/90">0{i + 1}</p>
                  <h3 className="mt-4 max-w-[14ch] font-display text-display-md">{card.title}</h3>
                  <p className="mt-5 max-w-[36ch] leading-relaxed text-offwhite">{card.body}</p>
                  <ul className="mt-7 space-y-2.5 border-t border-offwhite/25 pt-6">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.95rem] text-offwhite">
                        <Bullet />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <ButtonLink href="#contact" role={card.role} variant="light">
                      {card.cta}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}

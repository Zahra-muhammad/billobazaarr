import type { Content } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealImage } from "@/components/ui/Reveal";
import { ScrollStatement } from "./ScrollStatement";

export function Vision({ t }: { t: Content["vision"] }) {
  return (
    <section id="vision" aria-labelledby="vision-title" className="cv-auto section-y relative">
      <div className="shell">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} />

        {/* Statement: words brighten as you scroll through it */}
        <ScrollStatement
          id="vision-title"
          text={t.statement}
          className="mt-10 max-w-[19ch] font-display text-display-xl text-ink md:mt-14"
        />

        <div className="grid-12 mt-16 gap-y-14 md:mt-24">
          {/* Not a school: a launchpad */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="font-display text-display-md text-ink">
              {t.notSchool.before}{" "}
              <span className="relative inline-block text-ink-soft">
                {t.notSchool.struck}
                <span
                  aria-hidden="true"
                  data-reveal="strike"
                  className="absolute inset-x-[-0.06em] top-[54%] h-[0.08em] origin-left bg-heritage rtl:origin-right"
                />
                <span className="sr-only"> (crossed out)</span>
              </span>{" "}
              <span className="italic text-heritage">{t.notSchool.after}</span>
            </p>
            <FadeUp delay={0.15}>
              <p className="mt-8 max-w-[46ch] text-lead text-ink-soft text-pretty">{t.body}</p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="eyebrow mt-10 flex items-center gap-3 text-ink">
                <span aria-hidden="true" className="h-px w-8 bg-heritage" />
                {t.note}
              </p>
            </FadeUp>
          </div>

          {/* Two images, staggered */}
          <div className="col-span-12 grid grid-cols-12 gap-x-[var(--gap)] md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            <RevealImage
              src={t.images.detail.src}
              alt={t.images.detail.alt}
              sizes="(min-width: 768px) 22vw, 45vw"
              className="col-span-5 col-start-1 aspect-[4/5] self-start"
              parallax={6}
            />
            <RevealImage
              src={t.images.portrait.src}
              alt={t.images.portrait.alt}
              sizes="(min-width: 768px) 28vw, 55vw"
              className="col-span-7 col-start-6 mt-24 aspect-[3/4] md:mt-32"
              parallax={6}
              delay={0.15}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Content } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealImage, RevealWords } from "@/components/ui/Reveal";
import { BorderStrip } from "@/components/ui/BorderStrip";

export function OnTheGround({ t }: { t: Content["ground"] }) {
  return (
    <section
      id="on-the-ground"
      aria-labelledby="ground-title"
      data-theme="dark"
      className="cv-auto relative bg-maroon text-beige"
    >
      <BorderStrip tone="mustard" height={18} className="mt-3 opacity-90" />
      <div className="shell section-y">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} tone="dark" />
        <RevealWords
          id="ground-title"
          text={t.heading}
          emClassName="italic text-mustard"
          className="mt-10 max-w-[14ch] font-display text-display-xl md:mt-14"
        />
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-[48ch] text-lead text-beige/90 text-pretty">{t.intro}</p>
        </FadeUp>

        <div className="grid-12 mt-16 gap-y-14 md:mt-24">
          {/* Cities */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-1">
            <p className="eyebrow text-beige/80">{t.citiesLabel}</p>
            <ul className="mt-6 border-t border-beige/20">
              {t.cities.map((c, i) => (
                <FadeUp
                  as="li"
                  key={c.name}
                  delay={i * 0.08}
                  className="group flex items-baseline gap-4 border-b border-beige/20 py-5 md:gap-6 md:py-7"
                >
                  <span className="eyebrow w-6 shrink-0 tabular-nums text-mustard">0{i + 1}</span>
                  <span className="font-display text-display-lg transition-[color,translate] duration-700 ease-editorial group-hover:translate-x-3 group-hover:italic group-hover:text-mustard rtl:group-hover:-translate-x-3">
                    {c.name}
                  </span>
                  <span lang="ur" dir="rtl" className="urdu -my-4 text-[1.15rem] text-mustard md:text-[1.4rem]">
                    {c.urdu}
                  </span>
                  <span className="eyebrow ms-auto hidden text-end text-beige/80 sm:block">{c.coords}</span>
                </FadeUp>
              ))}
            </ul>
          </div>

          {/* Street photo */}
          <figure className="col-span-12 md:col-span-8 md:col-start-1 lg:col-span-4 lg:col-start-9">
            <RevealImage
              src={t.image.src}
              alt={t.image.alt}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 64vw, 100vw"
              className="aspect-[4/5]"
              parallax={8}
            />
            <figcaption className="eyebrow mt-4 flex items-center gap-3 text-beige/80">
              <span aria-hidden="true" className="h-px w-6 bg-mustard" />
              {t.caption}
            </figcaption>
          </figure>
        </div>

        {/* What the visit is for */}
        <div className="mt-20 md:mt-28">
          <p className="eyebrow text-beige/80">{t.pointsLabel}</p>
          <ol className="grid-12 mt-8 gap-y-10">
            {t.points.map((pt, i) => (
              <FadeUp
                as="li"
                key={pt.title}
                delay={i * 0.08}
                className="col-span-12 border-t border-beige/25 pt-6 sm:col-span-6 lg:col-span-3"
              >
                <span className="font-display text-display-md italic text-mustard">0{i + 1}</span>
                <h3 className="mt-5 font-display text-display-sm">{pt.title}</h3>
                <p className="mt-3 max-w-[30ch] leading-relaxed text-beige/90">{pt.text}</p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

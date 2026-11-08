import type { Content } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealWords } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { NotifyForm } from "./NotifyForm";

export function Exhibitions({ t }: { t: Content["exhibitions"] }) {
  return (
    <section
      id="exhibitions"
      aria-labelledby="exhibitions-title"
      data-theme="dark"
      className="cv-auto relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-beige"
    >
      {/* Slow zoom-out + drift as the section scrolls past (CSS scroll-driven; static where unsupported) */}
      <div data-parallax className="parallax-zoom absolute inset-0" data-cursor="image">
        <Img src={t.image.src} alt={t.image.alt} fill sizes="100vw" className="object-[50%_40%]" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/55 to-ink/15" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/60 to-transparent rtl:bg-linear-to-l" />

      <div className="shell relative z-10 pb-16 pt-44 md:pb-24 md:pt-56">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} tone="dark" />
        <RevealWords
          id="exhibitions-title"
          text={t.heading}
          emClassName="italic text-mustard"
          className="mt-8 max-w-[11ch] font-display text-display-2xl md:mt-10"
        />
        <div className="grid-12 mt-10 md:mt-14">
          <FadeUp className="col-span-12 md:col-span-7 lg:col-span-5" delay={0.15}>
            <p className="max-w-[42ch] text-lead text-beige/90 text-pretty">{t.body}</p>
            <NotifyForm t={t} />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

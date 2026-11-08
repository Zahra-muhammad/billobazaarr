import type { CSSProperties } from "react";
import type { Content, Locale } from "@/content";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealWords } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { JourneyThread } from "./JourneyThread";

const TILTS = [-6, 5, -4, 7, -5, 4];

type Step = Content["journey"]["steps"][number];

/**
 * One big word whose letters spring up one after another (CSS, see
 * [data-reveal="letters"]). Hovering makes the letters wave. Urdu stays whole
 * because splitting a joined script into letters would break it.
 */
function BouncyWord({ word, splitLetters }: { word: string; splitLetters: boolean }) {
  const letters = splitLetters ? Array.from(word) : [word];
  return (
    <span className="wave inline-block">
      <span className="sr-only">{word}</span>
      <span
        aria-hidden="true"
        data-reveal="letters"
        className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-top"
      >
        {letters.map((l, k) => (
          <span key={k} className="rl wave-l" style={{ "--i": k } as CSSProperties}>
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}

function JourneyStep({
  step,
  i,
  total,
  label,
  splitLetters,
}: {
  step: Step;
  i: number;
  total: number;
  label: string;
  splitLetters: boolean;
}) {
  const tilt = TILTS[i % TILTS.length];
  const n = String(i + 1).padStart(2, "0");
  const flip = i % 2 === 1;
  return (
    <li className="grid-12 relative items-center gap-y-10 py-14 md:py-20 lg:py-24">
      <div className="relative col-span-12 ps-12 md:ps-20 lg:col-span-7 lg:col-start-1">
        {/* Node on the thread, level with the step label; fills at mid-screen */}
        <span
          aria-hidden="true"
          data-reveal="node"
          data-reveal-repeat
          data-reveal-center
          className="absolute start-[5px] top-[0.1rem] size-[14px] rounded-full border-2 border-heritage md:start-[9px]"
        />
        <p className="eyebrow flex items-center gap-3 text-ink-soft">
          <span>
            {label} {n}
            <span> / {String(total).padStart(2, "0")}</span>
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          <span lang="ur" dir="rtl" className="urdu -my-3 text-[1.2rem] text-heritage">
            {step.urdu}
          </span>
        </p>
        <h3 className="mt-3 font-display text-[clamp(3.3rem,10.8vw,11rem)] leading-[0.86] tracking-[-0.04em] text-ink">
          <BouncyWord word={step.word} splitLetters={splitLetters} />
        </h3>
        <FadeUp delay={0.25}>
          <p className="mt-5 max-w-[34ch] text-lead text-ink-soft text-pretty">{step.line}</p>
        </FadeUp>
      </div>

      {/* Sticker photo with a swing-tag */}
      <div
        className={cn(
          "col-span-12 ps-12 md:ps-20 lg:col-span-4 lg:ps-0",
          flip ? "lg:col-start-8" : "lg:col-start-9",
        )}
      >
        <figure
          data-reveal="sticker"
          data-cursor="image"
          style={{ "--tilt": `${tilt}deg` } as CSSProperties}
          className={cn(
            "relative w-[64%] max-w-[22rem] bg-offwhite p-2.5 shadow-[0_24px_50px_-24px_rgba(26,20,20,0.45)] sm:w-[46%] md:p-3 lg:w-[82%]",
            flip ? "lg:me-auto" : "lg:ms-auto",
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Img
              src={step.image.src}
              alt={step.image.alt}
              fill
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 60vw"
            />
          </div>
          <figcaption className="eyebrow flex items-center justify-between px-1 pb-0.5 pt-2.5 text-ink-soft">
            <span>{step.word}</span>
            <span className="tabular-nums">{n}</span>
          </figcaption>
          {/* swing tag */}
          <span
            aria-hidden="true"
            lang="ur"
            dir="rtl"
            className="urdu absolute -top-5 end-5 flex rotate-[8deg] items-center gap-2 rounded-[3px] bg-mustard px-3 text-[0.95rem] leading-[2.1] text-maroon shadow-sm"
          >
            <span className="size-1.5 rounded-full bg-maroon/70" />
            {step.urdu}
          </span>
        </figure>
      </div>
    </li>
  );
}

export function Journey({ t, locale }: { t: Content["journey"]; locale: Locale }) {
  return (
    <section id="journey" aria-labelledby="journey-title" className="cv-auto section-y relative overflow-hidden">
      <div className="shell">
        <SectionLabel index={t.index} label={t.label} urdu={t.urdu} />
        <RevealWords
          id="journey-title"
          text={t.heading}
          className="mt-10 max-w-[17ch] font-display text-display-xl text-ink md:mt-14"
        />
        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-[44ch] text-lead text-ink-soft text-pretty">{t.intro}</p>
        </FadeUp>

        <JourneyThread>
          <ol>
            {t.steps.map((step, i) => (
              <JourneyStep
                key={step.word}
                step={step}
                i={i}
                total={t.steps.length}
                label={t.stepLabel}
                splitLetters={locale !== "ur"}
              />
            ))}
          </ol>

          {/* knot */}
          <div className="relative flex items-center gap-5 pt-6">
            <span aria-hidden="true" className="relative z-10 ms-[3px] size-[18px] rounded-full bg-heritage md:ms-[7px]" />
            <FadeUp>
              <p className="ps-4 font-display text-display-sm italic text-heritage md:ps-10">{t.end}</p>
            </FadeUp>
          </div>
        </JourneyThread>
      </div>
    </section>
  );
}

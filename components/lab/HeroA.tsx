import type { CSSProperties } from "react";
import { images } from "@/content";
import { Img } from "@/components/ui/Img";
import { FitText } from "./FitText";
import { LabNav } from "./LabNav";
import Link from "next/link";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A · Cinematic: full-bleed dark editorial photo, giant BILLO BAZAAR across the bottom. */
export function HeroA() {
  const word = "BILLO BAZAAR";
  return (
    <section
      data-theme="dark"
      aria-labelledby="hero-a-title"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-offwhite"
    >
      {/* photo, slow zoom */}
      <div className="l-zoom absolute inset-0 origin-[50%_35%]">
        <Img
          src={images.heroMain}
          alt="Two models in embroidered shawls and heavy jewellery, lit like a film still"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          grade={false}
          className="grade-loud object-cover object-[50%_28%]"
        />
      </div>
      {/* vignette, film burn, mustard grain, bottom fade for the type */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_30%,transparent_38%,rgba(14,6,6,0.88)_100%)]" />
      <div aria-hidden="true" className="film-burn absolute inset-0" />
      <div aria-hidden="true" className="grain-mustard absolute inset-0 overflow-hidden" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-[#120808] via-[#120808]/75 to-transparent" />

      <LabNav label="Now casting: Pakistan's next labels" />

      {/* left edge: vertical mono credit */}
      <p className="l-fade eyebrow absolute left-[var(--gutter)] top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 text-offwhite/70 lg:block" style={d(500)}>
        [ Look 01 · Lahore · Embroidered shawls ]
      </p>

      {/* right: Urdu + statement */}
      <div className="l-fade absolute right-[var(--gutter)] top-[22%] hidden max-w-[19rem] text-right md:block" style={d(650)}>
        <p lang="ur" dir="rtl" className="font-[family-name:var(--font-nastaliq-intro)] text-[3.2rem] leading-[1.6] text-mustard">بلو بازار</p>
        <p className="eyebrow mt-2 leading-relaxed text-offwhite/80">
          A launchpad &amp; network for Pakistan&apos;s fashion graduates. Not a school.
        </p>
      </div>

      {/* bottom block */}
      <div className="absolute inset-x-0 bottom-0 px-[var(--gutter)]">
        <div className="mb-3 flex flex-col gap-6 md:mb-1 md:flex-row md:items-end md:justify-between">
          <p className="l-fade max-w-[22ch] font-display text-[clamp(1.7rem,3vw,3.1rem)] italic leading-[1.02] text-offwhite" style={d(350)}>
            From fashion students <span className="text-mustard">to fashion entrepreneurs.</span>
          </p>
          <div className="l-fade flex flex-wrap gap-3" style={d(500)}>
            <Link href="/#contact" className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-mustard px-6 text-ink transition-transform duration-500 hover:scale-105">
              Join as a designer ↗
            </Link>
            <Link href="/#partner" className="eyebrow inline-flex h-12 items-center gap-3 rounded-full border border-offwhite/60 px-6 text-offwhite backdrop-blur-sm transition-colors duration-500 hover:bg-offwhite hover:text-ink">
              Partner with us
            </Link>
          </div>
        </div>
        <h1 id="hero-a-title" className="relative -mb-[0.6vw] overflow-hidden leading-none md:-mb-[2.2vw]" aria-label="Billo Bazaar">
          <FitText initial="13.4vw" className="font-display uppercase leading-[0.86] tracking-[-0.035em] text-offwhite">
            {Array.from(word).map((ch, i) => (
              <span key={i} aria-hidden="true" className="l-rise inline-block" style={d(80 + i * 45)}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </FitText>
        </h1>
      </div>
    </section>
  );
}

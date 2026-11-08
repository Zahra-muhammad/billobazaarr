import type { CSSProperties } from "react";
import Image from "next/image";
import { FitText } from "./FitText";
import { LabNav } from "./LabNav";
import { PointerStage } from "./PointerStage";
import { BadgeEst, PillStudentBrand, StickerMadeIn, Tape } from "./Stickers";
import Link from "next/link";

const d = (ms: number, r?: number) => ({ "--d": `${ms}ms`, ...(r !== undefined ? { "--r": `${r}deg` } : {}) }) as CSSProperties;
/** pointer-parallax depth for a layer (px of travel at the edges) */
const depth = (x: number, y = x * 0.6) => ({ translate: `calc(var(--mx) * ${x}px) calc(var(--my) * ${y}px)` }) as CSSProperties;

/** B · Poster / streetwear: maroon, giant BAZAAR, cut-out model in front, ajrak + stickers. */
export function HeroB() {
  return (
    <PointerStage className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-maroon text-offwhite">
      <section data-theme="dark" aria-labelledby="hero-b-title" className="absolute inset-0">
        {/* depth: radial light behind the model + grain */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_45%,#8a1a1f_0%,#630e13_55%,#3d070b_100%)]" />
        <div aria-hidden="true" className="grain-mustard absolute inset-0 overflow-hidden opacity-80" />

        {/* ajrak swatch, top right, taped on */}
        <div className="l-pop absolute right-[5%] top-[10%] z-0 hidden w-[15vw] md:block" style={{ ...d(300, 7), ...depth(-14) }}>
          <div className="ajrak ajrak-lg sticker aspect-square w-full" />
          <Tape className="absolute -left-[18%] -top-[6%] rotate-[-14deg] text-[0.62rem]">Ajrak · Sindh</Tape>
        </div>

        {/* ajrak band along the bottom */}
        <div aria-hidden="true" className="l-fade ajrak absolute inset-x-0 bottom-0 h-[13svh] border-t-[6px] border-mustard" style={d(150)} />

        {/* GIANT WORD */}
        <h1 id="hero-b-title" className="absolute inset-x-0 top-[24%] z-[1] px-[2vw] text-center md:top-[19%]" aria-label="Billo Bazaar">
          <span aria-hidden="true" className="block overflow-hidden" style={depth(10)}>
            <FitText initial="31vw" className="font-poster text-beige">
              {Array.from("BAZAAR").map((ch, i) => (
                <span key={i} className="l-rise inline-block" style={d(60 + i * 60)}>
                  {ch}
                </span>
              ))}
            </FitText>
          </span>
        </h1>
        {/* "billo" script over the word */}
        <span
          aria-hidden="true"
          className="l-pop absolute left-[5%] top-[16%] z-[3] font-display text-[clamp(4rem,13vw,13rem)] italic leading-none text-mustard [text-shadow:0_8px_30px_rgba(0,0,0,0.35)] md:top-[9%]"
          style={{ ...d(520, -9), ...depth(22) }}
        >
          billo
        </span>

        {/* CUT-OUT MODEL in front of the type */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center">
          <div
            className="l-cut relative h-[80svh] w-[min(31svh,62vw)] md:h-[93svh] md:w-[37svh]"
            style={{ ...d(250), ...depth(-8, -4) }}
          >
            <Image
              src="/images/cutouts/red-suit.webp"
              alt="Model in a red embroidered shalwar kameez and dupatta"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 40vh, 62vw"
              className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(20,0,0,0.55)]"
            />
          </div>
        </div>

        {/* stickers */}
        <BadgeEst className="l-pop absolute z-[3] left-[7%] top-[58%] w-[22vw] text-[3.4vw] md:left-[14%] md:top-[56%] md:w-[10vw] md:text-[1.45vw]" style={{ ...d(900, -12), ...depth(30) }} />
        <StickerMadeIn className="l-pop absolute z-[3] right-[5%] top-[60%] text-[6vw] md:right-[17%] md:top-[50%] md:text-[2.4vw]" style={{ ...d(1050, 8), ...depth(26) }} />
        <PillStudentBrand className="l-pop absolute z-[3] right-[8%] top-[41%] text-[0.7rem] md:right-auto md:left-[56%] md:top-[74%] md:text-sm" style={{ ...d(1200, -7), ...depth(18) }} />
        <Tape className="l-pop absolute bottom-[3.5svh] left-[4%] z-[3] text-[0.6rem] md:left-[22%] md:text-[0.75rem]" style={{ ...d(1350, -3), ...depth(12) }}>
          New labels from Pakistan&apos;s fashion schools
        </Tape>

        {/* Urdu signature, bottom right */}
        <p
          aria-hidden="true"
          lang="ur"
          dir="rtl"
          className="l-fade absolute bottom-[calc(13svh+8.5rem)] right-[var(--gutter)] z-[3] hidden font-[family-name:var(--font-nastaliq-intro)] text-[3.4vw] leading-[1.7] text-mustard md:block"
          style={d(700)}
        >
          بلو بازار
        </p>

        {/* bottom copy + CTAs, sitting on the ajrak band */}
        <div className="absolute inset-x-0 bottom-[13svh] z-[3] flex items-end justify-between gap-6 px-[var(--gutter)] pb-5">
          <p className="l-fade max-w-[19ch] font-poster text-[clamp(1.4rem,2.3vw,2.4rem)] font-[800] text-offwhite [font-stretch:75%]" style={d(800)}>
            From fashion students <span className="text-mustard">to fashion entrepreneurs.</span>
          </p>
          <div className="l-fade hidden flex-col items-end gap-3 md:flex" style={d(950)}>
            <Link href="/#contact" className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-mustard px-6 text-ink transition-transform duration-500 hover:scale-105">
              Join as a designer ↗
            </Link>
            <Link href="/#partner" className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-ink px-6 text-offwhite transition-transform duration-500 hover:scale-105">
              Partner with us
            </Link>
          </div>
        </div>

        <LabNav label="Student → Brand → Bazaar" />
      </section>
    </PointerStage>
  );
}

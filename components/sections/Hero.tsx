"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Content } from "@/content";
import { cn, parseWords, plain } from "@/lib/utils";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Hero entrance is pure CSS (.a-rise / .a-curtain / .a-settle in globals.css) so
 * it starts on first paint instead of waiting for JavaScript. Only the scroll
 * parallax is JS-driven.
 */
/**
 * Hero photo. The "wipe" is a beige curtain sliding off the top of an image
 * that is already painted underneath, which looks the same as a clip-path
 * reveal but lets the browser count the photo as painted straight away (LCP).
 */
function HeroPhoto({
  image,
  y,
  delay,
  aspect,
  sizes,
  className,
  priority = false,
}: {
  image: { src: string; alt: string };
  y: MotionValue<string>;
  delay: number;
  aspect: string;
  sizes: string;
  className: string;
  priority?: boolean;
}) {
  const d = { "--d": `${delay}ms` } as React.CSSProperties;
  return (
    <m.figure data-parallax style={{ y }} className={className}>
      <div className={cn("relative overflow-hidden bg-sand", aspect)} data-cursor="image">
        <div className="a-settle absolute inset-0" style={d}>
          <Img
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            fetchPriority={priority ? "high" : undefined}
            sizes={sizes}
          />
        </div>
        <span aria-hidden="true" className="a-curtain absolute inset-0 bg-beige" style={d} />
      </div>
    </m.figure>
  );
}

export function Hero({ t }: { t: Content["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  // Parallax is switched off for reduced motion in CSS ([data-parallax]).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ySecond = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const yThird = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const rotateBadge = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const before = parseWords(t.headline.beforeImage);
  const after = parseWords(t.headline.afterImage);
  let i = 0;
  const word = (w: { text: string; em: boolean }, key: string) => {
    const d = 120 + i++ * 65;
    return (
      <span key={key} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
        <span
          className={cn("a-rise inline-block", w.em && "italic text-heritage")}
          style={{ "--d": `${d}ms` } as React.CSSProperties}
        >
          {w.text}
        </span>
      </span>
    );
  };

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+2.25rem)] md:pt-[calc(var(--nav-h)+3.5rem)] lg:min-h-[100svh] lg:pb-24"
    >
      <div className="shell">
        <p className="eyebrow a-fade flex items-center gap-3 text-ink-soft" style={{ "--d": "60ms" } as React.CSSProperties}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-heritage" />
          {t.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-5 font-display text-[clamp(3.15rem,8.3vw,10.5rem)] leading-[0.9] tracking-[-0.035em] text-ink md:mt-7"
        >
          <span className="sr-only">
            {plain(t.headline.beforeImage)} {plain(t.headline.afterImage)}
          </span>
          <span aria-hidden="true">
            <span className="lg:block">
              {before.map((w, k) => (
                <span key={`b${k}`}>
                  {word(w, `bw${k}`)}{" "}
                </span>
              ))}
              {/* Inline oval image: clipped in, so it never shifts the layout. */}
              <span
                className="a-wipe relative inline-block h-[0.74em] w-[1.55em] overflow-hidden rounded-full bg-sand align-[-0.04em]"
                style={{ "--d": "420ms" } as React.CSSProperties}
              >
                <span className="a-settle absolute inset-0" style={{ "--d": "420ms" } as React.CSSProperties}>
                  <Img src={t.images.inline.src} alt="" fill sizes="12rem" loading="eager" />
                </span>
              </span>{" "}
            </span>
            <span className="lg:block">
              {after.map((w, k) => (
                <span key={`a${k}`}>
                  {word(w, `aw${k}`)}
                  {k < after.length - 1 && " "}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="grid-12 mt-10 items-start gap-y-14 md:mt-14 lg:mt-16">
          {/* Copy + CTAs */}
          <div className="col-span-12 lg:col-span-4 lg:pt-4">
            <p
              className="a-fade max-w-[34ch] text-lead text-ink-soft text-pretty"
              style={{ "--d": "700ms" } as React.CSSProperties}
            >
              {t.sub}
            </p>
            <div
              className="a-fade mt-8 flex flex-wrap gap-3"
              style={{ "--d": "820ms" } as React.CSSProperties}
            >
              <ButtonLink href={t.primaryCta.href} role={t.primaryCta.role} variant="primary">
                {t.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={t.secondaryCta.href} variant="outline">
                {t.secondaryCta.label}
              </ButtonLink>
            </div>
            <div
              aria-hidden="true"
              className="a-fade mt-16 hidden items-center gap-4 lg:flex"
              style={{ "--d": "1100ms" } as React.CSSProperties}
            >
              <span className="eyebrow text-ink-soft">{t.scroll}</span>
              <span className="relative h-px w-24 overflow-hidden bg-ink/15">
                <span className="absolute inset-y-0 start-0 w-1/3 animate-[scroll-cue_2.4s_var(--ease-silk)_infinite] bg-ink" />
              </span>
            </div>
          </div>

          {/* Collage */}
          <div className="relative col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-x-[var(--gap)] lg:grid-cols-8">
              <HeroPhoto
                image={t.images.second}
                y={ySecond}
                delay={620}
                aspect="aspect-[3/4]"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 32vw, 42vw"
                className="relative z-10 col-span-5 col-start-1 row-start-1 mt-[38%] md:col-span-4 md:col-start-1 md:mt-[22%] lg:col-span-3 lg:col-start-1 lg:mt-[26%]"
              />
              <HeroPhoto
                image={t.images.main}
                y={yMain}
                delay={480}
                priority
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 75vw"
                className="relative col-span-9 col-start-4 row-start-1 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-3"
              />
              <HeroPhoto
                image={t.images.third}
                y={yThird}
                delay={760}
                aspect="aspect-[3/4]"
                sizes="(min-width: 1024px) 14vw, 24vw"
                className="relative z-10 col-span-3 col-start-10 row-start-1 mt-[70%] hidden md:block md:col-span-3 md:col-start-10 lg:col-span-2 lg:col-start-7 lg:mt-[120%]"
              />
            </div>

            {/* Rotating badge */}
            <div
              aria-hidden="true"
              className="a-fade absolute -top-10 end-[2%] z-20 size-28 md:-top-12 md:end-[4%] md:size-32 lg:end-[22%] lg:top-[-3.5rem] lg:size-36"
              style={{ "--d": "1000ms" } as React.CSSProperties}
            >
              <m.div data-parallax style={{ rotate: rotateBadge }} className="absolute inset-0">
                <div dir="ltr" className="a-spin size-full rounded-full bg-mustard text-ink">
                  <svg viewBox="0 0 100 100" className="size-full">
                    <defs>
                      <path id="hero-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-current font-mono uppercase" fontSize="7.4" letterSpacing="0.5">
                      <textPath href="#hero-badge-circle" textLength="236" lengthAdjust="spacing">
                        {t.badge}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </m.div>
              <span
                lang="ur"
                dir="rtl"
                className="urdu absolute inset-0 flex items-center justify-center text-[1.15rem] text-maroon md:text-[1.35rem]"
              >
                {t.badgeUrdu}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

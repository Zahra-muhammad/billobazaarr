"use client";

import { Fragment, useEffect, useRef } from "react";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { Content } from "@/content";
import { useLocale } from "@/components/providers/LocaleProvider";

const COPIES = 4;
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function Diamond() {
  // Small phulkari stepped diamond used as the separator.
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className="mx-[0.35em] inline-block h-[0.32em] w-[0.32em] align-middle">
      <path
        fill="currentColor"
        d="M6 0h2v2h2v2h2v2h2v2h-2v2h-2v2H8v2H6v-2H4v-2H2V8H0V6h2V4h2V2h2z"
      />
    </svg>
  );
}

/**
 * "From Student → To Brand → To Bazaar". Drifts slowly on its own, speeds up
 * with scroll velocity, and reverses when you scroll back up.
 */
export function Marquee({ t }: { t: Content["marquee"] }) {
  const { dir } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  // LTR drifts left (copies extend to the right); RTL drifts right.
  const rtl = dir === "rtl";
  const sign = rtl ? 1 : -1;
  const [min, max] = rtl ? [0, 100 / COPIES] : [-100 / COPIES, 0];
  const x = useTransform(baseX, (v) => `${wrap(min, max, v)}%`);

  // Own rAF loop that only runs while the band is on screen, so an idle page
  // isn't redrawing every frame.
  useEffect(() => {
    if (reduce !== false || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(now - last, 64);
      last = now;
      const b = boost.get();
      if (b < 0) direction.current = -1;
      else if (b > 0) direction.current = 1;
      let move = direction.current * 1.6 * (delta / 1000);
      move += move * Math.abs(b);
      baseX.set(baseX.get() + sign * move);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, boost, baseX, sign]);

  const sequence = (
    <span className="flex shrink-0 items-center pe-[0.35em]">
      {t.items.map((item, i) => (
        <Fragment key={item}>
          <span className={i === 1 ? "italic" : undefined}>{item}</span>
          {i < t.items.length - 1 ? (
            <span className="mx-[0.3em] text-mustard rtl:-scale-x-100" aria-hidden="true">
              →
            </span>
          ) : (
            <span className="text-mustard">
              <Diamond />
            </span>
          )}
        </Fragment>
      ))}
    </span>
  );

  return (
    <section
      ref={ref}
      aria-label={t.srText}
      data-theme="dark"
      className="relative overflow-hidden bg-maroon py-7 text-beige md:py-10"
    >
      <p className="sr-only">{t.srText}</p>
      <m.div
        aria-hidden="true"
        data-parallax
        style={{ x }}
        className="flex w-max whitespace-nowrap font-display text-display-xl leading-[1.05]"
      >
        {Array.from({ length: COPIES }, (_, i) => (
          <Fragment key={i}>{sequence}</Fragment>
        ))}
      </m.div>
    </section>
  );
}

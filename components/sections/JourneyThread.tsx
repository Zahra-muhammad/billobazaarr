"use client";

import { useCallback, useRef } from "react";
import { m, useMotionValue, useTransform } from "motion/react";
import { useNear } from "@/lib/use-near";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const STITCH = "repeating-linear-gradient(to bottom, currentColor 0 10px, transparent 10px 18px)";

/**
 * The stitched thread down the side of the Journey: sand stitches underneath,
 * red stitches drawn as you scroll, and a needle riding the tip.
 * Reduced motion is handled in CSS ([data-thread], [data-needle]).
 */
export function JourneyThread({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNear(ref);
  const progress = useMotionValue(0);
  const onProgress = useCallback((v: number) => progress.set(v), [progress]);
  const clip = useTransform(progress, (p) => `inset(0 0 ${(1 - p) * 100}% 0)`);
  const needleTop = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <div ref={ref} className="relative mt-12 md:mt-20">
      {near && <ScrollProgress target={ref} offset={["start 0.62", "end 0.62"]} onChange={onProgress} />}
      <div aria-hidden="true" className="absolute inset-y-0 start-[11px] w-[2px] md:start-[15px]">
        <div className="absolute inset-0 text-sand" style={{ backgroundImage: STITCH }} />
        <m.div
          data-thread
          className="absolute inset-0 text-heritage"
          style={{ backgroundImage: STITCH, clipPath: clip }}
        />
        <m.div
          data-needle
          className="absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
          style={{ top: needleTop }}
        >
          <svg viewBox="0 0 12 44" className="-mt-9 h-11 w-3 text-ink" aria-hidden="true">
            <path d="M6 0c1.7 0 2.6 1.4 2.6 3.2v30.6L6 44l-2.6-10.2V3.2C3.4 1.4 4.3 0 6 0Z" fill="currentColor" />
            <ellipse cx="6" cy="5" rx="1" ry="2.4" fill="var(--color-beige)" />
          </svg>
        </m.div>
      </div>
      {children}
    </div>
  );
}

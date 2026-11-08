"use client";

import { useCallback, useRef, type CSSProperties } from "react";
import { cn, parseWords, plain } from "@/lib/utils";
import { useNear } from "@/lib/use-near";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/**
 * A statement whose words brighten one by one as you scroll through it.
 * One scroll listener writes a single CSS variable (--vp, 0→1); each word's
 * opacity is computed in CSS (.sw in globals.css). Dimmed words still meet
 * WCAG 3:1 for large text: ink ≥ 0.55, heritage red ≥ 0.75.
 */
export function ScrollStatement({
  text,
  id,
  className,
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const near = useNear(ref);
  const onProgress = useCallback((v: number) => {
    ref.current?.style.setProperty("--vp", v.toFixed(4));
  }, []);
  const words = parseWords(text);

  return (
    <h2
      id={id}
      ref={ref}
      className={className}
      style={{ "--vp": 0, "--n": words.length } as CSSProperties}
    >
      {near && <ScrollProgress target={ref} offset={["start 0.85", "end 0.45"]} onChange={onProgress} />}
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span
              data-scroll-word
              className={cn("sw", w.em && "italic text-heritage")}
              style={{ "--i": i, "--min": w.em ? 0.75 : 0.55 } as CSSProperties}
            >
              {w.text}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </h2>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Sizes its text so it spans the full width of its parent, edge to edge,
 * whatever the font's metrics. `initial` is the server-side guess (in vw) so
 * the first paint is already close.
 */
export function FitText({
  children,
  className,
  initial = "15vw",
  scale = 1,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: string;
  /** Fraction of the parent width to fill (1 = full width). */
  scale?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.scrollWidth;
      const target = parent.clientWidth * scale;
      if (w > 0) el.style.fontSize = `${(100 * target) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [scale]);

  return (
    <span ref={ref} className={cn("inline-block whitespace-nowrap", className)} style={{ fontSize: initial }}>
      {children}
    </span>
  );
}

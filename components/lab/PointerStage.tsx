"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Writes --mx / --my (−1…1, eased) on the element as the pointer moves, so
 * layers inside can drift at different depths with
 *   translate: calc(var(--mx) * 24px) calc(var(--my) * 16px)
 * (the CSS `translate` property, so it never fights transform animations).
 */
export function PointerStage({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={cn("[--mx:0] [--my:0]", className)}>
      {children}
    </div>
  );
}

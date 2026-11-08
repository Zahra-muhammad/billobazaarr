"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValueEvent, useScroll, type UseScrollOptions } from "motion/react";

/**
 * Reports the scroll progress (0→1) of `target` through the viewport.
 * Mount it only when needed (see useNear) so nothing is measured early.
 */
export function ScrollProgress({
  target,
  offset,
  onChange,
}: {
  target: RefObject<HTMLElement | null>;
  offset: UseScrollOptions["offset"];
  onChange: (progress: number) => void;
}) {
  const { scrollYProgress } = useScroll({ target, offset });
  useMotionValueEvent(scrollYProgress, "change", onChange);
  useEffect(() => {
    onChange(scrollYProgress.get());
  }, [onChange, scrollYProgress]);
  return null;
}

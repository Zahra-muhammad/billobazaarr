"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element is within `rootMargin` of the viewport (and stays
 * true). Used to attach scroll-linked effects only when they are needed, so
 * offscreen sections are never measured during page load.
 */
export function useNear(ref: RefObject<Element | null>, rootMargin = "60% 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);
  return near;
}

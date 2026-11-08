"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Adds `.is-in` once the element is in view; CSS does the animating.
 * • data-reveal-repeat: also removes the class again when it leaves.
 * • data-reveal-center: triggers when the element reaches mid-screen.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const onEntries: IntersectionObserverCallback = (entries, observer) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const repeat = el.hasAttribute("data-reveal-repeat");
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.classList.remove("is-in");
        }
      }
    };
    const standard = new IntersectionObserver(onEntries, { rootMargin: "0px 0px -12% 0px" });
    const center = new IntersectionObserver(onEntries, { rootMargin: "0px 0px -50% 0px" });
    els.forEach((el) => (el.hasAttribute("data-reveal-center") ? center : standard).observe(el));
    return () => {
      standard.disconnect();
      center.disconnect();
    };
  }, []);

  return null;
}

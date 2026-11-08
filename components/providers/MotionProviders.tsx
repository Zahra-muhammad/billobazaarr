"use client";

import { useEffect } from "react";
import { LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import { interceptAnchorLinks, setLenis } from "@/lib/smooth-scroll";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Global motion setup.
 * • LazyMotion: components use the lightweight `m.*` elements and the
 *   animation engine is fetched as a separate chunk after first paint.
 * • reducedMotion="user": Motion drops transform animations when the visitor
 *   has "reduce motion" switched on.
 * • Lenis smooth scrolling is loaded on demand for mouse/trackpad devices only
 *   (touch keeps native scrolling) and never with reduced motion.
 * • The Nastaliq font for the small Urdu accents is switched on after the
 *   page has loaded, so its 200KB+ file never competes with the hero image.
 *   (A full Urdu page should instead use var(--font-urdu) from the start.)
 */
export function MotionProviders({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  // Smooth wheel scrolling (desktop only)
  useEffect(() => {
    if (reduce !== false) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cancelled = false;
    let lenis: import("lenis").default | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: true });
      setLenis(lenis);
    });
    return () => {
      cancelled = true;
      lenis?.destroy();
      setLenis(null);
    };
  }, [reduce]);

  // In-page links (#vision, #contact…): one handler for Lenis + native scrolling.
  useEffect(() => interceptAnchorLinks(), []);

  // Decorative Urdu webfont, after load. A tiny stylesheet that targets only
  // the Urdu elements (a class on <html> would restyle the whole document).
  useEffect(() => {
    if (document.getElementById("bb-urdu-font")) return;
    const enable = () => {
      const style = document.createElement("style");
      style.id = "bb-urdu-font";
      style.textContent = "@layer base{.urdu,[lang=\"ur\"]{font-family:var(--font-urdu)}}";
      document.head.appendChild(style);
    };
    const idle = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(enable, { timeout: 2500 });
      } else {
        setTimeout(enable, 600);
      }
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => window.removeEventListener("load", idle);
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "motion/react";

type CursorState = "idle" | "link" | "image" | "hidden";

const SIZE: Record<CursorState, number> = { idle: 10, link: 54, image: 96, hidden: 0 };

/**
 * Desktop-only cursor. A small dot that grows into a soft disc over links and
 * buttons, and into a large ring over images. It switches to mustard on dark
 * (maroon / photo) sections. Disabled on touch devices and for reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("hidden");
  const [dark, setDark] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      setDark(!!t.closest('[data-theme="dark"]'));
      if (t.closest('input, textarea, select, [data-cursor="none"]')) setState("hidden");
      else if (t.closest('a, button, label, [role="button"], [data-cursor="link"]')) setState("link");
      else if (t.closest('[data-cursor="image"]')) setState("image");
      else setState("idle");
    };
    const leave = () => setState("hidden");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = SIZE[state];
  const solid = dark ? "var(--color-mustard)" : "var(--color-maroon)";

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
        initial={false}
        animate={{
          width: size,
          height: size,
          backgroundColor:
            state === "idle"
              ? solid
              : state === "link"
                ? dark
                  ? "rgba(218,166,99,0.22)"
                  : "rgba(99,14,19,0.12)"
                : "rgba(0,0,0,0)",
          borderColor: state === "image" ? "rgba(246,242,234,0.95)" : state === "link" ? solid : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
      />
    </m.div>
  );
}

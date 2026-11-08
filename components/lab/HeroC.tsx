"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { LabNav } from "./LabNav";
import Link from "next/link";

const u = (id: string, w = 520) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop&ar=3:4`;
/** Moody, saturated South Asian fashion for the cursor trail. */
const TRAIL = [
  u("1733470381571-c3d082e68457"),
  u("1767955694884-d4bf352c23c2"),
  u("1721324807083-e9ddaa99310e"),
  u("1716504628204-47f2df8d2634"),
  u("1747847471517-952a3eb93a89"),
  u("1775665422738-7328494c17b9"),
  u("1756483509254-3cc48a5a15b2"),
  u("1716504627981-22728cb2d2e2"),
  u("1724856605022-106d6dd6e842"),
  u("1759906760638-eeffcb471e53"),
  u("1716504628084-97224213ca6d"),
  u("1634990107480-1422c742f9b5"),
];

const WORDS = [
  { w: "Sketch", color: "text-mustard", line: "It starts in a sketchbook." },
  { w: "Stitch", color: "text-heritage-alt", line: "We find the makers." },
  { w: "Sell", color: "text-offwhite", line: "Your label goes live." },
  { w: "Scale", color: "text-[#9fb4e8]", line: "Investors & exhibitions." },
];

/** C · Kinetic: giant cycling word + a fashion-photo trail that follows the cursor. */
export function HeroC() {
  const stage = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // word cycle
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setI((cur) => {
          setPrev(cur);
          return (cur + 1) % WORDS.length;
        });
      }, 1700);
      cleanup.current = () => clearInterval(id);
    }, 2400);
    const cleanup = { current: () => {} };
    return () => {
      clearTimeout(start);
      cleanup.current();
    };
  }, []);

  // image trail (cursor on desktop; autopilot on touch or when idle)
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    TRAIL.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    let n = 0;
    let lastX = -999, lastY = -999;
    let lastMove = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const spawn = (x: number, y: number) => {
      const img = document.createElement("img");
      img.src = TRAIL[n++ % TRAIL.length];
      img.alt = "";
      img.className = "trail-img";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.setProperty("--tr", `${(Math.random() * 16 - 8).toFixed(1)}deg`);
      img.addEventListener("animationend", () => img.remove());
      el.appendChild(img);
      while (el.querySelectorAll(".trail-img").length > 12) el.querySelector(".trail-img")?.remove();
    };
    const maybeSpawn = (x: number, y: number) => {
      const step = Math.max(70, el.clientWidth * 0.07);
      if (Math.hypot(x - lastX, y - lastY) > step) {
        spawn(x, y);
        lastX = x;
        lastY = y;
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      lastMove = performance.now();
      maybeSpawn(e.clientX - r.left, e.clientY - r.top);
    };
    // autopilot: a looping path across the stage
    let raf = 0;
    const t0 = performance.now();
    const auto = (t: number) => {
      const idle = !fine || t - lastMove > 2500;
      if (idle && t - t0 > 2600) {
        const w = el.clientWidth, h = el.clientHeight;
        const k = (t - t0) / 1000;
        const x = w * (0.5 + 0.38 * Math.sin(k * 0.9));
        const y = h * (0.52 + 0.26 * Math.sin(k * 1.7 + 0.6));
        maybeSpawn(x, y);
      }
      raf = requestAnimationFrame(auto);
    };
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(auto);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cur = WORDS[i];
  return (
    <section
      ref={stage}
      data-theme="dark"
      aria-labelledby="hero-c-title"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-offwhite"
    >
      <div aria-hidden="true" className="grain-mustard absolute inset-0 overflow-hidden opacity-70" />
      <LabNav label="Sketch · Stitch · Sell · Scale" />

      {/* type sits ABOVE the trail */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-[var(--gutter)] pb-[19svh] md:justify-center md:pb-0">
        <p className="l-fade font-display text-[clamp(2rem,5.4vw,5.6rem)] italic leading-none text-beige" style={{ "--d": "100ms" } as CSSProperties}>
          You
        </p>
        <h1 id="hero-c-title" className="relative" aria-live="polite">
          <span className="sr-only">You sketch, stitch, sell and scale. Billo Bazaar helps fashion students become fashion entrepreneurs.</span>
          <span aria-hidden="true" className="relative block h-[0.84em] overflow-hidden font-poster text-[clamp(7.4rem,29vw,30rem)] md:text-[clamp(7rem,27vw,30rem)]">
            {prev !== null && (
              <span key={`out-${prev}-${i}`} className={cn("swap-out absolute left-0 top-0 flex", WORDS[prev].color)}>
                {Array.from(WORDS[prev].w).map((ch, k) => (
                  <span key={k} className="inline-block" style={{ "--k": k } as CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            )}
            <span key={`in-${i}`} className={cn("swap-in absolute left-0 top-0 flex", cur.color)}>
              {Array.from(cur.w).map((ch, k) => (
                <span key={k} className="inline-block" style={{ "--k": k } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        </h1>
        <p className="l-fade mt-2 max-w-[24ch] font-display text-[clamp(2rem,5.4vw,5.6rem)] italic leading-[0.95] text-beige" style={{ "--d": "250ms" } as CSSProperties}>
          we help you <span className="text-mustard">build the brand.</span>
        </p>
      </div>

      {/* right rail: counter + caption */}
      <div className="pointer-events-none absolute right-[var(--gutter)] top-[24%] z-10 hidden text-right md:block">
        <p className="font-poster text-[5rem] leading-none text-offwhite/90">
          0{i + 1}
          <span className="text-offwhite/35">/04</span>
        </p>
        <p key={cur.w} className="swap-caption eyebrow mt-3 text-offwhite/80">{cur.line}</p>
      </div>

      {/* bottom strip: progress through the four verbs + CTA */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 border-t border-offwhite/15 px-[var(--gutter)] py-4">
        <ol className="eyebrow flex gap-5 text-offwhite/45">
          {WORDS.map((w, k) => (
            <li key={w.w} className={cn("transition-colors duration-500", k === i && "text-mustard")}>
              {k === i ? "●" : "○"} {w.w}
            </li>
          ))}
        </ol>
        <Link href="/#contact" className="eyebrow inline-flex h-12 items-center gap-3 rounded-full bg-mustard px-6 text-ink transition-transform duration-500 hover:scale-105">
          Join as a designer ↗
        </Link>
      </div>
    </section>
  );
}

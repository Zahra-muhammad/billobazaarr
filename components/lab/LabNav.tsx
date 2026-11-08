"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LiveClock } from "./LiveClock";
import Link from "next/link";

const LINKS = [
  { label: "Vision", href: "/#vision", ur: "خواب" },
  { label: "What we do", href: "/#what-we-do", ur: "کاروبار" },
  { label: "Journey", href: "/#journey", ur: "سفر" },
  { label: "Partner", href: "/#partner", ur: "ہنر" },
  { label: "Contact", href: "/#contact", ur: "رابطہ" },
];

/**
 * Minimal nav for the hero lab: wordmark, a lamalama-style micro label,
 * a live Pakistan clock and a Menu pill that opens a full-screen overlay.
 */
export function LabNav({ label = "Looking sharp, Lahore", tone = "light" }: { label?: string; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const b = btn.current;
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      b?.focus({ preventScroll: true });
    };
  }, [open]);

  const ink = tone === "light" ? "text-offwhite" : "text-ink";

  return (
    <>
      <header className={cn("l-fade absolute inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-[var(--gutter)] pt-5 md:pt-6", ink)} style={{ ["--d" as string]: "200ms" }}>
        <Link href="/" className="flex items-baseline gap-2" aria-label="Billo Bazaar home">
          <span className="font-display text-[1.7rem] leading-none tracking-[-0.02em] md:text-[2rem]">
            billo<span className="italic">bazaar</span>
          </span>
        </Link>
        <span className="eyebrow hidden items-center gap-3 rounded-full bg-ink/55 px-4 py-2.5 text-offwhite backdrop-blur-md md:inline-flex">
          <span className="size-1.5 animate-pulse rounded-full bg-mustard" />( {label} )
          <span className="opacity-50">·</span>
          <LiveClock />
        </span>
        <button
          ref={btn}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="lab-menu"
          className="eyebrow inline-flex h-11 items-center gap-3 rounded-full bg-mustard px-5 text-ink transition-transform duration-500 ease-[var(--ease-cine)] hover:scale-[1.06]"
        >
          Menu
          <span aria-hidden="true" className="grid gap-[3px]">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </span>
        </button>
      </header>

      <div
        id="lab-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-theme="dark"
        className={cn(
          "fixed inset-0 z-[200] flex flex-col bg-maroon text-beige transition-[clip-path] duration-[900ms] ease-[var(--ease-cine)]",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="flex items-center justify-between px-[var(--gutter)] pt-5 md:pt-6">
          <span className="font-display text-[1.7rem] leading-none md:text-[2rem]">
            billo<span className="italic">bazaar</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="eyebrow inline-flex h-11 items-center gap-3 rounded-full bg-beige px-5 text-maroon"
          >
            Close ✕
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center px-[var(--gutter)]">
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-beige/15">
                <Link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-baseline justify-between gap-6 py-1 transition-transform duration-[900ms] ease-[var(--ease-cine)]",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                  style={{ transitionDelay: open ? `${250 + i * 70}ms` : "0ms" }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow text-mustard">0{i + 1}</span>
                    <span className="font-display text-[clamp(3rem,9.5vw,9rem)] leading-[0.95] tracking-[-0.03em] transition-[font-style,color] duration-300 group-hover:italic group-hover:text-mustard">
                      {l.label}
                    </span>
                  </span>
                  <span lang="ur" dir="rtl" className="urdu hidden text-[2rem] text-mustard opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                    {l.ur}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ajrak h-6 w-full opacity-90" aria-hidden="true" />
      </div>
    </>
  );
}

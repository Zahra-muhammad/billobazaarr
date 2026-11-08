"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Content } from "@/content";
import { EASE, cn } from "@/lib/utils";
import { getLenis, scrollToTarget } from "@/lib/smooth-scroll";
import { ButtonLink } from "@/components/ui/Button";
import { BorderStrip } from "@/components/ui/BorderStrip";
import { Wordmark } from "./Wordmark";

export function Nav({ t, brand }: { t: Content["nav"]; brand: Content["brand"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + manage focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  // Menu links: close the menu (its effect cleanup restores page scrolling),
  // then scroll to the section on the next frame.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(el)));
    history.replaceState(null, "", href);
  };

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="eyebrow sr-only z-[120] rounded-full bg-ink px-4 py-3 text-offwhite focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.skip}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,padding,backdrop-filter] duration-500 ease-editorial",
          solid && !open
            ? "border-b border-ink/10 bg-beige/85 py-3 backdrop-blur-md"
            : "border-b border-transparent py-5 md:py-6",
          open && "py-5 md:py-6",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-baseline gap-3 transition-colors duration-500",
              open ? "text-beige" : "text-ink",
            )}
          >
            <Wordmark parts={brand.wordmark} className="text-[1.65rem] leading-none tracking-[-0.02em] md:text-[1.9rem]" />
            <span className="sr-only">, {t.homeLabel}</span>
            <span
              lang="ur"
              dir="rtl"
              aria-hidden="true"
              className={cn(
                "urdu hidden text-[0.95rem] sm:inline",
                open ? "text-mustard" : "text-heritage",
              )}
            >
              {brand.urdu}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative text-[0.92rem] tracking-tight text-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 start-0 h-px w-full origin-left scale-x-0 bg-heritage transition-transform duration-500 ease-editorial group-hover:scale-x-100 rtl:origin-right"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className={cn("hidden", !open && "sm:block")}>
              <ButtonLink href={t.cta.href} variant="ink" size="sm">
                {t.cta.label}
              </ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "eyebrow flex h-10 items-center gap-3 rounded-full px-4 transition-colors duration-500 lg:hidden",
                open ? "bg-beige text-maroon" : "border border-ink/25 text-ink",
              )}
            >
              <span>{open ? t.menuClose : t.menuOpen}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-editorial",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-editorial",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menuOpen}
            data-theme="dark"
            className="fixed inset-0 z-[70] flex flex-col bg-maroon text-beige lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-1">
                {t.links.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <m.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.75rem,12vw,5rem)] leading-[1] tracking-[-0.03em]"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="eyebrow text-mustard">0{i + 1}</span>
                      {link.label}
                    </m.a>
                  </li>
                ))}
              </ul>
              <m.div
                className="mt-10 flex flex-col gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              >
                <ButtonLink
                  href={t.cta.href}
                  variant="mustard"
                  className="self-start"
                  onClick={(e) => go(e, t.cta.href)}
                >
                  {t.cta.label}
                </ButtonLink>
                <p className="eyebrow text-beige/80">{t.menuNote}</p>
              </m.div>
            </nav>
            <BorderStrip tone="mustard" height={16} className="mb-6 opacity-80" />
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

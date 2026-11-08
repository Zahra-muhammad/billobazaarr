import type Lenis from "lenis";

/**
 * Lenis (smooth wheel scrolling) is loaded on demand, and only for mouse /
 * trackpad devices. Touch devices keep native scrolling. Everything that
 * scrolls programmatically goes through `scrollToTarget`, which works either way.
 */
let instance: Lenis | null = null;

export const getLenis = () => instance;
export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/**
 * Below-the-fold sections use `content-visibility: auto` (class .cv-auto) so
 * the first screen renders fast. Their real heights are only known once they
 * have rendered, so before an anchor jump we render them all (once), which
 * makes the jump land exactly.
 */
export function renderAllSections() {
  const root = document.documentElement;
  if (root.classList.contains("cv-off")) return;
  root.classList.add("cv-off");
  void root.offsetHeight; // apply now, before measuring the target
}

export function scrollToTarget(el: HTMLElement) {
  renderAllSections();
  const lenis = instance;
  if (lenis) {
    lenis.start();
    lenis.resize(); // the page may just have grown (renderAllSections)
    lenis.scrollTo(el, { force: true, duration: 1.4 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
}

/** Handles every in-page link (href="#…") on the page. Returns a cleanup. */
export function interceptAnchorLinks() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (href.length < 2) return;
    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
    history.pushState(null, "", href);
    // Move keyboard focus along with the scroll (e.g. the skip link).
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

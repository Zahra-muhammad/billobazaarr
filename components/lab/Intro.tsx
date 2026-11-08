import { IntroSeen } from "./IntroSeen";

/**
 * Page-load intro: maroon screen, "بلو بازار" written in right-to-left, then
 * the curtain splits open. Pure CSS (globals.css → .bb-intro…) so it plays
 * before JavaScript loads. Skipped for reduced motion and on repeat visits in
 * the same session (the inline script adds .intro-skip before first paint).
 */
export function Intro() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            'try{if(sessionStorage.getItem("bb-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-skip")}}catch(e){}',
        }}
      />
      <div aria-hidden="true" className="bb-intro pointer-events-none fixed inset-0 z-[300]">
        <div className="bb-intro-half-l absolute inset-y-0 left-0 w-[50.5%] bg-maroon" />
        <div className="bb-intro-half-r absolute inset-y-0 right-0 w-[50.5%] bg-maroon" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span
            lang="ur"
            dir="rtl"
            className="bb-intro-word font-[family-name:var(--font-nastaliq-intro)] text-[clamp(4.5rem,17vw,14rem)] font-semibold leading-[1.7] text-mustard"
          >
            بلو بازار
          </span>
          <span className="bb-intro-sub eyebrow tracking-[0.3em] text-beige/80">Billo Bazaar · Est. 2026</span>
        </div>
      </div>
      <IntroSeen />
    </>
  );
}

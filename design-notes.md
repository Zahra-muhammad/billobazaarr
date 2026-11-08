# Reference study: ESR Bespoke · Lamalama · FinApt

Studied 7 Nov 2026 with Playwright (Chrome) at **1440 × 900** and **390 × 844**.

**Method:**

- **Load sequence:** screenshots at fixed intervals while the page loads.
- **Scroll-through:** one screenshot per viewport height, scrolling with the mouse wheel.
- **Hovers:** before/after shots of nav links, images and buttons.
- **Menu:** open and close, frame by frame.
- **Computed styles** read from the live DOM: fonts, sizes, tracking, line-height, transitions, section backgrounds and media sizes.

All numbers below are measured, not estimated. Contact sheets are in [`docs/reference-study/`](docs/reference-study/).

Lamalama renders a WebGL canvas and scrolls inside its own Lenis container (`.ll-scroller`), so it needed a custom capture. Its intro runs slower in headless Chrome than on a real GPU.

---

## 1. ESR Bespoke: esrbespoke.au

Stack: Next.js + Lenis. Two colours (black/white), video everywhere.
Sheets: [load](docs/reference-study/esr-desktop-load.jpg), [scroll](docs/reference-study/esr-desktop-scroll.jpg), [menu](docs/reference-study/esr-desktop-menu.jpg), [page transition](docs/reference-study/esr-desktop-page-transition.jpg), [mobile](docs/reference-study/esr-mobile-scroll.jpg), [mobile load + menu](docs/reference-study/esr-mobile-load-menu.jpg).

**Nav**

- **Header:** positioned `absolute` (not fixed) 28px from the top, transparent, white text. It scrolls away with the hero.
- **Labels:** "ESR BESPOKE" and "AUTOMOTIVE GROUP" sit top-left in 14px uppercase.
- **Links:** five links sit as a vertical stack in the right half, at 14px, weight 300 and +0.09em tracking.
- **After scrolling:** only a fixed **"CONTACT" chip and a square menu button** remain, top-right (1.25rem from the top, 2.3rem from the right).
- **Link hover:** a ■ square marker appears beside the hovered link and the other links dim to about 50%.
- **Menu open:** a white panel drops from the top in about 300ms. The links **type on letter by letter** (about 40px grotesk, sentence case), and a 4:5 thumbnail sits centre-right and swaps. Contact details sit at the bottom in 14px mono, with the logo bottom-left.
- **Menu close:** the panel retracts upward. Mobile is identical.

**Hero**

- **Media:** a full-bleed **autoplay muted video**, 100vw × 100svh, `object-fit: cover`.
- **Headline:** "Exceptional is our standard" is only **62px (4.3vw)** on desktop and **38px (9.7vw)** on mobile. It's weight 500, tracking −0.01em, line-height 1.0, white, left-aligned at about 45% of the height.
- **Supporting text:** a 3-line uppercase 14px blurb sits on the right, with "UNMUTE" and "OUR STORY" along the bottom edge.

**Load sequence (5s)**

1. **0–2.2s:** a black screen. "ESR BESPOKE" types on in tiny mono, then "AUTOMOTIVE GROUP".
2. **2.2–3.5s:** a giant logo (about 37vw wide) assembles from horizontal slices, bottom-left.
3. **About 5s:** a cut to the video hero.

**Type**

- **Families:** exactly two. A grotesk at weight 500 for everything large, and a narrow uppercase face at weight 300 with +0.09em tracking for labels.
- **Scale:** only five sizes, **14 / 20 / 40 / 62 / 92px** (1 / 1.4 / 2.8 / 4.3 / 6.4vw).
- **Display settings:** line-height 0.95–1.0, tracking −1%.
- **No italics, no third font.**

**Grid & spacing**

- 12 × 100px columns, 16px gutters, 32px page margins (18px on mobile).
- Sections butt directly against each other, with **no gaps and no dividers**; the change of background colour is the divider.
- Text sections are split: a tiny label top-left, with the statement starting at column 7.

**Images**

- Mostly **100vw × 100svh** (full-bleed, ratio 1.6) or edge-to-edge strips.
- Small images (216×270, 4:5) only ever appear **next to big type**, as the swapping thumbnail in the marques list and the menu.
- **Big list:** marque names are stacked at 92px. Only the active one is black; the rest are about 15% grey, and the thumbnail swaps with it.

**Motion**

- **One curve everywhere:** `cubic-bezier(0.19, 1, 0.22, 1)` (expo-out) on 49 of 50 transitions, at durations of 0.1, 0.3 and 0.5s.
- **Page transition:** the content fades into black. A black curtain **lifts upward** (about 900ms), then the new headline types in.
- **Other:** Lenis smooth scroll, and a **label cursor** ("NEXT") over the hero carousel.

**Colour:** pure black and white with no accent colour, two colours per section. The rhythm runs: video, white, full-bleed image, white list, black, white footer.

**Footer:** **100svh**, white. The giant ESR logo sits left (about 37vw), with a nav list, an email "SIGN UP" line and contact blocks in 14px uppercase on the right.

---

## 2. Lamalama: lamalama.com

Stack: custom (Vite), Lenis on an inner scroller (6,369px tall on desktop), a WebGL canvas, and JS-driven animation (no CSS transitions found).
Sheets: [intro](docs/reference-study/lamalama-desktop-intro.jpg), [scroll](docs/reference-study/lamalama-desktop-scroll.jpg), [menu + hovers](docs/reference-study/lamalama-desktop-menu-hover.jpg), [mobile](docs/reference-study/lamalama-mobile-scroll.jpg), [mobile menu](docs/reference-study/lamalama-mobile-menu.jpg).

**Nav**

- **The pill:** a **floating centred dark pill** about 300×36px, 4px radius. It holds a pixel logo, a hamburger and a **micro-tagline that changes for every section**:
  - "LET'S GO HAVOC"
  - "CASES WITH TEETH"
  - "OUR PARTY TRICKS"
  - "STILL ON SPEAKING TERMS"
  - "THE CRAZY CREW"
  - "FUTURE COLLAB STARTS HERE"
  - on mobile, "LOOKING SHARP TODAY" and "PRESS THIS, CHANGE YOUR YEAR"
- **Top right:** "GET IN TOUCH", three tiny `[ + ]` items and a **looping portrait video thumbnail** (136×200).
- **Menu open:** the pill **expands downward into a panel**, about 30vw wide on desktop and full width on mobile. The page behind is **blurred**. Rows of 16px links with hairlines stagger in over about 250ms, followed by cream mono buttons ("SCHEDULE A CALL", "START A PROJECT").

**Hero**

- **Media:** a full-bleed WebGL canvas with an animated, dithered, halftone blob pattern.
- **Headline:** bottom-left, "A CREATIVE DIGITAL AGENCY THAT GOES ALL IN OR NOT AT ALL." It's **72px (5vw)**, weight 700, **UPPERCASE**, line-height **0.8**, tracking −0.02em. There's a short paragraph to its right.
- **Meta strip:** along the bottom edge in 10px mono uppercase: "20+ DIGITAL FREAKS · AMSTERDAM BASED · [ 16 : 00 : 20 ] (live clock) · FOLLOW US · INSTAGRAM ↗ · EN/NL".

**Intro**

1. Black with a small loader.
2. A **pixel logo built from squares**.
3. A **pixel-mosaic dissolve** wipes to the hero (about 1.5s once loaded).

**Type**

- **Display:** Suisse BP Intl 700 uppercase at 72–80px (5–5.6vw).
- **Statements:** Suisse 400 in sentence case at 32–48px (2.2–3.3vw), line-height 0.9–1.0.
- **Meta:** **Sometype Mono 10px uppercase** for all metadata, with labels in `[ BRACKETS ]` and tags as mono pills.
- −0.02em tracking on every size of Suisse.

**Grid & spacing:** 12 × 91px columns, 24px gutters, 40px margins (16px on mobile). Sections are separated by large top padding and full-width hairlines.

**Images**

- **Work list:** each row has the client name, mono tag pills, `( + )` and a strip of **180×120 (3:2) thumbnails**. On hover the strip slides sideways and new thumbnails appear.
- **Culture:** an inset collage of two small images and one large 16:9 image.
- **Logos:** a client-logo marquee.
- Photos keep their own colour.

**Motion and playful moments:** the section-aware nav tagline, the live clock, the pixel and dither transitions, the `[ + ]` toggles and a 16px dot cursor.

**Colour:** **one dark background for the whole site** (#1A1C1C) with cream text (#F9F4EB). There are no section colour changes; all colour comes from imagery.

**Footer:** "BRIEF US SOMETHING." at 80px (5.6vw) uppercase, a `[ GET IN TOUCH ]` label, two mono buttons with ↗, then a hairline and the same meta row as the hero.

---

## 3. FinApt: finatp.vercel.app (your previous build)

Stack: Next.js 16 + Lenis.
Sheets: [load](docs/reference-study/finapt-desktop-load.jpg), [scroll 1](docs/reference-study/finapt-desktop-scroll-1.jpg), [scroll 2](docs/reference-study/finapt-desktop-scroll-2.jpg), [hover](docs/reference-study/finapt-desktop-hover.jpg), [mobile](docs/reference-study/finapt-mobile-scroll.jpg), [mobile load + menu](docs/reference-study/finapt-mobile-load-menu.jpg).

**Nav**

- **Header:** fixed, 72px. Transparent over the dark hero, it turns **paper at 95% opacity** after the first scroll.
- **Contents:** centred 14px links with dropdowns, plus "Client login" and a pill CTA.
- **Mobile menu:** the burger opens a full-screen dark panel. Links are **32px Geist with hairlines and `+` accordions**, rising in rows over about 300ms, with CTA pills at the bottom.

**Hero**

- **Background:** dark ink, **not full-bleed**.
- **Headline:** **132px (9.2vw)** Geist 500, tracking **−0.05em**, line-height 0.9, mixed with **Instrument Serif italic** in accent blue. A bracketed mono label sits above it.
- **Image:** an inset portrait image on the right (476×710, 2:3, 33vw) with an **SVG duotone filter**.
- **Stats:** a row of counters below.

**Load sequence**

1. The image fades in (0.7s).
2. Headline **lines rise one at a time behind masks** (1.3s, 2.2s, 3.5s).
3. The paragraph and buttons fade up, and the counters count up.

**Type**

- **Families:** Geist 500 for display, Instrument Serif italic for one to three accent words per headline, and **Geist Mono 13px uppercase in `[ brackets ]`** for labels.
- **Sizes:** 11–15 / 37.6 / 48 / 64 / 96 / 132px, plus the footer wordmark at **331px (23vw)**.

**Grid & spacing:** 12 × 84.7px columns, 24px gutters, **80px margins** (20px on mobile), section padding 96–160px.

**Images**

- **Duotone** on every photo (ink to blue), so stock photos read as one shoot.
- **Services as sticky stacking cards:** each card has text on one side and an image on the other, alternating dark and light. Each new card slides up over the previous one.
- Team portraits at 3:4 and news images at 16:9.

**Motion**

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (45 uses), at 0.5–1.2s.
- **Effects:** buttons fill on hover (cream to blue), a 45s linear marquee, and a statement paragraph whose words brighten from grey to ink as you scroll.

**Colour:** ink #0C0F14, paper #F2EFE8, bone, and one accent blue. The rhythm runs: dark hero, paper, paper (with alternating cards), dark portal, paper ×3, dark CTA, dark footer.

**Footer:** dark, with a **giant ghosted "FinApt" wordmark at 23vw** in low contrast bleeding off the bottom. The link columns sit under `[ SERVICES ] [ FIRM ] [ VISIT ]` headers.

---

## 4. Where Billo Bazaar is today, measured against these

| | References | Billo Bazaar now |
| --- | --- | --- |
| Hero | Full-bleed video/canvas, 100svh (ESR, Lamalama) | Beige background with a 3-photo collage |
| Nav | 1–2 controls; menu in an overlay | 5 inline links + a CTA |
| Section intros | Varied: split screens, giant lists, full-bleed with overlay | The same "label + serif headline + red italic word" 7 times |
| Images | Few, huge (100vw × 100svh) or small only as companions to big type | Many medium images floating with dead space beside them |
| Rhythm | Hard dark/light alternation (ESR, FinApt) | Beige for most of the page, 3 maroon blocks |
| Type contrast | Huge display vs **10–14px mono uppercase**, almost nothing in between | Many sizes from 0.75rem to 10.5rem, used evenly |
| Motion | One curve; curtains; type-on; scroll-linked lists | Reveals everywhere, several easing curves |

---

## 5. The 10 patterns to adopt

1. **A cinematic full-bleed hero.**
   - 100vw × 100svh image or muted video with a slow scale-in (1.12 → 1 over about 2.4s).
   - The headline sits bottom-left over a dark gradient, rising **line by line behind masks**.
   - A thin mono meta row runs along the bottom edge (ESR, Lamalama).
2. **An intro, then a curtain.**
   - A short loader on solid maroon: the wordmark and "بِلّو بازار" type on.
   - Then a curtain **lifts upward** to reveal the hero, kept under 2s.
   - It's skipped for reduced motion and on repeat visits in the same session (ESR load and page transition).
3. **A minimal nav with a full-screen menu.**
   - Only the wordmark, a section-aware micro-label and a "Menu" button stay on screen.
   - The menu drops in as a full-screen panel. **Big serif links rise or type in one after another**, with a thumbnail that swaps as you hover each link (ESR menu, Lamalama pill, your brief).
4. **One easing curve and three durations.**
   - `cubic-bezier(0.76, 0, 0.24, 1)` for every curtain, wipe and reveal, as you asked. ESR proves that one curve is enough.
   - Three durations: **0.6s, 1.0s, 1.4s**.
5. **A hard type contrast.**
   - Statement words at **14–18vw** and headlines at 7–10vw.
   - Everything else is body text or **10–12px mono UPPERCASE with +0.12em tracking, in `[ brackets ]`**, and nothing in between (ESR uses only 5 sizes).
   - Fewer weights: serif 400 (+ italic), sans 400/500, mono 400.
6. **A deliberate dark/light beat.**
   - Sections butt edge to edge with no dividers, alternating **maroon or ink ↔ off-white or beige**.
   - The colour change *is* the divider (ESR black/white, FinApt ink/paper).
7. **Fewer, bigger images and one grade.**
   - Images are full-bleed (100svh) or edge-to-edge in one column.
   - Small images appear only beside big type, never floating alone.
   - One warm treatment on every photo makes mixed placeholders read as one shoot (FinApt's duotone idea).
8. **A big list with a swapping image, for multi-item content.**
   - Huge stacked titles where only the active one is fully opaque, with **one large image that swaps**.
   - This becomes the sticky *What We Do* section (ESR marques list, Lamalama work rows).
   - Journey uses the pinned "one word takes over the screen" version.
9. **Varied section openings.**
   - Split screen: a mono label in the left columns and the statement from column 7, at about 2.8vw (ESR).
   - Full-bleed image with the text overlaid (ESR "The details that drive us").
   - A giant single word.
   - A paragraph that brightens with scroll (FinApt).
   - No two consecutive sections open the same way.
10. **Playful details and a giant footer.**
    - The nav micro-label changes per section (Lamalama), there's a live Lahore/Karachi clock in the meta row, and the cursor shows a "View" label over images (ESR "NEXT").
    - Buttons are magnetic.
    - The footer is about 100svh with an **edge-to-edge "billobazaar" wordmark** (ESR logo, FinApt ghost wordmark), the embroidery strip and a minimal link grid.

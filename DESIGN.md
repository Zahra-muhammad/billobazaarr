# Billo Bazaar: design system

Editorial fashion-magazine landing page: big type, big images, slow elegant motion, a few playful moments. Modern desi, not traditional cliché. Premium and youthful, not corporate.

## Colour

Tokens live in `app/globals.css` (`@theme`). Tailwind's default palette is switched off, so only these exist.

| Token | Hex | Use |
| --- | --- | --- |
| `maroon` | #630E13 | Primary dark; full-bleed statement sections (marquee, On the Ground, footer) |
| `heritage` | #BB2823 | Accent / primary CTA / italic emphasis on light backgrounds |
| `heritage-alt` | #C0383B | Decorative / large text only (4.2:1 on beige) |
| `olive` | #5B6435 | Institutes card |
| `olive-deep` | #205D2E | Reserve |
| `mustard` | #DAA663 | Highlights and CTAs **on dark only**; embroidery strip |
| `indigo` | #214276 | Used once (Manufacturers & Investors card) |
| `beige` | #EAE2CC | Page background |
| `sand` | #D8C7AD | Image placeholders, quiet rules |
| `offwhite` | #F6F2EA | Alternate section background, cards |
| `ink` | #1A1414 | Text |
| `ink-soft` | #4A3F3C | Secondary text (7.9:1 on beige) |

Contrast checks (WCAG):

- `heritage` on `beige` = 4.7:1, so it passes AA for body text. On `sand` it does not; don't do it.
- `mustard` on `beige` fails, so it is never used as text on light backgrounds.
- `beige` on `maroon` = 10:1, `mustard` on `maroon` = 6:1, `offwhite` on `heritage`/`olive`/`indigo` ≥ 5.5:1.
- Small text on `maroon` uses at least `beige/80`.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display | Instrument Serif (roman + italic) | Tight tracking (−0.02 to −0.04em), line-height 0.86–1 |
| Body / UI | Geist | |
| Labels | Geist Mono | 12px, uppercase, 0.14em tracking (`eyebrow` utility) |
| Urdu | Noto Nastaliq Urdu | Accent words now; full Urdu later. Line-height ≈ 2 |

Fluid scale (`text-*` utilities):

| Utility | Size |
| --- | --- |
| `display-2xl` | clamp(3.1rem → 11rem) |
| `display-xl` | clamp(2.7rem → 8rem) |
| `display-lg` | clamp(2.3rem → 5.5rem) |
| `display-md` | clamp(1.9rem → 3.4rem) |
| `display-sm` | clamp(1.55rem → 2.2rem) |
| `lead` | clamp(1.06rem → 1.3rem) |
| body | 1rem |
| `label` | 0.75rem |

The hero headline has its own size, clamp(3.15rem → 10.5rem).

## Layout & spacing

- One **12-column grid** everywhere (`grid-12`), inside `shell` (max 1600px).
- Side gutters run from 20px to 56px (`--gutter`). The column gap runs from 12px to 24px (`--gap`).
- Section rhythm: `section-y` sets vertical padding from 88px to 168px.
- Text always starts on the left grid edge (no right-hand text columns). Images carry the asymmetry.
- Every responsive `col-span-*` is paired with a `col-start-*` at the same breakpoint. In Tailwind v4 the span shorthand otherwise resets the start.

## Motion rules

- **Easing:** `--ease-editorial` = cubic-bezier(.22, 1, .36, 1) for almost everything. `--ease-spring` (overshoot) is reserved for the playful Journey.
- **Durations:**
  - text reveals about 1s, with a 55ms stagger between words
  - fades 0.95s
  - image wipes 1.4s, plus a 1.9s settle from scale 1.18 to 1
- **Parallax:** at most 6–8% of the image height. It is a CSS scroll-driven animation; where unsupported, images are simply still.
- **Hero:** the entrance is pure CSS, so it starts on first paint. The photos are revealed by a beige "curtain" sliding off, which looks like a wipe but keeps the image painted for LCP.
- **Playful moments:**
  - the Journey: a stitched thread drawing down the page, a needle on its tip, letters springing up and waving on hover, sticker photos with Urdu swing-tags
  - the velocity-driven marquee, which speeds up and reverses with scrolling
  - the rotating badge
  - the struck-out ~~school~~
  - the custom cursor
- **Reduced motion:** everything is instant and still. There is no Lenis, parallax, marquee drift or cursor, and reveals are shown immediately.

## Signature details

- **Embroidery border strip** (`BorderStrip`): stepped phulkari diamonds with ajrak-style dotted rules, in maroon and mustard. It appears as a section divider, at the top of On the Ground, in the mobile menu and in the footer.
- **Paper grain:** one fixed SVG-noise layer at 9% opacity over everything, with no blend modes.
- **Warm grade** on photos: saturate .8, sepia .12, contrast 1.04.
- **Urdu accents:** "بِلّو بازار" beside the logo, and a word per section label (خواب, کاروبار, سفر, پاکستان, ہنر, نمائش, رابطہ).

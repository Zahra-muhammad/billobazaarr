# Billo Bazaar: landing page

The one-page site for **Billo Bazaar**, the launchpad and network that helps Pakistani fashion students become fashion entrepreneurs. Billo Bazaar is not a school; it partners with them.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lenis · deploy-ready for Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint
```

## Editing the site

**All copy and every image path live in [`content.ts`](content.ts).** You shouldn't need to touch any component to change words or photos.

- **Text:** edit the strings under `en`. Wrap words in `*asterisks*` to set them in the italic accent style, e.g. `"to fashion *entrepreneurs.*"`.
- **Photos:** the `images` map at the top of `content.ts` has one entry per photo, each with a note on what kind of shot belongs there and its rough shape. Put your file in `public/images/` and change the path, e.g. `heroMain: "/images/hero-main.jpg"`. Then update that photo's `alt` text further down. See [`public/images/README.md`](public/images/README.md).
  - The four hero placeholders are already local (`public/images/placeholder/`) so the first screen loads from your own domain. The rest are Unsplash placeholders.
  - Every photo gets a warm, slightly desaturated grade so mixed photos sit together (`grade` utility in `app/globals.css`).

### Placeholders to replace before launch

| What | Where |
| --- | --- |
| All photos | `images` map in `content.ts` |
| WhatsApp number, Instagram handle, email | `contact.direct` in `content.ts` |
| Social links (footer) | `footer.socials` in `content.ts` |
| Live domain | `NEXT_PUBLIC_SITE_URL` env var (used for SEO tags, sitemap, robots) |
| Founder visit copy (who / when) | `ground` in `content.ts` |
| Urdu accent words: quick check by a native reader | `urdu:` fields in `content.ts` |
| Open Graph image (shared-link preview) | `app/opengraph-image.png` + `app/twitter-image.png` (1200×630) |

## Forms (front-end only for now)

Both forms validate and show success states but don't send anything yet. Each has a clear `TODO` with copy-paste code for **Formspree** or **Resend**:

- Contact / partner form: `submitContact()` in [`components/sections/Contact.tsx`](components/sections/Contact.tsx)
- Exhibitions "Get notified": `onSubmit()` in [`components/sections/NotifyForm.tsx`](components/sections/NotifyForm.tsx)

CTA buttons such as "Join as a Designer" pre-select the matching "I am a…" option in the contact form.

## Adding Urdu

The site is built to be bilingual (English / Urdu) and RTL-safe: layouts use logical properties (`start`/`end`, `ps`/`pe`), arrows and the marquee flip direction, and the Journey's letter-by-letter animation automatically switches to whole words for Urdu so the script stays joined.

1. **Translate:** fill in the `ur` object in `content.ts` (same shape as `en`). Anything you leave out falls back to English, so you can go section by section.
2. **Add the route:** create `app/ur/page.tsx`:
   ```tsx
   import { Site } from "@/components/Site";
   export default function UrduHome() {
     return <Site locale="ur" />;
   }
   ```
   `<Site>` wraps the page in `lang="ur" dir="rtl"`. To also set `<html lang="ur" dir="rtl">`, split the root layout into two [route-group root layouts](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) (`app/(en)/layout.tsx` and `app/(ur)/ur/layout.tsx`).
3. **Font:** the Nastaliq webfont (Noto Nastaliq Urdu) is already loaded in `app/layout.tsx`. For the English page it is deliberately switched on *after* load because it's 200 KB+ and only used for small accents (see `MotionProviders.tsx`). On the Urdu page, use it straight away: add `style={{ fontFamily: "var(--font-urdu)" }}` (or a class) to the `<Site>` wrapper and allow generous line-height (~1.9–2).
4. **Hero badge:** the circular text on the hero badge is English (`hero.badge`); give it an Urdu string in `ur`.
5. Add a language switch link in the nav when ready.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project**, import the repo (framework is detected automatically).
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` = your domain (e.g. `https://billobazaar.com`).
4. Deploy. The page is fully static.

## Project structure

```
content.ts                  ← all copy + image paths (edit this)
app/
  layout.tsx                fonts, SEO metadata, providers
  page.tsx                  the page (+ JSON-LD)
  globals.css               design tokens, grain, reveal + parallax CSS
  icon.svg, opengraph-image.png, twitter-image.png, robots.ts, sitemap.ts
components/
  Site.tsx                  composes the page for one locale
  layout/                   Nav, Footer, Wordmark
  sections/                 Hero, Marquee, Vision, WhatWeDo, Journey, OnTheGround,
                            WhoItsFor, Exhibitions, Contact (+ small client helpers)
  ui/                       BorderStrip, Reveal, RevealObserver, Img, Button,
                            SectionLabel, Cursor, ScrollProgress
  providers/                MotionProviders (Motion, Lenis, fonts, anchors), LocaleProvider
lib/                        utils, smooth-scroll, use-near, motion-features
public/images/              your photos (placeholders in placeholder/)
```

Design system (colours, type scale, spacing, motion rules): see [DESIGN.md](DESIGN.md).

## Performance & accessibility

Measured on the production build with Lighthouse 12 (Nov 2026):

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 99 | 100 | 100 | 100 |
| Mobile, applied throttling (slow 4G, 4× CPU) | 94–95 | 100 | – | – |
| Mobile, Lighthouse default (simulated) | 86–87 | 100 | 100 | 100 |

The default mobile mode *simulates* throttling from an unthrottled trace and charges all of React's start-up script to the first paint when tested on `localhost`; measured with real throttling, LCP is ~2.0 s and CLS is 0. Re-check on the deployed URL with PageSpeed Insights.

How it stays fast:

- The hero entrance is pure CSS, so it starts on first paint.
- Scroll reveals are CSS transitions driven by one IntersectionObserver.
- Image parallax uses CSS scroll-driven animations.
- Below-the-fold sections use `content-visibility: auto`.
- Motion's animation engine is lazy-loaded, and Lenis loads only on mouse/trackpad devices.
- The Urdu font loads after the page.
- CSS is inlined.

`prefers-reduced-motion` is respected throughout: no smooth scrolling, no parallax, no marquee drift, no custom cursor, and reveals appear instantly.

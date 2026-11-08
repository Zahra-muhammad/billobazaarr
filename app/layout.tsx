import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { Archivo, Geist, Geist_Mono, Instrument_Serif, Noto_Nastaliq_Urdu } from "next/font/google";
import localFont from "next/font/local";
import { defaultLocale, getContent, localeDir } from "@/content";
import { MotionProviders } from "@/components/providers/MotionProviders";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Poster / streetwear display: Archivo with its width axis, used at
// wdth 62 + weight 900 (extra-condensed black) for giant words.
const poster = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// "بلو بازار" for the intro, subset to just those glyphs (15 KB) so it can be
// shown instantly. Regenerate with fonttools if the intro wording changes.
const urduIntro = localFont({
  src: "./fonts/nastaliq-intro.woff2",
  variable: "--font-nastaliq-intro",
  display: "block",
  weight: "400 700",
});

// Only used for small decorative words for now: not preloaded, and only
// switched on after page load (see MotionProviders).
const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

const t = getContent(defaultLocale);
// TODO: set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://billobazaar.com).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://billobazaar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: t.meta.siteName,
  keywords: [
    "Billo Bazaar",
    "Pakistani fashion",
    "fashion students Pakistan",
    "fashion entrepreneurs",
    "emerging designers",
    "fashion brand launch",
    "Lahore",
    "Karachi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: t.meta.siteName,
    title: t.meta.title,
    description: t.meta.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#eae2cc",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Placeholder photos are served by Unsplash's CDN; open the connection early.
  preconnect("https://images.unsplash.com");
  return (
    <html
      lang={defaultLocale}
      dir={localeDir[defaultLocale]}
      className={`${display.variable} ${sans.variable} ${mono.variable} ${poster.variable} ${urdu.variable} ${urduIntro.variable} antialiased`}
      // Browser extensions (Grammarly, ColorZilla…) add attributes to <html>/<body>
      // before React loads; this only silences those two elements' own attributes.
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Without JavaScript, show everything that would normally animate in. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] .rw,[data-reveal] .rl,[data-reveal] .ri-inner{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal="sticker"]{transform:rotate(var(--tilt,0deg))!important}`}</style>
        </noscript>
        <MotionProviders>
          {children}
          <Cursor />
        </MotionProviders>
      </body>
    </html>
  );
}

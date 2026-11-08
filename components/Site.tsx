import { getContent, localeDir, type Locale } from "@/content";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BorderStrip } from "@/components/ui/BorderStrip";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Vision } from "@/components/sections/Vision";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Journey } from "@/components/sections/Journey";
import { OnTheGround } from "@/components/sections/OnTheGround";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Exhibitions } from "@/components/sections/Exhibitions";
import { Contact } from "@/components/sections/Contact";

/**
 * The whole landing page for one locale. `app/page.tsx` renders it in English;
 * an Urdu route can render <Site locale="ur" /> (see README → Adding Urdu).
 */
export function Site({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <LocaleProvider locale={locale}>
      <div lang={locale} dir={localeDir[locale]}>
        <Nav t={t.nav} brand={t.brand} />
        <main id="main">
          <Hero t={t.hero} />
          <Marquee t={t.marquee} />
          <Vision t={t.vision} />
          <BorderStrip tone="maroon" height={18} />
          <WhatWeDo t={t.whatWeDo} />
          <Journey t={t.journey} locale={locale} />
          <OnTheGround t={t.ground} />
          <WhoItsFor t={t.audience} />
          <Exhibitions t={t.exhibitions} />
          <Contact t={t.contact} />
        </main>
        <Footer t={t.footer} nav={t.nav} brand={t.brand} />
        <RevealObserver />
      </div>
    </LocaleProvider>
  );
}

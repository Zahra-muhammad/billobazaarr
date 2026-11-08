"use client";

import { createContext, useContext } from "react";
import { localeDir, type Locale } from "@/content";

type LocaleValue = { locale: Locale; dir: "ltr" | "rtl" };

const LocaleContext = createContext<LocaleValue>({ locale: "en", dir: "ltr" });

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale, dir: localeDir[locale] }}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

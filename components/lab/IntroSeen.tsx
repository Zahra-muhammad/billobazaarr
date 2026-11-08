"use client";

import { useEffect } from "react";

/** Remembers that the intro has played this session. */
export function IntroSeen() {
  useEffect(() => {
    try {
      sessionStorage.setItem("bb-intro", "1");
    } catch {
      /* private mode: just play it again next time */
    }
  }, []);
  return null;
}

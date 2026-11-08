import type { Role } from "@/content";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** House easing: a soft, editorial expo-out. Mirrors --ease-editorial in CSS. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export type Segment = { text: string; em: boolean };

/**
 * Splits copy like "to fashion *entrepreneurs.*" into segments, where
 * *starred* parts are rendered in the italic accent style.
 */
export function parseEm(input: string): Segment[] {
  const parts = input.split("*");
  return parts
    .map((text, i) => ({ text, em: i % 2 === 1 }))
    .filter((s) => s.text.length > 0);
}

/** Same as parseEm, but split into individual words (keeping the em flag). */
export function parseWords(input: string): Segment[] {
  return parseEm(input).flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, em: seg.em })),
  );
}

export function plain(input: string) {
  return input.replaceAll("*", "");
}

/* ── Contact role hand-off ─────────────────────────────────────────────────
   CTAs elsewhere on the page (e.g. "Join as a Designer") pre-select the
   matching "I am a…" option in the contact form. */
export const ROLE_EVENT = "bb:set-role";

export function announceRole(role: Role | undefined) {
  if (!role || typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<Role>(ROLE_EVENT, { detail: role }));
}

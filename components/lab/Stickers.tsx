import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; style?: CSSProperties };

/** Round mustard badge with a spinning text ring. */
export function BadgeEst({ className, style }: Props) {
  return (
    <div className={cn("relative aspect-square", className)} style={style} aria-hidden="true">
      <div className="l-spin absolute inset-0 rounded-full bg-mustard text-ink shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)]">
        <svg viewBox="0 0 100 100" className="size-full">
          <defs>
            <path id="badge-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-current font-mono uppercase" fontSize="8.2" letterSpacing="1">
            <textPath href="#badge-ring" textLength="228" lengthAdjust="spacing">
              Billo Bazaar · Est. 2026 · Lahore · Karachi ·
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-ink">
        <span className="eyebrow text-[0.55em]">Est.</span>
        <span className="font-poster text-[2.1em] leading-none">2026</span>
      </div>
    </div>
  );
}

/** Red rectangular sticker: MADE IN PAKISTAN */
export function StickerMadeIn({ className, style }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("sticker flex items-center gap-[0.35em] rounded-[3px] bg-heritage px-[0.6em] py-[0.35em] text-offwhite", className)}
      style={style}
    >
      <span className="text-[0.8em] text-mustard">✦</span>
      <span className="font-poster leading-[0.9]">
        Made in
        <br />
        Pakistan
      </span>
    </div>
  );
}

/** Off-white pill: STUDENT → BRAND */
export function PillStudentBrand({ className, style }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("sticker inline-flex items-center gap-2 rounded-full bg-offwhite px-[0.9em] py-[0.45em] font-mono text-ink uppercase tracking-[0.08em]", className)}
      style={style}
    >
      Student <span className="text-heritage">→</span> Brand
    </div>
  );
}

/** Washi tape label with mono text. */
export function Tape({ children, className, style }: Props & { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={cn("tape px-[1.6em] py-[0.7em] font-mono uppercase tracking-[0.14em] text-ink", className)}
      style={style}
    >
      {children}
    </div>
  );
}

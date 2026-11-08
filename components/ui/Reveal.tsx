import type { CSSProperties } from "react";
import { cn, parseWords, plain } from "@/lib/utils";
import { Img } from "./Img";

/*
 * Scroll reveals, as plain server-rendered HTML + CSS transitions.
 * A single <RevealObserver/> adds `.is-in` when each [data-reveal] element
 * enters the viewport (see "Scroll reveals" in globals.css). No per-element
 * JavaScript, so there is almost nothing to hydrate.
 * Delays are given in seconds.
 */

const delayStyle = (delay: number, extra?: CSSProperties) =>
  ({ ...(delay ? { "--delay": `${Math.round(delay * 1000)}ms` } : {}), ...extra }) as CSSProperties;

/* ── Masked word-by-word heading reveal ─────────────────────────────────── */
export function RevealWords({
  text,
  as: Tag = "h2",
  className,
  emClassName = "italic text-heritage",
  delay = 0,
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  emClassName?: string;
  delay?: number;
  id?: string;
}) {
  const words = parseWords(text);
  return (
    <Tag className={className} id={id} data-reveal="words" style={delayStyle(delay)}>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="rw-mask">
              <span className={cn("rw", w.em && emClassName)} style={{ "--i": i } as CSSProperties}>
                {w.text}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ── Fade + rise for paragraphs, lists, buttons ─────────────────────────── */
export function FadeUp({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p" | "article";
}) {
  return (
    <Tag className={className} data-reveal="fade" style={delayStyle(delay)}>
      {children}
    </Tag>
  );
}

/* ── Image with clip-path wipe, slow settle and optional parallax ───────── */
export function RevealImage({
  src,
  alt,
  sizes,
  className,
  imgClassName,
  parallax = 0,
  delay = 0,
  cursor = true,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Parallax travel as a % of the image height (keep it small: 4–8). CSS scroll-driven; static where unsupported. */
  parallax?: number;
  delay?: number;
  cursor?: boolean;
}) {
  return (
    <div
      data-reveal="image"
      data-cursor={cursor ? "image" : undefined}
      className={cn("relative overflow-hidden bg-sand", className)}
      style={delayStyle(delay)}
    >
      <div
        data-parallax
        className={cn("absolute inset-x-0", parallax ? "parallax-y" : "inset-y-0")}
        style={
          parallax
            ? ({ top: `-${parallax}%`, bottom: `-${parallax}%`, "--px": `${parallax}%` } as CSSProperties)
            : undefined
        }
      >
        <div className="ri-inner absolute inset-0">
          <Img src={src} alt={alt} fill sizes={sizes} className={imgClassName} />
        </div>
      </div>
    </div>
  );
}

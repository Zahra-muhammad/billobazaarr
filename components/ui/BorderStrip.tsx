import { cn } from "@/lib/utils";

/**
 * A thin repeating border inspired by phulkari darning stitches (the stepped
 * diamonds) and ajrak block-print borders (the dotted rules). It is one SVG
 * tile used as a repeating background, so it stays crisp and costs one element.
 *
 * tone="maroon"  → maroon band with mustard motif (use on light backgrounds)
 * tone="mustard" → mustard motif on transparent (use on maroon backgrounds)
 */

const MAROON = "#630E13";
const MUSTARD = "#DAA663";
const PX = 2; // one "stitch"

/** Rows of a stepped diamond, centred on cx, starting at `top`. */
const diamond = (cx: number, top: number, widths: number[], fill: string, opacity = 1) =>
  widths
    .map(
      (w, i) =>
        `<rect x="${cx - w / 2}" y="${top + i * PX}" width="${w}" height="${PX}" fill="${fill}"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`,
    )
    .join("");

function tile(tone: "maroon" | "mustard") {
  const bg = tone === "maroon" ? `<rect width="40" height="20" fill="${MAROON}"/>` : "";
  const dots = [0, 8, 16, 24, 32]
    .map((x) => `<rect x="${x + 3}" y="0.5" width="2" height="1"/><rect x="${x + 3}" y="18.5" width="2" height="1"/>`)
    .join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20">${bg}` +
    `<g fill="${MUSTARD}">${dots}</g>` +
    diamond(20, 3, [2, 6, 10, 14, 10, 6, 2], MUSTARD) +
    diamond(20, 7, [2, 6, 2], MAROON) +
    `<rect x="19" y="9" width="2" height="2" fill="${MUSTARD}"/>` +
    diamond(0, 7, [2, 6, 2], MUSTARD, 0.6) +
    diamond(40, 7, [2, 6, 2], MUSTARD, 0.6) +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const TILES = { maroon: tile("maroon"), mustard: tile("mustard") };

export function BorderStrip({
  tone = "maroon",
  className,
  height = 18,
}: {
  tone?: "maroon" | "mustard";
  className?: string;
  /** Rendered height in px. The pattern scales with it. */
  height?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full", className)}
      style={{
        height,
        backgroundImage: TILES[tone],
        backgroundRepeat: "repeat-x",
        backgroundSize: `${height * 2}px ${height}px`,
        backgroundOrigin: "content-box",
        backgroundClip: "content-box",
      }}
    />
  );
}

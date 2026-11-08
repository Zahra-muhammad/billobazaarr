import { cn } from "@/lib/utils";

/** Lowercase "billobazaar" wordmark: roman + italic, one word. Size/leading come from className. */
export function Wordmark({ parts, className }: { parts: string[]; className?: string }) {
  const [a, b] = parts;
  return (
    <span className={cn("font-display lowercase", className)}>
      {a}
      <span className="italic">{b}</span>
    </span>
  );
}

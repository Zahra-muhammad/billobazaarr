import { cn } from "@/lib/utils";

/** "(02) — What We Do  کاروبار" — the small running head above each section. */
export function SectionLabel({
  index,
  label,
  urdu,
  tone = "light",
  className,
}: {
  index: string;
  label: string;
  urdu?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "light" ? "text-ink" : "text-beige",
        className,
      )}
    >
      <span className="tabular-nums">({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50 md:w-12" />
      <span>{label}</span>
      {urdu && (
        <span
          lang="ur"
          dir="rtl"
          className={cn(
            "urdu -my-3 ms-1 text-[1.3rem]",
            tone === "light" ? "text-heritage" : "text-mustard",
          )}
        >
          {urdu}
        </span>
      )}
    </p>
  );
}

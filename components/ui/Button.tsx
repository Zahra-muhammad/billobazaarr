"use client";

import type { Role } from "@/content";
import { announceRole, cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-[1em] shrink-0 rtl:-scale-x-100", className)}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

type Variant = "primary" | "ink" | "outline" | "mustard" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-heritage text-offwhite hover:bg-maroon",
  ink: "bg-ink text-offwhite hover:bg-maroon",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-offwhite",
  mustard: "bg-mustard text-ink hover:bg-beige",
  light: "bg-offwhite text-ink hover:bg-mustard",
};

/** Pill link with a sliding arrow. Optionally pre-selects a role in the contact form. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  role,
  className,
  size = "md",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  role?: Role;
  className?: string;
  size?: "sm" | "md";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        announceRole(role);
        onClick?.(e);
      }}
      className={cn(
        "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-tight transition-colors duration-500 ease-editorial",
        size === "md" ? "h-13 px-7 text-[0.95rem]" : "h-10 px-5 text-sm",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <span className="relative inline-flex size-[1.1em] overflow-hidden">
        <Arrow className="absolute inset-0 transition-transform duration-500 ease-editorial group-hover/btn:translate-x-[130%] rtl:group-hover/btn:-translate-x-[130%]" />
        <Arrow className="absolute inset-0 -translate-x-[130%] transition-transform duration-500 ease-editorial group-hover/btn:translate-x-0 rtl:translate-x-[130%]" />
      </span>
    </a>
  );
}

"use client";

import { useState } from "react";
import type { Content } from "@/content";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "Get notified" email capture for the Exhibitions teaser. Front-end only for now. */
export function NotifyForm({ t }: { t: Content["exhibitions"] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // TODO: connect to your email list. Two easy options:
    //  • Formspree: await fetch("https://formspree.io/f/<FORM_ID>", { method: "POST",
    //      headers: { "Content-Type": "application/json", Accept: "application/json" },
    //      body: JSON.stringify({ email, list: "exhibitions" }) })
    //  • Resend Audiences: POST to a route handler (app/api/notify/route.ts) that calls
    //      resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID }).
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p role="status" className="mt-10 max-w-[40ch] border-t border-beige/30 pt-6 text-lead text-beige">
        {t.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10">
      <label htmlFor="notify-email" className="eyebrow text-beige/85">
        {t.emailLabel}
      </label>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end">
        <input suppressHydrationWarning
          id="notify-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t.emailPlaceholder}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "notify-error" : undefined}
          className={cn(
            "h-13 w-full min-w-0 flex-1 border-b bg-transparent text-lg text-beige outline-none transition-colors placeholder:text-beige/55 focus-visible:border-mustard focus-visible:outline-none",
            status === "error" ? "border-mustard" : "border-beige/50",
          )}
        />
        <button suppressHydrationWarning
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex h-13 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-mustard px-7 font-medium tracking-tight text-ink transition-colors duration-500 ease-editorial hover:bg-beige disabled:opacity-70"
        >
          {status === "sending" ? t.sending : t.button}
          <Arrow className="transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
        </button>
      </div>
      <p id="notify-error" role="alert" className="mt-3 min-h-[1.5em] text-sm text-mustard">
        {status === "error" ? t.invalid : ""}
      </p>
    </form>
  );
}

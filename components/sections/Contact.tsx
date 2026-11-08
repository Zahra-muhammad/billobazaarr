"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Content, Role } from "@/content";
import { EASE, ROLE_EVENT, cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeUp, RevealWords } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Fields = { name: string; email: string; role: Role | ""; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

/* ─────────────────────────────────────────────────────────────────────────
 * TODO: hook the form up to a real inbox. Front-end only for now.
 *
 * Option A: Formspree (no backend code)
 *   1. Create a form at formspree.io and copy its endpoint.
 *   2. In submitContact(), replace the fake delay with:
 *        const res = await fetch("https://formspree.io/f/<FORM_ID>", {
 *          method: "POST",
 *          headers: { "Content-Type": "application/json", Accept: "application/json" },
 *          body: JSON.stringify(data),
 *        });
 *        if (!res.ok) throw new Error("Formspree error");
 *
 * Option B: Resend (emails you via a Next.js route handler)
 *   1. npm i resend, then add RESEND_API_KEY in Vercel → Settings → Environment Variables.
 *   2. Create app/api/contact/route.ts:
 *        import { Resend } from "resend";
 *        const resend = new Resend(process.env.RESEND_API_KEY);
 *        export async function POST(req: Request) {
 *          const data = await req.json();
 *          await resend.emails.send({
 *            from: "Billo Bazaar <hello@your-domain.com>",
 *            to: "you@your-domain.com",
 *            replyTo: data.email,
 *            subject: `New ${data.role} enquiry from ${data.name}`,
 *            text: data.message,
 *          });
 *          return Response.json({ ok: true });
 *        }
 *   3. In submitContact(), POST to "/api/contact" instead of the fake delay.
 * ───────────────────────────────────────────────────────────────────────── */
async function submitContact(data: Fields) {
  void data;
  await new Promise((r) => setTimeout(r, 900));
}

export function Contact({ t }: { t: Content["contact"] }) {
  const f = t.form;
  const [fields, setFields] = useState<Fields>({ name: "", email: "", role: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // CTAs elsewhere on the page pre-select a role.
  useEffect(() => {
    const onRole = (e: Event) => {
      const role = (e as CustomEvent<Role>).detail;
      setFields((prev) => ({ ...prev, role }));
      setErrors((prev) => ({ ...prev, role: undefined }));
    };
    window.addEventListener(ROLE_EVENT, onRole);
    return () => window.removeEventListener(ROLE_EVENT, onRole);
  }, []);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate(v: Fields): Errors {
    const e: Errors = {};
    if (!v.name.trim()) e.name = f.errors.name;
    if (!EMAIL_RE.test(v.email.trim())) e.email = f.errors.email;
    if (!v.role) e.role = f.errors.role;
    if (v.message.trim().length < 10) e.message = f.errors.message;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    const firstInvalid = (Object.keys(e) as (keyof Fields)[])[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(
        firstInvalid === "role" ? 'input[name="role"]' : `[name="${firstInvalid}"]`,
      );
      el?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitContact(fields);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass = (invalid: boolean) =>
    cn(
      "mt-2 w-full border-b bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus-visible:border-heritage focus-visible:outline-none",
      invalid ? "border-heritage" : "border-ink/30",
    );

  return (
    <section id="contact" aria-labelledby="contact-title" className="cv-auto section-y relative">
      <div className="shell grid-12 gap-y-16">
        {/* Intro + direct links */}
        <div className="col-span-12 lg:col-span-5">
          <SectionLabel index={t.index} label={t.label} urdu={t.urdu} />
          <RevealWords
            id="contact-title"
            text={t.heading}
            className="mt-10 max-w-[12ch] font-display text-display-xl text-ink md:mt-14"
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-[42ch] text-lead text-ink-soft text-pretty">{t.intro}</p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12">
            <p className="eyebrow text-ink-soft">{t.directLabel}</p>
            <ul className="mt-4 border-t border-ink/15">
              {t.direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-ink/15 py-4"
                  >
                    <span className="eyebrow w-24 shrink-0 text-ink-soft">{d.label}</span>
                    <span className="flex-1 font-display text-[1.6rem] leading-tight text-ink transition-colors duration-500 group-hover:text-heritage">
                      {d.value}
                    </span>
                    <Arrow className="text-lg transition-transform duration-500 ease-editorial group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        {/* Form */}
        <FadeUp className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.15}>
          <div className="relative bg-offwhite p-6 shadow-[0_40px_80px_-50px_rgba(26,20,20,0.35)] sm:p-10 lg:p-12">
            <AnimatePresence mode="wait" initial={false}>
              {status === "done" ? (
                <m.div
                  key="done"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[28rem] flex-col justify-center"
                >
                  <span lang="ur" dir="rtl" className="urdu self-start text-[2rem] text-heritage">
                    شکریہ
                  </span>
                  <p className="mt-4 max-w-[22ch] font-display text-display-md text-ink">{f.success}</p>
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => {
                      setFields({ name: "", email: "", role: "", message: "" });
                      setStatus("idle");
                    }}
                    className="eyebrow mt-10 self-start border-b border-ink pb-1 text-ink transition-colors hover:border-heritage hover:text-heritage"
                  >
                    {f.successAgain}
                  </button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-9"
                >
                  <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label htmlFor="c-name" className="eyebrow text-ink-soft">
                        {f.name}
                      </label>
                      <input suppressHydrationWarning
                        id="c-name"
                        name="name"
                        autoComplete="name"
                        value={fields.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder={f.namePlaceholder}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "c-name-err" : undefined}
                        className={fieldClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p id="c-name-err" className="mt-2 text-sm text-heritage">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="eyebrow text-ink-soft">
                        {f.email}
                      </label>
                      <input suppressHydrationWarning
                        id="c-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={fields.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder={f.emailPlaceholder}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "c-email-err" : undefined}
                        className={fieldClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p id="c-email-err" className="mt-2 text-sm text-heritage">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <fieldset aria-describedby={errors.role ? "c-role-err" : undefined}>
                    <legend className="eyebrow text-ink-soft">{f.role}</legend>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {f.roles.map((r) => {
                        const checked = fields.role === r.value;
                        return (
                          <label
                            key={r.value}
                            className={cn(
                              "relative inline-flex h-11 items-center rounded-full border px-5 text-[0.95rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-heritage",
                              checked
                                ? "border-maroon bg-maroon text-beige"
                                : "border-ink/30 text-ink hover:border-ink",
                            )}
                          >
                            <input suppressHydrationWarning
                              type="radio"
                              name="role"
                              value={r.value}
                              checked={checked}
                              onChange={() => set("role", r.value as Role)}
                              className="sr-only"
                            />
                            {r.label}
                          </label>
                        );
                      })}
                    </div>
                    {errors.role && (
                      <p id="c-role-err" className="mt-3 text-sm text-heritage">
                        {errors.role}
                      </p>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor="c-message" className="eyebrow text-ink-soft">
                      {f.message}
                    </label>
                    <textarea suppressHydrationWarning
                      id="c-message"
                      name="message"
                      rows={4}
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder={f.messagePlaceholder}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "c-message-err" : undefined}
                      className={cn(fieldClass(!!errors.message), "resize-none leading-relaxed")}
                    />
                    {errors.message && (
                      <p id="c-message-err" className="mt-2 text-sm text-heritage">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    <button suppressHydrationWarning
                      type="submit"
                      disabled={status === "sending"}
                      className="group/btn inline-flex h-13 items-center gap-3 whitespace-nowrap rounded-full bg-heritage px-8 font-medium tracking-tight text-offwhite transition-colors duration-500 ease-editorial hover:bg-maroon disabled:opacity-70"
                    >
                      {status === "sending" ? f.sending : f.submit}
                      <Arrow className="transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                    </button>
                    {status === "error" && (
                      <p role="alert" className="text-sm text-heritage">
                        {f.errors.generic}
                      </p>
                    )}
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

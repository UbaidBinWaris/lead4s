"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  "General Inquiry",
  "Lead Generation Pricing",
  "Partnership Opportunities",
  "Technical Support",
  "Billing & Accounts",
  "Other",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const inputCls =
  "w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/6 focus:ring-1 focus:ring-cyan-400/20";

function InputField({
  label, id, required, children,
}: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}{required && <span className="ml-1 text-cyan-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const CONTACT_INFO = [
  {
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.16 21 3 12.84 3 2.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.18 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.2Z" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (702) 761-0192",
    href: "tel:+17027610192",
    sub: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 7 7 5 7-5" />
      </svg>
    ),
    label: "Email",
    value: "info@lead4s.com",
    href: "mailto:info@lead4s.com",
    sub: "We respond within 24 hours",
  },
  {
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
      </svg>
    ),
    label: "Strategy Call",
    value: "Book on Calendly",
    href: "https://calendly.com/talatkhan/new-meeting",
    sub: "30-min free consultation",
  },
];

export function ContactForm() {
  const [status,   setStatus]   = useState<Status>("idle");
  const [errorMsg, setError]    = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:    fd.get("name")    as string,
      email:   fd.get("email")   as string,
      phone:   fd.get("phone")   as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) { setStatus("error"); setError(data.error ?? "Something went wrong."); return; }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,1)_0.75px,transparent_0.75px)] bg-[size:28px_28px] opacity-[0.045]" />
        <div className="absolute right-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Contact</span>
        </nav>

        <div className="grid gap-16 lg:grid-cols-[1fr_520px] lg:gap-20">

          {/* LEFT */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  Get in Touch
                </span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                We'd love to{" "}
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                  hear from you
                </span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="mt-5 text-base leading-relaxed text-slate-400">
                Whether you have a question about pricing, need technical support, or want to explore a partnership
                — our team is ready to help. Fill in the form or use any of the direct channels below.
              </motion.p>
            </div>

            {/* Contact info cards */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-3">
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-2xl border border-white/6 bg-white/3 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/25 hover:bg-blue-400/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300 transition-colors group-hover:border-blue-400/40 group-hover:text-blue-200">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">{c.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-200 transition-colors group-hover:text-blue-200">{c.value}</p>
                    <p className="mt-0.5 text-xs text-slate-600">{c.sub}</p>
                  </div>
                  <svg aria-hidden="true" className="ml-auto mt-3 h-4 w-4 shrink-0 text-slate-700 transition-all group-hover:translate-x-1 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </motion.div>

            {/* Response time badge */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">We typically respond within 24 hours</span>
            </motion.div>
          </div>

          {/* RIGHT — form */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-24 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                <svg aria-hidden="true" className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Message Sent!</h2>
              <p className="max-w-sm text-sm text-slate-400">
                Thanks for reaching out. We've received your message and will respond within 24 hours.
              </p>
              <Link href="/" className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                ← Back to home
              </Link>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 rounded-2xl border border-white/8 bg-white/[0.03] p-8 backdrop-blur-sm"
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Your Name" id="name" required>
                  <input id="name" name="name" type="text" required autoComplete="name"
                    placeholder="Jane Smith" className={inputCls} />
                </InputField>
                <InputField label="Email Address" id="email" required>
                  <input id="email" name="email" type="email" required autoComplete="email"
                    placeholder="jane@company.com" className={inputCls} />
                </InputField>
              </div>

              <InputField label="Phone (optional)" id="phone">
                <input id="phone" name="phone" type="tel" autoComplete="tel"
                  placeholder="+1 (555) 000-0000" className={inputCls} />
              </InputField>

              <InputField label="Subject" id="subject" required>
                <select id="subject" name="subject" required className={`${inputCls} cursor-pointer`}>
                  <option value="" disabled selected>What's this about?</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </InputField>

              <InputField label="Message" id="message" required>
                <textarea id="message" name="message" rows={5} required
                  placeholder="Tell us how we can help…"
                  className={`${inputCls} resize-none`} />
              </InputField>

              {status === "error" && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-400">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full overflow-hidden rounded-xl border border-blue-300/30 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 py-3.5 text-sm font-bold text-white shadow-[0_6px_24px_rgba(59,130,246,0.35)] transition-all duration-300 hover:shadow-[0_10px_32px_rgba(59,130,246,0.5)] disabled:opacity-60"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {status === "loading" ? "Sending…" : "Send Message →"}
                </span>
              </button>

              <p className="text-center text-xs text-slate-600">
                Your information is kept private and never shared with third parties.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </main>
  );
}

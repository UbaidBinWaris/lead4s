"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const VERTICALS = [
  "Solar Energy",
  "Home Improvement / Roofing",
  "HVAC & Plumbing",
  "Insurance",
  "Legal Services",
  "Medicare / Health",
  "Real Estate",
  "Marketing Agency / BPO",
  "Other",
];

const VOLUMES = [
  "< 500 leads / mo",
  "500 – 2,000 leads / mo",
  "2,000 – 10,000 leads / mo",
  "10,000+ leads / mo",
  "Not sure yet",
];

type Status = "idle" | "loading" | "success" | "error";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

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

const inputCls =
  "w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:bg-white/6 focus:ring-1 focus:ring-cyan-400/20";

export function PartnershipForm() {
  const [status,  setStatus]  = useState<Status>("idle");
  const [errorMsg, setError]  = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const payload = {
      companyName:   fd.get("companyName")   as string,
      contactName:   fd.get("contactName")   as string,
      email:         fd.get("email")         as string,
      phone:         fd.get("phone")         as string,
      website:       fd.get("website")       as string,
      vertical:      fd.get("vertical")      as string,
      monthlyVolume: fd.get("monthlyVolume") as string,
      message:       fd.get("message")       as string,
    };

    try {
      const res  = await fetch("/api/partnership", {
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
        <div className="absolute left-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Partnership</span>
        </nav>

        <div className="grid gap-16 lg:grid-cols-[1fr_560px] lg:gap-20">
          {/* LEFT — hero copy */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                Partner Program
              </span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Scale your business with{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                exclusive, compliant leads
              </span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-5 text-base leading-relaxed text-slate-400">
              Lead4s partners get exclusive access to high-intent leads, live transfer calls, and appointment
              setting across solar, roofing, HVAC, insurance, legal, and more. Fill in the form and our team
              will reach out within 24 hours.
            </motion.p>

            {/* Benefits */}
            <motion.ul custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-8 space-y-3">
              {[
                "100% exclusive leads — never shared or resold",
                "TCPA-compliant with TrustedForm verification",
                "Real-time CRM & API delivery",
                "Dedicated account manager",
                "Weekly optimization cycles",
                "No long-term contracts required",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                  <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.3" />
                    <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </motion.ul>

            {/* Quick contacts */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-10 space-y-3">
              {[
                { icon: "📞", label: "Talk to sales", value: "+1 (702) 761-0192", href: "tel:+17027610192" },
                { icon: "✉️", label: "Email us", value: "info@lead4s.com", href: "mailto:info@lead4s.com" },
              ].map((c) => (
                <a key={c.label} href={c.href}
                  className="group flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3.5 transition-all hover:border-cyan-400/25 hover:bg-cyan-400/5">
                  <span className="text-base">{c.icon}</span>
                  <span className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">{c.label}</span>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-200 transition-colors">{c.value}</span>
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — form */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-20 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                <svg aria-hidden="true" className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Application Received!</h2>
              <p className="max-w-sm text-sm text-slate-400">
                Thanks for applying. Our partnership team will review your application and reach out within 24 hours.
              </p>
              <Link href="/" className="mt-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
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
              className="space-y-6 rounded-2xl border border-white/8 bg-white/[0.03] p-8 backdrop-blur-sm"
              aria-label="Partnership application form"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">Company Information</h2>
                <div className="mt-px h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
              </div>

              {/* Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Company Name" id="companyName" required>
                  <input id="companyName" name="companyName" type="text" required autoComplete="organization"
                    placeholder="Acme Solar Inc." className={inputCls} />
                </InputField>
                <InputField label="Your Name" id="contactName" required>
                  <input id="contactName" name="contactName" type="text" required autoComplete="name"
                    placeholder="John Smith" className={inputCls} />
                </InputField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Business Email" id="email" required>
                  <input id="email" name="email" type="email" required autoComplete="email"
                    placeholder="john@acmesolar.com" className={inputCls} />
                </InputField>
                <InputField label="Phone Number" id="phone">
                  <input id="phone" name="phone" type="tel" autoComplete="tel"
                    placeholder="+1 (555) 000-0000" className={inputCls} />
                </InputField>
              </div>

              <InputField label="Company Website" id="website">
                <input id="website" name="website" type="url" autoComplete="url"
                  placeholder="https://acmesolar.com" className={inputCls} />
              </InputField>

              <div className="pt-2">
                <h2 className="text-lg font-semibold text-white">Lead Requirements</h2>
                <div className="mt-px h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Primary Vertical" id="vertical" required>
                  <select id="vertical" name="vertical" required
                    className={`${inputCls} cursor-pointer`}>
                    <option value="" disabled selected>Select a vertical…</option>
                    {VERTICALS.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </InputField>
                <InputField label="Monthly Lead Volume" id="monthlyVolume">
                  <select id="monthlyVolume" name="monthlyVolume" className={`${inputCls} cursor-pointer`}>
                    <option value="">Select volume…</option>
                    {VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </InputField>
              </div>

              <InputField label="Additional Information" id="message">
                <textarea id="message" name="message" rows={4}
                  placeholder="Tell us about your target markets, current lead sources, or any specific requirements…"
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
                className="group relative w-full overflow-hidden rounded-xl border border-cyan-300/30 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 py-3.5 text-sm font-bold text-slate-950 shadow-[0_6px_24px_rgba(14,165,233,0.35)] transition-all duration-300 hover:shadow-[0_10px_32px_rgba(14,165,233,0.5)] disabled:opacity-60"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {status === "loading" ? "Submitting…" : "Apply for Partnership →"}
                </span>
              </button>

              <p className="text-center text-xs text-slate-600">
                No commitment required. We'll review your application and reach out within 24 hours.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </main>
  );
}

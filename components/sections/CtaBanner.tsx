"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ctaContent } from "@/data/cta";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Top separator */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-brand-500/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-150 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Integration logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-3"
        >
          {ctaContent.logos.map((logo) => (
            <span
              key={logo}
              className="glass rounded-full border border-white/8 px-4 py-1.5 text-xs font-medium text-slate-400"
            >
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Main CTA card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="glass-strong relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center sm:px-16"
        >
          {/* Corner gradients */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-brand-600/20 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-violet-600/15 blur-[60px]" />

          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            {ctaContent.kicker}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {ctaContent.heading}{" "}
            <span className="gradient-text">{ctaContent.highlighted}</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-10 max-w-xl text-lg text-slate-400"
          >
            {ctaContent.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="mx-auto flex max-w-3xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            {ctaContent.actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className={
                  action.variant === "primary"
                    ? "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-brand-300/25 bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_48px_rgba(37,99,235,0.55)] sm:w-auto"
                    : "group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300/40 hover:bg-white/10 hover:text-white sm:w-auto"
                }
              >
                {action.variant === "primary" && (
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}
                {action.label}
                {action.variant === "primary" && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="relative transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mx-auto mt-5 grid w-full max-w-2xl gap-3 sm:grid-cols-2"
          >
            {ctaContent.quickContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/4.5 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-200">
                  {contact.href.startsWith("tel:") ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
                      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.16 21 3 12.84 3 2.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.18 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
                      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

                <span className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {contact.label}
                  </span>
                  <span className="text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                    {contact.value}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
          >
            {ctaContent.trustBadges.map((item) => (
              <span key={item.label}>✓ {item.label}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

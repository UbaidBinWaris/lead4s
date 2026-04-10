"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const LOGOS = [
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "LinkedIn",
  "Slack",
  "Zapier",
];

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Top separator */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/12 blur-[120px]" />
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
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="glass rounded-full border border-white/8 px-4 py-1.5 text-xs font-medium text-slate-400"
            >
              {logo}
            </span>
          ))}
          <span className="glass rounded-full border border-white/8 px-4 py-1.5 text-xs font-medium text-slate-400">
            + 40 more
          </span>
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
            Get started today
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ready to{" "}
            <span className="gradient-text">10× your pipeline?</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-10 max-w-xl text-lg text-slate-400"
          >
            Join 2,400+ companies already using Lead4s to generate qualified
            leads on autopilot. Setup takes less than 10 minutes.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/signup"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/50 transition-all hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-600/30 sm:w-auto"
            >
              Start your free trial
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 px-8 py-4 text-sm font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Talk to sales
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
          >
            {[
              "✓ 14-day free trial",
              "✓ No credit card required",
              "✓ Cancel any time",
              "✓ SOC 2 Type II certified",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

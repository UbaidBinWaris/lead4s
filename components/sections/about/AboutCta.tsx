"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaHandshake } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function AboutCta() {
  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        {/* Radial spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(37,99,235,0.1),transparent)]" />
        {/* Accent glow */}
        <div className="absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-accent-500/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-brand-700/30 bg-surface-800/50 p-12 text-center backdrop-blur-sm"
          style={{ boxShadow: "0 0 100px -30px rgba(37,99,235,0.2)" }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2"
          >
            <span className="h-px w-6 bg-brand-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Ready to grow?
            </span>
            <span className="h-px w-6 bg-brand-500" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="about-cta-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Let&apos;s Build Your Pipeline{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>

          {/* Sub copy */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400"
          >
            Join 500+ companies that trust Lead4s for their most critical
            growth initiative. Get a custom lead program built for your
            vertical, budget, and volume requirements — no lock-in.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/career"
              className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all duration-200 hover:bg-brand-500 hover:shadow-brand-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
            >
              <FaHandshake className="h-4 w-4" aria-hidden="true" />
              Apply as a Partner
              <FaArrowRight
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-700 bg-surface-800/60 px-8 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-slate-500 hover:bg-surface-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
            >
              <FaCalendarAlt className="h-4 w-4" aria-hidden="true" />
              Schedule a Strategy Call
            </Link>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-xs text-slate-600"
          >
            No contracts. No minimums. Results-based pricing.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

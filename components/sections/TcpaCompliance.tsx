"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const COMPLIANCE_POINTS = [
  "TCPA-aware consent flow on every campaign",
  "TrustedForm and source tracking support",
  "Timestamp and source URL capture for verification",
  "DNC and suppression logic in qualification workflows",
  "Real-time handoff with audit-ready event logs",
  "Weekly compliance + quality performance reviews",
] as const;

export function TcpaCompliance() {
  return (
    <section id="tcpa-compliance" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-brand-500/20 bg-brand-500/7 p-6 sm:p-8 lg:p-10"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-300"
          >
            Compliance First
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            TCPA-compliant lead delivery built
            {" "}
            <span className="gradient-text">for enterprise buyers</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-300"
          >
            Lead4s acquisition systems are structured for consent-driven operations and
            transparent lead provenance. Every campaign is configured with compliance and
            verification checkpoints before volume is scaled.
          </motion.p>

          <div className="grid gap-3 sm:grid-cols-2">
            {COMPLIANCE_POINTS.map((point) => (
              <motion.div
                key={point}
                variants={fadeInUp}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-4"
              >
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-400" aria-hidden="true" />
                <p className="text-sm text-slate-200">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

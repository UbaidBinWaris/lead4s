"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const INDUSTRIES = [
  {
    emoji: "🏠",
    title: "Real Estate",
    description: "Buyer & seller lead pipelines on autopilot",
    count: "340+ agencies",
  },
  {
    emoji: "🏥",
    title: "Healthcare",
    description: "HIPAA-aware patient acquisition funnels",
    count: "180+ practices",
  },
  {
    emoji: "💼",
    title: "Financial Services",
    description: "Compliant B2C & B2B financial lead gen",
    count: "220+ firms",
  },
  {
    emoji: "🚀",
    title: "SaaS & Tech",
    description: "Demo requests & trial sign-ups at scale",
    count: "500+ startups",
  },
  {
    emoji: "🛒",
    title: "E-Commerce",
    description: "High-LTV buyer acquisition & retargeting",
    count: "410+ stores",
  },
  {
    emoji: "⚖️",
    title: "Legal",
    description: "Practice-area specific case intake funnels",
    count: "95+ law firms",
  },
  {
    emoji: "🛡️",
    title: "Insurance",
    description: "Policy-specific quote leads for every line",
    count: "160+ brokers",
  },
  {
    emoji: "📣",
    title: "Agencies",
    description: "White-label lead gen for your clients",
    count: "130+ agencies",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden py-28">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            Industries we serve
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Built for your industry,
            <br />
            <span className="gradient-text">not just your inbox</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-xl text-base text-slate-400"
          >
            Pre-built playbooks and data sources tailored to the compliance
            requirements and buyer behaviour of your vertical.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.title} {...ind} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-slate-500"
        >
          Don&apos;t see your industry?{" "}
          <a
            href="/contact"
            className="text-brand-400 underline-offset-2 hover:underline"
          >
            Let&apos;s talk
          </a>{" "}
          — we build custom verticals.
        </motion.p>
      </div>
    </section>
  );
}

function IndustryCard({
  emoji,
  title,
  description,
  count,
}: (typeof INDUSTRIES)[number]) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative cursor-default overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-brand-500/25 hover:bg-white/[0.05]"
    >
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition-colors group-hover:border-brand-500/20"
          aria-hidden="true"
        >
          {emoji}
        </span>
        <span className="text-[11px] font-medium text-slate-500 transition-colors group-hover:text-brand-400">
          {count}
        </span>
      </div>

      <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs leading-relaxed text-slate-500">{description}</p>

      {/* Hover corner glow */}
      <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-brand-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

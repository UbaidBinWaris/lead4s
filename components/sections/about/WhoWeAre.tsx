"use client";

import { motion } from "framer-motion";
import { FaBolt, FaNetworkWired, FaRocket } from "react-icons/fa";
import { fadeInUp, slideInLeft, staggerContainer } from "@/lib/animations";

const PILLARS = [
  {
    icon: FaRocket,
    title: "Founded on Performance",
    body: "Every campaign, every channel, every lead is measured against one KPI: revenue generated for our partners.",
  },
  {
    icon: FaNetworkWired,
    title: "Built for Scale",
    body: "Our proprietary distribution infrastructure routes millions of qualified inquiries per month without a single point of failure.",
  },
  {
    icon: FaBolt,
    title: "Speed as Competitive Edge",
    body: "Lead-to-contact times under 60 seconds. Our real-time delivery stack ensures you're the first call a prospect ever receives.",
  },
] as const;

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 h-150 w-100 -translate-y-1/2 rounded-full bg-brand-700/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Left — Story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
            >
              Our story
            </motion.p>
            <motion.h2
              id="who-heading"
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              A Network Built to{" "}
              <span className="text-brand-400">Outperform</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-base leading-relaxed text-slate-400"
            >
              Lead4s was founded with a single obsession: help businesses
              acquire customers at a cost that makes growth inevitable. We
              saw an industry full of brokers selling recycled data and built
              the opposite — an exclusive, first-party lead network powered
              by owned media, proprietary funnels, and real-time verification
              technology.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base leading-relaxed text-slate-400"
            >
              Today, Lead4s operates across 50+ states, serving insurance
              carriers, solar installers, legal firms, and financial advisors
              who demand quality over quantity. Our infrastructure processes
              millions of consumer inquiries monthly — filtering, scoring, and
              delivering only the highest-intent prospects to your sales team.
            </motion.p>

            {/* Stat row */}
            <motion.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8"
            >
              {[
                { value: "50+", label: "States" },
                { value: "10M+", label: "Leads delivered" },
                { value: "98%", label: "Partner retention" },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeInUp}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Pillars */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={slideInLeft}
                  className="group flex gap-5 rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand-700/60 hover:bg-surface-800/70"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/15 text-brand-400 transition-colors duration-300 group-hover:bg-brand-600/25">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{pillar.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const INDUSTRIES = [
  { emoji: "☀️", title: "Solar Energy", description: "Homeowner leads pre-screened for ownership, bill size, and roof suitability.", count: "280+ installers" },
  { emoji: "🛡️", title: "Insurance", description: "Auto, home, life, and health — policy-specific quote leads with verified intent.", count: "160+ carriers" },
  { emoji: "⚖️", title: "Legal", description: "Mass tort, personal injury, and practice-area intake funnels with case filters.", count: "95+ law firms" },
  { emoji: "🏠", title: "Real Estate", description: "Buyer & seller leads with verified ownership data and timeline filters.", count: "340+ agencies" },
  { emoji: "💰", title: "Mortgage", description: "Refinance and purchase leads with credit score and LTV pre-qualification.", count: "120+ lenders" },
  { emoji: "💼", title: "Financial Services", description: "Retirement, annuity, and investment leads for RIAs and broker-dealers.", count: "220+ firms" },
  { emoji: "🏥", title: "Healthcare", description: "Medicare, ACA, and dental leads with HIPAA-compliant consent flows.", count: "180+ practices" },
  { emoji: "🚗", title: "Automotive", description: "In-market car buyer leads with make, model, and financing intent signals.", count: "90+ dealers" },
] as const;

export function AboutIndustries() {
  return (
    <section
      id="industries-about"
      aria-labelledby="industries-about-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-brand-900/20 blur-[100px]" />
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
            id="industries-about-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Deep Vertical Expertise
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            We don&apos;t run generic funnels. Every industry gets a purpose-built
            lead program with vertical-specific qualification criteria.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry) => (
            <motion.article
              key={industry.title}
              variants={fadeInUp}
              className="group rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/60"
            >
              {/* Emoji icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-800 text-2xl transition-transform duration-200 group-hover:scale-110">
                <span role="img" aria-label={industry.title}>
                  {industry.emoji}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white">{industry.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{industry.description}</p>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden="true" />
                <span className="text-[11px] font-medium text-brand-400">{industry.count}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

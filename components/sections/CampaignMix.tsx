"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const CAMPAIGN_MIX = [
  {
    label: "Home Improvement",
    share: 40,
    detail: "Roofing, HVAC, windows, and remodeling pipelines.",
    colorClass: "bg-blue-500",
  },
  {
    label: "Insurance",
    share: 25,
    detail: "Auto, final expense, and policy-intent programs.",
    colorClass: "bg-emerald-500",
  },
  {
    label: "Legal",
    share: 20,
    detail: "MVA and personal injury intake campaigns.",
    colorClass: "bg-amber-500",
  },
  {
    label: "Solar",
    share: 15,
    detail: "Exclusive solar leads and live transfer calls.",
    colorClass: "bg-violet-500",
  },
] as const;

export function CampaignMix() {
  return (
    <section id="campaign-mix" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            Performance Snapshot
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Campaign Mix Driving
            <br />
            <span className="gradient-text">consistent buyer volume</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-base text-slate-400"
          >
            Our current delivery mix is concentrated in the verticals producing the most
            stable conversion outcomes for growth-focused buyers.
          </motion.p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {CAMPAIGN_MIX.map((item) => (
            <motion.article
              key={item.label}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{item.label}</h3>
                <span className="text-sm font-semibold text-slate-300">{item.share}%</span>
              </div>

              <div className="mb-3 h-2 rounded-full bg-slate-800">
                <div className={`h-2 rounded-full ${item.colorClass}`} style={{ width: `${item.share}%` }} />
              </div>

              <p className="text-sm text-slate-400">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

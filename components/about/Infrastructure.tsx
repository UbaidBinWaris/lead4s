"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaChartBar,
  FaFilter,
  FaHeadset,
  FaDatabase,
  FaShieldAlt,
  FaBolt,
  FaSync,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { InfrastructureSection } from "@/data/about";

interface InfrastructureProps {
  readonly data: InfrastructureSection;
}

const ICON_MAP = {
  sync: FaSync,
  code: FaCode,
  filter: FaFilter,
  headset: FaHeadset,
  database: FaDatabase,
  shield: FaShieldAlt,
  lightning: FaBolt,
  "chart-bar": FaChartBar,
} as const;

export function Infrastructure({ data }: InfrastructureProps) {
  return (
    <section
      id="infrastructure"
      aria-labelledby="infra-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute right-0 top-1/2 h-150 w-125 -translate-y-1/2 rounded-full bg-violet-900/10 blur-[120px]" />
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
            {data.eyebrow}
          </motion.p>
          <motion.h2
            id="infra-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            {data.subheading}
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
          {data.capabilities.map((cap) => {
            const Icon = ICON_MAP[cap.icon as keyof typeof ICON_MAP] || FaSync;
            return (
              <motion.div
                key={cap.title}
                variants={fadeInUp}
                className="group rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/60"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${cap.color.bg} ${cap.color.text} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom badge row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          {data.badges.map((badge) => (
            <motion.span
              key={badge}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-surface-800/60 px-4 py-1.5 text-xs font-medium text-slate-300"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaFileContract,
  FaLock,
  FaUserCheck,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { ComplianceSection } from "@/data/about";

interface ComplianceProps {
  readonly data: ComplianceSection;
}

const ICON_MAP = {
  shield: FaShieldAlt,
  "file-contract": FaFileContract,
  lock: FaLock,
  "user-check": FaUserCheck,
} as const;

export function Compliance({ data }: ComplianceProps) {
  return (
    <section
      id="compliance"
      aria-labelledby="compliance-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/8 blur-[130px]" />
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
            id="compliance-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-emerald-400 to-brand-400 bg-clip-text text-transparent">
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

        {/* Badges grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {data.badges.map((badge) => {
            const Icon = ICON_MAP[badge.icon as keyof typeof ICON_MAP];
            return (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                className={`flex gap-5 rounded-xl border p-7 backdrop-blur-sm transition-all duration-300 ${badge.color.border} ${badge.color.bg} hover:border-opacity-100`}
              >
                {Icon && (
                  <div
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${badge.color.bg} ${badge.color.icon}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {badge.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statement */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto mt-16 max-w-2xl rounded-xl border border-emerald-700/30 bg-emerald-950/20 p-8 text-center backdrop-blur-sm"
        >
          <p className="text-sm leading-relaxed text-slate-300">
            {data.statement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

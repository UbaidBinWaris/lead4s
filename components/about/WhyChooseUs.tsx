"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaLock,
  FaChartLine,
  FaClock,
  FaGlobe,
  FaUsers,
  FaHandshake,
  FaTrophy,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { WhyChooseUsSection } from "@/data/about";

interface WhyChooseUsProps {
  readonly data: WhyChooseUsSection;
}

const ICON_MAP = {
  "check-circle": FaCheckCircle,
  lock: FaLock,
  "chart-line": FaChartLine,
  clock: FaClock,
  globe: FaGlobe,
  users: FaUsers,
  handshake: FaHandshake,
  trophy: FaTrophy,
} as const;

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute right-0 top-1/4 h-150 w-100 rounded-full bg-accent-700/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-24">
          {/* Left — Sticky heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:sticky lg:top-20 lg:h-fit"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
            >
              {data.eyebrow}
            </motion.p>
            <motion.h2
              id="why-heading"
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {data.heading}{" "}
              <span className="text-accent-400">{data.headingHighlight}</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base leading-relaxed text-slate-400"
            >
              {data.description}
            </motion.p>
          </motion.div>

          {/* Right — Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:col-span-2"
          >
            {data.reasons.map((reason) => {
              const Icon = ICON_MAP[reason.icon as keyof typeof ICON_MAP];
              return (
                <motion.div
                  key={reason.title}
                  variants={fadeInUp}
                  className="flex gap-4 rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/60"
                >
                  {Icon && (
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-accent-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                      {reason.body}
                    </p>
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

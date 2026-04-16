"use client";

import { motion } from "framer-motion";
import {
  FaBullseye,
  FaEye,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { MissionVisionSection } from "@/data/about";

interface MissionVisionProps {
  readonly data: MissionVisionSection;
}

const ICON_MAP = {
  bullseye: FaBullseye,
  eye: FaEye,
} as const;

export function MissionVision({ data }: MissionVisionProps) {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-125 w-100 rounded-full bg-brand-700/8 blur-[120px]" />
        <div className="absolute right-0 bottom-1/3 h-100 w-100 rounded-full bg-accent-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {data.cards.map((card) => {
            const Icon =
              ICON_MAP[card.icon as keyof typeof ICON_MAP] || FaBullseye;
            return (
              <motion.article
                key={card.label}
                variants={fadeInUp}
                className="group rounded-2xl border border-slate-800 bg-surface-800/40 p-10 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/70"
              >
                {/* Icon */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${card.iconBg} ${card.accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                {/* Label */}
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {card.label}
                </p>

                {/* Heading */}
                <h3 className={`mt-3 text-2xl font-bold ${card.accent}`}>
                  {card.heading}
                </h3>

                {/* Body */}
                <p className="mt-4 leading-relaxed text-slate-400">
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {data.values.map((val) => (
            <motion.div
              key={val.value}
              variants={fadeInUp}
              className="flex flex-col items-center rounded-lg border border-slate-800 bg-surface-800/30 p-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-slate-700 hover:bg-surface-800/50"
            >
              <p className="text-sm font-semibold text-white">{val.value}</p>
              <p className="mt-1 text-xs text-slate-500">{val.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

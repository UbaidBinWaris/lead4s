"use client";

import { motion } from "framer-motion";
import {
  FaBolt,
  FaNetworkWired,
  FaRocket,
} from "react-icons/fa";
import { fadeInUp, slideInLeft, staggerContainer } from "@/lib/animations";
import type { WhoWeAreSection } from "@/data/about";

interface WhoWeAreProps {
  readonly data: WhoWeAreSection;
}

const ICON_MAP = {
  rocket: FaRocket,
  network: FaNetworkWired,
  bolt: FaBolt,
} as const;

export function WhoWeAre({ data }: WhoWeAreProps) {
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
              {data.eyebrow}
            </motion.p>
            <motion.h2
              id="who-heading"
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {data.heading}{" "}
              <span className="text-brand-400">{data.headingHighlight}</span>
            </motion.h2>

            {data.storyParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                variants={fadeInUp}
                className="mt-5 text-base leading-relaxed text-slate-400"
              >
                {para}
              </motion.p>
            ))}

            {/* Stat row */}
            <motion.div
              variants={staggerContainer}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8"
            >
              {data.stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
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
            {data.pillars.map((pillar) => {
              const Icon =
                ICON_MAP[pillar.icon as keyof typeof ICON_MAP] || FaRocket;
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
                    <h3 className="text-sm font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {pillar.body}
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

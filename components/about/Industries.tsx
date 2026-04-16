"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { IndustriesSection } from "@/data/about";

interface IndustriesProps {
  readonly data: IndustriesSection;
}

export function Industries({ data }: IndustriesProps) {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-150 w-125 rounded-full bg-brand-700/8 blur-[120px]" />
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
            id="industries-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}
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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.industries.map((industry) => (
            <motion.article
              key={industry.title}
              variants={fadeInUp}
              className="group flex flex-col rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-700/50 hover:bg-surface-800/70"
            >
              <p className="text-4xl">{industry.emoji}</p>
              <h3 className="mt-4 text-base font-semibold text-white">
                {industry.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">
                {industry.description}
              </p>
              <p className="mt-4 text-xs font-semibold text-brand-400">
                {industry.count}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

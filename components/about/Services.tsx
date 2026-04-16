"use client";

import { motion } from "framer-motion";
import {
  FaStar,
  FaPhone,
  FaCalendarCheck,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { WhatWeDoSection } from "@/data/about";

interface ServicesProps {
  readonly data: WhatWeDoSection;
}

const ICON_MAP = {
  star: FaStar,
  phone: FaPhone,
  "calendar-check": FaCalendarCheck,
} as const;

export function Services({ data }: ServicesProps) {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-900/30 blur-[100px]" />
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
            id="what-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
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

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {data.services.map((svc) => {
            const Icon = ICON_MAP[svc.icon as keyof typeof ICON_MAP] || FaStar;
            return (
              <motion.article
                key={svc.title}
                variants={fadeInUp}
                className={`group relative flex flex-col rounded-2xl border border-slate-800 bg-surface-800/40 p-8 backdrop-blur-sm transition-all duration-300 ${svc.colorScheme.borderClass} hover:bg-surface-800/60`}
                style={{
                  boxShadow: svc.featured
                    ? `0 0 60px -20px rgba(${svc.colorScheme.glowColor},0.2)`
                    : undefined,
                }}
              >
                {svc.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent-400 border border-accent-500/20">
                    Most Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${svc.colorScheme.bgClass} transition-colors duration-300 ${svc.colorScheme.accentClass}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-white">{svc.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {svc.description}
                </p>

                {/* Feature list */}
                <ul className="mt-6 space-y-2" aria-label={`${svc.title} features`}>
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${svc.colorScheme.badgeClass}`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-xs text-slate-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const CARDS = [
  {
    icon: FaBullseye,
    label: "Our Mission",
    heading: "Make Customer Acquisition Predictable",
    body: "We exist to eliminate the guesswork from growth. Every business deserves access to a pipeline of high-intent buyers — not cold lists, not vanity metrics. Lead4s delivers verified consumer demand on a performance basis, so our partners only pay for results that move their business forward.",
    accent: "text-brand-400",
    iconBg: "bg-brand-600/15",
    border: "border-brand-700/30",
    glow: "37,99,235",
  },
  {
    icon: FaEye,
    label: "Our Vision",
    heading: "The Standard for Performance Lead Generation",
    body: "We're building the most trusted lead network in America — a platform where compliance is automatic, quality is guaranteed, and scale is unlimited. In five years, Lead4s will be the infrastructure layer that powers customer acquisition for every major industry vertical, from coast to coast.",
    accent: "text-accent-400",
    iconBg: "bg-accent-500/15",
    border: "border-accent-500/30",
    glow: "249,115,22",
  },
] as const;

export function MissionVision() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-brand-900/25 blur-[100px]" />
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
            What drives us
          </motion.p>
          <motion.h2
            id="mission-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Mission &amp; Vision
          </motion.h2>
        </motion.div>

        {/* Two-column cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={fadeInUp}
                className={`relative rounded-2xl border ${card.border} bg-surface-800/40 p-10 backdrop-blur-sm`}
                style={{
                  boxShadow: `0 0 80px -30px rgba(${card.glow},0.15)`,
                }}
              >
                {/* Decorative corner gradient */}
                <div
                  className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-tr-2xl"
                  style={{
                    background: `radial-gradient(circle at top right, rgba(${card.glow},0.1), transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon + label */}
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.accent}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${card.accent}`}>
                      {card.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {card.heading}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{card.body}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { value: "Performance", sub: "Pay only for results" },
            { value: "Transparency", sub: "Full reporting access" },
            { value: "Compliance", sub: "Built in, not bolted on" },
            { value: "Partnership", sub: "Your success = ours" },
          ].map((v) => (
            <motion.div
              key={v.value}
              variants={fadeInUp}
              className="rounded-xl border border-slate-800 bg-surface-800/30 p-5 text-center"
            >
              <p className="text-sm font-semibold text-white">{v.value}</p>
              <p className="mt-1 text-xs text-slate-500">{v.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

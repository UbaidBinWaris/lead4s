"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaLock,
  FaChartLine,
  FaUsers,
  FaClock,
  FaGlobe,
  FaHandshake,
  FaTrophy,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const REASONS = [
  {
    icon: FaCheckCircle,
    title: "Exclusive, First-Party Leads",
    body: "Every lead originates from our owned channels. Zero resales, zero co-registration. You own the contact.",
  },
  {
    icon: FaLock,
    title: "Compliance-First by Design",
    body: "TCPA consent, TrustedForm certificates, and CCPA controls are baked into every funnel — not retrofitted.",
  },
  {
    icon: FaChartLine,
    title: "Transparent Reporting",
    body: "Real-time dashboards with CPL, contact rate, and revenue attribution. No black boxes, ever.",
  },
  {
    icon: FaClock,
    title: "Sub-60s Lead Delivery",
    body: "Speed-to-contact is the #1 predictor of conversion. Our infrastructure delivers before the competition even wakes up.",
  },
  {
    icon: FaGlobe,
    title: "50-State Coverage",
    body: "Active funnels in all 50 states across solar, insurance, legal, mortgage, and more.",
  },
  {
    icon: FaUsers,
    title: "Dedicated Account Management",
    body: "Every partner gets a named account manager who monitors campaign performance daily and optimizes proactively.",
  },
  {
    icon: FaHandshake,
    title: "Flexible Commercial Terms",
    body: "Pay-per-lead, pay-per-call, or revenue-share models. Scale up or down with zero lock-in.",
  },
  {
    icon: FaTrophy,
    title: "Proven Track Record",
    body: "98% partner retention rate. Our results speak louder than any pitch deck.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute top-1/3 right-0 h-125 w-100 rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          {/* Left — sticky header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:sticky lg:top-28"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
            >
              Why Lead4s
            </motion.p>
            <motion.h2
              id="why-heading"
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Built Different,{" "}
              <span className="bg-linear-to-r from-brand-400 to-emerald-400 bg-clip-text text-transparent">
                Proven Different
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-base leading-relaxed text-slate-400"
            >
              There are hundreds of lead vendors. There is only one Lead4s.
              Here&apos;s what separates us from every alternative in the market.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-8">
              <a
                href="/#contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all duration-200 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-925"
              >
                Get Started Today
              </a>
            </motion.div>
          </motion.div>

          {/* Right — reasons grid */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
            aria-label="Reasons to choose Lead4s"
          >
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.li
                  key={reason.title}
                  variants={fadeInUp}
                  className="flex gap-4 rounded-xl border border-slate-800 bg-surface-800/40 p-5 backdrop-blur-sm transition-colors duration-200 hover:border-slate-700"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-400">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{reason.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{reason.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

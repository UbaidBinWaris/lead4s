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

const CAPABILITIES = [
  {
    icon: FaSync,
    title: "CRM Integrations",
    description: "Native sync with Salesforce, HubSpot, Pipedrive, and 40+ CRMs via real-time webhooks.",
    color: "text-brand-400",
    bg: "bg-brand-600/12",
  },
  {
    icon: FaCode,
    title: "API Delivery",
    description: "RESTful ping-post API with sub-100ms response times. Full sandbox environment for QA.",
    color: "text-violet-400",
    bg: "bg-violet-600/12",
  },
  {
    icon: FaFilter,
    title: "Funnel Optimization",
    description: "Owned landing pages, A/B testing infrastructure, and multivariate form flows that maximize opt-in rate.",
    color: "text-accent-400",
    bg: "bg-accent-500/12",
  },
  {
    icon: FaHeadset,
    title: "Call Systems",
    description: "Hosted IVR, call recording, real-time agent dashboards, and automated follow-up sequences.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/12",
  },
  {
    icon: FaDatabase,
    title: "Data Verification",
    description: "TCPA consent capture via TrustedForm, email hygiene, phone validation, and identity verification.",
    color: "text-sky-400",
    bg: "bg-sky-500/12",
  },
  {
    icon: FaShieldAlt,
    title: "Compliance Layer",
    description: "Built-in TCPA / CCPA controls, suppression list management, and audit-ready consent records.",
    color: "text-amber-400",
    bg: "bg-amber-500/12",
  },
  {
    icon: FaBolt,
    title: "Real-Time Routing",
    description: "Intelligent lead distribution rules — by geography, product type, capacity caps, and bid price.",
    color: "text-pink-400",
    bg: "bg-pink-500/12",
  },
  {
    icon: FaChartBar,
    title: "Analytics & BI",
    description: "Live dashboards tracking CPL, contact rate, conversion, and revenue attribution per campaign.",
    color: "text-teal-400",
    bg: "bg-teal-500/12",
  },
] as const;

export function Infrastructure() {
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
            Technical capabilities
          </motion.p>
          <motion.h2
            id="infra-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Enterprise-Grade{" "}
            <span className="bg-linear-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            Every component of our stack is designed for reliability, speed,
            and compliance — so your pipeline never misses a beat.
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
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                variants={fadeInUp}
                className="group rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/60"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${cap.bg} ${cap.color} transition-transform duration-200 group-hover:scale-110`}
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
          {[
            "99.9% Uptime SLA",
            "Sub-100ms API Latency",
            "SOC 2 Type II Ready",
            "GDPR & CCPA Compliant",
            "256-bit Encryption",
          ].map((badge) => (
            <motion.span
              key={badge}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-surface-800/60 px-4 py-1.5 text-xs font-medium text-slate-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

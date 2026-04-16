"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaFileContract, FaLock, FaUserCheck } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const BADGES = [
  {
    icon: FaShieldAlt,
    title: "TCPA Compliant",
    description:
      "Every lead includes a documented, prior express written consent under TCPA guidelines. TrustedForm certificates stored for 5 years.",
    color: "text-brand-400",
    bg: "bg-brand-600/12",
    border: "border-brand-700/30",
  },
  {
    icon: FaFileContract,
    title: "TrustedForm Certified",
    description:
      "We use ActiveProspect's TrustedForm on every opt-in page to generate an independent, third-party certificate of consent.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/12",
    border: "border-emerald-500/20",
  },
  {
    icon: FaLock,
    title: "Data Security",
    description:
      "AES-256 encryption at rest and in transit. Secure cloud infrastructure with role-based access controls and audit logs.",
    color: "text-amber-400",
    bg: "bg-amber-500/12",
    border: "border-amber-500/20",
  },
  {
    icon: FaUserCheck,
    title: "CCPA / GDPR Ready",
    description:
      "Consumer opt-out and data deletion workflows built in. We honor data subject rights within 30 days, guaranteed.",
    color: "text-violet-400",
    bg: "bg-violet-600/12",
    border: "border-violet-500/20",
  },
] as const;

export function AboutCompliance() {
  return (
    <section
      id="compliance"
      aria-labelledby="compliance-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/8 blur-[120px]" />
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
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400"
          >
            Trust &amp; compliance
          </motion.p>
          <motion.h2
            id="compliance-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Compliance Isn&apos;t a Feature.{" "}
            <span className="text-emerald-400">It&apos;s the Foundation.</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            The lead generation industry has a compliance problem. We built
            Lead4s to be the solution — not the risk.
          </motion.p>
        </motion.div>

        {/* Badge cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                className={`flex flex-col items-center rounded-2xl border ${badge.border} bg-surface-800/40 p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-surface-800/60`}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${badge.bg} ${badge.color}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-white">{badge.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{badge.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom statement */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-14 max-w-2xl text-center text-sm text-slate-500"
        >
          All Lead4s campaigns include a compliance review before launch. Our
          legal team monitors regulatory changes across all 50 states and
          updates our frameworks proactively — not reactively.
        </motion.p>
      </div>
    </section>
  );
}

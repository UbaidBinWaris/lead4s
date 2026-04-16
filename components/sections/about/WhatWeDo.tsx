"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaPhone,
  FaCalendarCheck,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type ServiceCard = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  description: string;
  features: readonly string[];
  glowColor: string;
  accentClass: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  featured?: boolean;
};

const SERVICES: ServiceCard[] = [
  {
    icon: FaStar,
    title: "Exclusive Leads",
    description:
      "Every lead is generated exclusively for you — never recycled, never shared. First-party data collected from owned funnels and verified in real time.",
    features: ["First-party data only", "Real-time ping/post delivery", "100% exclusive ownership"],
    glowColor: "37,99,235",
    accentClass: "text-brand-400",
    bgClass: "bg-brand-600/15 group-hover:bg-brand-600/25",
    borderClass: "group-hover:border-brand-700/60",
    badgeClass: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  },
  {
    icon: FaPhone,
    title: "Live Transfers",
    description:
      "A warm, qualified consumer gets connected directly to your sales team in real time. No voicemails, no cold lists — just live conversations with buyers.",
    features: ["Sub-60s connect times", "Pre-screened & consented", "Custom IVR scripting"],
    glowColor: "249,115,22",
    accentClass: "text-accent-400",
    bgClass: "bg-accent-500/15 group-hover:bg-accent-500/25",
    borderClass: "group-hover:border-accent-500/40",
    badgeClass: "bg-accent-500/10 text-accent-400 border-accent-500/20",
    featured: true,
  },
  {
    icon: FaCalendarCheck,
    title: "Appointment Setting",
    description:
      "Our agents pre-qualify, nurture, and schedule meetings directly onto your calendar — so your closers only show up for deals that are ready to close.",
    features: ["Dedicated appointment agents", "CRM-integrated scheduling", "Confirmation & reminders"],
    glowColor: "16,185,129",
    accentClass: "text-emerald-400",
    bgClass: "bg-emerald-500/15 group-hover:bg-emerald-500/25",
    borderClass: "group-hover:border-emerald-500/40",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

export function WhatWeDo() {
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
            What we do
          </motion.p>
          <motion.h2
            id="what-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Three Ways We Drive{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              Your Revenue
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            Whether you need data, conversations, or booked meetings — we
            operate all three channels with the same relentless focus on
            conversion rate.
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
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.article
                key={svc.title}
                variants={fadeInUp}
                className={`group relative flex flex-col rounded-2xl border border-slate-800 bg-surface-800/40 p-8 backdrop-blur-sm transition-all duration-300 ${svc.borderClass} hover:bg-surface-800/60`}
                style={{
                  boxShadow: svc.featured
                    ? `0 0 60px -20px rgba(${svc.glowColor},0.2)`
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
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${svc.bgClass} transition-colors duration-300 ${svc.accentClass}`}
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
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${svc.badgeClass}`}
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

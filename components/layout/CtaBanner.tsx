"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ctaContent } from "@/data/cta";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Live stat ticker items ────────────────────────────────────────────────────
const STATS = [
  { value: "98%",    label: "Delivery Rate"       },
  { value: "4.8×",  label: "Avg ROI"              },
  { value: "50ms",  label: "API Response"          },
  { value: "24 h",  label: "Go-Live Time"          },
  { value: "100k+", label: "Leads / mo"            },
  { value: "TCPA",  label: "Compliant"             },
];

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 10%"],
  });

  const bgY        = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowScale  = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);
  const glowOp     = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.65, 0.35]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 sm:py-16 max-h-screen flex flex-col justify-center">

      {/* ── Background layer ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#020817]" />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,1)_0.75px,transparent_0.75px)] bg-[size:28px_28px] opacity-[0.055]" />

        {/* Central glow bloom */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOp, y: bgY }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.22)_0%,rgba(99,102,241,0.14)_45%,transparent_70%)] blur-[80px]"
        />

        {/* Corner accent glows */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-[120px]"
        />

        {/* Decorative ring */}
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/8" />
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/5" />

        {/* Top separator */}
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        {/* Bottom separator */}
        <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      </div>

      {/* ── Stats ticker bar ─────────────────────────────────────────────── */}
      <div className="relative mb-6 overflow-hidden border-y border-white/6 bg-white/[0.025] py-2 backdrop-blur-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-0"
        >
          {[...STATS, ...STATS].map((s, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplicate
            <span key={i} className="flex items-center gap-4 px-6">
              <span className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white">{s.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">{s.label}</span>
              </span>
              <span className="h-3 w-px bg-slate-700" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Main card ────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0a0f1e]/95 to-slate-900/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_60px_rgba(0,0,0,0.6),0_0_60px_rgba(56,189,248,0.08)] backdrop-blur-2xl"
        >
          {/* Animated border beam — top */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 via-[40%] to-transparent bg-[size:200%_100%]"
          />
          {/* Bottom beam */}
          <motion.div
            animate={{ backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 via-[60%] to-transparent bg-[size:200%_100%]"
          />

          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(56,189,248,0.07),transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_75%_50%,rgba(99,102,241,0.07),transparent)]" />

          {/* ── Grid layout ── */}
          <div className="grid lg:grid-cols-[1fr_380px] lg:divide-x lg:divide-white/5">

            {/* LEFT — headline & actions */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">

              {/* Kicker with animated dot */}
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3.5 py-1"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {ctaContent.kicker}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-balance text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[2.5rem]"
              >
                {ctaContent.heading}{" "}
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="bg-gradient-to-r from-cyan-300 via-sky-300 via-[50%] to-blue-400 bg-clip-text bg-[size:200%_100%] text-transparent"
                >
                  {ctaContent.highlighted}
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
              >
                {ctaContent.description}
              </motion.p>

              {/* Vertical divider accent */}
              <motion.div
                custom={2.5}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="my-5 flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
              </motion.div>

              {/* Action buttons */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
              >
                {ctaContent.actions.map((action) => (
                  <motion.div
                    key={action.label}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    <Link
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      className={
                        action.variant === "primary"
                          ? "group relative inline-flex min-h-[44px] items-center gap-2 overflow-hidden rounded-xl border border-cyan-300/30 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 px-5 text-sm font-bold text-slate-950 shadow-[0_6px_24px_rgba(14,165,233,0.35)] transition-all duration-300 hover:shadow-[0_10px_32px_rgba(14,165,233,0.5)]"
                          : "group relative inline-flex min-h-[44px] items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10 hover:text-white"
                      }
                    >
                      {action.variant === "primary" && (
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      )}
                      <span className="relative">{action.label}</span>
                      <motion.span
                        className="relative"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust badges */}
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {ctaContent.trustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-[11px] font-medium text-slate-400 backdrop-blur-sm"
                  >
                    <svg aria-hidden="true" className="h-3 w-3 shrink-0 text-cyan-400" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {badge.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — industry pills + quick contacts */}
            <div className="flex flex-col justify-between gap-5 border-t border-white/5 px-6 py-8 sm:px-10 lg:border-t-0 lg:px-10 lg:py-12">

              {/* Industry verticals */}
              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Active Verticals
                </p>
                <div className="flex flex-wrap gap-2">
                  {ctaContent.logos.map((logo, i) => (
                    <motion.span
                      key={logo}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="cursor-default rounded-full border border-sky-400/15 bg-sky-400/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-200"
                    >
                      {logo}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              {/* Quick contact cards */}
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Get in touch
                </p>
                {ctaContent.quickContacts.map((contact) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ x: 4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/6 bg-white/3 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/5"
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 text-cyan-300 transition-colors group-hover:border-cyan-400/40 group-hover:text-cyan-200">
                      {contact.href.startsWith("tel:") ? (
                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.16 21 3 12.84 3 2.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.18 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        {contact.label}
                      </span>
                      <span className="mt-0.5 truncate text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-200">
                        {contact.value}
                      </span>
                    </div>

                    {/* Arrow */}
                    <svg
                      aria-hidden="true"
                      className="ml-auto h-4 w-4 shrink-0 text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

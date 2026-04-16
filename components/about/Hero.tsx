"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaHandshake,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { HeroSection } from "@/data/about";

interface HeroProps {
  readonly data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-24 pb-20"
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/4 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/12 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-125 w-125 rounded-full bg-accent-500/8 blur-[120px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Top border gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-500/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2">
            <span className="h-px w-8 bg-brand-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              {data.eyebrow}
            </span>
            <span className="h-px w-8 bg-brand-500" />
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="about-hero-heading"
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>
            {" "}at Scale
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            {data.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {data.ctas.map((cta) => {
              const Icon = cta.icon === "handshake" ? FaHandshake : FaCalendarAlt;
              const isPrimary = cta.variant === "primary";

              return (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    isPrimary
                      ? "group inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:bg-brand-500 hover:shadow-brand-500/35 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus-visible:outline-none"
                      : "group inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-700 bg-surface-800/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-slate-500 hover:bg-surface-800 hover:text-white focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 focus-visible:outline-none"
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {cta.label}
                  {isPrimary && (
                    <FaArrowRight
                      className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeInUp}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {data.trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

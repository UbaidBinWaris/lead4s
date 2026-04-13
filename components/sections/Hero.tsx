"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaHandshake } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { heroContent } from "@/data/hero";

/* ── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax on the background orbs when scrolling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const ctaIconMap = {
    handshake: FaHandshake,
    calendar: FaCalendarAlt,
    arrow: FaArrowRight,
  } as const;
  const PrimaryCtaIcon = ctaIconMap[heroContent.ctaPrimary.iconName];
  const SecondaryCtaIcon = ctaIconMap[heroContent.ctaSecondary.iconName];

  return (
    <section
      ref={sectionRef}
      id={heroContent.id}
      className="relative h-screen overflow-hidden bg-grid"
    >
      

      {/* ── Edge vignette (darkens corners so text pops) ──────── */}
      <div className="pointer-events-none absolute inset-0 z-[1] vignette" />

      {/* ── Ambient glow orbs (parallax) ──────────────────────── */}
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {/* Blue primary orb */}
        <div className="absolute left-1/2 top-[-10%] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]" />
        {/* Orange accent orb */}
        <div className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full bg-orange-500/12 blur-[110px]" />
        {/* Yellow subtle orb */}
        <div className="absolute bottom-[-10%] left-[10%] h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-[100px]" />
      </motion.div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:gap-24 lg:grid-cols-2">

          {/* ── LEFT: Copy ───────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            
            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mb-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.5rem] xl:text-[3.8rem]"
            >
              {heroContent.headlineStart}<br />
              <span className="gradient-brand-text">
                {heroContent.headlineAccent}
              </span><br />
              {heroContent.headlineEnd}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={fadeInUp}
              className="mb-10 mx-auto max-w-md text-justify text-lg leading-relaxed text-slate-400 lg:mx-0"
            >
              {heroContent.description}
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeInUp}
              className="mb-14 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              {heroContent.ctaPrimary.visible ? (
                <Link
                  id="hero-cta-primary"
                  href={heroContent.ctaPrimary.href}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/50 transition-all duration-300 hover:brightness-110 hover:shadow-blue-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PrimaryCtaIcon
                    className="text-sm text-white"
                    aria-hidden="true"
                  />
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  {heroContent.ctaPrimary.text}
                </Link>
              ) : null}

              {heroContent.ctaSecondary.visible ? (
                <Link
                  id="hero-cta-demo"
                  href={heroContent.ctaSecondary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10  text-(--secondary) bg-white/[0.03] px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-(--secondary) hover:scale-[1.02] active:scale-[0.98]"
                >
                  <SecondaryCtaIcon
                    className="text-sm text-(--secondary)"
                    aria-hidden="true"
                  />
                  {heroContent.ctaSecondary.text}
                </Link>
              ) : null}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-10 lg:justify-start"
            >
              {heroContent.stats.map((s, i) => (
                <div key={s.label} className="relative">
                  {i > 0 && (
                    <span className="absolute -left-5 top-1/2 h-6 w-px -translate-y-1/2 bg-white/10" />
                  )}
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Dashboard preview card ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block lg:pl-8"
          >
            {/* Outer orbit ring */}
            <div className="pointer-events-none absolute inset-0 -m-10 rounded-3xl border border-blue-500/10" />
            <div className="pointer-events-none absolute inset-0 -m-16 rounded-[2.5rem] border border-orange-400/5" />

            {/* Glow behind card */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-blue-600/10 blur-3xl" />

            {/* Main card */}
            <div className="glass-strong relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-950/60">
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {heroContent.cardTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {heroContent.cardDateLabel}
                  </span>
                  <div className="flex gap-1">
                    {["#f97316", "#f59e0b", "#22c55e"].map((c) => (
                      <span
                        key={c}
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c, opacity: 0.8 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Metric row */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.07] border-b border-white/[0.07]">
                {heroContent.cardMetricRow.map((m) => (
                  <div key={m.label} className="px-5 py-4">
                    <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                    <p className="text-2xl font-bold text-white leading-none">{m.value}</p>
                    <p className="text-xs font-medium text-emerald-400 mt-1">{m.delta}</p>
                  </div>
                ))}
              </div>

              {/* Lead rows */}
              <div className="divide-y divide-white/[0.04] px-2 py-2">
                {heroContent.leadRows.map((lead) => (
                  <div
                    key={lead.name}
                    className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-[11px] font-bold text-white shadow-md shadow-blue-900/40">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{lead.name}</p>
                        <p className="text-[11px] text-slate-500">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreBar score={lead.score} />
                      <StatusBadge status={lead.status} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Sparkline footer */}
              <div className="border-t border-white/[0.07] px-5 py-4">
                <div className="flex items-end gap-[3px]" style={{ height: 36 }}>
                  {heroContent.sparkline.map((h, i) => (
                    <div
                      key={`${h}-${i}`}
                      className="flex-1 rounded-sm bg-gradient-to-t from-blue-600/60 to-blue-400/40 transition-all hover:from-orange-500/70 hover:to-orange-400/50"
                      style={{ height: `${(h / 100) * 36}px` }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  {heroContent.sparklineLabel}
                </p>
              </div>
            </div>

            {/* Floating badge: AI score */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass animate-float absolute -right-6 top-8 min-w-[110px] rounded-2xl border border-blue-400/20 px-4 py-3 shadow-xl shadow-blue-950/50"
            >
              <p className="text-[10px] text-slate-400">
                {heroContent.floatingBadges.aiScoreLabel}
              </p>
              <p className="text-xl font-extrabold text-white">
                {heroContent.floatingBadges.aiScoreValue}
              </p>
              <p className="text-[10px] font-medium text-emerald-400">
                {heroContent.floatingBadges.aiScoreMeta}
              </p>
            </motion.div>

            {/* Floating badge: time saved */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass animate-float-delayed absolute -bottom-6 left-2 min-w-[130px] rounded-2xl border border-white/10 px-4 py-3 shadow-xl"
            >
              <p className="text-[10px] text-slate-400">
                {heroContent.floatingBadges.savedTimeLabel}
              </p>
              <p className="text-xl font-extrabold text-white">
                {heroContent.floatingBadges.savedTimeValue}
              </p>
              <p className="text-[10px] font-medium text-orange-400">
                {heroContent.floatingBadges.savedTimeMeta}
              </p>
            </motion.div>

            {/* Floating badge: revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute left-0 top-1/3 rounded-2xl border border-amber-400/15 px-4 py-3 shadow-xl"
            >
              <p className="text-[10px] text-slate-400">
                {heroContent.floatingBadges.pipelineLabel}
              </p>
              <p className="text-xl font-extrabold text-amber-300">
                {heroContent.floatingBadges.pipelineValue}
              </p>
              <p className="text-[10px] font-medium text-slate-500">
                {heroContent.floatingBadges.pipelineMeta}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade into next section ─────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#07070f] to-transparent" />

      
    </section>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */
function ScoreBar({ score }: Readonly<{ score: number }>) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] font-medium text-slate-400">{score}</span>
    </div>
  );
}

function StatusBadge({ status }: Readonly<{ status: string }>) {
  const isHot = status === "Hot";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${
        isHot
          ? "bg-rose-500/15 text-rose-400"
          : "bg-amber-500/15 text-amber-400"
      }`}
    >
      {status}
    </span>
  );
}


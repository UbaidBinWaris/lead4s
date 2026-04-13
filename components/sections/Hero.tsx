"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaHandshake,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { heroContent } from "@/data/hero";

/* ── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const crmStages = [
    { key: "new",       label: "New" },
    { key: "qualified", label: "Qualified" },
    { key: "proposal",  label: "Proposal" },
    { key: "won",       label: "Won" },
  ] as const;
  type StageKey = (typeof crmStages)[number]["key"];

  const [dealsByStage] = useState<Record<StageKey, typeof heroContent.crm.deals>>(() => ({
    new:       heroContent.crm.deals.filter((d) => d.stage === "new"),
    qualified: heroContent.crm.deals.filter((d) => d.stage === "qualified"),
    proposal:  heroContent.crm.deals.filter((d) => d.stage === "proposal"),
    won:       heroContent.crm.deals.filter((d) => d.stage === "won"),
  }));

  const [selectedDealId, setSelectedDealId] = useState(
    heroContent.crm.deals[2]?.id ?? ""
  );

  const allDeals = useMemo(
    () => [
      ...dealsByStage.new,
      ...dealsByStage.qualified,
      ...dealsByStage.proposal,
      ...dealsByStage.won,
    ],
    [dealsByStage]
  );

  const parseCurrency = (v: string) => Number(v.replaceAll(/[^0-9.-]+/g, ""));

  const totalPipeline = useMemo(
    () => allDeals.reduce((s, d) => s + parseCurrency(d.value), 0),
    [allDeals]
  );

  const weightedForecast = useMemo(
    () =>
      allDeals.reduce(
        (s, d) => s + parseCurrency(d.value) * (Math.min(d.probability, 100) / 100),
        0
      ),
    [allDeals]
  );

  /* Sparkline from weekly trend */
  const trendVals = heroContent.crm.weeklyTrend.map((p) => p.value);
  const trendMin  = Math.min(...trendVals);
  const trendMax  = Math.max(...trendVals);
  const sparkPts  = heroContent.crm.weeklyTrend.map((p, i) => ({
    x: (i / (heroContent.crm.weeklyTrend.length - 1)) * 100,
    y: trendMax === trendMin ? 25 : 45 - ((p.value - trendMin) / (trendMax - trendMin)) * 40,
  }));
  const sparkPolyline = sparkPts.map((p) => `${p.x},${p.y}`).join(" ");
  const sparkAreaPath =
    `M${sparkPts[0].x},${sparkPts[0].y} ` +
    sparkPts.slice(1).map((p) => `L${p.x},${p.y}`).join(" ") +
    " L100,50 L0,50 Z";

  const forecastPct = totalPipeline > 0 ? (weightedForecast / totalPipeline) * 100 : 0;

  /* Stage style map — minimal monochrome, only Won gets a success tint */
  const stageStyle = {
    new:       { bar: "from-slate-600 to-slate-500",     dot: "bg-slate-500",    badge: "bg-slate-800/70 border-slate-700/60 text-slate-400"     },
    qualified: { bar: "from-slate-500 to-slate-400",     dot: "bg-slate-400",    badge: "bg-slate-800/70 border-slate-700/60 text-slate-400"     },
    proposal:  { bar: "from-brand-700 to-brand-500",     dot: "bg-brand-400",    badge: "bg-slate-800/70 border-slate-700/60 text-slate-400"     },
    won:       { bar: "from-emerald-700 to-emerald-500", dot: "bg-emerald-400",  badge: "bg-emerald-500/10 border-emerald-600/30 text-emerald-400" },
  } as const;

  /* Probability ring — brand blue always; emerald only when Won (100%) */
  const selectedDeal = allDeals.find((d) => d.id === selectedDealId);
  const prob = selectedDeal?.probability ?? 0;
  const ringR    = 26;
  const ringCirc = 2 * Math.PI * ringR;
  const ringColor = prob === 100 ? "#10b981" : "#2563eb";

  return (
    <section
      ref={sectionRef}
      id={heroContent.id}
      className="relative h-screen overflow-hidden bg-grid"
    >
      <div className="pointer-events-none absolute inset-0 z-1 vignette" />

      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-10%] h-200 w-200 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute right-[-5%] top-[20%] h-125 w-125 rounded-full bg-orange-500/12 blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-100 w-100 rounded-full bg-amber-400/10 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-360 flex-col justify-center px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
        <div className="grid w-full gap-8 lg:gap-12 lg:grid-cols-2 lg:items-stretch">

          {/* ── LEFT: Copy ─────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-around text-center lg:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="mb-6 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.5rem] xl:text-[3.8rem]"
            >
              {heroContent.headlineStart}<br />
              <span className="gradient-brand-text">{heroContent.headlineAccent}</span><br />
              {heroContent.headlineEnd}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-10 mx-auto max-w-md text-justify text-lg leading-relaxed text-slate-400 lg:mx-0"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mb-14 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              {heroContent.ctaPrimary.visible && (
                <Link
                  id="hero-cta-primary"
                  href={heroContent.ctaPrimary.href}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/50 transition-all duration-300 hover:brightness-110 hover:shadow-blue-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PrimaryCtaIcon className="text-sm" aria-hidden="true" />
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  {heroContent.ctaPrimary.text}
                </Link>
              )}

              {heroContent.ctaSecondary.visible && (
                <Link
                  id="hero-cta-demo"
                  href={heroContent.ctaSecondary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 text-(--secondary) bg-white/3 px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-(--secondary) hover:scale-[1.02] active:scale-[0.98]"
                >
                  <SecondaryCtaIcon className="text-sm text-(--secondary)" aria-hidden="true" />
                  {heroContent.ctaSecondary.text}
                </Link>
              )}
            </motion.div>

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

          {/* ── RIGHT: CRM Dashboard ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex lg:flex-col"
          >
            {/* ── Subtle border shell ────────────────────────────── */}
            <div className="flex flex-1 flex-col rounded-2xl p-px bg-linear-to-br from-slate-600/50 via-slate-700/10 to-slate-600/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#07090f] backdrop-blur-xl">

                {/* Subtle ambient — blue only, very soft */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_30%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)]" />

                {/* ── Header ──────────────────────────────────────── */}
                <div className="relative flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                  <div className="flex items-center gap-2.5">

                    <h3 className="text-sm font-semibold pl-2 text-white">{heroContent.crm.title}</h3>
                  </div>

                </div>

                {/* ── Pipeline hero metric + sparkline ────────────── */}
                <div className="relative border-b border-white/8 px-5 py-4">
                  {/* Soft blue bloom behind the number */}
                  <div className="pointer-events-none absolute left-0 top-0 h-28 w-56 bg-[radial-gradient(ellipse_at_20%_0%,rgba(37,99,235,0.15),transparent_70%)]" />

                  <div className="flex items-start justify-between gap-3">
                    {/* Left: headline metric */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        Total Pipeline Value
                      </p>
                      <p className="mt-0.5 text-[2rem] font-black tabular-nums leading-none tracking-tight text-white">
                        ${totalPipeline.toLocaleString()}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {/* MoM badge */}
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                          <svg className="h-2 w-2" viewBox="0 0 6 6" fill="currentColor">
                            <path d="M3 0L6 6H0Z" />
                          </svg>
                          +18.4% MoM
                        </span>
                        <span className="text-[10px] text-slate-600">·</span>
                        <span className="text-[10px] text-slate-500">
                          Forecast{" "}
                          <span className="font-semibold text-slate-300">
                            ${Math.round(weightedForecast).toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Right: mini sparkline (blue → orange gradient line) */}
                    <div className="mt-1 h-10 w-24 shrink-0">
                      <svg
                        viewBox="0 0 100 50"
                        preserveAspectRatio="none"
                        className="h-full w-full overflow-visible opacity-90"
                      >
                        <defs>
                          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="sparkStroke" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                        </defs>
                        <path d={sparkAreaPath} fill="url(#sparkFill)" />
                        <polyline
                          points={sparkPolyline}
                          fill="none"
                          stroke="url(#sparkStroke)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Forecast progress bar with glow */}
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${forecastPct}%` }}
                        transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-brand-600"
                      />
                    </div>
                    <p className="mt-1 text-right text-[9px] text-slate-600">
                      {Math.round(forecastPct)}% probability-weighted
                    </p>
                  </div>
                </div>

                {/* ── KPI tiles ───────────────────────────────────── */}
                <div className="relative grid grid-cols-3 divide-x divide-white/8 border-b border-white/8">
                  {heroContent.crm.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.09, duration: 0.38 }}
                      className="flex flex-col px-4 py-3"
                    >
                      <p className="text-[10px] text-slate-500">{metric.label}</p>
                      <p className="mt-0.5 text-lg font-bold tabular-nums text-white">{metric.value}</p>
                      <div className="mt-0.5 flex items-center gap-1">
                        <svg className="h-2 w-2 text-emerald-500" viewBox="0 0 6 6" fill="currentColor">
                          <path d="M3 0L6 6H0Z" />
                        </svg>
                        <span className="text-[10px] font-medium text-emerald-500">{metric.trend}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ── Stage pipeline bars ──────────────────────────── */}
                <div className="relative border-b border-white/8 px-5 py-3">
                  <div className="space-y-2.5">
                    {crmStages.map((stage, idx) => {
                      const sv  = dealsByStage[stage.key].reduce((s, d) => s + parseCurrency(d.value), 0);
                      const pct = totalPipeline > 0 ? (sv / totalPipeline) * 100 : 0;
                      const sty = stageStyle[stage.key];
                      return (
                        <div key={stage.key} className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-18 shrink-0 rounded border px-1.5 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wide",
                              sty.badge
                            )}
                          >
                            {stage.label}
                          </span>
                          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800/80">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.95, delay: 0.65 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                              className={cn("h-full rounded-full bg-linear-to-r", sty.bar)}
                            />
                          </div>
                          <p className="w-10 shrink-0 text-right text-[10px] font-semibold tabular-nums text-slate-300">
                            ${(sv / 1000).toFixed(0)}k
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Deal list + probability ring ─────────────────── */}
                <div className="relative flex-1 grid grid-cols-[1fr_auto] divide-x divide-white/8 border-b border-white/8">

                  {/* Deal cards */}
                  <div className="flex flex-col justify-between px-4 py-3 gap-1.5">
                    {allDeals.map((deal) => {
                      const sty    = stageStyle[deal.stage];
                      const active = deal.id === selectedDealId;
                      return (
                        <motion.button
                          key={deal.id}
                          type="button"
                          onClick={() => setSelectedDealId(deal.id)}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200",
                            active
                              ? "border-brand-500/40 bg-brand-500/12 shadow-sm shadow-brand-900/30"
                              : "border-transparent bg-slate-800/30 hover:bg-slate-800/60 hover:border-white/10"
                          )}
                        >
                          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", sty.dot)} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold text-white">{deal.company}</p>
                            <p className="truncate text-[9px] text-slate-500">{deal.name}</p>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold text-brand-300">{deal.value}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Probability ring */}
                  <div className="flex w-22.5 flex-col items-center justify-center gap-2 px-3">
                    <svg width="68" height="68" viewBox="0 0 68 68">
                      <defs>
                        <filter id="ringGlow" x="-25%" y="-25%" width="150%" height="150%">
                          <feGaussianBlur stdDeviation="2.5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      {/* Track */}
                      <circle
                        cx="34" cy="34" r={ringR}
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="5"
                      />
                      {/* Animated arc */}
                      <motion.circle
                        key={selectedDealId}
                        cx="34" cy="34" r={ringR}
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={ringCirc}
                        initial={{ strokeDashoffset: ringCirc }}
                        animate={{ strokeDashoffset: ringCirc - (prob / 100) * ringCirc }}
                        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        transform="rotate(-90 34 34)"
                        filter="url(#ringGlow)"
                      />
                      <text x="34" y="31" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">
                        {prob}%
                      </text>
                      <text x="34" y="43" textAnchor="middle" fill="#475569" fontSize="7.5">
                        win prob
                      </text>
                    </svg>

                    {selectedDeal && (
                      <p className="max-w-18.5 text-center text-[9px] leading-tight text-slate-500">
                        {selectedDeal.nextStep}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* ── Bottom fade ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-linear-to-t from-surface-950 to-transparent" />
    </section>
  );
}

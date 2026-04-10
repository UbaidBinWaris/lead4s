"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ── Service data ─────────────────────────────────────────────── */
type Service = {
  number: string;
  category: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  /** Tailwind color token name for accent (without "text-" / "bg-" prefix) */
  hue: string;
  /** CSS color value for glow and gradient */
  glowColor: string;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    number: "01",
    category: "Intelligence",
    title: "AI Lead Scoring",
    description:
      "Our model analyzes 200+ behavioral and firmographic signals to rank every prospect by purchase intent — so your reps only ever call leads that are actually ready to buy.",
    detail: "200+ intent signals · Updated every 4 hrs",
    icon: <BrainIcon />,
    hue: "blue",
    glowColor: "59,130,246",
    featured: true,
  },
  {
    number: "02",
    category: "Data",
    title: "Precision Targeting",
    description:
      "Build hyper-specific ICP lists from 300M+ verified B2B contacts. Filter by role, company size, tech stack, funding stage, and dozens more signals.",
    detail: "300M+ contacts · Real-time verification",
    icon: <TargetIcon />,
    hue: "violet",
    glowColor: "139,92,246",
  },
  {
    number: "03",
    category: "Automation",
    title: "Multi-Channel Outreach",
    description:
      "Launch personalised sequences across email, LinkedIn, and SMS that fire based on real-time prospect behaviour — not a fixed calendar.",
    detail: "Email · LinkedIn · SMS",
    icon: <ZapIcon />,
    hue: "amber",
    glowColor: "245,158,11",
  },
  {
    number: "04",
    category: "Integration",
    title: "CRM Sync",
    description:
      "Enriched leads flow directly into Salesforce, HubSpot, or Pipedrive the moment they qualify — zero copy-paste, zero data lag.",
    detail: "Salesforce · HubSpot · Pipedrive",
    icon: <PuzzleIcon />,
    hue: "emerald",
    glowColor: "16,185,129",
  },
  {
    number: "05",
    category: "Insights",
    title: "Real-Time Analytics",
    description:
      "Track pipeline velocity, conversion rates, and revenue attribution across every channel from one live command center.",
    detail: "Live dashboard · Revenue attribution",
    icon: <ChartIcon />,
    hue: "sky",
    glowColor: "14,165,233",
  },
  {
    number: "06",
    category: "Retention",
    title: "Smart Follow-Ups",
    description:
      "AI detects when a cold lead re-engages and fires the right follow-up at exactly the right time — automatically, without any manual trigger.",
    detail: "Behaviour-triggered · Zero cold leads",
    icon: <RefreshIcon />,
    hue: "rose",
    glowColor: "244,63,94",
  },
];

/* ── Section ──────────────────────────────────────────────────── */
export function Services() {
  const featured = SERVICES.find((s) => s.featured)!;
  const rest = SERVICES.filter((s) => !s.featured);

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Top separator line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400"
          >
            <span className="h-1 w-4 rounded-full bg-blue-400/60" />
            What we do
            <span className="h-1 w-4 rounded-full bg-blue-400/60" />
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Everything your sales team
            <br />
            <span className="gradient-brand-text">needs to win more deals</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400"
          >
            One platform that replaces five point solutions — from prospecting to
            close, powered by AI at every step.
          </motion.p>
        </motion.div>

        {/* ── Featured card (full-width) ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <SpotlightCard service={featured} large />
        </motion.div>

        {/* ── 2×2+1 grid ──────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((svc) => (
            <motion.div key={svc.title} variants={fadeInUp}>
              <SpotlightCard service={svc} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Spotlight card ───────────────────────────────────────────── */
function SpotlightCard({
  service,
  large = false,
}: {
  service: Service;
  large?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  // Subtle tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full cursor-default"
    >
      {/* ── Gradient border (1px via padding trick) ─────────── */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, rgba(${service.glowColor},0.6) 0%, rgba(${service.glowColor},0.1) 50%, transparent 100%)`,
          padding: "1px",
          borderRadius: "1rem",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* ── Card body ───────────────────────────────────────── */}
      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] transition-colors duration-300 group-hover:bg-white/[0.055] ${large ? "flex flex-col gap-6 p-8 sm:flex-row sm:items-center" : "p-6"}`}
      >
        {/* Spotlight radial (mouse tracking) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${hovered ? "var(--mx)" : "50%"} ${hovered ? "var(--my)" : "50%"}, rgba(${service.glowColor},0.10) 0%, transparent 70%)`,
          }}
        />

        {/* Background glow blob */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `rgba(${service.glowColor},0.15)` }}
        />

        {/* Icon block */}
        <div
          className={`relative flex-shrink-0 ${large ? "flex flex-col items-start gap-3" : "mb-5"}`}
        >
          {/* Number label */}
          <span className="font-mono text-[11px] font-bold tracking-widest text-slate-600">
            {service.number}
          </span>

          {/* Icon with animated glow ring */}
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute inset-0 -m-1.5 rounded-2xl opacity-0 blur-md transition-all duration-500 group-hover:opacity-60"
              style={{ background: `rgba(${service.glowColor},0.5)` }}
            />
            <div
              className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-opacity-40`}
              style={
                hovered
                  ? {
                      borderColor: `rgba(${service.glowColor},0.35)`,
                      background: `rgba(${service.glowColor},0.12)`,
                      color: `rgba(${service.glowColor},1)`,
                    }
                  : { color: "rgba(148,163,184,1)" }
              }
            >
              {service.icon}
            </div>
          </div>

          {/* Category pill */}
          <span
            className="inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
            style={
              hovered
                ? {
                    borderColor: `rgba(${service.glowColor},0.4)`,
                    color: `rgba(${service.glowColor},1)`,
                    background: `rgba(${service.glowColor},0.1)`,
                  }
                : {
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(100,116,139,1)",
                    background: "transparent",
                  }
            }
          >
            {service.category}
          </span>
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <h3 className="mb-2.5 text-lg font-bold text-white">{service.title}</h3>
          <p
            className={`text-sm leading-relaxed text-slate-400 ${large ? "max-w-xl" : ""}`}
          >
            {service.description}
          </p>

          {/* Detail tag */}
          <div className="mt-4 flex items-center gap-2">
            <div
              className="h-1 w-1 rounded-full"
              style={{ background: `rgba(${service.glowColor},0.8)` }}
            />
            <span className="text-[11px] text-slate-600">{service.detail}</span>
          </div>

          {/* Learn more — slides in on hover */}
          <div className="mt-5 overflow-hidden">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: `rgba(${service.glowColor},1)` }}
            >
              Explore feature
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Icons (20×20, 1.6 stroke) ────────────────────────────────── */
function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-3.408 0l-1.569-1.568c-.23-.23-.556-.338-.878-.29-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02.048-.322-.059-.648-.289-.878L2.667 10.7a2.404 2.404 0 0 1 0-3.408l1.568-1.568c.23-.23.338-.556.29-.878-.074-.493-.504-.84-.968-1.02a2.5 2.5 0 1 1 3.237-3.237c.18.464.527.894 1.02.967.322.048.648-.059.878-.289L10.3 2.667a2.404 2.404 0 0 1 3.408 0l1.568 1.568c.23.23.556.338.878.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.968 1.02Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

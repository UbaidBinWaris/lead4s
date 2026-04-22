import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuSun,
  LuHammer,
  LuShield,
  LuCar,
  LuScale,
  LuHeartPulse,
} from "react-icons/lu";
import { db } from "@/lib/db";
import { industriesPageData } from "@/data/industries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

type AccentColor = "amber" | "emerald" | "violet" | "blue" | "red" | "teal";

type IndustryCardData = {
  slug: string;
  title: string;
  description: string;
  color: AccentColor;
  tags: string[];
  metric: { value: string; label: string };
};

export const metadata: Metadata = {
  title: industriesPageData.seo.title,
  description: industriesPageData.seo.description,
  keywords: industriesPageData.seo.keywords,
  openGraph: {
    title: industriesPageData.seo.ogTitle,
    description: industriesPageData.seo.ogDescription,
    type: "website",
    url: `${SITE_URL}/industries`,
  },
  twitter: {
    card: "summary_large_image",
    title: industriesPageData.seo.ogTitle,
    description: industriesPageData.seo.ogDescription,
  },
  alternates: { canonical: `${SITE_URL}/industries` },
};

// ---------------------------------------------------------------------------
// Color system — full class names required for Tailwind tree-shaking
// ---------------------------------------------------------------------------
const ACCENT_MAP = {
  amber: {
    // Top zone gradient fill
    zoneBg: "from-amber-500/18 via-amber-400/6 to-transparent",
    // Card outer border (idle / hover)
    borderIdle: "border-amber-500/15",
    borderHover: "hover:border-amber-400/55",
    // Thin top shimmer bar
    barFrom: "from-amber-400",
    barVia: "via-amber-300/70",
    // Text
    text: "text-amber-400",
    textLight: "text-amber-300",
    // Tags
    tagBg: "bg-amber-500/10",
    tagBorder: "border-amber-500/25",
    tagText: "text-amber-300",
    // Stat highlight
    statBg: "bg-amber-500/10",
    statBorder: "border-amber-400/20",
    // Glow (CSS var, used inline)
    glow: "rgba(245,158,11,0.18)",
    // Icon backdrop
    iconBg: "bg-amber-500/12",
    iconRing: "ring-amber-400/20",
    // Arrow button
    arrowBg: "bg-amber-500/12 hover:bg-amber-500/22",
    arrowBorder: "border-amber-400/25",
  },
  emerald: {
    zoneBg: "from-emerald-500/18 via-emerald-400/6 to-transparent",
    borderIdle: "border-emerald-500/15",
    borderHover: "hover:border-emerald-400/55",
    barFrom: "from-emerald-400",
    barVia: "via-emerald-300/70",
    text: "text-emerald-400",
    textLight: "text-emerald-300",
    tagBg: "bg-emerald-500/10",
    tagBorder: "border-emerald-500/25",
    tagText: "text-emerald-300",
    statBg: "bg-emerald-500/10",
    statBorder: "border-emerald-400/20",
    glow: "rgba(16,185,129,0.18)",
    iconBg: "bg-emerald-500/12",
    iconRing: "ring-emerald-400/20",
    arrowBg: "bg-emerald-500/12 hover:bg-emerald-500/22",
    arrowBorder: "border-emerald-400/25",
  },
  violet: {
    zoneBg: "from-violet-500/18 via-violet-400/6 to-transparent",
    borderIdle: "border-violet-500/15",
    borderHover: "hover:border-violet-400/55",
    barFrom: "from-violet-400",
    barVia: "via-violet-300/70",
    text: "text-violet-400",
    textLight: "text-violet-300",
    tagBg: "bg-violet-500/10",
    tagBorder: "border-violet-500/25",
    tagText: "text-violet-300",
    statBg: "bg-violet-500/10",
    statBorder: "border-violet-400/20",
    glow: "rgba(139,92,246,0.18)",
    iconBg: "bg-violet-500/12",
    iconRing: "ring-violet-400/20",
    arrowBg: "bg-violet-500/12 hover:bg-violet-500/22",
    arrowBorder: "border-violet-400/25",
  },
  blue: {
    zoneBg: "from-blue-500/18 via-blue-400/6 to-transparent",
    borderIdle: "border-blue-500/15",
    borderHover: "hover:border-blue-400/55",
    barFrom: "from-blue-400",
    barVia: "via-blue-300/70",
    text: "text-blue-400",
    textLight: "text-blue-300",
    tagBg: "bg-blue-500/10",
    tagBorder: "border-blue-500/25",
    tagText: "text-blue-300",
    statBg: "bg-blue-500/10",
    statBorder: "border-blue-400/20",
    glow: "rgba(37,99,235,0.18)",
    iconBg: "bg-blue-500/12",
    iconRing: "ring-blue-400/20",
    arrowBg: "bg-blue-500/12 hover:bg-blue-500/22",
    arrowBorder: "border-blue-400/25",
  },
  red: {
    zoneBg: "from-red-500/18 via-red-400/6 to-transparent",
    borderIdle: "border-red-500/15",
    borderHover: "hover:border-red-400/55",
    barFrom: "from-red-400",
    barVia: "via-red-300/70",
    text: "text-red-400",
    textLight: "text-red-300",
    tagBg: "bg-red-500/10",
    tagBorder: "border-red-500/25",
    tagText: "text-red-300",
    statBg: "bg-red-500/10",
    statBorder: "border-red-400/20",
    glow: "rgba(239,68,68,0.18)",
    iconBg: "bg-red-500/12",
    iconRing: "ring-red-400/20",
    arrowBg: "bg-red-500/12 hover:bg-red-500/22",
    arrowBorder: "border-red-400/25",
  },
  teal: {
    zoneBg: "from-teal-500/18 via-teal-400/6 to-transparent",
    borderIdle: "border-teal-500/15",
    borderHover: "hover:border-teal-400/55",
    barFrom: "from-teal-400",
    barVia: "via-teal-300/70",
    text: "text-teal-400",
    textLight: "text-teal-300",
    tagBg: "bg-teal-500/10",
    tagBorder: "border-teal-500/25",
    tagText: "text-teal-300",
    statBg: "bg-teal-500/10",
    statBorder: "border-teal-400/20",
    glow: "rgba(20,184,166,0.18)",
    iconBg: "bg-teal-500/12",
    iconRing: "ring-teal-400/20",
    arrowBg: "bg-teal-500/12 hover:bg-teal-500/22",
    arrowBorder: "border-teal-400/25",
  },
} as const;

// Industry icons per slug — react-icons (Lucide)
const INDUSTRY_ICONS: Record<string, IconType> = {
  "solar-leads":                LuSun,
  "home-improvement-leads":     LuHammer,
  "final-expense-lead":         LuShield,
  "auto-insurance-leads":       LuCar,
  "mva-personal-injury-leads":  LuScale,
  "medicare-o65":               LuHeartPulse,
};

const COLOR_FALLBACK_BY_SLUG: Record<string, AccentColor> = {
  "solar-leads": "amber",
  "home-improvement-leads": "emerald",
  "final-expense-lead": "violet",
  "auto-insurance-leads": "blue",
  "mva-personal-injury-leads": "red",
  "medicare-o65": "teal",
};

function isAccentColor(value: string | null | undefined): value is AccentColor {
  return (
    value === "amber" ||
    value === "emerald" ||
    value === "violet" ||
    value === "blue" ||
    value === "red" ||
    value === "teal"
  );
}

function toTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((tag): tag is string => typeof tag === "string");
}

async function getIndustryCards(): Promise<IndustryCardData[]> {
  const industries = await db.industry.findMany({
    where: { type: "industry", isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      description: true,
      cardColor: true,
      cardTags: true,
      cardMetricValue: true,
      cardMetricLabel: true,
    },
  });

  return industries.map((industry) => {
    const color = isAccentColor(industry.cardColor)
      ? industry.cardColor
      : (COLOR_FALLBACK_BY_SLUG[industry.slug] ?? "blue");

    return {
      slug: industry.slug,
      title: industry.title,
      description: industry.description ?? "",
      color,
      tags: toTags(industry.cardTags),
      metric: {
        value: industry.cardMetricValue ?? "",
        label: industry.cardMetricLabel ?? "",
      },
    };
  });
}

// ---------------------------------------------------------------------------
// IndustryCard — next-level premium card
// ---------------------------------------------------------------------------
function IndustryCard({
  industry,
  index,
}: {
  readonly industry: IndustryCardData;
  readonly index: number;
}) {
  const accent = ACCENT_MAP[industry.color];
  const IconComponent = INDUSTRY_ICONS[industry.slug] ?? LuScale;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/industries/${industry.slug}`}
      aria-label={`Explore ${industry.title}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-[#0b0f1e]
        transition-all duration-500 ease-out
        ${accent.borderIdle} ${accent.borderHover}
        hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)]`}
      style={{ "--glow": accent.glow } as React.CSSProperties}
    >

      {/* ── Animated shimmer bar (top) ─────────────────────────── */}
      <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${accent.barFrom} ${accent.barVia} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* ── Radial glow that blooms on hover ───────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 90% 55% at 50% 0%, var(--glow), transparent 65%)` }}
      />

      {/* ── TOP ZONE — gradient icon plate ─────────────────────── */}
      <div className={`relative flex items-end justify-between px-7 pt-7 pb-6 bg-linear-to-b ${accent.zoneBg}`}>

        {/* Icon bubble */}
        <div className={`
          relative flex h-14 w-14 items-center justify-center rounded-2xl
          ${accent.iconBg} ring-1 ${accent.iconRing}
          shadow-lg shadow-black/30
          transition-transform duration-300 group-hover:scale-110
        `}>
          <IconComponent className={`h-6 w-6 ${accent.text}`} aria-hidden="true" />
          {/* Inner shine */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/10 to-transparent" />
        </div>

        {/* Card number */}
        <span className="font-mono text-5xl font-black leading-none select-none tabular-nums text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500">
          {num}
        </span>
      </div>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col px-7 pt-5 pb-7">

        {/* Tags row */}
        {industry.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {industry.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.14em]
                  ${accent.tagBg} ${accent.tagBorder} ${accent.tagText}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className={`text-[1.1rem] font-bold leading-snug text-white transition-colors duration-300 group-hover:${accent.textLight}`}>
          {industry.title}
        </h2>

        {/* Description */}
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-400/90 line-clamp-3">
          {industry.description}
        </p>

        {/* Stat block */}
        {industry.metric.value && (
          <div className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 ${accent.statBg} ${accent.statBorder}`}>
            <div className={`h-7 w-[3px] rounded-full ${accent.text} bg-current opacity-70`} />
            <div>
              <p className={`text-base font-black leading-none ${accent.text}`}>
                {industry.metric.value}
              </p>
              {industry.metric.label && (
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                  {industry.metric.label}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
            View program
          </span>

          {/* Arrow circle */}
          <span className={`
            flex h-8 w-8 items-center justify-center rounded-full border
            ${accent.arrowBg} ${accent.arrowBorder}
            transition-all duration-300
            group-hover:scale-110 group-hover:ring-2 group-hover:ring-current/10
            ${accent.text}
          `}>
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function IndustriesPage() {
  const { hero } = industriesPageData;
  const industries = await getIndustryCards();

  return (
    <main className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />

        {/* Multi-blob glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/8 blur-[160px]" />
          <div className="absolute left-0 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-accent-500/6 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[250px] w-[350px] rounded-full bg-brand-400/5 blur-[100px]" />
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 vignette" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Eyebrow badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/25 bg-brand-500/8 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400 shadow-lg shadow-brand-500/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              {hero.eyebrow}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-8 max-w-4xl text-center text-5xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.heading}{" "}
            <span className="gradient-brand-text">{hero.headingHighlight}</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">
            {hero.subheading}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/40 glow-blue"
            >
              Get Qualified Leads
              <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/partnership"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-bold text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white hover:bg-white/8"
            >
              Apply for Partnership
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-4 shadow-xl shadow-black/30">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center bg-surface-950 px-6 py-6 text-center transition-colors hover:bg-surface-900"
              >
                <span className="text-3xl font-black text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* ── Section header ───────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
          Proven Verticals
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
          Every vertical is built{" "}
          <span className="gradient-text">differently</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Compliance rules, buyer intent signals, and conversion benchmarks
          vary by industry. We build each program from scratch to match.
        </p>
      </section>

      {/* ── Industry cards ───────────────────────────────────────── */}
      <section
        className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:pb-24"
        aria-label="Industries we serve"
      >
        {industries.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-sm text-slate-400">
              No industries published yet. Check back soon.
            </p>
          </div>
        )}
      </section>

    </main>
  );
}

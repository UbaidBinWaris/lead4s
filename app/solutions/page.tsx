import type { Metadata } from "next";
import Link from "next/link";
import { solutionsPageData } from "@/data/solutions";
import type { SolutionCardData } from "@/data/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: solutionsPageData.seo.title,
  description: solutionsPageData.seo.description,
  keywords: solutionsPageData.seo.keywords,
  openGraph: {
    title: solutionsPageData.seo.ogTitle,
    description: solutionsPageData.seo.ogDescription,
    type: "website",
    url: `${SITE_URL}/solutions`,
  },
  twitter: {
    card: "summary_large_image",
    title: solutionsPageData.seo.ogTitle,
    description: solutionsPageData.seo.ogDescription,
  },
  alternates: { canonical: `${SITE_URL}/solutions` },
};

// ---------------------------------------------------------------------------
// Color system
// ---------------------------------------------------------------------------
const ACCENT_MAP = {
  blue: {
    border: "from-blue-500/60 to-blue-400/30",
    iconBg: "bg-blue-500/10 ring-blue-500/20",
    text: "text-blue-400",
    tag: "border-blue-500/20 text-blue-500/70",
    glow: "bg-blue-500/5",
  },
  emerald: {
    border: "from-emerald-500/60 to-emerald-400/30",
    iconBg: "bg-emerald-500/10 ring-emerald-500/20",
    text: "text-emerald-400",
    tag: "border-emerald-500/20 text-emerald-500/70",
    glow: "bg-emerald-500/5",
  },
  violet: {
    border: "from-violet-500/60 to-violet-400/30",
    iconBg: "bg-violet-500/10 ring-violet-500/20",
    text: "text-violet-400",
    tag: "border-violet-500/20 text-violet-500/70",
    glow: "bg-violet-500/5",
  },
  amber: {
    border: "from-amber-500/60 to-amber-400/30",
    iconBg: "bg-amber-500/10 ring-amber-500/20",
    text: "text-amber-400",
    tag: "border-amber-500/20 text-amber-500/70",
    glow: "bg-amber-500/5",
  },
  indigo: {
    border: "from-indigo-500/60 to-indigo-400/30",
    iconBg: "bg-indigo-500/10 ring-indigo-500/20",
    text: "text-indigo-400",
    tag: "border-indigo-500/20 text-indigo-500/70",
    glow: "bg-indigo-500/5",
  },
} as const;

// ---------------------------------------------------------------------------
// Solution card — wider format (2-col grid) with benefit highlight
// ---------------------------------------------------------------------------
function SolutionCard({ solution, index }: { readonly solution: SolutionCardData; readonly index: number }) {
  const accent = ACCENT_MAP[solution.color];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[hsl(0,0%,6%)] transition-all duration-300 hover:border-slate-700 hover:bg-[hsl(0,0%,8%)] hover:shadow-xl hover:shadow-black/30">
      {/* Top gradient accent */}
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.border}`} />

      <div className="flex flex-1 flex-col p-7">
        {/* Number + Icon row */}
        <div className="mb-6 flex items-center justify-between">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 text-2xl ${accent.iconBg}`}>
            {solution.icon}
          </div>
          <span className="text-4xl font-black tabular-nums text-slate-800 select-none">
            0{index + 1}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {solution.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accent.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold leading-snug text-white">
          {solution.title}
        </h2>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {solution.description}
        </p>

        {/* Benefit highlight */}
        <div className={`mt-5 rounded-xl px-4 py-3 ${accent.glow} border border-slate-800/60`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Key benefit
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${accent.text}`}>
            {solution.benefit}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
              {solution.metric.label}
            </p>
            <p className={`mt-0.5 text-sm font-semibold ${accent.text}`}>
              {solution.metric.value}
            </p>
          </div>
          <Link
            href={`/solutions/${solution.slug}`}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200 ${accent.text} border-current/20 hover:bg-current/5 group-hover:gap-2.5`}
            aria-label={`Learn more about ${solution.title}`}
          >
            Get Started
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SolutionsPage() {
  const { hero, cta, solutions } = solutionsPageData;

  return (
    <main className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-grid opacity-20" />
        {/* Dual-tone glow for solutions — more energetic */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/6 blur-[140px]" />
          <div className="absolute right-1/4 top-0 h-[400px] w-[500px] translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.heading}{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              {hero.headingHighlight}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">
            {hero.subheading}
          </p>

          {/* Stats strip */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center bg-[hsl(0,0%,6%)] px-6 py-5 text-center">
                <span className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</span>
                <span className="mt-1 text-xs text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* ── Solution cards ────────────────────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        aria-label="Our lead generation solutions"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <SolutionCard key={solution.slug} solution={solution} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[700px] rounded-full bg-indigo-600/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {cta.heading}{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              {cta.headingHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            {cta.subheading}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primaryHref}
              className="inline-flex min-h-[48px] items-center rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {cta.primaryLabel}
            </Link>
            <Link
              href={cta.secondaryHref}
              className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

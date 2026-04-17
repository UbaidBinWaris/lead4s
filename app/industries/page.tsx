import type { Metadata } from "next";
import Link from "next/link";
import { industriesPageData } from "@/data/industries";
import type { IndustryCardData } from "@/data/industries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

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
    border: "from-amber-500/60 to-amber-400/30",
    iconBg: "bg-amber-500/10 ring-amber-500/20",
    text: "text-amber-400",
    tag: "border-amber-500/20 text-amber-500/70",
  },
  emerald: {
    border: "from-emerald-500/60 to-emerald-400/30",
    iconBg: "bg-emerald-500/10 ring-emerald-500/20",
    text: "text-emerald-400",
    tag: "border-emerald-500/20 text-emerald-500/70",
  },
  violet: {
    border: "from-violet-500/60 to-violet-400/30",
    iconBg: "bg-violet-500/10 ring-violet-500/20",
    text: "text-violet-400",
    tag: "border-violet-500/20 text-violet-500/70",
  },
  blue: {
    border: "from-blue-500/60 to-blue-400/30",
    iconBg: "bg-blue-500/10 ring-blue-500/20",
    text: "text-blue-400",
    tag: "border-blue-500/20 text-blue-500/70",
  },
  red: {
    border: "from-red-500/60 to-red-400/30",
    iconBg: "bg-red-500/10 ring-red-500/20",
    text: "text-red-400",
    tag: "border-red-500/20 text-red-500/70",
  },
  teal: {
    border: "from-teal-500/60 to-teal-400/30",
    iconBg: "bg-teal-500/10 ring-teal-500/20",
    text: "text-teal-400",
    tag: "border-teal-500/20 text-teal-500/70",
  },
} as const;

// ---------------------------------------------------------------------------
// Industry card
// ---------------------------------------------------------------------------
function IndustryCard({ industry }: { readonly industry: IndustryCardData }) {
  const accent = ACCENT_MAP[industry.color];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[hsl(0,0%,6%)] transition-all duration-300 hover:border-slate-700 hover:bg-[hsl(0,0%,8%)] hover:shadow-xl hover:shadow-black/30">
      {/* Top gradient accent line */}
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.border}`} />

      <div className="flex flex-1 flex-col p-6">
        {/* Icon */}
        <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 text-2xl ${accent.iconBg}`}>
          {industry.icon}
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {industry.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accent.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold leading-snug text-white">
          {industry.title}
        </h2>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
          {industry.description}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-end justify-between border-t border-slate-800/80 pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
              {industry.metric.label}
            </p>
            <p className={`mt-0.5 text-sm font-semibold ${accent.text}`}>
              {industry.metric.value}
            </p>
          </div>
          <Link
            href={`/industries/${industry.slug}`}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5 ${accent.text}`}
            aria-label={`Explore ${industry.title}`}
          >
            Explore
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
export default function IndustriesPage() {
  const { hero, cta, industries } = industriesPageData;

  return (
    <main className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="mt-16 h-[500px] w-[900px] rounded-full bg-blue-600/6 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.heading}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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

      {/* ── Industry cards ────────────────────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        aria-label="Industries we serve"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[700px] rounded-full bg-blue-600/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {cta.heading}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {cta.headingHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            {cta.subheading}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta.primaryHref}
              className="inline-flex min-h-[48px] items-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {cta.primaryLabel}
            </Link>
            <a
              href={cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {cta.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuTarget, LuPhoneCall, LuCalendarCheck, LuHeadphones, LuChartBar,
  LuCircleCheckBig, LuArrowRight, LuZap, LuShieldCheck, LuTrendingUp, LuClock, LuUsers,
} from "react-icons/lu";
import { db } from "@/lib/db";
import { solutionsPageData } from "@/data/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

type AccentColor = "blue" | "emerald" | "violet" | "amber" | "indigo";

type SolutionCardData = {
  slug: string;
  title: string;
  description: string;
  color: AccentColor;
  tags: string[];
  metric: { value: string; label: string };
  benefit: string;
};

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
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
    zoneBg: "from-blue-500/18 via-blue-400/6 to-transparent", borderIdle: "border-blue-500/15",
    borderHover: "hover:border-blue-400/55", barFrom: "from-blue-400", barVia: "via-blue-300/70",
    text: "text-blue-400", textLight: "text-blue-300", tagBg: "bg-blue-500/10",
    tagBorder: "border-blue-500/25", tagText: "text-blue-300", statBg: "bg-blue-500/10",
    statBorder: "border-blue-400/20", glow: "rgba(37,99,235,0.18)", iconBg: "bg-blue-500/12",
    iconRing: "ring-blue-400/20", arrowBg: "bg-blue-500/12 hover:bg-blue-500/22",
    arrowBorder: "border-blue-400/25", benefitBg: "bg-blue-500/8 border-blue-400/15",
  },
  emerald: {
    zoneBg: "from-emerald-500/18 via-emerald-400/6 to-transparent", borderIdle: "border-emerald-500/15",
    borderHover: "hover:border-emerald-400/55", barFrom: "from-emerald-400", barVia: "via-emerald-300/70",
    text: "text-emerald-400", textLight: "text-emerald-300", tagBg: "bg-emerald-500/10",
    tagBorder: "border-emerald-500/25", tagText: "text-emerald-300", statBg: "bg-emerald-500/10",
    statBorder: "border-emerald-400/20", glow: "rgba(16,185,129,0.18)", iconBg: "bg-emerald-500/12",
    iconRing: "ring-emerald-400/20", arrowBg: "bg-emerald-500/12 hover:bg-emerald-500/22",
    arrowBorder: "border-emerald-400/25", benefitBg: "bg-emerald-500/8 border-emerald-400/15",
  },
  violet: {
    zoneBg: "from-violet-500/18 via-violet-400/6 to-transparent", borderIdle: "border-violet-500/15",
    borderHover: "hover:border-violet-400/55", barFrom: "from-violet-400", barVia: "via-violet-300/70",
    text: "text-violet-400", textLight: "text-violet-300", tagBg: "bg-violet-500/10",
    tagBorder: "border-violet-500/25", tagText: "text-violet-300", statBg: "bg-violet-500/10",
    statBorder: "border-violet-400/20", glow: "rgba(139,92,246,0.18)", iconBg: "bg-violet-500/12",
    iconRing: "ring-violet-400/20", arrowBg: "bg-violet-500/12 hover:bg-violet-500/22",
    arrowBorder: "border-violet-400/25", benefitBg: "bg-violet-500/8 border-violet-400/15",
  },
  amber: {
    zoneBg: "from-amber-500/18 via-amber-400/6 to-transparent", borderIdle: "border-amber-500/15",
    borderHover: "hover:border-amber-400/55", barFrom: "from-amber-400", barVia: "via-amber-300/70",
    text: "text-amber-400", textLight: "text-amber-300", tagBg: "bg-amber-500/10",
    tagBorder: "border-amber-500/25", tagText: "text-amber-300", statBg: "bg-amber-500/10",
    statBorder: "border-amber-400/20", glow: "rgba(245,158,11,0.18)", iconBg: "bg-amber-500/12",
    iconRing: "ring-amber-400/20", arrowBg: "bg-amber-500/12 hover:bg-amber-500/22",
    arrowBorder: "border-amber-400/25", benefitBg: "bg-amber-500/8 border-amber-400/15",
  },
  indigo: {
    zoneBg: "from-indigo-500/18 via-indigo-400/6 to-transparent", borderIdle: "border-indigo-500/15",
    borderHover: "hover:border-indigo-400/55", barFrom: "from-indigo-400", barVia: "via-indigo-300/70",
    text: "text-indigo-400", textLight: "text-indigo-300", tagBg: "bg-indigo-500/10",
    tagBorder: "border-indigo-500/25", tagText: "text-indigo-300", statBg: "bg-indigo-500/10",
    statBorder: "border-indigo-400/20", glow: "rgba(99,102,241,0.18)", iconBg: "bg-indigo-500/12",
    iconRing: "ring-indigo-400/20", arrowBg: "bg-indigo-500/12 hover:bg-indigo-500/22",
    arrowBorder: "border-indigo-400/25", benefitBg: "bg-indigo-500/8 border-indigo-400/15",
  },
} as const;

// Icon registries
const SOLUTION_ICONS: Record<string, IconType> = {
  "exclusive-leads-cpl-model":  LuTarget,
  "live-transfer-calls":        LuPhoneCall,
  "appointment-setting":        LuCalendarCheck,
  "bpo-call-center-services":   LuHeadphones,
  "ppc-campaign-management":    LuChartBar,
};

const CHECKLIST_ICONS: Record<string, IconType> = {
  LuShieldCheck, LuZap, LuClock, LuCircleCheckBig, LuTrendingUp, LuUsers, LuChartBar, LuTarget,
};

const STEP_ICONS: Record<string, IconType> = {
  LuUsers, LuShieldCheck, LuZap, LuTrendingUp,
};

function isAccentColor(v: string | null | undefined): v is AccentColor {
  return v === "blue" || v === "emerald" || v === "violet" || v === "amber" || v === "indigo";
}

function toTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((t): t is string => typeof t === "string");
}

async function getSolutionCards(): Promise<SolutionCardData[]> {
  const rows = await db.industry.findMany({
    where: { type: "solution", isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, description: true, cardColor: true, cardTags: true, cardMetricValue: true, cardMetricLabel: true, cardBenefit: true },
  });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description ?? "",
    color: isAccentColor(r.cardColor) ? r.cardColor : ((solutionsPageData.colorFallbackBySlug[r.slug] as AccentColor) ?? "blue"),
    tags: toTags(r.cardTags),
    metric: { value: r.cardMetricValue ?? "", label: r.cardMetricLabel ?? "" },
    benefit: r.cardBenefit ?? "",
  }));
}

// ---------------------------------------------------------------------------
// SolutionCard
// ---------------------------------------------------------------------------
function SolutionCard({ solution, index }: { readonly solution: SolutionCardData; readonly index: number }) {
  const accent = ACCENT_MAP[solution.color];
  const IconComponent = SOLUTION_ICONS[solution.slug] ?? LuTarget;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      aria-label={`Learn more about ${solution.title}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-[#0b0f1e]
        transition-all duration-500 ease-out ${accent.borderIdle} ${accent.borderHover}
        hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)]`}
      style={{ "--glow": accent.glow } as React.CSSProperties}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${accent.barFrom} ${accent.barVia} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 90% 55% at 50% 0%, var(--glow), transparent 65%)` }} />

      <div className={`relative flex items-end justify-between px-7 pt-7 pb-6 bg-linear-to-b ${accent.zoneBg}`}>
        <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${accent.iconBg} ring-1 ${accent.iconRing} shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-110`}>
          <IconComponent className={`h-6 w-6 ${accent.text}`} aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/10 to-transparent" />
        </div>
        <span className="font-mono text-5xl font-black leading-none select-none tabular-nums text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500">{num}</span>
      </div>

      <div className="relative flex flex-1 flex-col px-7 pt-5 pb-7">
        {solution.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {solution.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`rounded-full border px-2.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.14em] ${accent.tagBg} ${accent.tagBorder} ${accent.tagText}`}>{tag}</span>
            ))}
          </div>
        )}
        <h2 className={`text-[1.1rem] font-bold leading-snug text-white transition-colors duration-300 group-hover:${accent.textLight}`}>{solution.title}</h2>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-400/90 line-clamp-3">{solution.description}</p>
        {solution.benefit && (
          <div className={`mt-5 rounded-xl border px-4 py-3 ${accent.benefitBg}`}>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-500">Key benefit</p>
            <p className={`mt-1 text-[13px] font-semibold leading-snug ${accent.text}`}>{solution.benefit}</p>
          </div>
        )}
        {solution.metric.value && (
          <div className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 ${accent.statBg} ${accent.statBorder}`}>
            <div className={`h-7 w-[3px] rounded-full ${accent.text} bg-current opacity-70`} />
            <div>
              <p className={`text-base font-black leading-none ${accent.text}`}>{solution.metric.value}</p>
              {solution.metric.label && <p className="mt-0.5 text-[11px] font-medium text-slate-500 uppercase tracking-wide">{solution.metric.label}</p>}
            </div>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">Get started</span>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${accent.arrowBg} ${accent.arrowBorder} transition-all duration-300 group-hover:scale-110 ${accent.text}`}>
            <LuArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// ProcessStep
// ---------------------------------------------------------------------------
function ProcessStep({ num, icon: Icon, title, body, isLast }: { num: string; icon: IconType; title: string; body: string; isLast?: boolean }) {
  return (
    <div className="relative flex gap-5">
      {!isLast && <div className="absolute left-6 top-14 bottom-0 w-px bg-linear-to-b from-white/10 to-transparent" />}
      <div className="relative shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10 ring-4 ring-brand-500/5">
        <Icon className="h-5 w-5 text-brand-400" aria-hidden="true" />
      </div>
      <div className="pb-10">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Step {num}</p>
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{body}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function SolutionsPage() {
  const { hero, imageBanner, cardsSection, howItWorks, proofStats } = solutionsPageData;
  const solutions = await getSolutionCards();

  return (
    <main className="min-h-screen bg-surface-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/8 blur-[160px]" />
          <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-accent-500/6 blur-[120px]" />
          <div className="absolute left-0 bottom-0 h-[200px] w-[300px] rounded-full bg-brand-400/4 blur-[100px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 vignette" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-accent-500/25 bg-accent-500/8 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-400 shadow-lg shadow-accent-500/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="mx-auto mt-8 max-w-4xl text-center text-5xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.heading} <span className="gradient-brand-text">{hero.headingHighlight}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">{hero.subheading}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/40 glow-blue">
              {hero.primaryCta.label} <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-bold text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white hover:bg-white/8">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-4 shadow-xl shadow-black/30">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center bg-surface-950 px-6 py-6 text-center hover:bg-surface-900 transition-colors">
                <span className="text-3xl font-black text-white sm:text-4xl">{stat.value}</span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* Image banner */}
      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/8 shadow-2xl shadow-black/50">
          <Image src={imageBanner.src} alt={imageBanner.alt} width={1200} height={480}
            className="h-[260px] w-full object-cover object-center sm:h-[340px] lg:h-[420px]" priority />
          <div className="absolute inset-0 bg-linear-to-r from-surface-950/90 via-surface-950/55 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-14 lg:px-16">
            <div className="max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">{imageBanner.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                {imageBanner.heading} <span className="gradient-brand-text">{imageBanner.headingHighlight}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/80 sm:text-base">{imageBanner.body}</p>
              <Link href={imageBanner.cta.href} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/18 hover:border-white/25">
                {imageBanner.cta.label} <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* Cards section header */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{cardsSection.eyebrow}</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
          {cardsSection.heading} <span className="gradient-text">{cardsSection.headingHighlight}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{cardsSection.subheading}</p>
      </section>

      {/* Solution cards */}
      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:pb-24" aria-label="Our lead generation solutions">
        {solutions.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, i) => <SolutionCard key={solution.slug} solution={solution} index={i} />)}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center"><p className="text-sm text-slate-400">No solutions published yet.</p></div>
        )}
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* How it works */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[500px] -translate-y-1/2 rounded-full bg-brand-600/6 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">{howItWorks.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {howItWorks.heading} <span className="gradient-brand-text">{howItWorks.headingHighlight}</span>{" "}{howItWorks.headingEnd}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{howItWorks.subheading}</p>
              <div className="mt-10">
                {howItWorks.steps.map((step, i) => {
                  const Icon = STEP_ICONS[step.iconName] ?? LuUsers;
                  return (
                    <ProcessStep key={step.num} num={step.num} icon={Icon} title={step.title} body={step.body}
                      isLast={i === howItWorks.steps.length - 1} />
                  );
                })}
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-black/40">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{howItWorks.checklist.heading}</p>
              <ul className="space-y-4">
                {howItWorks.checklist.items.map(({ iconName, text, highlight }) => {
                  const Icon = CHECKLIST_ICONS[iconName] ?? LuShieldCheck;
                  return (
                    <li key={text} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${highlight ? "bg-brand-500/20" : "bg-white/5"}`}>
                        <Icon className={`h-3 w-3 ${highlight ? "text-brand-400" : "text-slate-500"}`} aria-hidden="true" />
                      </span>
                      <span className={`text-sm leading-snug ${highlight ? "font-semibold text-white" : "text-slate-400"}`}>{text}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 border-t border-white/8 pt-6">
                <Link href={howItWorks.checklist.cta.href} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-500 glow-blue">
                  {howItWorks.checklist.cta.label} <LuArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="mt-3 text-center text-[11px] text-slate-600">{howItWorks.checklist.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* Proof stats */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{proofStats.eyebrow}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofStats.items.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/30">
                <p className="text-4xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-600">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuSun, LuHammer, LuShield, LuCar, LuScale, LuHeartPulse,
  LuChevronRight,
  LuShieldCheck, LuZap, LuTarget, LuTrendingUp, LuUsers, LuCircleCheck,
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

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
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
// JSON-LD structured data (built from data file)
// ---------------------------------------------------------------------------
function JsonLd() {
  const { industryList, faqSection } = industriesPageData;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lead Generation Industries — Lead4s",
    description: "Exclusive, TCPA-compliant lead generation programs across six core US consumer acquisition verticals.",
    numberOfItems: industryList.length,
    itemListElement: industryList.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSection.items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",       item: `${SITE_URL}/`          },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
    ],
  };

  return (
    <>
      <script type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Color system (Tailwind classes must be full strings — no dynamic assembly)
// ---------------------------------------------------------------------------
const ACCENT_MAP = {
  amber: {
    zoneBg: "from-amber-500/18 via-amber-400/6 to-transparent", borderIdle: "border-amber-500/15",
    borderHover: "hover:border-amber-400/55", barFrom: "from-amber-400", barVia: "via-amber-300/70",
    text: "text-amber-400", textLight: "text-amber-300", tagBg: "bg-amber-500/10",
    tagBorder: "border-amber-500/25", tagText: "text-amber-300", statBg: "bg-amber-500/10",
    statBorder: "border-amber-400/20", glow: "rgba(245,158,11,0.18)", iconBg: "bg-amber-500/12",
    iconRing: "ring-amber-400/20", arrowBg: "bg-amber-500/12 hover:bg-amber-500/22", arrowBorder: "border-amber-400/25",
  },
  emerald: {
    zoneBg: "from-emerald-500/18 via-emerald-400/6 to-transparent", borderIdle: "border-emerald-500/15",
    borderHover: "hover:border-emerald-400/55", barFrom: "from-emerald-400", barVia: "via-emerald-300/70",
    text: "text-emerald-400", textLight: "text-emerald-300", tagBg: "bg-emerald-500/10",
    tagBorder: "border-emerald-500/25", tagText: "text-emerald-300", statBg: "bg-emerald-500/10",
    statBorder: "border-emerald-400/20", glow: "rgba(16,185,129,0.18)", iconBg: "bg-emerald-500/12",
    iconRing: "ring-emerald-400/20", arrowBg: "bg-emerald-500/12 hover:bg-emerald-500/22", arrowBorder: "border-emerald-400/25",
  },
  violet: {
    zoneBg: "from-violet-500/18 via-violet-400/6 to-transparent", borderIdle: "border-violet-500/15",
    borderHover: "hover:border-violet-400/55", barFrom: "from-violet-400", barVia: "via-violet-300/70",
    text: "text-violet-400", textLight: "text-violet-300", tagBg: "bg-violet-500/10",
    tagBorder: "border-violet-500/25", tagText: "text-violet-300", statBg: "bg-violet-500/10",
    statBorder: "border-violet-400/20", glow: "rgba(139,92,246,0.18)", iconBg: "bg-violet-500/12",
    iconRing: "ring-violet-400/20", arrowBg: "bg-violet-500/12 hover:bg-violet-500/22", arrowBorder: "border-violet-400/25",
  },
  blue: {
    zoneBg: "from-blue-500/18 via-blue-400/6 to-transparent", borderIdle: "border-blue-500/15",
    borderHover: "hover:border-blue-400/55", barFrom: "from-blue-400", barVia: "via-blue-300/70",
    text: "text-blue-400", textLight: "text-blue-300", tagBg: "bg-blue-500/10",
    tagBorder: "border-blue-500/25", tagText: "text-blue-300", statBg: "bg-blue-500/10",
    statBorder: "border-blue-400/20", glow: "rgba(37,99,235,0.18)", iconBg: "bg-blue-500/12",
    iconRing: "ring-blue-400/20", arrowBg: "bg-blue-500/12 hover:bg-blue-500/22", arrowBorder: "border-blue-400/25",
  },
  red: {
    zoneBg: "from-red-500/18 via-red-400/6 to-transparent", borderIdle: "border-red-500/15",
    borderHover: "hover:border-red-400/55", barFrom: "from-red-400", barVia: "via-red-300/70",
    text: "text-red-400", textLight: "text-red-300", tagBg: "bg-red-500/10",
    tagBorder: "border-red-500/25", tagText: "text-red-300", statBg: "bg-red-500/10",
    statBorder: "border-red-400/20", glow: "rgba(239,68,68,0.18)", iconBg: "bg-red-500/12",
    iconRing: "ring-red-400/20", arrowBg: "bg-red-500/12 hover:bg-red-500/22", arrowBorder: "border-red-400/25",
  },
  teal: {
    zoneBg: "from-teal-500/18 via-teal-400/6 to-transparent", borderIdle: "border-teal-500/15",
    borderHover: "hover:border-teal-400/55", barFrom: "from-teal-400", barVia: "via-teal-300/70",
    text: "text-teal-400", textLight: "text-teal-300", tagBg: "bg-teal-500/10",
    tagBorder: "border-teal-500/25", tagText: "text-teal-300", statBg: "bg-teal-500/10",
    statBorder: "border-teal-400/20", glow: "rgba(20,184,166,0.18)", iconBg: "bg-teal-500/12",
    iconRing: "ring-teal-400/20", arrowBg: "bg-teal-500/12 hover:bg-teal-500/22", arrowBorder: "border-teal-400/25",
  },
} as const;

// Icon registry — resolved at render time
const ICON_MAP: Record<string, IconType> = {
  LuShieldCheck, LuZap, LuTarget, LuTrendingUp, LuUsers, LuCircleCheck,
};

const INDUSTRY_ICONS: Record<string, IconType> = {
  "solar-leads":               LuSun,
  "home-improvement-leads":    LuHammer,
  "final-expense-lead":        LuShield,
  "auto-insurance-leads":      LuCar,
  "mva-personal-injury-leads": LuScale,
  "medicare-o65":              LuHeartPulse,
};

function isAccentColor(v: string | null | undefined): v is AccentColor {
  return v === "amber" || v === "emerald" || v === "violet" || v === "blue" || v === "red" || v === "teal";
}

function toTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((t): t is string => typeof t === "string");
}

async function getIndustryCards(): Promise<IndustryCardData[]> {
  const rows = await db.industry.findMany({
    where: { type: "industry", isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, description: true, cardColor: true, cardTags: true, cardMetricValue: true, cardMetricLabel: true },
  });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description ?? "",
    color: isAccentColor(r.cardColor) ? r.cardColor : ((industriesPageData.colorFallbackBySlug[r.slug] as AccentColor) ?? "blue"),
    tags: toTags(r.cardTags),
    metric: { value: r.cardMetricValue ?? "", label: r.cardMetricLabel ?? "" },
  }));
}

// ---------------------------------------------------------------------------
// IndustryCard
// ---------------------------------------------------------------------------
function IndustryCard({ industry, index }: { readonly industry: IndustryCardData; readonly index: number }) {
  const accent = ACCENT_MAP[industry.color];
  const IconComponent = INDUSTRY_ICONS[industry.slug] ?? LuScale;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/industries/${industry.slug}`}
      aria-label={`Explore ${industry.title} — exclusive lead generation program`}
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
        {industry.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {industry.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`rounded-full border px-2.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.14em] ${accent.tagBg} ${accent.tagBorder} ${accent.tagText}`}>{tag}</span>
            ))}
          </div>
        )}
        <h2 className={`text-[1.1rem] font-bold leading-snug text-white transition-colors duration-300 group-hover:${accent.textLight}`}>{industry.title}</h2>
        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-400/90 line-clamp-3">{industry.description}</p>
        {industry.metric.value && (
          <div className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 ${accent.statBg} ${accent.statBorder}`}>
            <div className={`h-7 w-[3px] rounded-full ${accent.text} bg-current opacity-70`} />
            <div>
              <p className={`text-base font-black leading-none ${accent.text}`}>{industry.metric.value}</p>
              {industry.metric.label && <p className="mt-0.5 text-[11px] font-medium text-slate-500 uppercase tracking-wide">{industry.metric.label}</p>}
            </div>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">View program</span>
          <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${accent.arrowBg} ${accent.arrowBorder} transition-all duration-300 group-hover:scale-110 ${accent.text}`}>
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
// FAQ item
// ---------------------------------------------------------------------------
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details className="group border-b border-white/6 last:border-0" name="faq">
      <summary className="flex cursor-pointer select-none list-none items-start justify-between gap-4 py-5 text-sm font-semibold text-white marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950" id={`faq-${index}`}>
        <span>{q}</span>
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4 text-slate-400 transition-all duration-300 group-open:rotate-45 group-open:border-brand-400/30 group-open:text-brand-400">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" d="M6 2v8M2 6h8" /></svg>
        </span>
      </summary>
      <p className="pb-5 pr-8 text-sm leading-relaxed text-slate-400">{a}</p>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function IndustriesPage() {
  const {
    hero, sectionHeader, whySection, complianceBadges,
    industryList, faqSection, editorialCards,
  } = industriesPageData;
  const industries = await getIndustryCards();

  return (
    <>
      <JsonLd />
      <main className="min-h-screen bg-surface-950 text-white">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-0 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-slate-300 transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <LuChevronRight className="h-3 w-3" aria-hidden="true" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-slate-400" itemProp="name">Industries</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden pt-10 pb-24 lg:pt-14 lg:pb-32">
          <div className="absolute inset-0 bg-grid opacity-[0.15]" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/8 blur-[160px]" />
            <div className="absolute left-0 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-accent-500/6 blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-[250px] w-[350px] rounded-full bg-brand-400/5 blur-[100px]" />
          </div>
          <div className="pointer-events-none absolute inset-0 vignette" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/25 bg-brand-500/8 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400 shadow-lg shadow-brand-500/5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
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
                {hero.primaryCta.label}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
              <Link href={hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-bold text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white hover:bg-white/8">
                {hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-4 shadow-xl shadow-black/30">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center bg-surface-950 px-6 py-6 text-center transition-colors hover:bg-surface-900">
                  <span className="text-3xl font-black text-white sm:text-4xl">{stat.value}</span>
                  <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Cards section header */}
        <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">{sectionHeader.eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
            {sectionHeader.heading} <span className="gradient-text">{sectionHeader.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{sectionHeader.subheading}</p>
        </section>

        {/* Industry cards */}
        <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:pb-24" aria-label="Industries we serve">
          {industries.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, i) => <IndustryCard key={industry.slug} industry={industry} index={i} />)}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center"><p className="text-sm text-slate-400">No industries published yet. Check back soon.</p></div>
          )}
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Why Lead4s */}
        <section className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="why-lead4s">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/5 blur-[140px]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{whySection.eyebrow}</p>
              <h2 id="why-lead4s" className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                {whySection.heading} <span className="gradient-brand-text">{whySection.headingHighlight}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{whySection.subheading}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whySection.items.map((item) => {
                const Icon = ICON_MAP[item.iconName] ?? LuCircleCheck;
                return (
                  <article key={item.title} className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/25">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${item.bgClass}`}>
                      <Icon className={`h-5 w-5 ${item.colorClass}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Compliance badges */}
        <section className="relative py-14 lg:py-16" aria-label="Compliance certifications">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">Compliance &amp; trust standards every lead meets</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {complianceBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold text-slate-400 backdrop-blur-sm transition-colors hover:border-brand-400/25 hover:text-slate-300">
                  <LuCircleCheck className="h-3 w-3 text-brand-400" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Industry link index */}
        <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-label="All industry programs">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Jump to a vertical</p>
            <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Browse all lead generation programs</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industryList.map((item, i) => {
              const Icon = Object.values(INDUSTRY_ICONS)[i] ?? LuScale;
              return (
                <Link key={item.url} href={item.url} className="group flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3.5 transition-all duration-200 hover:border-brand-400/25 hover:bg-brand-500/5">
                  <Icon className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-brand-400" aria-hidden="true" />
                  <span className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                  <svg className="h-3.5 w-3.5 shrink-0 text-slate-700 transition-all group-hover:translate-x-0.5 group-hover:text-brand-400" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* FAQ */}
        <section className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="faq-heading">
          <div className="pointer-events-none absolute right-0 top-1/4 h-[300px] w-[400px] rounded-full bg-brand-600/5 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">{faqSection.eyebrow}</p>
              <h2 id="faq-heading" className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{faqSection.heading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                {faqSection.subheading}{" "}
                <Link href="/contact" className="text-brand-400 underline underline-offset-2 hover:text-brand-300">Talk to our team.</Link>
              </p>
            </div>
            <div className="glass-strong rounded-2xl px-6 py-2 shadow-xl shadow-black/30 sm:px-8">
              {faqSection.items.map((item, i) => <FaqItem key={item.q} q={item.q} a={item.a} index={i} />)}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Editorial cards */}
        <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-label="About Lead4s lead generation">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Learn more</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">About our lead generation approach</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {editorialCards.map((card) => {
              const Icon = ICON_MAP[card.iconName] ?? LuTarget;
              return (
                <article key={card.heading} className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/25">
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${card.iconBgClass}`}>
                    <Icon className={`h-5 w-5 ${card.iconColorClass}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{card.heading}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{card.body}</p>
                </article>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}

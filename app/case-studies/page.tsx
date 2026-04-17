import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import type { CaseStudyResult } from "@/types/case-study";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: "Case Studies | Lead4s",
  description:
    "Real results across lead generation verticals. Explore how Lead4s drives measurable growth for contractors, insurance teams, and legal intake operations.",
  openGraph: {
    title: "Case Studies | Lead4s",
    description:
      "Real results across lead generation verticals. See measurable outcomes from Lead4s campaigns.",
    type: "website",
    url: `${SITE_URL}/case-studies`,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default async function CaseStudiesPage() {
  const caseStudies = await db.caseStudy.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      industry: true,
      summary: true,
      results: true,
      coverImage: true,
    },
  });

  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center" aria-hidden="true">
          <div className="mt-16 h-[500px] w-[900px] rounded-full bg-violet-600/6 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
              Proven Results
            </span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Real Campaigns.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Measurable Results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Explore how Lead4s helps contractors, insurance teams, and legal intake operations scale with predictable, high-intent lead flow.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* ── Case study cards ─────────────────────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        aria-label="Case studies"
      >
        {caseStudies.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
              <svg className="h-8 w-8 text-violet-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">No case studies yet</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Case studies will appear here once published from the admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs) => {
              const results = cs.results as unknown as CaseStudyResult[];
              const topResult = results[0];

              return (
                <article
                  key={cs.slug}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[hsl(0,0%,6%)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/20"
                >
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500/60 to-blue-400/30" aria-hidden="true" />

                  {cs.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={cs.coverImage}
                        alt={cs.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,6%)] via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                        {cs.industry}
                      </span>
                      {topResult && (
                        <span className="text-xs font-semibold text-emerald-400">
                          {topResult.value}{" "}
                          <span className="font-normal text-slate-500">{topResult.label}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold leading-snug text-white">
                      {cs.title}
                    </h2>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
                      {cs.summary}
                    </p>

                    {results.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-800/80 pt-5">
                        {results.slice(0, 3).map((r) => (
                          <div key={r.label}>
                            <p className="text-base font-bold text-violet-300">{r.value}</p>
                            <p className="text-[10px] text-slate-500">{r.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 transition-all duration-200 group-hover:gap-2.5"
                        aria-label={`Read ${cs.title} case study`}
                      >
                        Read Case Study
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="h-[400px] w-[700px] rounded-full bg-violet-600/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to become{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              our next success story?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Join the brands that trust Lead4s to deliver high-intent, first-party leads at scale.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500"
            >
              Start Your Campaign
            </a>
            <Link
              href="/solutions"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

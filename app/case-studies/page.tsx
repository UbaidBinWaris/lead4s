import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/SectionWrapper";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Performance case studies across lead generation verticals powered by Lead4s.",
};

export const dynamic = "force-dynamic";

type CaseStudyView = {
  id: number | null;
  slug: string;
  title: string;
  vertical: string;
  summary: string | null;
  challenge: string;
  solution: string;
  results: string[];
  kpiLabel: string;
  kpiValue: string;
  displayOrder: number;
};

async function getCaseStudies(): Promise<CaseStudyView[]> {
  try {
    const rows = await db.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return rows.map((row: (typeof rows)[number]) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      vertical: row.vertical,
      summary: row.summary,
      challenge: row.challenge,
      solution: row.solution,
      results: row.results,
      kpiLabel: row.kpiLabel,
      kpiValue: row.kpiValue,
      displayOrder: row.displayOrder,
    }));
  } catch (error) {
    console.error("[case-studies/page]", error);
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main>
      <SectionWrapper className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-16%] h-160 w-200 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[130px]" />
          <div className="absolute right-[-7%] top-[26%] h-96 w-96 rounded-full bg-brand-500/14 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
            Case Studies
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Performance Case Studies Across Lead Generation Verticals
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore how Lead4s helps contractors, insurance teams, and legal
            intake operations scale with predictable, high-intent lead flow.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 sm:py-20">
        {caseStudies.length === 0 ? (
          <div className="rounded-3xl border border-white/12 bg-white/5 p-8 text-center">
            <h2 className="text-xl font-semibold text-white">No case studies yet</h2>
            <p className="mt-2 text-sm text-slate-300">
              Case studies will appear here as soon as published records are available in the database.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {caseStudies.map((item) => (
              <article
                key={item.slug}
                className="group rounded-3xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/35 hover:bg-white/7"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
                    {item.vertical}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-slate-300">
                    {item.kpiLabel}: {item.kpiValue}
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300">
                  {item.summary ?? item.challenge}
                </p>

                <div className="mt-5">
                  <Link
                    href={`/case-studies/${item.slug}`}
                    className="inline-flex min-h-11 items-center rounded-xl border border-white/20 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                  >
                    View full case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionWrapper>
    </main>
  );
}

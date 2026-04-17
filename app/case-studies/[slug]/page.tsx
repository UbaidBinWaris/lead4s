import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { ResultsSection } from "@/components/case-studies/ResultsSection";
import { ChallengeSection } from "@/components/case-studies/ChallengeSection";
import { SolutionSection } from "@/components/case-studies/SolutionSection";
import { SectionRenderer } from "@/components/industry/SectionRenderer";
import type { CaseStudyResult } from "@/types/case-study";
import type { IndustrySection } from "@/types/industry";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

interface CaseStudyPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await db.caseStudy.findUnique({ where: { slug } });

  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.title} | Lead4s Case Studies`,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
      type: "article",
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      images: cs.coverImage
        ? [{ url: cs.coverImage, width: 1200, height: 630, alt: cs.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.summary,
      images: cs.coverImage ? [cs.coverImage] : [],
    },
    alternates: { canonical: `${SITE_URL}/case-studies/${cs.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = await db.caseStudy.findUnique({ where: { slug } });

  if (!cs || !cs.isPublished) notFound();

  const results = cs.results as unknown as CaseStudyResult[];
  const sections = cs.content as unknown as IndustrySection[];

  return (
    <main className="min-h-screen">
      <CaseStudyHero
        title={cs.title}
        industry={cs.industry}
        summary={cs.summary}
        coverImage={cs.coverImage}
        slug={cs.slug}
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* Results shown first — maximum conversion impact */}
      <ResultsSection results={results} />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <ChallengeSection challenge={cs.challenge} />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <SolutionSection solution={cs.solution} />

      {sections.length > 0 && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
          <SectionRenderer sections={sections} />
        </>
      )}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* CTA */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="h-[400px] w-[700px] rounded-full bg-violet-600/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Want results like these{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              for your business?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Let Lead4s build a campaign tailored to your industry and goals. High-intent leads. Proven systems.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500"
            >
              Work With Us
            </a>
            <a
              href="/case-studies"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              ← All Case Studies
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

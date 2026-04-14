import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/SectionWrapper";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getCaseStudy(slug: string) {
  return db.caseStudy.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });
}

export async function generateMetadata({ params }: Readonly<PageProps>): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: Readonly<PageProps>) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      <SectionWrapper className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-16%] h-160 w-200 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[130px]" />
          <div className="absolute right-[-7%] top-[26%] h-96 w-96 rounded-full bg-brand-500/14 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
            {caseStudy.vertical}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {caseStudy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {caseStudy.kpiLabel}: {caseStudy.kpiValue}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/12 bg-white/5 p-6 sm:p-7">
            <h2 className="text-2xl font-bold tracking-tight text-white">Challenge</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {caseStudy.challenge}
            </p>
          </article>

          <article className="rounded-3xl border border-white/12 bg-white/5 p-6 sm:p-7">
            <h2 className="text-2xl font-bold tracking-tight text-white">Solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {caseStudy.solution}
            </p>
          </article>
        </div>

        <article className="mt-5 rounded-3xl border border-white/12 bg-white/5 p-6 sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-white">Outcomes</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.results.map((result) => (
              <span
                key={result}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-slate-200"
              >
                {result}
              </span>
            ))}
          </div>
        </article>
      </SectionWrapper>
    </main>
  );
}

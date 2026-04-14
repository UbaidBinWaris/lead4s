import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionWrapper } from "@/components/SectionWrapper";
import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const markdownComponents: Components = {
  h3: ({ children, ...props }) => (
    <h3 className="mt-6 text-lg font-semibold tracking-tight text-white" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-slate-300" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="space-y-3 pl-5 text-slate-200" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="list-disc marker:text-brand-300" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
};

async function getCaseStudy(slug: string) {
  return db.caseStudy.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      sections: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
}

type CaseStudyWithSections = NonNullable<Awaited<ReturnType<typeof getCaseStudy>>>;

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
    title: caseStudy.heroTitle ?? caseStudy.title,
    description: caseStudy.summary ?? caseStudy.challenge,
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
            {caseStudy.heroLabel ?? caseStudy.vertical}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {caseStudy.heroTitle ?? caseStudy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {caseStudy.heroIntro ?? caseStudy.summary ?? caseStudy.challenge}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-medium tracking-wide text-brand-200 sm:text-base">
            {caseStudy.kpiLabel}: {caseStudy.kpiValue}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:items-start">
          <div className="space-y-5">
            {caseStudy.sections.map((section: CaseStudyWithSections["sections"][number]) => (
              <article
                key={section.id}
                className="rounded-3xl border border-white/12 bg-white/5 p-6 sm:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300/90">
                  {section.sectionLabel}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">{section.title}</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {section.markdown}
                  </ReactMarkdown>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-5 lg:sticky lg:top-28">
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

            <article className="rounded-3xl border border-white/12 bg-white/5 p-6 sm:p-7">
              <h2 className="text-2xl font-bold tracking-tight text-white">Outcomes</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {caseStudy.results.map((result: string) => (
                  <span
                    key={result}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

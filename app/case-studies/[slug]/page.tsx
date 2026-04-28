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
import { getSiteUrl } from "@/lib/site";
import { DEFAULT_PAGE_IMAGE } from "@/lib/media";
import { toJsonLd } from "@/lib/utils";


const SITE_URL = getSiteUrl();

interface CaseStudyPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await db.caseStudy.findUnique({ where: { slug } });

  if (!cs) return { title: "Case Study Not Found" };

  const imageUrl = cs.coverImage ?? DEFAULT_PAGE_IMAGE;

  return {
    title: `${cs.title} | Lead4s Case Studies`,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
      type: "article",
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.summary,
      images: [imageUrl],
    },
    alternates: { canonical: `${SITE_URL}/case-studies/${cs.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = await db.caseStudy.findUnique({ where: { slug } });

  if (!cs?.isPublished) notFound();

  const results = cs.results as unknown as CaseStudyResult[];
  const sections = cs.content as unknown as IndustrySection[];
  const imageUrl = cs.coverImage ?? DEFAULT_PAGE_IMAGE;

  const faqItems = sections
    .filter((section): section is Extract<IndustrySection, { type: "faq" }> => section.type === "faq")
    .flatMap((section) => section.items);

  const jsonLdGraph: unknown[] = [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/case-studies/${cs.slug}#article`,
      headline: cs.title,
      description: cs.summary,
      image: [imageUrl],
      datePublished: cs.createdAt.toISOString(),
      dateModified: cs.updatedAt.toISOString(),
      mainEntityOfPage: `${SITE_URL}/case-studies/${cs.slug}`,
      author: {
        "@type": "Organization",
        name: "Lead4s",
      },
      publisher: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Lead4s",
      },
      articleSection: ["Case Studies", cs.industry, "Lead Generation"],
      keywords: [
        `${cs.industry} lead generation`,
        "case study",
        "lead generation results",
        "performance marketing",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/case-studies/${cs.slug}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: `${SITE_URL}/case-studies`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: cs.title,
          item: `${SITE_URL}/case-studies/${cs.slug}`,
        },
      ],
    },
  ];

  if (faqItems.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/case-studies/${cs.slug}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const caseStudyJsonLd = toJsonLd({
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  });

  return (
    <main className="min-h-screen">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: caseStudyJsonLd }} />

      <CaseStudyHero
        title={cs.title}
        industry={cs.industry}
        summary={cs.summary}
        coverImage={cs.coverImage}
        slug={cs.slug}
      />

      <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* Results shown first — maximum conversion impact */}
      <ResultsSection results={results} />

      <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

      <ChallengeSection challenge={cs.challenge} />

      <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

      <SolutionSection solution={cs.solution} />

      {sections.length > 0 && (
        <>
          <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />
          <SectionRenderer sections={sections} />
        </>
      )}

      <div className="h-px w-full bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* CTA */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="h-100 w-175 rounded-full bg-violet-600/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Want results like these{" "}
            <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              for your business?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Let Lead4s build a campaign tailored to your industry and goals. High-intent leads. Proven systems.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500"
            >
              Work With Us
            </a>
            <a
              href="/case-studies"
              className="inline-flex min-h-12 items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              ← All Case Studies
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

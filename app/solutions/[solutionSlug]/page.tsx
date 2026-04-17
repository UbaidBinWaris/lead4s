import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { SectionRenderer } from "@/components/industry/SectionRenderer";
import type { IndustrySection } from "@/types/industry";

interface SolutionPageProps {
  readonly params: Promise<{ solutionSlug: string }>;
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { solutionSlug } = await params;
  const solution = await db.industry.findFirst({
    where: { slug: solutionSlug, type: "solution" },
  });

  if (!solution) {
    return { title: "Solution Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    title: `${solution.title} | Lead4s Solutions`,
    description: solution.description ?? undefined,
    openGraph: {
      title: solution.title,
      description: solution.description ?? undefined,
      type: "website",
      url: `${siteUrl}/solutions/${solution.slug}`,
      images: solution.coverImage
        ? [{ url: solution.coverImage, width: 1200, height: 630, alt: solution.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: solution.title,
      description: solution.description ?? undefined,
      images: solution.coverImage ? [solution.coverImage] : [],
    },
    alternates: {
      canonical: `${siteUrl}/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { solutionSlug } = await params;

  const solution = await db.industry.findFirst({
    where: { slug: solutionSlug, type: "solution" },
  });

  if (!solution || !solution.isPublished) {
    notFound();
  }

  const sections = solution.content as unknown as IndustrySection[];

  return (
    <main className="min-h-screen">
      <IndustryHero
        title={solution.title}
        description={solution.description}
        coverImage={solution.coverImage}
        slug={solution.slug}
        variant="solution"
        primaryCTA={{ label: "Get Started Today", href: "/#contact" }}
        secondaryCTA={{ label: "View Case Studies", href: "/case-studies" }}
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <SectionRenderer sections={sections} />

      {/* Back to solutions */}
      <div className="border-t border-slate-800 py-10 text-center">
        <a
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Solutions
        </a>
      </div>
    </main>
  );
}

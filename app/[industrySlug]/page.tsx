import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { SectionRenderer } from "@/components/industry/SectionRenderer";
import type { IndustrySection } from "@/types/industry";

interface IndustryPageProps {
  readonly params: Promise<{ industrySlug: string }>;
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = await db.industry.findUnique({
    where: { slug: industrySlug },
  });

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lead4s.io";

  return {
    title: `${industry.title} | Lead4s`,
    description: industry.description ?? undefined,
    openGraph: {
      title: industry.title,
      description: industry.description ?? undefined,
      type: "website",
      url: `${siteUrl}/${industry.slug}`,
      images: industry.coverImage
        ? [
            {
              url: industry.coverImage,
              width: 1200,
              height: 630,
              alt: industry.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description: industry.description ?? undefined,
      images: industry.coverImage ? [industry.coverImage] : [],
    },
    alternates: {
      canonical: `${siteUrl}/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industrySlug } = await params;

  const industry = await db.industry.findUnique({
    where: { slug: industrySlug },
  });

  if (!industry || !industry.isPublished) {
    notFound();
  }

  const sections = industry.content as unknown as IndustrySection[];

  return (
    <main className="min-h-screen">
      <IndustryHero
        title={industry.title}
        description={industry.description}
        coverImage={industry.coverImage}
        slug={industry.slug}
      />

      {/* Alternating-BG divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <SectionRenderer sections={sections} />

      {/* Back to all industries */}
      <div className="border-t border-slate-800 py-10 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </a>
      </div>
    </main>
  );
}

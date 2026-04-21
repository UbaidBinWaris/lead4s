import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { toJsonLd } from "@/lib/utils";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { SectionRenderer } from "@/components/industry/SectionRenderer";
import type { FaqSection, HeroCtaSection, IndustrySection } from "@/types/industry";

interface IndustryPageProps {
  readonly params: Promise<{ industrySlug: string }>;
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = await db.industry.findFirst({
    where: { slug: industrySlug, type: "industry" },
  });

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const metaTitle = industry.metaTitle ?? `${industry.title} | Lead4s`;
  const metaDescription = industry.metaDescription ?? industry.description ?? undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `${siteUrl}/industries/${industry.slug}`,
      images: industry.coverImage
        ? [{ url: industry.coverImage, width: 1200, height: 630, alt: industry.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: industry.coverImage ? [industry.coverImage] : [],
    },
    alternates: {
      canonical: `${siteUrl}/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industrySlug } = await params;

  const industry = await db.industry.findFirst({
    where: { slug: industrySlug, type: "industry" },
  });

  if (!industry || !industry.isPublished) {
    notFound();
  }

  const sections = industry.content as unknown as IndustrySection[];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const heroCta = sections.find((s): s is HeroCtaSection => s.type === "hero-cta");
  const faqSection = sections.find((s): s is FaqSection => s.type === "faq");

  const breadcrumbJsonLd = toJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` },
      { "@type": "ListItem", position: 3, name: industry.title, item: `${siteUrl}/industries/${industry.slug}` },
    ],
  });

  const faqJsonLd = faqSection?.items.length
    ? toJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSection.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      })
    : null;

  return (
    <main className="min-h-screen">
      {/* Structured data — content is server-serialized and </script>-escaped via toJsonLd() */}
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      {faqJsonLd && (
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      )}

      <IndustryHero
        title={industry.title}
        description={industry.description}
        coverImage={industry.coverImage}
        slug={industry.slug}
        variant="industry"
        primaryCTA={heroCta ? { label: heroCta.primaryLabel, href: heroCta.primaryHref } : undefined}
        secondaryCTA={
          heroCta?.secondaryLabel
            ? { label: heroCta.secondaryLabel, href: heroCta.secondaryHref ?? "#" }
            : undefined
        }
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <SectionRenderer sections={sections} />

      <div className="border-t border-slate-800 py-10 text-center">
        <a
          href="/industries"
          className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors hover:text-blue-300"
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
          Back to Industries
        </a>
      </div>
    </main>
  );
}

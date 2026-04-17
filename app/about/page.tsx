import type { Metadata } from "next";
import { Hero } from "@/components/about/Hero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Services } from "@/components/about/Services";
import { Infrastructure } from "@/components/about/Infrastructure";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { Compliance } from "@/components/about/Compliance";
import { Industries } from "@/components/about/Industries";
import { Results } from "@/components/about/Results";
import { Team } from "@/components/about/Team";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { aboutData } from "@/data/about";
import { db } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: "About Lead4s | Performance Lead Generation Network",
  description:
    "Learn how Lead4s delivers high-intent, first-party leads to growth teams nationwide. Enterprise-grade infrastructure, compliance-first operations, 98% partner retention.",
  keywords: [
    "lead generation",
    "B2B leads",
    "performance marketing",
    "TCPA compliant",
    "customer acquisition",
  ],
  openGraph: {
    title: "About Lead4s",
    description:
      "Powering high-intent customer acquisition at scale. First-party leads, verified consumers, proven results.",
    type: "website",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Lead4s",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Lead4s",
    description:
      "Powering high-intent customer acquisition. First-party leads, verified consumers, proven results.",
    images: [`${SITE_URL}/og.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getTeamData() {
  try {
    const members = await db.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    });

    if (members.length === 0) {
      return aboutData.team;
    }

    return {
      ...aboutData.team,
      members: members.map((member) => ({
        name: member.name,
        role: member.role,
        bio: member.bio,
        initials: member.initials,
        gradient: member.gradient,
        linkedin: member.linkedin,
        twitter: member.twitter,
      })),
    };
  } catch {
    return aboutData.team;
  }
}

export default async function AboutPage() {
  const teamData = await getTeamData();

  return (
    <main className="min-h-full">
      {/* Hero */}
      <Hero data={aboutData.hero} />

      {/* Who We Are */}
      <WhoWeAre data={aboutData.whoWeAre} />

      {/* What We Do / Services */}
      <Services data={aboutData.whatWeDo} />

      {/* Infrastructure */}
      <Infrastructure data={aboutData.infrastructure} />

      {/* Results / Stats */}
      <Results data={aboutData.results} />

      {/* Mission & Vision */}
      <MissionVision data={aboutData.missionVision} />

      {/* Why Choose Us */}
      <WhyChooseUs data={aboutData.whyChooseUs} />

      {/* Compliance */}
      <Compliance data={aboutData.compliance} />

      {/* Industries */}
      <Industries data={aboutData.industries} />

      {/* Team */}
      <Team data={teamData} />

      {/* CTA Banner (global, not part of About section) */}
      <CtaBanner />
    </main>
  );
}

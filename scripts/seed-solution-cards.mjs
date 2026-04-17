// @ts-check
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const solutionCards = [
  {
    slug: "exclusive-leads-cpl-model",
    title: "Exclusive Leads (CPL Model)",
    description:
      "Pay only for verified leads that meet your exact criteria. No shared pools, no retainers, no wasted spend. Every lead is yours exclusively - delivered real-time with full data transparency.",
    cardColor: "blue",
    cardTags: ["Cost Per Lead", "Exclusive", "Real-Time"],
    cardMetricValue: "0 shared",
    cardMetricLabel: "leads - 100% exclusive",
    cardBenefit: "Fixed cost-per-acquisition",
  },
  {
    slug: "live-transfer-calls",
    title: "Live Transfer Calls",
    description:
      "Pre-qualified consumers transferred live to your agents the moment they express buying intent. Our agents do the qualification; your team focuses entirely on closing.",
    cardColor: "emerald",
    cardTags: ["Warm Transfer", "Pre-Qualified", "TCPA Compliant"],
    cardMetricValue: "5-10x",
    cardMetricLabel: "higher conversion vs cold",
    cardBenefit: "Your closers close - we handle the rest",
  },
  {
    slug: "appointment-setting",
    title: "Appointment Setting",
    description:
      "We fill your calendar with confirmed, decision-maker appointments. Multi-channel outreach, CRM sync, and automated reminders keep your no-show rate under 15%.",
    cardColor: "violet",
    cardTags: ["Calendar Filling", "Multi-Channel", "CRM Sync"],
    cardMetricValue: "<15%",
    cardMetricLabel: "average no-show rate",
    cardBenefit: "Full calendar without hiring SDRs",
  },
  {
    slug: "bpo-call-center-services",
    title: "BPO & Call Center Services",
    description:
      "A fully staffed, trained, and compliant call center extension of your team - inbound, outbound, or blended. Scale up or down with 48-hour notice, zero overhead.",
    cardColor: "amber",
    cardTags: ["Inbound", "Outbound", "24/7 Available"],
    cardMetricValue: "48hr",
    cardMetricLabel: "to full operational capacity",
    cardBenefit: "Enterprise operations without enterprise cost",
  },
  {
    slug: "ppc-campaign-management",
    title: "PPC Campaign Management",
    description:
      "Data-driven paid search and social campaigns optimized for cost-per-acquisition - not vanity clicks. We manage Google, Meta, Microsoft, and TikTok with full transparency.",
    cardColor: "indigo",
    cardTags: ["Google Ads", "Meta", "CPA Optimized"],
    cardMetricValue: "Full",
    cardMetricLabel: "cross-channel attribution",
    cardBenefit: "Every dollar tracked to revenue",
  },
];

async function main() {
  console.log("Seeding solution listing cards...");

  for (const [index, card] of solutionCards.entries()) {
    await db.industry.upsert({
      where: { slug: card.slug },
      update: {
        title: card.title,
        description: card.description,
        type: "solution",
        isPublished: true,
        displayOrder: index + 1,
        cardColor: card.cardColor,
        cardTags: card.cardTags,
        cardMetricValue: card.cardMetricValue,
        cardMetricLabel: card.cardMetricLabel,
        cardBenefit: card.cardBenefit,
      },
      create: {
        title: card.title,
        slug: card.slug,
        description: card.description,
        type: "solution",
        isPublished: true,
        displayOrder: index + 1,
        content: [],
        cardColor: card.cardColor,
        cardTags: card.cardTags,
        cardMetricValue: card.cardMetricValue,
        cardMetricLabel: card.cardMetricLabel,
        cardBenefit: card.cardBenefit,
      },
    });

    console.log(`  Upserted: ${card.slug}`);
  }

  console.log("Solution listing card seed complete.");
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await db.$disconnect();
}

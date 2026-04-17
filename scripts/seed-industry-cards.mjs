// @ts-check
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const industryCards = [
  {
    slug: "solar-leads",
    title: "Solar Leads & Live Transfers",
    description:
      "Homeowner-verified solar leads with real-time roof-ownership and utility-bill qualification. We deliver pre-screened, high-intent prospects ready to hear your offer - not recycled cold lists.",
    cardColor: "amber",
    cardTags: ["Homeowners", "CPL Model", "Live Transfer"],
    cardMetricValue: "$0 wasted",
    cardMetricLabel: "on unverified contacts",
  },
  {
    slug: "home-improvement-leads",
    title: "Home Improvement Leads",
    description:
      "Roofing, windows, HVAC, siding, and remodeling leads sourced from homeowners actively seeking contractors. Geo-targeted, ownership-verified, and delivered to your CRM in real time.",
    cardColor: "emerald",
    cardTags: ["Roofing", "HVAC", "Windows", "Remodeling"],
    cardMetricValue: "48hr",
    cardMetricLabel: "average delivery window",
  },
  {
    slug: "final-expense-lead",
    title: "Final Expense Leads",
    description:
      "Aged 50-80 consumers who have expressed interest in final expense and life insurance coverage. All leads are consent-verified under TCPA guidelines with real-time DNC scrubbing applied.",
    cardColor: "violet",
    cardTags: ["Ages 50-80", "TCPA Verified", "Final Expense"],
    cardMetricValue: "100%",
    cardMetricLabel: "exclusive - never shared",
  },
  {
    slug: "auto-insurance-leads",
    title: "Auto Insurance Leads",
    description:
      "Drivers actively shopping for new auto coverage, delivered in under 60 seconds from point of capture. Filter by state, vehicle type, current carrier, and desired coverage tier.",
    cardColor: "blue",
    cardTags: ["Auto", "P&C", "Inbound Intent"],
    cardMetricValue: "<60s",
    cardMetricLabel: "lead delivery time",
  },
  {
    slug: "mva-personal-injury-leads",
    title: "MVA & Personal Injury Leads",
    description:
      "Motor vehicle accident victims actively seeking legal representation. Leads are screened for accident recency, fault determination, and injury severity before reaching your intake team.",
    cardColor: "red",
    cardTags: ["MVA", "Personal Injury", "Legal"],
    cardMetricValue: "3-step",
    cardMetricLabel: "pre-qualification process",
  },
  {
    slug: "medicare-o65",
    title: "Medicare O65 Leads",
    description:
      "Adults 64+ approaching Medicare eligibility or actively shopping for Advantage, Supplement, or Part D plans. CMS-compliant lead generation with verified consent and benefit-year targeting.",
    cardColor: "teal",
    cardTags: ["Medicare", "AEP / OEP", "CMS Compliant"],
    cardMetricValue: "CMS",
    cardMetricLabel: "fully compliant process",
  },
];

async function main() {
  console.log("Seeding industry listing cards...");

  for (const [index, card] of industryCards.entries()) {
    await db.industry.upsert({
      where: { slug: card.slug },
      update: {
        title: card.title,
        description: card.description,
        type: "industry",
        isPublished: true,
        displayOrder: index + 1,
        cardColor: card.cardColor,
        cardTags: card.cardTags,
        cardMetricValue: card.cardMetricValue,
        cardMetricLabel: card.cardMetricLabel,
      },
      create: {
        title: card.title,
        slug: card.slug,
        description: card.description,
        type: "industry",
        isPublished: true,
        displayOrder: index + 1,
        content: [],
        cardColor: card.cardColor,
        cardTags: card.cardTags,
        cardMetricValue: card.cardMetricValue,
        cardMetricLabel: card.cardMetricLabel,
      },
    });

    console.log(`  Upserted: ${card.slug}`);
  }

  console.log("Industry listing card seed complete.");
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await db.$disconnect();
}

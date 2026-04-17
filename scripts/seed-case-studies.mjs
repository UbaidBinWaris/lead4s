import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const caseStudySeedData = [
  {
    slug: "solar-qualified-live-transfers",
    title: "Scaling Qualified Solar Live Transfers",
    industry: "Solar",
    summary:
      "Lead4s helped a regional installer scale high-intent solar calls while maintaining qualification quality.",
    challenge:
      "A regional installer needed consistent, high-intent call volume without sacrificing qualification quality.",
    solution:
      "Lead4s deployed intent-based funnels, compliance-aware qualification, and schedule-optimized transfer routing.",
    results: [
      { label: "Leads Generated", value: "3,200+" },
      { label: "Response Time", value: "< 30s" },
      { label: "Qualified Stability", value: "92%" },
    ],
    displayOrder: 1,
    content: [
      {
        type: "text",
        title: "Process / Strategy",
        content:
          "Lead4s used intent-based acquisition plus compliance-aware qualification and routing to maximize close-ready conversations.",
      },
    ],
  },
  {
    slug: "home-improvement-exclusive-leads",
    title: "Home Improvement Exclusive Lead Quality Lift",
    industry: "Home Improvement",
    summary:
      "Lead4s improved lead quality for home improvement partners by shifting campaigns to exclusive acquisition flows.",
    challenge:
      "Contractor partners were dealing with mixed-quality leads, duplicate competition, and wasted sales effort.",
    solution:
      "Lead4s restructured campaigns around exclusive CPL delivery, stronger pre-qualification, and source-level optimization.",
    results: [
      { label: "Match Rate", value: "2.1x" },
      { label: "Duplicate Reduction", value: "High" },
      { label: "Booking Efficiency", value: "Improved" },
    ],
    displayOrder: 2,
    content: [],
  },
  {
    slug: "final-expense-compliance-focused-growth",
    title: "Final Expense Growth With Compliance Controls",
    industry: "Final Expense",
    summary:
      "Lead4s helped a final expense partner scale demand while preserving consent traceability and documentation quality.",
    challenge:
      "The partner needed more volume but could not compromise on documentation quality or outreach governance.",
    solution:
      "Lead4s deployed compliant acquisition paths, verification checkpoints, and documentation-ready lead records.",
    results: [
      { label: "Consent Coverage", value: ">95%" },
      { label: "Audit Readiness", value: "Improved" },
      { label: "Partner Trust", value: "Higher" },
    ],
    displayOrder: 3,
    content: [],
  },
  {
    slug: "auto-insurance-high-intent-inquiries",
    title: "Auto Insurance Inquiry Quality Optimization",
    industry: "Auto Insurance",
    summary:
      "Lead4s improved inquiry quality for auto insurance buyers by filtering lower-fit traffic and raising conversion-ready submission share.",
    challenge:
      "Low-intent submissions were reducing sales efficiency and making CPL performance inconsistent.",
    solution:
      "Lead4s refined audience targeting, intent gating, and landing flow friction controls.",
    results: [
      { label: "Qualified Inquiry Lift", value: "+47%" },
      { label: "Sales Efficiency", value: "Improved" },
      { label: "CPL Predictability", value: "Higher" },
    ],
    displayOrder: 4,
    content: [],
  },
  {
    slug: "personal-injury-case-intake-improvement",
    title: "Personal Injury Intake Pipeline Improvement",
    industry: "MVA & Personal Injury",
    summary:
      "Lead4s helped a legal intake operation improve consultation readiness and reduce non-qualified burden.",
    challenge:
      "The intake team needed stronger lead intent signals to improve consultation scheduling and reduce wasted reviews.",
    solution:
      "Lead4s aligned ad messaging with intake criteria, tightened form logic, and improved handoff data context.",
    results: [
      { label: "Consultation Readiness", value: "+39%" },
      { label: "Triage Speed", value: "Faster" },
      { label: "Waste Reduction", value: "Improved" },
    ],
    displayOrder: 5,
    content: [],
  },
  {
    slug: "medicare-o65-predictable-volume",
    title: "Medicare O65 Volume Stabilization",
    industry: "Medicare O65",
    summary:
      "Lead4s stabilized weekly Medicare O65 delivery with pacing controls and continuous quality calibration.",
    challenge:
      "Lead supply volatility and inconsistent intent quality made planning difficult for the buyer.",
    solution:
      "Lead4s introduced source balancing, pacing controls, and ongoing quality calibration loops.",
    results: [
      { label: "Weekly Stability", value: "88%" },
      { label: "Capacity Alignment", value: "Improved" },
      { label: "Conversion Consistency", value: "Higher" },
    ],
    displayOrder: 6,
    content: [],
  },
];

async function main() {
  for (const seed of caseStudySeedData) {
    await prisma.caseStudy.upsert({
      where: { slug: seed.slug },
      update: {
        title: seed.title,
        industry: seed.industry,
        summary: seed.summary,
        challenge: seed.challenge,
        solution: seed.solution,
        results: seed.results,
        content: seed.content,
        displayOrder: seed.displayOrder,
        isPublished: true,
      },
      create: {
        slug: seed.slug,
        title: seed.title,
        industry: seed.industry,
        summary: seed.summary,
        challenge: seed.challenge,
        solution: seed.solution,
        results: seed.results,
        content: seed.content,
        displayOrder: seed.displayOrder,
        isPublished: true,
      },
    });
  }

  console.log("Case studies seeded successfully.");
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

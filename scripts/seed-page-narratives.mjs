import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const industriesNarrative = {
  storytellingSection: {
    eyebrow: "Story Behind The Results",
    heading: "How buyers go from",
    headingHighlight: "lead chaos to predictable growth",
    subheading:
      "Most teams come to Lead4s after dealing with inconsistent lead quality, slow routing, and poor compliance visibility. This is the production framework we run to stabilize and scale each vertical.",
    steps: [
      {
        phase: "Phase 01",
        title: "Diagnose Revenue Leakage",
        body: "We map where your current funnel is losing value: low-intent sources, delayed handoff, mismatched geo targeting, and duplicated lead exposure. This creates a baseline before any scale decision.",
        kpi: "Baseline conversion clarity",
      },
      {
        phase: "Phase 02",
        title: "Rebuild Vertical-Specific Funnel Logic",
        body: "Each industry gets a custom acquisition blueprint with its own qualification gates, compliance controls, and delivery rules. Solar is not Medicare, and legal intake is not home services.",
        kpi: "Higher lead-fit accuracy",
      },
      {
        phase: "Phase 03",
        title: "Launch Controlled Scale",
        body: "Campaigns launch in controlled volume bands with real-time QA, source scoring, and routing SLAs. Volume only increases after quality and contactability thresholds hold.",
        kpi: "Stable weekly delivery",
      },
      {
        phase: "Phase 04",
        title: "Compound Performance With Weekly Optimization",
        body: "We run a recurring optimization cadence across media, qualification, and conversion feedback. This turns short-term wins into long-term acquisition infrastructure.",
        kpi: "Compounding ROI",
      },
    ],
  },
  seoLinkClusters: {
    eyebrow: "Resource Clusters",
    heading: "Strategic pages for serious buyers",
    subheading:
      "Use these pathways to evaluate vertical fit, delivery models, compliance posture, and real campaign outcomes before you launch.",
    groups: [
      {
        title: "Industry Programs",
        links: [
          {
            label: "Solar Leads and Live Transfers",
            href: "/industries/solar-leads",
            description: "High-intent homeowner acquisition with real-time transfer routing.",
          },
          {
            label: "Home Improvement Leads",
            href: "/industries/home-improvement-leads",
            description: "Exclusive contractor lead flows for roofing, HVAC, and remodeling teams.",
          },
          {
            label: "MVA and Personal Injury Leads",
            href: "/industries/mva-personal-injury-leads",
            description: "Case-intent intake campaigns for law firms and legal operators.",
          },
        ],
      },
      {
        title: "Solutions and Operating Models",
        links: [
          {
            label: "Exclusive CPL Lead Model",
            href: "/solutions/exclusive-leads-cpl-model",
            description: "Single-buyer lead delivery for better conversion ownership.",
          },
          {
            label: "Live Transfer Calls",
            href: "/solutions/live-transfer-calls",
            description: "Immediate buyer conversations while intent is strongest.",
          },
          {
            label: "Appointment Setting",
            href: "/solutions/appointment-setting",
            description: "Qualified meeting pipelines built for close-rate efficiency.",
          },
        ],
      },
      {
        title: "Proof and Playbooks",
        links: [
          {
            label: "Lead Generation Case Studies",
            href: "/case-studies",
            description: "Performance outcomes from real vertical campaigns.",
          },
          {
            label: "TCPA Compliance Checklist",
            href: "/blog/tcpa-compliance-checklist-for-lead-generation",
            description: "Consent governance controls for production lead operations.",
          },
          {
            label: "Auto Insurance CPL Optimization Guide",
            href: "/blog/auto-insurance-lead-generation-cpl-optimization",
            description: "Improve inquiry quality without sacrificing acquisition economics.",
          },
        ],
      },
    ],
  },
};

const solutionsNarrative = {
  storytellingSection: {
    eyebrow: "Story Behind The Solutions",
    heading: "How teams turn scattered lead ops into",
    headingHighlight: "a conversion system",
    subheading:
      "Most buyers do not need more channels. They need the right operating model. This is the framework Lead4s uses to move from unpredictable lead flow to measurable revenue velocity.",
    steps: [
      {
        phase: "Phase 01",
        title: "Map Revenue Constraints",
        body: "We identify where performance breaks: low-intent volume, delayed first response, weak qualification gates, and unclear compliance ownership.",
        kpi: "Operational baseline",
      },
      {
        phase: "Phase 02",
        title: "Select Delivery Architecture",
        body: "We align your team to the right model mix: exclusive CPL, live transfers, appointment setting, BPO support, or paid media management.",
        kpi: "Model-to-team fit",
      },
      {
        phase: "Phase 03",
        title: "Launch With Control Gates",
        body: "Programs launch in controlled bands with quality scoring, consent checks, and real-time routing rules to protect close rates while scaling.",
        kpi: "Predictable quality",
      },
      {
        phase: "Phase 04",
        title: "Compound Weekly Performance",
        body: "We optimize source mix, qualification logic, and routing windows each week so acquisition costs stabilize while conversion output climbs.",
        kpi: "Compounding ROI",
      },
    ],
  },
  seoLinkClusters: {
    eyebrow: "Resource Clusters",
    heading: "Compare models, proof, and execution paths",
    subheading:
      "Use these internal pathways to evaluate solution fit, industry alignment, and campaign outcomes before expanding spend.",
    groups: [
      {
        title: "Solution Deep Dives",
        links: [
          {
            label: "Exclusive CPL Lead Model",
            href: "/solutions/exclusive-leads-cpl-model",
            description: "Single-buyer delivery designed for conversion ownership and cleaner attribution.",
          },
          {
            label: "Live Transfer Calls",
            href: "/solutions/live-transfer-calls",
            description: "Immediate handoff to agents while buyer intent is strongest.",
          },
          {
            label: "Appointment Setting",
            href: "/solutions/appointment-setting",
            description: "Qualified meeting pipelines built to protect sales team capacity.",
          },
        ],
      },
      {
        title: "Industry Alignment",
        links: [
          {
            label: "Solar Lead Program",
            href: "/industries/solar-leads",
            description: "High-intent homeowner acquisition for installer and dealer teams.",
          },
          {
            label: "Auto Insurance Leads",
            href: "/industries/auto-insurance-leads",
            description: "Quote-intent acquisition flows with strict compliance controls.",
          },
          {
            label: "Medicare O65 Campaigns",
            href: "/industries/medicare-o65",
            description: "Lifecycle-aware senior acquisition with enrollment-season readiness.",
          },
        ],
      },
      {
        title: "Proof and Planning",
        links: [
          {
            label: "Lead Generation Case Studies",
            href: "/case-studies",
            description: "Production examples showing delivery volume, quality, and ROI lift.",
          },
          {
            label: "Lead Generation Blog",
            href: "/blog",
            description: "Playbooks on CPL economics, compliance, and conversion operations.",
          },
          {
            label: "Book Strategy Consultation",
            href: "/contact",
            description: "Review your current funnel and get a fit-based model recommendation.",
          },
        ],
      },
    ],
  },
};

async function main() {
  console.log("📦 Seeding page-level storytelling narratives...");

  await prisma.page.upsert({
    where: { slug: "industries" },
    update: {
      title: "Industries We Serve",
      metaTitle: "Industries We Serve | Lead4s — Exclusive Lead Generation",
      metaDescription:
        "Lead4s delivers exclusive, TCPA-compliant leads across solar, home improvement, insurance, legal, and Medicare verticals.",
      content: industriesNarrative,
      isPublished: true,
    },
    create: {
      slug: "industries",
      title: "Industries We Serve",
      metaTitle: "Industries We Serve | Lead4s — Exclusive Lead Generation",
      metaDescription:
        "Lead4s delivers exclusive, TCPA-compliant leads across solar, home improvement, insurance, legal, and Medicare verticals.",
      content: industriesNarrative,
      isPublished: true,
    },
  });

  await prisma.page.upsert({
    where: { slug: "solutions" },
    update: {
      title: "Lead Generation Solutions",
      metaTitle: "Lead Generation Solutions | Lead4s — CPL, Live Transfers & More",
      metaDescription:
        "Explore Lead4s lead generation solutions: exclusive CPL leads, live transfer calls, appointment setting, BPO services, and PPC campaign management.",
      content: solutionsNarrative,
      isPublished: true,
    },
    create: {
      slug: "solutions",
      title: "Lead Generation Solutions",
      metaTitle: "Lead Generation Solutions | Lead4s — CPL, Live Transfers & More",
      metaDescription:
        "Explore Lead4s lead generation solutions: exclusive CPL leads, live transfer calls, appointment setting, BPO services, and PPC campaign management.",
      content: solutionsNarrative,
      isPublished: true,
    },
  });

  console.log("✅ Narrative seed complete.");
}

try {
  await main();
} catch (error) {
  console.error("❌ Narrative seed failed:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const caseStudySeedData = [
  {
    slug: "solar-lead-generation-case-study",
    title: "How We Generated 3,200 Solar Leads in 30 Days for Installation Companies",
    vertical: "Solar",
    summary:
      "Lead4s partnered with solar installation companies to scale compliant homeowner acquisition across competitive U.S. markets with exclusive leads and live transfers.",
    heroLabel: "Solar Lead Generation Case Study",
    heroTitle: "How We Generated 3,200 Solar Leads in 30 Days for Installation Companies",
    heroIntro:
      "Lead4s partnered with multiple solar installation companies seeking to expand customer acquisition across competitive markets. By deploying a multi-channel performance marketing strategy, we generated thousands of high-intent homeowner inquiries while maintaining quality and compliance standards.",
    challenge:
      "Solar companies faced rising acquisition costs, inconsistent lead quality, shared-lead competition, and appointment gaps for sales teams.",
    solution:
      "Lead4s deployed multi-channel acquisition, optimized landing funnels, real-time CRM delivery, live transfers, and compliance-first documentation across multiple markets.",
    results: [
      "3,200 exclusive solar leads generated",
      "4 high-demand solar markets targeted",
      "Average lead response time under 30 seconds",
      "Improved appointment booking rate for installers",
    ],
    kpiLabel: "30-Day Lead Volume",
    kpiValue: "3,200 exclusive solar leads",
    displayOrder: 1,
    sections: [
      {
        sectionLabel: "Campaign Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `Lead4s partnered with multiple solar installation companies seeking to expand their customer acquisition across competitive markets. This campaign focused on creating predictable, compliant, and high-intent lead flow for installers ready to scale.

- **Industry:** Solar Installation
- **Campaign Duration:** 30 Days
- **Lead Type:** Exclusive Solar Leads and Live Transfers
- **Target Markets:** Multiple U.S. States
- **Delivery Method:** Real-Time CRM Integration`,
      },
      {
        sectionLabel: "Results",
        title: "Results",
        displayOrder: 2,
        markdown: `Within the first 30 days of launch, the campaign delivered strong performance for solar partners looking to grow project pipeline efficiently.

- **3,200 Exclusive Solar Leads Generated**
- **4 High-Demand Solar Markets Targeted**
- **Average Lead Response Time Under 30 Seconds**
- **Increased Appointment Booking Rate for Installers**

These campaigns focused on connecting homeowners actively researching solar energy solutions with installation companies ready to provide consultations and quotes.`,
      },
      {
        sectionLabel: "The Challenge",
        title: "The Challenge",
        displayOrder: 3,
        markdown: `Solar companies operate in highly competitive markets where customer acquisition costs continue to rise. Many installers rely on shared lead marketplaces or expensive advertising platforms that produce inconsistent lead flow.

Common challenges faced by our partners included:

- Shared leads sold to multiple installers
- Unqualified homeowners wasting sales resources
- Rising advertising costs with unpredictable results
- Difficulty scaling campaigns across multiple markets
- Sales teams experiencing gaps in appointment scheduling`,
      },
      {
        sectionLabel: "Our Strategy",
        title: "Our Strategy",
        displayOrder: 4,
        markdown: `Lead4s implemented a multi-channel performance marketing strategy designed to capture homeowners actively researching solar energy solutions.

### Acquisition Channels

- Search-driven lead capture campaigns
- Native advertising platforms
- Social media lead generation campaigns
- Optimized landing funnels for solar consultations

These campaigns were designed to reach homeowners actively searching for solar quotes, installation services, and energy savings solutions.`,
      },
      {
        sectionLabel: "Campaign Execution",
        title: "Campaign Execution",
        displayOrder: 5,
        markdown: `To ensure high-quality lead generation and consistent volume, our team built dedicated campaign infrastructure focused on conversion and compliance.

### Optimized Landing Pages

These campaign pages were designed to match homeowner intent, improve conversion rates, and support stronger lead qualification.

### Lead Qualification Process

Homeowners were filtered through qualification steps to ensure they matched the installer's target service areas and project interest.

### Real-Time Lead Delivery

All leads were delivered directly to partner CRMs through real-time API integrations.

### Live Transfer Calls

Homeowners requesting immediate consultation were connected directly with solar sales teams.

### Compliance Framework

All leads included TrustedForm and consent documentation to support regulatory compliance and clearer lead provenance.`,
      },
      {
        sectionLabel: "Key Takeaways",
        title: "Key Takeaways",
        displayOrder: 6,
        markdown: `This campaign demonstrates how structured lead acquisition infrastructure can significantly improve customer acquisition for solar companies.

Key factors contributing to success included:

- Multi-channel traffic acquisition
- Optimized lead capture funnels
- Exclusive lead delivery models
- Real-time CRM integration
- Compliance-focused lead documentation

By combining these elements, Lead4s helped solar installation companies maintain consistent homeowner demand while optimizing marketing performance.`,
      },
    ],
  },
  {
    slug: "home-improvement-exclusive-leads",
    title: "Home Improvement Exclusive Lead Quality Lift",
    vertical: "Home Improvement",
    summary:
      "Lead4s improved lead quality for home improvement partners by shifting campaigns to exclusive, high-intent acquisition flows.",
    heroLabel: "Home Improvement Case Study",
    heroTitle: "Home Improvement Exclusive Lead Quality Lift",
    heroIntro:
      "Lead4s helped contractor networks improve contact quality, reduce duplicate competition, and create more efficient booking workflows through exclusive lead delivery.",
    challenge:
      "Contractor partners were dealing with mixed-quality leads, duplicate competition, and wasted sales effort.",
    solution:
      "Lead4s restructured campaigns around exclusive CPL delivery, stronger pre-qualification, and source-level optimization.",
    results: [
      "Improved contact rate on first outreach",
      "Reduced duplicate and non-relevant submissions",
      "Better downstream booking efficiency",
    ],
    kpiLabel: "Exclusive Lead Match Rate",
    kpiValue: "2.1x improvement",
    displayOrder: 2,
    sections: [
      {
        sectionLabel: "Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `Lead4s worked with home improvement partners that needed stronger lead intent signals and cleaner delivery quality across local markets.`,
      },
      {
        sectionLabel: "Challenge",
        title: "The Challenge",
        displayOrder: 2,
        markdown: `Shared lead marketplaces created duplicate competition, lower contact efficiency, and unpredictable project booking rates.`,
      },
      {
        sectionLabel: "Execution",
        title: "Execution Strategy",
        displayOrder: 3,
        markdown: `Lead4s shifted acquisition toward exclusive CPL funnels, built stronger qualification logic, and optimized sources based on downstream performance feedback.`,
      },
      {
        sectionLabel: "Outcome",
        title: "Outcome",
        displayOrder: 4,
        markdown: `The campaign improved first-touch efficiency, reduced duplicate waste, and gave contractors more control over lead flow quality.`,
      },
    ],
  },
  {
    slug: "final-expense-compliance-focused-growth",
    title: "Final Expense Growth With Compliance Controls",
    vertical: "Final Expense",
    summary:
      "Lead4s helped a final expense partner scale demand while preserving consent traceability and documentation quality.",
    heroLabel: "Final Expense Case Study",
    heroTitle: "Final Expense Growth With Compliance Controls",
    heroIntro:
      "Lead4s combined growth-focused acquisition with compliance-aware documentation systems to improve partner confidence and performance visibility.",
    challenge:
      "The partner needed more volume but could not compromise on documentation quality or outreach governance.",
    solution:
      "Lead4s deployed compliant acquisition paths, verification checkpoints, and documentation-ready lead records.",
    results: [
      "Reliable lead flow with cleaner contact history",
      "Better confidence in audit-readiness",
      "Higher partner trust in lead provenance",
    ],
    kpiLabel: "Verified Consent Coverage",
    kpiValue: ">95% documented",
    displayOrder: 3,
    sections: [
      {
        sectionLabel: "Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `The campaign was structured to support scalable final expense demand generation while maintaining strong consent and documentation hygiene.`,
      },
      {
        sectionLabel: "Challenge",
        title: "The Challenge",
        displayOrder: 2,
        markdown: `The partner needed volume growth without increasing compliance exposure or sacrificing record quality.`,
      },
      {
        sectionLabel: "Execution",
        title: "Execution Strategy",
        displayOrder: 3,
        markdown: `Lead4s introduced compliant acquisition paths, verification checkpoints, and operational review standards that made each lead more defensible and transparent.`,
      },
      {
        sectionLabel: "Outcome",
        title: "Outcome",
        displayOrder: 4,
        markdown: `The result was cleaner lead provenance, stronger audit confidence, and improved trust in campaign quality.`,
      },
    ],
  },
  {
    slug: "auto-insurance-high-intent-inquiries",
    title: "Auto Insurance Inquiry Quality Optimization",
    vertical: "Auto Insurance",
    summary:
      "Lead4s improved inquiry quality for auto insurance buyers by filtering lower-fit traffic and raising conversion-ready submission share.",
    heroLabel: "Auto Insurance Case Study",
    heroTitle: "Auto Insurance Inquiry Quality Optimization",
    heroIntro:
      "By refining targeting, intent gating, and landing experiences, Lead4s helped an insurance buyer improve qualified inquiry flow and team efficiency.",
    challenge:
      "Low-intent submissions were reducing sales efficiency and making CPL performance inconsistent.",
    solution:
      "Lead4s refined audience targeting, intent gating, and landing flow friction controls.",
    results: [
      "Improved sales-team efficiency",
      "Higher qualified inquiry percentage",
      "More predictable CPL performance",
    ],
    kpiLabel: "Qualified Inquiry Lift",
    kpiValue: "+47%",
    displayOrder: 4,
    sections: [
      {
        sectionLabel: "Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `The campaign focused on improving submission quality for an auto insurance buyer seeking more conversion-ready inquiries.`,
      },
      {
        sectionLabel: "Challenge",
        title: "The Challenge",
        displayOrder: 2,
        markdown: `The buyer faced inconsistent intent quality and low-fit inquiries that strained downstream sales operations.`,
      },
      {
        sectionLabel: "Execution",
        title: "Execution Strategy",
        displayOrder: 3,
        markdown: `Lead4s optimized traffic targeting, intent filters, and landing flow structure to remove lower-fit traffic before form completion.`,
      },
      {
        sectionLabel: "Outcome",
        title: "Outcome",
        displayOrder: 4,
        markdown: `The campaign delivered stronger inquiry quality and more predictable acquisition performance.`,
      },
    ],
  },
  {
    slug: "personal-injury-case-intake-improvement",
    title: "Personal Injury Intake Pipeline Improvement",
    vertical: "MVA & Personal Injury",
    summary:
      "Lead4s helped a legal intake operation improve consultation readiness and reduce non-qualified burden.",
    heroLabel: "Legal Intake Case Study",
    heroTitle: "Personal Injury Intake Pipeline Improvement",
    heroIntro:
      "Lead4s aligned ad messaging, intake criteria, and handoff detail quality to improve consultation-ready case opportunities.",
    challenge:
      "The intake team needed stronger lead intent signals to improve consultation scheduling and reduce wasted reviews.",
    solution:
      "Lead4s aligned ad messaging with intake criteria, tightened form logic, and improved handoff data context.",
    results: [
      "Higher consultation-ready submissions",
      "Faster intake triage and follow-up",
      "Reduced non-qualified intake burden",
    ],
    kpiLabel: "Consultation Readiness",
    kpiValue: "+39%",
    displayOrder: 5,
    sections: [
      {
        sectionLabel: "Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `The campaign was designed to improve legal intake efficiency through better inquiry alignment and clearer handoff context.`,
      },
      {
        sectionLabel: "Challenge",
        title: "The Challenge",
        displayOrder: 2,
        markdown: `Non-qualified cases and weak intake signals slowed response time and diluted consultation readiness.`,
      },
      {
        sectionLabel: "Execution",
        title: "Execution Strategy",
        displayOrder: 3,
        markdown: `Lead4s improved message alignment, intake qualification logic, and data handoff quality to support legal team triage.`,
      },
      {
        sectionLabel: "Outcome",
        title: "Outcome",
        displayOrder: 4,
        markdown: `The partner saw stronger consultation-readiness and a more efficient intake pipeline overall.`,
      },
    ],
  },
  {
    slug: "medicare-o65-predictable-volume",
    title: "Medicare O65 Volume Stabilization",
    vertical: "Medicare O65",
    summary:
      "Lead4s stabilized weekly Medicare O65 delivery with pacing controls and continuous quality calibration.",
    heroLabel: "Medicare Case Study",
    heroTitle: "Medicare O65 Volume Stabilization",
    heroIntro:
      "Lead4s helped a Medicare-focused buyer reduce volatility by balancing sources, pacing delivery, and aligning lead flow to operational capacity.",
    challenge:
      "Lead supply volatility and inconsistent intent quality made planning difficult for the buyer.",
    solution:
      "Lead4s introduced source balancing, pacing controls, and ongoing quality calibration loops.",
    results: [
      "More stable weekly lead distribution",
      "Better alignment with buyer capacity",
      "Improved conversion opportunity consistency",
    ],
    kpiLabel: "Weekly Volume Stability",
    kpiValue: "88% on-target pacing",
    displayOrder: 6,
    sections: [
      {
        sectionLabel: "Overview",
        title: "Campaign Overview",
        displayOrder: 1,
        markdown: `The Medicare campaign focused on improving delivery stability and operational predictability for a buyer with fixed team capacity.`,
      },
      {
        sectionLabel: "Challenge",
        title: "The Challenge",
        displayOrder: 2,
        markdown: `Volatile lead flow created planning issues and uneven conversion windows across the week.`,
      },
      {
        sectionLabel: "Execution",
        title: "Execution Strategy",
        displayOrder: 3,
        markdown: `Lead4s balanced acquisition sources and pacing controls while continuously calibrating quality feedback signals.`,
      },
      {
        sectionLabel: "Outcome",
        title: "Outcome",
        displayOrder: 4,
        markdown: `The buyer received more stable lead distribution with stronger alignment to team capacity and conversion opportunity timing.`,
      },
    ],
  },
];

async function main() {
  for (const item of caseStudySeedData) {
    const caseStudy = await prisma.caseStudy.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        vertical: item.vertical,
        summary: item.summary,
        heroLabel: item.heroLabel,
        heroTitle: item.heroTitle,
        heroIntro: item.heroIntro,
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
        kpiLabel: item.kpiLabel,
        kpiValue: item.kpiValue,
        isPublished: true,
        displayOrder: item.displayOrder,
      },
      create: {
        slug: item.slug,
        title: item.title,
        vertical: item.vertical,
        summary: item.summary,
        heroLabel: item.heroLabel,
        heroTitle: item.heroTitle,
        heroIntro: item.heroIntro,
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
        kpiLabel: item.kpiLabel,
        kpiValue: item.kpiValue,
        isPublished: true,
        displayOrder: item.displayOrder,
      },
    });

    await prisma.caseStudySection.deleteMany({
      where: { caseStudyId: caseStudy.id },
    });

    await prisma.caseStudySection.createMany({
      data: item.sections.map((section) => ({
        caseStudyId: caseStudy.id,
        sectionLabel: section.sectionLabel,
        title: section.title,
        markdown: section.markdown,
        displayOrder: section.displayOrder,
      })),
    });
  }
}

try {
  await main();
  console.log("Case studies seeded successfully.");
} catch (error) {
  console.error("Failed to seed case studies:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

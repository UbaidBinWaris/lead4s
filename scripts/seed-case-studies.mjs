import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const caseStudySeedData = [
  {
    slug: "solar-qualified-live-transfers",
    title: "Solar Lead Generation Case Study: +44% Qualified Live Transfer Conversations",
    industry: "Solar",
    summary:
      "See how a regional installer scaled high-intent solar lead generation and live transfer performance while maintaining qualification quality and compliance-safe routing.",
    challenge:
      "The sales team needed more solar appointments from paid channels, but inconsistent intent and delayed call routing were suppressing conversion rates and rep productivity.",
    solution:
      "Lead4s deployed intent-first acquisition funnels, homeowner fit checks, TCPA-aware consent checkpoints, and schedule-aligned live transfer routing optimized for speed-to-conversation.",
    results: [
      { label: "Qualified Conversation Lift", value: "+44%" },
      { label: "Average Transfer Speed", value: "<30s" },
      { label: "Weekly Quality Stability", value: "92%" },
    ],
    displayOrder: 1,
    content: [
      {
        type: "text",
        title: "SEO Campaign Context",
        content:
          "This solar lead generation case study demonstrates how conversion quality improves when media targeting, qualification logic, and routing speed are managed as one system. The buyer was running multi-geo campaigns and needed scale without adding compliance risk or sales-floor waste.",
      },
      {
        type: "text",
        title: "Story: From Volatile Week-to-Week Volume to Predictable Conversations",
        content:
          "Before working with Lead4s, the sales floor had no reliable rhythm. Some days produced call spikes that overwhelmed closers, while others were too quiet to hit appointment targets. After launch, the team moved to stable, trackable call windows supported by better intent filtering and transfer readiness logic.",
      },
      {
        type: "features",
        title: "What Was Implemented",
        items: [
          {
            icon: "target",
            title: "Intent Segmentation",
            description:
              "Campaign audiences were rebuilt around homeowner intent signals and service-area fit.",
          },
          {
            icon: "check",
            title: "Qualification Controls",
            description:
              "Pre-transfer validation reduced low-fit calls before they reached closers.",
          },
          {
            icon: "shield",
            title: "Compliance Workflow",
            description:
              "Consent and source checkpoints were embedded to support governance and traceability.",
          },
        ],
      },
      {
        type: "process",
        title: "Execution Timeline",
        items: [
          {
            title: "Week 1-2: Baseline Audit",
            description:
              "Channel quality, transfer latency, and call outcomes were mapped to isolate conversion bottlenecks.",
          },
          {
            title: "Week 3-4: Funnel Rebuild",
            description:
              "Intent segmentation and qualification checkpoints were implemented across active geographies.",
          },
          {
            title: "Week 5+: Scale and Stabilize",
            description:
              "Budget and routing windows were expanded with weekly quality guardrails and source feedback loops.",
          },
        ],
      },
      {
        type: "faq",
        title: "Solar Program FAQ",
        items: [
          {
            question: "Why did transfer speed matter so much?",
            answer:
              "Faster handoff preserved buyer intent and increased the chance of meaningful sales conversations.",
          },
          {
            question: "How was quality kept stable during scale?",
            answer:
              "Lead4s used pacing controls, source-level quality reviews, and weekly optimization against sales feedback.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Solar Growth Teams",
        items: [
          {
            label: "Solar Leads and Live Transfers",
            href: "/industries/solar-leads",
            description: "Explore the full industry page for targeting, delivery, and compliance details.",
          },
          {
            label: "Live Transfer Call Solution",
            href: "/solutions/live-transfer-calls",
            description: "See how real-time call handoff models are structured for conversion speed.",
          },
          {
            label: "Solar Lead Generation Guide",
            href: "/blog/solar-lead-generation-guide-for-installers",
            description: "Read the tactical playbook for improving lead quality and pipeline consistency.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Solar Growth",
        heading: "Want a solar pipeline with predictable conversation volume?",
        subheading:
          "Lead4s can build a compliance-first transfer program aligned to your sales capacity and close goals.",
        buttonLabel: "Get Started",
        buttonHref: "/contact",
        secondaryLabel: "View Solar Program",
        secondaryHref: "/industries/solar-leads",
      },
    ],
  },
  {
    slug: "home-improvement-exclusive-leads",
    title: "Home Improvement Leads Case Study: +36% Estimate Booking Efficiency",
    industry: "Home Improvement",
    summary:
      "A contractor network improved home improvement lead generation outcomes by moving to exclusive CPL delivery and tighter trade-level qualification rules.",
    challenge:
      "Shared lead sources caused duplicate competition, low contact quality, and inconsistent booking rates across roofing, HVAC, and remodeling teams.",
    solution:
      "Lead4s launched exclusive lead routing, geography-by-trade segmentation, and qualification filters aligned to each location's install capacity.",
    results: [
      { label: "Estimate Booking Efficiency", value: "+36%" },
      { label: "Duplicate Lead Exposure", value: "Reduced" },
      { label: "Sales Team Throughput", value: "Higher" },
    ],
    displayOrder: 2,
    content: [
      {
        type: "text",
        title: "Challenge Overview",
        content:
          "The business needed qualified contractor leads, not generic homeowner form fills. Existing channels produced volatile quality and poor booking predictability, making weekly planning difficult.",
      },
      {
        type: "text",
        title: "Story: Rebuilding Trust Across Local Sales Teams",
        content:
          "Field teams had lost confidence in lead quality because too many records lacked project readiness. The turning point came when campaign logic was rebuilt around project type and territory fit, giving each branch leads they could actually convert into estimates.",
      },
      {
        type: "process",
        title: "Optimization Sequence",
        items: [
          {
            title: "Trade-Level Segmentation",
            description:
              "Lead flows were separated by roofing, HVAC, windows, and remodeling objectives.",
          },
          {
            title: "Territory Alignment",
            description:
              "Geo filters were tuned to local dispatch and sales coverage realities.",
          },
          {
            title: "Booking Feedback Loop",
            description:
              "Campaign and source decisions were tuned using appointment outcome data.",
          },
        ],
      },
      {
        type: "stats",
        title: "Outcome Snapshot",
        items: [
          {
            value: "+36%",
            label: "Estimate Booking Efficiency",
            description: "Measured after implementing exclusive routing and trade-fit targeting.",
          },
          {
            value: "Higher",
            label: "Local Team Confidence",
            description: "Sales reps reported fewer low-fit lead conversations.",
          },
          {
            value: "Reduced",
            label: "Duplicate Competition",
            description: "Exclusive delivery reduced overlap across buyer channels.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Contractor Acquisition",
        items: [
          {
            label: "Home Improvement Lead Program",
            href: "/industries/home-improvement-leads",
            description: "Review the vertical program architecture for contractor-focused demand generation.",
          },
          {
            label: "Exclusive CPL Model",
            href: "/solutions/exclusive-leads-cpl-model",
            description: "Understand how exclusive delivery protects conversion ownership and booking quality.",
          },
          {
            label: "Home Improvement Leads for Contractors",
            href: "/blog/home-improvement-leads-for-contractors",
            description: "Read the growth framework for estimate-ready lead flow.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Contractor Leads",
        heading: "Need better estimate-ready homeowner leads?",
        subheading:
          "We help contractor networks turn inconsistent lead flow into a scalable booking engine.",
        buttonLabel: "Talk to Sales",
        buttonHref: "/contact",
        secondaryLabel: "Explore Home Improvement",
        secondaryHref: "/industries/home-improvement-leads",
      },
    ],
  },
  {
    slug: "final-expense-compliance-focused-growth",
    title: "Final Expense Leads Case Study: +31% Volume Growth With Consent Controls",
    industry: "Final Expense",
    summary:
      "A final expense insurance partner scaled lead volume while preserving consent traceability, compliance documentation quality, and close-ready lead standards.",
    challenge:
      "Growth goals required higher lead flow, but the compliance team needed stronger governance around consent evidence and data provenance.",
    solution:
      "Lead4s deployed consent-first acquisition logic, source verification checkpoints, and operational QA to strengthen legal defensibility and campaign reliability.",
    results: [
      { label: "Lead Volume Growth", value: "+31%" },
      { label: "Consent Record Coverage", value: ">95%" },
      { label: "Audit Readiness", value: "Improved" },
    ],
    displayOrder: 3,
    content: [
      {
        type: "text",
        title: "Compliance-First Strategy",
        content:
          "This insurance lead generation case study shows how volume expansion and compliance discipline can coexist when consent, verification, and quality controls are embedded early in campaign design.",
      },
      {
        type: "stats",
        title: "Program KPIs",
        items: [
          {
            value: "+31%",
            label: "Monthly Qualified Leads",
            description: "Measured after launch stabilization period.",
          },
          {
            value: ">95%",
            label: "Documented Consent Coverage",
            description: "Source and timestamp records retained for governance.",
          },
          {
            value: "Weekly",
            label: "QA Review Cadence",
            description: "Cross-functional review between operations and compliance.",
          },
        ],
      },
      {
        type: "process",
        title: "Story Arc: How Compliance Became a Growth Lever",
        items: [
          {
            title: "Before",
            description:
              "Teams hesitated to scale because consent documentation quality was inconsistent across sources.",
          },
          {
            title: "Turning Point",
            description:
              "Lead4s introduced verification checkpoints and governance-friendly source traceability.",
          },
          {
            title: "After",
            description:
              "The buyer scaled with stronger confidence because growth and compliance controls were aligned.",
          },
        ],
      },
      {
        type: "faq",
        title: "Final Expense FAQ",
        items: [
          {
            question: "How did compliance impact conversion performance?",
            answer:
              "Stronger qualification and documentation controls reduced low-fit leads and improved downstream close opportunities.",
          },
          {
            question: "Was this only a legal improvement?",
            answer:
              "No. Compliance structure also improved operational confidence, enabling sustained volume growth.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Final Expense Teams",
        items: [
          {
            label: "Final Expense Lead Program",
            href: "/industries/final-expense-lead",
            description: "See campaign structure, compliance priorities, and qualification controls.",
          },
          {
            label: "TCPA Compliance Checklist",
            href: "/blog/tcpa-compliance-checklist-for-lead-generation",
            description: "Use this checklist to strengthen consent governance at scale.",
          },
          {
            label: "Live Transfer Calls Solution",
            href: "/solutions/live-transfer-calls",
            description: "Explore speed-to-conversation workflows for high-intent opportunities.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Insurance Growth",
        heading: "Need compliant final expense lead generation?",
        subheading:
          "Lead4s can build a consent-aware acquisition pipeline designed for policy growth and audit readiness.",
        buttonLabel: "Talk to Sales",
        buttonHref: "/contact",
        secondaryLabel: "View Compliance",
        secondaryHref: "/compliance",
      },
    ],
  },
  {
    slug: "auto-insurance-high-intent-inquiries",
    title: "Auto Insurance Leads Case Study: +47% Qualified Inquiry Lift",
    industry: "Auto Insurance",
    summary:
      "Auto insurance lead generation performance improved through intent filtering, state-level targeting controls, and faster lead routing to licensed teams.",
    challenge:
      "Low-intent submissions were inflating CPL volatility and reducing quote-ready conversation rates across call center teams.",
    solution:
      "Lead4s refined audience and creative intent signals, introduced policy-fit gating, and aligned routing to state licensing and buyer capacity.",
    results: [
      { label: "Qualified Inquiry Lift", value: "+47%" },
      { label: "Contact Success Rate", value: "Higher" },
      { label: "CPL Stability", value: "Improved" },
    ],
    displayOrder: 4,
    content: [
      {
        type: "text",
        title: "Story: Fixing Inquiry Quality at the Source",
        content:
          "The client had volume, but not enough quote-ready prospects. Sales managers flagged that reps spent too much time filtering weak inquiries. Lead4s rebuilt campaign logic around intent depth and policy fit to improve first-contact quality.",
      },
      {
        type: "features",
        title: "Program Improvements",
        items: [
          {
            icon: "target",
            title: "Intent-Fit Targeting",
            description:
              "Campaign targeting was rebuilt around quote-intent indicators and policy relevance.",
          },
          {
            icon: "clock",
            title: "Faster Handoff",
            description:
              "Speed-to-lead standards reduced decay between form completion and first contact.",
          },
          {
            icon: "chart",
            title: "Source Optimization",
            description:
              "Weekly source-level adjustments improved conversion consistency and spend efficiency.",
          },
        ],
      },
      {
        type: "process",
        title: "Auto Insurance Optimization Path",
        items: [
          {
            title: "Audience and Creative Alignment",
            description:
              "Intent and offer relevance were improved before any budget expansion.",
          },
          {
            title: "Policy-Fit Qualification",
            description:
              "Forms and routing controls reduced low-intent, low-eligibility submissions.",
          },
          {
            title: "Weekly Conversion Calibration",
            description:
              "Source-level spend and quality were tuned against contact and quote outcomes.",
          },
        ],
      },
      {
        type: "faq",
        title: "Auto Insurance FAQ",
        items: [
          {
            question: "What drove the +47% qualified inquiry lift?",
            answer:
              "A combination of better intent targeting, policy-fit filters, and faster sales handoff windows.",
          },
          {
            question: "Can this model scale by state?",
            answer:
              "Yes. Routing rules can be configured by licensing constraints and local team capacity.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Auto Insurance Growth",
        items: [
          {
            label: "Auto Insurance Lead Program",
            href: "/industries/auto-insurance-leads",
            description: "Review targeting logic and delivery controls for policy-ready inquiries.",
          },
          {
            label: "PPC Campaign Management",
            href: "/solutions/ppc-campaign-management",
            description: "Understand paid channel optimization focused on qualified outcomes.",
          },
          {
            label: "Auto Insurance CPL Optimization Guide",
            href: "/blog/auto-insurance-lead-generation-cpl-optimization",
            description: "Learn how to improve inquiry quality while controlling acquisition economics.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Insurance Acquisition",
        heading: "Ready to improve quote-ready auto insurance inquiries?",
        subheading:
          "Lead4s helps teams reduce waste and increase quality with intent-first acquisition systems.",
        buttonLabel: "Start Campaign Planning",
        buttonHref: "/contact",
        secondaryLabel: "See Related Case Studies",
        secondaryHref: "/case-studies",
      },
    ],
  },
  {
    slug: "personal-injury-case-intake-improvement",
    title: "Personal Injury Leads Case Study: +39% Consultation Readiness",
    industry: "MVA & Personal Injury",
    summary:
      "A legal intake operation improved personal injury lead generation quality and increased consultation-ready submissions with case-fit qualification.",
    challenge:
      "Intake staff spent excessive time triaging low-fit submissions that did not meet the firm's case-type and jurisdiction criteria.",
    solution:
      "Lead4s aligned acquisition messaging with case-fit logic, improved form qualification depth, and delivered richer intake context for faster screening.",
    results: [
      { label: "Consultation Readiness", value: "+39%" },
      { label: "Triage Speed", value: "Faster" },
      { label: "Non-Fit Intake Waste", value: "Reduced" },
    ],
    displayOrder: 5,
    content: [
      {
        type: "text",
        title: "Legal Intake Performance",
        content:
          "This personal injury lead generation case study highlights how legal growth depends on consultation readiness, not form quantity. Better pre-intake signals helped attorneys focus on high-value opportunities.",
      },
      {
        type: "text",
        title: "Story: From Intake Backlog to Better Case Prioritization",
        content:
          "Before optimization, intake specialists were buried in low-fit records. After introducing case-fit rules and richer handoff context, the team moved faster on viable claims and reduced non-billable review effort.",
      },
      {
        type: "process",
        title: "Legal Intake Transformation",
        items: [
          {
            title: "Case-Type Filtering",
            description:
              "Campaign forms were aligned to practice focus and jurisdiction requirements.",
          },
          {
            title: "Context-Rich Lead Handoff",
            description:
              "Intake teams received more relevant details to speed triage and scheduling decisions.",
          },
          {
            title: "Consultation Feedback Loop",
            description:
              "Close-stage insights fed back into acquisition criteria for ongoing quality improvement.",
          },
        ],
      },
      {
        type: "faq",
        title: "Legal Campaign FAQ",
        items: [
          {
            question: "What drove the readiness increase?",
            answer:
              "Case-type filtering, improved lead context, and tighter targeting reduced low-fit submissions before intake review.",
          },
          {
            question: "Can this approach support multi-office firms?",
            answer:
              "Yes. Routing logic can be configured by jurisdiction, case priority, and office capacity.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Legal Intake Teams",
        items: [
          {
            label: "MVA and Personal Injury Program",
            href: "/industries/mva-personal-injury-leads",
            description: "Explore the legal intake acquisition framework and fit qualification controls.",
          },
          {
            label: "Personal Injury Lead Generation Guide",
            href: "/blog/personal-injury-lead-generation-for-law-firms",
            description: "Read tactical guidance for consultation-ready intake growth.",
          },
          {
            label: "All Case Studies",
            href: "/case-studies",
            description: "Compare outcomes across legal, insurance, and contractor verticals.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Legal Intake",
        heading: "Need more consultation-ready personal injury leads?",
        subheading:
          "We build lead programs that help legal teams prioritize fit, speed, and consultation outcomes.",
        buttonLabel: "Book a Strategy Call",
        buttonHref: "/contact",
        secondaryLabel: "Apply for Partnership",
        secondaryHref: "/partnership",
      },
    ],
  },
  {
    slug: "medicare-o65-predictable-volume",
    title: "Medicare O65 Lead Generation Case Study: 88% Weekly Delivery Stability",
    industry: "Medicare O65",
    summary:
      "A Medicare buyer improved O65 lead generation consistency through source balancing, pacing automation, and continuous quality calibration.",
    challenge:
      "Enrollment-cycle volatility created uneven lead flow, making staffing forecasts and downstream conversion planning unreliable.",
    solution:
      "Lead4s implemented pacing controls, source mix balancing, and conversion-feedback loops to stabilize weekly volume and improve campaign reliability.",
    results: [
      { label: "Weekly Stability", value: "88%" },
      { label: "Capacity Alignment", value: "Improved" },
      { label: "Conversion Consistency", value: "Higher" },
    ],
    displayOrder: 6,
    content: [
      {
        type: "text",
        title: "Story: Stabilizing Enrollment-Window Volatility",
        content:
          "The Medicare team had strong demand periods but inconsistent weekly intake quality. By balancing source mix and pacing delivery to operational capacity, Lead4s helped the client move from reactive staffing to predictable planning.",
      },
      {
        type: "process",
        title: "Stabilization Framework",
        items: [
          {
            title: "Source Balancing",
            description:
              "Weekly allocation logic reduced over-reliance on volatile channels.",
          },
          {
            title: "Pacing Automation",
            description:
              "Volume thresholds were matched to licensed team capacity and schedule windows.",
          },
          {
            title: "Quality Calibration",
            description:
              "Conversion outcomes informed iterative optimization across source partners.",
          },
        ],
      },
      {
        type: "stats",
        title: "Delivery Reliability Metrics",
        items: [
          {
            value: "88%",
            label: "Weekly Stability",
            description: "Lead flow consistency improved across enrollment demand cycles.",
          },
          {
            value: "Higher",
            label: "Conversion Consistency",
            description: "Improved alignment between intake volume and agent capacity.",
          },
          {
            value: "Lower",
            label: "Planning Volatility",
            description: "Forecasting confidence increased with controlled pacing and source balancing.",
          },
        ],
      },
      {
        type: "faq",
        title: "Medicare O65 FAQ",
        items: [
          {
            question: "How did weekly delivery stability improve?",
            answer:
              "Lead4s used pacing thresholds, source balancing, and conversion-feedback optimization to smooth volume swings.",
          },
          {
            question: "Can this approach support AEP pressure periods?",
            answer:
              "Yes. Capacity-aware controls help teams protect quality when demand spikes during enrollment windows.",
          },
        ],
      },
      {
        type: "link-list",
        title: "Related Resources for Medicare Teams",
        items: [
          {
            label: "Medicare O65 Industry Program",
            href: "/industries/medicare-o65",
            description: "See enrollment-cycle delivery controls and compliance-aware program setup.",
          },
          {
            label: "Medicare O65 Strategy Guide",
            href: "/blog/medicare-o65-lead-generation-strategy",
            description: "Review pacing and source-balancing methods for stable weekly intake.",
          },
          {
            label: "Appointment Setting Solution",
            href: "/solutions/appointment-setting",
            description: "Connect lead flow with qualified meeting outcomes.",
          },
        ],
      },
      {
        type: "cta",
        eyebrow: "Medicare Growth",
        heading: "Scale O65 programs with stable weekly delivery",
        subheading:
          "Lead4s helps Medicare teams manage enrollment demand with predictable, quality-controlled lead flow.",
        buttonLabel: "Start a Conversation",
        buttonHref: "/contact",
        secondaryLabel: "Apply for Partnership",
        secondaryHref: "/partnership",
      },
    ],
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

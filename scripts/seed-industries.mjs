// @ts-check
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/** @type {import('@/types/industry').IndustrySection[]} */
const industries = [
  // -------------------------------------------------------------------------
  // 1. Solar Leads
  // -------------------------------------------------------------------------
  {
    title: "Solar Leads & Live Transfers",
    slug: "solar-leads",
    description:
      "Exclusive, real-time solar leads and live call transfers to help your sales team close more residential and commercial solar installations.",
    isPublished: true,
    displayOrder: 1,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "The Solar Lead Problem — Solved",
        content:
          "The solar market is booming, but low-quality, recycled leads are killing close rates. Lead4s delivers verified, intent-based solar leads matched to your exact territory and customer profile.\n\nEvery prospect has expressed genuine interest in solar installation. We validate by phone before the lead ever reaches your team, so you spend time selling, not filtering.",
      },
      {
        type: "features",
        title: "Why Solar Teams Choose Lead4s",
        items: [
          {
            icon: "bolt",
            title: "Real-Time Live Transfers",
            description:
              "Warm prospect handed directly to your sales rep the moment they express interest — zero delay, maximum conversion.",
          },
          {
            icon: "target",
            title: "Geo-Targeted by Zip Code",
            description:
              "Leads filtered to your exact service areas. We never send you a prospect outside your install radius.",
          },
          {
            icon: "check",
            title: "Homeowner-Verified",
            description:
              "Every lead is confirmed to be a homeowner — no renters, no duplicates, no recycled data.",
          },
          {
            icon: "chart",
            title: "High-Intent Signals",
            description:
              "Prospects who've actively researched solar costs, incentives, and financing — ready for a proposal.",
          },
          {
            icon: "dollar",
            title: "Flexible Volume Pricing",
            description:
              "Scale from 10 to 10,000 leads per month. Pay only for validated leads delivered to your pipeline.",
          },
          {
            icon: "shield",
            title: "TCPA-Compliant Data",
            description:
              "All leads are generated with explicit consent under TCPA guidelines — protecting your business.",
          },
        ],
      },
      {
        type: "text",
        title: "How Our Solar Lead Process Works",
        content:
          "Our multi-channel acquisition funnel targets homeowners actively searching for solar savings across search, social, and direct outreach. Each lead undergoes a 3-step verification: identity confirmation, homeownership check, and a live intent call.\n\nQualified leads are routed to your dashboard in real time. For live transfers, our agents keep the prospect on the line while your closer joins — warm, ready, and expecting your call.",
      },
      {
        type: "cta",
        heading: "Start Closing More Solar Deals Today",
        subheading:
          "Get exclusive, verified solar leads delivered directly to your sales team. No contracts, no minimums.",
        buttonLabel: "Get Solar Leads Now",
        buttonHref: "/#contact",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Home Improvement Leads
  // -------------------------------------------------------------------------
  {
    title: "Home Improvement Leads",
    slug: "home-improvement-leads",
    description:
      "High-intent home improvement leads for roofing, HVAC, windows, remodeling, and more — verified homeowners ready to get estimates.",
    isPublished: true,
    displayOrder: 2,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "Connect with Homeowners Ready to Remodel",
        content:
          "Home improvement contractors waste thousands each month on shared lead platforms that sell the same prospect to five competitors. Lead4s provides exclusive, project-specific leads — one contractor per lead, always.\n\nWhether you specialize in roofing, HVAC, windows, kitchens, or whole-home remodels, we deliver homeowners who have a specific project in mind and a budget to match.",
      },
      {
        type: "features",
        title: "Built for Home Improvement Contractors",
        items: [
          {
            icon: "check",
            title: "Project-Type Filtering",
            description:
              "Receive only the lead types relevant to your services — roofing, siding, HVAC, plumbing, electrical, and more.",
          },
          {
            icon: "users",
            title: "Exclusive — Not Shared",
            description:
              "Your lead goes only to you. No competing against four other contractors for the same homeowner.",
          },
          {
            icon: "dollar",
            title: "Budget-Qualified",
            description:
              "Prospects are pre-qualified for project budget before being sent to your team — no tire kickers.",
          },
          {
            icon: "target",
            title: "Zip-Code Targeting",
            description:
              "Stay within your service radius. We never send leads outside your coverage area.",
          },
          {
            icon: "clock",
            title: "Speed-to-Lead Delivery",
            description:
              "Leads arrive in real time via CRM push, SMS, or email — contact them before they cool off.",
          },
          {
            icon: "shield",
            title: "Verified Homeowners",
            description:
              "Every prospect is confirmed as the property owner with an active renovation intent.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Fill Your Estimate Calendar",
        subheading:
          "Exclusive home improvement leads for your exact trade and territory. Start your trial today.",
        buttonLabel: "Get Contractor Leads",
        buttonHref: "/#contact",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Final Expense Leads
  // -------------------------------------------------------------------------
  {
    title: "Final Expense Leads",
    slug: "final-expense-lead",
    description:
      "Exclusive final expense insurance leads — pre-qualified seniors aged 50–85 actively seeking whole life coverage to protect their families.",
    isPublished: true,
    displayOrder: 3,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "Reach Seniors Who Need Final Expense Coverage",
        content:
          "Final expense insurance is one of the highest-close-rate products in the industry — when you're talking to the right prospect. Lead4s delivers pre-qualified seniors aged 50–85 who have expressed direct interest in whole life or burial insurance policies.\n\nOur agents conduct a brief pre-qualification call before the transfer, confirming health eligibility range, desired coverage amount, and the ability to pay monthly premiums.",
      },
      {
        type: "features",
        title: "What Makes Our Final Expense Leads Different",
        items: [
          {
            icon: "users",
            title: "Age-Verified Seniors (50–85)",
            description:
              "Filtered to your preferred age bands. Ideal prospects for simplified issue whole life products.",
          },
          {
            icon: "phone",
            title: "Live Transfer Available",
            description:
              "Our agents pre-screen and hand off a warm transfer directly to your licensed agent — prospect on the line, ready to talk.",
          },
          {
            icon: "check",
            title: "Health Pre-Screened",
            description:
              "Basic health questions asked upfront so your agent leads with the right product — no surprises.",
          },
          {
            icon: "dollar",
            title: "Premium-Capable Prospects",
            description:
              "Verified ability to pay monthly premiums between $30–$150. No un-monetizable contacts.",
          },
          {
            icon: "shield",
            title: "TCPA & DNC Compliant",
            description:
              "All data collected with full consent. DNC-scrubbed before delivery to protect your license.",
          },
          {
            icon: "chart",
            title: "High Close Rates",
            description:
              "Agents using our live transfers report 20–35% close rates vs. 5–8% on cold lists.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Start Closing Final Expense Policies Today",
        subheading:
          "Warm, pre-qualified seniors delivered live to your agents. TCPA compliant, exclusive, and ready to buy.",
        buttonLabel: "Get Final Expense Leads",
        buttonHref: "/#contact",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Auto Insurance Leads
  // -------------------------------------------------------------------------
  {
    title: "Auto Insurance Leads",
    slug: "auto-insurance-leads",
    description:
      "Real-time auto insurance leads and live transfers — drivers actively shopping for better rates on car insurance.",
    isPublished: true,
    displayOrder: 4,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "Auto Insurance Prospects Shopping Right Now",
        content:
          "Auto insurance is a competitive, high-volume market. The difference between winning and losing a policy is speed. Lead4s captures drivers in the moment they're searching for better rates and delivers them to your agents in real time.\n\nWe filter by state, vehicle type, current insurer, and credit tier so every prospect aligns with your underwriting appetite.",
      },
      {
        type: "features",
        title: "Auto Insurance Lead Features",
        items: [
          {
            icon: "clock",
            title: "Real-Time Delivery",
            description:
              "Leads pushed to your CRM or agent within 30 seconds of prospect form submission.",
          },
          {
            icon: "target",
            title: "State & Zip Targeting",
            description:
              "Filter by state, county, or zip code to match your licensed coverage areas.",
          },
          {
            icon: "check",
            title: "Multi-Vehicle Households",
            description:
              "Prioritize households with 2+ vehicles for higher premium policies and bundling opportunities.",
          },
          {
            icon: "dollar",
            title: "Rate-Shopper Intent",
            description:
              "Every prospect has actively requested an auto insurance quote — not cold traffic.",
          },
          {
            icon: "phone",
            title: "Live Transfer Option",
            description:
              "Skip the callback game. Have the prospect live on the line when your agent picks up.",
          },
          {
            icon: "shield",
            title: "Compliance-Ready Data",
            description:
              "All leads sourced with explicit written consent, TCPA and state insurance regulation compliant.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Write More Auto Policies This Month",
        subheading:
          "Real-time leads and live transfers from drivers actively shopping for better rates.",
        buttonLabel: "Get Auto Insurance Leads",
        buttonHref: "/#contact",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. MVA / Personal Injury Leads
  // -------------------------------------------------------------------------
  {
    title: "MVA & Personal Injury Leads",
    slug: "mva-personal-injury-leads",
    description:
      "Exclusive motor vehicle accident and personal injury leads for law firms — verified claimants with active cases, delivered in real time.",
    isPublished: true,
    displayOrder: 5,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "Signed Cases for Personal Injury Attorneys",
        content:
          "Motor vehicle accident and personal injury cases are among the most valuable in plaintiff law — but the cost-per-acquisition is brutal without the right lead partner. Lead4s connects your firm with verified accident victims who have not yet retained counsel.\n\nEvery lead has been in a motor vehicle accident within the qualifying window, has documented injuries, and has confirmed they are not currently represented. We deliver case-ready claimants, not just phone numbers.",
      },
      {
        type: "features",
        title: "Why Law Firms Trust Lead4s for MVA Leads",
        items: [
          {
            icon: "check",
            title: "No Prior Attorney",
            description:
              "Every claimant confirms they have not signed a retainer with another firm before the lead is sent.",
          },
          {
            icon: "clock",
            title: "Within Statute of Limitations",
            description:
              "Accidents qualified within your state's SOL window. No expired claims in your pipeline.",
          },
          {
            icon: "shield",
            title: "Injury Documented",
            description:
              "Claimants confirm medical treatment was sought — ER visit, urgent care, or follow-up care initiated.",
          },
          {
            icon: "phone",
            title: "Live Intake Transfers",
            description:
              "Our agents conduct a full intake pre-screen then live-transfer directly to your intake team.",
          },
          {
            icon: "target",
            title: "State & Case-Type Filtering",
            description:
              "Filter by state, accident type (rear-end, T-bone, rideshare, commercial), and injury severity.",
          },
          {
            icon: "chart",
            title: "High-Value Cases",
            description:
              "Focus on cases with liability and collectability — we screen for insured at-fault parties.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Get Signed MVA Cases Delivered to Your Firm",
        subheading:
          "Exclusive, pre-screened personal injury claimants ready to retain. Live transfers available.",
        buttonLabel: "Get MVA Leads",
        buttonHref: "/#contact",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Medicare O65
  // -------------------------------------------------------------------------
  {
    title: "Medicare & Senior Insurance Leads",
    slug: "medicare-o65",
    description:
      "Exclusive Medicare Advantage, Supplement, and Part D leads for seniors 65+ — pre-qualified and ready to enroll during open and special enrollment periods.",
    isPublished: true,
    displayOrder: 6,
    coverImage: null,
    content: [
      {
        type: "text",
        title: "Medicare Leads That Convert",
        content:
          "Medicare open enrollment is the highest-stakes period of the year for insurance agents. Lead4s gives you compliant, exclusive access to Medicare-eligible seniors aged 65+ who are actively evaluating their plan options.\n\nOur leads are generated through TPMO-compliant marketing channels. Every prospect receives required CMS disclaimers before expressing interest. Your agents receive verified, consent-based contacts — protecting your CMS certification and your business.",
      },
      {
        type: "features",
        title: "Medicare Lead Program Features",
        items: [
          {
            icon: "users",
            title: "65+ Age-Verified Seniors",
            description:
              "Pre-filtered for Medicare eligibility by age, Medicare Part A & B enrollment confirmation.",
          },
          {
            icon: "shield",
            title: "CMS / TPMO Compliant",
            description:
              "All marketing materials and lead capture processes meet CMS Third Party Marketing Organization requirements.",
          },
          {
            icon: "phone",
            title: "Live Transfer at Scale",
            description:
              "Warm transfers connect your agent with an eligible senior actively asking about Medicare plan options.",
          },
          {
            icon: "check",
            title: "Plan-Type Filtering",
            description:
              "Specify Medicare Advantage, Supplement (Medigap), Part D, or dual-eligible prospects.",
          },
          {
            icon: "target",
            title: "County & State Targeting",
            description:
              "Align leads with your carrier's service area by county — critical for Medicare Advantage.",
          },
          {
            icon: "clock",
            title: "AEP & SEP Ready",
            description:
              "Surge capacity available for Annual Enrollment Period. Special Enrollment Period leads available year-round.",
          },
        ],
      },
      {
        type: "cta",
        heading: "Grow Your Medicare Book of Business",
        subheading:
          "CMS-compliant Medicare leads and live transfers for agents and FMOs. Scale through AEP and beyond.",
        buttonLabel: "Get Medicare Leads",
        buttonHref: "/#contact",
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding industries...\n");

  for (const industry of industries) {
    const { content, ...rest } = industry;
    const result = await db.industry.upsert({
      where: { slug: rest.slug },
      update: { ...rest, content },
      create: { ...rest, content },
    });
    console.log(`  ✓ ${result.title} (/${result.slug})`);
  }

  console.log(`\n✅ Seeded ${industries.length} industries successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

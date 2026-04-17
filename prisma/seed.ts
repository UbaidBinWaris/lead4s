import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const solutions = [
  {
    title: "Exclusive Leads (CPL Model)",
    slug: "exclusive-leads-cpl-model",
    description:
      "Pay only for results. Our Cost-Per-Lead model delivers verified, exclusive consumer intent data — zero shared leads, zero wasted budget.",
    content: [
      {
        type: "text",
        title: "What is the CPL Model?",
        content:
          "The Cost-Per-Lead model means you only pay when we deliver a qualified lead that meets your exact criteria. There are no monthly retainers, no media spend guesswork, and no shared lead pools. Every lead is generated exclusively for your campaign and delivered in real time.\n\nWe combine proprietary data targeting, multi-channel outreach, and compliance-verified intake flows to ensure every lead is fresh, contactable, and ready for your sales team.",
      },
      {
        type: "features",
        title: "Why Brands Choose Our CPL Model",
        items: [
          {
            icon: "check",
            title: "100% Exclusive Leads",
            description:
              "Every lead belongs to you alone. We never resell or share leads across multiple buyers.",
          },
          {
            icon: "shield",
            title: "TCPA & DNC Compliant",
            description:
              "All leads pass through real-time compliance scrubbing before delivery — zero legal exposure.",
          },
          {
            icon: "bolt",
            title: "Real-Time Delivery",
            description:
              "Leads are pushed to your CRM or dialer within seconds of capture, while intent is at its peak.",
          },
          {
            icon: "chart",
            title: "Fixed Cost Predictability",
            description:
              "Know your exact cost-per-acquisition before you commit. Budget confidently with no hidden fees.",
          },
          {
            icon: "target",
            title: "Precision Targeting",
            description:
              "Filter by geography, age, income, product interest, and 50+ additional data points.",
          },
          {
            icon: "star",
            title: "Performance Guarantees",
            description:
              "We stand behind lead quality. Invalid or duplicate leads are automatically replaced.",
          },
        ],
      },
      {
        type: "text",
        title: "Industries We Serve",
        content:
          "Our CPL model is proven across high-intent verticals including insurance (auto, health, life, Medicare), solar energy, home services, financial services, legal, and mortgage. If your business depends on a consistent pipeline of qualified prospects, our CPL solution is built for you.",
      },
      {
        type: "cta",
        heading: "Start Receiving Exclusive Leads Today",
        subheading:
          "Set your target criteria, define your CPL rate, and we'll have your first batch of leads flowing within 48 hours.",
        buttonLabel: "Get a Free Quote",
        buttonHref: "/#contact",
      },
    ],
  },
  {
    title: "Live Transfer Calls",
    slug: "live-transfer-calls",
    description:
      "Skip the cold outreach. We connect pre-qualified, ready-to-buy consumers directly to your agents in real time — a warm handoff that closes.",
    content: [
      {
        type: "text",
        title: "The Power of a Warm Transfer",
        content:
          "Live transfer calls are the highest-converting lead type in the industry. A consumer who has already expressed interest, answered qualification questions, and consented to speak with your team is infinitely more valuable than any cold contact.\n\nOur agents qualify every prospect against your custom criteria before transferring — ensuring your closers spend 100% of their time talking to genuinely interested buyers.",
      },
      {
        type: "features",
        title: "How Our Live Transfer System Works",
        items: [
          {
            icon: "phone",
            title: "Inbound Intent Capture",
            description:
              "We drive consumer intent through paid media, web forms, and outbound outreach across all major channels.",
          },
          {
            icon: "check",
            title: "Live Agent Pre-Qualification",
            description:
              "Our trained agents verify eligibility, collect key data points, and confirm the consumer's readiness to buy.",
          },
          {
            icon: "bolt",
            title: "Warm Handoff in Seconds",
            description:
              "Once qualified, the consumer is transferred live to your agent — no hold music, no drop-off.",
          },
          {
            icon: "shield",
            title: "Compliance at Every Step",
            description:
              "Every transfer is TCPA-compliant with recorded consent and real-time DNC scrubbing.",
          },
          {
            icon: "chart",
            title: "Custom Qualification Scripts",
            description:
              "We build scripts around your exact qualification criteria so transfers match your ideal buyer profile.",
          },
          {
            icon: "clock",
            title: "Peak-Hours Scheduling",
            description:
              "Transfer volume is concentrated in your preferred hours when your team is fully staffed and ready.",
          },
        ],
      },
      {
        type: "text",
        title: "Conversion Rates That Speak for Themselves",
        content:
          "Live transfers consistently outperform cold leads by 5–10x in conversion rate. When a prospect arrives on your line already pre-qualified and expecting your call, your agents close faster, spend less time on objections, and generate more revenue per hour.\n\nWe offer live transfers across insurance, solar, home improvement, mortgage, debt settlement, and other high-value verticals.",
      },
      {
        type: "cta",
        heading: "Ready for Calls That Convert?",
        subheading:
          "Tell us your qualification criteria and we'll build a custom transfer program around your sales team's strengths.",
        buttonLabel: "Request a Live Transfer Demo",
        buttonHref: "/#contact",
      },
    ],
  },
  {
    title: "Appointment Setting",
    slug: "appointment-setting",
    description:
      "Let us fill your calendar with high-intent, pre-qualified appointments — so your closers focus on closing, not prospecting.",
    content: [
      {
        type: "text",
        title: "Done-For-You Appointment Pipeline",
        content:
          "Appointment setting is the bridge between marketing and sales. Our dedicated team of outreach specialists identify, contact, and pre-qualify prospects before booking them directly into your CRM or calendar system.\n\nYou receive a full calendar of warm, confirmed appointments with decision-makers who are expecting your call and ready to discuss your offer.",
      },
      {
        type: "features",
        title: "What Our Appointment Setting Includes",
        items: [
          {
            icon: "calendar",
            title: "Multi-Channel Outreach",
            description:
              "We reach prospects via phone, email, SMS, and LinkedIn — maximising connect rates across all touchpoints.",
          },
          {
            icon: "check",
            title: "Decision-Maker Targeting",
            description:
              "We verify we're booking with the actual buyer or influencer — never a gatekeeper who can't commit.",
          },
          {
            icon: "star",
            title: "CRM Integration",
            description:
              "Appointments sync directly to Salesforce, HubSpot, or any CRM via webhook or native integration.",
          },
          {
            icon: "shield",
            title: "Confirmation & Reminders",
            description:
              "We send automated reminders to reduce no-shows and confirm attendance before your rep dials.",
          },
          {
            icon: "bolt",
            title: "Rapid Ramp-Up",
            description:
              "From onboarding to first booked appointments in 72 hours — no months-long setup cycles.",
          },
          {
            icon: "chart",
            title: "Quality Guarantee",
            description:
              "We replace no-shows and unqualified appointments at no charge — your pipeline stays healthy.",
          },
        ],
      },
      {
        type: "text",
        title: "Who Uses Our Appointment Setting?",
        content:
          "Sales-led B2C and B2B teams across insurance, financial advisory, home services, SaaS, and professional services rely on our appointment setters to maintain a consistent top-of-funnel without adding headcount.\n\nWhether you need 10 appointments per week or 500, we scale to match your team's capacity.",
      },
      {
        type: "cta",
        heading: "Fill Your Calendar with Quality Appointments",
        subheading:
          "Tell us your ideal prospect profile and capacity — we'll handle everything from outreach to confirmation.",
        buttonLabel: "Get Started",
        buttonHref: "/#contact",
      },
    ],
  },
  {
    title: "BPO & Call Center Services",
    slug: "bpo-call-center-services",
    description:
      "Fully managed inbound and outbound call center solutions that scale with your business — without the overhead of building in-house.",
    content: [
      {
        type: "text",
        title: "Enterprise-Grade Call Center, Fully Outsourced",
        content:
          "Building and maintaining an in-house call center is expensive, time-consuming, and operationally complex. Our BPO solution gives you access to a fully staffed, trained, and compliant call center operation — ready to handle your volume from day one.\n\nFrom customer acquisition to retention, support, and overflow handling, we operate as a seamless extension of your team.",
      },
      {
        type: "features",
        title: "Full-Spectrum BPO Services",
        items: [
          {
            icon: "phone",
            title: "Inbound Call Handling",
            description:
              "24/7 inbound support, order processing, customer service, and technical assistance handled by trained agents.",
          },
          {
            icon: "bolt",
            title: "Outbound Sales & Collections",
            description:
              "High-performance outbound teams for new customer acquisition, win-back campaigns, and collections.",
          },
          {
            icon: "shield",
            title: "Compliance-First Operations",
            description:
              "All agents trained on TCPA, FDCPA, and industry-specific regulations — every call recorded and audited.",
          },
          {
            icon: "chart",
            title: "Real-Time Reporting",
            description:
              "Live dashboards showing call volume, conversion rates, handle time, and agent performance metrics.",
          },
          {
            icon: "star",
            title: "Bilingual Agents Available",
            description:
              "English and Spanish-speaking agents available to serve your full customer base.",
          },
          {
            icon: "check",
            title: "Flexible Scaling",
            description:
              "Ramp up or down with 48-hour notice — no long-term headcount commitments or severance costs.",
          },
        ],
      },
      {
        type: "text",
        title: "Why Outsource to Lead4s?",
        content:
          "Unlike generic BPO providers, we specialize in high-stakes consumer-facing calls in regulated industries. Our agents aren't reading from generic scripts — they're trained on your specific product, your compliance requirements, and your brand voice.\n\nWe bring the same performance culture that drives our lead generation results to every client engagement.",
      },
      {
        type: "cta",
        heading: "Scale Your Operations Without the Overhead",
        subheading:
          "Get a custom BPO proposal tailored to your call volume, industry, and service requirements.",
        buttonLabel: "Request a BPO Proposal",
        buttonHref: "/#contact",
      },
    ],
  },
  {
    title: "PPC Campaign Management",
    slug: "ppc-campaign-management",
    description:
      "Data-driven paid search and social campaigns engineered for lead generation — not vanity metrics. Every dollar is optimized for cost-per-acquisition.",
    content: [
      {
        type: "text",
        title: "PPC Built for Lead Gen, Not Brand Awareness",
        content:
          "Most PPC agencies optimize for clicks and impressions. We optimize for qualified leads and cost-per-acquisition. Every campaign we build is designed from the ground up to drive consumer intent — not traffic for traffic's sake.\n\nWe manage end-to-end paid media across Google Ads, Meta, Microsoft Ads, and programmatic networks — always with full transparency into spend, performance, and ROI.",
      },
      {
        type: "features",
        title: "Our PPC Management Approach",
        items: [
          {
            icon: "target",
            title: "Intent-First Keyword Strategy",
            description:
              "We target buyer-intent keywords with proven conversion history — and aggressively exclude irrelevant traffic.",
          },
          {
            icon: "bolt",
            title: "Landing Page Optimization",
            description:
              "We build and A/B test dedicated landing pages designed to convert paid traffic at the highest rate.",
          },
          {
            icon: "chart",
            title: "Bid Automation & AI Optimization",
            description:
              "Smart bidding algorithms continuously optimize toward your target CPA as data accumulates.",
          },
          {
            icon: "shield",
            title: "Fraud & Click Filtering",
            description:
              "Real-time click fraud detection ensures your budget is spent on real human intent — not bots.",
          },
          {
            icon: "star",
            title: "Cross-Channel Attribution",
            description:
              "Accurate attribution across all paid channels so you know exactly what's driving conversions.",
          },
          {
            icon: "check",
            title: "Weekly Performance Reports",
            description:
              "Plain-English reporting every week — what's working, what we changed, and what's next.",
          },
        ],
      },
      {
        type: "text",
        title: "Channels We Manage",
        content:
          "Our PPC team manages campaigns across Google Search, Google Display, YouTube, Meta (Facebook & Instagram), Microsoft Advertising, TikTok, and programmatic DSPs. We match channel selection to your audience and conversion economics — not to our preferred platforms.\n\nMinimum recommended spend is $5,000/month per channel. We work best with advertisers committed to a 90-day optimization runway.",
      },
      {
        type: "cta",
        heading: "Get a Free PPC Audit",
        subheading:
          "We'll analyze your current campaigns, identify waste, and show you exactly where your budget should be going.",
        buttonLabel: "Claim Your Free Audit",
        buttonHref: "/#contact",
      },
    ],
  },
];

async function main() {
  console.log("Seeding solutions…");

  for (const solution of solutions) {
    const existing = await db.industry.findUnique({ where: { slug: solution.slug } });

    if (existing) {
      await db.industry.update({
        where: { slug: solution.slug },
        data: {
          title: solution.title,
          type: "solution",
          description: solution.description,
          content: solution.content as object[],
          isPublished: true,
        },
      });
      console.log(`  Updated: ${solution.slug}`);
    } else {
      await db.industry.create({
        data: {
          title: solution.title,
          slug: solution.slug,
          type: "solution",
          description: solution.description,
          content: solution.content as object[],
          isPublished: true,
          displayOrder: solutions.indexOf(solution),
        },
      });
      console.log(`  Created: ${solution.slug}`);
    }
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

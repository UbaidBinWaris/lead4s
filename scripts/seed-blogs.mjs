import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogSeedData = [
  {
    slug: "how-to-improve-lead-quality-in-2026",
    title: "How to Improve Lead Quality in 2026",
    excerpt:
      "A practical framework for filtering low-intent traffic and improving conversion-ready lead volume.",
    content: `# How to Improve Lead Quality in 2026

Lead quality starts before form submission.

## 1. Tighten Intent Signals
- Use clear qualifiers in your offer copy.
- Match ad intent with landing page messaging.

## 2. Add Smart Form Friction
A few strategic questions can remove low-fit inquiries without hurting volume.

## 3. Optimize by Downstream Outcomes
Measure not just CPL, but contact rate, appointment rate, and close rate.

If you optimize for real business outcomes, lead quality climbs consistently.`,
    author: "Lead4s Team",
    coverImage: null,
  },
  {
    slug: "exclusive-vs-shared-leads-what-scales-faster",
    title: "Exclusive vs Shared Leads: What Scales Faster?",
    excerpt:
      "A comparison of margin, speed-to-contact, and sales efficiency across two common lead delivery models.",
    content: `# Exclusive vs Shared Leads: What Scales Faster?

Exclusive leads usually win when speed and ROI discipline matter.

## Shared Leads
- Lower upfront price
- Higher competitive pressure
- Lower control over contact outcomes

## Exclusive Leads
- Higher price per lead
- Better ownership and follow-up windows
- Stronger consistency for performance teams

For teams that care about predictability, exclusive models generally outperform over time.`,
    author: "Lead4s Research",
    coverImage: null,
  },
  {
    slug: "5-kpis-every-performance-marketer-should-track",
    title: "5 KPIs Every Performance Marketer Should Track",
    excerpt:
      "Move beyond CPL with a KPI stack that aligns campaign decisions with pipeline and revenue impact.",
    content: `# 5 KPIs Every Performance Marketer Should Track

Tracking only CPL creates blind spots.

## KPI Stack
1. Lead-to-contact rate
2. Contact-to-appointment rate
3. Appointment-to-close rate
4. Cost per qualified lead
5. Revenue per acquired lead

This KPI stack gives better optimization signals than front-end metrics alone.`,
    author: "Growth Operations",
    coverImage: null,
  },
  {
    slug: "landing-page-patterns-that-increase-form-completion",
    title: "Landing Page Patterns That Increase Form Completion",
    excerpt:
      "Design and messaging patterns that improve completion rates without sacrificing lead quality.",
    content: `# Landing Page Patterns That Increase Form Completion

Conversion and quality can improve at the same time.

## What Works
- Clear headline with one value proposition
- Fast-loading hero section
- Trust signals near the form
- Short, progressive form steps

High-converting pages reduce hesitation and make intent easier to verify.`,
    author: "Conversion Lab",
    coverImage: null,
  },
  {
    slug: "compliance-checklist-for-consent-based-lead-generation",
    title: "Compliance Checklist for Consent-Based Lead Generation",
    excerpt:
      "A compact checklist to help teams keep documentation clean and campaigns audit-ready.",
    content: `# Compliance Checklist for Consent-Based Lead Generation

Compliance should be operational, not reactive.

## Checklist
- Capture explicit consent language
- Store timestamp and source metadata
- Preserve lead journey context
- Maintain suppression and opt-out logic
- Audit consent records regularly

Teams that systematize compliance reduce risk and maintain buyer trust.`,
    author: "Compliance Desk",
    coverImage: null,
  },
  {
    slug: "from-click-to-call-reducing-lead-response-time",
    title: "From Click to Call: Reducing Lead Response Time",
    excerpt:
      "How routing, alerts, and operational ownership can cut response delays and raise contact rates.",
    content: `# From Click to Call: Reducing Lead Response Time

Speed is one of the strongest predictors of contact success.

## Response Time Levers
- Instant CRM handoff
- Team-level SLA ownership
- Priority queues for high-intent submissions
- Escalation rules for unworked leads

When response operations are engineered, conversion efficiency improves quickly.`,
    author: "Pipeline Team",
    coverImage: null,
  },
];

async function main() {
  for (const item of blogSeedData) {
    await prisma.blog.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        coverImage: item.coverImage,
        author: item.author,
      },
      create: {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        coverImage: item.coverImage,
        author: item.author,
      },
    });
  }
}

try {
  await main();
  console.log(`Seeded ${blogSeedData.length} blog posts.`);
} catch (error) {
  console.error("Failed to seed blogs:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

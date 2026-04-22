/* ─────────────────────────────────────────────────────────────── */
/* DATA: Solutions Listing Page                                    */
/* ─────────────────────────────────────────────────────────────── */

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------
export type SolutionsPageData = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    stats: Array<{ value: string; label: string }>;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  imageBanner: {
    src: string;
    alt: string;
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    body: string;
    cta: { label: string; href: string };
  };
  cardsSection: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    headingEnd: string;
    subheading: string;
    steps: Array<{
      num: string;
      iconName: string;
      title: string;
      body: string;
    }>;
    checklist: {
      heading: string;
      items: Array<{ iconName: string; text: string; highlight?: boolean }>;
      cta: { label: string; href: string };
      note: string;
    };
  };
  proofStats: {
    eyebrow: string;
    items: Array<{ value: string; label: string; sub: string }>;
  };
  colorFallbackBySlug: Record<string, string>;
};

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------
export const solutionsPageData: SolutionsPageData = {
  seo: {
    title:       "Lead Generation Solutions | Lead4s — CPL, Live Transfers & More",
    description: "Explore Lead4s's full suite of lead generation solutions: exclusive CPL leads, live transfer calls, appointment setting, BPO services, and PPC campaign management. Performance-guaranteed.",
    keywords: [
      "lead generation solutions",
      "CPL leads",
      "live transfer calls",
      "appointment setting service",
      "BPO call center",
      "PPC campaign management",
      "exclusive leads",
      "cost per lead",
      "performance marketing solutions",
    ],
    ogTitle:       "Lead Generation Solutions | Lead4s",
    ogDescription: "CPL leads, live transfers, appointment setting, BPO, and PPC management — every solution built for measurable ROI and compliance-first delivery.",
  },

  hero: {
    eyebrow:          "How We Deliver",
    heading:          "Solutions Built",
    headingHighlight: "to Convert",
    subheading:       "Every solution we offer is engineered around one outcome: qualified consumers in front of your sales team. Choose the delivery model that matches your operations and scale with predictable economics.",
    stats: [
      { value: "5",     label: "Core solutions"              },
      { value: "5–10×", label: "vs cold lead conversion"     },
      { value: "48hr",  label: "average ramp time"           },
      { value: "100%",  label: "compliance guaranteed"       },
    ],
    primaryCta:   { label: "Get a Free Consultation", href: "/contact"      },
    secondaryCta: { label: "View Case Studies",       href: "/case-studies" },
  },

  imageBanner: {
    src:              "/images/senior-engineer-working-on-solar-panel-farm-the-c-2026-01-09-07-16-05-utc11-scaled.webp",
    alt:              "Lead4s field operations — solar and home services lead generation",
    eyebrow:          "Built for scale",
    heading:          "Every solution is",
    headingHighlight: "performance-first",
    body:             "We engineer delivery models around your sales team's capacity — not vanity metrics. Real leads, real calls, real appointments.",
    cta:              { label: "Apply for partnership", href: "/partnership" },
  },

  cardsSection: {
    eyebrow:          "Delivery Models",
    heading:          "Choose how you want",
    headingHighlight: "leads delivered",
    subheading:       "Five distinct delivery models, each built for a different sales operation. Mix and match — most clients use two or more.",
  },

  howItWorks: {
    eyebrow:          "How it works",
    heading:          "From signup to",
    headingHighlight: "live leads",
    headingEnd:       "in 48 hours",
    subheading:       "Our onboarding is built to move fast. Most clients receive their first leads within two business days of going live.",
    steps: [
      {
        num:      "01",
        iconName: "LuUsers",
        title:    "Discovery & vertical fit",
        body:     "We review your sales team structure, target geography, budget, and compliance needs to confirm the right delivery model.",
      },
      {
        num:      "02",
        iconName: "LuShieldCheck",
        title:    "Compliance & CRM setup",
        body:     "We integrate directly with your CRM via API or webhook, configure TCPA-compliant consent flows, and QA every funnel.",
      },
      {
        num:      "03",
        iconName: "LuZap",
        title:    "Go live & first leads",
        body:     "Campaigns activate within 24–48 hours. Leads hit your CRM in real time — no batch files, no delays.",
      },
      {
        num:      "04",
        iconName: "LuTrendingUp",
        title:    "Optimize & scale",
        body:     "Your dedicated account manager reviews performance weekly and adjusts targeting, cap, and vertical mix for maximum ROI.",
      },
    ],
    checklist: {
      heading: "Every solution includes",
      items: [
        { iconName: "LuShieldCheck",    text: "TCPA-compliant consent on every lead",          highlight: true },
        { iconName: "LuZap",            text: "Real-time CRM + API delivery (≤50ms)"                          },
        { iconName: "LuClock",          text: "48-hour average go-live from contract"                         },
        { iconName: "LuCircleCheckBig", text: "Dedicated account manager + Slack channel"                     },
        { iconName: "LuTrendingUp",     text: "Weekly performance reports & optimization"                     },
        { iconName: "LuUsers",          text: "No long-term contracts — pause anytime"                        },
        { iconName: "LuChartBar",       text: "Live dashboard: source, timestamp, disposition"                },
        { iconName: "LuTarget",         text: "Geo, age, intent, and vertical targeting"                      },
      ],
      cta:  { label: "Get a free strategy call", href: "/contact" },
      note: "No commitment required · Results in 48 hours",
    },
  },

  proofStats: {
    eyebrow: "Proven at scale",
    items: [
      { value: "2,400+", label: "Active clients", sub: "across all verticals" },
      { value: "98%",    label: "Delivery rate",  sub: "real-time to CRM"    },
      { value: "5–10×",  label: "vs cold leads",  sub: "avg conversion lift" },
      { value: "100%",   label: "TCPA compliant", sub: "on every lead"       },
    ],
  },

  colorFallbackBySlug: {
    "exclusive-leads-cpl-model": "blue",
    "live-transfer-calls":       "emerald",
    "appointment-setting":       "violet",
    "bpo-call-center-services":  "amber",
    "ppc-campaign-management":   "indigo",
  },
};

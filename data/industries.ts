/* ─────────────────────────────────────────────────────────────── */
/* DATA: Industries Listing Page                                   */
/* ─────────────────────────────────────────────────────────────── */

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------
export type IndustriesPageData = {
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
  sectionHeader: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
  };
  whySection: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    items: Array<{
      iconName: string;
      colorClass: string;
      bgClass: string;
      title: string;
      body: string;
    }>;
  };
  complianceBadges: string[];
  industryList: Array<{ name: string; url: string }>;
  faqSection: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Array<{ q: string; a: string }>;
  };
  editorialCards: Array<{
    iconName: string;
    iconColorClass: string;
    iconBgClass: string;
    heading: string;
    body: string;
  }>;
  colorFallbackBySlug: Record<string, string>;
};

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------
export const industriesPageData: IndustriesPageData = {
  seo: {
    title: "Industries We Serve | Lead4s — Exclusive Lead Generation",
    description:
      "Lead4s delivers exclusive, TCPA-compliant leads across solar, home improvement, insurance, legal, and Medicare verticals. Explore our industry-specific lead generation programs.",
    keywords: [
      "lead generation by industry",
      "exclusive leads",
      "solar leads",
      "insurance leads",
      "home improvement leads",
      "Medicare leads",
      "TCPA compliant leads",
      "live transfer calls",
      "performance marketing",
    ],
    ogTitle: "Industries We Serve | Lead4s",
    ogDescription:
      "Exclusive, verified leads for solar, insurance, home improvement, legal, and Medicare verticals. Real-time delivery. TCPA compliant.",
  },

  hero: {
    eyebrow: "Our Verticals",
    heading: "Industries We",
    headingHighlight: "Power & Scale",
    subheading:
      "We operate inside the most competitive consumer acquisition verticals in the US. Every industry program is built around vertical-specific compliance rules, buyer intent signals, and conversion benchmarks — not generic traffic.",
    stats: [
      { value: "6",      label: "Core verticals"   },
      { value: "2,400+", label: "Active clients"   },
      { value: "94%",    label: "Client retention" },
      { value: "3.8×",   label: "Average ROI"      },
    ],
    primaryCta:   { label: "Get Qualified Leads",      href: "/contact"     },
    secondaryCta: { label: "Apply for Partnership",    href: "/partnership" },
  },

  sectionHeader: {
    eyebrow:          "Proven Verticals",
    heading:          "Every vertical is built",
    headingHighlight: "differently",
    subheading:
      "Compliance rules, buyer intent signals, and conversion benchmarks vary by industry. We build each program from scratch — not from a template.",
  },

  whySection: {
    eyebrow:          "Why Lead4s",
    heading:          "How we're different from every other",
    headingHighlight: "lead vendor",
    subheading:
      "Most lead providers resell the same pools of aged, shared contacts. Lead4s builds vertical-specific acquisition funnels from scratch, delivering leads that are exclusive, real-time, and consent-verified on every single transaction.",
    items: [
      {
        iconName:      "LuShieldCheck",
        colorClass:    "text-brand-400",
        bgClass:       "bg-brand-500/10 ring-brand-400/20",
        title:         "TCPA-Verified on Every Lead",
        body:          "Every lead carries a TrustForm consent certificate with source URL, IP address, timestamp, and opt-in language — stored and available for audit on demand.",
      },
      {
        iconName:      "LuZap",
        colorClass:    "text-amber-400",
        bgClass:       "bg-amber-500/10 ring-amber-400/20",
        title:         "Real-Time Delivery — 50ms Average",
        body:          "Leads hit your CRM or dialer within 50ms of form submission. No batch files, no CSV exports, no next-morning delays. Speed to call is the single biggest driver of close rates.",
      },
      {
        iconName:      "LuTarget",
        colorClass:    "text-emerald-400",
        bgClass:       "bg-emerald-500/10 ring-emerald-400/20",
        title:         "100% Exclusive — Never Resold",
        body:          "Your leads are yours alone. We never sell the same consumer to a competing buyer. Exclusivity is why Lead4s clients average a 30–40% higher close rate than shared-lead programs.",
      },
      {
        iconName:      "LuTrendingUp",
        colorClass:    "text-violet-400",
        bgClass:       "bg-violet-500/10 ring-violet-400/20",
        title:         "Vertical-Specific Funnels",
        body:          "Solar funnels are built completely differently from Medicare or MVA funnels — different ad channels, different qualifying questions, different compliance stacks. We build each from zero.",
      },
      {
        iconName:      "LuUsers",
        colorClass:    "text-teal-400",
        bgClass:       "bg-teal-500/10 ring-teal-400/20",
        title:         "Dedicated Account Management",
        body:          "Every client gets a named account manager, a shared Slack channel, and weekly optimization reviews. We're aligned to your close rate, not just your order volume.",
      },
      {
        iconName:      "LuCircleCheck",
        colorClass:    "text-indigo-400",
        bgClass:       "bg-indigo-500/10 ring-indigo-400/20",
        title:         "No Long-Term Contracts",
        body:          "Month-to-month by default. Pause, scale, or cancel with standard notice. Our retention rate is 94% because clients stay by choice — not because they're locked in.",
      },
    ],
  },

  complianceBadges: [
    "TCPA Compliant",
    "TrustForm Certified",
    "CAN-SPAM Compliant",
    "CCPA Ready",
    "CMS-Approved (Medicare)",
    "Consent Timestamped",
    "Source URL Recorded",
    "Real-Time Fraud Screening",
  ],

  industryList: [
    { name: "Solar Leads & Live Transfers",  url: "/industries/solar-leads"               },
    { name: "Home Improvement Leads",        url: "/industries/home-improvement-leads"    },
    { name: "Final Expense Leads",           url: "/industries/final-expense-lead"        },
    { name: "Auto Insurance Leads",          url: "/industries/auto-insurance-leads"      },
    { name: "MVA & Personal Injury Leads",   url: "/industries/mva-personal-injury-leads" },
    { name: "Medicare Leads for 65+",        url: "/industries/medicare-o65"              },
  ],

  faqSection: {
    eyebrow:    "Common questions",
    heading:    "Frequently asked questions",
    subheading: "Everything buyers ask before their first order. Still have questions?",
    items: [
      {
        q: "What industries does Lead4s generate leads for?",
        a: "Lead4s generates exclusive, TCPA-compliant leads across six core verticals: Solar energy, Home improvement, Final expense life insurance, Auto insurance, MVA & Personal injury law, and Medicare (AEP/OEP) for consumers turning 65.",
      },
      {
        q: "Are Lead4s leads TCPA compliant?",
        a: "Yes. Every lead generated by Lead4s carries a TrustForm or equivalent consent certificate verifying the consumer opted in under current TCPA regulations. Lead source, timestamp, and IP are recorded on every lead.",
      },
      {
        q: "How quickly are leads delivered after a consumer submits their information?",
        a: "Leads are delivered in real time — typically within 50 milliseconds of submission — directly to your CRM or dialer via API or webhook. There are no batch files or overnight delays.",
      },
      {
        q: "Do you offer exclusive leads or shared leads?",
        a: "Lead4s operates on an exclusive model. Every lead is sold once and only to you. We do not resell leads to competing buyers, which is why our close rates average 30% higher than shared-lead providers.",
      },
      {
        q: "What is the average ROI clients see from Lead4s leads?",
        a: "Clients report an average 3.8× ROI across all verticals. Live-transfer clients in solar and insurance routinely see 5× to 10× returns versus cold-prospecting costs, because leads are connected in real time while interest is highest.",
      },
      {
        q: "Can I choose the geography and demographic filters for my leads?",
        a: "Yes. Lead4s supports state-level, DMA, and ZIP-code targeting along with age, income band, homeowner status, and vertical-specific intent filters. Call caps, daily volume, and time-of-day delivery windows are all configurable.",
      },
      {
        q: "Is there a long-term contract required?",
        a: "No. Lead4s operates on a flexible, no long-term-contract basis. Clients can pause, adjust volume, or cancel with standard notice. Most clients expand within 90 days based on performance.",
      },
    ],
  },

  editorialCards: [
    {
      iconName:       "LuTarget",
      iconColorClass: "text-brand-400",
      iconBgClass:    "bg-brand-500/10 ring-brand-400/20",
      heading:        "Exclusive lead generation across the most competitive US verticals",
      body:           "Lead4s operates inside six of the highest-volume consumer acquisition verticals in the United States: solar energy leads, home improvement leads, final expense insurance leads, auto insurance leads, MVA & personal injury leads, and Medicare leads for seniors turning 65. Each vertical has unique compliance requirements, distinct buyer-intent signals, and different close-rate economics. Lead4s builds a purpose-built acquisition funnel for each — not a single generic campaign served across all verticals.",
    },
    {
      iconName:       "LuTrendingUp",
      iconColorClass: "text-accent-400",
      iconBgClass:    "bg-accent-500/10 ring-accent-500/20",
      heading:        "What makes Lead4s leads different from shared-lead networks?",
      body:           "Shared-lead networks aggregate consumer data and sell each contact to multiple competing buyers simultaneously. Lead4s operates on a strictly exclusive model: every lead is generated through a branded or white-label funnel owned by Lead4s, and each contact is delivered to exactly one buyer — your team — within milliseconds of submission. This exclusivity is why Lead4s clients consistently report 30–40% higher contact rates and 3–5× higher close rates than buyers using national shared-lead marketplaces.",
    },
    {
      iconName:       "LuShieldCheck",
      iconColorClass: "text-emerald-400",
      iconBgClass:    "bg-emerald-500/10 ring-emerald-400/20",
      heading:        "TCPA compliance and consent verification",
      body:           "Every lead generated by Lead4s is covered by a TrustForm or equivalent consent certificate. The certificate records the exact opt-in language presented to the consumer, the timestamp of their consent, the source URL, and the consumer's IP address. This documentation meets current TCPA (Telephone Consumer Protection Act) standards and is stored and available for legal audit. For Medicare leads, all acquisition activity complies with CMS marketing guidelines.",
    },
  ],

  colorFallbackBySlug: {
    "solar-leads":               "amber",
    "home-improvement-leads":    "emerald",
    "final-expense-lead":        "violet",
    "auto-insurance-leads":      "blue",
    "mva-personal-injury-leads": "red",
    "medicare-o65":              "teal",
  },
};

/* ─────────────────────────────────────────────────────────────── */
/* DATA: Industries Listing Page                                   */
/* ─────────────────────────────────────────────────────────────── */

export type IndustryCardData = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  /** Key maps to ACCENT_MAP in the page component */
  color: "amber" | "emerald" | "violet" | "blue" | "red" | "teal";
  tags: string[];
  metric: { value: string; label: string };
};

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
    headingEnd: string;
    subheading: string;
    stats: Array<{ value: string; label: string }>;
  };
  cta: {
    heading: string;
    headingHighlight: string;
    subheading: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  industries: IndustryCardData[];
};

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
    headingEnd: "",
    subheading:
      "We operate inside the most competitive consumer acquisition verticals in the US. Every industry program is built around vertical-specific compliance rules, buyer intent signals, and conversion benchmarks — not generic traffic.",
    stats: [
      { value: "6", label: "Core verticals" },
      { value: "2,400+", label: "Active clients" },
      { value: "94%", label: "Client retention" },
      { value: "3.8×", label: "Average ROI" },
    ],
  },

  cta: {
    heading: "Don't see your vertical?",
    headingHighlight: "Let's talk.",
    subheading:
      "We expand into new industries regularly. If your vertical needs exclusive, verified consumer leads, we want to hear from you.",
    primaryLabel: "Apply for Partnership",
    primaryHref: "/partnership",
    secondaryLabel: "Schedule a Call",
    secondaryHref: "https://calendly.com/talatkhan/new-meeting",
  },

  industries: [
    {
      slug: "solar-leads",
      title: "Solar Leads & Live Transfers",
      description:
        "Homeowner-verified solar leads with real-time roof-ownership and utility-bill qualification. We deliver pre-screened, high-intent prospects ready to hear your offer — not recycled cold lists.",
      icon: "☀️",
      color: "amber",
      tags: ["Homeowners", "CPL Model", "Live Transfer"],
      metric: { value: "$0 wasted", label: "on unverified contacts" },
    },
    {
      slug: "home-improvement-leads",
      title: "Home Improvement Leads",
      description:
        "Roofing, windows, HVAC, siding, and remodeling leads sourced from homeowners actively seeking contractors. Geo-targeted, ownership-verified, and delivered to your CRM in real time.",
      icon: "🏠",
      color: "emerald",
      tags: ["Roofing", "HVAC", "Windows", "Remodeling"],
      metric: { value: "48hr", label: "average delivery window" },
    },
    {
      slug: "final-expense-lead",
      title: "Final Expense Leads",
      description:
        "Aged 50–80 consumers who have expressed interest in final expense and life insurance coverage. All leads are consent-verified under TCPA guidelines with real-time DNC scrubbing applied.",
      icon: "🛡️",
      color: "violet",
      tags: ["Ages 50–80", "TCPA Verified", "Final Expense"],
      metric: { value: "100%", label: "exclusive — never shared" },
    },
    {
      slug: "auto-insurance-leads",
      title: "Auto Insurance Leads",
      description:
        "Drivers actively shopping for new auto coverage, delivered in under 60 seconds from point of capture. Filter by state, vehicle type, current carrier, and desired coverage tier.",
      icon: "🚗",
      color: "blue",
      tags: ["Auto", "P&C", "Inbound Intent"],
      metric: { value: "<60s", label: "lead delivery time" },
    },
    {
      slug: "mva-personal-injury-leads",
      title: "MVA & Personal Injury Leads",
      description:
        "Motor vehicle accident victims actively seeking legal representation. Leads are screened for accident recency, fault determination, and injury severity before reaching your intake team.",
      icon: "⚖️",
      color: "red",
      tags: ["MVA", "Personal Injury", "Legal"],
      metric: { value: "3-step", label: "pre-qualification process" },
    },
    {
      slug: "medicare-o65",
      title: "Medicare O65 Leads",
      description:
        "Adults 64+ approaching Medicare eligibility or actively shopping for Advantage, Supplement, or Part D plans. CMS-compliant lead generation with verified consent and benefit-year targeting.",
      icon: "💊",
      color: "teal",
      tags: ["Medicare", "AEP / OEP", "CMS Compliant"],
      metric: { value: "CMS", label: "fully compliant process" },
    },
  ],
};

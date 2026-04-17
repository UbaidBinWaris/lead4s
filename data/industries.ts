/* ─────────────────────────────────────────────────────────────── */
/* DATA: Industries Listing Page                                   */
/* ─────────────────────────────────────────────────────────────── */

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
};

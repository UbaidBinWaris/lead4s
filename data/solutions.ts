/* ─────────────────────────────────────────────────────────────── */
/* DATA: Solutions Listing Page                                    */
/* ─────────────────────────────────────────────────────────────── */

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

export const solutionsPageData: SolutionsPageData = {
  seo: {
    title: "Lead Generation Solutions | Lead4s — CPL, Live Transfers & More",
    description:
      "Explore Lead4s's full suite of lead generation solutions: exclusive CPL leads, live transfer calls, appointment setting, BPO services, and PPC campaign management. Performance-guaranteed.",
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
    ogTitle: "Lead Generation Solutions | Lead4s",
    ogDescription:
      "CPL leads, live transfers, appointment setting, BPO, and PPC management — every solution built for measurable ROI and compliance-first delivery.",
  },

  hero: {
    eyebrow: "How We Deliver",
    heading: "Solutions Built",
    headingHighlight: "to Convert",
    headingEnd: "",
    subheading:
      "Every solution we offer is engineered around one outcome: qualified consumers in front of your sales team. Choose the delivery model that matches your operations and scale with predictable economics.",
    stats: [
      { value: "5", label: "Core solutions" },
      { value: "5–10×", label: "vs cold lead conversion" },
      { value: "48hr", label: "average ramp time" },
      { value: "100%", label: "compliance guaranteed" },
    ],
  },

  cta: {
    heading: "Not sure which solution",
    headingHighlight: "fits your team?",
    subheading:
      "Most clients combine two or more solutions. We'll map the right delivery model to your sales team's capacity and closing rate — at no cost.",
    primaryLabel: "Get a Free Consultation",
    primaryHref: "/#contact",
    secondaryLabel: "View Case Studies",
    secondaryHref: "/case-studies",
  },
};

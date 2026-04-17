/* ─────────────────────────────────────────────────────────────── */
/* DATA: Solutions Listing Page                                    */
/* ─────────────────────────────────────────────────────────────── */

export type SolutionCardData = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  /** Key maps to ACCENT_MAP in the page component */
  color: "blue" | "emerald" | "violet" | "amber" | "indigo";
  tags: string[];
  metric: { value: string; label: string };
  benefit: string;
};

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
  solutions: SolutionCardData[];
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

  solutions: [
    {
      slug: "exclusive-leads-cpl-model",
      title: "Exclusive Leads (CPL Model)",
      description:
        "Pay only for verified leads that meet your exact criteria. No shared pools, no retainers, no wasted spend. Every lead is yours exclusively — delivered real-time with full data transparency.",
      icon: "🎯",
      color: "blue",
      tags: ["Cost Per Lead", "Exclusive", "Real-Time"],
      metric: { value: "0 shared", label: "leads — 100% exclusive" },
      benefit: "Fixed cost-per-acquisition",
    },
    {
      slug: "live-transfer-calls",
      title: "Live Transfer Calls",
      description:
        "Pre-qualified consumers transferred live to your agents the moment they express buying intent. Our agents do the qualification; your team focuses entirely on closing.",
      icon: "📞",
      color: "emerald",
      tags: ["Warm Transfer", "Pre-Qualified", "TCPA Compliant"],
      metric: { value: "5–10×", label: "higher conversion vs cold" },
      benefit: "Your closers close — we handle the rest",
    },
    {
      slug: "appointment-setting",
      title: "Appointment Setting",
      description:
        "We fill your calendar with confirmed, decision-maker appointments. Multi-channel outreach, CRM sync, and automated reminders keep your no-show rate under 15%.",
      icon: "📅",
      color: "violet",
      tags: ["Calendar Filling", "Multi-Channel", "CRM Sync"],
      metric: { value: "<15%", label: "average no-show rate" },
      benefit: "Full calendar without hiring SDRs",
    },
    {
      slug: "bpo-call-center-services",
      title: "BPO & Call Center Services",
      description:
        "A fully staffed, trained, and compliant call center extension of your team — inbound, outbound, or blended. Scale up or down with 48-hour notice, zero overhead.",
      icon: "🏢",
      color: "amber",
      tags: ["Inbound", "Outbound", "24/7 Available"],
      metric: { value: "48hr", label: "to full operational capacity" },
      benefit: "Enterprise operations without enterprise cost",
    },
    {
      slug: "ppc-campaign-management",
      title: "PPC Campaign Management",
      description:
        "Data-driven paid search and social campaigns optimized for cost-per-acquisition — not vanity clicks. We manage Google, Meta, Microsoft, and TikTok with full transparency.",
      icon: "📈",
      color: "indigo",
      tags: ["Google Ads", "Meta", "CPA Optimized"],
      metric: { value: "Full", label: "cross-channel attribution" },
      benefit: "Every dollar tracked to revenue",
    },
  ],
};

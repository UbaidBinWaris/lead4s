export type CtaBadge = {
  label: string;
};

export type CtaAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
};

export type CtaQuickContact = {
  label: string;
  value: string;
  href: string;
};

export type CtaContent = {
  kicker: string;
  heading: string;
  highlighted: string;
  description: string;
  logos: string[];
  actions: CtaAction[];
  quickContacts: CtaQuickContact[];
  trustBadges: CtaBadge[];
};

export const ctaContent: CtaContent = {
  kicker: "Ready to scale with predictable lead flow?",
  heading: "Built for serious buyers who need",
  highlighted: "reliable, compliant, and scalable volume",
  description:
    "Lead4s delivers exclusive leads, live transfer calls, and appointment setting across core growth verticals. Connect your team in minutes and scale with confidence.",
  logos: [
    "Solar Providers",
    "Home Improvement",
    "Insurance Buyers",
    "Legal Firms",
    "Marketing Agencies",
    "BPO Teams",
  ],
  actions: [
    {
      label: "Apply for partnership",
      href: "/partnership",
      variant: "primary",
    },
    {
      label: "Schedule strategy call",
      href: "https://calendly.com/talatkhan/new-meeting",
      variant: "secondary",
      external: true,
    },
  ],
  quickContacts: [
    {
      label: "Talk to an expert",
      value: "+1 (702) 761-0192",
      href: "tel:+17027610192",
    },
    {
      label: "Email us",
      value: "info@lead4s.com",
      href: "mailto:info@lead4s.com",
    },
  ],
  trustBadges: [
    { label: "TrustedForm + TCPA verification" },
    { label: "Real-time CRM + API delivery" },
    { label: "Weekly optimization cycles" },
    { label: "Dedicated account management" },
  ],
};
export type HeaderLink = {
  label: string;
  href: string;
  children?: HeaderLink[];
};

export type HeaderData = {
  companyName: string;
  logoPath: string;
  heading: string;
  subheading: string;
  links: HeaderLink[];
};

export const headerData: HeaderData = {
  companyName: "Lead4s",
  logoPath: "/icon.png",
  heading: "The Force behind your success",
  subheading: "",
  links: [
    { label: "Home", href: "/" },
    {
      label: "Industries",
      href: "#",
      children: [
        { label: "Solar Leads & Live Transfers", href: "/solar-leads/" },
        {
          label: "Home Improvement Leads",
          href: "/home-improvement-leads",
        },
        { label: "Final Expense Leads", href: "/final-expense-lead" },
        { label: "Auto Insurance Leads", href: "/auto-insurance-leads" },
        {
          label: "MVA & Personal Injury Leads",
          href: "/mva-personal-injury-leads",
        },
        { label: "Medicare O65 Leads", href: "/medicare-o65" },
      ],
    },
    {
      label: "Solutions",
      href: "#",
      children: [
        {
          label: "Exclusive Leads (CPL Model)",
          href: "/exclusive-leads-cpl-model",
        },
        { label: "Live Transfer Calls", href: "/live-transfer-calls" },
        { label: "Appointment Setting", href: "/appointment-setting" },
        {
          label: "BPO & Call Center Services",
          href: "/bpo-call-center-services",
        },
        {
          label: "PPC Campaign Management",
          href: "/ppc-campaign-management",
        },
      ],
    },
    { label: "Compliance", href: "/compliance" },
    { label: "Blogs", href: "/blog-posts" },
    { label: "About", href: "/about-us/" },
  ],
};

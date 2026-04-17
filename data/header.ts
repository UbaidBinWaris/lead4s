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
      href: "/industries",
      children: [
        { label: "Solar Leads & Live Transfers", href: "/industries/solar-leads" },
        { label: "Home Improvement Leads", href: "/industries/home-improvement-leads" },
        { label: "Final Expense Leads", href: "/industries/final-expense-lead" },
        { label: "Auto Insurance Leads", href: "/industries/auto-insurance-leads" },
        { label: "MVA & Personal Injury Leads", href: "/industries/mva-personal-injury-leads" },
        { label: "Medicare O65 Leads", href: "/industries/medicare-o65" },
      ],
    },
    {
      label: "Solutions",
      href: "/solutions",
      children: [
        {
          label: "Exclusive Leads (CPL Model)",
          href: "/solutions/exclusive-leads-cpl-model",
        },
        { label: "Live Transfer Calls", href: "/solutions/live-transfer-calls" },
        { label: "Appointment Setting", href: "/solutions/appointment-setting" },
        {
          label: "BPO & Call Center Services",
          href: "/solutions/bpo-call-center-services",
        },
        {
          label: "PPC Campaign Management",
          href: "/solutions/ppc-campaign-management",
        },
      ],
    },
    { label: "Blogs", href: "/blog" },
    { label: "About", href: "/about" },
  ],
};

export type FooterSocial = {
  label: string;
  href: string;
  platform: "facebook" | "linkedin" | "instagram";
};

export type FooterContactItem = {
  label: string;
  value: string;
  href?: string;
  icon: "phone" | "email" | "location";
};

export type FooterUsefulLink = {
  label: string;
  href: string;
};

export type FooterNewsletter = {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
};

export type FooterContent = {
  brandName: string;
  tagline: string;
  logoPath: string;
  socials: FooterSocial[];
  contactTitle: string;
  contactItems: FooterContactItem[];
  usefulInfoTitle: string;
  usefulLinks: FooterUsefulLink[];
  newsletter: FooterNewsletter;
  bottomLinks: FooterUsefulLink[];
};

export const footerContent: FooterContent = {
  brandName: "Lead4s",
  tagline: "The Force Behind Your Success",
  logoPath: "/icon.png",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/lead.4s/?paipv=0",
      platform: "facebook",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/lead4s/?originalSubdomain=pk",
      platform: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/lead4s.llc/?locale=en-GB",
      platform: "instagram",
    },
  ],
  contactTitle: "Contact Info",
  contactItems: [
    {
      label: "Phone",
      value: "+1 (702) 761-0192",
      href: "tel:+17027610192",
      icon: "phone",
    },
    {
      label: "Email",
      value: "info@lead4s.com",
      href: "mailto:info@lead4s.com",
      icon: "email",
    },
    {
      label: "Address",
      value: "10340 W Serene Ave, Las Vegas, NV 89161, USA",
      icon: "location",
    },
  ],
  usefulInfoTitle: "Useful Info",
  usefulLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Compliance", href: "/Compliance" },
    { label: "Career", href: "/career/" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description:
      "Sign up for my newsletter to get latest updates. Do not worry, we will never spam you.",
    placeholder: "Email Address",
    buttonLabel: "Submit",
  },
  bottomLinks: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};

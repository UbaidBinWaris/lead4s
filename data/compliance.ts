export type ComplianceCard = {
  title: string;
  description: string;
};

export type ComplianceStep = {
  title: string;
  description: string;
};

export type ComplianceMetric = {
  label: string;
  value: string;
};

export const complianceHero = {
  kicker: "Compliance & Consumer Data Protection",
  title: "Built for Transparent, Consent-Driven Lead Acquisition",
  description:
    "Lead4s operates structured compliance frameworks designed to protect consumers, partners, and advertising platforms across every campaign.",
  supporting:
    "Our systems ensure transparency, consent verification, and responsible data handling across each stage of lead acquisition.",
};

export const compliancePillars: ComplianceCard[] = [
  {
    title: "Structured Compliance Systems",
    description:
      "Compliance verification is integrated directly into campaign operations so inquiries are captured through documented, verified channels.",
  },
  {
    title: "TCPA-Aligned Practices",
    description:
      "Campaigns are designed to align with TCPA standards so consumers voluntarily submit details with clear contact expectations.",
  },
  {
    title: "Verified Lead Documentation",
    description:
      "Multiple verification layers help validate lead origin, consent records, and acquisition transparency.",
  },
];

export const complianceMetrics: ComplianceMetric[] = [
  { label: "Framework Coverage", value: "TCPA + Consent + Documentation" },
  { label: "Lead Handling", value: "Verified and Audit-Ready" },
  { label: "Partner Fit", value: "Compliance-First Organizations" },
];

export const complianceProcess: ComplianceStep[] = [
  {
    title: "Consent Capture",
    description:
      "Consumers submit inquiries through transparent forms with clear disclosure language and expected contact context.",
  },
  {
    title: "Verification Layer",
    description:
      "Lead origin, submission flow, and documentation signals are validated using structured verification checkpoints.",
  },
  {
    title: "Quality and Compliance Review",
    description:
      "Campaign quality controls are applied before lead distribution to support responsible partner outreach.",
  },
  {
    title: "Partner Delivery Controls",
    description:
      "Leads are distributed to partners expected to follow privacy, contact governance, and responsible data handling.",
  },
];

export const ethicalStandards: string[] = [
  "Clear consumer communication",
  "Honest marketing messaging",
  "Accurate service representation",
  "Responsible advertising practices",
];

export const partnerRequirements: ComplianceCard[] = [
  {
    title: "Privacy-Respecting Partners",
    description:
      "We work with partners who treat consumer privacy and data integrity as operational requirements, not optional policies.",
  },
  {
    title: "Responsible Contact Rules",
    description:
      "Partners are expected to follow applicable regulations for consumer contact, outreach frequency, and data use.",
  },
  {
    title: "Mutual Compliance Standards",
    description:
      "Maintaining strict standards on both sides creates a sustainable lead ecosystem with long-term trust.",
  },
];

export const longTermCommitments: ComplianceCard[] = [
  {
    title: "Protect Consumers",
    description:
      "Strong compliance systems safeguard consumer rights while preserving campaign transparency.",
  },
  {
    title: "Protect Partners",
    description:
      "Reliable documentation and consent hygiene reduce operational risk and improve lead quality confidence.",
  },
  {
    title: "Evolve Continuously",
    description:
      "We continue investing in compliance infrastructure to stay aligned with changing regulations and platform requirements.",
  },
];

export const complianceControls: ComplianceCard[] = [
  {
    title: "Consent Record Integrity",
    description:
      "Every campaign flow is built to preserve clarity around how consent is collected and documented.",
  },
  {
    title: "Transparent Acquisition Channels",
    description:
      "We prioritize verified traffic sources and responsible messaging standards across acquisition campaigns.",
  },
  {
    title: "Responsible Contact Expectations",
    description:
      "Consumers are informed that service providers may contact them, supporting clearer communication and trust.",
  },
  {
    title: "Continuous Process Improvement",
    description:
      "Compliance systems are updated as regulations and platform requirements evolve.",
  },
];

export const complianceFaq: ComplianceCard[] = [
  {
    title: "How does Lead4s help reduce compliance risk?",
    description:
      "By operating structured acquisition, verification, and documentation workflows designed for transparency and audit readiness.",
  },
  {
    title: "Do you align campaigns with TCPA expectations?",
    description:
      "Yes. Campaign structures are designed around voluntary inquiry capture, disclosure clarity, and responsible contact alignment.",
  },
  {
    title: "What type of partners does Lead4s work with?",
    description:
      "Businesses that respect consumer privacy, follow applicable outreach rules, and maintain accountable data handling practices.",
  },
];

export const complianceContact = {
  heading: "Partner With a Compliance-Focused Lead Network",
  description:
    "If your organization requires reliable, transparent, and compliant lead generation, Lead4s can help.",
  phone: "+1 (702) 761-0192",
  phoneHref: "tel:+17027610192",
  email: "info@lead4s.com",
  emailHref: "mailto:info@lead4s.com",
  partnershipHref: "/partnership",
  strategyCallHref: "https://calendly.com/talatkhan/new-meeting",
};

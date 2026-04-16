/* ──────────────────────────────────────────────────────────── */
/* DATA: About Page Content */
/* ──────────────────────────────────────────────────────────── */

export type HeroSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  ctas: Array<{
    label: string;
    href: string;
    variant: "primary" | "secondary";
    icon: string;
  }>;
  trustBadges: string[];
};

export type WhoWeAreSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  storyParagraphs: string[];
  stats: Array<{ value: string; label: string }>;
  pillars: Array<{
    icon: string;
    title: string;
    body: string;
  }>;
};

export type ServiceCard = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  featured?: boolean;
  colorScheme: {
    glowColor: string;
    accentClass: string;
    bgClass: string;
    borderClass: string;
    badgeClass: string;
  };
};

export type WhatWeDoSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  services: ServiceCard[];
};

export type InfrastructureItem = {
  icon: string;
  title: string;
  description: string;
  color: {
    text: string;
    bg: string;
  };
};

export type InfrastructureSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  capabilities: InfrastructureItem[];
  badges: string[];
};

export type MissionVisionCard = {
  icon: string;
  label: string;
  heading: string;
  body: string;
  accent: string;
  iconBg: string;
  border: string;
  glow: string;
};

export type MissionVisionSection = {
  eyebrow: string;
  cards: MissionVisionCard[];
  values: Array<{ value: string; sub: string }>;
};

export type WhyChooseUsReason = {
  icon: string;
  title: string;
  body: string;
};

export type WhyChooseUsSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  description: string;
  reasons: WhyChooseUsReason[];
};

export type ComplianceBadge = {
  icon: string;
  title: string;
  description: string;
  color: {
    icon: string;
    bg: string;
    border: string;
  };
};

export type ComplianceSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  badges: ComplianceBadge[];
  statement: string;
};

export type IndustryCard = {
  emoji: string;
  title: string;
  description: string;
  count: string;
};

export type IndustriesSection = {
  eyebrow: string;
  heading: string;
  subheading: string;
  industries: IndustryCard[];
};

export type ResultsStat = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
};

export type ResultsSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  stats: ResultsStat[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
  linkedin: string | null;
  twitter: string | null;
};

export type TeamSection = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  members: TeamMember[];
};

export type AboutData = {
  hero: HeroSection;
  whoWeAre: WhoWeAreSection;
  whatWeDo: WhatWeDoSection;
  infrastructure: InfrastructureSection;
  results: ResultsSection;
  missionVision: MissionVisionSection;
  whyChooseUs: WhyChooseUsSection;
  compliance: ComplianceSection;
  industries: IndustriesSection;
  team: TeamSection;
};

export const aboutData: AboutData = {
  hero: {
    eyebrow: "About Lead4s",
    heading: "Powering High-Intent",
    headingHighlight: "Customer Acquisition",
    subheading:
      "Lead4s is a performance-driven lead generation network connecting high-growth businesses with verified, purchase-ready consumers. We don't sell impressions — we deliver revenue.",
    ctas: [
      {
        label: "Apply Now",
        href: "/career",
        variant: "primary",
        icon: "handshake",
      },
      {
        label: "Schedule a Call",
        href: "/#contact",
        variant: "secondary",
        icon: "calendar",
      },
    ],
    trustBadges: [
      "TCPA Compliant",
      "TrustedForm Certified",
      "SOC 2 Ready",
      "50+ State Coverage",
    ],
  },

  whoWeAre: {
    eyebrow: "Our story",
    heading: "A Network Built to",
    headingHighlight: "Outperform",
    storyParagraphs: [
      "Lead4s was founded with a single obsession: help businesses acquire customers at a cost that makes growth inevitable. We saw an industry full of brokers selling recycled data and built the opposite — an exclusive, first-party lead network powered by owned media, proprietary funnels, and real-time verification technology.",
      "Today, Lead4s operates across 50+ states, serving insurance carriers, solar installers, legal firms, and financial advisors who demand quality over quantity. Our infrastructure processes millions of consumer inquiries monthly — filtering, scoring, and delivering only the highest-intent prospects to your sales team.",
    ],
    stats: [
      { value: "50+", label: "States" },
      { value: "10M+", label: "Leads delivered" },
      { value: "98%", label: "Partner retention" },
    ],
    pillars: [
      {
        icon: "rocket",
        title: "Founded on Performance",
        body: "Every campaign, every channel, every lead is measured against one KPI: revenue generated for our partners.",
      },
      {
        icon: "network",
        title: "Built for Scale",
        body: "Our proprietary distribution infrastructure routes millions of qualified inquiries per month without a single point of failure.",
      },
      {
        icon: "bolt",
        title: "Speed as Competitive Edge",
        body: "Lead-to-contact times under 60 seconds. Our real-time delivery stack ensures you're the first call a prospect ever receives.",
      },
    ],
  },

  whatWeDo: {
    eyebrow: "What we do",
    heading: "Three Ways We Drive",
    headingHighlight: "Your Revenue",
    subheading:
      "Whether you need data, conversations, or booked meetings — we operate all three channels with the same relentless focus on conversion rate.",
    services: [
      {
        icon: "star",
        title: "Exclusive Leads",
        description:
          "Every lead is generated exclusively for you — never recycled, never shared. First-party data collected from owned funnels and verified in real time.",
        features: [
          "First-party data only",
          "Real-time ping/post delivery",
          "100% exclusive ownership",
        ],
        colorScheme: {
          glowColor: "37,99,235",
          accentClass: "text-brand-400",
          bgClass: "bg-brand-600/15 group-hover:bg-brand-600/25",
          borderClass: "group-hover:border-brand-700/60",
          badgeClass: "bg-brand-500/10 text-brand-400 border-brand-500/20",
        },
      },
      {
        icon: "phone",
        title: "Live Transfers",
        description:
          "A warm, qualified consumer gets connected directly to your sales team in real time. No voicemails, no cold lists — just live conversations with buyers.",
        features: [
          "Sub-60s connect times",
          "Pre-screened & consented",
          "Custom IVR scripting",
        ],
        featured: true,
        colorScheme: {
          glowColor: "249,115,22",
          accentClass: "text-accent-400",
          bgClass: "bg-accent-500/15 group-hover:bg-accent-500/25",
          borderClass: "group-hover:border-accent-500/40",
          badgeClass: "bg-accent-500/10 text-accent-400 border-accent-500/20",
        },
      },
      {
        icon: "calendar-check",
        title: "Appointment Setting",
        description:
          "Our agents pre-qualify, nurture, and schedule meetings directly onto your calendar — so your closers only show up for deals that are ready to close.",
        features: [
          "Dedicated appointment agents",
          "CRM-integrated scheduling",
          "Confirmation & reminders",
        ],
        colorScheme: {
          glowColor: "16,185,129",
          accentClass: "text-emerald-400",
          bgClass: "bg-emerald-500/15 group-hover:bg-emerald-500/25",
          borderClass: "group-hover:border-emerald-500/40",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        },
      },
    ],
  },

  infrastructure: {
    eyebrow: "Technical capabilities",
    heading: "Enterprise-Grade",
    headingHighlight: "Infrastructure",
    subheading:
      "Every component of our stack is designed for reliability, speed, and compliance — so your pipeline never misses a beat.",
    capabilities: [
      {
        icon: "sync",
        title: "CRM Integrations",
        description:
          "Native sync with Salesforce, HubSpot, Pipedrive, and 40+ CRMs via real-time webhooks.",
        color: { text: "text-brand-400", bg: "bg-brand-600/12" },
      },
      {
        icon: "code",
        title: "API Delivery",
        description:
          "RESTful ping-post API with sub-100ms response times. Full sandbox environment for QA.",
        color: { text: "text-violet-400", bg: "bg-violet-600/12" },
      },
      {
        icon: "filter",
        title: "Funnel Optimization",
        description:
          "Owned landing pages, A/B testing infrastructure, and multivariate form flows that maximize opt-in rate.",
        color: { text: "text-accent-400", bg: "bg-accent-500/12" },
      },
      {
        icon: "headset",
        title: "Call Systems",
        description:
          "Hosted IVR, call recording, real-time agent dashboards, and automated follow-up sequences.",
        color: { text: "text-emerald-400", bg: "bg-emerald-500/12" },
      },
      {
        icon: "database",
        title: "Data Verification",
        description:
          "TCPA consent capture via TrustedForm, email hygiene, phone validation, and identity verification.",
        color: { text: "text-sky-400", bg: "bg-sky-500/12" },
      },
      {
        icon: "shield",
        title: "Compliance Layer",
        description:
          "Built-in TCPA / CCPA controls, suppression list management, and audit-ready consent records.",
        color: { text: "text-amber-400", bg: "bg-amber-500/12" },
      },
      {
        icon: "lightning",
        title: "Real-Time Routing",
        description:
          "Intelligent lead distribution rules — by geography, product type, capacity caps, and bid price.",
        color: { text: "text-pink-400", bg: "bg-pink-500/12" },
      },
      {
        icon: "chart-bar",
        title: "Analytics & BI",
        description:
          "Live dashboards tracking CPL, contact rate, conversion, and revenue attribution per campaign.",
        color: { text: "text-teal-400", bg: "bg-teal-500/12" },
      },
    ],
    badges: [
      "99.9% Uptime SLA",
      "Sub-100ms API Latency",
      "SOC 2 Type II Ready",
      "GDPR & CCPA Compliant",
      "256-bit Encryption",
    ],
  },

  results: {
    eyebrow: "By the numbers",
    heading: "Results That Speak",
    headingHighlight: "for Themselves",
    stats: [
      {
        value: 10,
        suffix: "M+",
        label: "Leads Generated",
        sub: "Delivered to active partners",
      },
      {
        value: 50,
        suffix: "+",
        label: "States Covered",
        sub: "Nationwide footprint",
      },
      {
        value: 500,
        suffix: "+",
        label: "Active Partners",
        sub: "Across all verticals",
      },
      {
        value: 98,
        suffix: "%",
        label: "Partner Retention",
        sub: "Year-over-year",
      },
    ],
    testimonial: {
      quote:
        "Lead4s transformed our acquisition model. Within 90 days, our cost per acquisition dropped 40% while contact rate jumped to 62%. We haven't looked at another vendor since.",
      author: "Marcus T.",
      role: "VP Sales",
      company: "Regional Insurance Carrier",
    },
  },

  missionVision: {
    eyebrow: "What drives us",
    cards: [
      {
        icon: "bullseye",
        label: "Our Mission",
        heading: "Make Customer Acquisition Predictable",
        body: "We exist to eliminate the guesswork from growth. Every business deserves access to a pipeline of high-intent buyers — not cold lists, not vanity metrics. Lead4s delivers verified consumer demand on a performance basis, so our partners only pay for results that move their business forward.",
        accent: "text-brand-400",
        iconBg: "bg-brand-600/15",
        border: "border-brand-700/30",
        glow: "37,99,235",
      },
      {
        icon: "eye",
        label: "Our Vision",
        heading: "The Standard for Performance Lead Generation",
        body: "We're building the most trusted lead network in America — a platform where compliance is automatic, quality is guaranteed, and scale is unlimited. In five years, Lead4s will be the infrastructure layer that powers customer acquisition for every major industry vertical, from coast to coast.",
        accent: "text-accent-400",
        iconBg: "bg-accent-500/15",
        border: "border-accent-500/30",
        glow: "249,115,22",
      },
    ],
    values: [
      { value: "Performance", sub: "Pay only for results" },
      { value: "Transparency", sub: "Full reporting access" },
      { value: "Compliance", sub: "Built in, not bolted on" },
      { value: "Partnership", sub: "Your success = ours" },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Lead4s",
    heading: "Built Different,",
    headingHighlight: "Proven Different",
    description:
      "There are hundreds of lead vendors. There is only one Lead4s. Here's what separates us from every alternative in the market.",
    reasons: [
      {
        icon: "check-circle",
        title: "Exclusive, First-Party Leads",
        body: "Every lead originates from our owned channels. Zero resales, zero co-registration. You own the contact.",
      },
      {
        icon: "lock",
        title: "Compliance-First by Design",
        body: "TCPA consent, TrustedForm certificates, and CCPA controls are baked into every funnel — not retrofitted.",
      },
      {
        icon: "chart-line",
        title: "Transparent Reporting",
        body: "Real-time dashboards with CPL, contact rate, and revenue attribution. No black boxes, ever.",
      },
      {
        icon: "clock",
        title: "Sub-60s Lead Delivery",
        body: "Speed-to-contact is the #1 predictor of conversion. Our infrastructure delivers before the competition even wakes up.",
      },
      {
        icon: "globe",
        title: "50-State Coverage",
        body: "Active funnels in all 50 states across solar, insurance, legal, mortgage, and more.",
      },
      {
        icon: "users",
        title: "Dedicated Account Management",
        body: "Every partner gets a named account manager who monitors campaign performance daily and optimizes proactively.",
      },
      {
        icon: "handshake",
        title: "Flexible Commercial Terms",
        body: "Pay-per-lead, pay-per-call, or revenue-share models. Scale up or down with zero lock-in.",
      },
      {
        icon: "trophy",
        title: "Proven Track Record",
        body: "98% partner retention rate. Our results speak louder than any pitch deck.",
      },
    ],
  },

  compliance: {
    eyebrow: "Trust & compliance",
    heading: "Compliance Isn't a Feature.",
    headingHighlight: "It's the Foundation.",
    subheading:
      "The lead generation industry has a compliance problem. We built Lead4s to be the solution — not the risk.",
    badges: [
      {
        icon: "shield",
        title: "TCPA Compliant",
        description:
          "Every lead includes a documented, prior express written consent under TCPA guidelines. TrustedForm certificates stored for 5 years.",
        color: {
          icon: "text-brand-400",
          bg: "bg-brand-600/12",
          border: "border-brand-700/30",
        },
      },
      {
        icon: "file-contract",
        title: "TrustedForm Certified",
        description:
          "We use ActiveProspect's TrustedForm on every opt-in page to generate an independent, third-party certificate of consent.",
        color: {
          icon: "text-emerald-400",
          bg: "bg-emerald-500/12",
          border: "border-emerald-500/20",
        },
      },
      {
        icon: "lock",
        title: "Data Security",
        description:
          "AES-256 encryption at rest and in transit. Secure cloud infrastructure with role-based access controls and audit logs.",
        color: {
          icon: "text-amber-400",
          bg: "bg-amber-500/12",
          border: "border-amber-500/20",
        },
      },
      {
        icon: "user-check",
        title: "CCPA / GDPR Ready",
        description:
          "Consumer opt-out and data deletion workflows built in. We honor data subject rights within 30 days, guaranteed.",
        color: {
          icon: "text-violet-400",
          bg: "bg-violet-600/12",
          border: "border-violet-500/20",
        },
      },
    ],
    statement:
      "All Lead4s campaigns include a compliance review before launch. Our legal team monitors regulatory changes across all 50 states and updates our frameworks proactively — not reactively.",
  },

  industries: {
    eyebrow: "Industries we serve",
    heading: "Deep Vertical Expertise",
    subheading:
      "We don't run generic funnels. Every industry gets a purpose-built lead program with vertical-specific qualification criteria.",
    industries: [
      {
        emoji: "☀️",
        title: "Solar Energy",
        description:
          "Homeowner leads pre-screened for ownership, bill size, and roof suitability.",
        count: "280+ installers",
      },
      {
        emoji: "🛡️",
        title: "Insurance",
        description:
          "Auto, home, life, and health — policy-specific quote leads with verified intent.",
        count: "160+ carriers",
      },
      {
        emoji: "⚖️",
        title: "Legal",
        description:
          "Mass tort, personal injury, and practice-area intake funnels with case filters.",
        count: "95+ law firms",
      },
      {
        emoji: "🏠",
        title: "Real Estate",
        description: "Buyer & seller leads with verified ownership data and timeline filters.",
        count: "340+ agencies",
      },
      {
        emoji: "💰",
        title: "Mortgage",
        description:
          "Refinance and purchase leads with credit score and LTV pre-qualification.",
        count: "120+ lenders",
      },
      {
        emoji: "💼",
        title: "Financial Services",
        description:
          "Retirement, annuity, and investment leads for RIAs and broker-dealers.",
        count: "220+ firms",
      },
      {
        emoji: "🏥",
        title: "Healthcare",
        description:
          "Medicare, ACA, and dental leads with HIPAA-compliant consent flows.",
        count: "180+ practices",
      },
      {
        emoji: "🚗",
        title: "Automotive",
        description:
          "In-market car buyer leads with make, model, and financing intent signals.",
        count: "90+ dealers",
      },
    ],
  },

  team: {
    eyebrow: "The people behind Lead4s",
    heading: "Led by Operators,",
    headingHighlight: "Not Theorists",
    subheading:
      "Every person on our leadership team has worked in the trenches of performance marketing, sales, compliance, or engineering.",
    members: [
      {
        name: "Alex Rivera",
        role: "Chief Executive Officer",
        bio: "15 years in performance marketing. Previously VP Growth at two Inc. 500 companies.",
        initials: "AR",
        gradient: "from-brand-600 to-brand-800",
        linkedin: "#",
        twitter: "#",
      },
      {
        name: "Jordan Kim",
        role: "Chief Technology Officer",
        bio: "Built real-time data pipelines at scale. Former engineering lead at a Fortune 500 data company.",
        initials: "JK",
        gradient: "from-violet-600 to-violet-800",
        linkedin: "#",
        twitter: "#",
      },
      {
        name: "Taylor Moss",
        role: "VP of Compliance",
        bio: "TCPA and consumer protection attorney. Ensures every campaign meets the highest legal standards.",
        initials: "TM",
        gradient: "from-emerald-600 to-emerald-800",
        linkedin: "#",
        twitter: null,
      },
      {
        name: "Morgan Chen",
        role: "VP of Partner Success",
        bio: "Manages relationships with 500+ active partners. Obsessed with reducing CPL for every account.",
        initials: "MC",
        gradient: "from-accent-500 to-accent-700",
        linkedin: "#",
        twitter: "#",
      },
      {
        name: "Sam Patel",
        role: "Head of Media & Acquisition",
        bio: "Runs all owned media funnels — paid search, social, and programmatic across 50 states.",
        initials: "SP",
        gradient: "from-sky-600 to-sky-800",
        linkedin: "#",
        twitter: "#",
      },
      {
        name: "Casey Walker",
        role: "Head of Call Center Ops",
        bio: "Oversees live transfer and appointment setting operations. Former Convergys senior manager.",
        initials: "CW",
        gradient: "from-rose-600 to-rose-800",
        linkedin: "#",
        twitter: null,
      },
    ],
  },
};

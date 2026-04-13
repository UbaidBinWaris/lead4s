export type HeroStat = {
  value: string;
  label: string;
};

export type HeroLeadRow = {
  name: string;
  company: string;
  score: number;
  status: string;
};

export type HeroMetric = {
  label: string;
  value: string;
  delta: string;
};

export type HeroCta = {
  href: string;
  text: string;
  visible: boolean;
  iconName: "handshake" | "calendar" | "arrow";
};

export type CrmStage = "new" | "qualified" | "proposal" | "won";

export type CrmMetric = {
  label: string;
  value: string;
  trend: string;
  tone: "up" | "down" | "neutral";
};

export type CrmExtraStat = {
  label: string;
  value: string;
  trend: string;
};

export type CrmTrendPoint = {
  day: string;
  value: number;
};

export type CrmDeal = {
  id: string;
  name: string;
  company: string;
  owner: string;
  contact: string;
  stage: CrmStage;
  value: string;
  probability: number;
  lastTouch: string;
  priority: "Low" | "Medium" | "High";
  source: string;
  expectedClose: string;
  nextStep: string;
};

export type CrmActivity = {
  id: string;
  type: "call" | "email" | "meeting";
  title: string;
  time: string;
};

export type HeroContent = {
  id: string;
  headlineStart: string;
  headlineAccent: string;
  headlineEnd: string;
  description: string;
  ctaPrimary: HeroCta;
  ctaSecondary: HeroCta;
  stats: HeroStat[];
  cardTitle: string;
  cardDateLabel: string;
  cardMetricRow: HeroMetric[];
  leadRows: HeroLeadRow[];
  sparkline: number[];
  sparklineLabel: string;
  floatingBadges: {
    aiScoreLabel: string;
    aiScoreValue: string;
    aiScoreMeta: string;
    savedTimeLabel: string;
    savedTimeValue: string;
    savedTimeMeta: string;
    pipelineLabel: string;
    pipelineValue: string;
    pipelineMeta: string;
  };
  crm: {
    title: string;
    subtitle: string;
    metrics: CrmMetric[];
    extraStats: CrmExtraStat[];
    weeklyTrend: CrmTrendPoint[];
    deals: CrmDeal[];
    activities: CrmActivity[];
  };
};

export const heroContent: HeroContent = {
  id: "hero",
  headlineStart: "The Force",
  headlineAccent: "Behind your",
  headlineEnd: "Success",
  description:
    "Lead4s delivers exclusive leads, live transfer calls, and booked appointments across solar, home improvement, insurance, and legal industries built for businesses that require consistent, compliant, and high-intent customer acquisition.",
  ctaPrimary: {
    href: "/partnership",
    text: "Apply for partnership",
    visible: true,
    iconName: "handshake",
  },
  ctaSecondary: {
    href: "https://calendly.com/talatkhan/new-meeting",
    text: "Schedule Strategic Call",
    visible: true,
    iconName: "calendar",
  },
  stats: [
    { value: "2,400+", label: "Active clients" },
    { value: "94%", label: "Retention rate" },
    { value: "3.8x", label: "Avg. ROI" },
  ],
  cardTitle: "Live Lead Pipeline",
  cardDateLabel: "Today",
  cardMetricRow: [
    { label: "New leads", value: "128", delta: "+12%" },
    { label: "Qualified", value: "47", delta: "+8%" },
    { label: "Meetings", value: "9", delta: "+33%" },
  ],
  leadRows: [
    { name: "Sarah Mitchell", company: "PropTech Co.", score: 94, status: "Hot" },
    { name: "James Okafor", company: "MedGroup Inc.", score: 87, status: "Warm" },
    { name: "Liu Wei", company: "NovaSaaS", score: 91, status: "Hot" },
    { name: "Elena Rossi", company: "LexFirm LLP", score: 76, status: "Warm" },
  ],
  sparkline: [30, 45, 38, 60, 52, 74, 68, 85, 78, 92, 88, 96],
  sparklineLabel: "Lead velocity - last 12 weeks",
  floatingBadges: {
    aiScoreLabel: "AI Score",
    aiScoreValue: "94",
    aiScoreMeta: "High intent",
    savedTimeLabel: "Time saved / week",
    savedTimeValue: "18 hrs",
    savedTimeMeta: "on prospecting",
    pipelineLabel: "Pipeline added",
    pipelineValue: "$240k",
    pipelineMeta: "this month",
  },
  crm: {
    title: "Lead4s CRM Workspace",
    subtitle: "",
    metrics: [
      { label: "Open deals", value: "42", trend: "+8%", tone: "up" },
      { label: "Forecast", value: "$318k", trend: "+14%", tone: "up" },
      { label: "Win rate", value: "37%", trend: "+3.2%", tone: "up" },
    ],
    extraStats: [
      { label: "Speed to lead", value: "2m 18s", trend: "-21%" },
      { label: "Avg cycle", value: "11 days", trend: "-8%" },
      { label: "Risk flagged", value: "6 deals", trend: "+2" },
    ],
    weeklyTrend: [
      { day: "Mon", value: 18 },
      { day: "Tue", value: 26 },
      { day: "Wed", value: 22 },
      { day: "Thu", value: 34 },
      { day: "Fri", value: 29 },
      { day: "Sat", value: 38 },
      { day: "Sun", value: 42 },
    ],
    deals: [
      {
        id: "deal-01",
        name: "Enterprise Solar Rollout",
        company: "SunGrid Power",
        owner: "A. Khan",
        contact: "Mira Patel",
        stage: "new",
        value: "$24,000",
        probability: 26,
        lastTouch: "2h ago",
        priority: "Medium",
        source: "Inbound LP",
        expectedClose: "Apr 28",
        nextStep: "Qualifying call at 4:30 PM",
      },
      {
        id: "deal-02",
        name: "Roofing Lead Expansion",
        company: "PeakRoof Pros",
        owner: "M. Harris",
        contact: "Noah Reed",
        stage: "qualified",
        value: "$38,500",
        probability: 52,
        lastTouch: "35m ago",
        priority: "High",
        source: "Partner Referral",
        expectedClose: "Apr 22",
        nextStep: "Send revised CPL package",
      },
      {
        id: "deal-03",
        name: "Medicare U65 Campaign",
        company: "EverSure Health",
        owner: "S. Noor",
        contact: "Laura Kim",
        stage: "proposal",
        value: "$46,900",
        probability: 71,
        lastTouch: "1d ago",
        priority: "High",
        source: "Outbound SDR",
        expectedClose: "Apr 19",
        nextStep: "Legal review with compliance",
      },
      {
        id: "deal-06",
        name: "Final Expense Revival",
        company: "ShieldLife",
        owner: "T. Shah",
        contact: "Olivia Green",
        stage: "won",
        value: "$32,400",
        probability: 100,
        lastTouch: "today",
        priority: "High",
        source: "Reactivation",
        expectedClose: "Closed",
        nextStep: "Handoff to delivery team",
      },
    ],
    activities: [
      {
        id: "act-01",
        type: "call",
        title: "Discovery call booked with PeakRoof Pros",
        time: "10:40 AM",
      },
      {
        id: "act-02",
        type: "email",
        title: "Proposal sent to EverSure Health",
        time: "09:15 AM",
      },
    ],
  },
};
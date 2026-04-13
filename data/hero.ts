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
};
export type CultureCard = {
  title: string;
  description: string;
  icon: "innovation" | "growth" | "teamwork" | "flexibility";
};

export type JobPost = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Remote";
  department: string;
  summary: string;
};

export const cultureCards: CultureCard[] = [
  {
    title: "Innovation",
    description:
      "We ship fast, test aggressively, and turn acquisition data into smarter systems every week.",
    icon: "innovation",
  },
  {
    title: "Growth",
    description:
      "Your impact is measurable from day one with clear ownership, mentorship, and performance pathways.",
    icon: "growth",
  },
  {
    title: "Teamwork",
    description:
      "Media buyers, sales strategists, and operators collaborate closely to solve real customer problems.",
    icon: "teamwork",
  },
  {
    title: "Flexibility",
    description:
      "Hybrid workflows, async collaboration, and outcome-based planning keep teams productive across time zones.",
    icon: "flexibility",
  },
];

export const openPositions: JobPost[] = [
  {
    id: "senior-performance-marketer",
    title: "Senior Performance Marketer",
    location: "Las Vegas, NV",
    type: "Full-time",
    department: "Growth",
    summary:
      "Own paid acquisition strategy across search, social, and native channels to drive qualified pipeline.",
  },
  {
    id: "compliance-operations-specialist",
    title: "Compliance Operations Specialist",
    location: "Remote (US)",
    type: "Remote",
    department: "Operations",
    summary:
      "Build and monitor lead verification workflows with TrustedForm and TCPA controls at scale.",
  },
  {
    id: "partnership-account-manager",
    title: "Partnership Account Manager",
    location: "Las Vegas, NV",
    type: "Full-time",
    department: "Client Success",
    summary:
      "Manage buyer relationships, reporting cadence, and optimization plans for long-term retention.",
  },
];

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
    title: "Positive Environment",
    description:
      "We maintain a positive and professional workplace where everyone can do their best work.",
    icon: "innovation",
  },
  {
    title: "Collaboration",
    description:
      "Teamwork and collaboration are part of our daily rhythm across support, verification, and operations.",
    icon: "growth",
  },
  {
    title: "Equal Opportunity",
    description:
      "Respect and equal opportunity for everyone is a core part of how we hire, coach, and promote.",
    icon: "teamwork",
  },
  {
    title: "Continuous Learning",
    description:
      "We invest in ongoing learning and improvement through practical coaching and live feedback.",
    icon: "flexibility",
  },
];

export const openPositions: JobPost[] = [
  {
    id: "customer-support-representative-csr",
    title: "Customer Support Representative (CSR)",
    location: "Rawalpindi (Office) / Remote",
    type: "Full-time",
    department: "Customer Support",
    summary:
      "Handle customer calls professionally, maintain CRM records, and deliver excellent customer experiences.",
  },
  {
    id: "self-verification-executive",
    title: "Self-Verification Executive",
    location: "Remote / Rawalpindi",
    type: "Remote",
    department: "Verification",
    summary:
      "Perform applicant and customer verification workflows while meeting quality and compliance standards.",
  },
  {
    id: "verification-specialist",
    title: "Verification Specialist",
    location: "Rawalpindi (Office) / Remote",
    type: "Full-time",
    department: "Quality & Compliance",
    summary:
      "Ensure call quality, documentation accuracy, and policy compliance across daily verification tasks.",
  },
];

export const jobResponsibilities: string[] = [
  "Handle customer calls professionally",
  "Maintain call records and CRM updates",
  "Ensure compliance and call quality standards",
  "Work towards daily and weekly targets",
  "Collaborate with team members for better performance",
];

export const employeeBenefits: string[] = [
  "Daily, weekly, and monthly bonuses",
  "Performance-based incentives",
  "Free training and skill development",
  "Career growth opportunities",
  "Supportive team environment",
  "Flexible working hours",
];

export const growthHighlights: string[] = [
  "Training in communication and sales skills",
  "Leadership and management opportunities",
  "Fast-track promotions for top performers",
];

export const whyJoinLead4s: string[] = [
  "No experience? No problem - we train you",
  "Friendly and motivating workplace",
  "High earning potential with bonuses",
  "Opportunity to work with international clients",
  "Flexible remote and office-based options",
];

export const officeDetails = {
  city: "Rawalpindi",
  label: "Office-based hiring in Rawalpindi",
  address: "2nd Floor, J&J Plaza, Opposite Pizza Hut, 4th Road Commercial Market, Rawalpindi 46000",
  mapQuery: "2nd Floor J&J Plaza Opposite Pizza Hut 4th Road Commercial Market Rawalpindi 46000",
};

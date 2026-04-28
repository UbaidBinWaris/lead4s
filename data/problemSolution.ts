export type ProblemSolutionItem = {
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
};

export type ProblemSolutionContent = {
  id: string;
  kicker: string;
  heading: string;
  headingAccent: string;
  intro: string;
  problemsTitle: string;
  solutionsTitle: string;
  items: ProblemSolutionItem[];
};

export const problemSolutionContent: ProblemSolutionContent = {
  id: "problem-solution",
  kicker: "How We Deliver Consistent Performance",
  heading: "Most growth teams do not need more leads",
  headingAccent: "they need better lead infrastructure",
  intro:
    "Lead4s replaces inconsistent lead supply with a predictable, compliance-first acquisition engine built for scalable revenue growth.",
  problemsTitle: "What usually breaks",
  solutionsTitle: "How Lead4s fixes it",
  items: [
    {
      problemTitle: "Acquisition is broad, expensive, and low intent",
      problemText:
        "Campaigns may generate volume, but unqualified traffic creates low contact rates and weak downstream ROI.",
      solutionTitle: "Targeted acquisition across high-intent channels",
      solutionText:
        "We deploy paid search, native, social, and affiliate traffic programs tuned by vertical to capture prospects actively seeking services.",
    },
    {
      problemTitle: "Compliance gaps increase legal and operational risk",
      problemText:
        "Missing or weak consent records create TCPA risk and force buyers to reduce volume even when demand is high.",
      solutionTitle: "Qualification and compliance on every lead",
      solutionText:
        "Every lead is filtered, validated, and processed through TrustedForm and TCPA-aware protocols before delivery.",
    },
    {
      problemTitle: "Slow handoff destroys speed-to-lead performance",
      problemText:
        "When leads arrive late, contact windows close quickly and sales teams lose high-intent opportunities.",
      solutionTitle: "Real-time delivery to your sales stack",
      solutionText:
        "Leads and calls are delivered instantly through API, CRM posting, or live transfer routing to your intake operation.",
    },
    {
      problemTitle: "Scaling volume often erodes quality and margin",
      problemText:
        "Many campaigns break after initial wins because optimization is reactive and reporting is delayed.",
      solutionTitle: "Weekly optimization and account management",
      solutionText:
        "Dedicated account management with weekly optimization cycles keeps ROI stable while delivery volume increases.",
    },
  ],
};

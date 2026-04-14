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
  kicker: "Problem + Solution",
  heading: "Most buyers fail from weak lead",
  headingAccent: "infrastructure, not weak sales",
  intro:
    "Lead4s helps growth teams replace inconsistent lead supply with a compliant system designed for predictable volume and retention.",
  problemsTitle: "What usually breaks",
  solutionsTitle: "How Lead4s fixes it",
  items: [
    {
      problemTitle: "Lead quality is inconsistent",
      problemText:
        "Volume looks good on paper, but intent is low and close rates collapse after the first week.",
      solutionTitle: "Targeted acquisition channels",
      solutionText:
        "We run multi-channel campaigns across paid search, social, native, and affiliate traffic to capture active, high-intent buyers.",
    },
    {
      problemTitle: "Compliance risk slows growth",
      problemText:
        "Unverified data and weak consent records expose teams to TCPA and trust issues with buyers.",
      solutionTitle: "Qualification and compliance layer",
      solutionText:
        "Every lead is filtered and validated through compliance systems including TrustedForm and TCPA verification protocols.",
    },
    {
      problemTitle: "Slow handoff kills conversion",
      problemText:
        "By the time a lead reaches your sales floor, response windows are gone and CPL efficiency drops.",
      solutionTitle: "Real-time delivery pipeline",
      solutionText:
        "Leads and calls are delivered instantly via API, CRM posting, or live transfers directly to your intake team.",
    },
    {
      problemTitle: "Scale creates performance drift",
      problemText:
        "Campaigns expand quickly, but ROI degrades without structured optimization and account oversight.",
      solutionTitle: "Optimization and scaling engine",
      solutionText:
        "Dedicated account management and weekly optimization cycles keep performance stable as volume grows.",
    },
  ],
};

export type CaseStudySeed = {
  slug: string;
  title: string;
  vertical: string;
  challenge: string;
  solution: string;
  results: string[];
  kpiLabel: string;
  kpiValue: string;
  displayOrder: number;
};

// Seed/fallback data modeled from the public Lead4s vertical focus areas.
export const caseStudySeedData: CaseStudySeed[] = [
  {
    slug: "solar-qualified-live-transfers",
    title: "Scaling Qualified Solar Live Transfers",
    vertical: "Solar",
    challenge:
      "A regional installer needed consistent, high-intent call volume without sacrificing qualification quality.",
    solution:
      "Lead4s deployed intent-based acquisition funnels, compliance-aware qualification logic, and schedule-optimized transfer routing.",
    results: [
      "Higher appointment set rate from transferred calls",
      "Lower wasted spend on low-intent inquiries",
      "Stable daily delivery with predictable pacing",
    ],
    kpiLabel: "Qualified Transfer Consistency",
    kpiValue: "92% week-to-week stability",
    displayOrder: 1,
  },
  {
    slug: "home-improvement-exclusive-leads",
    title: "Home Improvement Exclusive Lead Quality Lift",
    vertical: "Home Improvement",
    challenge:
      "A contractor network struggled with mixed-quality leads and duplicate competition from shared lead marketplaces.",
    solution:
      "Lead4s shifted the campaign to exclusive CPL flows with stronger pre-qualification and source-level optimization loops.",
    results: [
      "Improved contact rate on first outreach",
      "Reduced duplicate and non-relevant submissions",
      "Better downstream booking efficiency",
    ],
    kpiLabel: "Exclusive Lead Match Rate",
    kpiValue: "2.1x improvement",
    displayOrder: 2,
  },
  {
    slug: "final-expense-compliance-focused-growth",
    title: "Final Expense Growth With Compliance Controls",
    vertical: "Final Expense",
    challenge:
      "An agency needed to increase volume while maintaining consent traceability and stricter outreach governance.",
    solution:
      "Lead4s implemented compliant acquisition paths, verification checkpoints, and documentation-ready lead records.",
    results: [
      "Reliable lead flow with cleaner contact history",
      "Better confidence in audit-readiness",
      "Higher partner trust in lead provenance",
    ],
    kpiLabel: "Verified Consent Coverage",
    kpiValue: ">95% documented",
    displayOrder: 3,
  },
  {
    slug: "auto-insurance-high-intent-inquiries",
    title: "Auto Insurance Inquiry Quality Optimization",
    vertical: "Auto Insurance",
    challenge:
      "A buyer needed to reduce low-intent submissions and raise conversion-ready inquiry share.",
    solution:
      "Lead4s refined audience targeting, intent gating, and landing flow friction control to filter lower-fit traffic.",
    results: [
      "Improved sales-team efficiency",
      "Higher qualified inquiry percentage",
      "More predictable CPL performance",
    ],
    kpiLabel: "Qualified Inquiry Lift",
    kpiValue: "+47%",
    displayOrder: 4,
  },
  {
    slug: "personal-injury-case-intake-improvement",
    title: "Personal Injury Intake Pipeline Improvement",
    vertical: "MVA & Personal Injury",
    challenge:
      "A legal intake team required better lead intent signals to improve consultation scheduling rates.",
    solution:
      "Lead4s aligned ad messaging with intake criteria, tightened form logic, and improved handoff data context.",
    results: [
      "Higher consultation-ready submissions",
      "Faster intake triage and follow-up",
      "Reduced non-qualified intake burden",
    ],
    kpiLabel: "Consultation Readiness",
    kpiValue: "+39%",
    displayOrder: 5,
  },
  {
    slug: "medicare-o65-predictable-volume",
    title: "Medicare O65 Volume Stabilization",
    vertical: "Medicare O65",
    challenge:
      "A Medicare-focused buyer experienced volatile lead supply and inconsistent intent quality.",
    solution:
      "Lead4s introduced multi-source balancing, pacing controls, and continuous quality feedback calibration.",
    results: [
      "More stable weekly lead distribution",
      "Better alignment with buyer capacity",
      "Improved conversion opportunity consistency",
    ],
    kpiLabel: "Weekly Volume Stability",
    kpiValue: "88% on-target pacing",
    displayOrder: 6,
  },
];

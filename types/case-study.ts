import type { IndustrySection } from "@/types/industry";

export interface CaseStudyResult {
  readonly label: string;
  readonly value: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly industry: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly results: CaseStudyResult[];
  readonly content: IndustrySection[];
  readonly coverImage: string | null;
  readonly isPublished: boolean;
  readonly displayOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CaseStudyInput {
  readonly title: string;
  readonly slug: string;
  readonly industry: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly results: CaseStudyResult[];
  readonly content: IndustrySection[];
  readonly coverImage?: string | null;
  readonly isPublished?: boolean;
  readonly displayOrder?: number;
}

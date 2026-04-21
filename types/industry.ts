// ---------------------------------------------------------------------------
// Section type union
// ---------------------------------------------------------------------------

export interface TextSection {
  readonly type: "text";
  readonly title: string;
  readonly content: string;
}

export interface FeatureItem {
  readonly icon?: string;
  readonly title: string;
  readonly description: string;
}

export interface FeaturesSection {
  readonly type: "features";
  readonly title?: string;
  readonly items: FeatureItem[];
}

export interface ImageSection {
  readonly type: "image";
  readonly src: string;
  readonly alt?: string;
  readonly caption?: string;
}

export interface CTASection {
  readonly type: "cta";
  readonly eyebrow?: string;
  readonly heading: string;
  readonly subheading?: string;
  readonly buttonLabel: string;
  readonly buttonHref: string;
  readonly secondaryLabel?: string;
  readonly secondaryHref?: string;
}

// Hero CTA — stored in content, consumed by IndustryHero, not rendered as a section block
export interface HeroCtaSection {
  readonly type: "hero-cta";
  readonly primaryLabel: string;
  readonly primaryHref: string;
  readonly secondaryLabel?: string;
  readonly secondaryHref?: string;
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

export interface StatsSection {
  readonly type: "stats";
  readonly title?: string;
  readonly items: StatItem[];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface FaqSection {
  readonly type: "faq";
  readonly title?: string;
  readonly items: FaqItem[];
}

export interface ProcessStep {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly imageAlt?: string;
}

export interface ProcessSection {
  readonly type: "process";
  readonly title?: string;
  readonly items: ProcessStep[];
}

export interface ImageTextSection {
  readonly type: "image-text";
  readonly title?: string;
  readonly content: string;
  readonly image: string;
  readonly imageAlt?: string;
  readonly imagePosition?: "left" | "right";
}

export type IndustrySection =
  | TextSection
  | FeaturesSection
  | ImageSection
  | CTASection
  | HeroCtaSection
  | StatsSection
  | FaqSection
  | ProcessSection
  | ImageTextSection;

// ---------------------------------------------------------------------------
// Hero nested inside the structured content
// ---------------------------------------------------------------------------
export interface IndustryHeroData {
  readonly heading: string;
  readonly subheading?: string;
}

// ---------------------------------------------------------------------------
// Full industry / solution document
// ---------------------------------------------------------------------------
export interface Industry {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly type: "industry" | "solution";
  readonly description: string | null;
  readonly content: IndustrySection[];
  readonly coverImage: string | null;
  readonly isPublished: boolean;
  readonly displayOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ---------------------------------------------------------------------------
// Input (create / update payload)
// ---------------------------------------------------------------------------
export interface IndustryInput {
  readonly title: string;
  readonly slug: string;
  readonly type?: "industry" | "solution";
  readonly description?: string | null;
  readonly content: IndustrySection[];
  readonly coverImage?: string | null;
  readonly isPublished?: boolean;
  readonly displayOrder?: number;
}

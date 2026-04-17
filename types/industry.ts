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
  readonly heading: string;
  readonly subheading?: string;
  readonly buttonLabel: string;
  readonly buttonHref: string;
}

export type IndustrySection =
  | TextSection
  | FeaturesSection
  | ImageSection
  | CTASection;

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
  /** Structured content: first item MAY be a hero (type not in union — typed separately) */
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

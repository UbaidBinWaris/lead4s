import type { IndustrySection } from "@/types/industry";
import { TextSection } from "./sections/TextSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ImageSection } from "./sections/ImageSection";
import { CTASection } from "./sections/CTASection";
import { StatsSectionComponent } from "./sections/StatsSection";
import { FaqSectionComponent } from "./sections/FaqSection";
import { ProcessSectionComponent } from "./sections/ProcessSection";
import { ImageTextSectionComponent } from "./sections/ImageTextSection";

interface Props {
  readonly sections: IndustrySection[];
}

export function SectionRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.type) {
          case "text":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <TextSection key={index} section={section} />;
          case "features":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <FeaturesSection key={index} section={section} />;
          case "image":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <ImageSection key={index} section={section} />;
          case "cta":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <CTASection key={index} section={section} />;
          case "stats":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <StatsSectionComponent key={index} section={section} />;
          case "faq":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <FaqSectionComponent key={index} section={section} />;
          case "process":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <ProcessSectionComponent key={index} section={section} />;
          case "image-text":
            // biome-ignore lint/suspicious/noArrayIndexKey: sections are positional
            return <ImageTextSectionComponent key={index} section={section} />;
          case "hero-cta":
            return null; // consumed by IndustryHero, not rendered inline
          default:
            return null;
        }
      })}
    </>
  );
}

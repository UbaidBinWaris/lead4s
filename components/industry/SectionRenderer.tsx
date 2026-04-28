import type { IndustrySection } from "@/types/industry";
import { TextSection } from "./sections/TextSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ImageSection } from "./sections/ImageSection";
import { CTASection } from "./sections/CTASection";
import { StatsSectionComponent } from "./sections/StatsSection";
import { FaqSectionComponent } from "./sections/FaqSection";
import { ProcessSectionComponent } from "./sections/ProcessSection";
import { ImageTextSectionComponent } from "./sections/ImageTextSection";
import { LinkListSectionComponent } from "./sections/LinkListSection";

interface Props {
  readonly sections: IndustrySection[];
}

export function SectionRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        let sectionKey = `${section.type}-${JSON.stringify(section).slice(0, 40)}`;

        if ("title" in section && section.title) {
          sectionKey = `${section.type}-${section.title}`;
        } else if ("heading" in section && section.heading) {
          sectionKey = `${section.type}-${section.heading}`;
        }

        switch (section.type) {
          case "text":
            return <TextSection key={sectionKey} section={section} />;
          case "features":
            return <FeaturesSection key={sectionKey} section={section} />;
          case "image":
            return <ImageSection key={sectionKey} section={section} />;
          case "cta":
            return <CTASection key={sectionKey} section={section} />;
          case "stats":
            return <StatsSectionComponent key={sectionKey} section={section} />;
          case "faq":
            return <FaqSectionComponent key={sectionKey} section={section} />;
          case "process":
            return <ProcessSectionComponent key={sectionKey} section={section} />;
          case "image-text":
            return <ImageTextSectionComponent key={sectionKey} section={section} />;
          case "link-list":
            return <LinkListSectionComponent key={sectionKey} section={section} />;
          case "hero-cta":
            return null; // consumed by IndustryHero, not rendered inline
          default:
            return null;
        }
      })}
    </>
  );
}

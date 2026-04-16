import type { IndustrySection } from "@/types/industry";
import { TextSection } from "./sections/TextSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { ImageSection } from "./sections/ImageSection";
import { CTASection } from "./sections/CTASection";

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
          default:
            return null;
        }
      })}
    </>
  );
}

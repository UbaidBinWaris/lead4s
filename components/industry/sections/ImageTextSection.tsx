import Image from "next/image";
import type { ImageTextSection } from "@/types/industry";

interface Props {
  readonly section: ImageTextSection;
}

export function ImageTextSectionComponent({ section }: Props) {
  const imageLeft = (section.imagePosition ?? "left") === "left";

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`flex flex-col gap-12 lg:flex-row lg:items-center ${imageLeft ? "" : "lg:flex-row-reverse"}`}>
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 lg:w-[520px] lg:shrink-0">
            <Image
              src={section.image}
              alt={section.imageAlt ?? section.title ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-5">
            {section.title && (
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
            )}
            <div className="space-y-4">
              {section.content.split(/\n\n+/).map((para, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static paragraphs
                <p key={i} className="text-base leading-relaxed text-slate-400">
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { ImageSection as ImageSectionType } from "@/types/industry";

interface Props {
  readonly section: ImageSectionType;
}

export function ImageSection({ section }: Props) {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src={section.src}
              alt={section.alt ?? "Industry image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {section.caption && (
            <figcaption className="px-6 py-3 text-center text-sm text-slate-500">
              {section.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

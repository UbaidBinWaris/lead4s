import type { TextSection as TextSectionType } from "@/types/industry";

interface Props {
  readonly section: TextSectionType;
}

export function TextSection({ section }: Props) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {section.title && (
          <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
            {section.title}
          </h2>
        )}
        <div className="prose prose-invert prose-slate max-w-none">
          {section.content.split("\n\n").map((para, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static content
            <p key={i} className="mb-4 text-base leading-relaxed text-slate-300">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

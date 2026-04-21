import Image from "next/image";
import type { ProcessSection } from "@/types/industry";

interface Props {
  readonly section: ProcessSection;
}

export function ProcessSectionComponent({ section }: Props) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {section.title && (
          <h2 className="mb-12 text-center text-2xl font-bold text-white sm:text-3xl">
            {section.title}
          </h2>
        )}

        <ol className="space-y-16">
          {section.items.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional steps
              <li key={i} className={`flex flex-col gap-8 lg:flex-row lg:items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                {/* Number + content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-400 ring-1 ring-blue-500/30">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{step.title}</h3>
                  <p className="text-base leading-relaxed text-slate-400">{step.description}</p>
                </div>

                {/* Image */}
                {step.image ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 lg:w-[480px] lg:shrink-0">
                    <Image
                      src={step.image}
                      alt={step.imageAlt ?? step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 lg:w-[480px] lg:shrink-0">
                    <span className="text-sm text-slate-600">No image</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

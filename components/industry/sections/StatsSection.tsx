import type { StatsSection } from "@/types/industry";

interface Props {
  readonly section: StatsSection;
}

export function StatsSectionComponent({ section }: Props) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {section.title && (
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            {section.title}
          </h2>
        )}
        <dl className="grid gap-px rounded-2xl border border-slate-800 bg-slate-800 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static content
            <div key={i} className="flex flex-col gap-2 bg-[hsl(0,0%,6%)] px-8 py-10">
              <dt className="text-sm font-medium text-slate-400">{item.label}</dt>
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {item.value}
              </dd>
              {item.description && (
                <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import type { FeaturesSection as FeaturesSectionType } from "@/types/industry";

interface Props {
  readonly section: FeaturesSectionType;
}

const ICON_MAP: Record<string, string> = {
  check: "✓",
  star: "★",
  bolt: "⚡",
  shield: "🛡",
  chart: "📈",
  users: "👥",
  phone: "📞",
  target: "🎯",
  clock: "⏱",
  dollar: "💰",
};

export function FeaturesSection({ section }: Props) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {section.title && (
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            {section.title}
          </h2>
        )}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static content
            <li
              key={i}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/80"
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-blue-600/0 transition-all duration-300 group-hover:bg-blue-600/5" />

              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-xl">
                {item.icon && ICON_MAP[item.icon]
                  ? ICON_MAP[item.icon]
                  : "✦"}
              </div>

              <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

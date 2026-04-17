import type { CaseStudyResult } from "@/types/case-study";

interface ResultsSectionProps {
  readonly results: CaseStudyResult[];
}

// Each metric card gets a gradient accent — cycles through 3 colors
const ACCENTS = [
  {
    border: "from-violet-500/60 to-violet-400/30",
    value: "text-violet-300",
    glow: "bg-violet-600/5",
  },
  {
    border: "from-emerald-500/60 to-emerald-400/30",
    value: "text-emerald-300",
    glow: "bg-emerald-600/5",
  },
  {
    border: "from-blue-500/60 to-blue-400/30",
    value: "text-blue-300",
    glow: "bg-blue-600/5",
  },
] as const;

export function ResultsSection({ results }: ResultsSectionProps) {
  if (results.length === 0) return null;

  return (
    <section aria-labelledby="results-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
          Measurable Results
        </span>
        <h2 id="results-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          The Numbers That Matter
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
          Real, verifiable outcomes delivered for our client.
        </p>
      </div>

      <div
        className={`grid gap-4 ${
          results.length === 1
            ? "max-w-sm mx-auto"
            : results.length === 2
            ? "sm:grid-cols-2 max-w-2xl mx-auto"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {results.map((result, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div
              key={result.label}
              className={`relative overflow-hidden rounded-2xl border border-slate-800 ${accent.glow} p-8 text-center`}
            >
              {/* Top gradient line */}
              <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.border}`} aria-hidden="true" />

              <p className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${accent.value}`}>
                {result.value}
              </p>
              <p className="mt-3 text-sm font-medium text-slate-400">
                {result.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

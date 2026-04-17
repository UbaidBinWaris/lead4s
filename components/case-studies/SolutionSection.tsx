interface SolutionSectionProps {
  readonly solution: string;
}

export function SolutionSection({ solution }: SolutionSectionProps) {
  return (
    <section aria-labelledby="solution-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
        {/* Label column */}
        <div className="lg:pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Our Solution
            </span>
          </div>
          <h2 id="solution-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            How We Delivered
          </h2>
        </div>

        {/* Content column */}
        <div className="relative rounded-2xl border border-emerald-500/10 bg-[hsl(0,0%,6%)] p-8">
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-emerald-500/60 to-emerald-400/20" aria-hidden="true" />
          <svg
            className="mb-4 h-8 w-8 text-emerald-500/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            {solution}
          </p>
        </div>
      </div>
    </section>
  );
}

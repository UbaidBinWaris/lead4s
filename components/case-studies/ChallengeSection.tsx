interface ChallengeSectionProps {
  readonly challenge: string;
}

export function ChallengeSection({ challenge }: ChallengeSectionProps) {
  return (
    <section aria-labelledby="challenge-heading" className="bg-[hsl(0,0%,4%)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Label column */}
          <div className="lg:pt-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                The Challenge
              </span>
            </div>
            <h2 id="challenge-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              The Problem We Solved
            </h2>
          </div>

          {/* Content column */}
          <div className="relative rounded-2xl border border-red-500/10 bg-[hsl(0,0%,6%)] p-8">
            <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-red-500/60 to-red-400/20" aria-hidden="true" />
            <svg
              className="mb-4 h-8 w-8 text-red-500/40"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              {challenge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

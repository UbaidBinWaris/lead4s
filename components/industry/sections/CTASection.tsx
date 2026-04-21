import type { CTASection as CTASectionType } from "@/types/industry";

interface Props {
  readonly section: CTASectionType;
}

export function CTASection({ section }: Props) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/8 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm shadow-2xl">
          {/* Top accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

          <div className="px-8 py-16 sm:px-12 sm:py-20 lg:px-20">
            <div className="flex flex-col items-center text-center">
              {/* Eyebrow */}
              {section.eyebrow && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    {section.eyebrow}
                  </span>
                </div>
              )}

              {/* Heading */}
              <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {section.heading}
              </h2>

              {/* Subheading */}
              {section.subheading && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                  {section.subheading}
                </p>
              )}

              {/* Divider accent */}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-12 bg-blue-500/60" />
                <div className="h-1 w-1 rounded-full bg-blue-500/40" />
                <div className="h-px w-6 bg-blue-500/30" />
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={section.buttonHref}
                  className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0"
                >
                  {section.buttonLabel}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {section.secondaryLabel && section.secondaryHref && (
                  <a
                    href={section.secondaryHref}
                    className="inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-slate-600 px-8 py-3.5 text-base font-semibold text-slate-300 transition-colors duration-200 hover:border-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    {section.secondaryLabel}
                  </a>
                )}
              </div>

              {/* Trust micro-copy */}
              <p className="mt-6 text-xs text-slate-600">
                No commitment required &mdash; we&apos;ll reach out within 24 hours.
              </p>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

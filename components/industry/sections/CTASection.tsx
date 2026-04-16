import type { CTASection as CTASectionType } from "@/types/industry";

interface Props {
  readonly section: CTASectionType;
}

export function CTASection({ section }: Props) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 p-10 text-center shadow-xl">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {section.heading}
            </h2>
            {section.subheading && (
              <p className="mx-auto mb-8 max-w-xl text-base text-slate-300">
                {section.subheading}
              </p>
            )}
            <a
              href={section.buttonHref}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-900/50 active:scale-95"
            >
              {section.buttonLabel}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

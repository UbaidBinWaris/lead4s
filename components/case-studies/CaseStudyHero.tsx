import Image from "next/image";
import Link from "next/link";

interface CaseStudyHeroProps {
  readonly title: string;
  readonly industry: string;
  readonly summary: string;
  readonly coverImage?: string | null;
  readonly slug: string;
}

export function CaseStudyHero({ title, industry, summary, coverImage, slug }: CaseStudyHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background glow */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center" aria-hidden="true">
        <div className="mt-16 h-[500px] w-[900px] rounded-full bg-violet-600/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/case-studies" className="transition-colors hover:text-slate-300">
                Case Studies
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-400">{title}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                {industry}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
              {summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/#contact"
                className="inline-flex min-h-[48px] items-center rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500"
              >
                Work With Us
              </a>
              <Link
                href="/case-studies"
                className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                ← All Case Studies
              </Link>
            </div>
          </div>

          {/* Right: cover image or placeholder */}
          <div className="relative">
            {coverImage ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800">
                <Image
                  src={coverImage}
                  alt={`${title} cover`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-slate-800 bg-[hsl(0,0%,6%)]">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                    <svg className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-9.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v16.5c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0112.75 19.5V3.375zm-4.5 7.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 018.25 19.875v-9z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Case Study</p>
                  <p className="mt-1 font-mono text-xs text-slate-700">{slug}</p>
                </div>
              </div>
            )}

            {/* Floating industry badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-violet-500/20 bg-[hsl(0,0%,6%)] px-4 py-2.5 shadow-xl">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Industry</p>
              <p className="mt-0.5 text-sm font-semibold text-violet-300">{industry}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

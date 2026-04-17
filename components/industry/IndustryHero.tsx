import Image from "next/image";

interface CTAButton {
  readonly label: string;
  readonly href: string;
}

interface Props {
  readonly title: string;
  readonly description?: string | null;
  readonly coverImage?: string | null;
  readonly slug: string;
  readonly variant?: "industry" | "solution";
  readonly primaryCTA?: CTAButton;
  readonly secondaryCTA?: CTAButton;
}

export function IndustryHero({
  title,
  description,
  coverImage,
  slug,
  variant = "industry",
  primaryCTA,
  secondaryCTA,
}: Props) {
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const isSolution = variant === "solution";
  const sectionLabel = isSolution ? "Solutions" : "Industries";
  const sectionHref = isSolution ? "/solutions" : "/industries";
  const eyebrow = isSolution ? "Solution" : "Industry";

  return (
    <header className="relative flex min-h-[60vh] flex-col overflow-hidden sm:min-h-[70vh] lg:min-h-screen">
      {/* Cover image */}
      {coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
        </div>
      )}

      {/* No cover: dot-grid texture */}
      {!coverImage && (
        <>
          <div className="absolute inset-0 z-0 bg-grid opacity-30" />
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            {isSolution ? (
              /* Warmer, more energetic glow for solutions */
              <>
                <div className="h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-[140px]" />
                <div className="absolute h-[400px] w-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
              </>
            ) : (
              <div className="h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[120px]" />
            )}
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <li>
                <a href="/" className="transition-colors hover:text-slate-300">
                  Home
                </a>
              </li>
              <li aria-hidden>/</li>
              <li>
                <a href={sectionHref} className="transition-colors hover:text-slate-300">
                  {sectionLabel}
                </a>
              </li>
              <li aria-hidden>/</li>
              <li className="text-slate-300">{label}</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${isSolution ? "text-indigo-400" : "text-blue-400"}`}>
            {eyebrow}
          </p>

          {/* H1 */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
          )}

          {/* CTA buttons — solutions only */}
          {isSolution && (primaryCTA || secondaryCTA) && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {primaryCTA && (
                <a
                  href={primaryCTA.href}
                  className="inline-flex min-h-[48px] items-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {primaryCTA.label}
                </a>
              )}
              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {secondaryCTA.label}
                </a>
              )}
            </div>
          )}

          {/* Accent divider */}
          <div className={`${isSolution && (primaryCTA || secondaryCTA) ? "mt-8" : "mt-10"} flex items-center gap-4`}>
            <div className={`h-px w-16 ${isSolution ? "bg-indigo-500" : "bg-blue-500"}`} />
            <div className={`h-px w-8 ${isSolution ? "bg-indigo-500/40" : "bg-blue-500/40"}`} />
            <div className={`h-px w-4 ${isSolution ? "bg-indigo-500/20" : "bg-blue-500/20"}`} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </header>
  );
}

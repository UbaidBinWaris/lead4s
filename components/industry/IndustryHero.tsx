import Image from "next/image";

interface Props {
  readonly title: string;
  readonly description?: string | null;
  readonly coverImage?: string | null;
  readonly slug: string;
}

export function IndustryHero({ title, description, coverImage, slug }: Props) {
  // Breadcrumb label: humanize slug
  const vertical = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <header className="relative flex min-h-[60vh] flex-col overflow-hidden sm:min-h-[70vh] lg:min-h-screen">
      {/* ── Cover image (if provided) ─────────────────────────────────── */}
      {coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover opacity-70"
            priority
          />
          {/* Base tint — dark enough for text legibility, light enough to see the image */}
          <div className="absolute inset-0 bg-slate-950/50" />
          {/* Gradient: darkens top and fully fades to page colour at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
        </div>
      )}

      {/* ── No cover: dot-grid texture ───────────────────────────────── */}
      {!coverImage && (
        <>
          <div className="absolute inset-0 z-0 bg-grid opacity-30" />
          {/* Subtle radial glow */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[120px]" />
          </div>
        </>
      )}

      {/* ── Content ───────────────────────────────────────────────────── */}
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
                <a
                  href="/"
                  className="transition-colors hover:text-slate-300"
                >
                  Industries
                </a>
              </li>
              <li aria-hidden>/</li>
              <li className="text-slate-300">{vertical}</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Industry
          </p>

          {/* Main H1 */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
          )}

          {/* Accent divider */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-16 bg-blue-500" />
            <div className="h-px w-8 bg-blue-500/40" />
            <div className="h-px w-4 bg-blue-500/20" />
          </div>
        </div>
      </div>

      {/* ── Bottom fade into page ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </header>
  );
}


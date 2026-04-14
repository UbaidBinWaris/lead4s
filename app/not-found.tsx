import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-grid px-6 py-14 sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(37,99,235,0.24),transparent_38%),radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_16%_84%,rgba(245,158,11,0.14),transparent_38%)]" />
        <div className="absolute left-1/2 top-[-16%] h-84 w-84 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[145px]" />
        <div className="absolute right-[-5%] top-[18%] h-72 w-72 rounded-full bg-orange-500/14 blur-[120px]" />
        <div className="absolute bottom-[-16%] left-[8%] h-64 w-64 rounded-full bg-amber-400/12 blur-[110px]" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[50%] z-1 -translate-x-1/2 -translate-y-1/2 select-none text-[34vw] font-black leading-none tracking-[-0.06em] text-white/3 sm:text-[18rem]">
        404
      </div>

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/12 bg-surface-925/75 p-8 text-center shadow-[0_40px_100px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/55 to-transparent" />
        <div className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-blue-400/70 shadow-[0_0_24px_rgba(59,130,246,0.85)]" />
        <div className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-orange-400/70 shadow-[0_0_24px_rgba(249,115,22,0.85)]" />

        <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-blue-300/80">
          LOST SIGNAL // 404
        </p>

        <h1 className="mx-auto mb-5 max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl">
          Route not found.
          {" "}
          <span className="mt-2 block gradient-brand-text">
            Let&apos;s get you back in motion.
          </span>
        </h1>

        <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-slate-300/85 sm:text-lg">
          This destination no longer exists, or the URL is outdated. Jump back to
          your high-intent lead flow in one click.
        </p>

        <div className="mb-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-44 items-center justify-center rounded-2xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_40px_rgba(37,99,235,0.55)]"
          >
            Return home
          </Link>

          <Link
            href="/#services"
            className="inline-flex min-w-44 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.035] px-7 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300/45 hover:bg-white/8"
          >
            Explore services
          </Link>
        </div>

        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] text-slate-300/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {" "}
          Systems online. Continue from homepage.
        </div>
      </div>
    </section>
  );
}

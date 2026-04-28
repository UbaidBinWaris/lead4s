import Link from "next/link";

const STEPS = [
  {
    step: "Step 1",
    title: "Book a Strategy Call",
    description:
      "Share your target market, compliance requirements, and buyer profile so we can define a realistic launch plan.",
  },
  {
    step: "Step 2",
    title: "Align Campaign Criteria",
    description:
      "We configure geo targets, volume pacing, and qualification rules around your operations and revenue goals.",
  },
  {
    step: "Step 3",
    title: "Launch and Validate",
    description:
      "Your campaign goes live with tracking, routing, and QA checkpoints to confirm lead quality before scaling.",
  },
  {
    step: "Step 4",
    title: "Scale with Weekly Optimization",
    description:
      "Dedicated account reviews tune performance and increase stable delivery as your team expands capacity.",
  },
] as const;

export function PartnershipSteps() {
  return (
    <section id="how-partnership-works" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
            How Partnership Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A clear 4-step process
            <br />
            <span className="gradient-text">from first call to scaled volume</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
            Built for buyers who need predictable performance, transparent operations,
            and compliance-safe growth.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {STEPS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-brand-400/30"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
                {item.step}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
          >
            Talk to Sales
          </Link>
          <Link
            href="/partnership"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:border-brand-300/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
          >
            Apply for Partnership
          </Link>
        </div>
      </div>
    </section>
  );
}

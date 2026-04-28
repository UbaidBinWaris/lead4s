import { db } from "@/lib/db";

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

function formatNumber(value: number): string {
  return NUMBER_FORMATTER.format(value);
}

export async function PerformanceSnapshot() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [
    activeIndustryPrograms,
    activeSolutions,
    publishedCaseStudies,
    publishedBlogs,
    partnershipApplications30d,
    contactMessages30d,
  ] = await Promise.all([
    db.industry.count({ where: { type: "industry", isPublished: true } }),
    db.industry.count({ where: { type: "solution", isPublished: true } }),
    db.caseStudy.count({ where: { isPublished: true } }),
    db.blog.count({ where: { isPublished: true } }),
    db.partnershipApplication.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    db.contactMessage.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
  ]);

  const stats = [
    {
      label: "Active Industry Programs",
      value: formatNumber(activeIndustryPrograms),
      detail: "Published vertical campaigns currently available.",
    },
    {
      label: "Solution Pages",
      value: formatNumber(activeSolutions),
      detail: "Core buyer-facing offers mapped to acquisition goals.",
    },
    {
      label: "Published Case Studies",
      value: formatNumber(publishedCaseStudies),
      detail: "Proof pages that support high-intent buyer decisions.",
    },
    {
      label: "Published SEO Blogs",
      value: formatNumber(publishedBlogs),
      detail: "Topic pages growing topical authority and rankings.",
    },
    {
      label: "Partnership Applications (30d)",
      value: formatNumber(partnershipApplications30d),
      detail: "Recent partner demand from growth-focused buyers.",
    },
    {
      label: "Contact Messages (30d)",
      value: formatNumber(contactMessages30d),
      detail: "Inbound intent signals captured this month.",
    },
  ] as const;

  return (
    <section id="performance-snapshot" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-180 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
            Performance Snapshot
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Real metrics sourced directly
            <br />
            <span className="gradient-text">from our content and pipeline database</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
            These stats are rendered from live database counts so buyers can see operating
            depth across programs, proof assets, and inbound partnership activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-brand-400/35"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

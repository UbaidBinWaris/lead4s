import Link from "next/link";

const LINK_CLUSTERS = [
  {
    title: "Lead Generation Money Pages",
    links: [
      { label: "Exclusive Lead Generation Solutions", href: "/solutions" },
      { label: "Industry Lead Programs", href: "/industries" },
      { label: "Lead Generation Case Studies", href: "/case-studies" },
      { label: "Lead Gen Blog and Playbooks", href: "/blog" },
    ],
  },
  {
    title: "Buyer Action Pages",
    links: [
      { label: "Request Lead Pricing and Availability", href: "/contact" },
      { label: "Partner With Lead4s", href: "/partnership" },
      { label: "About Our Acquisition Team", href: "/about" },
      { label: "Careers and Delivery Operations", href: "/career" },
    ],
  },
] as const;

export function SeoInternalLinks() {
  return (
    <section id="seo-link-clusters" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
            Explore More
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Internal resource clusters
            <br />
            <span className="gradient-text">for buyers researching lead partners</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {LINK_CLUSTERS.map((cluster) => (
            <article
              key={cluster.title}
              className="rounded-2xl border border-white/10 bg-white/3 p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                {cluster.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {cluster.links.map((linkItem) => (
                  <li key={linkItem.href}>
                    <Link
                      href={linkItem.href}
                      className="text-sm font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-4 transition hover:text-brand-200"
                    >
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

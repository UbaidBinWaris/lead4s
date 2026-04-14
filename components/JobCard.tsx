import Link from "next/link";
import type { JobPost } from "@/data/careers";

type JobCardProps = {
  job: JobPost;
};

export function JobCard({ job }: Readonly<JobCardProps>) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/35 hover:bg-white/7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-400/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-brand-400/30 bg-brand-500/10 px-2.5 py-1 font-semibold uppercase tracking-wider text-brand-300">
          {job.department}
        </span>
        <span className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-slate-300">
          {job.type}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-white">{job.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-slate-400">{job.summary}</p>

      <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-slate-300">
        {job.location}
      </div>

      <div>
        <Link
          href={`/career?position=${job.id}#career-apply`}
          scroll
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition-all duration-300 hover:brightness-110 hover:shadow-brand-600/30"
        >
          Apply Now{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

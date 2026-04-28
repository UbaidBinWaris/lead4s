"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/api";
import { formatDate } from "@/lib/blog";
import type { Blog } from "@/types/blog";

type Stats = {
  totalBlogs: number;
  blogsThisMonth: number;
  totalJobApplications: number;
  totalCaseStudies: number;
};

async function getStats(): Promise<Stats> {
  const res = await fetch("/api/stats", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json() as Promise<Stats>;
}

function getMonthlyData(blogs: Blog[]) {
  const now = new Date();
  const months: { label: string; short: string; count: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString("en-US", { month: "long", year: "numeric" }),
      short: d.toLocaleString("en-US", { month: "short" }),
      count: 0,
    });
  }

  for (const blog of blogs) {
    const d = new Date(blog.createdAt);
    const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
    const entry = months.find((m) => m.label === key);
    if (entry) entry.count++;
  }

  return months;
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${accent ?? "text-white"}`}>
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}

function BarChart({ data }: { data: { short: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex h-36 items-end gap-3">
      {data.map(({ short, count }) => {
        const pct = Math.max((count / max) * 100, count > 0 ? 6 : 1);
        return (
          <div key={short} className="flex flex-1 flex-col items-center gap-1.5">
            {count > 0 ? (
              <span className="text-xs font-semibold text-slate-300">{count}</span>
            ) : (
              <span className="text-xs text-slate-700">0</span>
            )}
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${pct}%`,
                background:
                  count > 0
                    ? "linear-gradient(to top, hsl(221,83%,43%), hsl(221,83%,63%))"
                    : "hsl(0,0%,14%)",
              }}
            />
            <span className="text-[11px] text-slate-500">{short}</span>
          </div>
        );
      })}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
      <div className="h-3 w-20 animate-pulse rounded bg-slate-800" />
      <div className="mt-3 h-8 w-16 animate-pulse rounded bg-slate-800" />
    </div>
  );
}

export function OverviewDashboard({ onNavigateToBlogs }: { onNavigateToBlogs: () => void }) {
  const statsQuery = useQuery({ queryKey: ["stats"], queryFn: getStats });
  const blogsQuery = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });

  const monthlyData = getMonthlyData(blogsQuery.data ?? []);
  const recentBlogs = (blogsQuery.data ?? []).slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">{greeting} — here&apos;s your content overview.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsQuery.isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              label="Total Blogs"
              value={statsQuery.data?.totalBlogs ?? 0}
              sub="All published posts"
              accent="text-blue-400"
            />
            <StatCard
              label="This Month"
              value={statsQuery.data?.blogsThisMonth ?? 0}
              sub="New posts in current month"
            />
            <StatCard
              label="Job Applications"
              value={statsQuery.data?.totalJobApplications ?? 0}
              sub="Total received"
            />
            <StatCard
              label="Case Studies"
              value={statsQuery.data?.totalCaseStudies ?? 0}
              sub="Published"
            />
          </>
        )}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Blogs Published</h2>
            <p className="mt-0.5 text-xs text-slate-500">Last 6 months</p>
          </div>
          {blogsQuery.data && (
            <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-xs text-slate-400">
              {blogsQuery.data.length} total
            </span>
          )}
        </div>

        {blogsQuery.isLoading ? (
          <div className="flex h-36 items-end gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 animate-pulse rounded-t-md bg-slate-800"
                style={{ height: `${20 + Math.random() * 60}%` }}
              />
            ))}
          </div>
        ) : (
          <BarChart data={monthlyData} />
        )}
      </div>

      {/* Recent posts */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent Posts</h2>
            <p className="mt-0.5 text-xs text-slate-500">Latest 5 blog entries</p>
          </div>
          <button
            type="button"
            onClick={onNavigateToBlogs}
            className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            View all →
          </button>
        </div>

        {blogsQuery.isLoading ? (
          <div className="divide-y divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-800" />
                <div className="ml-auto h-3 w-16 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : recentBlogs.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <p className="text-sm text-slate-500">No blog posts yet.</p>
            <button
              type="button"
              onClick={onNavigateToBlogs}
              className="mt-3 text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              Create your first post →
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-800/60">
            {recentBlogs.map((blog) => (
              <li key={blog.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{blog.title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">/{blog.slug}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">
                  {formatDate(new Date(blog.createdAt))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

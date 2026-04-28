"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiRefreshCw, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { formatDate } from "@/lib/blog";
import type { JobApplication } from "@/types/jobApplication";

const PAGE_SIZE = 10;

async function getJobApplications(): Promise<JobApplication[]> {
  const res = await fetch("/api/job-applications", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json() as Promise<JobApplication[]>;
}

function PositionBadge({ position }: { position: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs font-medium text-slate-300">
      {position}
    </span>
  );
}

function CoverLetterRow({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const short = text.length > 160;

  return (
    <div className="text-sm text-slate-400">
      <p className="whitespace-pre-wrap leading-relaxed">
        {expanded || !short ? text : `${text.slice(0, 160)}…`}
      </p>
      {short && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
        >
          {expanded ? (
            <><FiChevronUp className="h-3 w-3" /> Show less</>
          ) : (
            <><FiChevronDown className="h-3 w-3" /> Read more</>
          )}
        </button>
      )}
    </div>
  );
}

function ExpandedRow({ app }: { app: JobApplication }) {
  return (
    <tr className="bg-slate-900/40">
      <td colSpan={6} className="px-5 py-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Cover Letter
            </p>
            <CoverLetterRow text={app.coverLetter} />
          </div>
          <div className="space-y-3">
            {app.phone && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
                <p className="mt-0.5 text-sm text-slate-300">{app.phone}</p>
              </div>
            )}
            {app.ipAddress && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">IP Address</p>
                <p className="mt-0.5 font-mono text-xs text-slate-500">{app.ipAddress}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resume</p>
              <a
                href={`/api/job-applications/${app.id}/resume`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                <FiDownload className="h-3.5 w-3.5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function JobApplicationsView() {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const query = useQuery({ queryKey: ["job-applications"], queryFn: getJobApplications });

  const all = query.data ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const paged = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleRow(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Job Applications</h1>
          <p className="mt-1 text-sm text-slate-400">
            {all.length > 0
              ? `${all.length} application${all.length !== 1 ? "s" : ""} received`
              : "No applications yet."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => query.refetch().catch(() => undefined)}
          disabled={query.isRefetching}
          aria-label="Refresh applications"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:opacity-60"
        >
          <FiRefreshCw className={`h-3.5 w-3.5 ${query.isRefetching ? "animate-spin" : ""}`} />
          {query.isRefetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        {query.isLoading ? (
          <div className="space-y-0 divide-y divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                <div className="h-3 w-40 animate-pulse rounded bg-slate-800" />
                <div className="ml-auto h-3 w-20 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : all.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="rounded-full bg-slate-800 p-4">
              <FiDownload className="h-6 w-6 text-slate-500" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">No applications yet</p>
            <p className="mt-1 text-xs text-slate-500">Applications submitted via the careers page will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applicant
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Position
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Applied
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.map((app) => {
                  const isExpanded = expandedId === app.id;
                  return (
                    <>
                      <tr
                        key={app.id}
                        className={`border-b border-slate-800/60 transition-colors ${
                          isExpanded ? "bg-slate-900/30" : "hover:bg-slate-900/20"
                        }`}
                      >
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-white">{app.fullName}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <PositionBadge position={app.position} />
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-400">{app.email}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">
                          {formatDate(new Date(app.createdAt))}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => toggleRow(app.id)}
                            aria-label={isExpanded ? "Collapse details" : "Expand details"}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800"
                          >
                            {isExpanded ? (
                              <><FiChevronUp className="h-3.5 w-3.5" /> Hide</>
                            ) : (
                              <><FiChevronDown className="h-3.5 w-3.5" /> View</>
                            )}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && <ExpandedRow key={`${app.id}-expanded`} app={app} />}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!query.isLoading && all.length > PAGE_SIZE && (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-300">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, all.length)}
            </span>{" "}
            of <span className="font-medium text-slate-300">{all.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => { setPage((p) => p - 1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => { setPage((p) => p + 1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

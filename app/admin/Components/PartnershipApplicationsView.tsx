"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiRefreshCw, FiSearch, FiChevronDown, FiChevronUp,
  FiDownload, FiBriefcase,
} from "react-icons/fi";
import { FaGlobe, FaDesktop, FaMobile, FaTablet } from "react-icons/fa";

const PAGE_SIZE = 15;

interface Application {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  website: string | null;
  vertical: string;
  monthlyVolume: string | null;
  message: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface ApiResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
}

function parseUA(ua: string | null) {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "desktop" as const };
  const isMobile = /Mobi|Android|iPhone|iPod/i.test(ua);
  const isTablet  = /iPad|Tablet/i.test(ua);
  const device: "mobile" | "tablet" | "desktop" = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
  let browser = "Unknown";
  if (/Edg\//i.test(ua))          browser = "Edge";
  else if (/OPR\//i.test(ua))     browser = "Opera";
  else if (/Chrome\//i.test(ua))  browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua))  browser = "Safari";
  const ver = ua.match(/(?:Chrome|Firefox|Safari|Edg|OPR)\/(\d+)/i);
  if (ver?.[1]) browser += ` ${ver[1]}`;
  let os = "Unknown";
  if (/Windows NT 10/i.test(ua))  os = "Windows 10/11";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua))   os = "macOS";
  else if (/Android (\d+)/i.test(ua)) os = `Android ${ua.match(/Android (\d+)/i)?.[1] ?? ""}`;
  else if (/iPhone OS/i.test(ua))  os = "iOS";
  else if (/Linux/i.test(ua))      os = "Linux";
  return { browser, os, device };
}

function DeviceIcon({ d }: { d: "mobile"|"tablet"|"desktop" }) {
  const c = "h-3.5 w-3.5";
  if (d === "mobile")  return <FaMobile  className={c} />;
  if (d === "tablet")  return <FaTablet  className={c} />;
  return <FaDesktop className={c} />;
}

function VerticalBadge({ v }: { v: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">
      {v}
    </span>
  );
}

async function fetchApplications(params: { page: number; q: string; from: string; to: string }): Promise<ApiResponse> {
  const sp = new URLSearchParams({
    page:  String(params.page),
    limit: String(PAGE_SIZE),
    ...(params.q    && { q: params.q }),
    ...(params.from && { from: params.from }),
    ...(params.to   && { to: params.to }),
  });
  const res = await fetch(`/api/partnership?${sp}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<ApiResponse>;
}

async function downloadCsv(q: string, from: string, to: string) {
  const sp = new URLSearchParams({ limit: "10000", ...(q && { q }), ...(from && { from }), ...(to && { to }) });
  const res  = await fetch(`/api/partnership?${sp}`, { cache: "no-store" });
  const data = await res.json() as ApiResponse;
  const rows = [
    "Company,Contact,Email,Phone,Website,Vertical,Volume,IP Address,Submitted At",
    ...data.applications.map((a) =>
      [a.companyName, a.contactName, a.email, a.phone ?? "", a.website ?? "",
       a.vertical, a.monthlyVolume ?? "", a.ipAddress ?? "",
       new Date(a.createdAt).toISOString()].join(",")
    ),
  ];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `partnerships-${new Date().toISOString().slice(0,10)}.csv`;
  anchor.click(); URL.revokeObjectURL(url);
}

function ExpandedRow({ app }: { app: Application }) {
  const { browser, os, device } = parseUA(app.userAgent);
  return (
    <tr className="bg-slate-900/40">
      <td colSpan={8} className="px-5 py-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">IP Address</p>
            {app.ipAddress ? (
              <div className="flex items-center gap-2">
                <FaGlobe className="h-3.5 w-3.5 text-blue-400" />
                <code className="font-mono text-sm text-slate-200">{app.ipAddress}</code>
                <a href={`https://ipinfo.io/${app.ipAddress}`} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 underline hover:text-blue-300">Lookup ↗</a>
              </div>
            ) : <p className="text-xs text-slate-600">Not captured</p>}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Device</p>
            {app.userAgent ? (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <DeviceIcon d={device} />
                <span>{browser}</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-500">{os}</span>
              </div>
            ) : <p className="text-xs text-slate-600">Unknown</p>}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Website</p>
            {app.website ? (
              <a href={app.website} target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-400 underline hover:text-blue-300 break-all">{app.website}</a>
            ) : <p className="text-xs text-slate-600">—</p>}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Monthly Volume</p>
            <p className="text-sm text-slate-300">{app.monthlyVolume ?? "—"}</p>
          </div>

          {app.message && (
            <div className="col-span-full space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Message</p>
              <p className="text-sm leading-relaxed text-slate-400">{app.message}</p>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export function PartnershipApplicationsView() {
  const [page,       setPage]       = useState(1);
  const [q,          setQ]          = useState("");
  const [from,       setFrom]       = useState("");
  const [to,         setTo]         = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Applied filters (only hits API on "Apply")
  const [applied, setApplied] = useState({ q: "", from: "", to: "" });

  const query = useQuery({
    queryKey: ["partnership-apps", page, applied],
    queryFn:  () => fetchApplications({ page, ...applied }),
  });

  const apps       = query.data?.applications ?? [];
  const total      = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function applyFilters() { setApplied({ q, from, to }); setPage(1); setExpandedId(null); }
  function clearFilters()  { setQ(""); setFrom(""); setTo(""); setApplied({ q: "", from: "", to: "" }); setPage(1); }
  const hasFilter = applied.q || applied.from || applied.to;

  return (
    <div className="space-y-4">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Partnership Applications</h1>
          <p className="mt-1 text-sm text-slate-400">
            {query.isLoading ? "Loading…" : `${total} application${total !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => void downloadCsv(applied.q, applied.from, applied.to)}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800">
            <FiDownload className="h-3.5 w-3.5" /> Export CSV
          </button>
          <button type="button" onClick={() => query.refetch().catch(() => undefined)} disabled={query.isRefetching}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:opacity-60">
            <FiRefreshCw className={`h-3.5 w-3.5 ${query.isRefetching ? "animate-spin" : ""}`} />
            {query.isRefetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-4">
        {/* Search */}
        <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2">
          <FiSearch className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          <input
            type="text" value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="Search company, email…"
            className="flex-1 bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>
        {/* Date from */}
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-600">From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500/50" />
        </div>
        {/* Date to */}
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-600">To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500/50" />
        </div>
        <button type="button" onClick={applyFilters}
          className="inline-flex min-h-[36px] items-center rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-500">
          Apply
        </button>
        {hasFilter && (
          <button type="button" onClick={clearFilters}
            className="text-xs text-slate-500 underline hover:text-slate-300">Clear</button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        {query.isLoading ? (
          <div className="divide-y divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i} className="flex gap-4 px-5 py-4">
                <div className="h-3 w-40 animate-pulse rounded bg-slate-800" />
                <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : apps.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
              <FiBriefcase className="h-6 w-6 text-slate-500" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">No applications yet</p>
            <p className="mt-1 text-xs text-slate-500">Partnership form submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  {["#","Company","Contact","Email","Vertical","IP","Device","Submitted",""].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apps.map((app, idx) => {
                  const { browser, os, device } = parseUA(app.userAgent);
                  const isOpen = expandedId === app.id;
                  return (
                    <>
                      <tr key={app.id}
                        className={`border-b border-slate-800/60 transition-colors ${isOpen ? "bg-slate-900/30" : "hover:bg-slate-900/20"}`}>
                        <td className="px-4 py-3 text-xs text-slate-600">{(page-1)*PAGE_SIZE+idx+1}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-white">{app.companyName}</p>
                          {app.website && <p className="text-xs text-slate-600 truncate max-w-[120px]">{app.website.replace(/^https?:\/\//, "")}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-slate-300">{app.contactName}</p>
                          {app.phone && <p className="text-xs text-slate-600">{app.phone}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${app.email}`} className="text-sm text-slate-300 hover:text-blue-300 transition-colors">{app.email}</a>
                        </td>
                        <td className="px-4 py-3"><VerticalBadge v={app.vertical} /></td>
                        <td className="px-4 py-3">
                          {app.ipAddress ? (
                            <div className="flex items-center gap-1.5">
                              <FaGlobe className="h-3 w-3 text-slate-500" />
                              <code className="font-mono text-xs text-slate-400">{app.ipAddress}</code>
                            </div>
                          ) : <span className="text-xs text-slate-700">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {app.userAgent ? (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <DeviceIcon d={device} />
                              <span>{browser}</span>
                              <span className="text-slate-600">·</span>
                              <span className="text-xs text-slate-600">{os}</span>
                            </div>
                          ) : <span className="text-xs text-slate-700">—</span>}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button type="button" onClick={() => setExpandedId(isOpen ? null : app.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800">
                            {isOpen ? <FiChevronUp className="h-3 w-3" /> : <FiChevronDown className="h-3 w-3" />}
                            {isOpen ? "Hide" : "More"}
                          </button>
                        </td>
                      </tr>
                      {isOpen && <ExpandedRow key={`${app.id}-exp`} app={app} />}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {!query.isLoading && total > PAGE_SIZE && (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-300">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,total)}</span> of <span className="font-medium text-slate-300">{total}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page===1} onClick={() => { setPage(p=>p-1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-40">← Prev</button>
            <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
            <button type="button" disabled={page===totalPages} onClick={() => { setPage(p=>p+1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-40">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}

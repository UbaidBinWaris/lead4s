"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiRefreshCw, FiMail, FiDownload, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaDesktop, FaMobile, FaTablet, FaGlobe } from "react-icons/fa";

const PAGE_SIZE = 20;

interface Subscriber {
  id: string;
  email: string;
  source: string;
  ipAddress: string | null;
  userAgent: string | null;
  isActive: boolean;
  createdAt: string;
}

interface ApiResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
}

async function fetchSubscribers(page: number, active: string): Promise<ApiResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
    ...(active !== "all" && { active }),
  });
  const res = await fetch(`/api/newsletter?${params}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch subscribers");
  return res.json() as Promise<ApiResponse>;
}

/** Parse the User-Agent string into human-readable browser + OS + device type */
function parseUserAgent(ua: string | null): {
  browser: string;
  os: string;
  device: "mobile" | "tablet" | "desktop";
  raw: string;
} {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "desktop", raw: "" };

  // Device type
  const isMobile = /Mobi|Android|iPhone|iPod/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const device: "mobile" | "tablet" | "desktop" = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  // Browser
  let browser = "Unknown";
  if (/Edg\//i.test(ua))          browser = "Edge";
  else if (/OPR\//i.test(ua))     browser = "Opera";
  else if (/Chrome\//i.test(ua))  browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua))  browser = "Safari";
  else if (/MSIE|Trident/i.test(ua)) browser = "IE";

  // Version
  const verMatch =
    ua.match(/(?:Chrome|Firefox|Safari|Edg|OPR)\/(\d+)/i) ??
    ua.match(/Version\/(\d+)/i);
  if (verMatch?.[1]) browser += ` ${verMatch[1]}`;

  // OS
  let os = "Unknown";
  if (/Windows NT 10/i.test(ua))     os = "Windows 11/10";
  else if (/Windows NT/i.test(ua))   os = "Windows";
  else if (/Mac OS X/i.test(ua))     os = "macOS";
  else if (/Android (\d+)/i.test(ua)) {
    const m = ua.match(/Android (\d+)/i);
    os = `Android ${m?.[1] ?? ""}`.trim();
  }
  else if (/iPhone OS (\d+)/i.test(ua)) {
    const m = ua.match(/iPhone OS (\d+)/i);
    os = `iOS ${m?.[1] ?? ""}`.trim();
  }
  else if (/Linux/i.test(ua))        os = "Linux";

  return { browser, os, device, raw: ua };
}

function DeviceIcon({ device }: { device: "mobile" | "tablet" | "desktop" }) {
  const cls = "h-3.5 w-3.5";
  if (device === "mobile")  return <FaMobile  className={cls} />;
  if (device === "tablet")  return <FaTablet  className={cls} />;
  return <FaDesktop className={cls} />;
}

function SourceBadge({ source }: { source: string }) {
  const colors: Record<string, string> = {
    footer: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    popup:  "border-purple-500/30 bg-purple-500/10 text-purple-300",
    blog:   "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };
  const cls = colors[source] ?? "border-slate-700 bg-slate-800/60 text-slate-400";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {source}
    </span>
  );
}

function StatusDot({ isActive }: { isActive: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-slate-600"}`} />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

/** Expanded detail row showing IP + device info */
function ExpandedRow({ sub }: { sub: Subscriber }) {
  const { browser, os, device, raw } = parseUserAgent(sub.userAgent);

  return (
    <tr className="bg-slate-900/40">
      <td colSpan={6} className="px-5 py-4">
        <div className="grid gap-5 sm:grid-cols-3">

          {/* IP Address */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              IP Address
            </p>
            {sub.ipAddress ? (
              <div className="flex items-center gap-2">
                <FaGlobe className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                <code className="font-mono text-sm text-slate-200">{sub.ipAddress}</code>
                <a
                  href={`https://ipinfo.io/${sub.ipAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 hover:text-blue-300 underline"
                >
                  Lookup ↗
                </a>
              </div>
            ) : (
              <p className="text-xs text-slate-600">Not captured</p>
            )}
          </div>

          {/* Device / Browser */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Device & Browser
            </p>
            {sub.userAgent ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <DeviceIcon device={device} />
                  <span className="capitalize">{device}</span>
                  <span className="text-slate-600">·</span>
                  <span>{browser}</span>
                </div>
                <p className="text-xs text-slate-500">{os}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-600">Not captured</p>
            )}
          </div>

          {/* Raw UA */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              User Agent
            </p>
            {raw ? (
              <p className="break-all font-mono text-[10px] leading-relaxed text-slate-600">
                {raw.length > 180 ? `${raw.slice(0, 180)}…` : raw}
              </p>
            ) : (
              <p className="text-xs text-slate-600">Not captured</p>
            )}
          </div>

        </div>
      </td>
    </tr>
  );
}

/** Download active subscribers as CSV */
async function downloadCsv() {
  const res  = await fetch("/api/newsletter?limit=10000&active=true", { cache: "no-store" });
  const data = await res.json() as ApiResponse;
  const rows = [
    "Email,Source,IP Address,Browser,OS,Device,Subscribed At",
    ...data.subscribers.map((s) => {
      const { browser, os, device } = parseUserAgent(s.userAgent);
      return [s.email, s.source, s.ipAddress ?? "", browser, os, device,
        new Date(s.createdAt).toISOString()].join(",");
    }),
  ];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function SubscribersView() {
  const [page,       setPage]       = useState(1);
  const [filter,     setFilter]     = useState<"all" | "true" | "false">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["newsletter-subscribers", page, filter],
    queryFn:  () => fetchSubscribers(page, filter),
  });

  const subscribers = query.data?.subscribers ?? [];
  const total       = query.data?.total ?? 0;
  const totalPages  = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function handleFilter(val: "all" | "true" | "false") {
    setFilter(val); setPage(1); setExpandedId(null);
  }

  function toggleRow(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-4">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Newsletter Subscribers</h1>
          <p className="mt-1 text-sm text-slate-400">
            {query.isLoading ? "Loading…" : `${total} subscriber${total !== 1 ? "s" : ""} total`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["all", "true", "false"] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleFilter(val)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === val
                  ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                  : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {val === "all" ? "All" : val === "true" ? "Active" : "Inactive"}
            </button>
          ))}

          <button
            type="button"
            onClick={() => void downloadCsv()}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <FiDownload className="h-3.5 w-3.5" /> Export CSV
          </button>

          <button
            type="button"
            onClick={() => query.refetch().catch(() => undefined)}
            disabled={query.isRefetching}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:opacity-60"
          >
            <FiRefreshCw className={`h-3.5 w-3.5 ${query.isRefetching ? "animate-spin" : ""}`} />
            {query.isRefetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",       value: total,                                                         color: "text-white" },
          { label: "Devices",     value: [...new Set(subscribers.map(s => parseUserAgent(s.userAgent).device))].length || "—", color: "text-blue-400" },
          { label: "IPs",         value: [...new Set(subscribers.map(s => s.ipAddress).filter(Boolean))].length || "—", color: "text-purple-400" },
          { label: "Sources",     value: [...new Set(subscribers.map(s => s.source))].length || "—",   color: "text-amber-400" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{card.label}</p>
            <p className={`mt-1.5 text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        {query.isLoading ? (
          <div className="divide-y divide-slate-800">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-3 w-48 animate-pulse rounded bg-slate-800" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-800" />
                <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
              <FiMail className="h-6 w-6 text-slate-500" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">No subscribers yet</p>
            <p className="mt-1 text-xs text-slate-500">Emails collected from the footer form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  {["#", "Email", "Source", "IP Address", "Device", "Status", "Subscribed", ""].map(h => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub, idx) => {
                  const { browser, os, device } = parseUserAgent(sub.userAgent);
                  const isExpanded = expandedId === sub.id;
                  return (
                    <>
                      <tr
                        key={sub.id}
                        className={`border-b border-slate-800/60 transition-colors ${isExpanded ? "bg-slate-900/30" : "hover:bg-slate-900/20"}`}
                      >
                        {/* # */}
                        <td className="px-5 py-3.5 text-xs text-slate-600">
                          {(page - 1) * PAGE_SIZE + idx + 1}
                        </td>
                        {/* Email */}
                        <td className="px-5 py-3.5">
                          <a href={`mailto:${sub.email}`} className="text-sm font-medium text-slate-200 transition-colors hover:text-blue-300">
                            {sub.email}
                          </a>
                        </td>
                        {/* Source */}
                        <td className="px-5 py-3.5"><SourceBadge source={sub.source} /></td>
                        {/* IP */}
                        <td className="px-5 py-3.5">
                          {sub.ipAddress ? (
                            <div className="flex items-center gap-1.5">
                              <FaGlobe className="h-3 w-3 shrink-0 text-slate-500" />
                              <code className="font-mono text-xs text-slate-400">{sub.ipAddress}</code>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-700">—</span>
                          )}
                        </td>
                        {/* Device */}
                        <td className="px-5 py-3.5">
                          {sub.userAgent ? (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <DeviceIcon device={device} />
                              <span>{browser}</span>
                              <span className="text-slate-600">·</span>
                              <span className="text-slate-600">{os}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-700">—</span>
                          )}
                        </td>
                        {/* Status */}
                        <td className="px-5 py-3.5"><StatusDot isActive={sub.isActive} /></td>
                        {/* Date */}
                        <td className="px-5 py-3.5 text-xs text-slate-500">
                          {new Date(sub.createdAt).toLocaleString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        {/* Expand */}
                        <td className="px-5 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => toggleRow(sub.id)}
                            aria-label={isExpanded ? "Collapse details" : "Expand details"}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800"
                          >
                            {isExpanded ? <FiChevronUp className="h-3 w-3" /> : <FiChevronDown className="h-3 w-3" />}
                            {isExpanded ? "Hide" : "Info"}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && <ExpandedRow key={`${sub.id}-exp`} sub={sub} />}
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
            Showing{" "}
            <span className="font-medium text-slate-300">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}</span>
            {" "}of <span className="font-medium text-slate-300">{total}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page === 1} onClick={() => { setPage(p => p - 1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-40"
            >← Prev</button>
            <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
            <button type="button" disabled={page === totalPages} onClick={() => { setPage(p => p + 1); setExpandedId(null); }}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-40"
            >Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}

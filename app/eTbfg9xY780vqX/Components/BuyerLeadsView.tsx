"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiRefreshCw, FiSearch, FiChevronDown, FiChevronUp,
  FiDownload, FiUsers,
} from "react-icons/fi";
import { FaGlobe, FaDesktop, FaMobile, FaTablet } from "react-icons/fa";

const PAGE_SIZE = 15;

interface BuyerLead {
  id: string;
  trackdriveNumber: string;
  trafficSourceId: string;
  callerId: string;
  pingId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  state: string | null;
  zip: string | null;
  city: string | null;
  address: string | null;
  address2: string | null;
  gender: string | null;
  maritalStatus: string | null;
  employmentStatus: string | null;
  annualIncome: number | null;
  currentlyInsured: boolean | null;
  insuranceCompany: string | null;
  yearsInsured: number | null;
  weight: number | null;
  heightInInches: number | null;
  paymentMethodAvailable: boolean | null;
  smoker: boolean | null;
  tcpaOptIn: boolean | null;
  tcpaOptinConsentLanguage: string | null;
  jornayaLeadid: string | null;
  trustedFormCertUrl: string | null;
  blueinkSecuredLeadsToken: string | null;
  permissiontrustToken: string | null;
  gclid: string | null;
  msclkid: string | null;
  voluumCid: string | null;
  sourceUrl: string | null;
  trafficSourcePlatform: string | null;
  mediaType: string | null;
  leadType: string | null;
  agedData: boolean | null;
  alternatePhone: string | null;
  dob: string | null;
  spokenLanguage: string | null;
  bestTimeToContact: string | null;
  s1: string | null;
  s2: string | null;
  s3: string | null;
  s4: string | null;
  s5: string | null;
  status: string;
  pingResponse: any;
  postResponse: any;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface ApiResponse {
  leads: BuyerLead[];
  total: number;
  page: number;
  limit: number;
}

function parseUA(ua: string | null) {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "desktop" as const };
  const isMobile = /Mobi|Android|iPhone|iPod/i.test(ua);
  const isTablet  = /iPad|Tablet/i.test(ua);
  const device: "mobile"|"tablet"|"desktop" = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
  let browser = "Unknown";
  if (/Edg\//i.test(ua))          browser = "Edge";
  else if (/OPR\//i.test(ua))     browser = "Opera";
  else if (/Chrome\//i.test(ua))  browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua))  browser = "Safari";
  const ver = ua.match(/(?:Chrome|Firefox|Safari|Edg|OPR)\/(\d+)/i);
  if (ver?.[1]) browser += ` ${ver[1]}`;
  let os = "Unknown";
  if (/Windows NT 10/i.test(ua))   os = "Windows 10/11";
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "pending":      "border-slate-700 bg-slate-800 text-slate-300",
    "ping_success": "border-blue-500/30 bg-blue-500/10 text-blue-300",
    "ping_failed":  "border-red-500/30 bg-red-500/10 text-red-300",
    "post_success": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    "post_failed":  "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };
  const cls = map[status] ?? "border-slate-700 bg-slate-800 text-slate-400";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${cls}`}>
      {status.replace("_", " ")}
    </span>
  );
}

async function fetchLeads(params: { page: number; q: string; from: string; to: string }): Promise<ApiResponse> {
  const sp = new URLSearchParams({
    page:  String(params.page),
    limit: String(PAGE_SIZE),
    ...(params.q    && { q: params.q }),
    ...(params.from && { from: params.from }),
    ...(params.to   && { to: params.to }),
  });
  const res = await fetch(`/api/buyer-form?${sp}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json() as Promise<ApiResponse>;
}

async function downloadCsv(q: string, from: string, to: string) {
  const sp   = new URLSearchParams({ limit: "10000", ...(q && { q }), ...(from && { from }), ...(to && { to }) });
  const res  = await fetch(`/api/buyer-form?${sp}`, { cache: "no-store" });
  const data = await res.json() as ApiResponse;
  const headers = [
    "First Name", "Last Name", "Phone", "Email", "State", "City", "Address", "ZIP", 
    "DOB", "Gender", "Income", "Insured", "Insurance Company", "Status", "Ping ID", 
    "IP Address", "User Agent", "Submitted At"
  ];
  const rows = [
    headers.join(","),
    ...data.leads.map((l) =>
      [
        l.firstName ?? "", l.lastName ?? "", l.callerId, l.email ?? "", l.state ?? "", 
        l.city ?? "", `"${(l.address ?? "").replace(/"/g, '""')}"`, l.zip ?? "", 
        l.dob ?? "", l.gender ?? "", l.annualIncome ?? "", l.currentlyInsured ?? "", 
        l.insuranceCompany ?? "", l.status, l.pingId ?? "", l.ipAddress ?? "", 
        `"${(l.userAgent ?? "").replace(/"/g, '""')}"`, new Date(l.createdAt).toISOString()
      ].join(",")
    ),
  ];
  const blob   = new Blob([rows.join("\n")], { type: "text/csv" });
  const url    = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `buyer-leads-${new Date().toISOString().slice(0,10)}.csv`;
  anchor.click(); URL.revokeObjectURL(url);
}

function ExpandedRow({ lead }: { lead: BuyerLead }) {
  const { browser, os, device } = parseUA(lead.userAgent);
  return (
    <tr className="bg-slate-900/40 border-b border-slate-800">
      <td colSpan={9} className="px-6 py-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {/* 1. Lead Identity & Contact */}
          <div className="space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Identity & Contact
            </h4>
            <div className="space-y-1.5 text-xs">
              <div><span className="text-slate-500">Name:</span> <span className="text-slate-300 font-semibold">{lead.firstName} {lead.lastName}</span></div>
              <div><span className="text-slate-500">Phone:</span> <span className="text-slate-300">{lead.callerId}</span></div>
              {lead.alternatePhone && <div><span className="text-slate-500">Alt Phone:</span> <span className="text-slate-300">{lead.alternatePhone}</span></div>}
              <div><span className="text-slate-500">Email:</span> <span className="text-slate-300 break-all">{lead.email || "—"}</span></div>
              <div><span className="text-slate-500">Lang:</span> <span className="text-slate-300">{lead.spokenLanguage || "English"}</span></div>
              <div><span className="text-slate-500">Best Contact:</span> <span className="text-slate-300 capitalize">{lead.bestTimeToContact}</span></div>
            </div>
          </div>

          {/* 2. Address & Location */}
          <div className="space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Location
            </h4>
            <div className="space-y-1.5 text-xs">
              <div><span className="text-slate-500">Street:</span> <span className="text-slate-300">{lead.address || "—"}</span></div>
              {lead.address2 && <div><span className="text-slate-500">Apt/Suite:</span> <span className="text-slate-300">{lead.address2}</span></div>}
              <div><span className="text-slate-500">City:</span> <span className="text-slate-300">{lead.city || "—"}</span></div>
              <div><span className="text-slate-500">State/Zip:</span> <span className="text-slate-300">{lead.state} {lead.zip}</span></div>
            </div>
          </div>

          {/* 3. Demographic Profile */}
          <div className="space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Demographic Profile
            </h4>
            <div className="space-y-1.5 text-xs">
              <div><span className="text-slate-500">DOB:</span> <span className="text-slate-300">{lead.dob || "—"}</span></div>
              <div><span className="text-slate-500">Gender/Marital:</span> <span className="text-slate-300">{lead.gender} / {lead.maritalStatus}</span></div>
              <div><span className="text-slate-500">Employment:</span> <span className="text-slate-300 capitalize">{lead.employmentStatus || "—"}</span></div>
              <div><span className="text-slate-500">Income:</span> <span className="text-slate-300">${(lead.annualIncome ?? 0).toLocaleString()}</span></div>
              <div><span className="text-slate-500">Weight/Height:</span> <span className="text-slate-300">{lead.weight} lbs / {lead.heightInInches}&quot;</span></div>
              <div><span className="text-slate-500">Smoker:</span> <span className="text-slate-300">{lead.smoker ? "Yes" : "No"}</span></div>
            </div>
          </div>

          {/* 4. Insurer & Compliance */}
          <div className="space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Insurance & Settings
            </h4>
            <div className="space-y-1.5 text-xs">
              <div><span className="text-slate-500">Insured:</span> <span className="text-slate-300">{lead.currentlyInsured ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Insurer:</span> <span className="text-slate-300 capitalize">{(lead.insuranceCompany || "").replace("_", " ")}</span></div>
              <div><span className="text-slate-500">Years Insured:</span> <span className="text-slate-300">{lead.yearsInsured} yr</span></div>
              <div><span className="text-slate-500">Trackdrive No:</span> <span className="text-slate-300">{lead.trackdriveNumber}</span></div>
              <div><span className="text-slate-500">Traffic Src ID:</span> <span className="text-slate-300">{lead.trafficSourceId}</span></div>
              <div><span className="text-slate-500">TCPA Agreed:</span> <span className="text-slate-300">{lead.tcpaOptIn ? "Yes" : "No"}</span></div>
            </div>
          </div>

          {/* Device & IP Details */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Visitor Footprint
            </h4>
            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block">IP Address</span>
                {lead.ipAddress ? (
                  <div className="flex items-center gap-2">
                    <FaGlobe className="h-3.5 w-3.5 text-blue-400" />
                    <code className="font-mono text-slate-200">{lead.ipAddress}</code>
                    <a href={`https://ipinfo.io/${lead.ipAddress}`} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline">Lookup ↗</a>
                  </div>
                ) : <span className="text-slate-600">Not captured</span>}
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Browser / OS footprint</span>
                {lead.userAgent ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-300">
                      <DeviceIcon d={device} />
                      <span className="capitalize">{device}</span>
                      <span className="text-slate-600">·</span>
                      <span>{browser}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 break-all leading-normal">{lead.userAgent}</p>
                  </div>
                ) : <span className="text-slate-600">Unknown</span>}
              </div>
            </div>
          </div>

          {/* Tokens & Click IDs */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-3 p-4 rounded-xl border border-white/5 bg-black/20">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Compliance & Advertising Tokens
            </h4>
            <div className="space-y-1.5 text-xs">
              <div><span className="text-slate-500">Jornaya Lead ID:</span> <span className="text-slate-300 break-all select-all font-mono">{lead.jornayaLeadid || "—"}</span></div>
              <div>
                <span className="text-slate-500">TrustedForm URL:</span>{" "}
                {lead.trustedFormCertUrl ? (
                  <a href={lead.trustedFormCertUrl} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 break-all font-mono underline">{lead.trustedFormCertUrl}</a>
                ) : <span className="text-slate-500">—</span>}
              </div>
              <div><span className="text-slate-500">Blue Ink Token:</span> <span className="text-slate-300 font-mono">{lead.blueinkSecuredLeadsToken || "—"}</span></div>
              <div><span className="text-slate-500">PermissionTrust Token:</span> <span className="text-slate-300 font-mono break-all">{lead.permissiontrustToken || "—"}</span></div>
              <div><span className="text-slate-500">Google Click ID (GCLID):</span> <span className="text-slate-300 font-mono">{lead.gclid || "—"}</span></div>
              <div><span className="text-slate-500">Microsoft Click ID:</span> <span className="text-slate-300 font-mono">{lead.msclkid || "—"}</span></div>
              <div><span className="text-slate-500">Voluum ID:</span> <span className="text-slate-300 font-mono">{lead.voluumCid || "—"}</span></div>
              <div>
                <span className="text-slate-500">Source Landing Page:</span>{" "}
                {lead.sourceUrl ? (
                  <a href={lead.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline">{lead.sourceUrl}</a>
                ) : <span className="text-slate-500">—</span>}
              </div>
            </div>
          </div>

          {/* Response Payload Debugger */}
          <div className="col-span-full space-y-2 p-4 rounded-xl border border-white/5 bg-black/40">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-2">
              Trackdrive Integration Payloads
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">PING response (Availability Check)</span>
                <pre className="h-44 overflow-y-auto text-[10px] bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-emerald-400 text-left">
                  {lead.pingResponse ? JSON.stringify(lead.pingResponse, null, 2) : "No PING payload"}
                </pre>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">POST response (Call Transfer)</span>
                <pre className="h-44 overflow-y-auto text-[10px] bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-emerald-400 text-left">
                  {lead.postResponse ? JSON.stringify(lead.postResponse, null, 2) : "No POST payload"}
                </pre>
              </div>
            </div>
          </div>

        </div>
      </td>
    </tr>
  );
}

export function BuyerLeadsView() {
  const [page,       setPage]       = useState(1);
  const [q,          setQ]          = useState("");
  const [from,       setFrom]       = useState("");
  const [to,         setTo]         = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applied,    setApplied]    = useState({ q: "", from: "", to: "" });

  const query = useQuery({
    queryKey: ["buyer-leads", page, applied],
    queryFn:  () => fetchLeads({ page, ...applied }),
  });

  const leads      = query.data?.leads ?? [];
  const total      = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function applyFilters() { setApplied({ q, from, to }); setPage(1); setExpandedId(null); }
  function clearFilters()  { setQ(""); setFrom(""); setTo(""); setApplied({ q: "", from: "", to: "" }); setPage(1); }
  const hasFilter = applied.q || applied.from || applied.to;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Buyer Form Submissions</h1>
          <p className="mt-1 text-sm text-slate-400">
            {query.isLoading ? "Loading…" : `${total} submission${total !== 1 ? "s" : ""}`}
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

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-4">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2">
          <FiSearch className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="Search name, phone, email, status…"
            className="flex-1 bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-600">From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500/50" />
        </div>
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

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        {query.isLoading ? (
          <div className="divide-y divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 px-5 py-4">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-800" />
                <div className="h-3 w-48 animate-pulse rounded bg-slate-800" />
                <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
              <FiUsers className="h-6 w-6 text-slate-500" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">No buyer form submissions yet</p>
            <p className="mt-1 text-xs text-slate-500">Submissions from the buyer check form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  {["#","Lead Name","Phone","Email","State","IP / Footprint","Status","Submitted",""].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => {
                  const { browser, device } = parseUA(lead.userAgent);
                  const isOpen = expandedId === lead.id;
                  return (
                    <React.Fragment key={lead.id}>
                      <tr
                        className={`border-b border-slate-800/60 transition-colors ${isOpen ? "bg-slate-900/30" : "hover:bg-slate-900/20"}`}>
                        <td className="px-4 py-4 text-xs text-slate-600">{(page-1)*PAGE_SIZE+idx+1}</td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-semibold text-white">
                            {lead.firstName || "—"} {lead.lastName || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-300">{lead.callerId}</td>
                        <td className="px-4 py-4 text-sm text-slate-300 break-all">{lead.email || "—"}</td>
                        <td className="px-4 py-4 text-sm text-slate-400 font-bold">{lead.state || "—"}</td>
                        <td className="px-4 py-4">
                          {lead.ipAddress ? (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <FaGlobe className="h-3 w-3 text-slate-500" />
                              <code className="font-mono text-[10px] text-slate-400">{lead.ipAddress}</code>
                              <span className="text-slate-600">·</span>
                              <DeviceIcon d={device} />
                              <span className="text-[10px]">{browser}</span>
                            </div>
                          ) : <span className="text-xs text-slate-700">—</span>}
                        </td>
                        <td className="px-4 py-4"><StatusBadge status={lead.status} /></td>
                        <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button type="button" onClick={() => setExpandedId(isOpen ? null : lead.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800">
                            {isOpen ? <FiChevronUp className="h-3 w-3" /> : <FiChevronDown className="h-3 w-3" />}
                            {isOpen ? "Hide" : "Inspect"}
                          </button>
                        </td>
                      </tr>
                      {isOpen && <ExpandedRow lead={lead} />}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
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

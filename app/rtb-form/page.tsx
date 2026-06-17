"use client";

import { useState } from "react";
import Link from "next/link";

export default function RTBFormPage() {
  const [callerNumber, setCallerNumber] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/rtb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callerNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch data.");
      }

      setResponse(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden bg-grid px-6 py-14 sm:px-10 sm:py-16 min-h-screen">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(37,99,235,0.15),transparent_38%),radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.1),transparent_40%),radial-gradient(circle_at_16%_84%,rgba(245,158,11,0.1),transparent_38%)]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/12 bg-surface-925/75 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-12">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/55 to-transparent" />
        
        <p className="mb-4 text-xs font-semibold tracking-[0.32em] text-blue-300/80 text-center">
          REAL-TIME BIDDING
        </p>

        <h1 className="mx-auto mb-8 max-w-2xl text-3xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl text-center">
          Retreaver RTB
        </h1>

        <form onSubmit={handleSubmit} className="mb-8 space-y-6">
          <div>
            <label htmlFor="caller_number" className="block text-sm font-medium text-slate-300/85 mb-2">
              Caller Number
            </label>
            <input
              type="tel"
              id="caller_number"
              name="caller_number"
              placeholder="+17194451111"
              required
              value={callerNumber}
              onChange={(e) => setCallerNumber(e.target.value)}
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(37,99,235,0.5)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_18px_40px_rgba(37,99,235,0.55)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Submit Caller Number"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 mb-6">
            {error}
          </div>
        )}

        {response && (
          <div className="rounded-xl border border-white/10 bg-black/40 p-5 mt-6 overflow-hidden">
            <h3 className="text-sm font-semibold text-white mb-3">API Response:</h3>
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <pre className="text-xs text-slate-300/80 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

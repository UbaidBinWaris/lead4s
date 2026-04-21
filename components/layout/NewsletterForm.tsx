"use client";

import { useRef, useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputRef.current?.value.trim();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setErrorMsg("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <svg
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm text-emerald-300">You&apos;re subscribed! Thanks for joining.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
        <input
          ref={inputRef}
          type="email"
          required
          disabled={status === "loading"}
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors focus:border-white/30 disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {status === "loading" ? (
            <svg
              aria-hidden="true"
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <FaEnvelopeOpenText size={14} aria-hidden="true" />
          )}
        </button>
      </form>

      {status === "error" && (
        <div className="mt-2 flex items-center gap-2">
          <p className="flex-1 text-xs text-red-400">{errorMsg}</p>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-slate-500 underline hover:text-slate-300"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

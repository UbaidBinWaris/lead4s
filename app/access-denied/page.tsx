import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Denied",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessDeniedPage() {
  return (
    <main className="min-h-full bg-surface-950 py-20">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-800 bg-surface-900/70 px-6 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
          Admin Access
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Access denied
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
          This admin route requires a valid CRM authentication cookie. Sign in through your backend login flow first, then reopen the hidden admin URL.
        </p>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:opacity-60"
    >
      <FaSignOutAlt className="h-3.5 w-3.5 shrink-0" />
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}

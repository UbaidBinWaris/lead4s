"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSolution,
  deleteSolution,
  getSolutions,
  updateSolution,
} from "@/lib/api";
import type { Industry, IndustryInput } from "@/types/industry";
import { FiRefreshCw, FiExternalLink } from "react-icons/fi";
import { IndustryEditorModal } from "./IndustryEditorModal";

const PAGE_SIZE = 10;

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        published
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-slate-700/50 text-slate-500"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SolutionsView() {
  const queryClient = useQueryClient();
  const [editorSolution, setEditorSolution] = useState<Industry | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const solutionsQuery = useQuery({
    queryKey: ["solutions"],
    queryFn: getSolutions,
  });

  const allSolutions = solutionsQuery.data ?? [];
  const totalPages = Math.max(1, Math.ceil(allSolutions.length / PAGE_SIZE));
  const pagedSolutions = allSolutions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const createMutation = useMutation({
    mutationFn: (payload: IndustryInput) => createSolution(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorSolution(null);
      setPage(1);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IndustryInput }) =>
      updateSolution(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["solutions"] });
      const prev = queryClient.getQueryData<Industry[]>(["solutions"]);
      if (prev)
        queryClient.setQueryData<Industry[]>(
          ["solutions"],
          prev.map((s) => (s.id === id ? { ...s, ...payload } : s))
        );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["solutions"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorSolution(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSolution(id),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["solutions"] });
      const prev = queryClient.getQueryData<Industry[]>(["solutions"]);
      if (prev) {
        queryClient.setQueryData<Industry[]>(
          ["solutions"],
          prev.filter((s) => s.id !== id)
        );
        const newMax = Math.max(1, Math.ceil((prev.length - 1) / PAGE_SIZE));
        if (page > newMax) setPage(newMax);
      }
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["solutions"], ctx.prev);
    },
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["solutions"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function saveSolution(payload: IndustryInput, id?: string) {
    if (id) {
      updateMutation.mutate({ id, payload });
      return;
    }
    createMutation.mutate(payload);
  }

  function removeSolution(solution: Industry) {
    if (!globalThis.confirm(`Delete "${solution.title}"?`)) return;
    deleteMutation.mutate(solution.id);
  }

  return (
    <>
      {editorOpen && (
        <IndustryEditorModal
          initialIndustry={editorSolution}
          isSaving={isSaving}
          contentType="solution"
          onCancel={() => {
            setEditorOpen(false);
            setEditorSolution(null);
          }}
          onSave={saveSolution}
        />
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Solutions Manager
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {allSolutions.length > 0
                ? `${allSolutions.length} solution page${allSolutions.length !== 1 ? "s" : ""} total`
                : "No solution pages yet — create your first one."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => solutionsQuery.refetch().catch(() => undefined)}
              disabled={solutionsQuery.isRefetching}
              aria-label="Refresh"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              <FiRefreshCw
                className={`h-3.5 w-3.5 ${solutionsQuery.isRefetching ? "animate-spin" : ""}`}
              />
              {solutionsQuery.isRefetching ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditorSolution(null);
                setEditorOpen(true);
              }}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              + New Solution
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
          {solutionsQuery.isLoading ? (
            <div className="flex items-center justify-center py-20 text-slate-500">
              Loading solutions…
            </div>
          ) : pagedSolutions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-slate-500">No solution pages found.</p>
              <button
                type="button"
                onClick={() => {
                  setEditorSolution(null);
                  setEditorOpen(true);
                }}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Create First Solution
              </button>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5 hidden sm:table-cell">Slug</th>
                  <th className="px-5 py-3.5 hidden md:table-cell">Sections</th>
                  <th className="px-5 py-3.5 hidden lg:table-cell">Status</th>
                  <th className="px-5 py-3.5 hidden lg:table-cell">Updated</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pagedSolutions.map((solution) => (
                  <tr
                    key={solution.id}
                    className="group transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white line-clamp-1">
                        {solution.title}
                      </p>
                      {solution.description && (
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                          {solution.description}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <code className="rounded bg-slate-800/70 px-1.5 py-0.5 font-mono text-xs text-slate-400">
                          /solutions/{solution.slug}
                        </code>
                        <a
                          href={`/solutions/${solution.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Open solution page"
                        >
                          <FiExternalLink className="h-3 w-3 text-slate-500 hover:text-indigo-400" />
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-slate-400">
                        {Array.isArray(solution.content)
                          ? (solution.content as unknown[]).length
                          : 0}{" "}
                        section
                        {Array.isArray(solution.content) &&
                        (solution.content as unknown[]).length !== 1
                          ? "s"
                          : ""}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <StatusBadge published={solution.isPublished} />
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-slate-500">
                      {formatDate(solution.updatedAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditorSolution(solution);
                            setEditorOpen(true);
                          }}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === solution.id}
                          onClick={() => removeSolution(solution)}
                          className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                        >
                          {deletingId === solution.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!solutionsQuery.isLoading && allSolutions.length > PAGE_SIZE && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, allSolutions.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-300">
                {allSolutions.length}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="px-2 text-xs text-slate-500">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

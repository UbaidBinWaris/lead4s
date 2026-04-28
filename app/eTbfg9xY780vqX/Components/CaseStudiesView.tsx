"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiExternalLink, FiRefreshCw } from "react-icons/fi";
import {
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudies,
  updateCaseStudy,
} from "@/lib/api";
import type { CaseStudy, CaseStudyInput, CaseStudyResult } from "@/types/case-study";
import { CaseStudyEditorModal } from "./CaseStudyEditorModal";

const PAGE_SIZE = 10;

function StatusBadge({ published }: { readonly published: boolean }) {
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CaseStudiesView() {
  const queryClient = useQueryClient();
  const [editorCaseStudy, setEditorCaseStudy] = useState<CaseStudy | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const caseStudiesQuery = useQuery({
    queryKey: ["case-studies"],
    queryFn: getCaseStudies,
  });

  const allCaseStudies = caseStudiesQuery.data ?? [];
  const totalPages = Math.max(1, Math.ceil(allCaseStudies.length / PAGE_SIZE));
  const pagedCaseStudies = allCaseStudies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createMutation = useMutation({
    mutationFn: (payload: CaseStudyInput) => createCaseStudy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorCaseStudy(null);
      setPage(1);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CaseStudyInput }) =>
      updateCaseStudy(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["case-studies"] });
      const previous = queryClient.getQueryData<CaseStudy[]>(["case-studies"]);
      if (previous) {
        queryClient.setQueryData<CaseStudy[]>(
          ["case-studies"],
          previous.map((cs) => (cs.id === id ? { ...cs, ...payload } : cs))
        );
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["case-studies"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorCaseStudy(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCaseStudy(id),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["case-studies"] });
      const previous = queryClient.getQueryData<CaseStudy[]>(["case-studies"]);
      if (previous) {
        queryClient.setQueryData<CaseStudy[]>(
          ["case-studies"],
          previous.filter((cs) => cs.id !== id)
        );

        const newMaxPage = Math.max(1, Math.ceil((previous.length - 1) / PAGE_SIZE));
        if (page > newMaxPage) setPage(newMaxPage);
      }
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["case-studies"], context.previous);
      }
    },
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["case-studies"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;
  let caseStudyCountLabel = "No case studies yet. Create your first success story.";
  if (allCaseStudies.length > 0) {
    const noun = allCaseStudies.length === 1 ? "case study" : "case studies";
    caseStudyCountLabel = `${allCaseStudies.length} ${noun} total`;
  }

  function handleSave(payload: CaseStudyInput, id?: string) {
    if (id) {
      updateMutation.mutate({ id, payload });
      return;
    }
    createMutation.mutate(payload);
  }

  function handleDelete(caseStudy: CaseStudy) {
    if (!globalThis.confirm(`Delete "${caseStudy.title}"?`)) return;
    deleteMutation.mutate(caseStudy.id);
  }

  let tableContent: ReactNode;

  if (caseStudiesQuery.isLoading) {
    tableContent = (
      <div className="flex items-center justify-center py-20 text-slate-500">Loading case studies...</div>
    );
  } else if (pagedCaseStudies.length === 0) {
    tableContent = (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-slate-500">No case studies found.</p>
        <button
          type="button"
          onClick={() => {
            setEditorCaseStudy(null);
            setEditorOpen(true);
          }}
          className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Create First Case Study
        </button>
      </div>
    );
  } else {
    tableContent = (
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-5 py-3.5">Title</th>
            <th className="hidden px-5 py-3.5 sm:table-cell">Slug</th>
            <th className="hidden px-5 py-3.5 md:table-cell">Industry</th>
            <th className="hidden px-5 py-3.5 lg:table-cell">Top Result</th>
            <th className="hidden px-5 py-3.5 lg:table-cell">Status</th>
            <th className="hidden px-5 py-3.5 lg:table-cell">Updated</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {pagedCaseStudies.map((caseStudy) => {
            const topResult = caseStudy.results[0] as CaseStudyResult | undefined;

            return (
              <tr key={caseStudy.id} className="group transition-colors hover:bg-slate-800/30">
                <td className="px-5 py-4">
                  <p className="line-clamp-1 font-medium text-white">{caseStudy.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{caseStudy.summary}</p>
                </td>
                <td className="hidden px-5 py-4 sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    <code className="rounded bg-slate-800/70 px-1.5 py-0.5 font-mono text-xs text-slate-400">
                      /case-studies/{caseStudy.slug}
                    </code>
                    <a
                      href={`/case-studies/${caseStudy.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Open case study page"
                    >
                      <FiExternalLink className="h-3 w-3 text-slate-500 hover:text-violet-400" />
                    </a>
                  </div>
                </td>
                <td className="hidden px-5 py-4 text-slate-400 md:table-cell">{caseStudy.industry}</td>
                <td className="hidden px-5 py-4 lg:table-cell">
                  {topResult ? (
                    <span className="text-xs text-slate-300">
                      <span className="font-semibold text-violet-300">{topResult.value}</span> {topResult.label}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-600">No metrics</span>
                  )}
                </td>
                <td className="hidden px-5 py-4 lg:table-cell">
                  <StatusBadge published={caseStudy.isPublished} />
                </td>
                <td className="hidden px-5 py-4 text-slate-500 lg:table-cell">{formatDate(caseStudy.updatedAt)}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditorCaseStudy(caseStudy);
                        setEditorOpen(true);
                      }}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === caseStudy.id}
                      onClick={() => handleDelete(caseStudy)}
                      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                    >
                      {deletingId === caseStudy.id ? "..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      {editorOpen && (
        <CaseStudyEditorModal
          initialCaseStudy={editorCaseStudy}
          isSaving={isSaving}
          onCancel={() => {
            setEditorOpen(false);
            setEditorCaseStudy(null);
          }}
          onSave={handleSave}
        />
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Case Studies Manager</h1>
            <p className="mt-1 text-sm text-slate-400">
              {caseStudyCountLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => caseStudiesQuery.refetch().catch(() => undefined)}
              disabled={caseStudiesQuery.isRefetching}
              aria-label="Refresh"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              <FiRefreshCw className={`h-3.5 w-3.5 ${caseStudiesQuery.isRefetching ? "animate-spin" : ""}`} />
              {caseStudiesQuery.isRefetching ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditorCaseStudy(null);
                setEditorOpen(true);
              }}
              className="inline-flex min-h-11 items-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
            >
              + New Case Study
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
          {tableContent}
        </div>

        {!caseStudiesQuery.isLoading && allCaseStudies.length > PAGE_SIZE && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-slate-300">{(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, allCaseStudies.length)}</span> of{" "}
              <span className="font-medium text-slate-300">{allCaseStudies.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="inline-flex min-h-9 items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="inline-flex min-h-9 items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

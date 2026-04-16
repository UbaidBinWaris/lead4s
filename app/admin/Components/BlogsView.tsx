"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogEditorModal } from "@/app/admin/Components/BlogEditorModal";
import { BlogTable } from "@/app/admin/Components/BlogTable";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "@/lib/api";
import type { Blog, BlogInput } from "@/types/blog";
import { FiRefreshCw } from "react-icons/fi";

const PAGE_SIZE = 10;

export function BlogsView() {
  const queryClient = useQueryClient();
  const [editorBlog, setEditorBlog] = useState<Blog | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const blogsQuery = useQuery({ queryKey: ["blogs"], queryFn: getBlogs });

  const allBlogs = blogsQuery.data ?? [];
  const totalPages = Math.max(1, Math.ceil(allBlogs.length / PAGE_SIZE));
  const pagedBlogs = allBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createMutation = useMutation({
    mutationFn: (payload: BlogInput) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorBlog(null);
      setPage(1);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BlogInput }) => updateBlog(id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ["blogs"] });
      const prev = queryClient.getQueryData<Blog[]>(["blogs"]);
      if (prev) queryClient.setQueryData<Blog[]>(["blogs"], prev.map((b) => (b.id === id ? { ...b, ...payload } : b)));
      return { prev };
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) queryClient.setQueryData(["blogs"], ctx.prev); },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] }).catch(() => undefined);
      setEditorOpen(false);
      setEditorBlog(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onMutate: async (id) => {
      setDeletingId(id);
      await queryClient.cancelQueries({ queryKey: ["blogs"] });
      const prev = queryClient.getQueryData<Blog[]>(["blogs"]);
      if (prev) {
        queryClient.setQueryData<Blog[]>(["blogs"], prev.filter((b) => b.id !== id));
        const newMax = Math.max(1, Math.ceil((prev.length - 1) / PAGE_SIZE));
        if (page > newMax) setPage(newMax);
      }
      return { prev };
    },
    onError: (_e, _id, ctx) => { if (ctx?.prev) queryClient.setQueryData(["blogs"], ctx.prev); },
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["blogs"] }).catch(() => undefined);
      queryClient.invalidateQueries({ queryKey: ["stats"] }).catch(() => undefined);
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function saveBlog(payload: BlogInput, id?: string) {
    if (id) { updateMutation.mutate({ id, payload }); return; }
    createMutation.mutate(payload);
  }

  function removeBlog(blog: Blog) {
    if (!globalThis.confirm(`Delete "${blog.title}"?`)) return;
    deleteMutation.mutate(blog.id);
  }

  return (
    <>
      {/* Modal */}
      {editorOpen && (
        <BlogEditorModal
          initialBlog={editorBlog}
          isSaving={isSaving}
          onCancel={() => { setEditorOpen(false); setEditorBlog(null); }}
          onSave={saveBlog}
        />
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] p-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Blog Management</h1>
            <p className="mt-1 text-sm text-slate-400">
              {allBlogs.length > 0
                ? `${allBlogs.length} post${allBlogs.length !== 1 ? "s" : ""} total`
                : "No posts yet — create your first one."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => blogsQuery.refetch().catch(() => undefined)}
              disabled={blogsQuery.isRefetching}
              aria-label="Refresh"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              <FiRefreshCw className={`h-3.5 w-3.5 ${blogsQuery.isRefetching ? "animate-spin" : ""}`} />
              {blogsQuery.isRefetching ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={() => { setEditorBlog(null); setEditorOpen(true); }}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              + New Post
            </button>
          </div>
        </div>

        {/* Table */}
        <BlogTable
          blogs={pagedBlogs}
          isLoading={blogsQuery.isLoading}
          deletingId={deletingId}
          onEdit={(blog) => { setEditorBlog(blog); setEditorOpen(true); }}
          onDelete={removeBlog}
        />

        {/* Pagination */}
        {!blogsQuery.isLoading && allBlogs.length > PAGE_SIZE && (
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allBlogs.length)}
              </span>{" "}
              of <span className="font-medium text-slate-300">{allBlogs.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                ← Prev
              </button>
              <span className="px-2 text-xs text-slate-500">{page} / {totalPages}</span>
              <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
                className="inline-flex min-h-[36px] items-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { FiEdit2, FiLoader, FiTrash2 } from "react-icons/fi";
import { formatDate } from "@/lib/blog";
import type { Blog } from "@/types/blog";

type BlogTableProps = {
  readonly blogs: readonly Blog[];
  readonly isLoading: boolean;
  readonly deletingId: string | null;
  readonly onEdit: (blog: Blog) => void;
  readonly onDelete: (blog: Blog) => void;
};

export function BlogTable({ blogs, isLoading, deletingId, onEdit, onDelete }: BlogTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-0 divide-y divide-slate-800 rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="h-3 w-2/5 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-slate-800" />
            <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)] py-16 text-center">
        <div className="rounded-full bg-slate-800 p-4">
          <FiEdit2 className="h-6 w-6 text-slate-500" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-300">No posts on this page</p>
        <p className="mt-1 text-xs text-slate-500">Create your first blog post using the button above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-800 text-left">
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Slug</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Author</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Created</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-b border-slate-800/50 transition-colors hover:bg-slate-900/30">
              <td className="px-5 py-3.5">
                <p className="text-sm font-medium text-white">{blog.title}</p>
              </td>
              <td className="px-5 py-3.5">
                <span className="font-mono text-xs text-slate-500">/{blog.slug}</span>
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-400">{blog.author}</td>
              <td className="px-5 py-3.5 text-sm text-slate-500">
                {formatDate(new Date(blog.createdAt))}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEdit(blog)}
                    aria-label={`Edit "${blog.title}"`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                  >
                    <FiEdit2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === blog.id}
                    onClick={() => onDelete(blog)}
                    aria-label={`Delete "${blog.title}"`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                  >
                    {deletingId === blog.id ? (
                      <FiLoader className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FiTrash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/slugify";
import { ImageUploader } from "@/app/admin/Components/ImageUploader";
import type { Blog, BlogInput } from "@/types/blog";

type BlogEditorProps = {
  readonly initialBlog?: Blog | null;
  readonly isSaving: boolean;
  readonly onCancel: () => void;
  readonly onSave: (payload: BlogInput, id?: string) => void;
};

export function BlogEditor({
  initialBlog,
  isSaving,
  onCancel,
  onSave,
}: BlogEditorProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSlugDirty, setIsSlugDirty] = useState(false);

  useEffect(() => {
    if (!initialBlog) {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImage(null);
      setIsSlugDirty(false);
      setIsPreview(false);
      return;
    }

    setTitle(initialBlog.title);
    setSlug(initialBlog.slug);
    setExcerpt(initialBlog.excerpt);
    setContent(initialBlog.content);
    setCoverImage(initialBlog.coverImage);
    setIsSlugDirty(true);
    setIsPreview(false);
  }, [initialBlog]);

  const isEditing = Boolean(initialBlog?.id);
  let saveButtonLabel = "Create Blog";
  if (isSaving) {
    saveButtonLabel = "Saving...";
  } else if (isEditing) {
    saveButtonLabel = "Update Blog";
  }

  const canSave = useMemo(() => {
    return Boolean(title.trim() && slug.trim() && excerpt.trim() && content.trim());
  }, [title, slug, excerpt, content]);

  function onTitleChange(nextTitle: string) {
    setTitle(nextTitle);
    if (!isSlugDirty) {
      setSlug(slugify(nextTitle));
    }
  }

  function onInsertSnippet(snippet: string) {
    setContent((prev) => `${prev}${prev ? "\n" : ""}${snippet}`);
    setIsPreview(false);
  }

  function onInsertImage(url: string) {
    onInsertSnippet(`![Image](${url})`);
  }

  function submitForm(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSave) {
      return;
    }

    onSave(
      {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage,
        author: "Admin",
      },
      initialBlog?.id
    );
  }

  return (
    <form onSubmit={submitForm} className="space-y-5">
      <div className="grid gap-4 rounded-xl border border-slate-800 bg-surface-900/70 p-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="blog-title" className="block text-sm font-medium text-white">
            Title
          </label>
          <input
            id="blog-title"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-surface-925 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            placeholder="How to build better growth systems"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="blog-slug" className="block text-sm font-medium text-white">
            Slug
          </label>
          <input
            id="blog-slug"
            value={slug}
            onChange={(event) => {
              setIsSlugDirty(true);
              setSlug(slugify(event.target.value));
            }}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-surface-925 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            placeholder="how-to-build-better-growth-systems"
          />
          <p className="mt-1 text-xs text-slate-400">Uniqueness is validated by your backend API.</p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="blog-excerpt" className="block text-sm font-medium text-white">
            Excerpt
          </label>
          <textarea
            id="blog-excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-surface-925 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            placeholder="Short summary shown in blog listings"
          />
        </div>

        <div className="md:col-span-2">
          <ImageUploader value={coverImage} onChange={setCoverImage} onUploaded={onInsertImage} />
        </div>
      </div>

      <section className="rounded-xl border border-slate-800 bg-surface-900/70 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`rounded-lg px-3 py-2 text-xs font-medium ${
              isPreview ? "border border-slate-700 text-slate-300" : "bg-brand-600 text-white"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`rounded-lg px-3 py-2 text-xs font-medium ${
              isPreview ? "bg-brand-600 text-white" : "border border-slate-700 text-slate-300"
            }`}
          >
            Preview
          </button>

          <div className="mx-1 h-5 w-px bg-slate-700" />

          <button
            type="button"
            onClick={() => onInsertSnippet("## Heading")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => onInsertSnippet("**bold text**")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => onInsertSnippet("*italic text*")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => onInsertSnippet("- Bullet item")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            Bullet
          </button>
          <button
            type="button"
            onClick={() => onInsertSnippet("[Link text](https://example.com)")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => onInsertSnippet("![Image](https://example.com/image.jpg)")}
            className="rounded-lg border border-slate-700 px-2 py-1.5 text-xs text-slate-300"
          >
            Image
          </button>
        </div>

        {isPreview ? (
          <div className="prose prose-invert max-w-none rounded-lg border border-slate-800 bg-surface-925 p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "*No content yet*"}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={16}
            className="w-full rounded-lg border border-slate-700 bg-surface-925 px-3 py-2 font-mono text-sm text-slate-100 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
            placeholder="Write markdown content..."
          />
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={!canSave || isSaving}
          className="inline-flex min-h-11 items-center rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {saveButtonLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-surface-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

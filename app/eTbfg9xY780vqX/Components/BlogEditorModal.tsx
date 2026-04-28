"use client";

import { type SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FiAlignLeft,
  FiBold,
  FiCalendar,
  FiClock,
  FiCopy,
  FiExternalLink,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiSave,
  FiType,
  FiUser,
  FiX,
} from "react-icons/fi";
import { slugify } from "@/lib/slugify";
import { formatDate } from "@/lib/blog";
import { ImageUploader } from "@/app/admin/Components/ImageUploader";
import type { Blog, BlogInput } from "@/types/blog";

type Props = {
  readonly initialBlog?: Blog | null;
  readonly isSaving: boolean;
  readonly onCancel: () => void;
  readonly onSave: (payload: BlogInput, id?: string) => void;
};

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function wordCount(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function charCount(content: string): number {
  return content.length;
}

function CopiedToast({ show }: { show: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-700 px-2 py-1 text-xs text-white transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      Copied!
    </span>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-2.5 py-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-600">{label}</p>
        <p className="mt-0.5 text-sm text-slate-300">{value}</p>
      </div>
    </div>
  );
}

function ToolbarBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
    >
      {children}
    </button>
  );
}

export function BlogEditorModal({ initialBlog, isSaving, onCancel, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [slugDirty, setSlugDirty] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEditing = Boolean(initialBlog?.id);

  useEffect(() => {
    if (!initialBlog) {
      setTitle(""); setSlug(""); setExcerpt(""); setContent("");
      setAuthor("Admin"); setCoverImage(null);
      setSlugDirty(false); setIsPreview(false);
      return;
    }
    setTitle(initialBlog.title);
    setSlug(initialBlog.slug);
    setExcerpt(initialBlog.excerpt);
    setContent(initialBlog.content);
    setAuthor(initialBlog.author);
    setCoverImage(initialBlog.coverImage);
    setSlugDirty(true); setIsPreview(false);
  }, [initialBlog]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canSave = useMemo(
    () => Boolean(title.trim() && slug.trim() && excerpt.trim() && content.trim() && author.trim()),
    [title, slug, excerpt, content, author]
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugDirty) setSlug(slugify(val));
  }

  function insertSnippet(snippet: string) {
    const ta = textareaRef.current;
    if (!ta) {
      setContent((p) => `${p}${p ? "\n" : ""}${snippet}`);
      setIsPreview(false);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const next = content.slice(0, start) + snippet + content.slice(end);
    setContent(next);
    setIsPreview(false);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + snippet.length, start + snippet.length);
    });
  }

  function copySlug() {
    void navigator.clipboard.writeText(`/blog/${slug}`);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 1500);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSave) return;
    onSave(
      { title: title.trim(), slug: slug.trim(), excerpt: excerpt.trim(),
        content: content.trim(), coverImage, author: author.trim() },
      initialBlog?.id
    );
  }

  const wc = wordCount(content);
  const cc = charCount(content);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[hsl(0,0%,4%)]"
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "Edit blog post" : "New blog post"}
    >
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-[hsl(0,0%,5%)] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close editor"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <FiX className="h-4.5 w-4.5" />
          </button>
          <div className="h-4 w-px bg-slate-700" />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {isEditing ? "Editing post" : "New post"}
            </p>
            <p className="text-sm font-semibold text-white line-clamp-1">
              {title || "Untitled"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            Discard
          </button>
          <button
            type="button"
            form="blog-editor-form"
            disabled={!canSave || isSaving}
            onClick={(e) => {
              const form = document.getElementById("blog-editor-form") as HTMLFormElement | null;
              form?.requestSubmit();
              e.preventDefault();
            }}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSave className="h-3.5 w-3.5" />
            {isSaving ? "Saving…" : isEditing ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Left: editor */}
        <form
          id="blog-editor-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="be-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Title
              </label>
              <input
                id="be-title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="How to build better growth systems"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-lg font-semibold text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="be-slug" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                URL Slug
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-600">
                  /blog/
                </span>
                <input
                  id="be-slug"
                  value={slug}
                  onChange={(e) => { setSlugDirty(true); setSlug(slugify(e.target.value)); }}
                  className="w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] py-2.5 pl-14 pr-4 text-sm text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
                  placeholder="how-to-build-better-growth-systems"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="be-excerpt" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Excerpt
              </label>
              <textarea
                id="be-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Short summary shown in blog listings and search results…"
                className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
              />
            </div>

            {/* Cover image */}
            <div className="rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] p-4">
              <ImageUploader
                value={coverImage}
                onChange={setCoverImage}
                onUploaded={(url) => insertSnippet(`![Image](${url})`)}
              />
            </div>

            {/* Content editor */}
            <div className="rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)]">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-800 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setIsPreview(false)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    !isPreview ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreview(true)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    isPreview ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Preview
                </button>

                <div className="mx-2 h-4 w-px bg-slate-700" />

                <ToolbarBtn label="Heading 2" onClick={() => insertSnippet("\n## Heading\n")}>
                  <FiType className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Bold" onClick={() => insertSnippet("**bold text**")}>
                  <FiBold className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Italic" onClick={() => insertSnippet("*italic text*")}>
                  <FiItalic className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Bullet list" onClick={() => insertSnippet("\n- Item one\n- Item two\n")}>
                  <FiList className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Link" onClick={() => insertSnippet("[Link text](https://example.com)")}>
                  <FiLink className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Image" onClick={() => insertSnippet("![Alt text](https://example.com/image.jpg)")}>
                  <FiImage className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Paragraph" onClick={() => insertSnippet("\n\nNew paragraph here.\n")}>
                  <FiAlignLeft className="h-3.5 w-3.5" />
                </ToolbarBtn>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-slate-600">{wc} words</span>
                </div>
              </div>

              {/* Editor / Preview */}
              {isPreview ? (
                <div className="prose prose-invert prose-sm max-w-none p-5 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || "*Nothing to preview yet…*"}
                  </ReactMarkdown>
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={22}
                  placeholder="Write your content in Markdown…"
                  className="w-full resize-none rounded-b-lg bg-transparent px-5 py-4 font-mono text-sm leading-relaxed text-slate-100 placeholder-slate-700 focus-visible:outline-none"
                />
              )}
            </div>
          </div>
        </form>

        {/* Right: metadata panel */}
        <aside className="hidden w-[280px] shrink-0 overflow-y-auto border-l border-slate-800 bg-[hsl(0,0%,5%)] lg:block">
          <div className="p-5 space-y-6">

            {/* Author */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Author
              </p>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] py-2 pl-9 pr-3 text-sm text-white transition-colors focus-visible:border-blue-500 focus-visible:outline-none"
                  placeholder="Admin"
                />
              </div>
            </div>

            {/* Reading stats */}
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Content Stats
              </p>
              <div className="divide-y divide-slate-800/60 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)]">
                <MetaRow icon={FiClock} label="Read time" value={readTime(content)} />
                <MetaRow icon={FiAlignLeft} label="Words" value={wc.toLocaleString()} />
                <MetaRow icon={FiType} label="Characters" value={cc.toLocaleString()} />
              </div>
            </div>

            {/* URL */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                URL Preview
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] px-3 py-2.5">
                <span className="flex-1 truncate font-mono text-xs text-slate-400">
                  /blog/{slug || "…"}
                </span>
                <div className="relative flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Copy URL"
                    onClick={copySlug}
                    className="rounded-md p-1 text-slate-500 hover:text-slate-300"
                  >
                    <FiCopy className="h-3.5 w-3.5" />
                  </button>
                  {isEditing && (
                    <a
                      href={`/blog/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open post"
                      className="rounded-md p-1 text-slate-500 hover:text-slate-300"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <CopiedToast show={copiedSlug} />
                </div>
              </div>
            </div>

            {/* Cover image preview */}
            {coverImage && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Cover Image
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full rounded-lg border border-slate-800 object-cover"
                  style={{ maxHeight: 140 }}
                />
              </div>
            )}

            {/* Timestamps (only when editing) */}
            {isEditing && initialBlog && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Timestamps
                </p>
                <div className="divide-y divide-slate-800/60 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)]">
                  <MetaRow
                    icon={FiCalendar}
                    label="Created"
                    value={formatDate(new Date(initialBlog.createdAt))}
                  />
                  <MetaRow
                    icon={FiCalendar}
                    label="Last modified"
                    value={formatDate(new Date(initialBlog.updatedAt))}
                  />
                </div>
              </div>
            )}

            {/* Save action repeated at bottom of panel */}
            <button
              type="button"
              disabled={!canSave || isSaving}
              onClick={() => {
                const form = document.getElementById("blog-editor-form") as HTMLFormElement | null;
                form?.requestSubmit();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave className="h-3.5 w-3.5" />
              {isSaving ? "Saving…" : isEditing ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

"use client";

import {
  type DragEvent,
  type SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FiCopy,
  FiExternalLink,
  FiMinus,
  FiMove,
  FiPlus,
  FiSave,
  FiX,
} from "react-icons/fi";
import { slugify } from "@/lib/slugify";
import { ImageUploader } from "@/app/admin/Components/ImageUploader";
import type { CaseStudy, CaseStudyInput, CaseStudyResult } from "@/types/case-study";
import type {
  CTASection,
  FeaturesSection,
  FeatureItem,
  ImageSection,
  IndustrySection,
  TextSection,
} from "@/types/industry";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SectionType = IndustrySection["type"];

type Props = {
  readonly initialCaseStudy?: CaseStudy | null;
  readonly isSaving: boolean;
  readonly onCancel: () => void;
  readonly onSave: (payload: CaseStudyInput, id?: string) => void;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function defaultSection(type: SectionType): IndustrySection {
  switch (type) {
    case "text":
      return { type: "text", title: "New Section", content: "" };
    case "features":
      return {
        type: "features",
        title: "Key Highlights",
        items: [{ title: "Item 1", description: "Description here.", icon: "check" }],
      };
    case "image":
      return { type: "image", src: "", alt: "", caption: "" };
    case "cta":
      return {
        type: "cta",
        heading: "Work With Us",
        subheading: "Ready to achieve similar results?",
        buttonLabel: "Get Started",
        buttonHref: "/#contact",
      };
  }
}

// ---------------------------------------------------------------------------
// Results builder
// ---------------------------------------------------------------------------
function ResultsBuilder({
  results,
  onChange,
}: {
  results: CaseStudyResult[];
  onChange: (r: CaseStudyResult[]) => void;
}) {
  return (
    <div className="space-y-2">
      {results.map((r, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: positional
        <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
          <div className="flex flex-1 gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-medium text-slate-500">Value</label>
              <input
                value={r.value}
                onChange={(e) => {
                  const next = [...results];
                  next[i] = { ...r, value: e.target.value };
                  onChange(next);
                }}
                placeholder="3,200+"
                className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm font-bold text-white focus-visible:border-violet-500 focus-visible:outline-none"
              />
            </div>
            <div className="flex-[2]">
              <label className="mb-1 block text-[10px] font-medium text-slate-500">Label</label>
              <input
                value={r.label}
                onChange={(e) => {
                  const next = [...results];
                  next[i] = { ...r, label: e.target.value };
                  onChange(next);
                }}
                placeholder="Leads Generated"
                className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(results.filter((_, idx) => idx !== i))}
            aria-label={`Remove result ${i + 1}`}
            className="mt-5 rounded p-1 text-slate-600 hover:text-red-400"
          >
            <FiMinus className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...results, { label: "", value: "" }])}
        className="flex w-full items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 transition-colors hover:border-violet-500/50 hover:text-violet-400"
      >
        <FiPlus className="h-3 w-3" /> Add Metric
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section sub-editors (reused from industry pattern)
// ---------------------------------------------------------------------------
function TextSectionEditor({ section, onChange }: { section: TextSection; onChange: (s: TextSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Title</label>
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none"
          placeholder="Section heading"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Content</label>
        <textarea
          rows={6}
          value={section.content}
          onChange={(e) => onChange({ ...section, content: e.target.value })}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none"
          placeholder="Write your content here…"
        />
      </div>
    </div>
  );
}

function FeaturesSectionEditor({ section, onChange }: { section: FeaturesSection; onChange: (s: FeaturesSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Section Title</label>
        <input
          value={section.title ?? ""}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none"
        />
      </div>
      <div className="space-y-2">
        {section.items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional
          <div key={i} className="relative rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
            <button
              type="button"
              onClick={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })}
              className="absolute right-2 top-2 rounded p-0.5 text-slate-600 hover:text-red-400"
            >
              <FiMinus className="h-3.5 w-3.5" />
            </button>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-[10px] font-medium text-slate-500">Icon</label>
                <input value={item.icon ?? ""} onChange={(e) => { const items = [...section.items]; items[i] = { ...item, icon: e.target.value }; onChange({ ...section, items }); }} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-violet-500 focus-visible:outline-none" placeholder="check" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] font-medium text-slate-500">Title</label>
                <input value={item.title} onChange={(e) => { const items = [...section.items]; items[i] = { ...item, title: e.target.value }; onChange({ ...section, items }); }} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-violet-500 focus-visible:outline-none" />
              </div>
              <div className="sm:col-span-3">
                <label className="mb-1 block text-[10px] font-medium text-slate-500">Description</label>
                <textarea rows={2} value={item.description} onChange={(e) => { const items = [...section.items]; items[i] = { ...item, description: e.target.value }; onChange({ ...section, items }); }} className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-violet-500 focus-visible:outline-none" />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onChange({ ...section, items: [...section.items, { title: "", description: "", icon: "check" } as FeatureItem] })} className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 hover:border-violet-500/50 hover:text-violet-400">
          <FiPlus className="h-3 w-3" /> Add Item
        </button>
      </div>
    </div>
  );
}

function CTASectionEditor({ section, onChange }: { section: CTASection; onChange: (s: CTASection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Heading</label>
        <input value={section.heading} onChange={(e) => onChange({ ...section, heading: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Subheading</label>
        <textarea rows={2} value={section.subheading ?? ""} onChange={(e) => onChange({ ...section, subheading: e.target.value })} className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Button Label</label>
          <input value={section.buttonLabel} onChange={(e) => onChange({ ...section, buttonLabel: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Button Link</label>
          <input value={section.buttonHref} onChange={(e) => onChange({ ...section, buttonHref: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" placeholder="/#contact" />
        </div>
      </div>
    </div>
  );
}

function ImageSectionEditor({ section, onChange }: { section: ImageSection; onChange: (s: ImageSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Image URL</label>
        <input value={section.src} onChange={(e) => onChange({ ...section, src: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" placeholder="https://…" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Alt Text</label>
        <input value={section.alt ?? ""} onChange={(e) => onChange({ ...section, alt: e.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section card
// ---------------------------------------------------------------------------
const SECTION_LABELS: Record<SectionType, string> = {
  text: "Text Block",
  features: "Features Grid",
  image: "Image",
  cta: "Call to Action",
};

const SECTION_COLORS: Record<SectionType, string> = {
  text: "border-l-blue-500",
  features: "border-l-purple-500",
  image: "border-l-teal-500",
  cta: "border-l-orange-500",
};

function SectionCard({
  section, index, total, onChange, onRemove, onDragStart, onDragOver, onDrop,
}: {
  section: IndustrySection;
  index: number;
  total: number;
  onChange: (s: IndustrySection) => void;
  onRemove: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div draggable onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} className={`rounded-xl border-l-4 border border-slate-700/60 bg-[hsl(0,0%,7%)] ${SECTION_COLORS[section.type]}`}>
      <div className="flex items-center gap-2 px-4 py-3">
        <span title="Drag to reorder" className="cursor-grab text-slate-600 hover:text-slate-400 active:cursor-grabbing">
          <FiMove className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {index + 1} / {total} — {SECTION_LABELS[section.type]}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button type="button" onClick={() => setOpen((o) => !o)} className="rounded px-2 py-0.5 text-xs text-slate-500 hover:text-slate-300">
            {open ? "Collapse" : "Expand"}
          </button>
          <button type="button" onClick={onRemove} aria-label="Remove section" className="rounded p-1 text-slate-600 hover:text-red-400">
            <FiX className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-800 px-4 pb-4">
          {section.type === "text" && <TextSectionEditor section={section} onChange={(s) => onChange(s)} />}
          {section.type === "features" && <FeaturesSectionEditor section={section} onChange={(s) => onChange(s)} />}
          {section.type === "image" && <ImageSectionEditor section={section} onChange={(s) => onChange(s)} />}
          {section.type === "cta" && <CTASectionEditor section={section} onChange={(s) => onChange(s)} />}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------
export function CaseStudyEditorModal({ initialCaseStudy, isSaving, onCancel, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [industry, setIndustry] = useState("");
  const [summary, setSummary] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState<CaseStudyResult[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [sections, setSections] = useState<IndustrySection[]>([]);
  const [slugDirty, setSlugDirty] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const dragIndexRef = useRef<number | null>(null);

  const isEditing = Boolean(initialCaseStudy?.id);

  useEffect(() => {
    if (!initialCaseStudy) {
      setTitle(""); setSlug(""); setIndustry(""); setSummary("");
      setChallenge(""); setSolution(""); setResults([]);
      setCoverImage(null); setIsPublished(true); setSections([]);
      setSlugDirty(false);
      return;
    }
    setTitle(initialCaseStudy.title);
    setSlug(initialCaseStudy.slug);
    setIndustry(initialCaseStudy.industry);
    setSummary(initialCaseStudy.summary);
    setChallenge(initialCaseStudy.challenge);
    setSolution(initialCaseStudy.solution);
    setResults(initialCaseStudy.results);
    setCoverImage(initialCaseStudy.coverImage);
    setIsPublished(initialCaseStudy.isPublished);
    setSections(initialCaseStudy.content);
    setSlugDirty(true);
  }, [initialCaseStudy]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
        setAddMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const canSave = useMemo(
    () => Boolean(title.trim() && slug.trim() && industry.trim() && summary.trim() && challenge.trim() && solution.trim()),
    [title, slug, industry, summary, challenge, solution]
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugDirty) setSlug(slugify(val));
  }

  function addSection(type: SectionType) {
    setSections((prev) => [...prev, defaultSection(type)]);
    setAddMenuOpen(false);
  }

  function handleDragStart(index: number) { dragIndexRef.current = index; }
  function handleDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }
  function handleDrop(targetIndex: number) {
    const from = dragIndexRef.current;
    if (from === null || from === targetIndex) return;
    setSections((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    dragIndexRef.current = null;
  }

  function copySlug() {
    void navigator.clipboard.writeText(`/case-studies/${slug}`);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 1500);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSave) return;
    onSave(
      {
        title: title.trim(),
        slug: slug.trim(),
        industry: industry.trim(),
        summary: summary.trim(),
        challenge: challenge.trim(),
        solution: solution.trim(),
        results,
        content: sections,
        coverImage,
        isPublished,
      },
      initialCaseStudy?.id
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[hsl(0,0%,4%)]" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit case study" : "New case study"}>
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-[hsl(0,0%,5%)] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onCancel} aria-label="Close editor" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
            <FiX className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-slate-700" />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              {isEditing ? "Editing case study" : "New case study"}
            </p>
            <p className="text-sm font-semibold text-white line-clamp-1">{title || "Untitled"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-800">
            Discard
          </button>
          <button
            type="button"
            disabled={!canSave || isSaving}
            onClick={() => { (document.getElementById("cs-editor-form") as HTMLFormElement | null)?.requestSubmit(); }}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSave className="h-3.5 w-3.5" />
            {isSaving ? "Saving…" : isEditing ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Main form */}
        <form id="cs-editor-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="cs-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Title
              </label>
              <input id="cs-title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Solar Lead Campaign Success Story" className="mt-2 w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-lg font-semibold text-white placeholder-slate-600 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="cs-slug" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                URL Slug
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-600">/case-studies/</span>
                <input id="cs-slug" value={slug} onChange={(e) => { setSlugDirty(true); setSlug(slugify(e.target.value)); }} className="w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] py-2.5 pl-28 pr-4 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" placeholder="solar-campaign-success" />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="cs-industry" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Industry / Vertical
              </label>
              <input id="cs-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Solar Energy, Insurance, Legal…" className="mt-2 w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-2.5 text-sm text-white focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="cs-summary" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Summary <span className="text-slate-600">(hero subheading + meta description)</span>
              </label>
              <textarea id="cs-summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} placeholder="One paragraph overview of the campaign and outcomes…" className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-sm text-white placeholder-slate-600 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" />
            </div>

            {/* Results builder */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Results / Metrics
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">Displayed as large-number cards on the detail page.</p>
                </div>
              </div>
              <ResultsBuilder results={results} onChange={setResults} />
            </div>

            {/* Challenge */}
            <div>
              <label htmlFor="cs-challenge" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Challenge
              </label>
              <textarea id="cs-challenge" value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={4} placeholder="Describe the client's problem or pain point…" className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-sm text-white placeholder-slate-600 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" />
            </div>

            {/* Solution */}
            <div>
              <label htmlFor="cs-solution" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Solution
              </label>
              <textarea id="cs-solution" value={solution} onChange={(e) => setSolution(e.target.value)} rows={4} placeholder="Describe what Lead4s did to solve the challenge…" className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-sm text-white placeholder-slate-600 focus-visible:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20" />
            </div>

            {/* Cover image */}
            <div className="rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] p-4">
              <ImageUploader value={coverImage} onChange={setCoverImage} />
            </div>

            {/* Section builder */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Additional Sections <span className="text-slate-600">(optional)</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {sections.length === 0 ? "Add strategy details, process breakdowns, testimonials…" : `${sections.length} section${sections.length !== 1 ? "s" : ""} — drag to reorder`}
                  </p>
                </div>
                <div className="relative" ref={addMenuRef}>
                  <button type="button" onClick={() => setAddMenuOpen((o) => !o)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">
                    <FiPlus className="h-3.5 w-3.5" /> Add Section
                  </button>
                  {addMenuOpen && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-slate-700 bg-[hsl(0,0%,9%)] shadow-xl">
                      {(
                        [
                          ["text", "📝 Text Block"],
                          ["features", "✦ Features Grid"],
                          ["image", "🖼 Image"],
                          ["cta", "🚀 Call to Action"],
                        ] as [SectionType, string][]
                      ).map(([type, label]) => (
                        <button key={type} type="button" onClick={() => addSection(type)} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {sections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-10 text-center">
                    <p className="text-sm text-slate-600">No extra sections yet</p>
                    <button type="button" onClick={() => setAddMenuOpen(true)} className="mt-3 flex items-center gap-1.5 rounded-lg border border-violet-500/30 px-3 py-2 text-xs font-medium text-violet-400 hover:bg-violet-500/10">
                      <FiPlus className="h-3 w-3" /> Add a section
                    </button>
                  </div>
                ) : (
                  sections.map((section, i) => (
                    <SectionCard
                      // biome-ignore lint/suspicious/noArrayIndexKey: positional sections
                      key={i}
                      section={section}
                      index={i}
                      total={sections.length}
                      onChange={(updated) => setSections((prev) => prev.map((s, idx) => (idx === i ? updated : s)))}
                      onRemove={() => setSections((prev) => prev.filter((_, idx) => idx !== i))}
                      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; handleDragStart(i); }}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(i)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Sidebar */}
        <aside className="hidden w-[260px] shrink-0 overflow-y-auto border-l border-slate-800 bg-[hsl(0,0%,5%)] lg:block">
          <div className="space-y-6 p-5">
            {/* Publish toggle */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Visibility</p>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-2.5">
                <span className="flex-1 text-sm text-slate-300">{isPublished ? "Published" : "Draft"}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isPublished}
                  onClick={() => setIsPublished((p) => !p)}
                  className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${isPublished ? "bg-violet-600" : "bg-slate-700"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${isPublished ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </label>
            </div>

            {/* URL preview */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">URL Preview</p>
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] px-3 py-2.5">
                <span className="flex-1 truncate font-mono text-xs text-slate-400">
                  /case-studies/{slug || "…"}
                </span>
                <div className="relative flex items-center gap-1">
                  <button type="button" aria-label="Copy URL" onClick={copySlug} className="rounded-md p-1 text-slate-500 hover:text-slate-300">
                    <FiCopy className="h-3.5 w-3.5" />
                  </button>
                  {isEditing && slug && (
                    <a href={`/case-studies/${slug}`} target="_blank" rel="noopener noreferrer" aria-label="Open page" className="rounded-md p-1 text-slate-500 hover:text-slate-300">
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {copiedSlug && (
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-700 px-2 py-1 text-xs text-white">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Results summary */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Metrics ({results.length})</p>
              {results.length === 0 ? (
                <p className="text-xs text-slate-600">No metrics added yet.</p>
              ) : (
                <ol className="space-y-1">
                  {results.map((r, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional
                    <li key={i} className="flex items-baseline gap-2 text-xs">
                      <span className="font-bold text-violet-400">{r.value || "—"}</span>
                      <span className="text-slate-500">{r.label || "…"}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Cover image preview */}
            {coverImage && (
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Cover Image</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="Cover preview" className="w-full rounded-lg border border-slate-800 object-cover" style={{ maxHeight: 120 }} />
              </div>
            )}

            {/* Timestamps */}
            {isEditing && initialCaseStudy && (
              <div className="space-y-1 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] px-4 py-3 text-xs text-slate-500">
                <p>Created: <span className="text-slate-400">{new Date(initialCaseStudy.createdAt).toLocaleDateString()}</span></p>
                <p>Updated: <span className="text-slate-400">{new Date(initialCaseStudy.updatedAt).toLocaleDateString()}</span></p>
              </div>
            )}

            {/* Save button */}
            <button
              type="button"
              disabled={!canSave || isSaving}
              onClick={() => { (document.getElementById("cs-editor-form") as HTMLFormElement | null)?.requestSubmit(); }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave className="h-3.5 w-3.5" />
              {isSaving ? "Saving…" : isEditing ? "Update" : "Publish"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

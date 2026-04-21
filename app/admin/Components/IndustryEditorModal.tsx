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
import type {
  CTASection,
  FeaturesSection,
  FeatureItem,
  FaqSection,
  FaqItem,
  HeroCtaSection,
  ImageSection,
  ImageTextSection,
  Industry,
  IndustryInput,
  IndustrySection,
  ProcessSection,
  ProcessStep,
  StatItem,
  StatsSection,
  TextSection,
} from "@/types/industry";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SectionType = IndustrySection["type"];

// ---------------------------------------------------------------------------
// Section-specific field editors (new types)
// ---------------------------------------------------------------------------

function HeroCtaSectionEditor({
  section,
  onChange,
}: {
  section: HeroCtaSection;
  onChange: (s: HeroCtaSection) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Primary Button Label</label>
          <input
            value={section.primaryLabel}
            onChange={(e) => onChange({ ...section, primaryLabel: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="Get Free Leads"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Primary Button Link</label>
          <input
            value={section.primaryHref}
            onChange={(e) => onChange({ ...section, primaryHref: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="/#contact"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Secondary Label <span className="text-slate-600">(optional)</span></label>
          <input
            value={section.secondaryLabel ?? ""}
            onChange={(e) => onChange({ ...section, secondaryLabel: e.target.value || undefined })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="Learn More"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Secondary Link <span className="text-slate-600">(optional)</span></label>
          <input
            value={section.secondaryHref ?? ""}
            onChange={(e) => onChange({ ...section, secondaryHref: e.target.value || undefined })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="/industries"
          />
        </div>
      </div>
    </div>
  );
}

function StatItemEditor({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: StatItem;
  index: number;
  onChange: (i: StatItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
      <button type="button" onClick={onRemove} aria-label={`Remove stat ${index + 1}`} className="absolute right-2 top-2 rounded p-0.5 text-slate-600 hover:text-red-400">
        <FiMinus className="h-3.5 w-3.5" />
      </button>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Value</label>
          <input value={item.value} onChange={(e) => onChange({ ...item, value: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="95%" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Label</label>
          <input value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Average ROI" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Description <span className="text-slate-600">(optional)</span></label>
          <input value={item.description ?? ""} onChange={(e) => onChange({ ...item, description: e.target.value || undefined })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Across all campaigns" />
        </div>
      </div>
    </div>
  );
}

function StatsSectionEditor({ section, onChange }: { section: StatsSection; onChange: (s: StatsSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Title <span className="text-slate-600">(optional)</span></label>
        <input value={section.title ?? ""} onChange={(e) => onChange({ ...section, title: e.target.value || undefined })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Proven Results" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400">Stats ({section.items.length})</p>
        {section.items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional
          <StatItemEditor key={i} item={item} index={i} onChange={(updated) => { const items = [...section.items]; items[i] = updated; onChange({ ...section, items }); }} onRemove={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })} />
        ))}
        <button type="button" onClick={() => onChange({ ...section, items: [...section.items, { value: "", label: "" }] })} className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 hover:border-blue-500/50 hover:text-blue-400">
          <FiPlus className="h-3 w-3" /> Add Stat
        </button>
      </div>
    </div>
  );
}

function FaqItemEditor({ item, index, onChange, onRemove }: { item: FaqItem; index: number; onChange: (i: FaqItem) => void; onRemove: () => void }) {
  return (
    <div className="relative rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
      <button type="button" onClick={onRemove} aria-label={`Remove FAQ ${index + 1}`} className="absolute right-2 top-2 rounded p-0.5 text-slate-600 hover:text-red-400">
        <FiMinus className="h-3.5 w-3.5" />
      </button>
      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Question</label>
          <input value={item.question} onChange={(e) => onChange({ ...item, question: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="How do your leads work?" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Answer</label>
          <textarea rows={3} value={item.answer} onChange={(e) => onChange({ ...item, answer: e.target.value })} className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Detailed answer…" />
        </div>
      </div>
    </div>
  );
}

function FaqSectionEditor({ section, onChange }: { section: FaqSection; onChange: (s: FaqSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Title <span className="text-slate-600">(optional)</span></label>
        <input value={section.title ?? ""} onChange={(e) => onChange({ ...section, title: e.target.value || undefined })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Frequently Asked Questions" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400">FAQ Items ({section.items.length})</p>
        {section.items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional
          <FaqItemEditor key={i} item={item} index={i} onChange={(updated) => { const items = [...section.items]; items[i] = updated; onChange({ ...section, items }); }} onRemove={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })} />
        ))}
        <button type="button" onClick={() => onChange({ ...section, items: [...section.items, { question: "", answer: "" }] })} className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 hover:border-blue-500/50 hover:text-blue-400">
          <FiPlus className="h-3 w-3" /> Add Question
        </button>
      </div>
    </div>
  );
}

function ProcessStepEditor({ step, index, onChange, onRemove }: { step: ProcessStep; index: number; onChange: (s: ProcessStep) => void; onRemove: () => void }) {
  return (
    <div className="relative rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
      <button type="button" onClick={onRemove} aria-label={`Remove step ${index + 1}`} className="absolute right-2 top-2 rounded p-0.5 text-slate-600 hover:text-red-400">
        <FiMinus className="h-3.5 w-3.5" />
      </button>
      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Step {index + 1} Title</label>
          <input value={step.title} onChange={(e) => onChange({ ...step, title: e.target.value })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Step title" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">Description</label>
          <textarea rows={2} value={step.description} onChange={(e) => onChange({ ...step, description: e.target.value })} className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="What happens in this step" />
        </div>
        <div className="rounded-md border border-slate-700/40 bg-slate-900 p-2">
          <ImageUploader value={step.image ?? null} onChange={(url) => onChange({ ...step, image: url ?? undefined })} />
        </div>
        {step.image && (
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-500">Image Alt Text</label>
            <input value={step.imageAlt ?? ""} onChange={(e) => onChange({ ...step, imageAlt: e.target.value || undefined })} className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Descriptive alt text" />
          </div>
        )}
      </div>
    </div>
  );
}

function ProcessSectionEditor({ section, onChange }: { section: ProcessSection; onChange: (s: ProcessSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Title <span className="text-slate-600">(optional)</span></label>
        <input value={section.title ?? ""} onChange={(e) => onChange({ ...section, title: e.target.value || undefined })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="How It Works" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400">Steps ({section.items.length})</p>
        {section.items.map((step, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional
          <ProcessStepEditor key={i} step={step} index={i} onChange={(updated) => { const items = [...section.items]; items[i] = updated; onChange({ ...section, items }); }} onRemove={() => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) })} />
        ))}
        <button type="button" onClick={() => onChange({ ...section, items: [...section.items, { title: "", description: "" }] })} className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 hover:border-blue-500/50 hover:text-blue-400">
          <FiPlus className="h-3 w-3" /> Add Step
        </button>
      </div>
    </div>
  );
}

function ImageTextSectionEditor({ section, onChange }: { section: ImageTextSection; onChange: (s: ImageTextSection) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Title <span className="text-slate-600">(optional)</span></label>
        <input value={section.title ?? ""} onChange={(e) => onChange({ ...section, title: e.target.value || undefined })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Section heading" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Content <span className="text-slate-600">(separate paragraphs with blank line)</span></label>
        <textarea rows={5} value={section.content} onChange={(e) => onChange({ ...section, content: e.target.value })} className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Write your content here…" />
      </div>
      <div className="rounded-md border border-slate-700/40 bg-slate-900 p-2">
        <ImageUploader value={section.image || null} onChange={(url) => onChange({ ...section, image: url ?? "" })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Image Alt Text</label>
          <input value={section.imageAlt ?? ""} onChange={(e) => onChange({ ...section, imageAlt: e.target.value || undefined })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none" placeholder="Descriptive alt text" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Image Position</label>
          <select value={section.imagePosition ?? "left"} onChange={(e) => onChange({ ...section, imagePosition: e.target.value as "left" | "right" })} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none">
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );
}

type Props = {
  readonly initialIndustry?: Industry | null;
  readonly isSaving: boolean;
  readonly onCancel: () => void;
  readonly onSave: (payload: IndustryInput, id?: string) => void;
  readonly contentType?: "industry" | "solution";
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
        title: "Key Features",
        items: [{ title: "Feature 1", description: "Description here.", icon: "check" }],
      };
    case "image":
      return { type: "image", src: "", alt: "", caption: "" };
    case "cta":
      return {
        type: "cta",
        eyebrow: "",
        heading: "Ready to Transform Your Business?",
        subheading: "Contact us today and let's discuss how we can help you achieve your goals.",
        buttonLabel: "Get a Free Quote",
        buttonHref: "/#contact",
        secondaryLabel: "",
        secondaryHref: "",
      };
    case "hero-cta":
      return { type: "hero-cta", primaryLabel: "Get Free Leads", primaryHref: "/#contact" };
    case "stats":
      return { type: "stats", title: "Proven Results", items: [{ value: "", label: "" }] };
    case "faq":
      return { type: "faq", title: "Frequently Asked Questions", items: [{ question: "", answer: "" }] };
    case "process":
      return { type: "process", title: "How It Works", items: [{ title: "", description: "" }] };
    case "image-text":
      return { type: "image-text", content: "", image: "", imagePosition: "left" };
  }
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

// ---------------------------------------------------------------------------
// Section-specific field editors
// ---------------------------------------------------------------------------

function TextSectionEditor({
  section,
  onChange,
}: {
  section: TextSection;
  onChange: (s: TextSection) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Title
        </label>
        <input
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Section heading"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Content{" "}
          <span className="text-slate-600">(separate paragraphs with a blank line)</span>
        </label>
        <textarea
          rows={6}
          value={section.content}
          onChange={(e) => onChange({ ...section, content: e.target.value })}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Write your content here…"
        />
      </div>
    </div>
  );
}

function FeatureItemEditor({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: FeatureItem;
  index: number;
  onChange: (i: FeatureItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-lg border border-slate-700/60 bg-slate-900/60 p-3">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove feature ${index + 1}`}
        className="absolute right-2 top-2 rounded p-0.5 text-slate-600 hover:text-red-400"
      >
        <FiMinus className="h-3.5 w-3.5" />
      </button>
      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-[10px] font-medium text-slate-500">
            Icon key
          </label>
          <input
            value={item.icon ?? ""}
            onChange={(e) => onChange({ ...item, icon: e.target.value })}
            className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="check, bolt, star…"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[10px] font-medium text-slate-500">
            Title
          </label>
          <input
            value={item.title}
            onChange={(e) => onChange({ ...item, title: e.target.value })}
            className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="Feature title"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="mb-1 block text-[10px] font-medium text-slate-500">
            Description
          </label>
          <textarea
            rows={2}
            value={item.description}
            onChange={(e) => onChange({ ...item, description: e.target.value })}
            className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="Short description"
          />
        </div>
      </div>
    </div>
  );
}

function FeaturesSectionEditor({
  section,
  onChange,
}: {
  section: FeaturesSection;
  onChange: (s: FeaturesSection) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Section Title <span className="text-slate-600">(optional)</span>
        </label>
        <input
          value={section.title ?? ""}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Key Features"
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400">
          Feature Items ({section.items.length})
        </p>
        {section.items.map((item, i) => (
          <FeatureItemEditor
            // biome-ignore lint/suspicious/noArrayIndexKey: positional
            key={i}
            item={item}
            index={i}
            onChange={(updated) => {
              const items = [...section.items];
              items[i] = updated;
              onChange({ ...section, items });
            }}
            onRemove={() => {
              onChange({
                ...section,
                items: section.items.filter((_, idx) => idx !== i),
              });
            }}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...section,
              items: [
                ...section.items,
                { title: "", description: "", icon: "check" },
              ],
            })
          }
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-2 text-xs text-slate-500 transition-colors hover:border-blue-500/50 hover:text-blue-400"
        >
          <FiPlus className="h-3 w-3" /> Add Feature
        </button>
      </div>
    </div>
  );
}

function ImageSectionEditor({
  section,
  onChange,
}: {
  section: ImageSection;
  onChange: (s: ImageSection) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Image URL
        </label>
        <input
          value={section.src}
          onChange={(e) => onChange({ ...section, src: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="https://…"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Alt Text
        </label>
        <input
          value={section.alt ?? ""}
          onChange={(e) => onChange({ ...section, alt: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Descriptive alt text"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Caption <span className="text-slate-600">(optional)</span>
        </label>
        <input
          value={section.caption ?? ""}
          onChange={(e) => onChange({ ...section, caption: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Photo caption shown below image"
        />
      </div>
    </div>
  );
}

function CTASectionEditor({
  section,
  onChange,
}: {
  section: CTASection;
  onChange: (s: CTASection) => void;
}) {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Eyebrow Label <span className="text-slate-600">(optional — shown above heading)</span>
        </label>
        <input
          value={section.eyebrow ?? ""}
          onChange={(e) => onChange({ ...section, eyebrow: e.target.value || undefined })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Get Started"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">Heading</label>
        <input
          value={section.heading}
          onChange={(e) => onChange({ ...section, heading: e.target.value })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Ready to transform your business?"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-400">
          Subheading <span className="text-slate-600">(optional)</span>
        </label>
        <textarea
          rows={2}
          value={section.subheading ?? ""}
          onChange={(e) => onChange({ ...section, subheading: e.target.value || undefined })}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
          placeholder="Short supporting copy that reinforces the heading"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Primary Button Label</label>
          <input
            value={section.buttonLabel}
            onChange={(e) => onChange({ ...section, buttonLabel: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="Get a Free Quote"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">Primary Button Link</label>
          <input
            value={section.buttonHref}
            onChange={(e) => onChange({ ...section, buttonHref: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="/#contact"
          />
        </div>
      </div>
      <div className="rounded-lg border border-dashed border-slate-700 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Secondary Button (optional)</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Label</label>
            <input
              value={section.secondaryLabel ?? ""}
              onChange={(e) => onChange({ ...section, secondaryLabel: e.target.value || undefined })}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
              placeholder="Learn More"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Link</label>
            <input
              value={section.secondaryHref ?? ""}
              onChange={(e) => onChange({ ...section, secondaryHref: e.target.value || undefined })}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:border-blue-500 focus-visible:outline-none"
              placeholder="/about"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section card (with drag-to-reorder handle)
// ---------------------------------------------------------------------------
const SECTION_LABELS: Record<SectionType, string> = {
  text: "Text Block",
  features: "Features Grid",
  image: "Image",
  cta: "Call to Action",
  "hero-cta": "Hero CTA Buttons",
  stats: "Stats",
  faq: "FAQ",
  process: "Process Steps",
  "image-text": "Image + Text",
};

const SECTION_COLORS: Record<SectionType, string> = {
  text: "border-l-blue-500",
  features: "border-l-purple-500",
  image: "border-l-teal-500",
  cta: "border-l-orange-500",
  "hero-cta": "border-l-cyan-500",
  stats: "border-l-emerald-500",
  faq: "border-l-amber-500",
  process: "border-l-pink-500",
  "image-text": "border-l-indigo-500",
};

function SectionCard({
  section,
  index,
  total,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
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
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`rounded-xl border-l-4 border border-slate-700/60 bg-[hsl(0,0%,7%)] ${SECTION_COLORS[section.type]}`}
    >
      {/* Card header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span
          title="Drag to reorder"
          className="cursor-grab text-slate-600 hover:text-slate-400 active:cursor-grabbing"
        >
          <FiMove className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {index + 1} / {total} — {SECTION_LABELS[section.type]}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded px-2 py-0.5 text-xs text-slate-500 hover:text-slate-300"
          >
            {open ? "Collapse" : "Expand"}
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove section"
            className="rounded p-1 text-slate-600 hover:text-red-400"
          >
            <FiX className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Editable fields */}
      {open && (
        <div className="border-t border-slate-800 px-4 pb-4">
          {section.type === "text" && (
            <TextSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "features" && (
            <FeaturesSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "image" && (
            <ImageSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "cta" && (
            <CTASectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "hero-cta" && (
            <HeroCtaSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "stats" && (
            <StatsSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "faq" && (
            <FaqSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "process" && (
            <ProcessSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
          {section.type === "image-text" && (
            <ImageTextSectionEditor section={section} onChange={(s) => onChange(s)} />
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------
export function IndustryEditorModal({
  initialIndustry,
  isSaving,
  onCancel,
  onSave,
  contentType = "industry",
}: Props) {
  const isSolution = contentType === "solution";
  const noun = isSolution ? "solution" : "industry";
  const Noun = isSolution ? "Solution" : "Industry";
  const urlBase = isSolution ? "/solutions/" : "/industries/";
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [sections, setSections] = useState<IndustrySection[]>([]);
  const [slugDirty, setSlugDirty] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  // Drag state
  const dragIndexRef = useRef<number | null>(null);

  const isEditing = Boolean(initialIndustry?.id);

  useEffect(() => {
    if (!initialIndustry) {
      setTitle("");
      setSlug("");
      setDescription("");
      setCoverImage(null);
      setIsPublished(true);
      setSections([]);
      setSlugDirty(false);
      return;
    }
    setTitle(initialIndustry.title);
    setSlug(initialIndustry.slug);
    setDescription(initialIndustry.description ?? "");
    setCoverImage(initialIndustry.coverImage);
    setIsPublished(initialIndustry.isPublished);
    setSections(initialIndustry.content as IndustrySection[]);
    setSlugDirty(true);
  }, [initialIndustry]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close add-section menu on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        addMenuRef.current &&
        !addMenuRef.current.contains(e.target as Node)
      ) {
        setAddMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const canSave = useMemo(
    () => Boolean(title.trim() && slug.trim()),
    [title, slug]
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugDirty) setSlug(slugify(val));
  }

  function addSection(type: SectionType) {
    setSections((prev) => [...prev, defaultSection(type)]);
    setAddMenuOpen(false);
  }

  function updateSection(index: number, updated: IndustrySection) {
    setSections((prev) => prev.map((s, i) => (i === index ? updated : s)));
  }

  function removeSection(index: number) {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  // Drag-to-reorder
  function handleDragStart(index: number) {
    dragIndexRef.current = index;
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

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
    void navigator.clipboard.writeText(`/${slug}`);
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
        description: description.trim() || null,
        content: sections,
        coverImage,
        isPublished,
      },
      initialIndustry?.id
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[hsl(0,0%,4%)]"
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? `Edit ${noun} page` : `New ${noun} page`}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
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
              {isEditing ? `Editing ${noun}` : `New ${noun}`}
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
            disabled={!canSave || isSaving}
            onClick={() => {
              const form = document.getElementById(
                "industry-editor-form"
              ) as HTMLFormElement | null;
              form?.requestSubmit();
            }}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSave className="h-3.5 w-3.5" />
            {isSaving
              ? "Saving…"
              : isEditing
              ? `Update ${Noun}`
              : `Publish ${Noun}`}
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* ── Left: Main form ───────────────── */}
        <form
          id="industry-editor-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="ie-title"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Page Title
              </label>
              <input
                id="ie-title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Solar Leads & Live Transfers"
                className="mt-2 w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-lg font-semibold text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="ie-slug"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                URL Slug
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-600">
                  /
                </span>
                <input
                  id="ie-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugDirty(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] py-2.5 pl-7 pr-4 text-sm text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
                  placeholder="solar-leads"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="ie-desc"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Description{" "}
                <span className="text-slate-600">
                  (meta description + hero subheading)
                </span>
              </label>
              <textarea
                id="ie-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Short summary used for SEO and the page hero…"
                className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
              />
            </div>

            {/* Cover image */}
            <div className="rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] p-4">
              <ImageUploader value={coverImage} onChange={setCoverImage} />
            </div>

            {/* ── Section builder ─────────────── */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Content Sections
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {sections.length === 0
                      ? "No sections yet. Add one below."
                      : `${sections.length} section${sections.length !== 1 ? "s" : ""} — drag to reorder`}
                  </p>
                </div>

                {/* Add section button + popover */}
                <div className="relative" ref={addMenuRef}>
                  <button
                    type="button"
                    onClick={() => setAddMenuOpen((o) => !o)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
                  >
                    <FiPlus className="h-3.5 w-3.5" /> Add Section
                  </button>

                  {addMenuOpen && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-slate-700 bg-[hsl(0,0%,9%)] shadow-xl">
                      {(
                        [
                          ["hero-cta", "🎯 Hero CTA Buttons"],
                          ["stats", "📊 Stats"],
                          ["image-text", "🖼 Image + Text"],
                          ["process", "🔢 Process Steps"],
                          ["faq", "❓ FAQ"],
                          ["features", "✦ Features Grid"],
                          ["text", "📝 Text Block"],
                          ["image", "🖼 Image"],
                          ["cta", "🚀 Call to Action"],
                        ] as [SectionType, string][]
                      ).map(([type, label]) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => addSection(type)}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section list */}
              <div className="space-y-3">
                {sections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-12 text-center">
                    <p className="text-sm text-slate-600">No sections yet</p>
                    <button
                      type="button"
                      onClick={() => setAddMenuOpen(true)}
                      className="mt-3 flex items-center gap-1.5 rounded-lg border border-blue-500/30 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/10"
                    >
                      <FiPlus className="h-3 w-3" /> Add your first section
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
                      onChange={(updated) => updateSection(i, updated)}
                      onRemove={() => removeSection(i)}
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = "move";
                        handleDragStart(i);
                      }}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(i)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </form>

        {/* ── Right: Metadata sidebar ───────── */}
        <aside className="hidden w-[260px] shrink-0 overflow-y-auto border-l border-slate-800 bg-[hsl(0,0%,5%)] lg:block">
          <div className="space-y-6 p-5">
            {/* Publish toggle */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Visibility
              </p>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-[hsl(0,0%,8%)] px-4 py-2.5">
                <span className="flex-1 text-sm text-slate-300">
                  {isPublished ? "Published" : "Draft"}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isPublished}
                  onClick={() => setIsPublished((p) => !p)}
                  className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    isPublished ? "bg-blue-600" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      isPublished ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* URL preview */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                URL Preview
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] px-3 py-2.5">
                <span className="flex-1 truncate font-mono text-xs text-slate-400">
                  {urlBase}{slug || "…"}
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
                  {isEditing && slug && (
                    <a
                      href={`${urlBase}${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open page"
                      className="rounded-md p-1 text-slate-500 hover:text-slate-300"
                    >
                      <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <CopiedToast show={copiedSlug} />
                </div>
              </div>
            </div>

            {/* Section summary */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Section Summary
              </p>
              {sections.length === 0 ? (
                <p className="text-xs text-slate-600">No sections added.</p>
              ) : (
                <ol className="space-y-1">
                  {sections.map((s, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-4 shrink-0 text-right text-slate-700">
                        {i + 1}.
                      </span>
                      <span
                        className={`mt-px h-1.5 w-1.5 shrink-0 rounded-full ${
                          s.type === "text" ? "bg-blue-500"
                            : s.type === "features" ? "bg-purple-500"
                            : s.type === "image" ? "bg-teal-500"
                            : s.type === "cta" ? "bg-orange-500"
                            : s.type === "hero-cta" ? "bg-cyan-500"
                            : s.type === "stats" ? "bg-emerald-500"
                            : s.type === "faq" ? "bg-amber-500"
                            : s.type === "process" ? "bg-pink-500"
                            : "bg-indigo-500"
                        }`}
                      />
                      <span className="truncate">
                        {SECTION_LABELS[s.type]}
                        {s.type === "text" && s.title ? ` — ${s.title}` : ""}
                        {s.type === "features" && s.title
                          ? ` — ${s.title}`
                          : ""}
                        {s.type === "cta" ? ` — ${s.heading}` : ""}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
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
                  style={{ maxHeight: 120 }}
                />
              </div>
            )}

            {/* Timestamps */}
            {isEditing && initialIndustry && (
              <div className="space-y-1 rounded-lg border border-slate-800 bg-[hsl(0,0%,7%)] px-4 py-3 text-xs text-slate-500">
                <p>
                  Created:{" "}
                  <span className="text-slate-400">
                    {new Date(initialIndustry.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Updated:{" "}
                  <span className="text-slate-400">
                    {new Date(initialIndustry.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            {/* Save (repeated) */}
            <button
              type="button"
              disabled={!canSave || isSaving}
              onClick={() => {
                const form = document.getElementById(
                  "industry-editor-form"
                ) as HTMLFormElement | null;
                form?.requestSubmit();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave className="h-3.5 w-3.5" />
              {isSaving
                ? "Saving…"
                : isEditing
                ? "Update Page"
                : "Publish Page"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

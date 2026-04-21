"use client";

import { useState, useRef, useEffect } from "react";
import type { FaqSection } from "@/types/industry";

interface Props {
  readonly section: FaqSection;
}

/* Animates max-height from 0 → scrollHeight on open */
function AccordionPanel({
  answer,
  isOpen,
}: {
  answer: string;
  isOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(isOpen ? ref.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      style={{ maxHeight: height, transition: "max-height 320ms cubic-bezier(0.4,0,0.2,1)" }}
      className="overflow-hidden"
    >
      <div ref={ref}>
        <dd className="px-6 pb-6 pt-0 sm:px-8">
          <div className="border-t border-slate-700/60 pt-5">
            <p className="text-sm leading-7 text-slate-400 sm:text-[0.9375rem]">
              {answer}
            </p>
          </div>
        </dd>
      </div>
    </div>
  );
}

export function FaqSectionComponent({ section }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  /* Split items into two columns on large screens */
  const half = Math.ceil(section.items.length / 2);
  const left  = section.items.slice(0, half);
  const right = section.items.slice(half);

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* ── Ambient background ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-blue-600/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-indigo-500/6 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col items-center text-center">
          {/* Eyebrow pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              FAQ
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {section.title ?? (
              <>
                Got{" "}
                <span className="gradient-brand-text">Questions?</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-xl text-base text-slate-400">
            Everything you need to know about how Lead4s powers your growth.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/60" />
          </div>
        </div>

        {/* ── Accordion grid (1 col → 2 cols on lg) ───────────────────── */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {[left, right].map((col, colIdx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((item, rowIdx) => {
                const i = colIdx === 0 ? rowIdx : half + rowIdx;
                const isOpen = openIndex === i;

                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-blue-500/40 bg-slate-900/90 shadow-lg shadow-blue-500/10"
                        : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/70 hover:bg-slate-900/70"
                    }`}
                  >
                    {/* Left accent bar — visible when open */}
                    <div
                      className={`absolute inset-y-0 left-0 w-0.5 rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-500 transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Top shimmer line */}
                    <div
                      className={`h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Question button */}
                    <dt>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggle(i)}
                        className="flex w-full items-start gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset sm:px-8 sm:py-6"
                      >
                        {/* Number badge */}
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                            isOpen
                              ? "bg-blue-600 text-white"
                              : "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-400"
                          }`}
                        >
                          {i + 1}
                        </span>

                        <span
                          className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 sm:text-[0.9375rem] ${
                            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          {item.question}
                        </span>

                        {/* Chevron */}
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "border-blue-500/40 bg-blue-500/15 text-blue-400 rotate-180"
                              : "border-slate-700 bg-slate-800/50 text-slate-500 group-hover:border-slate-600 group-hover:text-slate-400"
                          }`}
                        >
                          <svg
                            aria-hidden="true"
                            className="h-3.5 w-3.5 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                    </dt>

                    {/* Answer panel — smooth height animation */}
                    <AccordionPanel answer={item.answer} isOpen={isOpen} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── Bottom CTA card ─────────────────────────────────────────── */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="flex flex-col items-center gap-6 px-8 py-10 text-center sm:flex-row sm:text-left lg:px-12">
            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-base font-semibold text-white">Still have questions?</p>
              <p className="mt-1 text-sm text-slate-400">
                Our team is ready to walk you through the platform.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-blue-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0"
            >
              Talk to us
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

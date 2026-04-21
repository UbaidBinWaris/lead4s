"use client";

import { useState } from "react";
import type { FaqSection } from "@/types/industry";

interface Props {
  readonly section: FaqSection;
}

export function FaqSectionComponent({ section }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
          {section.title ?? "Frequently Asked Questions"}
        </h2>

        <dl className="space-y-3">
          {section.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional
              <div key={i} className="overflow-hidden rounded-xl border border-slate-800 bg-[hsl(0,0%,6%)]">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-white transition-colors hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                  >
                    <span>{item.question}</span>
                    <svg
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="border-t border-slate-800 px-6 py-5">
                    <p className="text-sm leading-relaxed text-slate-400">{item.answer}</p>
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

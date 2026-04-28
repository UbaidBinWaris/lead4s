import Link from "next/link";
import type { LinkListSection } from "@/types/industry";

interface Props {
  readonly section: LinkListSection;
}

export function LinkListSectionComponent({ section }: Props) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-slate-800 bg-[hsl(0,0%,6%)] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {section.title ?? "Related Resources"}
          </h2>
          <ul className="mt-5 space-y-3">
            {section.items.map((item) => (
              <li key={`${item.href}-${item.label}`} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-blue-500/30">
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-blue-300 underline decoration-blue-500/40 underline-offset-4 hover:text-blue-200"
                >
                  {item.label}
                </Link>
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

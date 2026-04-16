"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { ResultsSection } from "@/data/about";

interface ResultsProps {
  readonly data: ResultsSection;
}

/* Animated counter hook */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

/* Stat item */
type StatItemProps = {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly sub: string;
  readonly start: boolean;
};

function StatItem({ value, suffix, label, sub, start }: StatItemProps) {
  const count = useCountUp(value, 2200, start);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center text-center"
    >
      <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
        {count.toLocaleString()}
        <span className="text-brand-400">{suffix}</span>
      </p>
      <p className="mt-3 text-sm font-semibold text-slate-200">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </motion.div>
  );
}

export function Results({ data }: ResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="results-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-700/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-700/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            {data.eyebrow}
          </motion.p>
          <motion.h2
            id="results-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>
          </motion.h2>
        </motion.div>

        {/* Counter grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-12 md:grid-cols-4"
        >
          {data.stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              sub={stat.sub}
              start={isInView}
            />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mt-20 flex items-center gap-6">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Trusted by growth teams nationwide
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Testimonial quote */}
        <motion.blockquote
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="text-base leading-relaxed text-slate-400 italic">
            &ldquo;{data.testimonial.quote}&rdquo;
          </p>
          <footer className="mt-5">
            <cite className="not-italic">
              <span className="text-sm font-semibold text-white">
                {data.testimonial.author}
              </span>
              <span className="mx-2 text-slate-600">·</span>
              <span className="text-xs text-slate-500">
                {data.testimonial.role}, {data.testimonial.company}
              </span>
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

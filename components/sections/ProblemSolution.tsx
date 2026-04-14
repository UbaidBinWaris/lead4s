"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { problemSolutionContent } from "@/data/problemSolution";

export function ProblemSolution() {
  return (
    <section
      id={problemSolutionContent.id}
      className="relative overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-144 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            {problemSolutionContent.kicker}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mx-auto mb-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {problemSolutionContent.heading}
            <br />
            <span className="gradient-brand-text">
              {problemSolutionContent.headingAccent}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-base leading-relaxed text-slate-400"
          >
            {problemSolutionContent.intro}
          </motion.p>
        </motion.div>

        <div className="mb-4 hidden grid-cols-[1fr_1fr] gap-5 px-1 md:grid">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-300/80">
            {problemSolutionContent.problemsTitle}
          </p>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300/80">
            {problemSolutionContent.solutionsTitle}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-4"
        >
          {problemSolutionContent.items.map((item) => (
            <motion.article
              key={item.problemTitle}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-4 md:p-5"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-rose-400/35 via-white/15 to-emerald-400/35" />

              <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                <div className="rounded-2xl border border-rose-300/15 bg-rose-500/7 p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-rose-300/85 md:hidden">
                    {problemSolutionContent.problemsTitle}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.problemTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.problemText}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-300/18 bg-emerald-500/7 p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-300/85 md:hidden">
                    {problemSolutionContent.solutionsTitle}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.solutionTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {item.solutionText}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

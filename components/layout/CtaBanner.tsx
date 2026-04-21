"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ctaContent } from "@/data/cta";

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const logoItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });

  const haloY = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const meshOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.58]);
  const cardY = useTransform(scrollYProgress, [0, 1], [16, -8]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-400/45 to-transparent" />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ opacity: meshOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(56,189,248,0.14),transparent_36%),radial-gradient(circle_at_82%_22%,rgba(79,70,229,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.08),transparent_40%),linear-gradient(160deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.95)_100%)]"
        />
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-cyan-400/9 blur-[90px]"
        />
        <motion.div
          animate={{ x: [0, -16, 0], y: [0, 10, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-8 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]"
        />
        <motion.div
          style={{ y: haloY, scale: haloScale }}
          className="absolute left-1/2 top-1/2 h-125 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/14 blur-[120px]"
        />
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full border border-sky-400/15" />
        <div className="absolute -right-24 bottom-4 h-80 w-80 rounded-full border border-cyan-300/10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,1)_0.7px,transparent_0.7px)] bg-size-[3px_3px] opacity-[0.035]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={logoStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {ctaContent.logos.map((logo) => (
            <motion.span
              key={logo}
              variants={logoItem}
              whileHover={{ scale: 1.04, y: -3 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="rounded-full border border-sky-200/15 bg-slate-950/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 shadow-[0_0_0_rgba(125,211,252,0)] transition-shadow hover:shadow-[0_0_24px_rgba(125,211,252,0.2)]"
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ y: cardY }}
          className="relative"
        >
          <motion.div
            whileHover={{ rotateX: -2, rotateY: 2, y: -6, scale: 1.005 }}
            transition={{ type: "spring", stiffness: 170, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative overflow-hidden rounded-[2rem] border border-sky-200/20 bg-white/4 backdrop-blur-xl shadow-[0_24px_70px_rgba(2,132,199,0.24)]"
          >
            <motion.div
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(120deg,rgba(56,189,248,0.2),rgba(99,102,241,0.12),rgba(34,211,238,0.2))] bg-size-[220%_220%] opacity-70"
            />
            <div className="pointer-events-none absolute inset-px rounded-[calc(2rem-1px)] bg-[linear-gradient(145deg,rgba(8,18,36,0.94),rgba(2,10,22,0.88))]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),transparent_28%,transparent_72%,rgba(103,232,249,0.08))]" />

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:px-14"
            >
              <div>
                <motion.p
                  variants={riseIn}
                  className="mb-4 inline-flex rounded-full border border-sky-300/22 bg-sky-300/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300"
                >
                  {ctaContent.kicker}
                </motion.p>

                <motion.h2
                  variants={riseIn}
                  className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  {ctaContent.heading}{" "}
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: "linear" }}
                    className="bg-linear-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text bg-size-[200%_200%] text-transparent"
                  >
                    {ctaContent.highlighted}
                  </motion.span>
                </motion.h2>

                <motion.p
                  variants={riseIn}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
                >
                  {ctaContent.description}
                </motion.p>

                <motion.div
                  variants={riseIn}
                  className="mt-9 flex flex-col gap-3 sm:flex-row"
                >
                  {ctaContent.actions.map((action) => (
                    <motion.div key={action.label} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Link
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noreferrer" : undefined}
                        className={
                          action.variant === "primary"
                            ? "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-200/30 bg-linear-to-r from-sky-500 via-cyan-400 to-blue-500 px-6 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(14,165,233,0.35)] transition-all duration-300 hover:shadow-[0_18px_34px_rgba(14,165,233,0.45)]"
                            : "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-300/25 bg-white/6 px-6 text-sm font-semibold text-slate-100 transition-colors duration-300 hover:border-cyan-200/45 hover:bg-white/12"
                        }
                      >
                        {action.variant === "primary" ? (
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        ) : null}
                        <span className="relative">{action.label}</span>
                        <motion.span
                          className="relative"
                          initial={false}
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={riseIn}
                  className="mt-7 flex flex-wrap items-center gap-2.5"
                >
                  {ctaContent.trustBadges.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-slate-900/55 px-3 py-1.5 text-[11px] font-medium text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      {item.label}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={staggerChildren} className="grid gap-3">
                {ctaContent.quickContacts.map((contact) => (
                  <motion.a
                    variants={riseIn}
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    className="group flex items-center gap-3 rounded-xl border border-sky-200/18 bg-slate-900/58 px-4 py-3.5 shadow-[0_0_0_rgba(56,189,248,0)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-200/40 hover:bg-slate-900/82 hover:shadow-[0_16px_34px_rgba(6,182,212,0.16)]"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-sky-400/25 via-cyan-400/20 to-blue-400/25 text-cyan-100 ring-1 ring-cyan-200/25">
                      {contact.href.startsWith("tel:") ? (
                        <motion.svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          aria-hidden="true"
                          fill="none"
                          whileHover={{ rotate: 6, x: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 15 }}
                        >
                          <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.16 21 3 12.84 3 2.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.18 2.4.54 3.5a1 1 0 0 1-.24 1l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          aria-hidden="true"
                          fill="none"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 15 }}
                        >
                          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </span>

                    <span className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {contact.label}
                      </span>
                      <span className="text-sm font-medium text-slate-100 transition-colors group-hover:text-cyan-200">
                        {contact.value}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const TEAM = [
  {
    name: "Alex Rivera",
    role: "Chief Executive Officer",
    bio: "15 years in performance marketing. Previously VP Growth at two Inc. 500 companies.",
    initials: "AR",
    gradient: "from-brand-600 to-brand-800",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Jordan Kim",
    role: "Chief Technology Officer",
    bio: "Built real-time data pipelines at scale. Former engineering lead at a Fortune 500 data company.",
    initials: "JK",
    gradient: "from-violet-600 to-violet-800",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Taylor Moss",
    role: "VP of Compliance",
    bio: "TCPA and consumer protection attorney. Ensures every campaign meets the highest legal standards.",
    initials: "TM",
    gradient: "from-emerald-600 to-emerald-800",
    linkedin: "#",
    twitter: null,
  },
  {
    name: "Morgan Chen",
    role: "VP of Partner Success",
    bio: "Manages relationships with 500+ active partners. Obsessed with reducing CPL for every account.",
    initials: "MC",
    gradient: "from-accent-500 to-accent-700",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sam Patel",
    role: "Head of Media & Acquisition",
    bio: "Runs all owned media funnels — paid search, social, and programmatic across 50 states.",
    initials: "SP",
    gradient: "from-sky-600 to-sky-800",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Casey Walker",
    role: "Head of Call Center Ops",
    bio: "Oversees live transfer and appointment setting operations. Former Convergys senior manager.",
    initials: "CW",
    gradient: "from-rose-600 to-rose-800",
    linkedin: "#",
    twitter: null,
  },
] as const;

export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-brand-900/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            The people behind Lead4s
          </motion.p>
          <motion.h2
            id="team-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Led by Operators,{" "}
            <span className="bg-linear-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              Not Theorists
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            Every person on our leadership team has worked in the trenches of
            performance marketing, sales, compliance, or engineering.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeInUp}
              className="group rounded-2xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/60"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${member.gradient} text-base font-bold text-white shadow-lg`}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate">{member.name}</h3>
                  <p className="mt-0.5 text-xs text-brand-400">{member.role}</p>
                </div>

                {/* Social links */}
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-slate-600 transition-colors duration-200 hover:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                  >
                    <FaLinkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      aria-label={`${member.name} on X (Twitter)`}
                      className="text-slate-600 transition-colors duration-200 hover:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
                    >
                      <FaTwitter className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-400">{member.bio}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Careers nudge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            Want to join this team?{" "}
            <a
              href="/career"
              className="font-medium text-brand-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
            >
              See open roles →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

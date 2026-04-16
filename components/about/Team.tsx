"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { TeamSection } from "@/data/about";

interface TeamProps {
  readonly data: TeamSection;
}

export function Team({ data }: TeamProps) {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        <div className="absolute left-0 top-1/4 h-150 w-100 rounded-full bg-violet-900/8 blur-[120px]" />
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
            {data.eyebrow}
          </motion.p>
          <motion.h2
            id="team-heading"
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {data.heading}{" "}
            <span className="bg-linear-to-r from-violet-400 to-brand-400 bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-slate-400"
          >
            {data.subheading}
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.members.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeInUp}
              className="group rounded-xl border border-slate-800 bg-surface-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-surface-800/70"
            >
              {/* Avatar */}
              <div
                className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} font-bold text-white`}
              >
                {member.initials}
              </div>

              {/* Name & Role */}
              <h3 className="mt-4 text-base font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-brand-400">{member.role}</p>

              {/* Bio */}
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                {member.bio}
              </p>

              {/* Social links */}
              <div className="mt-4 flex items-center gap-2">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-900/40 text-slate-400 transition-colors duration-200 hover:bg-brand-600/30 hover:text-brand-400"
                  >
                    <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
                {member.twitter && (
                  <Link
                    href={member.twitter}
                    aria-label={`${member.name} on Twitter`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-900/40 text-slate-400 transition-colors duration-200 hover:bg-sky-600/30 hover:text-sky-400"
                  >
                    <FaTwitter className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

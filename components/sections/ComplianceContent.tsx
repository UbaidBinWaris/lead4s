"use client";

import { motion } from "framer-motion";
import {
  FaScaleBalanced,
  FaShieldHalved,
  FaUserCheck,
} from "react-icons/fa6";
import { SectionWrapper } from "@/components/SectionWrapper";
import {
  complianceControls,
  complianceFaq,
  complianceHero,
  complianceMetrics,
  compliancePillars,
  complianceProcess,
  ethicalStandards,
  longTermCommitments,
  partnerRequirements,
} from "@/data/compliance";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const viewport = { once: true, amount: 0.2 } as const;
const cardHover = {
  y: -3,
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

export function ComplianceContent() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <ProcessSection />
      <EthicalSection />
      <ControlsSection />
      <PartnerSection />
      <CommitmentSection />
      <FaqSection />
    </main>
  );
}

function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-16%] h-160 w-200 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[130px]" />
        <div className="absolute left-[-5%] top-[28%] h-96 w-96 rounded-full bg-brand-500/14 blur-[110px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300"
        >
          {complianceHero.kicker}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {complianceHero.title}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          {complianceHero.description}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base"
        >
          {complianceHero.supporting}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {complianceMetrics.map((item) => (
            <motion.article
              variants={fadeInUp}
              key={item.label}
              className="rounded-2xl border border-white/12 bg-white/5 p-4 text-left"
            >
              <p className="text-xs uppercase tracking-wider text-slate-400">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{item.value}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function PillarsSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(37, 99, 235, 0)" }}
        whileInView={{ backgroundColor: "rgba(37, 99, 235, 0.04)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built With Compliance at the Core
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {compliancePillars.map((pillar) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={pillar.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function ProcessSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(59, 130, 246, 0)" }}
        whileInView={{ backgroundColor: "rgba(59, 130, 246, 0.035)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compliance Workflow
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            A transparent process from inquiry capture to compliant partner delivery.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {complianceProcess.map((step, index) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={step.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-5 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                Step {(index + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {step.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function EthicalSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(30, 64, 175, 0)" }}
        whileInView={{ backgroundColor: "rgba(30, 64, 175, 0.04)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr] lg:items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.article
          variants={fadeInUp}
          className="rounded-3xl border border-brand-300/25 bg-brand-500/10 p-6 sm:p-7"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-300">
            Ethical and Transparent Lead Generation
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Marketing integrity is part of campaign performance.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            Our acquisition strategy is designed for transparent messaging,
            responsible advertising, and clear consumer understanding.
          </p>
        </motion.article>

        <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2">
          {ethicalStandards.map((item) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={item}
              className="rounded-2xl border border-white/12 bg-white/5 p-5 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <p className="text-sm font-medium leading-relaxed text-slate-200">
                {item}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function ControlsSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(37, 99, 235, 0)" }}
        whileInView={{ backgroundColor: "rgba(37, 99, 235, 0.035)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compliance Control Points
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2">
          {complianceControls.map((item) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={item.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function PartnerSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(59, 130, 246, 0)" }}
        whileInView={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Working With Compliant Partners
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partnerRequirements.map((item) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={item.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function CommitmentSection() {
  const icons = [FaUserCheck, FaShieldHalved, FaScaleBalanced] as const;

  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(37, 99, 235, 0)" }}
        whileInView={{ backgroundColor: "rgba(37, 99, 235, 0.035)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compliance Supports Long-Term Partnerships
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-3">
          {longTermCommitments.map((item, index) => {
            const Icon = icons[index] ?? FaShieldHalved;

            return (
              <motion.article
                whileHover={cardHover}
                variants={fadeInUp}
                key={item.title}
                className="rounded-2xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/7 text-brand-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function FaqSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <motion.div
        className="rounded-3xl p-2"
        initial={{ backgroundColor: "rgba(59, 130, 246, 0)" }}
        whileInView={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }}
        viewport={viewport}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compliance FAQ
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-3">
          {complianceFaq.map((item) => (
            <motion.article
              whileHover={cardHover}
              variants={fadeInUp}
              key={item.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-5 transition-all duration-300 hover:border-brand-400/35 hover:bg-white/7"
            >
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}


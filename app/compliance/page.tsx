import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaScaleBalanced,
  FaShieldHalved,
  FaUserCheck,
} from "react-icons/fa6";
import { SectionWrapper } from "@/components/SectionWrapper";
import {
  complianceContact,
  complianceHero,
  compliancePillars,
  ethicalStandards,
  longTermCommitments,
  partnerRequirements,
} from "@/data/compliance";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "Lead4s compliance systems for transparent, consent-driven lead generation and consumer data protection.",
};

export default function CompliancePage() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <EthicalSection />
      <PartnerSection />
      <CommitmentSection />

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

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
          {complianceHero.kicker}
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {complianceHero.title}
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {complianceHero.description}
        </p>

        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {complianceHero.supporting}
        </p>
      </div>
    </SectionWrapper>
  );
}

function PillarsSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built With Compliance at the Core
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {compliancePillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-white/12 bg-white/5 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

function EthicalSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr] lg:items-stretch">
        <article className="rounded-3xl border border-emerald-300/25 bg-emerald-500/10 p-6 sm:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
            Ethical and Transparent Lead Generation
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Marketing integrity is part of campaign performance.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            Our acquisition strategy is designed for transparent messaging,
            responsible advertising, and clear consumer understanding.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {ethicalStandards.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-white/12 bg-white/5 p-5"
            >
              <p className="text-sm font-medium leading-relaxed text-slate-200">
                {item}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function PartnerSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Working With Compliant Partners
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {partnerRequirements.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/12 bg-white/5 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

function CommitmentSection() {
  const icons = [FaUserCheck, FaShieldHalved, FaScaleBalanced] as const;

  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Compliance Supports Long-Term Partnerships
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {longTermCommitments.map((item, index) => {
          const Icon = icons[index] ?? FaShieldHalved;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-6"
            >
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/7 text-brand-300">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}


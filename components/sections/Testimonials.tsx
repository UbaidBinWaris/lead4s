"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const TESTIMONIALS = [
  {
    quote:
      "Lead4s cut our cost-per-lead by 62% in the first 60 days. The AI scoring is uncanny — our reps only talk to people who are actually ready to buy.",
    name: "Marcus Webb",
    title: "VP of Sales",
    company: "PropStream",
    avatar: "MW",
    rating: 5,
  },
  {
    quote:
      "We replaced three separate tools with Lead4s. Our pipeline velocity improved by 3× and our SDR team is finally spending time on selling instead of prospecting.",
    name: "Priya Anand",
    title: "Head of Growth",
    company: "HealthBridge",
    avatar: "PA",
    rating: 5,
  },
  {
    quote:
      "The industry-specific playbooks for financial services are incredible. Compliance was always a blocker for us — Lead4s solved it out of the box.",
    name: "Daniel Feuerstein",
    title: "Managing Director",
    company: "Apex Capital",
    avatar: "DF",
    rating: 5,
  },
  {
    quote:
      "Our agency manages lead gen for 40+ clients. White-labelling Lead4s was the best decision we've made — clients see results in week one.",
    name: "Sophie Brennan",
    title: "Founder & CEO",
    company: "GrowthLayer",
    avatar: "SB",
    rating: 5,
  },
  {
    quote:
      "Within 90 days, Lead4s generated more qualified leads than we had in the previous year. The multi-channel sequences convert at a level we didn't think was possible.",
    name: "Carlos Mendoza",
    title: "Director of Marketing",
    company: "NovaTech SaaS",
    avatar: "CM",
    rating: 5,
  },
  {
    quote:
      "I was sceptical about AI lead scoring, but the data speaks for itself. 91% of our 'Hot' leads closed within 30 days. This product is a game-changer.",
    name: "Aisha Nwosu",
    title: "Sales Manager",
    company: "LexGroup Legal",
    avatar: "AN",
    rating: 5,
  },
  {
    quote:
      "The CRM sync saved us 12 hours a week in manual data entry alone. Add the lead quality boost and Lead4s is easily our highest-ROI investment.",
    name: "Tom Hargreaves",
    title: "Operations Lead",
    company: "ShieldInsure",
    avatar: "TH",
    rating: 5,
  },
  {
    quote:
      "Lead4s gave us enterprise-grade prospecting at a startup price. We went from 20 demos/month to 80 in under two quarters.",
    name: "Yuki Tanaka",
    title: "Co-Founder",
    company: "CartFlow",
    avatar: "YT",
    rating: 5,
  },
];

// Split into two rows for the marquee
const ROW_1 = TESTIMONIALS.slice(0, 4);
const ROW_2 = TESTIMONIALS.slice(4);

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28">
      {/* Top separator */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            What customers say
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Trusted by sales teams
            <br />
            <span className="gradient-text">across every industry</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-xl text-base text-slate-400"
          >
            From scrappy startups to enterprise teams — here&apos;s what
            happens when AI handles your prospecting.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee rows — full-bleed */}
      <div className="relative flex flex-col gap-4">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-950 to-transparent" />

        {/* Row 1 — left scroll */}
        <MarqueeRow cards={ROW_1} direction="left" />

        {/* Row 2 — right scroll */}
        <MarqueeRow cards={ROW_2} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({
  cards,
  direction,
}: {
  cards: typeof TESTIMONIALS;
  direction: "left" | "right";
}) {
  // Duplicate to create a seamless loop
  const doubled = [...cards, ...cards];

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  title,
  company,
  avatar,
  rating,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="glass w-[340px] shrink-0 rounded-2xl border border-white/8 p-6 transition-colors hover:border-brand-500/25">
      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="#fbbf24"
            aria-hidden="true"
          >
            <path d="M6 0l1.5 4H12L8.5 6.5 10 11 6 8.5 2 11l1.5-4.5L0 4h4.5z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="mb-5 text-sm leading-relaxed text-slate-300">&ldquo;{quote}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-slate-500">
            {title} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}

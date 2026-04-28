"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const FAQS = [
  {
    q: "What industries does Lead4s prioritize right now?",
    a: "Our top-performing campaign mix is Home Improvement (40%), Insurance (25%), Legal (20%), and Solar (15%).",
  },
  {
    q: "Are Lead4s leads TCPA compliant?",
    a: "Lead4s campaigns are run with consent-first workflows, verification checkpoints, and audit-ready tracking infrastructure.",
  },
  {
    q: "How are leads delivered to our team?",
    a: "Leads can be delivered through API posting, CRM integration, and live transfer call routing depending on your operating model.",
  },
  {
    q: "Can we control geography and campaign volume?",
    a: "Yes. We configure delivery by state, DMA, ZIP, and buyer capacity to align your intake and sales operations.",
  },
  {
    q: "Do you support appointment setting and live transfers?",
    a: "Yes. We run both live transfer and appointment-setting programs based on your team structure and closing motion.",
  },
] as const;

export function HomeFaq() {
  return (
    <section id="home-faq" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400"
          >
            Frequently Asked Questions
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Answers buyers ask before scaling
          </motion.h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map((item) => (
            <motion.article
              key={item.q}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-white">{item.q}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

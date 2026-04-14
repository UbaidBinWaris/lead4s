import type { Metadata } from "next";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { CareerForm } from "@/components/CareerForm";
import { JobCard } from "@/components/JobCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import { cultureCards, openPositions } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers | Lead4s",
  description: "Join Lead4s and build the future of digital solutions",
};

export default function CareerPage() {
  return (
    <main>
      <HeroSection />
      <CultureSection />
      <OpenPositionsSection />
      <LocationSection />
      <ApplicationSection />
    </main>
  );
}

function HeroSection() {
  return (
    <SectionWrapper className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-[-18%] h-160 w-200 -translate-x-1/2 rounded-full bg-brand-600/22 blur-[130px]" />
        <div className="absolute right-[-8%] top-[24%] h-96 w-96 rounded-full bg-accent-500/18 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
          Careers at Lead4s
        </p>

        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Join Our Team
        </h1>

        <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Help us build the operating system for modern lead generation with
          better compliance, smarter delivery, and measurable growth for partner
          businesses worldwide.
        </p>

        <a
          href="#open-positions"
          className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/45 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          View Open Positions{" "}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </SectionWrapper>
  );
}

function CultureSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Culture That Compounds Talent
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          We care deeply about ownership, execution quality, and building tools
          that create long-term customer value.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cultureCards.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-white/10 bg-white/4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/35 hover:bg-white/7"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-brand-300 transition-colors group-hover:border-brand-400/40 group-hover:text-brand-200">
              <CultureIcon icon={item.icon} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

function OpenPositionsSection() {
  return (
    <SectionWrapper id="open-positions" className="py-16 sm:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Open Positions
          </h2>
          <p className="max-w-2xl text-slate-400">
            Explore current opportunities across growth, operations, client
            success, and engineering.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {openPositions.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function LocationSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
        <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/5">
          <iframe
            src="https://maps.google.com/maps?q=10340%20W%20Serene%20Ave%2C%20Las%20Vegas%2C%20NV%2089161&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title="Lead4s office location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full sm:h-105"
          />
        </div>

        <aside className="glass-strong rounded-3xl border border-white/12 p-6 sm:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
            Office Location
          </p>
          <h2 className="mb-3 text-2xl font-bold text-white">Las Vegas HQ</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                <FaLocationDot className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>10340 W Serene Ave, Las Vegas, NV 89161, USA</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                <FaPhone className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <a href="tel:+17027610192" className="hover:text-white">
                +1 (702) 761-0192
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <a href="mailto:info@lead4s.com" className="hover:text-white">
                info@lead4s.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                <FaClock className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>Mon - Fri, 9:00 AM to 6:00 PM PST</span>
            </li>
          </ul>
        </aside>
      </div>
    </SectionWrapper>
  );
}

function ApplicationSection() {
  return (
    <SectionWrapper id="career-apply" className="py-16 pb-24 sm:py-20 sm:pb-28">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Apply Now
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          Tell us about your background and the role you are applying for. We
          review every application carefully.
        </p>
      </div>

      <CareerForm jobs={openPositions} />
    </SectionWrapper>
  );
}

function CultureIcon({
  icon,
}: Readonly<{ icon: (typeof cultureCards)[number]["icon"] }>) {
  if (icon === "innovation") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 3 4 8l8 5 8-5-8-5Zm0 10-8-5v8l8 5 8-5V8l-8 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "growth") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 18h14M7 14l3-3 3 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "teamwork") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 19a5 5 0 0 1 10 0M11 19a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaEnvelope,
  FaHandshake,
  FaLocationDot,
  FaPhone,
  FaShield,
} from "react-icons/fa6";
import { CareerForm } from "@/components/CareerForm";
import { JobCard } from "@/components/JobCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import {
  cultureCards,
  employeeBenefits,
  growthHighlights,
  jobResponsibilities,
  officeDetails,
  openPositions,
  whyJoinLead4s,
} from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers | Lead4s",
  description:
    "Join Lead4s as a CSR, Self-Verification Executive, or Verification Specialist in Rawalpindi or remote roles.",
};

export default function CareerPage() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUsSection />
      <OpenPositionsSection />
      <CultureSection />
      <ResponsibilitiesSection />
      <CareerJourneySection />
      <LocationSection />
      <ApplicationSection />
    </main>
  );
}

function HeroSection() {
  const topHighlights = [
    {
      title: "Fast Hiring",
      description: "Simple process, quick response, and guided onboarding.",
      icon: FaBriefcase,
    },
    {
      title: "Real Growth",
      description: "Performance-based promotions and leadership tracks.",
      icon: FaChartLine,
    },
    {
      title: "Supportive Culture",
      description: "Collaborative teams focused on learning and impact.",
      icon: FaHandshake,
    },
  ];

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
          At Lead4s, we do not just offer jobs, we build careers. Join a
          supportive team, grow your communication skills, and unlock
          performance-based growth in both office and remote opportunities.
        </p>

        <a
          href="#open-positions"
          className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/45 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          View Open Positions{" "}
          <span aria-hidden="true">↓</span>
        </a>

        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {topHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/12 bg-white/5 p-4 backdrop-blur-sm"
            >
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/8 text-brand-300">
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold text-white">{item.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function WhyChooseUsSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1.9fr]">
        <article className="rounded-3xl border border-brand-400/30 bg-linear-to-br from-brand-600/20 via-brand-500/10 to-transparent p-6 sm:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-300">
            Why Choose Lead4s
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Build a career, not just a job.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            We hire for attitude and train for performance, with clear targets,
            coaching support, and opportunities to move up quickly.
          </p>
          <a
            href="#career-apply"
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-surface-950 transition-colors hover:bg-slate-100"
          >
            Start Your Application
            <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </article>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyJoinLead4s.map((item) => (
            <article
              key={item}
              className="group rounded-2xl border border-white/12 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/35 hover:bg-white/7"
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

function CultureSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Culture, Growth, and Benefits
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          We build high-performing teams with a supportive culture, practical
          training, and clear career progression.
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

      <div className="mt-10 mb-4 flex items-center gap-2 text-white">
        <FaChartLine className="h-4 w-4 text-emerald-300" aria-hidden="true" />
        <h3 className="text-lg font-semibold">Growth Tracks</h3>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {growthHighlights.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-emerald-300/20 bg-emerald-500/8 p-5"
          >
            <p className="text-sm font-medium leading-relaxed text-emerald-100">
              {item}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 mb-4 flex items-center gap-2 text-white">
        <FaShield className="h-4 w-4 text-brand-300" aria-hidden="true" />
        <h3 className="text-lg font-semibold">Benefits You Get</h3>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employeeBenefits.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-brand-300/20 bg-brand-500/8 p-5"
          >
            <p className="text-sm font-medium leading-relaxed text-brand-100">
              {item}
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
            We are actively hiring for support and verification roles with
            full-time and remote options.
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

function ResponsibilitiesSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Role Impact Areas
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          Your day-to-day work directly improves customer experience,
          compliance quality, and team performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:[&>article:last-child]:col-span-2 lg:[&>article:last-child]:col-span-1">
        {jobResponsibilities.map((item, index) => (
          <article
            key={item}
            className="rounded-2xl border border-white/12 bg-white/5 p-5"
          >
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/7 text-xs font-semibold text-brand-200">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed text-slate-200">{item}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

function CareerJourneySection() {
  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your Career Journey at Lead4s
        </h2>
        <p className="mx-auto max-w-2xl text-slate-400">
          A clear path from training to high performance and leadership.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Step 1",
            heading: "Apply",
            text: "Submit your profile for CSR or verification roles.",
          },
          {
            title: "Step 2",
            heading: "Train",
            text: "Learn communication, CRM flow, and quality standards.",
          },
          {
            title: "Step 3",
            heading: "Perform",
            text: "Work with targets and earn daily, weekly, and monthly incentives.",
          },
          {
            title: "Step 4",
            heading: "Grow",
            text: "Unlock fast-track promotions and leadership opportunities.",
          },
        ].map((item) => (
          <article
            key={item.heading}
            className="group rounded-2xl border border-white/12 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/35 hover:bg-white/7"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
              {item.title}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

function LocationSection() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(officeDetails.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <SectionWrapper className="py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
        <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/5">
          <iframe
            src={mapSrc}
            title="Lead4s office location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full sm:h-105"
          />
        </div>

        <aside className="glass-strong rounded-3xl border border-white/12 p-6 sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
            Office Location
          </p>
          <h2 className="mb-3 text-2xl font-bold text-white">
            {officeDetails.city} Office
          </h2>
          <div className="grid gap-4 text-sm text-slate-300">
            <article className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                  <FaLocationDot className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>{officeDetails.address}</span>
              </div>
            </article>

            <article className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                  <FaPhone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <a href="tel:+923426720918" className="hover:text-white">
                  +92 342 6720918
                </a>
              </div>
            </article>

            <article className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                  <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <a href="mailto:info@lead4s.com" className="hover:text-white">
                  info@lead4s.com
                </a>
              </div>
            </article>

            <article className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-white/15 bg-white/7 p-2 text-brand-300">
                  <FaClock className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Full-time shifts and flexible remote hours available</span>
              </div>
            </article>

            <article className="rounded-xl border border-white/12 bg-white/5 p-4 text-slate-200">
              {officeDetails.label}
            </article>
          </div>
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
          No experience? No problem. Share your details, select your role, and
          our team will guide you through training and onboarding.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="glass-strong rounded-3xl border border-white/12 p-6 text-sm text-slate-300 sm:p-8">
            Loading application form...
          </div>
        }
      >
        <CareerForm jobs={openPositions} />
      </Suspense>
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

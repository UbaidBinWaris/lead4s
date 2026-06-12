import type { Metadata } from "next";
import { BuyerForm } from "@/components/BuyerForm";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Check Buyer Availability — Lead4s",
  description:
    "Test Trackdrive integration and check real-time buyer availability for ACA leads. Secure, fast, and fully automated verification portal.",
  keywords: [
    "trackdrive integration",
    "check buyer availability",
    "lead4s trackdrive check",
    "ACA agent availability",
    "ping post testing",
  ],
  alternates: { canonical: `${SITE_URL}/buyer-form` },
  openGraph: {
    title: "Check Buyer Availability — Lead4s",
    description:
      "Verify buyer coverage and run automated tests using Trackdrive integration.",
    url: `${SITE_URL}/buyer-form`,
    type: "website",
    siteName: "Lead4s",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Buyer Availability — Lead4s",
    description: "Verify buyer coverage and run automated tests using Trackdrive integration.",
  },
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/buyer-form`,
      url: `${SITE_URL}/buyer-form`,
      name: "Check Buyer Availability",
      description: "Check buyer availability and test Trackdrive integrations on Lead4s.",
      isPartOf: { "@id": SITE_URL },
    },
  ],
});

export default function BuyerFormPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817]">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,1)_0.75px,transparent_0.75px)] bg-[size:28px_28px] opacity-[0.045]" />
        <div className="absolute right-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Page Heading */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Trackdrive Webhook Integration
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Check Agent &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Buyer Availability
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Use the interactive form below to run real-time PING availability checks and POST transfers for
            ACA agents on Trackdrive. Submitted data is captured securely in our PostgreSQL database.
          </p>
        </div>

        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        {/* Form Component */}
        <BuyerForm />
      </div>
    </main>
  );
}

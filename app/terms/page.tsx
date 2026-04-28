import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";
import { toJsonLd } from "@/lib/utils";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/terms`;
const updatedDate = "April 29, 2026";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read Lead4s Terms and Conditions covering website use, service scope, intellectual property, compliance, limitations of liability, and dispute resolution.",
  keywords: [
    "terms and conditions",
    "lead generation terms",
    "website terms of use",
    "service agreement terms",
    "legal terms",
    "compliance terms",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Terms and Conditions | Lead4s",
    description:
      "Legal terms governing access to and use of the Lead4s website and services.",
    type: "article",
    url: pageUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Lead4s Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Lead4s",
    description:
      "Legal terms for using Lead4s products, website, and related services.",
    images: [`${siteUrl}/og.png`],
  },
};

const termsJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  name: "Terms and Conditions",
  url: pageUrl,
  dateModified: "2026-04-29",
  inLanguage: "en-US",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@type": "Thing",
    name: "Website and Service Terms",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms and Conditions",
        item: pageUrl,
      },
    ],
  },
});

export default function TermsPage() {
  return (
    <main className="relative py-20 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: termsJsonLd }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-white/10 bg-white/4 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            These terms govern your use of the Lead4s website and related services.
            By accessing or using our services, you agree to these terms.
          </p>
          <p className="mt-4 text-xs text-slate-400">Last updated: {updatedDate}</p>
        </header>

        <article className="space-y-8 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing this website, submitting forms, or engaging with our services,
              you agree to comply with these Terms and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. Services Scope</h2>
            <p className="mt-2">
              Lead4s provides lead generation, call transfer, appointment, and related marketing
              support services. Specific campaign deliverables and commercial terms are defined in
              separate agreements where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. User Responsibilities</h2>
            <p className="mt-2">
              You agree to provide accurate information, use services lawfully, and avoid
              unauthorized access, misuse, or interference with site operations or infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Compliance Obligations</h2>
            <p className="mt-2">
              You are responsible for ensuring your use of leads and communications complies with
              applicable laws and regulations, including telemarketing, privacy, and consumer
              protection requirements in relevant jurisdictions.
            </p>
            <p className="mt-2">
              Learn more on our
              {" "}
              <Link href="/compliance" className="font-medium text-brand-300 underline underline-offset-4">
                compliance page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Intellectual Property</h2>
            <p className="mt-2">
              All website content, branding, logos, graphics, and materials are owned by or
              licensed to Lead4s and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Payment and Commercial Terms</h2>
            <p className="mt-2">
              Pricing, billing schedules, and performance obligations are governed by executed
              service agreements, order forms, or campaign-specific addenda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Disclaimer</h2>
            <p className="mt-2">
              The website and services are provided on an as-available basis. Lead4s makes no
              guarantees of specific revenue outcomes, conversion rates, or business performance
              unless expressly stated in a written agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">8. Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Lead4s is not liable for indirect,
              incidental, special, or consequential damages arising from use of the site
              or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">9. Termination</h2>
            <p className="mt-2">
              We may suspend or terminate access in cases of misuse, legal risk, non-payment,
              or violation of these Terms or related agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">10. Changes to Terms</h2>
            <p className="mt-2">
              We may update these Terms as legal, technical, or business requirements evolve.
              Continued use after updates constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">11. Contact</h2>
            <p className="mt-2">
              For legal inquiries, please use our
              {" "}
              <Link href="/contact" className="font-medium text-brand-300 underline underline-offset-4">
                contact page
              </Link>
              {" "}
              or email info@lead4s.com.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

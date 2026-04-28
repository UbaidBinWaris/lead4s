import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";
import { toJsonLd } from "@/lib/utils";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/privacy-policy`;
const updatedDate = "April 29, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Lead4s Privacy Policy to understand how we collect, use, protect, and process personal information across our lead generation, contact, and partnership workflows.",
  keywords: [
    "privacy policy",
    "lead generation privacy",
    "data protection policy",
    "consumer data rights",
    "contact form privacy",
    "partnership application privacy",
    "GDPR",
    "CCPA",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Privacy Policy | Lead4s",
    description:
      "Understand how Lead4s handles personal data, consent records, retention, and security safeguards.",
    type: "article",
    url: pageUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Lead4s Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Lead4s",
    description:
      "How Lead4s collects, uses, stores, and protects information across our services.",
    images: [`${siteUrl}/og.png`],
  },
};

const privacyJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  name: "Privacy Policy",
  url: pageUrl,
  dateModified: "2026-04-29",
  inLanguage: "en-US",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@type": "Thing",
    name: "Data Privacy and Security",
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
        name: "Privacy Policy",
        item: pageUrl,
      },
    ],
  },
});

export default function PrivacyPolicyPage() {
  return (
    <main className="relative py-20 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: privacyJsonLd }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-white/10 bg-white/4 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            This policy explains how Lead4s collects, uses, and protects information when you
            interact with our website, forms, and lead generation services.
          </p>
          <p className="mt-4 text-xs text-slate-400">Last updated: {updatedDate}</p>
        </header>

        <article className="space-y-8 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p className="mt-2">
              We may collect contact details, company information, campaign preferences, and
              communication records you provide through our contact and partnership forms.
              We also collect limited technical information such as IP address, device type,
              and browser metadata for security and analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. How We Use Information</h2>
            <p className="mt-2">
              Information is used to respond to inquiries, evaluate partnership requests,
              deliver services, maintain platform security, and improve acquisition quality.
              We process data for legitimate business purposes and in accordance with applicable
              privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Consent and Communication</h2>
            <p className="mt-2">
              When you submit forms on our site, you consent to receiving communications relevant
              to your request. Where required, we maintain consent and source records to support
              compliance and transparency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Data Sharing</h2>
            <p className="mt-2">
              We do not sell personal information as an independent data broker. We may share
              limited information with trusted processors and service providers that support
              hosting, analytics, communication, and operational delivery under contractual
              confidentiality and security obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Data Retention</h2>
            <p className="mt-2">
              We retain information only as long as needed for service delivery, legal compliance,
              dispute resolution, and security auditing. Retention windows vary by data type and
              regulatory requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Security Safeguards</h2>
            <p className="mt-2">
              Lead4s applies administrative, technical, and operational controls designed to
              protect information against unauthorized access, misuse, and disclosure. While no
              system is completely immune to risk, we continuously review and strengthen controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Your Privacy Rights</h2>
            <p className="mt-2">
              Depending on your jurisdiction, you may have rights to request access, correction,
              deletion, or restriction of your personal information. You may also object to
              certain processing activities where applicable.
            </p>
            <p className="mt-2">
              To submit a privacy request, contact us through our
              {" "}
              <Link href="/contact" className="font-medium text-brand-300 underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">8. Cross-Border Transfers</h2>
            <p className="mt-2">
              If information is processed outside your country, we apply appropriate safeguards
              and contractual protections as required by relevant law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">9. Policy Updates</h2>
            <p className="mt-2">
              We may update this Privacy Policy to reflect legal, technical, or business changes.
              Updated versions will be posted on this page with the revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">10. Contact</h2>
            <p className="mt-2">
              For privacy questions, please reach us via the
              {" "}
              <Link href="/contact" className="font-medium text-brand-300 underline underline-offset-4">
                contact form
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

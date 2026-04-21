import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lead4s.com";

export const metadata: Metadata = {
  title: "Contact Us — Lead4s",
  description:
    "Get in touch with the Lead4s team. Whether you have questions about our lead generation services, pricing, or want to schedule a strategy call — we're here to help.",
  keywords: [
    "contact lead4s",
    "lead generation support",
    "lead4s phone number",
    "lead4s email",
    "talk to lead generation expert",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us — Lead4s",
    description:
      "Reach the Lead4s team for questions, pricing, or to book a strategy call.",
    url: `${SITE_URL}/contact`,
    type: "website",
    siteName: "Lead4s",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Lead4s",
    description: "Reach the Lead4s team. We respond within 24 hours.",
  },
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact`,
      url: `${SITE_URL}/contact`,
      name: "Contact Lead4s",
      description: "Contact page for Lead4s lead generation services.",
      isPartOf: { "@id": SITE_URL },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Lead4s",
      url: SITE_URL,
      email: "info@lead4s.com",
      telephone: "+17027610192",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+17027610192",
          contactType: "customer support",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          email: "info@lead4s.com",
          contactType: "sales",
        },
      ],
    },
  ],
});

export default function ContactPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ContactForm />
    </>
  );
}

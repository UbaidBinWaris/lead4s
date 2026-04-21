import type { Metadata } from "next";
import { PartnershipForm } from "@/components/PartnershipForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lead4s.com";

export const metadata: Metadata = {
  title: "Apply for Partnership — Lead4s",
  description:
    "Join the Lead4s partner network. Get exclusive access to high-intent leads, live transfer calls, and appointment setting across solar, roofing, HVAC, insurance, and more.",
  keywords: [
    "lead generation partnership",
    "exclusive leads",
    "solar leads partner",
    "roofing leads partner",
    "HVAC leads",
    "insurance leads",
    "lead4s partnership",
    "partner program",
  ],
  alternates: { canonical: `${SITE_URL}/partnership` },
  openGraph: {
    title: "Apply for Partnership — Lead4s",
    description:
      "Scale your business with Lead4s exclusive leads, live transfers, and appointment setting. Apply for our partner program today.",
    url: `${SITE_URL}/partnership`,
    type: "website",
    siteName: "Lead4s",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Partnership — Lead4s",
    description:
      "Join Lead4s and get exclusive, compliant leads across core growth verticals.",
  },
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/partnership`,
      url: `${SITE_URL}/partnership`,
      name: "Apply for Partnership — Lead4s",
      description:
        "Apply to the Lead4s partner program for exclusive leads, live transfer calls, and appointment setting.",
      isPartOf: { "@id": SITE_URL },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Lead4s",
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+17027610192",
        contactType: "sales",
        email: "info@lead4s.com",
      },
    },
  ],
});

export default function PartnershipPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PartnershipForm />
    </>
  );
}

import type { Metadata } from "next";
import { ComplianceContent } from "@/components/sections/ComplianceContent";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Compliance | Lead4s",
  description:
    "Learn how Lead4s enforces TCPA-aware, consent-driven lead acquisition with transparent data handling and verification protocols.",
  keywords: ["lead generation compliance", "TCPA compliance", "TrustedForm", "consent verification"],
  alternates: { canonical: `${SITE_URL}/compliance` },
  openGraph: {
    title: "Compliance | Lead4s",
    description:
      "Consent-driven lead generation and compliance protocols built for enterprise buyers.",
    type: "website",
    url: `${SITE_URL}/compliance`,
  },
};

export default function CompliancePage() {
  return <ComplianceContent />;
}

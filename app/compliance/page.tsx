import type { Metadata } from "next";
import { ComplianceContent } from "@/components/sections/ComplianceContent";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "Lead4s compliance systems for transparent, consent-driven lead generation and consumer data protection.",
};

export default function CompliancePage() {
  return <ComplianceContent />;
}

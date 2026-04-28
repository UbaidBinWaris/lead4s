import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { getSiteUrl } from "@/lib/site";
import { toJsonLd } from "@/lib/utils";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Scalable Lead Generation Infrastructure for High-Growth Businesses",
  description:
    "Lead4s helps serious buyers scale customer acquisition with exclusive leads, live transfer calls, and appointment setting across Home Improvement, Insurance, Legal, and Solar campaigns.",
  keywords: [
    "lead generation infrastructure",
    "home improvement leads",
    "insurance leads",
    "legal leads",
    "solar leads",
    "high-intent leads",
    "live transfer calls",
    "appointment setting",
    "compliance-first lead generation",
    "performance lead supply",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Scalable Lead Generation Infrastructure for High-Growth Businesses",
    description:
      "Exclusive lead and call supply focused on Home Improvement (40%), Insurance (25%), Legal (20%), and Solar (15%) campaigns.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Lead4s scalable lead generation infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead4s - Scalable Lead Generation Infrastructure",
    description:
      "Scale with predictable lead flow using compliance-first acquisition and real-time delivery.",
    images: [`${siteUrl}/og.png`],
  },
};

const homeJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Scalable Lead Generation Infrastructure for High-Growth Businesses",
      description:
        "Lead4s delivers exclusive leads, live transfer calls, and booked appointments with campaign focus in Home Improvement, Insurance, Legal, and Solar.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#services`,
      serviceType: "Lead Generation Services",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "US",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lead4s Solutions",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exclusive CPL Leads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live Transfer Calls" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Appointment Setting" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "BPO Call Center Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PPC Campaign Management" } },
        ],
      },
    },
  ],
});

export default function HomePage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeJsonLd }} />
      <Hero />
      <ProblemSolution />
      <Services />
      <Industries />
      <Testimonials />
    </>
  );
}

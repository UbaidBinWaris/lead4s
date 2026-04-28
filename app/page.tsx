import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { CampaignMix } from "@/components/sections/CampaignMix";
import { TcpaCompliance } from "@/components/sections/TcpaCompliance";
import { HomeFaq } from "@/components/sections/HomeFaq";
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
    "TCPA compliant lead generation",
    "TrustedForm lead verification",
    "real-time lead delivery",
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
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What industries does Lead4s prioritize right now?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our top-performing campaign mix is Home Improvement (40%), Insurance (25%), Legal (20%), and Solar (15%).",
          },
        },
        {
          "@type": "Question",
          name: "Are Lead4s leads TCPA compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lead4s campaigns are run with consent-first workflows, verification checkpoints, and audit-ready tracking infrastructure.",
          },
        },
        {
          "@type": "Question",
          name: "How are leads delivered to our team?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Leads can be delivered through API posting, CRM integration, and live transfer call routing depending on your operating model.",
          },
        },
      ],
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
      <CampaignMix />
      <TcpaCompliance />
      <Industries />
      <Testimonials />
      <HomeFaq />
    </>
  );
}

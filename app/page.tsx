import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { CampaignMix } from "@/components/sections/CampaignMix";
import { TcpaCompliance } from "@/components/sections/TcpaCompliance";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { PerformanceSnapshot } from "@/components/sections/PerformanceSnapshot";
import { PartnershipSteps } from "@/components/sections/PartnershipSteps";
import { SeoInternalLinks } from "@/components/sections/SeoInternalLinks";
import { getSiteUrl } from "@/lib/site";
import { toJsonLd } from "@/lib/utils";
import ScrollAnimation from '@/components/scrol_animation'

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Solar, Medicare & Home Improvement Lead Generation",
  description:
    "Exclusive CPL leads, live transfers & booked appointments for Solar, Medicare, Home Improvement & Final Expense buyers. TCPA-compliant, real-time delivery.",
  keywords: [
    "solar leads",
    "Medicare leads",
    "Medicare supplement leads",
    "home improvement leads",
    "final expense leads",
    "insurance leads",
    "lead generation",
    "live transfer calls",
    "appointment setting",
    "TCPA compliant lead generation",
    "TrustedForm lead verification",
    "real-time lead delivery",
    "high-intent leads",
    "compliance-first lead generation",
    "performance lead supply",
    "legal leads",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Lead4s — Solar, Medicare & Home Improvement Lead Generation",
    description:
      "Exclusive leads, live transfers & appointments across Solar, Medicare, Home Improvement & Final Expense. TCPA-compliant with real-time delivery.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Lead4s lead generation for Solar, Medicare, Home Improvement and Final Expense",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead4s — Solar, Medicare & Home Improvement Leads",
    description:
      "Exclusive CPL leads, live transfers & appointments for Solar, Medicare, Home Improvement & Final Expense buyers. TCPA-compliant.",
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
      name: "Solar, Medicare & Home Improvement Lead Generation | Lead4s",
      description:
        "Lead4s delivers exclusive CPL leads, live transfers & booked appointments for Solar, Medicare, Home Improvement & Final Expense buyers. TCPA-compliant, real-time delivery.",
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Leads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medicare Leads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Improvement Leads" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Final Expense Leads" } },
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
            text: "Our top-performing verticals are Solar, Medicare (AEP & supplement), Home Improvement (roofing, HVAC, windows), and Final Expense insurance.",
          },
        },
        {
          "@type": "Question",
          name: "Do you supply Medicare leads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Lead4s supplies Medicare Advantage, Medicare Supplement (Medigap), and U65 leads through exclusive CPL programs with TCPA-compliant consent workflows.",
          },
        },
        {
          "@type": "Question",
          name: "What Home Improvement verticals do you cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We cover roofing, HVAC replacement, window and door replacement, bathroom remodels, and solar installation under our Home Improvement programs.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer Final Expense leads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We run Final Expense campaigns via direct mail follow-up, outbound SDR, and paid social, delivering exclusive leads with verified opt-in consent.",
          },
        },
        {
          "@type": "Question",
          name: "Are Lead4s leads TCPA compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lead4s campaigns are run with consent-first workflows, verification checkpoints, and audit-ready tracking infrastructure including TrustedForm certificates.",
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
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#money-pages`,
      name: "Lead4s Money Pages",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Lead Generation Solutions",
          url: `${siteUrl}/solutions`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industry Programs",
          url: `${siteUrl}/industries`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Case Studies",
          url: `${siteUrl}/case-studies`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          url: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact",
          url: `${siteUrl}/contact`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Partnership",
          url: `${siteUrl}/partnership`,
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
      <ScrollAnimation />
      <Services />
      <PerformanceSnapshot />
      <CampaignMix />
      <TcpaCompliance />
      <PartnershipSteps />
      <Industries />
      <SeoInternalLinks />
      <Testimonials />
      <HomeFaq />
    </>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSiteUrl } from "@/lib/site";
import { toJsonLd } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "Lead4s",
  title: {
    default: "Lead4s - Scalable Lead Generation Infrastructure",
    template: "%s | Lead4s",
  },
  description:
    "Lead4s delivers exclusive leads, live transfer calls, and booked appointments with strongest campaign performance in Home Improvement, Insurance, Legal, and Solar.",
  keywords: [
    "lead generation",
    "exclusive leads",
    "live transfer calls",
    "appointment setting",
    "TCPA compliant leads",
    "home improvement leads",
    "solar leads",
    "insurance leads",
    "legal leads",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lead4s",
    title: "Lead4s - Scalable Lead Generation Infrastructure",
    description:
      "High-intent lead and call supply with campaign focus across Home Improvement (40%), Insurance (25%), Legal (20%), and Solar (15%).",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lead4s",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead4s - Scalable Lead Generation Infrastructure",
    description:
      "Exclusive leads, live transfer calls, and booked appointments focused on Home Improvement, Insurance, Legal, and Solar campaigns.",
    images: ["/og.png"],
  },
  category: "business",
};

const siteUrl = getSiteUrl();
const organizationJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Lead4s",
  url: siteUrl,
  email: "info@lead4s.com",
  telephone: "+17027610192",
  sameAs: [
    "https://www.linkedin.com/company/lead4s/",
    "https://www.facebook.com/lead.4s/",
    "https://www.instagram.com/lead4s.llc/",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "10340 W Serene Ave",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89161",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+17027610192",
    contactType: "sales",
    email: "info@lead4s.com",
    availableLanguage: "English",
  },
});

const webSiteJsonLd = toJsonLd({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Lead4s",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteJsonLd }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

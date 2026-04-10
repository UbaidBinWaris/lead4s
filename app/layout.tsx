import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lead4s — AI-Powered Lead Generation",
    template: "%s | Lead4s",
  },
  description:
    "Lead4s helps businesses find, qualify, and close high-intent leads faster with AI-driven prospecting and outreach automation.",
  keywords: ["lead generation", "sales automation", "AI prospecting", "CRM"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lead4s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}

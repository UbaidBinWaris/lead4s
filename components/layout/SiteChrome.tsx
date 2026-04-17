"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CtaBanner } from "@/components/layout/CtaBanner";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <CtaBanner />
      <Footer />
    </>
  );
}

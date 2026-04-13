"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { headerData } from "@/dfata/jheader";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSections, setOpenMobileSections] = useState<string[]>([]);

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      setOpenMobileSections([]);
    }
  }, [mobileOpen]);

  // Prevent page scroll while mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface-950/92 shadow-lg shadow-black/25 backdrop-blur-xl border-b border-white/10"
          : "bg-surface-950/70 md:bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={headerData.logoPath}
              alt={`${headerData.companyName} logo`}
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              {headerData.companyName}
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => (
              <li key={`${link.label}-${link.href}`} className="relative group">
                {link.children?.length ? (
                  <>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {link.label}
                      <ChevronDown />
                    </button>

                    <div className="invisible absolute left-0 top-full mt-2 w-72 rounded-xl border border-white/10 bg-surface-900/98 p-2 opacity-0 shadow-xl shadow-black/35 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-60 md:hidden">
            <motion.button
              key="mobile-overlay"
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-surface-950/55 backdrop-blur-md"
            />

            <motion.aside
              key="mobile-menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="relative h-screen w-[80vw] max-w-sm border-r border-white/10 bg-surface-900/96 p-5 backdrop-blur-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={headerData.logoPath}
                    alt={`${headerData.companyName} logo`}
                    width={34}
                    height={34}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                  <span className="text-base font-semibold text-white">
                    {headerData.companyName}
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-slate-200 hover:bg-white/10 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {headerData.subheading}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                {headerData.heading}
              </h2>

              <ul className="mt-8 space-y-2">
                {headerData.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    {link.children?.length ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleMobileSection(link.label)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "transition-transform duration-200",
                              openMobileSections.includes(link.label)
                                ? "rotate-180"
                                : "rotate-0"
                            )}
                          />
                        </button>

                        {openMobileSections.includes(link.label) ? (
                          <div className="mt-1 space-y-1 pl-3">
                            {link.children.map((child) => (
                              <Link
                                key={`${child.label}-${child.href}`}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ChevronDown({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M4 4l12 12M16 4L4 16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 5h14M3 10h14M3 15h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

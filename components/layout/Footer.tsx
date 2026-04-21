import Link from "next/link";
import Image from "next/image";
import {
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { footerContent } from "@/data/footer";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIconMap = {
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
  } as const;

  const contactIconMap = {
    phone: FaPhone,
    email: FaEnvelope,
    location: FaMapMarkerAlt,
  } as const;

  return (
    <footer className="border-t border-white/8 bg-surface-925/82">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={footerContent.logoPath}
                alt={`${footerContent.brandName} logo`}
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-cover"
              />
              <span className="text-lg font-semibold text-white">
                {footerContent.brandName}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {footerContent.tagline}
            </p>
            <div className="flex items-center gap-2">
              {footerContent.socials.map((social) => {
                const SocialIcon = socialIconMap[social.platform];
                return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <SocialIcon size={16} aria-hidden="true" />
                </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {footerContent.contactTitle}
            </h3>
            <ul className="space-y-3">
              {footerContent.contactItems.map((item) => {
                const ContactIcon = contactIconMap[item.icon];
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        <ContactIcon className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item.value}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-2.5 text-sm text-slate-400">
                        <ContactIcon className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item.value}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {footerContent.usefulInfoTitle}
            </h3>
            <ul className="space-y-3">
              {footerContent.usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <FaChevronRight size={10} aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-2">
              {footerContent.newsletter.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {footerContent.newsletter.description}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {currentYear} {footerContent.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerContent.bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

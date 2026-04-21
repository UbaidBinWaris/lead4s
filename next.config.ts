import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't reveal the stack in "X-Powered-By" header.
  poweredByHeader: false,

  // Allow next/image to optimise images stored under public/wp-content/...
  // and the one external host captured during the lead4s.com image scrape.
  images: {
    remotePatterns: [
      // External: Wikimedia Commons (world-map SVG captured from lead4s.com)
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
    ],
    // Unoptimised SVGs must be handled via <img>, not next/image.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enforce React strict mode for catching side-effects early.
  reactStrictMode: true,

  // Compress responses with gzip.
  compress: true,

  // Prisma is a Node.js-only package — don't attempt to bundle it for the
  // browser or edge runtimes.
  serverExternalPackages: ["@prisma/client"],

  // HTTP security headers applied to every page/route.
  // The proxy.ts file also adds these at the edge, so this acts as a fallback
  // for responses that bypass the proxy (e.g. static exports, CDN hits).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // HSTS is set conditionally in proxy.ts (only when NEXT_PUBLIC_SITE_URL
          // uses https://). Omitting it here avoids forcing HTTPS on HTTP-only
          // deployments and prevents browsers from caching an HSTS policy that
          // would break local dev on the same hostname.
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't reveal the stack in "X-Powered-By" header.
  poweredByHeader: false,

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
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

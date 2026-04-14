import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? null;

function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";

  const directives: string[] = [
    "default-src 'self'",
    // Nonce-based strict scripts; 'strict-dynamic' propagates trust to
    // dynamically loaded scripts without needing 'unsafe-inline'.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // Framer Motion, Tailwind, and React use style attributes at runtime, so
    // 'unsafe-inline' is required here. A nonce alone cannot cover these.
    "style-src 'self' 'unsafe-inline'",
    // next/font/google downloads fonts to self at build time.
    "font-src 'self' data:",
    // Blob / data URIs needed for Three.js canvas snapshots.
    "img-src 'self' blob: data: https:",
    // Allow embedded Google Maps iframe on the career page.
    "frame-src 'self' https://www.google.com https://maps.google.com",
    // WebGL worker blobs used by Three.js / react-three-fiber.
    "worker-src blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Clickjacking prevention.
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID();
  const csp = buildCsp(nonce);

  // ── Pass nonce + CSP to server components via request headers ──────────
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // ── Security response headers ──────────────────────────────────────────
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // ── CORS for API routes ────────────────────────────────────────────────
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin") ?? "";
    const allowedOrigin =
      ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN ? origin : "null";

    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "86400");

    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    {
      // Apply to all paths except static assets and image optimization.
      // eslint-disable-next-line unicorn/prefer-string-raw
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import geoip from "geoip-lite";

const ADMIN_AUTH_COOKIE = process.env.ADMIN_AUTH_COOKIE_NAME ?? "admin_token";
const ADMIN_LOGIN = "/admin/login";

// True when CORS_ALLOWED_ORIGINS contains a bare "*" entry — means allow all origins.
const CORS_ALLOW_ALL = (process.env.CORS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .includes("*");

function normalizeOrigin(value: string): string | null {
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed || trimmed === "*") return null;
  try {
    return new URL(trimmed).origin;
  } catch {
    return null;
  }
}

function configuredOrigins(): Set<string> {
  const fromSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const fromList = process.env.CORS_ALLOWED_ORIGINS ?? "";

  const origins = [fromSiteUrl, ...fromList.split(",")]
    .map((value) => normalizeOrigin(value))
    .filter((value): value is string => Boolean(value));

  return new Set(origins);
}

const ALLOWED_ORIGINS = configuredOrigins();

function jwtSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET env var");
  return new TextEncoder().encode(s);
}

function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

const IS_HTTPS = process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ?? false;

function isAllowedRequestOrigin(request: NextRequest, requestOrigin: string): boolean {
  if (!requestOrigin) return false;

  if (CORS_ALLOW_ALL) return true;

  // Compare against the actual client-facing origin (request.url), not
  // request.nextUrl.origin which may be rewritten to an internal host.
  try {
    const requestHost = new URL(request.url).origin;
    if (requestOrigin === requestHost) return true;
  } catch {
    // fall through to allowlist check
  }

  return ALLOWED_ORIGINS.has(requestOrigin);
}

function buildCsp(): string {
  const dev = process.env.NODE_ENV === "development";
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' blob: data: https:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "worker-src blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];
  if (IS_HTTPS) directives.push("upgrade-insecure-requests");
  return directives.join("; ");
}

async function enforceAdminAuth(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname)) return null;

  // Login page itself — check if already authed (redirect away from login)
  if (pathname === ADMIN_LOGIN) {
    const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
    if (token) {
      try {
        await jwtVerify(token, jwtSecret());
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Expired/invalid — let them see login
      }
    }
    return null;
  }

  const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
  }

  try {
    await jwtVerify(token, jwtSecret());
    return null;
  } catch {
    const res = NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
    res.cookies.delete(ADMIN_AUTH_COOKIE);
    return res;
  }
}

function getClientCountry(request: NextRequest): string {
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("cloudfront-viewer-country") ||
    request.headers.get("x-country-code");

  if (countryHeader) {
    return countryHeader.trim().toUpperCase();
  }

  // @ts-ignore - NextRequest on edge/Vercel includes request.geo
  const geoCountry = request.geo?.country;
  if (typeof geoCountry === "string" && geoCountry) {
    return geoCountry.trim().toUpperCase();
  }

  // Fallback: Perform offline IP Geo lookup on client IP address passed by Nginx/proxy
  const xff = request.headers.get("x-forwarded-for");
  const rawIp = xff ? xff.split(",")[0].trim() : request.headers.get("x-real-ip");
  const ip = rawIp ? rawIp.replace(/^::ffff:/, "") : "";

  if (ip && ip !== "127.0.0.1" && ip !== "::1") {
    try {
      const geo = geoip.lookup(ip);
      if (geo && geo.country) {
        return geo.country.trim().toUpperCase();
      }
    } catch {
      // Ignore lookup errors
    }
  }

  return "";
}

function handleGeoMaintenance(request: NextRequest): NextResponse | null {
  const enabled = (process.env.GEO_MAINTENANCE_ENABLED ?? "false") === "true";
  if (!enabled) return null;

  const blockedCountriesRaw = process.env.GEO_MAINTENANCE_COUNTRIES ?? "US,CA";
  const blockedCountries = new Set(
    blockedCountriesRaw.split(",").map((c) => c.trim().toUpperCase())
  );

  const clientCountry = getClientCountry(request);

  if (clientCountry && blockedCountries.has(clientCountry)) {
    const mode = process.env.GEO_MAINTENANCE_MODE ?? "503";

    if (mode === "500") {
      return new NextResponse(null, { status: 500, statusText: "Internal Server Error" });
    }

    if (mode === "raw") {
      return new NextResponse(null, { status: 503, statusText: "Service Unavailable" });
    }

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>503 Service Unavailable</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .error-card {
      text-align: center;
      padding: 2.5rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      max-width: 440px;
      width: 90%;
    }
    .error-code {
      font-size: 3.5rem;
      font-weight: 800;
      color: #ef4444;
      margin: 0 0 0.5rem 0;
      line-height: 1;
    }
    .error-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: #f1f5f9;
    }
    .error-msg {
      font-size: 0.95rem;
      color: #94a3b8;
      margin: 0;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="error-card">
    <div class="error-code">503</div>
    <div class="error-title">Service Unavailable</div>
    <div class="error-msg">This website is temporarily unavailable in your region for scheduled maintenance. Please check back later.</div>
  </div>
</body>
</html>`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Retry-After": "3600",
        },
      }
    );
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const geoResponse = handleGeoMaintenance(request);
  if (geoResponse) return geoResponse;

  const { pathname } = request.nextUrl;

  const authRedirect = await enforceAdminAuth(request);
  if (authRedirect) return authRedirect;

  const csp = buildCsp();

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: reqHeaders } });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  if (IS_HTTPS) {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin") ?? "";
    const allowOrigin = isAllowedRequestOrigin(request, origin) ? origin : "";

    if (allowOrigin) {
      response.headers.set("Access-Control-Allow-Origin", allowOrigin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set("Vary", "Origin");
    }

    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      request.headers.get("access-control-request-headers") ?? "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Max-Age", "86400");

    if (request.method === "OPTIONS") {
      if (origin && !allowOrigin) {
        return NextResponse.json({ error: "CORS origin not allowed" }, { status: 403 });
      }
      return new NextResponse(null, { status: 204, headers: response.headers });
    }
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

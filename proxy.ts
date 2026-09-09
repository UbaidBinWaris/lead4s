import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

async function getCountryFromIp(ip: string): Promise<string> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return "";
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      cache: "force-cache",
    });
    if (res.ok) {
      const data = (await res.json()) as { countryCode?: string };
      return data.countryCode ?? "";
    }
  } catch {
    // Ignore fetch errors
  }
  return "";
}

async function checkBlockUsCa(request: NextRequest): Promise<NextResponse | null> {
  if (process.env.BLOCK_US_CA !== "true") return null;

  let country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-vercel-ip-country");

  if (!country) {
    const xff = request.headers.get("x-forwarded-for");
    const rawIp = xff ? xff.split(",")[0].trim() : request.headers.get("x-real-ip");
    const ip = rawIp ? rawIp.replace(/^::ffff:/, "") : "";
    if (ip) {
      country = await getCountryFromIp(ip);
    }
  }

  if (country && ["US", "CA"].includes(country.trim().toUpperCase())) {
    const mode = process.env.BLOCK_US_CA_MODE ?? "browser_error";

    // Mode 'raw': empty status 500 response so browser renders native "Unable to connect"
    if (mode === "raw") {
      return new NextResponse(null, { status: 500, statusText: "Internal Server Error" });
    }

    // Default 'browser_error': Realistic Chrome/Firefox "This site can't be reached" error screen
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lead4s.com</title>
  <style>
    body {
      background-color: #202124;
      color: #e8eaed;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .main-frame {
      max-width: 560px;
      padding: 32px;
      box-sizing: border-box;
    }
    .icon {
      width: 48px;
      height: 48px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 16px 0;
      color: #e8eaed;
      line-height: 1.25;
    }
    p {
      font-size: 15px;
      color: #9aa0a6;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    ul {
      margin: 0 0 24px 0;
      padding-left: 20px;
      color: #9aa0a6;
      font-size: 14px;
      line-height: 1.8;
    }
    .error-code {
      font-size: 12px;
      color: #9aa0a6;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin-top: 28px;
    }
  </style>
</head>
<body>
  <div class="main-frame">
    <svg class="icon" viewBox="0 0 24 24" fill="#9aa0a6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <h1>This site can’t be reached</h1>
    <p><strong>lead4s.com</strong> refused to connect.</p>
    <p>Try:</p>
    <ul>
      <li>Checking the connection</li>
      <li>Checking the proxy and the firewall</li>
    </ul>
    <div class="error-code">ERR_CONNECTION_REFUSED</div>
  </div>
</body>
</html>`,
      {
        status: 500,
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }
    );
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const blockResponse = await checkBlockUsCa(request);
  if (blockResponse) return blockResponse;

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

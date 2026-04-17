import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_AUTH_COOKIE = process.env.ADMIN_AUTH_COOKIE_NAME ?? "admin_token";
const ADMIN_LOGIN = "/admin/login";
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? null;

function jwtSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET env var");
  return new TextEncoder().encode(s);
}

function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function buildCsp(nonce: string): string {
  const dev = process.env.NODE_ENV === "development";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' blob: data: https:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "worker-src blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authRedirect = await enforceAdminAuth(request);
  if (authRedirect) return authRedirect;

  const nonce = crypto.randomUUID();
  const csp = buildCsp(nonce);

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-nonce", nonce);
  reqHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: reqHeaders } });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin") ?? "";
    const allowOrigin = ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN ? origin : "null";
    response.headers.set("Access-Control-Allow-Origin", allowOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "86400");

    if (request.method === "OPTIONS") {
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

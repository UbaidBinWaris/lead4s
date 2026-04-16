import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const COOKIE = process.env.ADMIN_AUTH_COOKIE_NAME ?? "admin_token";

const BodySchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

function jwtSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET");
  return new TextEncoder().encode(s);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = BodySchema.parse(body);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(jwtSecret());

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

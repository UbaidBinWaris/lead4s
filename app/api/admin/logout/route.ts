import { NextResponse } from "next/server";

const COOKIE = process.env.ADMIN_AUTH_COOKIE_NAME ?? "admin_token";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE);
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional().default("footer"),
});

/** Pull the real client IP from common proxy headers */
function getClientIp(req: NextRequest): string | null {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ?? // Cloudflare
    null
  );
}

// POST /api/newsletter — subscribe
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 422 }
      );
    }

    const { email, source } = parsed.data;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") ?? null;

    await db.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true, source, ipAddress, userAgent },
      create: { email, source, ipAddress, userAgent },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[newsletter] POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/newsletter — list subscribers (admin)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const active = searchParams.get("active");

  const where =
    active === "true"  ? { isActive: true }  :
    active === "false" ? { isActive: false } :
    {};

  const [subscribers, total] = await Promise.all([
    db.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    db.newsletterSubscriber.count({ where }),
  ]);

  return NextResponse.json({ subscribers, total, page, limit });
}

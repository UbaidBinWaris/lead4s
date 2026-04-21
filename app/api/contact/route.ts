import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Invalid email address"),
  phone:   z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    null
  );
}

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 422 }
      );
    }

    await db.contactMessage.create({
      data: {
        ...parsed.data,
        ipAddress: getIp(req),
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[contact] POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
  const limit = Math.min(200, parseInt(searchParams.get("limit") ?? "50"));
  const from  = searchParams.get("from");
  const to    = searchParams.get("to");
  const q     = searchParams.get("q")?.toLowerCase();

  const where = {
    ...(from || to ? {
      createdAt: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to   ? { lte: new Date(`${to}T23:59:59.999Z`) } : {}),
      },
    } : {}),
  };

  const [messages, total] = await Promise.all([
    db.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    db.contactMessage.count({ where }),
  ]);

  const filtered = q
    ? messages.filter((m) =>
        m.email.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q)
      )
    : messages;

  return NextResponse.json({ messages: filtered, total, page, limit });
}

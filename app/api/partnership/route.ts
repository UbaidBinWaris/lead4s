import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  companyName:   z.string().min(2, "Company name is required"),
  contactName:   z.string().min(2, "Contact name is required"),
  email:         z.string().email("Invalid email address"),
  phone:         z.string().optional(),
  website:       z.string().url("Enter a valid URL").optional().or(z.literal("")),
  vertical:      z.string().min(1, "Please select a vertical"),
  monthlyVolume: z.string().optional(),
  message:       z.string().optional(),
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

    await db.partnershipApplication.create({
      data: {
        ...parsed.data,
        website:   parsed.data.website || null,
        ipAddress: getIp(req),
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[partnership] POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
  const limit = Math.min(200, parseInt(searchParams.get("limit") ?? "50"));
  const from  = searchParams.get("from");  // ISO date string
  const to    = searchParams.get("to");    // ISO date string
  const q     = searchParams.get("q")?.toLowerCase();

  const where = {
    ...(from || to ? {
      createdAt: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to   ? { lte: new Date(`${to}T23:59:59.999Z`) } : {}),
      },
    } : {}),
  };

  const [applications, total] = await Promise.all([
    db.partnershipApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    db.partnershipApplication.count({ where }),
  ]);

  // Client-side search filter (small datasets)
  const filtered = q
    ? applications.filter((a) =>
        a.email.toLowerCase().includes(q) ||
        a.companyName.toLowerCase().includes(q) ||
        a.contactName.toLowerCase().includes(q)
      )
    : applications;

  return NextResponse.json({ applications: filtered, total, page, limit });
}

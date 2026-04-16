import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/industries/by-slug/:slug
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  try {
    const industry = await db.industry.findUnique({ where: { slug } });
    if (!industry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(industry);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch industry" },
      { status: 500 }
    );
  }
}

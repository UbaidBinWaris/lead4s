import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/solutions/by-slug/:slug
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  try {
    const solution = await db.industry.findFirst({ where: { slug, type: "solution" } });
    if (!solution) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(solution);
  } catch {
    return NextResponse.json({ error: "Failed to fetch solution" }, { status: 500 });
  }
}

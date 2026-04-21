import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/admin/media
 * Returns all scraped images stored in media_images.
 * Query params:
 *   ?q=solar        — filter by path substring
 *   ?limit=50       — max results (default 100)
 *   ?offset=0       — pagination offset
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? "";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100"), 500);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const where = q
    ? { path: { contains: q, mode: "insensitive" as const } }
    : {};

  const [images, total] = await Promise.all([
    db.mediaImage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    db.mediaImage.count({ where }),
  ]);

  return NextResponse.json({ images, total, limit, offset });
}

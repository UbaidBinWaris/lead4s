import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export const runtime = "nodejs";

async function ensureUniqueSlug(base: string): Promise<string> {
  const normalized = slugify(base);
  let candidate = normalized;
  let suffix = 2;

  // Keep incrementing suffix until we find a free slug.
  while (candidate) {
    const existing = await db.caseStudy.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing) return candidate;
    candidate = `${normalized}-${suffix}`;
    suffix += 1;
  }

  return `case-study-${Date.now()}`;
}

export async function GET() {
  try {
    const caseStudies = await db.caseStudy.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(caseStudies, { status: 200 });
  } catch (error) {
    console.error("[case-studies/GET]", error);
    return NextResponse.json({ message: "Failed to load case studies." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, industry, summary, challenge, solution, results, content, coverImage, isPublished, displayOrder } = body;

    if (!title || !industry || !summary || !challenge || !solution) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const uniqueSlug = await ensureUniqueSlug(slug || title);

    const caseStudy = await db.caseStudy.create({
      data: {
        title,
        slug: uniqueSlug,
        industry,
        summary,
        challenge,
        solution,
        results: results ?? [],
        content: content ?? [],
        coverImage: coverImage ?? null,
        isPublished: isPublished ?? true,
        displayOrder: displayOrder ?? 0,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error("[case-studies/POST]", error);
    return NextResponse.json({ message: "Failed to create case study." }, { status: 500 });
  }
}

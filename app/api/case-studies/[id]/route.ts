import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export const runtime = "nodejs";

async function ensureUniqueSlug(base: string, idToExclude: string): Promise<string> {
  const normalized = slugify(base);
  let candidate = normalized;
  let suffix = 2;

  while (candidate) {
    const existing = await db.caseStudy.findFirst({
      where: { slug: candidate, NOT: { id: idToExclude } },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${normalized}-${suffix}`;
    suffix += 1;
  }

  return `case-study-${Date.now()}`;
}

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const caseStudy = await db.caseStudy.findUnique({ where: { id } });
    if (!caseStudy) return NextResponse.json({ message: "Not found." }, { status: 404 });
    return NextResponse.json(caseStudy, { status: 200 });
  } catch (error) {
    console.error("[case-studies/[id]/GET]", error);
    return NextResponse.json({ message: "Failed." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, slug, industry, summary, challenge, solution, results, content, coverImage, isPublished, displayOrder } = body;

    if (!title || !industry || !summary || !challenge || !solution) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const uniqueSlug = await ensureUniqueSlug(slug || title, id);

    const updated = await db.caseStudy.update({
      where: { id },
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

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("[case-studies/[id]/PUT]", error);
    return NextResponse.json({ message: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await db.caseStudy.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[case-studies/[id]/DELETE]", error);
    return NextResponse.json({ message: "Failed to delete." }, { status: 500 });
  }
}

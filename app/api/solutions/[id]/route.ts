import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const SectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), title: z.string(), content: z.string() }),
  z.object({
    type: z.literal("features"),
    title: z.string().optional(),
    items: z.array(
      z.object({ icon: z.string().optional(), title: z.string(), description: z.string() })
    ),
  }),
  z.object({ type: z.literal("image"), src: z.string(), alt: z.string().optional(), caption: z.string().optional() }),
  z.object({
    type: z.literal("cta"),
    heading: z.string(),
    subheading: z.string().optional(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
  }),
]);

const SolutionUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  content: z.array(SectionSchema).optional(),
  coverImage: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/solutions/:id
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const solution = await db.industry.findFirst({ where: { id, type: "solution" } });
    if (!solution) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(solution);
  } catch {
    return NextResponse.json({ error: "Failed to fetch solution" }, { status: 500 });
  }
}

// PUT /api/solutions/:id
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data = SolutionUpdateSchema.parse(body);

    const solution = await db.industry.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.content !== undefined && { content: data.content as object[] }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
      },
    });

    return NextResponse.json(solution);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update solution" }, { status: 500 });
  }
}

// DELETE /api/solutions/:id
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    await db.industry.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Failed to delete solution" }, { status: 500 });
  }
}

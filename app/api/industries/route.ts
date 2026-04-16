import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// ---------------------------------------------------------------------------
// Shared Zod schema for section validation
// ---------------------------------------------------------------------------
const SectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    title: z.string(),
    content: z.string(),
  }),
  z.object({
    type: z.literal("features"),
    title: z.string().optional(),
    items: z.array(
      z.object({
        icon: z.string().optional(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
  z.object({
    type: z.literal("image"),
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("cta"),
    heading: z.string(),
    subheading: z.string().optional(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
  }),
]);

const IndustrySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  content: z.array(SectionSchema),
  coverImage: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

// ---------------------------------------------------------------------------
// GET /api/industries — list all
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const industries = await db.industry.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(industries);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch industries" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/industries — create
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = IndustrySchema.parse(body);

    const industry = await db.industry.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description ?? null,
        content: data.content as object[],
        coverImage: data.coverImage ?? null,
        isPublished: data.isPublished ?? true,
        displayOrder: data.displayOrder ?? 0,
      },
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create industry" },
      { status: 500 }
    );
  }
}

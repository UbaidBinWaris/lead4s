import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const BlogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().nullable().optional(),
  author: z.string().min(1).optional(),
});

export async function GET() {
  try {
    const blogs = await db.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = BlogSchema.parse(body);

    const blog = await db.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage ?? null,
        author: data.author ?? "Admin",
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

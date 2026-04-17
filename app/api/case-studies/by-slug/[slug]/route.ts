import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  try {
    const caseStudy = await db.caseStudy.findUnique({ where: { slug } });
    if (!caseStudy) return NextResponse.json({ message: "Not found." }, { status: 404 });
    return NextResponse.json(caseStudy, { status: 200 });
  } catch (error) {
    console.error("[case-studies/by-slug/GET]", error);
    return NextResponse.json({ message: "Failed." }, { status: 500 });
  }
}

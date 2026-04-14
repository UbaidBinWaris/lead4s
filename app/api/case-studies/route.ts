import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const caseStudies = await db.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return Response.json({ caseStudies }, { status: 200 });
  } catch (error) {
    console.error("[case-studies/GET]", error);
    return Response.json(
      { message: "Unable to load case studies right now." },
      { status: 500 }
    );
  }
}

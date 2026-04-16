import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [totalBlogs, blogsThisMonth, totalJobApplications, totalCaseStudies] =
      await Promise.all([
        db.blog.count(),
        db.blog.count({
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
        db.jobApplication.count(),
        db.caseStudy.count(),
      ]);

    return NextResponse.json({
      totalBlogs,
      blogsThisMonth,
      totalJobApplications,
      totalCaseStudies,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

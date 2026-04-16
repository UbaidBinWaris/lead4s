import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const applications = await db.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

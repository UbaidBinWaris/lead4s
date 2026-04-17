import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const TeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  initials: z.string().min(1).max(4),
  gradient: z.string().min(1),
  linkedin: z.string().nullable().optional(),
  twitter: z.string().nullable().optional(),
  position: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json(members);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = TeamMemberSchema.parse(body);

    const member = await db.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        initials: data.initials,
        gradient: data.gradient,
        linkedin: data.linkedin ?? null,
        twitter: data.twitter ?? null,
        position: data.position ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

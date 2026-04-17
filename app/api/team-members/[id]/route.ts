import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const TeamMemberUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  initials: z.string().min(1).max(4).optional(),
  gradient: z.string().min(1).optional(),
  linkedin: z.string().nullable().optional(),
  twitter: z.string().nullable().optional(),
  position: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const member = await db.teamMember.findUnique({ where: { id } });
    if (!member) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data = TeamMemberUpdateSchema.parse(body);

    const member = await db.teamMember.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.role !== undefined && { role: data.role }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.initials !== undefined && { initials: data.initials }),
        ...(data.gradient !== undefined && { gradient: data.gradient }),
        ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
        ...(data.twitter !== undefined && { twitter: data.twitter }),
        ...(data.position !== undefined && { position: data.position }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    return NextResponse.json(member);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    await db.teamMember.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}

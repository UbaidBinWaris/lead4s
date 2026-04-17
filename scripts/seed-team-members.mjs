// @ts-check
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Chief Executive Officer",
    bio: "15 years in performance marketing. Previously VP Growth at two Inc. 500 companies.",
    initials: "AR",
    gradient: "from-brand-600 to-brand-800",
    linkedin: "#",
    twitter: "#",
    position: 1,
  },
  {
    name: "Jordan Kim",
    role: "Chief Technology Officer",
    bio: "Built real-time data pipelines at scale. Former engineering lead at a Fortune 500 data company.",
    initials: "JK",
    gradient: "from-violet-600 to-violet-800",
    linkedin: "#",
    twitter: "#",
    position: 2,
  },
  {
    name: "Taylor Moss",
    role: "VP of Compliance",
    bio: "TCPA and consumer protection attorney. Ensures every campaign meets the highest legal standards.",
    initials: "TM",
    gradient: "from-emerald-600 to-emerald-800",
    linkedin: "#",
    twitter: null,
    position: 3,
  },
  {
    name: "Morgan Chen",
    role: "VP of Partner Success",
    bio: "Manages relationships with 500+ active partners. Obsessed with reducing CPL for every account.",
    initials: "MC",
    gradient: "from-accent-500 to-accent-700",
    linkedin: "#",
    twitter: "#",
    position: 4,
  },
  {
    name: "Sam Patel",
    role: "Head of Media & Acquisition",
    bio: "Runs all owned media funnels - paid search, social, and programmatic across 50 states.",
    initials: "SP",
    gradient: "from-sky-600 to-sky-800",
    linkedin: "#",
    twitter: "#",
    position: 5,
  },
  {
    name: "Casey Walker",
    role: "Head of Call Center Ops",
    bio: "Oversees live transfer and appointment setting operations. Former Convergys senior manager.",
    initials: "CW",
    gradient: "from-rose-600 to-rose-800",
    linkedin: "#",
    twitter: null,
    position: 6,
  },
];

async function main() {
  console.log("Seeding team members...");

  for (const member of teamMembers) {
    const existing = await db.teamMember.findFirst({
      where: { name: member.name },
    });

    if (existing) {
      await db.teamMember.update({
        where: { id: existing.id },
        data: {
          role: member.role,
          bio: member.bio,
          initials: member.initials,
          gradient: member.gradient,
          linkedin: member.linkedin,
          twitter: member.twitter,
          position: member.position,
          isActive: true,
        },
      });
    } else {
      await db.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          initials: member.initials,
          gradient: member.gradient,
          linkedin: member.linkedin,
          twitter: member.twitter,
          position: member.position,
          isActive: true,
        },
      });
    }

    console.log(`  Upserted: ${member.name}`);
  }

  console.log("Team member seed complete.");
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await db.$disconnect();
}

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { applicationSchema } from "@/lib/validations/career";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_RESUME_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// ── In-memory rate limiter ─────────────────────────────────────────────────
// Sufficient for a single-instance deployment. Replace with Redis for
// multi-instance / edge deployments.
const requestWindowByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestWindowByIp.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestWindowByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestWindowByIp.set(ip, recent);
  return false;
}

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function getTextField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function sanitize(value: string): string {
  return value.replaceAll(/[<>]/g, "").replaceAll(/\s+/g, " ").trim();
}

function safeFileName(name: string): string {
  return name.toLowerCase().replaceAll(/[^a-z0-9._-]/g, "-");
}

// Stored OUTSIDE public/ so files are not directly served.
// Override with env.UPLOAD_DIR in production (e.g. a mounted volume).
function uploadsDir(): string {
  return env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads", "resumes");
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request);

    if (isRateLimited(ip)) {
      return Response.json(
        { message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const parsed = applicationSchema.safeParse({
      fullName: getTextField(formData, "fullName"),
      email: getTextField(formData, "email"),
      phone: getTextField(formData, "phone"),
      position: getTextField(formData, "position"),
      coverLetter: getTextField(formData, "coverLetter"),
    });

    if (!parsed.success) {
      return Response.json(
        {
          message:
            parsed.error.issues[0]?.message ??
            "Please check the submitted data.",
        },
        { status: 400 }
      );
    }

    const resumeFile = formData.get("resumeFile");
    if (!(resumeFile instanceof File)) {
      return Response.json(
        { message: "Resume upload is required." },
        { status: 400 }
      );
    }

    if (resumeFile.size <= 0 || resumeFile.size > MAX_RESUME_FILE_SIZE) {
      return Response.json(
        { message: "Resume file must be between 1 byte and 5 MB." },
        { status: 400 }
      );
    }

    const extension = path.extname(resumeFile.name).toLowerCase();
    if (!ALLOWED_RESUME_EXTENSIONS.has(extension)) {
      return Response.json(
        { message: "Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 }
      );
    }

    if (!ALLOWED_RESUME_MIME_TYPES.has(resumeFile.type)) {
      return Response.json(
        { message: "Invalid resume file type." },
        { status: 400 }
      );
    }

    // ── Persist resume file outside public/ ─────────────────────────────
    const dir = uploadsDir();
    await mkdir(dir, { recursive: true });

    const baseName = safeFileName(path.basename(resumeFile.name, extension));
    const storedFileName = `${Date.now()}-${baseName}-${randomUUID()}${extension}`;
    const storedFilePath = path.join(dir, storedFileName);
    const resumePath = path.join("uploads", "resumes", storedFileName);

    await writeFile(
      storedFilePath,
      Buffer.from(await resumeFile.arrayBuffer())
    );

    // ── Persist application via Prisma ───────────────────────────────────
    const data = parsed.data;

    await db.jobApplication.create({
      data: {
        fullName: sanitize(data.fullName),
        email: sanitize(data.email),
        phone: data.phone ? sanitize(data.phone) : null,
        position: sanitize(data.position),
        resumePath,
        coverLetter: sanitize(data.coverLetter),
        ipAddress: ip === "unknown" ? null : ip,
      },
    });

    return Response.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[careers/POST]", error);

    return Response.json(
      { message: "Server error while submitting application." },
      { status: 500 }
    );
  }
}

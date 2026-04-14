import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
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

const requestWindowByIp = new Map<string, number[]>();

let pool: Pool | null = null;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }

  return pool;
}

function sanitizeInput(value: string) {
  return value.replaceAll(/[<>]/g, "").replaceAll(/\s+/g, " ").trim();
}

function sanitizeFileName(value: string) {
  return value.toLowerCase().replaceAll(/[^a-z0-9._-]/g, "-");
}

function getTextField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestWindowByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestWindowByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestWindowByIp.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
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
            parsed.error.issues[0]?.message ?? "Please check the submitted data.",
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
        { message: "Resume file must be between 1 byte and 5MB." },
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

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadsDir, { recursive: true });

    const safeName = sanitizeFileName(path.basename(resumeFile.name, extension));
    const storedFileName = `${Date.now()}-${safeName}-${randomUUID()}${extension}`;
    const storedFilePath = path.join(uploadsDir, storedFileName);
    const storedResumeUrl = `/uploads/resumes/${storedFileName}`;

    const bytes = await resumeFile.arrayBuffer();
    await writeFile(storedFilePath, Buffer.from(bytes));

    const data = parsed.data;
    const db = getPool();

    await db.query(
      `
      INSERT INTO job_applications (
        full_name,
        email,
        phone,
        position,
        resume,
        cover_letter
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        sanitizeInput(data.fullName),
        sanitizeInput(data.email),
        data.phone ? sanitizeInput(data.phone) : null,
        sanitizeInput(data.position),
        storedResumeUrl,
        sanitizeInput(data.coverLetter),
      ]
    );

    return Response.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Career application API error", error);

    return Response.json(
      { message: "Server error while submitting application." },
      { status: 500 }
    );
  }
}

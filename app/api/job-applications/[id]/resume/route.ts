import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appId = Number(id);

    if (isNaN(appId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const application = await db.jobApplication.findUnique({ where: { id: appId } });
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const storedPath = application.resumePath.replaceAll("\\", "/");
    const fileNameOnly = path.basename(storedPath);
    const filePath = path.join(process.cwd(), "uploads", "resumes", fileNameOnly);

    try {
      await stat(filePath);
    } catch {
      return NextResponse.json({ error: "Resume file not found on disk" }, { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    const contentType = mimeTypes[ext] ?? "application/octet-stream";
    const fileName = `resume-${application.fullName.replace(/\s+/g, "-").toLowerCase()}${ext}`;

    const stream = createReadStream(filePath);
    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to serve resume" }, { status: 500 });
  }
}

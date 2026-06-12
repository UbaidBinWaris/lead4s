import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Zod schema for validating the incoming payload.
// All fields map to the database columns (camelCase).
const buyerLeadSchema = z.object({
  trackdriveNumber: z.string().min(1, "Trackdrive Number is required"),
  trafficSourceId:  z.string().min(1, "Traffic Source ID is required"),
  callerId:         z.string().min(1, "Caller Number (Phone) is required"),
  pingId:           z.string().optional().nullable(),
});

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    null
  );
}

// Map db fields to Trackdrive snake_case API payload fields
function mapToTrackdrivePayload(data: Record<string, any>): Record<string, any> {
  const mapping: Record<string, string> = {
    trackdriveNumber: "trackdrive_number",
    trafficSourceId: "traffic_source_id",
    callerId: "caller_id",
    pingId: "ping_id",
  };

  const payload: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || value === "") continue;
    const targetKey = mapping[key] || key;
    payload[targetKey] = value;
  }
  return payload;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = buyerLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 422 }
      );
    }

    const ipAddress = getIp(req);
    const userAgent = req.headers.get("user-agent") ?? null;

    // 1. Save info in the db
    const lead = await db.buyerLead.create({
      data: {
        trackdriveNumber: parsed.data.trackdriveNumber,
        trafficSourceId: parsed.data.trafficSourceId,
        callerId: parsed.data.callerId,
        pingId: parsed.data.pingId,
        ipAddress,
        userAgent,
        status: parsed.data.pingId ? "ping_success" : "pending",
      },
    });

    // If manual pingId is provided, bypass the Trackdrive PING API call
    if (parsed.data.pingId) {
      return NextResponse.json(
        {
          success: true,
          lead,
          trackdriveResponse: {
            success: true,
            status: "accepted",
            try_all_buyers_ping_id: parsed.data.pingId,
          },
        },
        { status: 200 }
      );
    }

    // 2. Prepare the Trackdrive PING request payload
    const tdPayload = mapToTrackdrivePayload(parsed.data);

    // Call Trackdrive PING endpoint
    const trackdrivePingUrl = new URL(
      "https://lead4s-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_aca_agents"
    );

    // Append to query string for reliability
    Object.entries(tdPayload).forEach(([key, val]) => {
      trackdrivePingUrl.searchParams.append(key, String(val));
    });

    let pingResponseData: any = null;
    let newStatus = "ping_failed";

    try {
      const pingRes = await fetch(trackdrivePingUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(tdPayload),
      });

      pingResponseData = await pingRes.json();
      if (pingRes.ok && pingResponseData.success) {
        newStatus = "ping_success";
      } else {
        newStatus = "ping_failed";
      }
    } catch (fetchErr: any) {
      console.error("[buyer-form] Trackdrive PING fetch error:", fetchErr);
      pingResponseData = {
        success: false,
        status: "error",
        errors: [fetchErr.message ?? "Failed to connect to Trackdrive PING API"],
      };
      newStatus = "ping_failed";
    }

    // Update the DB record with the ping response
    const updatedLead = await db.buyerLead.update({
      where: { id: lead.id },
      data: {
        status: newStatus,
        pingResponse: pingResponseData,
        pingId: pingResponseData?.try_all_buyers_ping_id ?? pingResponseData?.try_all_buyers?.ping_id ?? null,
      },
    });

    return NextResponse.json(
      {
        success: newStatus === "ping_success",
        lead: updatedLead,
        trackdriveResponse: pingResponseData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[buyer-form] POST handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit = Math.min(200, parseInt(searchParams.get("limit") ?? "50"));
    const from  = searchParams.get("from");
    const to    = searchParams.get("to");
    const q     = searchParams.get("q")?.toLowerCase();

    const where = {
      ...(from || to ? {
        createdAt: {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to   ? { lte: new Date(`${to}T23:59:59.999Z`) } : {}),
        },
      } : {}),
      ...(q ? {
        OR: [
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { callerId: { contains: q, mode: "insensitive" } },
          { trackdriveNumber: { contains: q, mode: "insensitive" } },
          { status: { contains: q, mode: "insensitive" } },
        ],
      } : {}),
    } as any;

    const [leads, total] = await Promise.all([
      db.buyerLead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      db.buyerLead.count({ where }),
    ]);

    return NextResponse.json({ leads, total, page, limit });
  } catch (err) {
    console.error("[buyer-form] GET handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


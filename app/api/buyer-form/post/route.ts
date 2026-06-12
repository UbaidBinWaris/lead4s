import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Map db fields to Trackdrive snake_case API payload fields
function mapToTrackdrivePayload(lead: any): Record<string, any> {
  const mapping: Record<string, string> = {
    trackdriveNumber: "trackdrive_number",
    trafficSourceId: "traffic_source_id",
    callerId: "caller_id",
    pingId: "ping_id",
  };

  const payload: Record<string, any> = {};
  for (const [key, value] of Object.entries(lead)) {
    if (value === undefined || value === null || value === "") continue;
    const targetKey = mapping[key];
    if (targetKey) {
      payload[targetKey] = value;
    }
  }
  return payload;
}

export async function POST(req: NextRequest) {
  try {
    const { leadId, pingId } = await req.json();

    if (!leadId || !pingId) {
      return NextResponse.json(
        { error: "leadId and pingId are required" },
        { status: 400 }
      );
    }

    // 1. Fetch the lead from the database
    const lead = await db.buyerLead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Update the local lead pingId if it wasn't already saved
    if (!lead.pingId || lead.pingId !== pingId) {
      lead.pingId = pingId;
    }

    // 2. Prepare the Trackdrive POST payload
    const tdPayload = mapToTrackdrivePayload(lead);
    tdPayload.ping_id = pingId;

    const trackdrivePostUrl = new URL(
      "https://lead4s-llc.trackdrive.com/api/v1/inbound_webhooks/post/check_aca_agents"
    );

    // Append to query string as well for compatibility
    Object.entries(tdPayload).forEach(([key, val]) => {
      trackdrivePostUrl.searchParams.append(key, String(val));
    });

    let postResponseData: any = null;
    let newStatus = "post_failed";

    try {
      const postRes = await fetch(trackdrivePostUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(tdPayload),
      });

      postResponseData = await postRes.json();
      if (postRes.ok && postResponseData.success) {
        newStatus = "post_success";
      } else {
        newStatus = "post_failed";
      }
    } catch (fetchErr: any) {
      console.error("[buyer-form-post] Trackdrive POST fetch error:", fetchErr);
      postResponseData = {
        success: false,
        status: "error",
        errors: [fetchErr.message ?? "Failed to connect to Trackdrive POST API"],
      };
      newStatus = "post_failed";
    }

    // Update the DB record with the post response
    const updatedLead = await db.buyerLead.update({
      where: { id: leadId },
      data: {
        status: newStatus,
        postResponse: postResponseData,
        pingId: pingId, // ensure pingId is synchronized
      },
    });

    return NextResponse.json(
      {
        success: newStatus === "post_success",
        lead: updatedLead,
        trackdriveResponse: postResponseData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[buyer-form-post] POST handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

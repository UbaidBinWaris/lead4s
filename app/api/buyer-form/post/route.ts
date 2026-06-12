import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Map db fields to Trackdrive snake_case API payload fields
function mapToTrackdrivePayload(lead: any): Record<string, any> {
  const mapping: Record<string, string> = {
    trackdriveNumber: "trackdrive_number",
    trafficSourceId: "traffic_source_id",
    callerId: "caller_id",
    firstName: "first_name",
    lastName: "last_name",
    maritalStatus: "marital_status",
    agedData: "aged_data",
    originalLeadSubmitDate: "original_lead_submit_date",
    trafficSourceAgentId: "traffic_source_agent_id",
    trafficSourceAgentRecordingUrl: "traffic_source_agent_recording_url",
    nicotineFrequency: "nicotine_frequency",
    monthsInsuredContinuously: "months_insured_continuously",
    dobYyyy: "dob_yyyy",
    spokenLanguage: "spoken_language",
    bestTimeToContact: "best_time_to_contact",
    tcpaOptinConsentLanguage: "tcpa_optin_consent_language",
    trafficSourceDataListId: "traffic_source_data_list_id",
    dobDd: "dob_dd",
    jornayaLeadid: "jornaya_leadid",
    trustedFormCertUrl: "trusted_form_cert_url",
    paymentMethodAvailable: "payment_method_available",
    trustedFormCertUrlAgent: "trusted_form_cert_url_agent",
    trafficSourcePlatform: "traffic_source_platform",
    jornayaLeadIdAgent: "jornaya_lead_id_agent",
    monthlyAffordablePaymentAmount: "monthly_affordable_payment_amount",
    eaDisposition: "ea_disposition",
    employmentStatus: "employment_status",
    insuranceAmountRequested: "insurance_amount_requested",
    currentlyInsured: "currently_insured",
    expirationDate: "expiration_date",
    childrenAges: "children_ages",
    heightInInches: "height_in_inches",
    annualIncome: "annual_income",
    insuranceCompany: "insurance_company",
    mediaType: "media_type",
    blueinkSecuredLeadsToken: "blueink_secured_leads_token",
    desiredPolicyType: "desired_policy_type",
    leadType: "lead_type",
    sourceUrl: "source_url",
    yearsInsured: "years_insured",
    permissiontrustToken: "permissiontrust_token",
    smokeOption: "smoke_option",
    monthsInsured: "months_insured",
    yearsInsuredContinuously: "years_insured_continuously",
    trafficSourceAgentName: "traffic_source_agent_name",
    medicalConditions: "medical_conditions",
    coverageType: "coverage_type",
    dobMm: "dob_mm",
    alternatePhone: "alternate_phone",
    tcpaOptIn: "tcpa_opt_in",
    voluumCid: "voluum_cid",
    retreaverCallKey: "retreaver_call_key",
    retreaverCallUuid: "retreaver_call_uuid",
    ringbaCallUuid: "ringba_call_uuid",
    trafficSourceLeadId: "traffic_source_lead_id",
    pingId: "ping_id",
  };

  const payload: Record<string, any> = {};
  for (const [key, value] of Object.entries(lead)) {
    if (value === undefined || value === null || value === "") continue;
    const targetKey = mapping[key] || key;
    payload[targetKey] = value;
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

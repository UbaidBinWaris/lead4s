import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Zod schema for validating the incoming payload.
// All fields map to the database columns (camelCase).
const buyerLeadSchema = z.object({
  trackdriveNumber:                 z.string().min(1, "Trackdrive Number is required"),
  trafficSourceId:                  z.string().min(1, "Traffic Source ID is required"),
  callerId:                         z.string().min(1, "Caller Number (Phone) is required"),
  firstName:                        z.string().optional().nullable(),
  lastName:                         z.string().optional().nullable(),
  email:                            z.string().optional().nullable(),
  state:                            z.string().optional().nullable(),
  zip:                              z.string().optional().nullable(),
  city:                             z.string().optional().nullable(),
  address:                          z.string().optional().nullable(),
  address2:                         z.string().optional().nullable(),
  gender:                           z.string().optional().nullable(),
  maritalStatus:                    z.string().optional().nullable(),
  employmentStatus:                 z.string().optional().nullable(),
  annualIncome:                     z.number().optional().nullable(),
  monthlyAffordablePaymentAmount:   z.number().optional().nullable(),
  currentlyInsured:                 z.boolean().optional().nullable(),
  insuranceCompany:                 z.string().optional().nullable(),
  yearsInsured:                     z.number().optional().nullable(),
  monthsInsured:                    z.number().optional().nullable(),
  yearsInsuredContinuously:         z.number().optional().nullable(),
  monthsInsuredContinuously:        z.string().optional().nullable(),
  insuranceAmountRequested:         z.string().optional().nullable(),
  desiredPolicyType:                z.string().optional().nullable(),
  coverageType:                     z.string().optional().nullable(),
  expirationDate:                   z.string().optional().nullable(),
  dob:                              z.string().optional().nullable(),
  dobYyyy:                          z.number().optional().nullable(),
  dobMm:                            z.number().optional().nullable(),
  dobDd:                            z.number().optional().nullable(),
  spokenLanguage:                   z.string().optional().nullable(),
  bestTimeToContact:                z.string().optional().nullable(),
  smoker:                           z.boolean().optional().nullable(),
  smokeOption:                      z.string().optional().nullable(),
  nicotineFrequency:                z.string().optional().nullable(),
  weight:                           z.number().optional().nullable(),
  heightInInches:                   z.number().optional().nullable(),
  children:                         z.number().optional().nullable(),
  childrenAges:                     z.string().optional().nullable(),
  medicalConditions:                z.string().optional().nullable(),
  paymentMethodAvailable:           z.boolean().optional().nullable(),
  tcpaOptIn:                        z.boolean().optional().nullable(),
  tcpaOptinConsentLanguage:         z.string().optional().nullable(),
  jornayaLeadid:                    z.string().optional().nullable(),
  trustedFormCertUrl:               z.string().optional().nullable(),
  jornayaLeadIdAgent:               z.string().optional().nullable(),
  trustedFormCertUrlAgent:          z.string().optional().nullable(),
  permissiontrustToken:             z.string().optional().nullable(),
  blueinkSecuredLeadsToken:         z.string().optional().nullable(),
  gclid:                            z.string().optional().nullable(),
  msclkid:                          z.string().optional().nullable(),
  voluumCid:                        z.string().optional().nullable(),
  fbeventid:                        z.string().optional().nullable(),
  retreaverCallKey:                 z.string().optional().nullable(),
  retreaverCallUuid:                z.string().optional().nullable(),
  ringbaCallUuid:                   z.string().optional().nullable(),
  trafficSourceLeadId:              z.string().optional().nullable(),
  trafficSourceDataListId:          z.string().optional().nullable(),
  trafficSourceAgentId:             z.string().optional().nullable(),
  trafficSourceAgentName:           z.string().optional().nullable(),
  trafficSourceAgentRecordingUrl:   z.string().optional().nullable(),
  trafficSourcePlatform:            z.string().optional().nullable(),
  eaDisposition:                    z.string().optional().nullable(),
  mediaType:                        z.string().optional().nullable(),
  leadType:                         z.string().optional().nullable(),
  agedData:                         z.boolean().optional().nullable(),
  originalLeadSubmitDate:           z.string().optional().nullable(), // input as ISO date string or similar
  sourceUrl:                        z.string().optional().nullable(),
  alternatePhone:                   z.string().optional().nullable(),
  s1:                               z.string().optional().nullable(),
  s2:                               z.string().optional().nullable(),
  s3:                               z.string().optional().nullable(),
  s4:                               z.string().optional().nullable(),
  s5:                               z.string().optional().nullable(),
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

    // Convert date string if provided
    let originalLeadSubmitDate: Date | null = null;
    if (parsed.data.originalLeadSubmitDate) {
      originalLeadSubmitDate = new Date(parsed.data.originalLeadSubmitDate);
    }

    // 1. Save info in the db
    const lead = await db.buyerLead.create({
      data: {
        ...parsed.data,
        originalLeadSubmitDate,
        ipAddress,
        userAgent,
        status: "pending",
      },
    });

    // 2. Prepare the Trackdrive PING request payload
    const tdPayload = mapToTrackdrivePayload(parsed.data);

    // Call Trackdrive PING endpoint
    const trackdrivePingUrl = new URL(
      "https://lead4s-llc.trackdrive.com/api/v1/inbound_webhooks/ping/check_aca_agents"
    );

    // Append to query string for reliability as Trackdrive specifies querystring check too
    Object.entries(tdPayload).forEach(([key, val]) => {
      trackdrivePingUrl.searchParams.append(key, String(val));
    });

    let pingResponseData: any = null;
    let newStatus = "ping_failed";

    try {
      const pingRes = await fetch(trackdrivePingUrl.toString(), {
        method: "POST", // Can be GET or POST as per documentation
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

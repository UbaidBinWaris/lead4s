"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "pinging" | "ping_success" | "ping_failed" | "posting" | "post_success" | "post_failed";

const STATES = [
  { name: "Alabama", value: "AL" }, { name: "Alaska", value: "AK" }, { name: "Arizona", value: "AZ" },
  { name: "Arkansas", value: "AR" }, { name: "California", value: "CA" }, { name: "Colorado", value: "CO" },
  { name: "Connecticut", value: "CT" }, { name: "Delaware", value: "DE" }, { name: "District Of Columbia", value: "DC" },
  { name: "Florida", value: "FL" }, { name: "Georgia", value: "GA" }, { name: "Hawaii", value: "HI" },
  { name: "Idaho", value: "ID" }, { name: "Illinois", value: "IL" }, { name: "Indiana", value: "IN" },
  { name: "Iowa", value: "IA" }, { name: "Kansas", value: "KS" }, { name: "Kentucky", value: "KY" },
  { name: "Louisiana", value: "LA" }, { name: "Maine", value: "ME" }, { name: "Maryland", value: "MD" },
  { name: "Massachusetts", value: "MA" }, { name: "Michigan", value: "MI" }, { name: "Minnesota", value: "MN" },
  { name: "Mississippi", value: "MS" }, { name: "Missouri", value: "MO" }, { name: "Montana", value: "MT" },
  { name: "Nebraska", value: "NE" }, { name: "Nevada", value: "NV" }, { name: "New Hampshire", value: "NH" },
  { name: "New Jersey", value: "NJ" }, { name: "New Mexico", value: "NM" }, { name: "New York", value: "NY" },
  { name: "North Carolina", value: "NC" }, { name: "North Dakota", value: "ND" }, { name: "Ohio", value: "OH" },
  { name: "Oklahoma", value: "OK" }, { name: "Oregon", value: "OR" }, { name: "Pennsylvania", value: "PA" },
  { name: "Rhode Island", value: "RI" }, { name: "South Carolina", value: "SC" }, { name: "South Dakota", value: "SD" },
  { name: "Tennessee", value: "TN" }, { name: "Texas", value: "TX" }, { name: "Utah", value: "UT" },
  { name: "Vermont", value: "VT" }, { name: "Virginia", value: "VA" }, { name: "Washington", value: "WA" },
  { name: "West Virginia", value: "WV" }, { name: "Wisconsin", value: "WI" }, { name: "Wyoming", value: "WY" }
];

const PLATFORMS = [
  "TrackDrive", "Call Box", "Call Fire", "Call Rail", "Call Source", "Call Tracking Metrics",
  "Convirza", "Convoso", "Invoca", "Marchex", "Phonexa", "Retreaver", "Ringba", "ViciDial", "Vonage"
];

const LANGUAGES = [
  { name: "English", value: "English" }, { name: "Spanish", value: "Spanish" }, { name: "Chinese", value: "Chinese" },
  { name: "Tagalog", value: "Tagalog" }, { name: "Vietnamese", value: "Vietnamese" }, { name: "French", value: "French" },
  { name: "Arabic", value: "Arabic" }, { name: "Korean", value: "Korean" }, { name: "Russian", value: "Russian" },
  { name: "German", value: "German" }
];

const MARITAL_STATUSES = [
  { name: "Single", value: "single" }, { name: "Married", value: "married" },
  { name: "Divorced", value: "divorced" }, { name: "Separated", value: "separated" },
  { name: "Widowed", value: "widowed" }
];

const EMPLOYMENT_STATUSES = [
  { name: "Employed", value: "employed" }, { name: "Self Employed", value: "self_employed" },
  { name: "Unemployed", value: "unemployed" }, { name: "Homemaker", value: "homemaker" },
  { name: "Retired", value: "retired" }, { name: "Disabled", value: "disabled" }
];

const INSURANCE_COMPANIES = [
  { name: "Zurich Ins Group", value: "zurich_ins_group" }, { name: "Zander Insurance", value: "zander_insurance" },
  { name: "USAA", value: "usaa" }, { name: "Unum", value: "unum" }, { name: "Transamerica", value: "transamerica" },
  { name: "State Farm", value: "state_farm" }, { name: "Progressive", value: "progressive" },
  { name: "Prudential", value: "prudential" }, { name: "Mutual of Omaha", value: "mutual_of_omaha" },
  { name: "MetLife", value: "metlife" }, { name: "Liberty Mutual", value: "liberty_mutual" },
  { name: "Geico", value: "geico" }, { name: "Farmers", value: "farmers" }, { name: "Aflac", value: "aflac" },
  { name: "Aetna", value: "aetna" }, { name: "Auto-Owners Insurance", value: "auto_owners_insurance" },
  { name: "Not Currently Insured", value: "not_currently_insured" }, { name: "Company Not Listed", value: "company_not_listed" }
];

const MEDIA_TYPES = [
  "Google Ads", "Facebook Lead Ads", "Twitter", "TikTok", "YouTube", "Instagram", "SnapChat"
];

const DEFAULT_SAMPLE_DATA = {
  trackdriveNumber: "+18449890773",
  trafficSourceId: "1002",
  callerId: "+17194451111",
  firstName: "John",
  lastName: "Smith",
  email: "first-and-last-name@gmail.com",
  state: "TX",
  zip: "77001",
  city: "Houston",
  address: "123 Main Street",
  address2: "Suite A",
  gender: "F",
  maritalStatus: "divorced",
  employmentStatus: "self_employed",
  annualIncome: 65000,
  monthlyAffordablePaymentAmount: 66,
  currentlyInsured: true,
  insuranceCompany: "auto_owners_insurance",
  yearsInsured: 5,
  monthsInsured: 60,
  yearsInsuredContinuously: 5,
  monthsInsuredContinuously: "60",
  insuranceAmountRequested: "50000",
  desiredPolicyType: "ACA Health",
  coverageType: "Individual",
  expirationDate: "2027-12-31",
  dob: "1967-09-28",
  dobYyyy: 1967,
  dobMm: 9,
  dobDd: 28,
  spokenLanguage: "English",
  bestTimeToContact: "afternoon",
  smoker: false,
  smokeOption: "No",
  nicotineFrequency: "None",
  weight: 180,
  heightInInches: 70,
  children: 0,
  childrenAges: "",
  medicalConditions: "None",
  paymentMethodAvailable: true,
  tcpaOptIn: true,
  tcpaOptinConsentLanguage: "I agree to receive telemarketing calls from Lead4s and partner network via automated technology.",
  jornayaLeadid: "f832edec-ad2a-42c9-9c3b-4a95d5a35051",
  trustedFormCertUrl: "https://cert.trustedform.com/example-trustedform-cert-url",
  jornayaLeadIdAgent: "",
  trustedFormCertUrlAgent: "",
  permissiontrustToken: "example-permissiontrust-token",
  blueinkSecuredLeadsToken: "968908503466600",
  gclid: "gclid-123-xyz",
  msclkid: "msclkid-456-abc",
  voluumCid: "voluum-cid-789",
  fbeventid: "fb-event-id-999",
  retreaverCallKey: "retreaver-key-555",
  retreaverCallUuid: "retreaver-uuid-333",
  ringbaCallUuid: "ringba-uuid-222",
  trafficSourceLeadId: "lead-id-10101",
  trafficSourceDataListId: "list-id-202",
  trafficSourceAgentId: "agent-id-303",
  trafficSourceAgentName: "Agent Sarah",
  trafficSourceAgentRecordingUrl: "https://recordings.lead4s.com/303.mp3",
  trafficSourcePlatform: "TrackDrive",
  eaDisposition: "Transfer Pending",
  mediaType: "Google Ads",
  leadType: "Exclusive",
  agedData: false,
  originalLeadSubmitDate: "2026-06-12T16:44:41.000Z",
  sourceUrl: "https://lead4s.com/campaign/aca",
  alternatePhone: "2815551234",
  s1: "sub1-value",
  s2: "sub2-value",
  s3: "sub3-value",
  s4: "sub4-value",
  s5: "sub5-value",
};

export function BuyerForm() {
  const [step, setStep] = useState(1);
  const [showDevConsole, setShowDevConsole] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    trackdriveNumber: "+18449890773",
    trafficSourceId: "1002",
    callerId: "",
    firstName: "",
    lastName: "",
    email: "",
    state: "TX",
    zip: "",
    city: "",
    address: "",
    address2: "",
    gender: "F",
    maritalStatus: "single",
    employmentStatus: "employed",
    annualIncome: 50000,
    monthlyAffordablePaymentAmount: 50,
    currentlyInsured: false,
    insuranceCompany: "not_currently_insured",
    yearsInsured: 0,
    monthsInsured: 0,
    yearsInsuredContinuously: 0,
    monthsInsuredContinuously: "0",
    insuranceAmountRequested: "",
    desiredPolicyType: "",
    coverageType: "",
    expirationDate: "",
    dob: "",
    dobYyyy: undefined,
    dobMm: undefined,
    dobDd: undefined,
    spokenLanguage: "English",
    bestTimeToContact: "anytime",
    smoker: false,
    smokeOption: "",
    nicotineFrequency: "",
    weight: undefined,
    heightInInches: undefined,
    children: 0,
    childrenAges: "",
    medicalConditions: "",
    paymentMethodAvailable: false,
    tcpaOptIn: false,
    tcpaOptinConsentLanguage: "",
    jornayaLeadid: "",
    trustedFormCertUrl: "",
    jornayaLeadIdAgent: "",
    trustedFormCertUrlAgent: "",
    permissiontrustToken: "",
    blueinkSecuredLeadsToken: "",
    gclid: "",
    msclkid: "",
    voluumCid: "",
    fbeventid: "",
    retreaverCallKey: "",
    retreaverCallUuid: "",
    ringbaCallUuid: "",
    trafficSourceLeadId: "",
    trafficSourceDataListId: "",
    trafficSourceAgentId: "",
    trafficSourceAgentName: "",
    trafficSourceAgentRecordingUrl: "",
    trafficSourcePlatform: "TrackDrive",
    eaDisposition: "",
    mediaType: "",
    leadType: "",
    agedData: false,
    originalLeadSubmitDate: "",
    sourceUrl: "",
    alternatePhone: "",
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [pingId, setPingId] = useState<string | null>(null);
  const [pingResponse, setPingResponse] = useState<any>(null);
  const [postResponse, setPostResponse] = useState<any>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      finalValue = value === "" ? undefined : Number(value);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: finalValue };

      if (name === "dob" && value) {
        const parts = value.split("-");
        if (parts.length === 3) {
          updated.dobYyyy = parseInt(parts[0]);
          updated.dobMm = parseInt(parts[1]);
          updated.dobDd = parseInt(parts[2]);
        }
      }

      return updated;
    });
  };

  const loadSampleData = () => {
    setFormData(DEFAULT_SAMPLE_DATA);
    addLog("Loaded comprehensive sample lead data.");
  };

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.trackdriveNumber || !formData.trafficSourceId || !formData.callerId) {
      alert("Please fill in Trackdrive Number, Traffic Source ID, and Lead Phone Number.");
      return;
    }

    setStatus("pinging");
    setPingResponse(null);
    setPostResponse(null);
    setPingId(null);
    setLeadId(null);
    addLog(`Initiating PING check to verify Buyer Availability...`);

    try {
      const res = await fetch("/api/buyer-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server responded with an error");
      }

      setLeadId(data.lead?.id || null);
      setPingResponse(data.trackdriveResponse);

      if (data.success) {
        const returnedPingId = data.trackdriveResponse?.try_all_buyers_ping_id || data.trackdriveResponse?.try_all_buyers?.ping_id;
        setPingId(returnedPingId || null);
        setStatus("ping_success");
        addLog(`PING successful! Status: ${data.trackdriveResponse.status}`);
      } else {
        setStatus("ping_failed");
        addLog(`PING check failed. Errors: ${JSON.stringify(data.trackdriveResponse?.errors || data.error)}`);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("ping_failed");
      addLog(`Error during PING request: ${err.message}`);
    }
  };

  const handlePost = async () => {
    if (!leadId || !pingId) {
      alert("No active Ping ID found. Please run PING check first.");
      return;
    }

    setStatus("posting");
    addLog(`Initiating POST request to transfer lead call...`);

    try {
      const res = await fetch("/api/buyer-form/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, pingId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Post transfer failed");
      }

      setPostResponse(data.trackdriveResponse);
      if (data.success) {
        setStatus("post_success");
        addLog(`POST Transfer successful! routing call...`);
      } else {
        setStatus("post_failed");
        addLog(`POST Transfer failed: ${JSON.stringify(data.trackdriveResponse?.errors || data.error)}`);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("post_failed");
      addLog(`Error during POST transfer: ${err.message}`);
    }
  };

  const clearForm = () => {
    setFormData({
      trackdriveNumber: "+18449890773",
      trafficSourceId: "1002",
      callerId: "",
      firstName: "",
      lastName: "",
      email: "",
      state: "TX",
      zip: "",
      city: "",
      address: "",
      address2: "",
      gender: "F",
      maritalStatus: "single",
      employmentStatus: "employed",
      annualIncome: 50000,
      monthlyAffordablePaymentAmount: 50,
      currentlyInsured: false,
      insuranceCompany: "not_currently_insured",
      yearsInsured: 0,
      monthsInsured: 0,
      yearsInsuredContinuously: 0,
      monthsInsuredContinuously: "0",
      insuranceAmountRequested: "",
      desiredPolicyType: "",
      coverageType: "",
      expirationDate: "",
      dob: "",
      dobYyyy: undefined,
      dobMm: undefined,
      dobDd: undefined,
      spokenLanguage: "English",
      bestTimeToContact: "anytime",
      smoker: false,
      smokeOption: "",
      nicotineFrequency: "",
      weight: undefined,
      heightInInches: undefined,
      children: 0,
      childrenAges: "",
      medicalConditions: "",
      paymentMethodAvailable: false,
      tcpaOptIn: false,
      tcpaOptinConsentLanguage: "",
      jornayaLeadid: "",
      trustedFormCertUrl: "",
      jornayaLeadIdAgent: "",
      trustedFormCertUrlAgent: "",
      permissiontrustToken: "",
      blueinkSecuredLeadsToken: "",
      gclid: "",
      msclkid: "",
      voluumCid: "",
      fbeventid: "",
      retreaverCallKey: "",
      retreaverCallUuid: "",
      ringbaCallUuid: "",
      trafficSourceLeadId: "",
      trafficSourceDataListId: "",
      trafficSourceAgentId: "",
      trafficSourceAgentName: "",
      trafficSourceAgentRecordingUrl: "",
      trafficSourcePlatform: "TrackDrive",
      eaDisposition: "",
      mediaType: "",
      leadType: "",
      agedData: false,
      originalLeadSubmitDate: "",
      sourceUrl: "",
      alternatePhone: "",
      s1: "",
      s2: "",
      s3: "",
      s4: "",
      s5: "",
    });
    setLogs([]);
    setPingResponse(null);
    setPostResponse(null);
    setLeadId(null);
    setPingId(null);
    setStatus("idle");
    setStep(1);
    addLog("Form and logs cleared.");
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-blue-400/50 focus:bg-white/8 focus:ring-1 focus:ring-blue-400/20";

  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5";

  return (
    <div className="relative w-full">
      {/* Dev Console Toggle in Header */}
      <div className="mb-6 flex justify-end gap-3">
        <button
          onClick={() => setShowDevConsole(!showDevConsole)}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
            showDevConsole
              ? "bg-blue-500/20 border-blue-400/30 text-blue-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {showDevConsole ? "Hide Developer Console" : "Show Developer Console"}
        </button>
      </div>

      {/* Main Flow State Switcher */}
      <AnimatePresence mode="wait">
        {status === "post_success" && postResponse && postResponse.success ? (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <svg className="h-8 w-8 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Call Routing Accepted!</h2>
              <p className="text-sm text-slate-400">
                The lead has been successfully validated and accepted by Trackdrive.
              </p>
            </div>

            {postResponse.forwarding_number && (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4 max-w-md mx-auto">
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                    Forwarding Phone Line
                  </span>
                  <a
                    href={`tel:${postResponse.forwarding_number}`}
                    className="inline-flex items-center gap-3 text-2xl font-black text-cyan-400 hover:text-cyan-300 transition duration-150 decoration-wavy hover:underline"
                  >
                    <span>{postResponse.forwarding_number}</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>

                {postResponse.forwarding_number_sip_address && (
                  <div className="pt-3 border-t border-white/5">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                      SIP routing endpoint
                    </span>
                    <span className="font-mono text-xs text-slate-300 break-all select-all">
                      {postResponse.forwarding_number_sip_address}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={clearForm}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition duration-150"
              >
                Submit Another Check
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form-layout"
            className={`grid gap-8 transition-all duration-300 ${
              showDevConsole ? "lg:grid-cols-[1fr_450px]" : "max-w-3xl mx-auto"
            }`}
          >
            {/* Form Column */}
            <div className="space-y-6">
              {/* Stepper Header */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/5 bg-white/3 p-2 backdrop-blur-md">
                {[
                  { stepNum: 1, label: "Contact Info" },
                  { stepNum: 2, label: "Location" },
                  { stepNum: 3, label: "Lead Profile" },
                  { stepNum: 4, label: "Campaign & Compliance" },
                ].map((s) => (
                  <button
                    key={s.stepNum}
                    type="button"
                    onClick={() => setStep(s.stepNum)}
                    className={`flex-1 min-w-[90px] rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                      step === s.stepNum
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    Step {s.stepNum}: {s.label}
                  </button>
                ))}
              </div>

              {/* Form Card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md shadow-xl">
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {step === 1 && "Step 1: Contact Information"}
                      {step === 2 && "Step 2: Location Details"}
                      {step === 3 && "Step 3: Lead Profile & Insurance History"}
                      {step === 4 && "Step 4: Campaign & Compliance Opt-ins"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Provide lead details below. Required fields are marked with <span className="text-cyan-400 font-bold">*</span>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={loadSampleData}
                      className="rounded-lg bg-blue-500/10 border border-blue-400/20 px-3 py-1.5 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/20 hover:border-blue-400/40"
                    >
                      Pre-fill Sample
                    </button>
                  </div>
                </div>

                <form onSubmit={handlePing} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="grid gap-5 sm:grid-cols-2"
                      >
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className={labelCls}>
                            Lead Phone Number (Caller ID) <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="callerId"
                            value={formData.callerId}
                            onChange={handleInputChange}
                            required
                            placeholder="+17194451111"
                            className={inputCls}
                            id="input-callerId"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className={inputCls}
                            id="input-firstName"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Smith"
                            className={inputCls}
                            id="input-lastName"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="first-and-last-name@gmail.com"
                            className={inputCls}
                            id="input-email"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Alternate Phone</label>
                          <input
                            type="text"
                            name="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleInputChange}
                            placeholder="2815551234"
                            className={inputCls}
                            id="input-alternatePhone"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Spoken Language</label>
                          <select
                            name="spokenLanguage"
                            value={formData.spokenLanguage}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-spokenLanguage"
                          >
                            {LANGUAGES.map((l) => (
                              <option key={l.value} value={l.value}>
                                {l.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Best Time to Contact</label>
                          <select
                            name="bestTimeToContact"
                            value={formData.bestTimeToContact}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-bestTimeToContact"
                          >
                            <option value="anytime">Anytime</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="grid gap-5 sm:grid-cols-2"
                      >
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className={labelCls}>Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Fake Street"
                            className={inputCls}
                            id="input-address"
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className={labelCls}>Address Line 2 (Optional)</label>
                          <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleInputChange}
                            placeholder="Apt, Suite, Room"
                            className={inputCls}
                            id="input-address2"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Boulder"
                            className={inputCls}
                            id="input-city"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>State</label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-state"
                          >
                            <option value="">Select State</option>
                            {STATES.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.name} ({s.value})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className={labelCls}>Zip Code</label>
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            placeholder="77001"
                            className={inputCls}
                            id="input-zip"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="grid gap-5 sm:grid-cols-2"
                      >
                        <div className="space-y-1.5">
                          <label className={labelCls}>Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-dob"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-gender"
                          >
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Marital Status</label>
                          <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-maritalStatus"
                          >
                            <option value="">Select Status</option>
                            {MARITAL_STATUSES.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Employment Status</label>
                          <select
                            name="employmentStatus"
                            value={formData.employmentStatus}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-employmentStatus"
                          >
                            <option value="">Select Employment</option>
                            {EMPLOYMENT_STATUSES.map((e) => (
                              <option key={e.value} value={e.value}>
                                {e.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Annual Income ($)</label>
                          <input
                            type="number"
                            name="annualIncome"
                            value={formData.annualIncome || ""}
                            onChange={handleInputChange}
                            placeholder="65000"
                            className={inputCls}
                            id="input-annualIncome"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Currently Insured</label>
                          <select
                            name="currentlyInsured"
                            value={formData.currentlyInsured ? "true" : "false"}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, currentlyInsured: e.target.value === "true" }))
                            }
                            className={inputCls}
                            id="input-currentlyInsured"
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Current Insurance Company</label>
                          <select
                            name="insuranceCompany"
                            value={formData.insuranceCompany}
                            onChange={handleInputChange}
                            className={inputCls}
                            id="input-insuranceCompany"
                          >
                            {INSURANCE_COMPANIES.map((c) => (
                              <option key={c.value} value={c.value}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Years Insured</label>
                          <input
                            type="number"
                            name="yearsInsured"
                            value={formData.yearsInsured || ""}
                            onChange={handleInputChange}
                            placeholder="5"
                            className={inputCls}
                            id="input-yearsInsured"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Weight (lbs)</label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight || ""}
                            onChange={handleInputChange}
                            placeholder="180"
                            className={inputCls}
                            id="input-weight"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>Height (inches)</label>
                          <input
                            type="number"
                            name="heightInInches"
                            value={formData.heightInInches || ""}
                            onChange={handleInputChange}
                            placeholder="70"
                            className={inputCls}
                            id="input-heightInInches"
                          />
                        </div>
                        <div className="space-y-1.5 flex items-center">
                          <label className="flex items-center gap-2 cursor-pointer pt-4">
                            <input
                              type="checkbox"
                              name="paymentMethodAvailable"
                              checked={formData.paymentMethodAvailable}
                              onChange={handleInputChange}
                              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                              id="input-paymentMethodAvailable"
                            />
                            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">
                              Payment Method Available
                            </span>
                          </label>
                        </div>
                        <div className="space-y-1.5 flex items-center">
                          <label className="flex items-center gap-2 cursor-pointer pt-4">
                            <input
                              type="checkbox"
                              name="smoker"
                              checked={formData.smoker}
                              onChange={handleInputChange}
                              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                              id="input-smoker"
                            />
                            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">
                              Active Smoker
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-6"
                      >
                        {/* Public Consent / TCPA */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className={labelCls}>TCPA Opt-In Consent Wording</label>
                            <textarea
                              name="tcpaOptinConsentLanguage"
                              value={formData.tcpaOptinConsentLanguage}
                              onChange={handleInputChange}
                              placeholder="I agree to receive call transfers and updates..."
                              rows={3}
                              className={`${inputCls} resize-none`}
                              id="input-tcpaOptinConsentLanguage"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="flex items-center gap-2 cursor-pointer pt-2">
                              <input
                                type="checkbox"
                                name="tcpaOptIn"
                                checked={formData.tcpaOptIn}
                                onChange={handleInputChange}
                                className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                                id="input-tcpaOptIn"
                              />
                              <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">
                                Lead Agrees to TCPA Consent
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Collapsible Advanced Settings */}
                        <div className="rounded-2xl border border-white/5 bg-white/[0.01]">
                          <button
                            type="button"
                            onClick={() => setAdvancedExpanded(!advancedExpanded)}
                            className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-slate-300 hover:text-white transition"
                          >
                            <span className="text-xs uppercase tracking-widest flex items-center gap-2">
                              <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                              </svg>
                              Campaign & Trackdrive Configuration
                            </span>
                            <span className="text-slate-500 text-lg">{advancedExpanded ? "−" : "+"}</span>
                          </button>

                          {advancedExpanded && (
                            <div className="px-5 pb-5 pt-2 grid gap-4 sm:grid-cols-2 border-t border-white/5 animate-fade-in">
                              <div className="space-y-1">
                                <label className={labelCls}>Trackdrive Number</label>
                                <input
                                  type="text"
                                  name="trackdriveNumber"
                                  value={formData.trackdriveNumber}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Traffic Source ID</label>
                                <input
                                  type="text"
                                  name="trafficSourceId"
                                  value={formData.trafficSourceId}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Jornaya Lead ID</label>
                                <input
                                  type="text"
                                  name="jornayaLeadid"
                                  value={formData.jornayaLeadid}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Trusted Form Cert URL</label>
                                <input
                                  type="text"
                                  name="trustedFormCertUrl"
                                  value={formData.trustedFormCertUrl}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Blue Ink Secured Token</label>
                                <input
                                  type="text"
                                  name="blueinkSecuredLeadsToken"
                                  value={formData.blueinkSecuredLeadsToken}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>PermissionTrust Token</label>
                                <input
                                  type="text"
                                  name="permissiontrustToken"
                                  value={formData.permissiontrustToken}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Google Click ID (GCLID)</label>
                                <input
                                  type="text"
                                  name="gclid"
                                  value={formData.gclid}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Microsoft Click ID</label>
                                <input
                                  type="text"
                                  name="msclkid"
                                  value={formData.msclkid}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Voluum CID</label>
                                <input
                                  type="text"
                                  name="voluumCid"
                                  value={formData.voluumCid}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className={labelCls}>Lead Source URL</label>
                                <input
                                  type="text"
                                  name="sourceUrl"
                                  value={formData.sourceUrl}
                                  onChange={handleInputChange}
                                  className={inputCls}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Actions Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ← Back
                    </button>

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.min(4, s + 1))}
                        className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/15 transition"
                      >
                        Next Step →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "pinging"}
                        className="group relative overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-60"
                        id="button-submit-ping"
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="relative">
                          {status === "pinging" ? "Querying Buyers..." : "Check Availability (PING) →"}
                        </span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Developer Console Panel (Visible only when showDevConsole is true) */}
            {showDevConsole && (
              <div className="space-y-6 animate-fade-in">
                {/* Developer Log Console */}
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Integration Dev Console
                    </h3>
                    <button
                      onClick={() => setLogs([])}
                      className="text-[10px] text-slate-600 hover:text-slate-400 transition uppercase font-semibold"
                    >
                      Clear Logs
                    </button>
                  </div>

                  <div className="h-60 overflow-y-auto rounded-xl bg-black/60 p-4 font-mono text-xs text-emerald-400 border border-white/5 space-y-1">
                    {logs.length === 0 ? (
                      <span className="text-slate-600">Console ready. Submit a PING check.</span>
                    ) : (
                      logs.map((log, idx) => <div key={idx}>{log}</div>)
                    )}
                  </div>
                </div>

                {/* API Response Console */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md shadow-xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Raw API Logs</h3>

                  {status === "pinging" && (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                      <p className="text-xs text-slate-400 animate-pulse">Connecting to API...</p>
                    </div>
                  )}

                  {pingResponse && (
                    <div className="space-y-4">
                      <div
                        className={`rounded-2xl border px-4 py-3 flex items-center gap-3 ${
                          pingResponse.success
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                            : "bg-red-500/5 border-red-500/20 text-red-300"
                        }`}
                      >
                        <span className="text-lg">{pingResponse.success ? "✓" : "✗"}</span>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500">Trackdrive Status</p>
                          <p className="text-xs font-bold">{pingResponse.success ? "Buyers Available" : "Check Failed"}</p>
                        </div>
                      </div>

                      {pingId && (
                        <div className="rounded-2xl border border-white/5 bg-white/3 p-4 text-xs font-mono text-cyan-300 break-all select-all">
                          Ping ID: {pingId}
                        </div>
                      )}

                      {pingResponse.buyers && pingResponse.buyers.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Buyers Match</p>
                          {pingResponse.buyers.map((buyer: any, idx: number) => (
                            <div key={idx} className="rounded-xl border border-white/5 bg-white/3 p-3 text-xs space-y-1">
                              <div className="flex justify-between font-bold text-slate-200">
                                <span>Buyer ID: {buyer.id}</span>
                                <span className="text-emerald-400">{buyer.offer_conversion_payout || "$ —"}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Public Interactive Match Panel (Always visible when ping succeeds) */}
            {!showDevConsole && pingResponse && pingResponse.success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-md shadow-xl max-w-3xl mx-auto w-full space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Active Buyer Available!</h4>
                    <p className="text-xs text-slate-400">
                      We found a matched buyer ready to accept this transfer call.
                    </p>
                  </div>
                </div>

                {pingResponse.buyers && pingResponse.buyers.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {pingResponse.buyers.map((buyer: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-white/5 bg-white/3 p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-300">Offer Buyer #{buyer.id}</span>
                          <span className="text-sm font-bold text-emerald-400">{buyer.offer_conversion_payout || "Conversion"}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 space-y-1">
                          <div>Cap Limit: <span className="text-slate-300">{buyer.concurrency_cap_limit || "Unlimited"}</span></div>
                          <div>Duplicate Frame: <span className="text-slate-300">{buyer.offer_conversion_duplicate_timeframe || "N/A"}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePost}
                  disabled={status === "posting"}
                  className="w-full relative overflow-hidden rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-60"
                  id="button-post-lead"
                >
                  {status === "posting" ? "Transferring Call..." : "Post Lead & Transfer Call Now →"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "no_buyers" | "error";

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

// Zod Validation Schema matching client and server constraints
const formValidationSchema = z.object({
  // Step 1: Contact
  callerId: z.string().regex(/^\+?1?[2-9]\d{9}$/, "Must be a valid 10-digit US phone number (e.g. +12025550143)"),
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").or(z.literal("")),
  alternatePhone: z.string().regex(/^\+?1?[2-9]\d{9}$/, "Must be a valid 10-digit US phone number").or(z.literal("")),
  spokenLanguage: z.string().min(1, "Preferred Language is required"),
  bestTimeToContact: z.string().min(1, "Best time to contact is required"),

  // Step 2: Location
  address: z.string().min(3, "Street Address is required"),
  address2: z.string().optional().nullable(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Must be a valid 5-digit US ZIP code"),

  // Step 3: Profile
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid Date of Birth (YYYY-MM-DD)"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  employmentStatus: z.string().min(1, "Employment Status is required"),
  annualIncome: z.number({ message: "Must be a valid number" }).min(0, "Income cannot be negative"),
  currentlyInsured: z.boolean(),
  insuranceCompany: z.string().min(1, "Insurance company selection is required"),
  yearsInsured: z.number().min(0, "Cannot be negative"),
  weight: z.number().min(30, "Please enter a valid weight in pounds"),
  heightInInches: z.number().min(20, "Please enter a valid height in inches"),
  paymentMethodAvailable: z.boolean(),
  smoker: z.boolean(),

  // Step 4: Campaign & Compliance
  tcpaOptIn: z.boolean().refine((val) => val === true, "Lead must opt-in to TCPA terms"),
  tcpaOptinConsentLanguage: z.string().min(10, "Consent Language details are required"),
  trackdriveNumber: z.string().min(5, "Trackdrive Number is required"),
  trafficSourceId: z.string().min(1, "Traffic Source ID is required"),
  jornayaLeadid: z.string().optional().nullable(),
  trustedFormCertUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  blueinkSecuredLeadsToken: z.string().optional().nullable(),
  permissiontrustToken: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  msclkid: z.string().optional().nullable(),
  voluumCid: z.string().optional().nullable(),
  sourceUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  trafficSourcePlatform: z.string().optional().nullable(),
  mediaType: z.string().optional().nullable(),
  leadType: z.string().optional().nullable(),
  agedData: z.boolean(),
  s1: z.string().optional().nullable(),
  s2: z.string().optional().nullable(),
  s3: z.string().optional().nullable(),
  s4: z.string().optional().nullable(),
  s5: z.string().optional().nullable(),
});

type FormFields = z.infer<typeof formValidationSchema>;

export function BuyerForm() {
  const [step, setStep] = useState(1);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submittingPhase, setSubmittingPhase] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [postResponse, setPostResponse] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
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
      currentlyInsured: false,
      insuranceCompany: "not_currently_insured",
      yearsInsured: 0,
      weight: 150,
      heightInInches: 66,
      paymentMethodAvailable: false,
      smoker: false,
      tcpaOptIn: false,
      tcpaOptinConsentLanguage: "By clicking this checkbox, I agree to receive marketing calls and texts via automated dialing technology.",
      spokenLanguage: "English",
      bestTimeToContact: "anytime",
      sourceUrl: "https://lead4s.com/campaign/aca",
      alternatePhone: "",
      jornayaLeadid: "",
      trustedFormCertUrl: "",
      blueinkSecuredLeadsToken: "968908503466600",
      permissiontrustToken: "",
      gclid: "",
      msclkid: "",
      voluumCid: "",
      trafficSourcePlatform: "TrackDrive",
      mediaType: "Google Ads",
      leadType: "Exclusive",
      agedData: false,
      s1: "",
      s2: "",
      s3: "",
      s4: "",
      s5: "",
    },
  });

  const loadSampleData = () => {
    Object.entries(DEFAULT_SAMPLE_DATA).forEach(([key, val]) => {
      setValue(key as keyof FormFields, val as any);
    });
  };

  // Step Validator
  const nextStep = async () => {
    let fieldsToValidate: (keyof FormFields)[] = [];
    if (step === 1) {
      fieldsToValidate = ["callerId", "firstName", "lastName", "email", "alternatePhone", "spokenLanguage", "bestTimeToContact"];
    } else if (step === 2) {
      fieldsToValidate = ["address", "city", "state", "zip"];
    } else if (step === 3) {
      fieldsToValidate = ["dob", "gender", "maritalStatus", "employmentStatus", "annualIncome", "currentlyInsured", "insuranceCompany", "yearsInsured", "weight", "heightInInches"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const onSubmit = async (data: FormFields) => {
    setStatus("submitting");
    setErrorMsg("");
    setPostResponse(null);

    try {
      // Phase 1: Ping to verify buyer availability
      setSubmittingPhase("Verifying buyer coverage (PING)...");
      const pingRes = await fetch("/api/buyer-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const pingData = await pingRes.json();
      if (!pingRes.ok) {
        throw new Error(pingData.error || "Buyer check failed during verification stage");
      }

      if (!pingData.success || !pingData.lead?.id) {
        setStatus("no_buyers");
        return;
      }

      const pingId = pingData.lead.pingId;
      const leadId = pingData.lead.id;

      if (!pingId) {
        setStatus("no_buyers");
        return;
      }

      // Phase 2: Post to transfer lead routing
      setSubmittingPhase("Establishing routing tunnel (POST)...");
      const postRes = await fetch("/api/buyer-form/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, pingId }),
      });

      const postData = await postRes.json();
      if (!postRes.ok) {
        throw new Error(postData.error || "Lead transmission failed");
      }

      if (postData.success && postData.trackdriveResponse?.forwarding_number) {
        setPostResponse(postData.trackdriveResponse);
        setStatus("success");
      } else {
        setStatus("no_buyers");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An unexpected error occurred during lead processing");
    }
  };

  const resetFormState = () => {
    setStatus("idle");
    setStep(1);
    setErrorMsg("");
    setPostResponse(null);
  };

  const inputCls = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-200 ${
      hasError
        ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20 focus:bg-white/8"
        : "border-white/10 focus:border-blue-400/50 focus:bg-white/8 focus:ring-1 focus:ring-blue-400/20"
    }`;

  const labelCls = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2";
  const errorMsgCls = "text-xs text-red-400 mt-1.5 flex items-center gap-1 font-semibold";

  return (
    <div className="mx-auto max-w-2xl w-full">
      <AnimatePresence mode="wait">
        {/* Success Accepted Screen */}
        {status === "success" && postResponse && (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <svg className="h-8 w-8 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Call Transfer Accepted</h2>
              <p className="text-sm text-slate-400">
                The lead matches buyer criteria and routing is established.
              </p>
            </div>

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
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>

              {postResponse.forwarding_number_sip_address && (
                <div className="pt-3 border-t border-white/5">
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                    SIP Endpoint Target
                  </span>
                  <span className="font-mono text-xs text-slate-300 break-all select-all">
                    {postResponse.forwarding_number_sip_address}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={resetFormState}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition duration-150"
            >
              Start New Check
            </button>
          </motion.div>
        )}

        {/* No Buyers Available Screen */}
        {status === "no_buyers" && (
          <motion.div
            key="no-buyers-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 text-center backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
              <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">No Matching Buyers Found</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Lead validation was completed, but no active buyer matches these criteria or is accepting calls right now.
              </p>
            </div>

            <button
              onClick={resetFormState}
              className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white px-6 py-3 text-sm font-bold text-slate-300 transition duration-150"
            >
              Adjust Parameters & Try Again
            </button>
          </motion.div>
        )}

        {/* Submission Error Screen */}
        {status === "error" && (
          <motion.div
            key="error-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Transmission Error</h2>
              <p className="text-sm text-red-300 max-w-md mx-auto">
                {errorMsg}
              </p>
            </div>

            <button
              onClick={resetFormState}
              className="rounded-xl bg-red-600 hover:bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition duration-150"
            >
              Back to Form
            </button>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {status === "submitting" && (
          <motion.div
            key="submitting-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-white/5 bg-white/[0.02] p-20 text-center backdrop-blur-md shadow-2xl flex flex-col items-center justify-center space-y-5"
          >
            <div className="h-12 w-12 animate-spin rounded-full border-3 border-blue-500 border-t-transparent" />
            <p className="text-sm font-bold text-slate-200 animate-pulse">{submittingPhase}</p>
          </motion.div>
        )}

        {/* Active Form Display */}
        {status === "idle" && (
          <motion.div
            key="form-wizard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Steps Progress Header */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-white/5 bg-white/3 p-1.5 backdrop-blur-md">
              {[
                { stepNum: 1, label: "Contact" },
                { stepNum: 2, label: "Location" },
                { stepNum: 3, label: "Profile" },
                { stepNum: 4, label: "Campaign" },
              ].map((s) => (
                <button
                  key={s.stepNum}
                  type="button"
                  onClick={async () => {
                    // Prevent skipping forward without validation
                    if (s.stepNum < step) {
                      setStep(s.stepNum);
                    } else if (s.stepNum > step) {
                      await nextStep();
                    }
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    step === s.stepNum
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Step {s.stepNum}: {s.label}
                </button>
              ))}
            </div>

            {/* Form Box */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md shadow-2xl">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {step === 1 && "Step 1: Contact Details"}
                    {step === 2 && "Step 2: Location Information"}
                    {step === 3 && "Step 3: Demographics & Profile"}
                    {step === 4 && "Step 4: Campaign Settings"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fields with <span className="text-cyan-400 font-bold">*</span> are required.
                  </p>
                </div>
                {step === 1 && (
                  <button
                    type="button"
                    onClick={loadSampleData}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 decoration-slate-600 hover:underline transition shrink-0"
                  >
                    Load Mockup Lead
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Contact Details */}
                {step === 1 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className={labelCls}>
                        Phone Number (Caller ID) <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="+12025550143"
                        className={inputCls(!!errors.callerId)}
                        {...register("callerId")}
                      />
                      {errors.callerId && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.callerId.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>First Name <span className="text-cyan-400">*</span></label>
                      <input
                        type="text"
                        placeholder="John"
                        className={inputCls(!!errors.firstName)}
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Last Name <span className="text-cyan-400">*</span></label>
                      <input
                        type="text"
                        placeholder="Smith"
                        className={inputCls(!!errors.lastName)}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Email Address</label>
                      <input
                        type="text"
                        placeholder="john.smith@gmail.com"
                        className={inputCls(!!errors.email)}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Alternate Phone</label>
                      <input
                        type="text"
                        placeholder="+12815550199"
                        className={inputCls(!!errors.alternatePhone)}
                        {...register("alternatePhone")}
                      />
                      {errors.alternatePhone && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.alternatePhone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Preferred Language</label>
                      <select className={inputCls(!!errors.spokenLanguage)} {...register("spokenLanguage")}>
                        {LANGUAGES.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Best Time to Contact</label>
                      <select className={inputCls(!!errors.bestTimeToContact)} {...register("bestTimeToContact")}>
                        <option value="anytime">Anytime</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Location Information */}
                {step === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className={labelCls}>Street Address <span className="text-cyan-400">*</span></label>
                      <input
                        type="text"
                        placeholder="123 Fake Street"
                        className={inputCls(!!errors.address)}
                        {...register("address")}
                      />
                      {errors.address && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className={labelCls}>Suite / Apt (Optional)</label>
                      <input
                        type="text"
                        placeholder="Suite 400"
                        className={inputCls(false)}
                        {...register("address2")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>City <span className="text-cyan-400">*</span></label>
                      <input
                        type="text"
                        placeholder="Boulder"
                        className={inputCls(!!errors.city)}
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>State <span className="text-cyan-400">*</span></label>
                      <select className={inputCls(!!errors.state)} {...register("state")}>
                        <option value="">Select State</option>
                        {STATES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className={labelCls}>ZIP Code <span className="text-cyan-400">*</span></label>
                      <input
                        type="text"
                        placeholder="80301"
                        className={inputCls(!!errors.zip)}
                        {...register("zip")}
                      />
                      {errors.zip && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Demographics & Profile */}
                {step === 3 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className={labelCls}>Date of Birth <span className="text-cyan-400">*</span></label>
                      <input
                        type="date"
                        className={inputCls(!!errors.dob)}
                        {...register("dob")}
                      />
                      {errors.dob && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.dob.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Gender <span className="text-cyan-400">*</span></label>
                      <select className={inputCls(!!errors.gender)} {...register("gender")}>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                      </select>
                      {errors.gender && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.gender.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Marital Status <span className="text-cyan-400">*</span></label>
                      <select className={inputCls(!!errors.maritalStatus)} {...register("maritalStatus")}>
                        {MARITAL_STATUSES.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                      {errors.maritalStatus && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.maritalStatus.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Employment Status <span className="text-cyan-400">*</span></label>
                      <select className={inputCls(!!errors.employmentStatus)} {...register("employmentStatus")}>
                        {EMPLOYMENT_STATUSES.map((e) => (
                          <option key={e.value} value={e.value}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                      {errors.employmentStatus && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.employmentStatus.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Annual Income ($) <span className="text-cyan-400">*</span></label>
                      <input
                        type="number"
                        className={inputCls(!!errors.annualIncome)}
                        {...register("annualIncome", { valueAsNumber: true })}
                      />
                      {errors.annualIncome && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.annualIncome.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Currently Insured</label>
                      <select
                        className={inputCls(false)}
                        onChange={(e) => setValue("currentlyInsured", e.target.value === "true")}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Insurance Company <span className="text-cyan-400">*</span></label>
                      <select className={inputCls(!!errors.insuranceCompany)} {...register("insuranceCompany")}>
                        {INSURANCE_COMPANIES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      {errors.insuranceCompany && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.insuranceCompany.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Years Insured</label>
                      <input
                        type="number"
                        className={inputCls(!!errors.yearsInsured)}
                        {...register("yearsInsured", { valueAsNumber: true })}
                      />
                      {errors.yearsInsured && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.yearsInsured.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Weight (lbs) <span className="text-cyan-400">*</span></label>
                      <input
                        type="number"
                        className={inputCls(!!errors.weight)}
                        {...register("weight", { valueAsNumber: true })}
                      />
                      {errors.weight && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.weight.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Height (inches) <span className="text-cyan-400">*</span></label>
                      <input
                        type="number"
                        className={inputCls(!!errors.heightInInches)}
                        {...register("heightInInches", { valueAsNumber: true })}
                      />
                      {errors.heightInInches && (
                        <p className={errorMsgCls}>
                          <span>⚠️</span> {errors.heightInInches.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 flex items-center pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                          {...register("paymentMethodAvailable")}
                        />
                        <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                          Payment Method Available
                        </span>
                      </label>
                    </div>

                    <div className="space-y-1.5 flex items-center pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                          {...register("smoker")}
                        />
                        <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                          Tobacco Smoker
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 4: Campaign Settings & TCPA Opt-in */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className={labelCls}>TCPA Consent Wording <span className="text-cyan-400">*</span></label>
                        <textarea
                          rows={3}
                          className={`${inputCls(!!errors.tcpaOptinConsentLanguage)} resize-none`}
                          {...register("tcpaOptinConsentLanguage")}
                        />
                        {errors.tcpaOptinConsentLanguage && (
                          <p className={errorMsgCls}>
                            <span>⚠️</span> {errors.tcpaOptinConsentLanguage.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer pt-2">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                            {...register("tcpaOptIn")}
                          />
                          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                            Lead agrees to TCPA terms <span className="text-cyan-400">*</span>
                          </span>
                        </label>
                        {errors.tcpaOptIn && (
                          <p className={errorMsgCls}>
                            <span>⚠️</span> {errors.tcpaOptIn.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Advanced Campaign Config Accordion */}
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
                          Trackdrive Campaign Settings
                        </span>
                        <span className="text-slate-500 text-lg">{advancedExpanded ? "−" : "+"}</span>
                      </button>

                      {advancedExpanded && (
                        <div className="px-5 pb-5 pt-2 grid gap-4 sm:grid-cols-2 border-t border-white/5 animate-fade-in">
                          <div className="space-y-1">
                            <label className={labelCls}>Trackdrive Number <span className="text-cyan-400">*</span></label>
                            <input type="text" className={inputCls(!!errors.trackdriveNumber)} {...register("trackdriveNumber")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Traffic Source ID <span className="text-cyan-400">*</span></label>
                            <input type="text" className={inputCls(!!errors.trafficSourceId)} {...register("trafficSourceId")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Jornaya Lead ID</label>
                            <input type="text" className={inputCls(false)} {...register("jornayaLeadid")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Trusted Form URL</label>
                            <input type="text" className={inputCls(!!errors.trustedFormCertUrl)} {...register("trustedFormCertUrl")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Blue Ink Token</label>
                            <input type="text" className={inputCls(false)} {...register("blueinkSecuredLeadsToken")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>PermissionTrust Token</label>
                            <input type="text" className={inputCls(false)} {...register("permissiontrustToken")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Google Click ID</label>
                            <input type="text" className={inputCls(false)} {...register("gclid")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Microsoft Click ID</label>
                            <input type="text" className={inputCls(false)} {...register("msclkid")} />
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Traffic Source Platform</label>
                            <select className={inputCls(false)} {...register("trafficSourcePlatform")}>
                              {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className={labelCls}>Media Type</label>
                            <select className={inputCls(false)} {...register("mediaType")}>
                              {MEDIA_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Footer Buttons */}
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
                      onClick={nextStep}
                      className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/15 transition"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="group relative overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative">Transfer Lead Call →</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_SAMPLE_DATA = {
  callerId: "+17194451111",
  firstName: "John",
  lastName: "Smith",
  email: "first-and-last-name@gmail.com",
  alternatePhone: "+12815551234",
  spokenLanguage: "English",
  bestTimeToContact: "afternoon",
  address: "123 Main Street",
  address2: "Suite A",
  city: "Houston",
  state: "TX",
  zip: "77001",
  dob: "1967-09-28",
  gender: "F",
  maritalStatus: "divorced",
  employmentStatus: "self_employed",
  annualIncome: 65000,
  currentlyInsured: true,
  insuranceCompany: "auto_owners_insurance",
  yearsInsured: 5,
  weight: 180,
  heightInInches: 70,
  paymentMethodAvailable: true,
  smoker: false,
  tcpaOptIn: true,
  tcpaOptinConsentLanguage: "By clicking this checkbox, I agree to receive marketing calls and texts via automated dialing technology.",
  trackdriveNumber: "+18449890773",
  trafficSourceId: "1002",
  jornayaLeadid: "f832edec-ad2a-42c9-9c3b-4a95d5a35051",
  trustedFormCertUrl: "https://cert.trustedform.com/example-trustedform-cert-url",
  blueinkSecuredLeadsToken: "968908503466600",
  permissiontrustToken: "example-permissiontrust-token",
  gclid: "gclid-123-xyz",
  msclkid: "msclkid-456-abc",
  voluumCid: "voluum-cid-789",
  sourceUrl: "https://lead4s.com/campaign/aca",
  trafficSourcePlatform: "TrackDrive",
  mediaType: "Google Ads",
  leadType: "Exclusive",
  agedData: false,
  s1: "sub1",
  s2: "sub2",
  s3: "sub3",
  s4: "sub4",
  s5: "sub5",
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "no_buyers" | "error";

// Zod Validation Schema for the simplified form
const formValidationSchema = z.object({
  callerId: z.string().regex(/^\+?1?[2-9]\d{9}$/, "Must be a valid US phone number (e.g. +17194451111)"),
  trackdriveNumber: z.string().min(5, "Trackdrive Number is required"),
  trafficSourceId: z.string().min(1, "Traffic Source ID is required"),
  pingId: z.string().optional().nullable().or(z.literal("")),
});

type FormFields = z.infer<typeof formValidationSchema>;

const MOCK_DATA: FormFields = {
  callerId: "+17194451111",
  trackdriveNumber: "+18449890773",
  trafficSourceId: "1002",
  pingId: "",
};

export function BuyerForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submittingPhase, setSubmittingPhase] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [postResponse, setPostResponse] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      callerId: "",
      trackdriveNumber: "+18449890773",
      trafficSourceId: "1002",
      pingId: "",
    },
  });

  const loadSampleData = () => {
    Object.entries(MOCK_DATA).forEach(([key, val]) => {
      setValue(key as keyof FormFields, val as any);
    });
  };

  const onSubmit = async (data: FormFields) => {
    setStatus("submitting");
    setErrorMsg("");
    setPostResponse(null);

    try {
      let pingId = data.pingId?.trim();
      let leadId: string | null = null;

      // Phase 1: Call PING route to register lead and run check if needed
      setSubmittingPhase(
        pingId 
          ? "Registering lead with manual Ping ID..." 
          : "Checking buyer availability (PING)..."
      );

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

      leadId = pingData.lead.id;
      // If we didn't have a manual ping ID, get it from the API response
      if (!pingId) {
        pingId = pingData.lead.pingId;
      }

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
    setErrorMsg("");
    setPostResponse(null);
  };

  const inputCls = (hasError: boolean) =>
    `w-full rounded-xl border bg-slate-950/40 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all duration-200 ${
      hasError
        ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20 focus:bg-slate-950/60"
        : "border-slate-800 focus:border-blue-500/50 focus:bg-slate-950/60 focus:ring-1 focus:ring-blue-500/20"
    }`;

  const labelCls = "block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2";
  const errorMsgCls = "text-xs text-red-400 mt-1.5 flex items-center gap-1 font-semibold";

  return (
    <div className="mx-auto max-w-xl w-full">
      <AnimatePresence mode="wait">
        {/* Success Screen */}
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
            key="form-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Form Box */}
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-6 border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white">Buyer Query</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter the phone number to test Trackdrive agent routing.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Hidden Static Inputs */}
                <input type="hidden" {...register("trackdriveNumber")} />
                <input type="hidden" {...register("trafficSourceId")} />
                <input type="hidden" {...register("pingId")} />

                {/* Caller ID */}
                <div className="space-y-1.5">
                  <label className={labelCls}>
                    Caller Number (Phone) <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="+17194451111"
                    className={inputCls(!!errors.callerId)}
                    {...register("callerId")}
                  />
                  {errors.callerId && (
                    <p className={errorMsgCls}>
                      <span>⚠️</span> {errors.callerId.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-6 py-4 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-center"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative font-bold uppercase tracking-wider text-[11px]">
                      Check Buyer & Route Lead →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

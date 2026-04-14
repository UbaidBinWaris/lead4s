"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JobPost } from "@/data/careers";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/lib/validations/career";

type CareerFormProps = {
  jobs: JobPost[];
};

export function CareerForm({ jobs }: Readonly<CareerFormProps>) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [resumeInputKey, setResumeInputKey] = useState(0);
  const searchParams = useSearchParams();

  const positionOptions = useMemo(
    () => jobs.map((job) => ({ value: job.id, label: job.title })),
    [jobs]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
    },
  });

  useEffect(() => {
    const jobId = searchParams.get("position");
    if (jobId && positionOptions.some((opt) => opt.value === jobId)) {
      setValue("position", jobId, { shouldValidate: true });
    }
  }, [positionOptions, searchParams, setValue]);

  async function onSubmit(values: ApplicationInput) {
    setSubmitError("");
    setIsSuccess(false);
    setResumeError("");

    if (!resumeFile) {
      setResumeError("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone ?? "");
    formData.append("position", values.position);
    formData.append("coverLetter", values.coverLetter);
    formData.append("resumeFile", resumeFile);

    const response = await fetch("/api/careers", {
      method: "POST",
      body: formData,
    });

    let data: { message?: string } = {};
    try {
      data = (await response.json()) as { message?: string };
    } catch {
      data = { message: "Unable to submit your application." };
    }

    if (!response.ok) {
      setSubmitError(data.message ?? "Unable to submit your application.");
      return;
    }

    reset();
    setResumeFile(null);
    setResumeInputKey((prev) => prev + 1);
    setIsSuccess(true);
  }

  function handleResumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setResumeFile(null);
      setResumeError("Please upload your resume.");
      return;
    }

    const maxBytes = 5 * 1024 * 1024;
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      setResumeFile(null);
      setResumeError("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }

    if (file.size > maxBytes) {
      setResumeFile(null);
      setResumeError("Resume file must be 5MB or smaller.");
      return;
    }

    setResumeFile(file);
    setResumeError("");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-strong rounded-3xl border border-white/12 p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input
            type="text"
            autoComplete="name"
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            placeholder="Jane Doe"
            {...register("fullName")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            placeholder="jane@company.com"
            {...register("email")}
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            placeholder="+1 (702) 000-0000"
            {...register("phone")}
          />
        </Field>

        <Field
          label="Position Applied For"
          error={errors.position?.message}
        >
          <select
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            {...register("position")}
          >
            <option value="" className="bg-surface-900">
              Select a role
            </option>
            {positionOptions.map((job) => (
              <option key={job.value} value={job.value} className="bg-surface-900">
                {job.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Resume Upload" error={resumeError}>
          <input
            key={resumeInputKey}
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            onChange={handleResumeChange}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Accepted formats: PDF, DOC, DOCX (max 5MB)
          </span>
        </Field>

        <Field label="Cover Letter" error={errors.coverLetter?.message}>
          <textarea
            rows={6}
            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-400/60 focus-visible:ring-2 focus-visible:ring-brand-400/50"
            placeholder="Tell us why you'd be a strong fit for this role."
            {...register("coverLetter")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-xs text-slate-500">
          By applying, you agree to be contacted by our recruiting team for
          office-based and remote opportunities.
        </p>
      </div>

      {isSuccess && (
        <p className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          Application submitted successfully. Our team will review your profile
          and contact you with next steps.
        </p>
      )}

      {submitError && (
        <p className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2 text-sm text-rose-300">
          {submitError}
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: Readonly<FieldProps>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}

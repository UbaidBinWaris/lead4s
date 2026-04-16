"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/api";

type ImageUploaderProps = {
  readonly value: string | null;
  readonly onChange: (url: string | null) => void;
  readonly onUploaded?: (url: string) => void;
};

export function ImageUploader({ value, onChange, onUploaded }: ImageUploaderProps) {
  const inputId = "admin-cover-image-upload";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  let uploadButtonLabel = "Upload Image";
  if (isUploading) {
    uploadButtonLabel = "Uploading...";
  } else if (value) {
    uploadButtonLabel = "Replace Image";
  }

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const result = await uploadImage(file);
      onChange(result.url);
      onUploaded?.(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-sm font-medium text-white">
        Cover Image
      </label>

      {value ? (
        <div className="overflow-hidden rounded-lg border border-slate-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover" className="h-44 w-full object-cover" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex min-h-11 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-surface-800 disabled:opacity-60"
        >
          {uploadButtonLabel}
        </button>

        {value ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex min-h-11 items-center rounded-lg border border-red-500/40 px-4 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
          >
            Remove
          </button>
        ) : null}
      </div>

      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

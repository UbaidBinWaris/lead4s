import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Serializes an object as JSON-LD safe for inline <script> tags.
 * Escapes </ to prevent </script> injection from DB-sourced strings.
 */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replaceAll("</", String.raw`<\/`);
}

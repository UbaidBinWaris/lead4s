import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(120, "Full name is too long"),
  email: z
    .string()
    .trim()
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address"
    ),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(25, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  position: z.string().trim().min(1, "Please select a position"),
  coverLetter: z
    .string()
    .trim()
    .min(20, "Cover letter must be at least 20 characters")
    .max(4000, "Cover letter is too long"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

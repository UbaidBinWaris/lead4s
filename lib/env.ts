import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine(
      (v) => v.startsWith("postgresql://") || v.startsWith("postgres://"),
      "DATABASE_URL must be a valid PostgreSQL connection string"
    ),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  UPLOAD_DIR: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .optional()
    .refine(
      (v) => v === undefined || v === "" || URL.canParse(v),
      "NEXT_PUBLIC_SITE_URL must be a valid URL"
    ),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const missing = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid or missing environment variables:\n${missing}\n\nCheck .env.example for required variables.`
    );
  }

  return result.data;
}

export const env = parseEnv();

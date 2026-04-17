-- Migrate legacy case_studies schema (vertical/results text[]/kpi fields/int id)
-- to the current Prisma CaseStudy model (industry/results Json/content Json/string id).
-- This migration preserves old tables by renaming them as backups.

CREATE TABLE IF NOT EXISTS "case_studies_new" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "industry" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "challenge" TEXT NOT NULL,
  "solution" TEXT NOT NULL,
  "results" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "content" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "coverImage" TEXT,
  "is_published" BOOLEAN NOT NULL DEFAULT true,
  "display_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "case_studies_new_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_new_slug_key" ON "case_studies_new"("slug");

INSERT INTO "case_studies_new" (
  "id",
  "title",
  "slug",
  "industry",
  "summary",
  "challenge",
  "solution",
  "results",
  "content",
  "coverImage",
  "is_published",
  "display_order",
  "created_at",
  "updated_at"
)
SELECT
  CONCAT('legacy-', cs."id"::text) AS "id",
  cs."title",
  cs."slug",
  cs."vertical" AS "industry",
  COALESCE(NULLIF(cs."summary", ''), NULLIF(cs."hero_intro", ''), cs."challenge") AS "summary",
  cs."challenge",
  cs."solution",
  (
    jsonb_build_array(
      jsonb_build_object(
        'label', COALESCE(NULLIF(cs."kpi_label", ''), 'Primary KPI'),
        'value', COALESCE(NULLIF(cs."kpi_value", ''), 'N/A')
      )
    ) || COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'label', CONCAT('Result ', legacy_result."idx"::text),
            'value', legacy_result."value"
          )
          ORDER BY legacy_result."idx"
        )
        FROM unnest(cs."results") WITH ORDINALITY AS legacy_result("value", "idx")
      ),
      '[]'::jsonb
    )
  ) AS "results",
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'type', 'text',
          'title', COALESCE(NULLIF(css."title", ''), NULLIF(css."section_label", ''), CONCAT('Section ', css."display_order"::text)),
          'content', css."markdown"
        )
        ORDER BY css."display_order", css."id"
      )
      FROM "case_study_sections" css
      WHERE css."case_study_id" = cs."id"
    ),
    '[]'::jsonb
  ) AS "content",
  NULL::text AS "coverImage",
  cs."is_published",
  cs."display_order",
  cs."created_at",
  cs."updated_at"
FROM "case_studies" cs
ON CONFLICT ("slug") DO NOTHING;

-- Keep legacy tables for rollback/data verification.
ALTER TABLE "case_studies" RENAME TO "case_studies_legacy_20260417";
ALTER TABLE "case_studies_new" RENAME TO "case_studies";

-- Remove old index if it exists and ensure current index naming is consistent.
DROP INDEX IF EXISTS "case_studies_slug_key";
CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_key" ON "case_studies"("slug");

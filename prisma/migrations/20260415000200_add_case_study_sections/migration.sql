-- AlterTable
ALTER TABLE "case_studies"
ADD COLUMN "summary" TEXT NOT NULL DEFAULT '',
ADD COLUMN "hero_label" TEXT NOT NULL DEFAULT 'Case Study',
ADD COLUMN "hero_title" TEXT NOT NULL DEFAULT '',
ADD COLUMN "hero_intro" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "case_study_sections" (
    "id" SERIAL NOT NULL,
    "case_study_id" INTEGER NOT NULL,
    "section_label" TEXT,
    "title" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_study_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "case_study_sections"
ADD CONSTRAINT "case_study_sections_case_study_id_fkey"
FOREIGN KEY ("case_study_id") REFERENCES "case_studies"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

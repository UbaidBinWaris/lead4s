CREATE TABLE IF NOT EXISTS "blogs" (
  "id"         TEXT NOT NULL,
  "title"      TEXT NOT NULL,
  "slug"       TEXT NOT NULL,
  "excerpt"    TEXT NOT NULL,
  "content"    TEXT NOT NULL,
  "coverImage" TEXT,
  "author"     TEXT NOT NULL DEFAULT 'Admin',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "blogs_slug_key" ON "blogs"("slug");

/**
 * Generate slug from title
 * "Hello World Blog" → "hello-world-blog"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generate unique slug by appending random string if needed
 */
export function generateUniqueSlug(baseSlug: string): string {
  // Generate random 6-character string
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}

/**
 * Sanitize markdown content (basic protection)
 */
export function sanitizeMarkdown(content: string): string {
  // Basic sanitization - remove script tags
  return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Generate excerpt from markdown content (first 160 chars)
 */
export function generateExcerpt(content: string, length = 160): string {
  // Remove markdown syntax
  const cleaned = content
    .replace(/[#*_`\[\]()]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (cleaned.length <= length) return cleaned;
  return cleaned.substring(0, length).replace(/\s+\S*$/, "") + "...";
}

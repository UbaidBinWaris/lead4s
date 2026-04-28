const DEFAULT_SITE_URL = "https://lead4s.com";

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return DEFAULT_SITE_URL;
  }

  try {
    return normalizeSiteUrl(new URL(raw).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getAbsoluteUrl(path = ""): string {
  const siteUrl = getSiteUrl();

  if (!path || path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
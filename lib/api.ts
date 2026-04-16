import type { Blog, BlogInput, UploadImageResponse } from "@/types/blog";
import type { Industry, IndustryInput } from "@/types/industry";


async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const headers = new Headers(options.headers);
  if (!isFormData) headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const response = await fetch(path, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Request failed ${response.status}: ${text}`);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function getBlogs(): Promise<Blog[]> {
  return apiRequest<Blog[]>("/api/blogs", { method: "GET" });
}

export async function createBlog(payload: BlogInput): Promise<Blog> {
  return apiRequest<Blog>("/api/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBlog(id: string, payload: BlogInput): Promise<Blog> {
  return apiRequest<Blog>(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteBlog(id: string): Promise<void> {
  await apiRequest<void>(`/api/blogs/${id}`, { method: "DELETE" });
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return apiRequest<UploadImageResponse>("/api/upload", {
    method: "POST",
    body: formData,
  });
}

// ---------------------------------------------------------------------------
// Industry API
// ---------------------------------------------------------------------------

export async function getIndustries(): Promise<Industry[]> {
  return apiRequest<Industry[]>("/api/industries", { method: "GET" });
}

export async function getIndustryBySlug(slug: string): Promise<Industry> {
  return apiRequest<Industry>(`/api/industries/by-slug/${slug}`, {
    method: "GET",
  });
}

export async function createIndustry(
  payload: IndustryInput
): Promise<Industry> {
  return apiRequest<Industry>("/api/industries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateIndustry(
  id: string,
  payload: IndustryInput
): Promise<Industry> {
  return apiRequest<Industry>(`/api/industries/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteIndustry(id: string): Promise<void> {
  await apiRequest<void>(`/api/industries/${id}`, { method: "DELETE" });
}


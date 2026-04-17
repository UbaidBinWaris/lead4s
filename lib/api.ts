import type { Blog, BlogInput, UploadImageResponse } from "@/types/blog";
import type { Industry, IndustryInput } from "@/types/industry";
import type { CaseStudy, CaseStudyInput } from "@/types/case-study";
import type { TeamMember, TeamMemberInput } from "@/types/team-member";


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

// ---------------------------------------------------------------------------
// Solutions API
// ---------------------------------------------------------------------------

export async function getSolutions(): Promise<Industry[]> {
  return apiRequest<Industry[]>("/api/solutions", { method: "GET" });
}

export async function getSolutionBySlug(slug: string): Promise<Industry> {
  return apiRequest<Industry>(`/api/solutions/by-slug/${slug}`, { method: "GET" });
}

export async function createSolution(payload: IndustryInput): Promise<Industry> {
  return apiRequest<Industry>("/api/solutions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateSolution(id: string, payload: IndustryInput): Promise<Industry> {
  return apiRequest<Industry>(`/api/solutions/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteSolution(id: string): Promise<void> {
  await apiRequest<void>(`/api/solutions/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Case Studies API
// ---------------------------------------------------------------------------

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return apiRequest<CaseStudy[]>("/api/case-studies", { method: "GET" });
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  return apiRequest<CaseStudy>(`/api/case-studies/by-slug/${slug}`, { method: "GET" });
}

export async function createCaseStudy(payload: CaseStudyInput): Promise<CaseStudy> {
  return apiRequest<CaseStudy>("/api/case-studies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCaseStudy(id: string, payload: CaseStudyInput): Promise<CaseStudy> {
  return apiRequest<CaseStudy>(`/api/case-studies/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await apiRequest<void>(`/api/case-studies/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Team Members API
// ---------------------------------------------------------------------------

export async function getTeamMembers(): Promise<TeamMember[]> {
  return apiRequest<TeamMember[]>("/api/team-members", { method: "GET" });
}

export async function createTeamMember(payload: TeamMemberInput): Promise<TeamMember> {
  return apiRequest<TeamMember>("/api/team-members", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTeamMember(id: string, payload: TeamMemberInput): Promise<TeamMember> {
  return apiRequest<TeamMember>(`/api/team-members/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTeamMember(id: string): Promise<void> {
  await apiRequest<void>(`/api/team-members/${id}`, { method: "DELETE" });
}


export interface Blog {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly coverImage: string | null;
  readonly author: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface BlogInput {
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly coverImage: string | null;
  readonly author: string;
}

export interface UploadImageResponse {
  readonly url: string;
}

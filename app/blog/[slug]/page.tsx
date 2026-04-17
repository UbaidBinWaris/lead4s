import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
import { formatDate } from "@/lib/blog";
import { BlogContent } from "@/components/blog/BlogContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

interface BlogDetailPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await db.blog.findUnique({ where: { slug } });

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${blog.title} | Lead4s Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${blog.slug}`,
      images: blog.coverImage
        ? [
            {
              url: blog.coverImage,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await db.blog.findUnique({ where: { slug } });

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-full py-12">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        {blog.coverImage && (
          <div className="mb-10 h-96 overflow-hidden rounded-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={800}
              height={400}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Title & Meta */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <span>{blog.author}</span>
            <span>•</span>
            <span>{formatDate(blog.createdAt)}</span>
            <span>•</span>
            <span>{Math.ceil(blog.content.split(/\s+/).length / 200)} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose-content">
          <BlogContent markdown={blog.content} />
        </div>

        {/* Back Link */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <a
            href="/blog"
            className="inline-flex text-brand-400 transition-colors hover:text-brand-300"
          >
            ← Back to Blog
          </a>
        </div>
      </article>
    </main>
  );
}

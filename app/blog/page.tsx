import type { Metadata } from "next";
import { db } from "@/lib/db";
import { BlogCard } from "@/components/blog/BlogCard";
import { getSiteUrl } from "@/lib/site";


const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Blog | Lead4s",
  description: "Read practical insights on lead generation, lead quality, conversion systems, and compliant customer acquisition.",
  keywords: ["lead generation blog", "lead quality", "sales conversion", "performance marketing"],
  openGraph: {
    title: "Blog | Lead4s",
    description: "Read practical insights on lead generation, lead quality, conversion systems, and compliant customer acquisition.",
    type: "website",
    url: `${SITE_URL}/blog`,
  },
  alternates: { canonical: `${SITE_URL}/blog` },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Lead4s",
    description: "Insights on lead generation systems, compliance, and scalable growth.",
  },
};

export default async function BlogPage() {
  const blogs = await db.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      author: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-400">
            Our Blog
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Insights & Strategies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Learn from our expertise in lead generation, sales optimization, and customer acquisition.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                slug={blog.slug}
                excerpt={blog.excerpt}
                coverImage={blog.coverImage}
                author={blog.author}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}

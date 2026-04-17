import type { Metadata } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
import { BlogCard } from "@/components/blog/BlogCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: "Blog | Lead4s",
  description: "Read our latest insights on lead generation, sales, and growth strategies.",
  openGraph: {
    title: "Blog | Lead4s",
    description: "Read our latest insights on lead generation, sales, and growth strategies.",
    type: "website",
    url: `${SITE_URL}/blog`,
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

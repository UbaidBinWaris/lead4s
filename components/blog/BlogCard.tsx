"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/blog";

export type BlogCardProps = {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly coverImage?: string | null;
  readonly author: string;
  readonly createdAt: Date;
};

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  author,
  createdAt,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-xl border border-slate-800 bg-surface-800/40 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-brand-700/50 hover:bg-surface-800/70"
    >
      {/* Image */}
      {coverImage && (
        <Link href={`/blog/${slug}`} className="block relative h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        <Link href={`/blog/${slug}`}>
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand-400 line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{excerpt}</p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{author}</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}

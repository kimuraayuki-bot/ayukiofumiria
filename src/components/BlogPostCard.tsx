import Link from "next/link";
import { DecoratedCard } from "@/components/DecoratedCard";
import { formatBlogDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

type BlogPostCardProps = {
  post: BlogPostMeta;
  className?: string;
  tagLimit?: number;
};

export function BlogPostCard({ post, className, tagLimit = 2 }: BlogPostCardProps) {
  return (
    <DecoratedCard className={`animate-fade-up h-full ${className ?? ""}`.trim()}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <p className="text-xs tracking-[0.14em] text-[var(--muted)]">{formatBlogDate(post.date)}</p>
        <h3 className="mt-3 text-lg font-semibold text-white transition group-hover:text-[var(--accent)]">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text)]">{post.summary}</p>
        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, tagLimit).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line-soft)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    </DecoratedCard>
  );
}

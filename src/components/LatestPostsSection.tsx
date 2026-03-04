import Link from "next/link";
import { formatBlogDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

type LatestPostsSectionProps = {
  posts: BlogPostMeta[];
};

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line-soft)] pb-4">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">JOURNAL</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Latest Posts</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text)]">
            制作、学び、実装メモをこのサイト内で継続的に更新していきます。
          </p>
        </div>
        <Link href="/blog" className="text-sm font-medium text-[var(--accent)] transition hover:text-white">
          すべての記事を見る
        </Link>
      </div>

      <div className="mt-2 divide-y divide-[var(--line-soft)]">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-3 py-4 transition first:pt-4 hover:bg-white/[0.02] md:grid-cols-[140px_minmax(0,1fr)] md:items-start md:gap-6"
          >
            <p className="text-xs tracking-[0.12em] text-[var(--muted)] md:pt-1">
              {formatBlogDate(post.date)}
            </p>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white transition group-hover:text-[var(--accent)] md:text-lg">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text)]">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/BlogPostCard";
import { DecoratedCard } from "@/components/DecoratedCard";
import { getAllPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: siteConfig.blogDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `${siteConfig.name} Blog`,
    description: siteConfig.blogDescription,
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    title: `${siteConfig.name} Blog`,
    description: siteConfig.blogDescription,
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();

  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="starfield pointer-events-none absolute inset-0" />
      <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <header className="animate-fade-up">
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="pill-link">
              Home
            </Link>
          </div>
          <p className="mt-6 text-[11px] tracking-[0.22em] text-[var(--accent)]">JOURNAL</p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text)]">
            制作の裏側、学んだこと、実装メモを蓄積していくためのページ。
          </p>
        </header>

        <section className="mt-8">
          {posts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <DecoratedCard className="animate-fade-up">
              <p className="text-sm leading-7 text-[var(--text)]">公開中の記事はまだありません。</p>
            </DecoratedCard>
          )}
        </section>
      </div>
    </main>
  );
}

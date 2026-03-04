import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DecoratedCard } from "@/components/DecoratedCard";
import { portfolioData } from "@/data/portfolio";
import { formatBlogDate, getAllPublishedPosts, getPostBySlug, getPostComponent } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const PostContent = await getPostComponent(slug);

  if (!PostContent) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url: articleUrl,
    keywords: post.tags,
    author: {
      "@type": "Person",
      name: portfolioData.profile.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: portfolioData.profile.name,
      url: siteConfig.url,
    },
  };

  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="starfield pointer-events-none absolute inset-0" />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div className="flex flex-wrap gap-3 animate-fade-up">
          <Link href="/" className="pill-link">
            Home
          </Link>
          <Link href="/blog" className="pill-link">
            Blog
          </Link>
        </div>

        <DecoratedCard className="mt-8 animate-fade-up">
          <article>
            <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">NOTE</p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{post.title}</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--text)]">{post.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs tracking-[0.14em] text-[var(--muted)]">
              <span>{formatBlogDate(post.date)}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line-soft)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="blog-prose mt-8">
              <PostContent />
            </div>
          </article>
        </DecoratedCard>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}

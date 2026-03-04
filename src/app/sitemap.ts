import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";
import { getAllPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(portfolioData.updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: posts[0] ? new Date(posts[0].date) : new Date(portfolioData.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

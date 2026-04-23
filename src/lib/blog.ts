import { promises as fs } from "node:fs";
import path from "node:path";
import { cache, type ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import * as runtime from "react/jsx-runtime";
import type { BlogPost, BlogPostFrontmatter, BlogPostMeta } from "@/types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

type MatterData = {
  title?: unknown;
  date?: unknown;
  summary?: unknown;
  tags?: unknown;
  draft?: unknown;
};

type MdxModule = {
  default: ComponentType<Record<string, never>>;
};

const comparePostsByDateDesc = (left: BlogPostMeta, right: BlogPostMeta) =>
  new Date(right.date).getTime() - new Date(left.date).getTime();

const normalizeDate = (value: unknown, fileName: string) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    const parsed = new Date(normalized);

    if (!normalized || Number.isNaN(parsed.getTime())) {
      throw new Error(`Invalid blog post date in ${fileName}`);
    }

    return normalized;
  }

  throw new Error(`Missing blog post date in ${fileName}`);
};

const normalizeFrontmatter = (data: MatterData, fileName: string): BlogPostFrontmatter => {
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`Missing blog post title in ${fileName}`);
  }

  if (typeof data.summary !== "string" || !data.summary.trim()) {
    throw new Error(`Missing blog post summary in ${fileName}`);
  }

  return {
    title: data.title.trim(),
    date: normalizeDate(data.date, fileName),
    summary: data.summary.trim(),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
      : [],
    draft: data.draft === true,
  };
};

const readAllPosts = cache(async (): Promise<BlogPost[]> => {
  const entries = await fs
    .readdir(BLOG_DIRECTORY, { withFileTypes: true })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") {
        return [];
      }

      throw error;
    });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.name.replace(/\.mdx$/, "");
      const source = await fs.readFile(path.join(BLOG_DIRECTORY, file.name), "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        ...normalizeFrontmatter(data as MatterData, file.name),
        content: content.trim(),
      } satisfies BlogPost;
    }),
  );

  return posts.sort(comparePostsByDateDesc);
});

const toMeta = (post: BlogPost): BlogPostMeta => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  summary: post.summary,
  tags: post.tags,
  draft: post.draft,
});

export const getAllPublishedPosts = cache((): Promise<BlogPostMeta[]> =>
  readAllPosts().then((posts) => posts.filter((post) => !post.draft).map(toMeta)),
);

export const getLatestPosts = cache((limit: number): Promise<BlogPostMeta[]> =>
  getAllPublishedPosts().then((posts) => posts.slice(0, limit)),
);

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await readAllPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post || post.draft) {
    return null;
  }

  return post;
});

export const getPostComponent = cache(async (slug: string): Promise<ComponentType<Record<string, never>> | null> => {
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const evaluated = (await evaluate(post.content, {
    ...runtime,
    development: process.env.NODE_ENV === "development",
  })) as MdxModule;

  return evaluated.default;
});

export const formatBlogDate = (date: string) => dateFormatter.format(new Date(date));

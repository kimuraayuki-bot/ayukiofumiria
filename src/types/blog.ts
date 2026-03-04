export type BlogPostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
  content: string;
};

function parsePost(fileContent: string, slug: string): BlogPost {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(fileContent);
  if (!match) throw new Error(`Missing frontmatter in blog post: ${slug}`);

  const values = Object.fromEntries(
    match[1].split("\n").flatMap((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return [];
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      return [[key, value]];
    }),
  );

  if (!values.title || !values.publishedAt || !values.summary) {
    throw new Error(`Blog post ${slug} must have title, publishedAt, and summary.`);
  }

  return {
    slug,
    metadata: {
      title: values.title,
      publishedAt: values.publishedAt,
      summary: values.summary,
      ...(values.image ? { image: values.image } : {}),
    },
    content: fileContent.slice(match[0].length).trim(),
  };
}

export function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), "src", "content", "blog");
  return readdirSync(postsDirectory)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const slug = path.basename(file, ".mdx");
      return parsePost(readFileSync(path.join(postsDirectory, file), "utf8"), slug);
    })
    .sort(
      (left, right) =>
        Date.parse(right.metadata.publishedAt) - Date.parse(left.metadata.publishedAt),
    );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date.slice(0, 10)}T00:00:00Z`));
}

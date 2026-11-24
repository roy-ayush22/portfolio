import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).href,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ["", "/blog"].map((route) => ({
    url: new URL(route, siteUrl).href,
    lastModified: new Date(),
  }))

  return [...routes, ...blogs]
}

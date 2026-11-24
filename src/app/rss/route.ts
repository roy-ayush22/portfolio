import { getBlogPosts } from "@/lib/blog";
import { siteConfig, siteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => {
    switch (character) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return character;
    }
  });
}

export function GET() {
  const allBlogs = getBlogPosts();

  const itemsXml = allBlogs
    .map(
      (post) =>
        `<item>
        <title>${escapeXml(post.metadata.title)}</title>
          <link>${new URL(`/blog/${post.slug}`, siteUrl).href}</link>
          <description>${escapeXml(post.metadata.summary)}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${escapeXml(siteConfig.name)} Portfolio</title>
        <link>${siteUrl.href}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}

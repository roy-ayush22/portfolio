import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/blog";

export function BlogPostList() {
  const posts = getBlogPosts();

  return (
    <ul className="blog-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
            <span>{post.metadata.title}</span>
            <span className="blog-summary">{post.metadata.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

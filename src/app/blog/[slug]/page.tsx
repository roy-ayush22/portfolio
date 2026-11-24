import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/blog/mdx-content";
import { formatDate, getBlogPost, getBlogPosts } from "@/lib/blog";
import { siteConfig, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

type BlogPageProps = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const { title, publishedAt, summary, image } = post.metadata;
  const ogImage = image ?? `/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: new URL(`/blog/${post.slug}`, siteUrl),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description: summary, images: [ogImage] },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? new URL(post.metadata.image, siteUrl).href
      : new URL(`/og?title=${encodeURIComponent(post.metadata.title)}`, siteUrl).href,
    url: new URL(`/blog/${post.slug}`, siteUrl).href,
    author: { "@type": "Person", name: siteConfig.name },
  };

  return (
    <section className="content-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <h1>{post.metadata.title}</h1>
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
        <div className="prose">
          <CustomMDX source={post.content} />
        </div>
      </article>
    </section>
  );
}

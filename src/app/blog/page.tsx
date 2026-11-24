import { BlogPostList } from "@/components/blog/post-list";

export const metadata = {
  title: "Blog",
  description: "Notes on software, tools, and engineering.",
};

export default function BlogPage() {
  return (
    <section className="content-page">
      <h1>Writing</h1>
      <BlogPostList />
    </section>
  );
}

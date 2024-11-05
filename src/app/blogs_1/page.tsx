import { getBlogs } from "@/lib/fetchers";
import Link from "next/link";

export default async function Blogs() {
  const blog = await getBlogs();

  return (
    <main>
      {blog.map((blog, i) => (
        <article key={i}>
          <h2>{blog.frontmatter.title}</h2>
          <p>{blog.frontmatter.author}</p>
          <Link href={`/blogs/${blog.slug}`}>ll</Link>
        </article>
      ))}
    </main>
  );
}

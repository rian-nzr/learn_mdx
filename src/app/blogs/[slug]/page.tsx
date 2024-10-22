// import { useEffect } from "react";
import { getBySlug } from "@/lib/fetchers";

// import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "@/component/tap";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBySlug(params.slug);

  return (
    <main className="prose">
      <h1>tes</h1>
      <TableOfContents />
      <article>{blog.content}</article>
    </main>
  );
}

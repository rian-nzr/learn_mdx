import { getBlogBySlug, getBlogs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  try {
    const { content, frontMatter } = await getBlogBySlug(params.slug);
    console.log(content);

    return (
      <article className="max-w-4xl mx-auto py-8 px-4 prose lg:prose-xl">
        <header className="mb-8">
          <h1>{frontMatter.title}</h1>
          <time className="text-gray-500">
            {new Date(frontMatter.date).toLocaleDateString()}
          </time>
          {frontMatter.author && (
            <p className="text-gray-600">By {frontMatter.author}</p>
          )}
        </header>
        <MDXRemote source={content}  />
      </article>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const locationDir = path.join(process.cwd(), "src/_mdx-content");

const options = {
  parseFrontmatter: true,
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
      },
    ],
  ],
} as any;

export async function getBySlug(slug: string) {
  const filename = slug + ".mdx";
  const filePath = path.join(locationDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = await compileMDX<{
    title: string;
    author: string;
    publishDate: string;
  }>({
    source: fileContent,
    options: options,
  });
  return {
    frontmatter,
    content,
    slug: path.parse(filename).name,
  };
}

export async function getBlogs() {
  const files = fs.readdirSync(locationDir);
  const blogs = await Promise.all(
    files.map(async (file) => await getBySlug(path.parse(file).name))
  );
  return blogs;
}

export function getAllBlogSlug() {
  const files = fs.readdirSync(locationDir);
  const slugs = files.map((file) => path.parse(file).name);
  return slugs;
}

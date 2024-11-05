import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontMatter, BlogPost, MdxFileData } from "@/types/blog";

const root = process.cwd();
const POSTS_PATH = path.join(root, "src/_mdx-content");

export async function getBlogs(): Promise<BlogPost[]> {
  const blogs: BlogPost[] = [];
  const files = fs.readdirSync(POSTS_PATH);

  for (const file of files) {
    if (path.extname(file) === ".mdx") {
      const source = fs.readFileSync(path.join(POSTS_PATH, file), "utf-8");
      const { data } = matter(source);
      blogs.push({
        ...(data as BlogFrontMatter),
        slug: file.replace(".mdx", ""),
      });
    }
  }

  // Optional: Sort by date
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<MdxFileData> {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return {
    content,
    frontMatter: data as BlogFrontMatter,
  };
}

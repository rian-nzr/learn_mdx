import BlogCard from '@/component/blogcrad'
import { getBlogs } from '@/lib/mdx'


export default async function BlogList() {
  const blogs = await getBlogs()
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {blogs.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
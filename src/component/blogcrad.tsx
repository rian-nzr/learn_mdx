import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-bold">{post.title}</h2>
      <time className="text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString()}
      </time>
      <p className="mt-2">{post.description}</p>
      {post.tags && (
        <div className="mt-4 flex gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
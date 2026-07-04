import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">ブログ</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm text-gray-500">{post.date}</p>

            <p className="mt-2 text-gray-700">{post.description}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

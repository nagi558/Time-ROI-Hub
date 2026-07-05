import { getAllPosts, getPostBySlug } from '@/lib/blog'
import type { Metadata } from 'next'

export function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="mt-2 text-gray-500">{post.date}</p>

      <article className="mt-8 whitespace-pre-wrap">{post.content}</article>
    </main>
  )
}

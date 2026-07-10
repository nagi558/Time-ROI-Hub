import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

// 記事は全てビルド時に静的化する。未知のslugはVercel上でfsを読みに行かず404にする。
export const dynamicParams = false

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-10 bg-white">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Time ROI Hub</p>
          <h1 className="text-2xl font-bold text-gray-900">{article.title}</h1>
        </div>

        <div
          className="flex flex-col gap-4 text-sm text-gray-700 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-2 [&_p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="flex flex-col gap-1">
          <Link
            href="/calculate"
            className="w-full py-4 bg-green-800 text-white text-center text-sm font-semibold rounded-xl hover:bg-green-900 transition-colors"
          >
            自分の条件で計算する
          </Link>
          <Link
            href="/articles"
            className="w-full py-4 text-center text-sm text-green-800 font-medium"
          >
            ← 記事一覧に戻る
          </Link>
          <Link
            href="/"
            className="w-full text-center text-sm text-gray-500 font-medium"
          >
            ← ホームへ戻る
          </Link>
        </div>
      </div>
    </main>
  )
}

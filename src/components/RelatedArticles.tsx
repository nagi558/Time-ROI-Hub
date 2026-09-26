import Link from 'next/link'
import { getArticleBySlug } from '@/lib/articles'
import { getPresetBySlug } from '@/data/presets'
import type { Article, Preset } from '@/types'

// 関連付けは記事frontmatterの related（記事slug）/ presets（プリセットslug）で管理する。
// 存在しないslugは無視する。
export default function RelatedArticles({ article }: { article: Article }) {
  const relatedArticles = article.related
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => !!a && a.slug !== article.slug)
  const relatedPresets = article.presets
    .map((slug) => getPresetBySlug(slug))
    .filter((p): p is Preset => !!p)

  if (relatedArticles.length === 0 && relatedPresets.length === 0) return null

  return (
    <section className="flex flex-col gap-3" aria-label="関連記事">
      {relatedArticles.length > 0 && (
        <>
          <h2 className="text-lg font-bold text-gray-900">関連記事</h2>
          <div className="flex flex-col gap-2">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="px-4 py-3 border border-gray-100 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </>
      )}
      {relatedPresets.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-700 mt-2">
            関連する計算ツール
          </h2>
          <div className="flex flex-col gap-2">
            {relatedPresets.map((p) => (
              <Link
                key={p.slug}
                href={`/presets/${p.slug}`}
                className="px-4 py-3 border border-green-100 bg-green-50 rounded-xl text-sm font-medium text-green-800 hover:bg-green-100 transition-colors"
              >
                {p.name}の元取りを計算する →
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

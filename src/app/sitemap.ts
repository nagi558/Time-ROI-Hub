import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { allPresets } from '@/data/presets'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/calculate`, lastModified: new Date() },
    { url: `${SITE_URL}/presets`, lastModified: new Date() },
    { url: `${SITE_URL}/articles`, lastModified: new Date() },
  ]

  const presetRoutes: MetadataRoute.Sitemap = allPresets.map((preset) => ({
    url: `${SITE_URL}/presets/${preset.slug}`,
    lastModified: new Date(),
  }))

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }))

  return [...staticRoutes, ...presetRoutes, ...articleRoutes]
}

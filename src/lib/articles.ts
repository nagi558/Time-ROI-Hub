import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { Article } from '@/types'

const articlesDirectory = path.join(process.cwd(), 'src/content/articles')
const md = new MarkdownIt({ linkify: true })

type ArticleFrontmatter = {
  title: string
  description: string
  date: string
}

export function getAllArticles(): Article[] {
  const filenames = fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith('.md'))

  const articles = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(articlesDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as ArticleFrontmatter

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      contentHtml: md.render(content),
    }
  })

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

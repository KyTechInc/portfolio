import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
  readTime: number
  coverImage: string
  coverImagePath: string
  slug: string
  icon: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  const { article } = await import(`../content/${articleFilename}`)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  const articleFilenames = await glob('*/page.mdx', {
    cwd: './content',
  })

  const articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())
}

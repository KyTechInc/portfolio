
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateArticleMetadata, generateStructuredData, SITE_CONFIG } from '@/lib/metadata'
import { getAllArticles } from '@/lib/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const { article } = await import(`@/content/${slug}/page.mdx`)
    const path = `/blog/${slug}`

    return generateArticleMetadata(article, path)
  } catch (error) {
    console.error(`Failed to generate metadata for blog post: ${slug}`, error)
    return generateArticleMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      date: new Date().toISOString(),
      author: SITE_CONFIG.author,
      slug: slug,
      coverImage: '',
      coverImagePath: SITE_CONFIG.ogImage,
      icon: 'default',
      readTime: 0
    }, `/blog/${slug}`)
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  try {
    const { default: Post, article } = await import(`@/content/${slug}/page.mdx`)

    const structuredData = generateStructuredData('BlogPosting', {
      title: article.title,
      description: article.description,
      image: article.coverImagePath,
      publishedTime: article.date,
      modifiedTime: article.date,
      author: article.author,
      path: `/blog/${slug}`,
      section: 'Blog',
      tags: [
        'Web Development',
        'Supabase',
        'Real-time',
        'React',
        'Next.js',
        'Tutorial'
      ]
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <Post />
      </>
    )
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error)
    notFound()
  }
}
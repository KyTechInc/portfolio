import type { Metadata } from 'next'
import { type ArticleWithSlug, getAllArticles } from './articles'

export const SITE_CONFIG = {
  name: 'Kyle McCracken',
  title: 'Kyle McCracken - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable web applications with a focus on performance and user experience.',
  url: 'https://kylemccracken.com',
  ogImage: 'https://kylemccracken.com/og-image.jpg',
  twitterHandle: '@KyTechInc',
  author: 'Kyle McCracken',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
    'JavaScript',
    'Node.js',
    'PostgreSQL',
    'Supabase',
    'Tailwind CSS',
    'Portfolio',
    'Software Engineer',
    'Web Applications',
    'API Development',
    'Frontend Development',
    'Backend Development',
    'Modern Web Technologies'
  ]
} as const

export function generateMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  keywords = SITE_CONFIG.keywords,
  path = '/',
  image = SITE_CONFIG.ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [SITE_CONFIG.author],
  section,
  tags = []
}: {
  title?: string
  description?: string
  keywords?: readonly string[]
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
} = {}): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}${path}`

  return {
    title,
    description,
    keywords: [...keywords, ...tags],
    authors: authors.map(author => ({ name: author })),
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(type === 'article' && {
      other: {
        'article:author': authors[0],
        'article:section': section || 'Technology',
        'article:tag': tags,
        ...(publishedTime && { 'article:published_time': publishedTime }),
        ...(modifiedTime && { 'article:modified_time': modifiedTime }),
      }
    })
  }
}

export function generateArticleMetadata(article: ArticleWithSlug, path: string): Metadata {
  const imageUrl = article.coverImagePath.startsWith('http')
    ? article.coverImagePath
    : `${SITE_CONFIG.url}${article.coverImagePath}`

  return generateMetadata({
    title: `${article.title} | ${SITE_CONFIG.name}`,
    description: article.description,
    path,
    image: imageUrl,
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.date,
    authors: [article.author],
    section: 'Blog',
    tags: [
      'Web Development',
      'Programming',
      'Technology',
      'Tutorial',
      'Software Development'
    ]
  })
}

export function generateStructuredData(type: 'Person' | 'WebSite' | 'Article' | 'BlogPosting', data: any) {
  const baseUrl = SITE_CONFIG.url

  switch (type) {
    case 'Person':
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE_CONFIG.name,
        jobTitle: 'Full Stack Developer',
        url: baseUrl,
        sameAs: [
          'https://github.com/KyTechInc',
          'https://linkedin.com/in/kylemccracken',
          'https://twitter.com/KyTechInc'
        ],
        knowsAbout: [
          'Web Development',
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'PostgreSQL',
          'Supabase'
        ]
      }

    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: baseUrl,
        description: SITE_CONFIG.description,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        },
        publisher: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }

    case 'Article':
    case 'BlogPosting':
      return {
        '@context': 'https://schema.org',
        '@type': type,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Person',
          name: SITE_CONFIG.author
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.path}`
        },
        articleSection: data.section || 'Technology',
        keywords: data.tags?.join(', ')
      }

    default:
      return null
  }
}

import type { Metadata } from 'next'

import { Card } from '@/components/ui/card'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { Suspense } from 'react'
import { Container } from '@/components/container'
import { generateMetadata, generateStructuredData, SITE_CONFIG } from '@/lib/metadata'


function Article({ article }: { article: ArticleWithSlug }) {
  return (
            <Card
              key={article.title}
              className="relative flex flex-col justify-between p-1 sm:p-2"
            >
              <div className="relative h-40 sm:h-44 md:h-48">
              <div className="relative h-full overflow-hidden rounded bg-background">
                <Image
                  src={article.coverImagePath}
                  alt={article.coverImage}
                  width={200}
                  height={200}
                  className="size-full object-cover transition-transform hover:scale-105"
                />
                </div>
                <span className="absolute inset-x-0 bottom-0 left-2 sm:left-4 flex size-10 sm:size-12 translate-y-1/2 items-center justify-center rounded-md border border-border p-0.5 sm:p-1 shadow-sm bg-background">
                  <Image
                    src={`https://img.logo.dev/${article.icon}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=175&format=png&retina=true`}
                    alt={article.coverImage}
                    width={50}
                    height={50}
                    className="size-6 sm:size-8"
                    aria-hidden={true}
                  />
                </span>
              </div>
              <div className="flex flex-1 flex-col px-1.5 sm:px-2 pb-1.5 sm:pb-2 pt-6 sm:pt-8">
                <div className="flex-1">
                  <dt className="truncate text-xs sm:text-sm font-medium text-foreground">
                    <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                      {/* Extend link to entire card */}
                      <span className="absolute inset-0" aria-hidden={true} />
                      <h2 className="text-lg sm:text-xl font-semibold font-mono text-pretty">{article.title}</h2>
                    </Link>
                  </dt>
                  <dd className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </dd>
                </div>
                <div className="mt-4 sm:mt-6 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {article.date}
                  </span>
                  <span
                    className="inline-flex size-6 sm:size-7 items-center justify-center rounded-full border border-border bg-backdrop text-xs font-medium text-foreground"
                    aria-hidden={true}
                  >
                    <Image
                      src={"/headshot.webp"}
                      alt={article.author}
                      width={50}
                      height={50}
                      className="size-full rounded-full"
                      aria-hidden={true}
                    />
                  </span>
                </div>
              </div>
            </Card>
  )
}

export const metadata: Metadata = generateMetadata({
  title: `${SITE_CONFIG.name} - Blog & Articles`,
  description: 'Explore my latest thoughts on web development, programming, technology, and software engineering. Discover tutorials, insights, and deep dives into modern web development practices.',
  path: '/blog',
  type: 'website',
  tags: [
    'Blog',
    'Articles',
    'Web Development',
    'Programming',
    'Technology',
    'Tutorials',
    'Software Engineering',
    'JavaScript',
    'React',
    'Next.js',
    'TypeScript'
  ]
});

export default async function ArticlesIndex() {
  const articles = await getAllArticles()

  const structuredData = generateStructuredData('WebSite', {
    name: 'Blog',
    description: 'Technical blog covering web development, programming, and software engineering topics.',
    url: `${SITE_CONFIG.url}/blog`
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <Section className="pt-6 sm:pt-8">
        <Container className="flex flex-col items-center gap-3 sm:gap-4 mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono">Blog</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl px-4">All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.</p>
          <div className="w-full">
            <dl className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              <Suspense fallback={<div className="col-span-full text-center py-8">Loading...</div>}>
                {articles.map((article) => (
                  <Article key={article.slug} article={article} />
                ))}
              </Suspense>
            </dl>
          </div>
        </Container>
      </Section>
    </>
  )
}

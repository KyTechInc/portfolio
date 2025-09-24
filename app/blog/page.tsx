import type { Metadata } from 'next'

import { Card } from '@/components/ui/card'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { Suspense } from 'react'
import { Container } from '@/components/container'


function Article({ article }: { article: ArticleWithSlug }) {
  return (
            <Card
              key={article.title}
              className="relative flex flex-col justify-between p-2"
            >
              <div className="relative h-48">
              <div className="relative h-full overflow-hidden rounded bg-background">
                <Image
                  src={article.coverImagePath}
                  alt={article.coverImage}
                  width={200}
                  height={200}
                  className="size-full object-cover"
                />
                </div>
                <span className="absolute inset-x-0 bottom-0 left-4 flex size-12 translate-y-1/2 articles-center justify-center rounded-md border border-border p-1 shadow-sm bg-background">
                  <Image
                    src={`https://img.logo.dev/${article.icon}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=175&format=png&retina=true`}
                    alt={article.coverImage}
                    width={50}
                    height={50}
                    className="size-8"
                    aria-hidden={true}
                  />
                </span>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-8">
                <div className="flex-1">
                  <dt className="truncate text-sm font-medium text-foreground">
                    <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                      {/* Extend link to entire card */}
                      <span className="absolute inset-0" aria-hidden={true} />
                      <h2 className="text-xl font-semibold font-mono text-pretty">{article.title}</h2>
                    </Link>
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">
                    {article.description}
                  </dd>
                </div>
                <div className="mt-6 flex articles-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {article.date}
                  </span>
                  <span
                    className="inline-flex size-7 articles-center justify-center rounded-full border border-border bg-backdrop text-xs font-medium text-foreground"
                    aria-hidden={true}
                  >
                    <Image
                      src={"/headshot.webp"}
                      alt={article.author}
                      width={50}
                      height={50}
                      className=" rounded-full"
                      aria-hidden={true}
                    />
                  </span>
                </div>
              </div>
            </Card>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles()

  return (
    <Section className="pt-8">
      <Container className="flex flex-col items-center gap-4 mx-aut w-full">
        <h1 className="text-4xl font-bold font-mono">Blog</h1>
        <p className="text-base text-muted-foreground">All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.</p>
        <div className="w-full">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </Suspense>
          </dl>
        </div>
      </Container>
    </Section>
  )
}

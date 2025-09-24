'use client'

import { useContext, Suspense } from 'react'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/container'
import type { ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { Button } from './ui/base-button'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'


function ArticleContent({
  article,
  children,
  previousPathname,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
  previousPathname: string | null
}) {

  return (
    <Container>
    <div className="mx-auto mt-16 lg:mt-32 mb-16 lg:mb-32 w-full max-w-4xl">
      <div className="2xl:relative">
        <div className="">
          {previousPathname && (
            <Link href={"/blog"}>
            <Button
            variant="outline"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-muted-foreground transition group-hover:stroke-foreground" />
            </Button>
            <span className="ml-3 font-mono">Back</span>
            </Link>
            
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="">
                {article.title}
              </h1>
            </header>
            <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-muted-foreground"
              >
                <span className="h-4 w-0.5 rounded-full bg-muted" />
                <span className="ml-3 font-mono">{formatDate(article.date)}</span>
              </time>
              <div className="prose-ui">
              {children as string}
              </div>
          </article>
        </div>
      </div>
    </div>
    </Container>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  const { previousPathname } = useContext(AppContext)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleContent 
        article={article} 
        previousPathname={previousPathname ?? null}
      >
        {children}
      </ArticleContent>
    </Suspense>
  )
}

'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';

interface Article {
  title: string;
  description: string;
  date: string;
  slug: string;
  coverImage?: string;
}

export default function BlogSectionClient({ articles }: { articles: Article[] }) {
  return (
    <>
      {/* Left panel - Cover Image */}
      <div className="relative bg-dashed p-8 h-full min-h-[300px]">
        {articles.map((article, index) => (
          article.coverImage && (
            <div
              key={article.slug}
              className={cn(
                'absolute inset-0 opacity-0 transition-opacity duration-300',
                index === 0 ? 'opacity-100' : '',
                `hover-trigger-${article.slug}`,
              )}
            >
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover object-center rounded-lg"
                priority={index === 0}
              />
            </div>
          )
        ))}
      </div>

      {/* Right panel - Article cards */}
      <div className="grid sm:col-span-1 sm:grid-cols-1">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            className={cn(
              'flex flex-col gap-2 p-8 transition-colors hover:bg-background',
              index > 0 && 'border-t',
              `has-[~.hover-trigger-${article.slug}]:hover:opacity-100`,
            )}
            href={`/blog/${article.slug}`}
            onMouseEnter={() => {
              // biome-ignore lint/complexity/noForEach: <explanation>
              document.querySelectorAll('[class*="hover-trigger-"]').forEach((el) => {
                el.classList.remove('opacity-100');
              });
              document
                .querySelector(`.hover-trigger-${article.slug}`)
                ?.classList.add('opacity-100');
            }}
            onMouseLeave={() => {
              // biome-ignore lint/complexity/noForEach: <explanation>
              document.querySelectorAll('[class*="hover-trigger-"]').forEach((el) => {
                el.classList.remove('opacity-100');
              });
              document
                .querySelector(`.hover-trigger-${articles[0].slug}`)
                ?.classList.add('opacity-100');
            }}
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarIcon size={14} />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <div>
              <h3 className="font-semibold text-xl tracking-tight text-foreground group-hover/item:text-primary">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}



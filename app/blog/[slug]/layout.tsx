import { Suspense } from "react"

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Suspense fallback={<div className="flex items-center justify-center py-16">Loading...</div>}>
      <div className="prose-ui antialiased">
        <div className="mx-auto max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">{children}</div>
      </div>
    </Suspense>
  )
}

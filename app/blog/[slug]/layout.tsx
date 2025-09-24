import { Suspense } from "react"




export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="prose-ui antialiased">
    <div className="mx-auto max-w-6xl px-8">{children}</div>
      </div>
    </Suspense>
  )
}

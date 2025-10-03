import { Section } from "@/components/Section"
import { Suspense } from "react"

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Section>
    <div className="prose-ui antialiased">
      <div className="mx-auto max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-4 lg:py-6">
        {children}</div>
    </div>
    </Section>
  )
}

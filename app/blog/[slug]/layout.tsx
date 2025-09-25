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
      <div className="mx-auto max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
        {children}</div>
    </div>
    </Section>
  )
}

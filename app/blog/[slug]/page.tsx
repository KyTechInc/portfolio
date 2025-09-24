

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const { default: Post } = await import(`@/content/${slug}/page.mdx`)
   
    return (

      <Post />
    )
  }
   
  export function generateStaticParams() {
    return [{ slug: 'building-a-real-time-nhl-scoreboard-with-supabase' }]
  }
   
  export const dynamicParams = false
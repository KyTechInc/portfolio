import { SITE_CONFIG } from '@/lib/metadata'

export async function GET() {
  const baseUrl = SITE_CONFIG.url || 'https://kylemccracken.com'

  const robotsContent = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}`

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

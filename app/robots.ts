import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url || 'https://kylemccracken.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

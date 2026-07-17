import type { MetadataRoute } from 'next'
import { LISTINGS } from '@/data/listings'

const BASE = 'https://sivrce.ge'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${BASE}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...LISTINGS.map((l) => ({
      url: `${BASE}/listing/${l.id}`,
      lastModified: new Date(`${l.postedAt}T00:00:00`),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  ]
}

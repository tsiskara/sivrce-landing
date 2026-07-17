import type { MetadataRoute } from 'next'
import { LISTINGS } from '@/data/listings'
import { generateAllSeoParams } from '@/lib/seo-pages'

const BASE = 'https://sivrce.ge'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${BASE}/search`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/advertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Programmatic SEO pages: shallower = higher priority
  const seoPages: MetadataRoute.Sitemap = generateAllSeoParams().map((slug) => ({
    url: `${BASE}/${slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: Math.max(0.5, 0.9 - slug.length * 0.1),
  }))

  const listingPages: MetadataRoute.Sitemap = LISTINGS.map((l) => ({
    url: `${BASE}/listing/${l.id}`,
    lastModified: new Date(`${l.postedAt}T00:00:00`),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...seoPages, ...listingPages]
}

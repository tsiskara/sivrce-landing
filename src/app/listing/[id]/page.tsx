import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LISTINGS, getListing, similarListings, formatUSD } from '@/data/listings'
import ListingDetailClient from '@/components/listing/ListingDetailClient'

export const dynamicParams = false

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

/* Trim to ~155 chars at a word boundary for meta/OG descriptions */
function metaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[.,;:!?…-]+$/, '')}…`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const l = getListing(id)
  if (!l) return {}
  const price = l.dealType === 'rent' ? `${formatUSD(l.priceUSD)}/თვე` : formatUSD(l.priceUSD)
  const title = `${l.title} — ${price}`
  const description = metaDescription(l.description)
  return {
    title,
    description,
    alternates: { canonical: `/listing/${l.id}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: l.img, width: 1536, height: 957, alt: l.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [l.img],
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params
  const listing = getListing(id)
  if (!listing) notFound()

  const similar = similarListings(listing, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `https://sivrce.ge/listing/${listing.id}`,
    image: listing.images.map((src) => `https://sivrce.ge${src}`),
    datePosted: listing.postedAt,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.district,
      addressCountry: 'GE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coords.lat,
      longitude: listing.coords.lng,
    },
    offers: {
      '@type': 'Offer',
      price: listing.priceUSD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      ...(listing.dealType === 'rent' && {
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: listing.priceUSD,
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      }),
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.area,
      unitCode: 'MTK',
    },
    ...(listing.rooms > 0 && { numberOfRooms: listing.rooms }),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'მთავარი', item: 'https://sivrce.ge' },
      { '@type': 'ListItem', position: 2, name: 'ძიება', item: 'https://sivrce.ge/search' },
      { '@type': 'ListItem', position: 3, name: listing.title, item: `https://sivrce.ge/listing/${listing.id}` },
    ],
  }

  return (
    <>
      <ListingDetailClient listing={listing} similar={similar} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  )
}

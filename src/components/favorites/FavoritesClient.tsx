'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, Search } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { LISTINGS } from '@/data/listings'
import { useFavorites } from '@/lib/favorites'

export default function FavoritesClient() {
  const { favs } = useFavorites()
  // favs hydrates from localStorage after mount — hold a neutral skeleton
  // until then so SSR and first client render match.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-card bg-sv-cloud ring-1 ring-sv-ink/5" />
        ))}
      </div>
    )
  }

  const items = LISTINGS.filter((l) => favs.includes(l.id))

  if (items.length === 0) {
    return (
      <div className="rounded-card bg-white px-6 py-16 text-center shadow-card ring-1 ring-sv-ink/5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-module bg-sv-orange/10">
          <Heart className="h-8 w-8 text-sv-orange" />
        </div>
        <h2 className="mt-6 text-2xl font-black tracking-[-0.02em] text-sv-ink text-balance">
          ფავორიტები ჯერ ცარიელია
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] font-medium text-sv-ink/60">
          დააჭირე გულის ხატულას ნებისმიერ განცხადებაზე და ის აქ შეინახება — შენს მოწყობილობაზე.
        </p>
        <Link
          href="/search"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-sv-orange px-7 py-3.5 text-sm font-bold text-white shadow-glow-orange transition hover:-translate-y-0.5 hover:shadow-glow-orange-lg"
        >
          <Search className="h-4 w-4" />
          განცხადებების ძიება
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="mb-6 text-[15px] font-semibold text-sv-ink/60">
        შენახული განცხადება: <span className="font-black text-sv-ink">{items.length}</span>
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l, i) => (
          <ListingCard key={l.id} l={l} i={i} layout="wide" />
        ))}
      </div>
    </>
  )
}

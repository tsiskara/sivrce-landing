import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Heart, BedDouble, Bath, Ruler, MapPin, Eye, Crown, Flame } from 'lucide-react'
import type { Listing } from '../data/listings'
import { formatListingPrice, formatPerM2, formatViews, formatFloor } from '../data/listings'
import { useFavorites } from '../lib/favorites'

export const BADGE_STYLE: Record<NonNullable<Listing['badge']>, string> = {
  'SUPER VIP': 'bg-gradient-to-r from-[#ff6a2d] to-[#ff4d6d] text-white',
  'VIP+': 'bg-gradient-to-r from-[#2e6bff] to-[#7a5cff] text-white',
  VIP: 'bg-[#0a1030]/85 text-white backdrop-blur',
}

function AIScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="-rotate-90" style={{ width: size, height: size }}>
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#2e6bff" strokeOpacity="0.15" strokeWidth="3.5" />
        <circle
          cx="18" cy="18" r="15.5" fill="none" stroke="url(#aigrad)" strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={`${(score / 100) * 97.4} 97.4`}
        />
        <defs>
          <linearGradient id="aigrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e6bff" />
            <stop offset="100%" stopColor="#7a5cff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-[11px] font-black text-[#2e6bff]">{score}</span>
    </div>
  )
}

interface ListingCardProps {
  l: Listing
  i?: number
  /** grid (default, fixed scroller width) | wide (fills grid cell) | list (horizontal) */
  layout?: 'grid' | 'wide' | 'list'
  animate?: boolean
}

export default function ListingCard({ l, i = 0, layout = 'grid', animate = true }: ListingCardProps) {
  const { has, toggle } = useFavorites()
  const fav = has(l.id)

  const favButton = (
    <button
      aria-label={fav ? 'ფავორიტებიდან წაშლა' : 'ფავორიტებში დამატება'}
      aria-pressed={fav}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(l.id)
      }}
      className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e6bff] ${
        fav
          ? 'bg-white text-[#ff4d6d]'
          : 'bg-white/90 text-[#0a1030] hover:bg-white hover:text-[#ff4d6d]'
      }`}
    >
      <Heart className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
    </button>
  )

  const imageBlock = (
    <div className={`relative overflow-hidden ${layout === 'list' ? 'aspect-[4/3] w-full sm:aspect-auto sm:h-full sm:min-h-[220px] sm:w-[300px] sm:shrink-0' : 'aspect-[4/3]'}`}>
      <img
        src={l.img}
        alt={l.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d2b]/70 via-transparent to-[#060d2b]/10" />
      {l.badge && (
        <span className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black tracking-wider ${BADGE_STYLE[l.badge]}`}>
          {l.badge === 'SUPER VIP' ? <Crown className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
          {l.badge}
        </span>
      )}
      {favButton}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div>
          <div className="text-[24px] font-black tracking-tight text-white drop-shadow">{formatListingPrice(l)}</div>
          <div className="text-[12px] font-bold text-white/75">{formatPerM2(l)}</div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white/85 backdrop-blur">
          <Eye className="h-3 w-3" /> {formatViews(l.views)}
        </span>
      </div>
    </div>
  )

  const bodyBlock = (
    <div className="flex min-w-0 flex-1 flex-col p-5">
      <h3 className="line-clamp-1 text-[16px] font-extrabold text-[#0a1030] transition-colors group-hover:text-[#2e6bff]">
        {l.title}
      </h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-[#0a1030]/50">
        <MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{l.address}</span>
      </p>
      <div className="mt-4 flex items-center gap-4 border-t border-[#0a1030]/[0.06] pt-4 text-[13px] font-bold text-[#0a1030]/70">
        <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#0a1030]/40" /> {l.beds}</span>
        <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[#0a1030]/40" /> {l.baths}</span>
        <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-[#0a1030]/40" /> {l.area} მ²</span>
        <span className="ml-auto text-[#0a1030]/45">{formatFloor(l)}</span>
      </div>
      {/* AI score */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#2e6bff]/[0.07] to-[#7a5cff]/[0.07] p-3 ring-1 ring-inset ring-[#2e6bff]/15">
        <AIScoreRing score={l.ai.score} />
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#2e6bff]">AI შეფასება</div>
          <div className="truncate text-[13px] font-extrabold text-[#0a1030]">{l.ai.label}</div>
        </div>
      </div>
    </div>
  )

  const sizeClass =
    layout === 'grid'
      ? 'w-[86vw] max-w-[400px] shrink-0 sm:w-[380px]'
      : layout === 'list'
        ? 'w-full flex-col sm:flex-row'
        : 'w-full'

  return (
    <motion.article
      initial={animate ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: [0.21, 0.65, 0.2, 1] }}
      className={`group overflow-hidden rounded-[26px] border border-[#0a1030]/[0.06] bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover ${sizeClass}`}
    >
      <Link
        to={`/listing/${l.id}`}
        className={`flex h-full flex-col outline-none ${layout === 'list' ? 'sm:flex-row' : ''}`}
        aria-label={l.title}
      >
        {imageBlock}
        {bodyBlock}
      </Link>
    </motion.article>
  )
}

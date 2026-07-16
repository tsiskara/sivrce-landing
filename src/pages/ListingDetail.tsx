import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Heart, Share2, MapPin, Eye, Calendar, BedDouble, Bath, Ruler,
  Building2, DoorOpen, Layers, ChevronLeft, ChevronRight, X, Crown, Flame,
  Phone, MessageCircle, BadgeCheck, Calculator, Sparkles, ArrowLeft, SearchX,
} from 'lucide-react'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import ListingCard, { BADGE_STYLE } from '../components/ListingCard'
import {
  getListing, similarListings, formatUSD, formatGEL, formatViews,
  formatFloor, USD_GEL, type Listing,
} from '../data/listings'
import { useFavorites } from '../lib/favorites'

const ease = [0.21, 0.65, 0.2, 1] as const

/* ————— AI assessment copy by score ————— */
function aiExplanation(l: Listing): string {
  const { score } = l.ai
  const base = `ფასი შედარებულია ${l.district} — ${l.city}-ის ${l.dealType === 'rent' ? 'ქირის' : 'გაყიდვის'} 40+ მსგავს განცხადებასთან.`
  if (score >= 90)
    return `${base} AI აფასებს ამ ქონებას ბაზრის საშუალოზე დაბლა — შესანიშნავი შესაძენად, ღირებულება ლოკაციის პოტენციალს ჩამორჩება.`
  if (score >= 84)
    return `${base} ფასი ბაზრის დონეს უდრის ან ოდნავ სცილდება ქვემოთ — კარგი ვარიანტია, მოლაპარაკების მარცვალი კვლავ არსებობს.`
  return `${base} ფასი ბაზრის საშუალო დიაპაზონშია. გაითვალისწინე მდგომარეობა და მოსალოდნელი დამატებითი ხარჯები.`
}

/* ————— Annuity mortgage payment ————— */
function monthlyPayment(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (principal <= 0 || n <= 0) return 0
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

/* ————— Lightbox ————— */
function Lightbox({
  images, index, onClose, onNav,
}: { images: string[]; index: number; onClose: () => void; onNav: (dir: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050b26]/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ფოტოების ნახვა"
    >
      <button
        onClick={onClose}
        aria-label="დახურვა"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1) }}
        aria-label="წინა ფოტო"
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease }}
        src={images[index]}
        alt={`ფოტო ${index + 1}`}
        className="max-h-[84vh] max-w-full rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1) }}
        aria-label="შემდეგი ფოტო"
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-bold text-white/85">
        {index + 1} / {images.length}
      </span>
    </motion.div>
  )
}

/* ————— 404 ————— */
function NotFound() {
  return (
    <div className="font-geo min-h-screen bg-[#f6f7fb] antialiased">
      <Navbar />
      <main className="mx-auto flex min-h-[80vh] max-w-[1440px] flex-col items-center justify-center px-5 pt-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-[26px] bg-[#2e6bff]/10">
          <SearchX className="h-9 w-9 text-[#2e6bff]" />
        </span>
        <h1 className="mt-6 text-[30px] font-black tracking-[-0.02em] text-[#0a1030] md:text-[38px]">
          განცხადება ვერ მოიძებნა
        </h1>
        <p className="mt-3 max-w-[420px] text-[15px] font-semibold leading-relaxed text-[#0a1030]/50">
          შესაძლოა განცხადება უკვე წაშლილია ან ბმული არასწორია.
          ნახე აქტიური შეთავაზებები ძიების გვერდზე.
        </p>
        <Link
          to="/search"
          className="mt-8 flex h-12 items-center gap-2 rounded-full bg-[#2e6bff] px-7 text-[15px] font-extrabold text-white shadow-[0_12px_32px_-8px_rgba(46,107,255,0.7)] transition-all hover:bg-[#1a4fd6]"
        >
          <ArrowLeft className="h-4 w-4" /> ძიებაზე დაბრუნება
        </Link>
      </main>
      <Footer />
    </div>
  )
}

/* ————— Page ————— */
export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const listing = id ? getListing(id) : undefined

  const { has, toggle } = useFavorites()
  const [photo, setPhoto] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [currency, setCurrency] = useState<'USD' | 'GEL'>('USD')

  // Mortgage state
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(15)
  const [rate, setRate] = useState(9.5)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setPhoto(0)
  }, [id])

  // SEO title per listing
  useEffect(() => {
    if (!listing) return
    const prev = document.title
    document.title = `${listing.title} — ${formatListingTitlePrice(listing)} | სივრცე`
    return () => {
      document.title = prev
    }
  }, [listing])

  const similar = useMemo(() => (listing ? similarListings(listing, 3) : []), [listing])

  const monthlyUSD = useMemo(() => {
    if (!listing || listing.dealType !== 'sale') return 0
    return monthlyPayment(listing.priceUSD * (1 - downPct / 100), rate, years)
  }, [listing, downPct, rate, years])

  if (!listing) return <NotFound />

  const l = listing
  const fav = has(l.id)
  const isSale = l.dealType === 'sale'
  const priceMain = currency === 'USD' ? formatUSD(l.priceUSD) : formatGEL(l.priceGEL)
  const priceAlt = currency === 'USD' ? formatGEL(l.priceGEL) : formatUSD(l.priceUSD)

  const specs: { icon: typeof BedDouble; label: string; value: string }[] = [
    { icon: DoorOpen, label: 'ოთახი', value: l.rooms > 0 ? String(l.rooms) : '—' },
    { icon: BedDouble, label: 'საძინებელი', value: l.beds > 0 ? String(l.beds) : '—' },
    { icon: Bath, label: 'სვ. წერტილი', value: l.baths > 0 ? String(l.baths) : '—' },
    { icon: Ruler, label: 'ფართი', value: `${l.area} მ²` },
    { icon: Building2, label: 'სართული', value: formatFloor(l) },
    { icon: Layers, label: 'ტიპი', value: l.propType === 'apartment' ? 'ბინა' : l.propType === 'house' ? 'სახლი' : l.propType === 'commercial' ? 'კომერციული' : 'მიწა' },
  ]

  const navPhoto = (dir: number) =>
    setPhoto((p) => (p + dir + l.images.length) % l.images.length)

  return (
    <div className="font-geo min-h-screen bg-[#f6f7fb] antialiased">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-[92px] md:px-10">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-2 text-[13px] font-bold text-[#0a1030]/45" aria-label="ბრედკრამბი">
          <Link to="/" className="transition-colors hover:text-[#2e6bff]">მთავარი</Link>
          <span>/</span>
          <Link to="/search" className="transition-colors hover:text-[#2e6bff]">ძიება</Link>
          <span>/</span>
          <Link
            to={`/search?district=${encodeURIComponent(l.district)}`}
            className="transition-colors hover:text-[#2e6bff]"
          >
            {l.district}
          </Link>
          <span>/</span>
          <span className="truncate text-[#0a1030]/70">{l.title}</span>
        </nav>

        {/* ————— Gallery ————— */}
        <div className="grid gap-4 lg:grid-cols-[1.9fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="group relative overflow-hidden rounded-[26px] shadow-card"
          >
            <button
              className="block aspect-[16/10] w-full cursor-zoom-in"
              onClick={() => setLightbox(true)}
              aria-label="ფოტოს გადიდება"
            >
              <img
                key={photo}
                src={l.images[photo]}
                alt={l.title}
                className="h-full w-full object-cover"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060d2b]/50 via-transparent to-[#060d2b]/10" />
            {l.badge && (
              <span className={`absolute left-5 top-5 flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-black tracking-wider ${BADGE_STYLE[l.badge]}`}>
                {l.badge === 'SUPER VIP' ? <Crown className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                {l.badge}
              </span>
            )}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-bold text-white/90 backdrop-blur">
                <Eye className="h-3.5 w-3.5" /> {formatViews(l.views)} ნახვა
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => navPhoto(-1)}
                  aria-label="წინა ფოტო"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0a1030] backdrop-blur transition-all hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navPhoto(1)}
                  aria-label="შემდეგი ფოტო"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0a1030] backdrop-blur transition-all hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-2 lg:grid-rows-2">
            {l.images.slice(0, 4).map((src, i) => (
              <button
                key={src + i}
                onClick={() => setPhoto(i)}
                aria-label={`ფოტო ${i + 1}`}
                aria-pressed={photo === i}
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl transition-all duration-300 lg:aspect-auto lg:h-full ${
                  photo === i
                    ? 'ring-2 ring-[#2e6bff] ring-offset-2 ring-offset-[#f6f7fb]'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ————— Main columns ————— */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.9fr_1fr]">
          {/* Left: content */}
          <div className="min-w-0">
            {/* Title + price */}
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  {l.isNew && (
                    <span className="rounded-full bg-[#2e6bff]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#2e6bff]">
                      ახალი კომპლექსი
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[12px] font-bold text-[#0a1030]/45">
                    <Calendar className="h-3.5 w-3.5" /> {l.postedAt}
                  </span>
                </div>
                <h1 className="mt-2.5 text-balance text-[26px] font-black leading-tight tracking-[-0.02em] text-[#0a1030] md:text-[34px]">
                  {l.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-[15px] font-semibold text-[#0a1030]/50">
                  <MapPin className="h-4 w-4 shrink-0 text-[#2e6bff]" /> {l.address}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggle(l.id)}
                  aria-label={fav ? 'ფავორიტებიდან წაშლა' : 'ფავორიტებში დამატება'}
                  aria-pressed={fav}
                  className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                    fav
                      ? 'border-[#ff4d6d]/30 bg-[#ff4d6d]/10 text-[#ff4d6d]'
                      : 'border-[#0a1030]/10 bg-white text-[#0a1030]/60 hover:text-[#ff4d6d]'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${fav ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href).catch(() => {})
                    toast.success('ბმული დაკოპირდა')
                  }}
                  aria-label="გაზიარება"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#0a1030]/10 bg-white text-[#0a1030]/60 transition-all duration-300 hover:scale-105 hover:text-[#2e6bff]"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Price block */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-[#0a1030]/[0.06] bg-white p-6 shadow-card">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#0a1030]/40">
                  {isSale ? 'სრული ფასი' : 'თვიური ქირა'}
                </div>
                <div className="mt-1 text-[32px] font-black tracking-tight text-[#0a1030] md:text-[36px]">
                  {priceMain}
                  {!isSale && <span className="text-[18px] font-extrabold text-[#0a1030]/45"> /თვე</span>}
                </div>
                <div className="mt-0.5 text-[14px] font-bold text-[#0a1030]/45">
                  {priceAlt} · ${l.perM2USD.toLocaleString('en-US')}/მ²
                </div>
              </div>
              {/* Currency toggle */}
              <div className="flex rounded-xl bg-[#0a1030]/[0.05] p-1" role="tablist" aria-label="ვალუტა">
                {(['USD', 'GEL'] as const).map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={currency === c}
                    onClick={() => setCurrency(c)}
                    className={`relative rounded-lg px-5 py-2.5 text-[13px] font-extrabold transition-colors ${
                      currency === c ? 'text-white' : 'text-[#0a1030]/60 hover:text-[#0a1030]'
                    }`}
                  >
                    {currency === c && (
                      <motion.span
                        layoutId="cur-seg"
                        className="absolute inset-0 rounded-lg bg-[#2e6bff]"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{c === 'USD' ? '$ USD' : '₾ GEL'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI assessment */}
            <div className="mt-6 overflow-hidden rounded-[26px] border border-[#2e6bff]/15 bg-gradient-to-br from-[#2e6bff]/[0.06] via-white to-[#7a5cff]/[0.06] p-6 shadow-card">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#2e6bff]" />
                <span className="text-[12px] font-black uppercase tracking-wider text-[#2e6bff]">
                  AI ფასის შეფასება
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="relative grid h-[88px] w-[88px] shrink-0 place-items-center">
                  <svg viewBox="0 0 36 36" className="h-[88px] w-[88px] -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#2e6bff" strokeOpacity="0.12" strokeWidth="3" />
                    <motion.circle
                      cx="18" cy="18" r="15.5" fill="none" stroke="url(#aigrad-lg)" strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 97.4' }}
                      whileInView={{ strokeDasharray: `${(l.ai.score / 100) * 97.4} 97.4` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease }}
                    />
                    <defs>
                      <linearGradient id="aigrad-lg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2e6bff" />
                        <stop offset="100%" stopColor="#7a5cff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-[24px] font-black leading-none text-[#2e6bff]">{l.ai.score}</div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#0a1030]/40">/ 100</div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[18px] font-black text-[#0a1030]">{l.ai.label}</div>
                  <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-[#0a1030]/55">
                    {aiExplanation(l)}
                  </p>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[22px] border border-[#0a1030]/[0.06] bg-white p-4 shadow-card"
                >
                  <s.icon className="h-5 w-5 text-[#2e6bff]" />
                  <div className="mt-2.5 text-[18px] font-black text-[#0a1030]">{s.value}</div>
                  <div className="text-[12px] font-bold text-[#0a1030]/45">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-[20px] font-black tracking-[-0.02em] text-[#0a1030]">მახასიათებლები</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {l.features.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 rounded-full border border-[#0a1030]/[0.08] bg-white px-4 py-2 text-[13px] font-bold text-[#0a1030]/70"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-[#2e6bff]" /> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-[20px] font-black tracking-[-0.02em] text-[#0a1030]">აღწერა</h2>
              <p className="mt-3 text-[15px] font-medium leading-[1.8] text-[#0a1030]/65">
                {l.description}
              </p>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h2 className="text-[20px] font-black tracking-[-0.02em] text-[#0a1030]">მდებარეობა</h2>
              <div className="relative mt-4 overflow-hidden rounded-[26px] shadow-card">
                <img src="/images/map3d.png" alt="რუკა" className="h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b26]/60 via-transparent to-transparent" />
                {/* Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="animate-pin block h-5 w-5 rounded-full border-[3px] border-white bg-[#ff6a2d] shadow-lg" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="rounded-2xl glass px-4 py-2.5">
                    <div className="flex items-center gap-1.5 text-[13px] font-extrabold text-white">
                      <MapPin className="h-3.5 w-3.5 text-[#ff6a2d]" /> {l.address}
                    </div>
                    <div className="mt-0.5 text-[11px] font-bold text-white/55">
                      {l.coords.lat.toFixed(4)}, {l.coords.lng.toFixed(4)}
                    </div>
                  </div>
                  <span className="rounded-full glass px-3.5 py-1.5 text-[11px] font-bold text-white/70">
                    3D რუკა — მალე ინტერაქტიული
                  </span>
                </div>
              </div>
            </div>

            {/* Mortgage calculator */}
            {isSale && (
              <div className="mt-8 rounded-[26px] border border-[#0a1030]/[0.06] bg-white p-6 shadow-card md:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2e6bff]/10">
                    <Calculator className="h-5 w-5 text-[#2e6bff]" />
                  </span>
                  <div>
                    <h2 className="text-[20px] font-black tracking-[-0.02em] text-[#0a1030]">იპოთეკის კალკულატორი</h2>
                    <p className="text-[12px] font-bold text-[#0a1030]/45">ანაუიტეტური გრაფიკი · კურსი 1$ = {USD_GEL} ₾</p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Down payment */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[13px] font-bold">
                      <span className="text-[#0a1030]/60">პირველადი შენატანი</span>
                      <span className="text-[#0a1030]">{downPct}% · {formatUSD(Math.round(l.priceUSD * downPct / 100))}</span>
                    </div>
                    <input
                      type="range" min={0} max={70} step={5} value={downPct}
                      onChange={(e) => setDownPct(Number(e.target.value))}
                      aria-label="პირველადი შენატანი პროცენტებში"
                      className="sv-range w-full"
                    />
                  </div>
                  {/* Years */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[13px] font-bold">
                      <span className="text-[#0a1030]/60">ვადა</span>
                      <span className="text-[#0a1030]">{years} წელი</span>
                    </div>
                    <input
                      type="range" min={1} max={30} step={1} value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      aria-label="სესხის ვადა წლებში"
                      className="sv-range w-full"
                    />
                  </div>
                  {/* Rate */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[13px] font-bold">
                      <span className="text-[#0a1030]/60">საპროცენტო განაკვეთი (წლიური)</span>
                    </div>
                    <div className="relative w-[140px]">
                      <input
                        type="number" min={0} max={30} step={0.1} value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        aria-label="საპროცენტო განაკვეთი"
                        className="h-11 w-full rounded-xl border border-[#0a1030]/10 bg-white px-3.5 pr-8 text-[14px] font-extrabold text-[#0a1030] outline-none transition-colors focus:border-[#2e6bff]"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] font-extrabold text-[#0a1030]/40">%</span>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#2e6bff]/[0.08] to-[#7a5cff]/[0.08] p-5 ring-1 ring-inset ring-[#2e6bff]/15">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#2e6bff]">თვიური გადასახადი</div>
                    <div className="mt-1 text-[28px] font-black tracking-tight text-[#0a1030]">
                      {formatUSD(Math.round(monthlyUSD))}
                      <span className="text-[15px] font-extrabold text-[#0a1030]/45"> /თვე</span>
                    </div>
                    <div className="text-[13px] font-bold text-[#0a1030]/45">
                      ≈ {formatGEL(Math.round(monthlyUSD * USD_GEL))} თვეში
                    </div>
                  </div>
                  <div className="text-right text-[12px] font-bold leading-relaxed text-[#0a1030]/45">
                    სესხის თანხა<br />
                    <span className="text-[15px] font-black text-[#0a1030]">
                      {formatUSD(Math.round(l.priceUSD * (1 - downPct / 100)))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: agent card (sticky) */}
          <aside className="lg:sticky lg:top-[92px] lg:self-start">
            <div className="rounded-[26px] border border-[#0a1030]/[0.06] bg-white p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2e6bff] to-[#7a5cff] text-[18px] font-black text-white">
                  {l.agent.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[16px] font-black text-[#0a1030]">
                    <span className="truncate">{l.agent.name}</span>
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#2e6bff]" aria-label="ვერიფიცირებული აგენტი" />
                  </div>
                  <div className="text-[13px] font-bold text-[#0a1030]/45">{l.agent.agency}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${l.agent.phone.replace(/\s/g, '')}`}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff6a2d] text-[14px] font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(255,106,45,0.8)] transition-all duration-300 hover:bg-[#ff5a14]"
                >
                  <Phone className="h-4 w-4" /> დარეკვა
                </a>
                <button
                  onClick={() => toast.info('მესიჯები მალე დაემატება', { description: 'ჩატი აგენტთან მუშავდება' })}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#2e6bff]/25 bg-[#2e6bff]/[0.06] text-[14px] font-extrabold text-[#2e6bff] transition-all duration-300 hover:bg-[#2e6bff]/10"
                >
                  <MessageCircle className="h-4 w-4" /> მესიჯი
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-[#0a1030]/[0.03] p-4 text-center">
                <div className="text-[12px] font-bold text-[#0a1030]/45">აგენტის ტელეფონი</div>
                <a
                  href={`tel:${l.agent.phone.replace(/\s/g, '')}`}
                  className="mt-0.5 block text-[16px] font-black tracking-wide text-[#0a1030] transition-colors hover:text-[#2e6bff]"
                >
                  {l.agent.phone}
                </a>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#0a1030]/35">
                <BadgeCheck className="h-3.5 w-3.5 text-[#4ade80]" />
                განცხადება ვერიფიცირებულია სივრცის გუნდის მიერ
              </p>
            </div>

            {/* Safety note */}
            <div className="mt-4 rounded-[22px] border border-[#0a1030]/[0.06] bg-white p-5 shadow-card">
              <div className="text-[13px] font-black text-[#0a1030]">უსაფრთხოების რჩევა</div>
              <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-[#0a1030]/50">
                არ გადაიხადო ავანსი ქონების ნახვამდე. სივრცე არასდროს
                გთხოვს გადახდას პლატფორმის გარეთ.
              </p>
            </div>
          </aside>
        </div>

        {/* ————— Similar ————— */}
        {similar.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-[24px] font-black tracking-[-0.02em] text-[#0a1030] md:text-[28px]">
                  მსგავსი განცხადებები
                </h2>
                <p className="mt-1 text-[14px] font-semibold text-[#0a1030]/50">
                  იგივე უბანი ან ტიპი · {isSale ? 'იყიდება' : 'ქირავდება'}
                </p>
              </div>
              <Link
                to={`/search?deal=${l.dealType}&type=${l.propType}`}
                className="hidden shrink-0 items-center gap-2 text-[14px] font-extrabold text-[#2e6bff] transition-colors hover:text-[#1a4fd6] sm:flex"
              >
                მეტის ნახვა <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {similar.map((s, i) => (
                <ListingCard key={s.id} l={s} i={i} layout="wide" />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={l.images}
            index={photo}
            onClose={() => setLightbox(false)}
            onNav={navPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function formatListingTitlePrice(l: Listing): string {
  return l.dealType === 'rent' ? `${formatUSD(l.priceUSD)}/თვე` : formatUSD(l.priceUSD)
}

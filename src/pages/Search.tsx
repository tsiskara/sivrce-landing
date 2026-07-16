import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search as SearchIcon, X, LayoutGrid, Rows3,
  ChevronDown, MapPin, RotateCcw, SearchX, Home,
} from 'lucide-react'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import ListingCard from '../components/ListingCard'
import {
  filterListings, CITIES, districtsOf,
  type DealType, type PropType, type SortKey, type Listing,
} from '../data/listings'

const ease = [0.21, 0.65, 0.2, 1] as const

const PROP_TYPES: { value: PropType; label: string }[] = [
  { value: 'apartment', label: 'ბინა' },
  { value: 'house', label: 'სახლი / აგარაკი' },
  { value: 'commercial', label: 'კომერციული' },
  { value: 'land', label: 'მიწა' },
]

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'date', label: 'თარიღით' },
  { value: 'price-asc', label: 'ფასი: ზრდადი' },
  { value: 'price-desc', label: 'ფასი: კლებადი' },
  { value: 'area', label: 'ფართით' },
  { value: 'ai', label: 'AI ქულით' },
]

const ROOM_OPTIONS = ['1+', '2', '3', '4', '5+'] as const

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card border border-sv-ink/[0.06] bg-white shadow-card">
      <div className="aspect-[4/3] animate-pulse bg-sv-ink/[0.06]" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-sv-ink/[0.08]" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-sv-ink/[0.06]" />
        <div className="h-10 animate-pulse rounded-module bg-sv-ink/[0.05]" />
      </div>
    </div>
  )
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  // ——— Read filters from URL ———
  const deal = (params.get('deal') as DealType | null) ?? undefined
  const type = (params.get('type') as PropType | null) ?? undefined
  const city = params.get('city') ?? undefined
  const district = params.get('district') ?? undefined
  const minPrice = params.get('min') ? Number(params.get('min')) : undefined
  const maxPrice = params.get('max') ? Number(params.get('max')) : undefined
  const rooms = params.get('rooms') ? Number(params.get('rooms')) : undefined
  const minArea = params.get('amin') ? Number(params.get('amin')) : undefined
  const maxArea = params.get('amax') ? Number(params.get('amax')) : undefined
  const sort = (params.get('sort') as SortKey | null) ?? 'date'
  const q = params.get('q') ?? ''

  const patchParams = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === '') next.delete(k)
      else next.set(k, v)
    }
    setParams(next, { preventScrollReset: true })
  }

  // ——— Simulated fetch: brief skeleton on every filter change ———
  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), 320)
    return () => window.clearTimeout(t)
  }, [params])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.title = 'ძიება — ბინები, სახლები, კომერციული | სივრცე'
    return () => {
      document.title = 'სივრცე — უძრავი ქონება ერთ სივრცეში'
    }
  }, [])

  const results: Listing[] = useMemo(
    () =>
      filterListings({
        deal, type, city, district,
        minPrice, maxPrice, rooms, minArea, maxArea,
        q: q || undefined, sort,
      }),
    [deal, type, city, district, minPrice, maxPrice, rooms, minArea, maxArea, q, sort],
  )

  // ——— Active filter chips ———
  const chips: { key: string; label: string; clear: () => void }[] = []
  if (deal) chips.push({ key: 'deal', label: deal === 'sale' ? 'იყიდება' : 'ქირავდება', clear: () => patchParams({ deal: undefined }) })
  if (type) chips.push({ key: 'type', label: PROP_TYPES.find((p) => p.value === type)?.label ?? type, clear: () => patchParams({ type: undefined }) })
  if (city) chips.push({ key: 'city', label: city, clear: () => patchParams({ city: undefined, district: undefined }) })
  if (district) chips.push({ key: 'district', label: district, clear: () => patchParams({ district: undefined }) })
  if (minPrice !== undefined) chips.push({ key: 'min', label: `მინ. $${minPrice.toLocaleString('en-US')}`, clear: () => patchParams({ min: undefined }) })
  if (maxPrice !== undefined) chips.push({ key: 'max', label: `მაქს. $${maxPrice.toLocaleString('en-US')}`, clear: () => patchParams({ max: undefined }) })
  if (rooms !== undefined) chips.push({ key: 'rooms', label: `${rooms}+ ოთახი`, clear: () => patchParams({ rooms: undefined }) })
  if (minArea !== undefined) chips.push({ key: 'amin', label: `მინ. ${minArea} მ²`, clear: () => patchParams({ amin: undefined }) })
  if (maxArea !== undefined) chips.push({ key: 'amax', label: `მაქს. ${maxArea} მ²`, clear: () => patchParams({ amax: undefined }) })
  if (q) chips.push({ key: 'q', label: `„${q}"`, clear: () => patchParams({ q: undefined }) })

  const resetAll = () => setParams(new URLSearchParams(), { preventScrollReset: true })

  const selectClass =
    'h-10 w-full appearance-none rounded-control border border-sv-ink/10 bg-white pl-3.5 pr-9 text-[13px] font-bold text-sv-ink outline-none transition-colors focus:border-sv-blue cursor-pointer'
  const inputClass =
    'h-10 w-full rounded-control border border-sv-ink/10 bg-white px-3.5 text-[13px] font-bold text-sv-ink outline-none transition-colors placeholder:text-sv-ink/35 focus:border-sv-blue'

  return (
    <div className="font-geo min-h-screen bg-sv-cloud antialiased">
      <Navbar />

      {/* Page header */}
      <div className="bg-sv-navy pb-8 pt-[104px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <h1 className="text-[28px] font-black tracking-[-0.02em] text-white md:text-[36px]">
            ძიება
          </h1>
          <p className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-white/55">
            <MapPin className="h-4 w-4 text-sv-blue" />
            {city ?? 'მთელი საქართველო'}
            {district ? ` · ${district}` : ''}
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[80px] z-40 border-b border-sv-ink/[0.06] glass-light md:top-[88px]">
        <div className="mx-auto max-w-[1440px] px-4 py-3 md:px-10">
          {/* Row 1: deal + type + location + sort */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Deal segmented */}
            <div className="flex rounded-control bg-sv-ink/[0.05] p-1" role="tablist" aria-label="გარიგების ტიპი">
              {([undefined, 'sale', 'rent'] as const).map((d) => {
                const label = d === undefined ? 'ყველა' : d === 'sale' ? 'იყიდება' : 'ქირავდება'
                const active = deal === d
                return (
                  <button
                    key={label}
                    role="tab"
                    aria-selected={active}
                    onClick={() => patchParams({ deal: d })}
                    className={`relative rounded-lg px-4 py-2 text-[13px] font-extrabold transition-colors ${
                      active ? 'text-white' : 'text-sv-ink/60 hover:text-sv-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="deal-seg"
                        className="absolute inset-0 rounded-lg bg-sv-blue"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                )
              })}
            </div>

            {/* Property type */}
            <div className="relative">
              <select
                value={type ?? ''}
                onChange={(e) => patchParams({ type: (e.target.value || undefined) as PropType | undefined })}
                className={selectClass}
                aria-label="ქონების ტიპი"
              >
                <option value="">ყველა ტიპი</option>
                {PROP_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sv-ink/40" />
            </div>

            {/* City */}
            <div className="relative">
              <select
                value={city ?? ''}
                onChange={(e) => patchParams({ city: e.target.value || undefined, district: undefined })}
                className={selectClass}
                aria-label="ქალაქი"
              >
                <option value="">ყველა ქალაქი</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sv-ink/40" />
            </div>

            {/* District */}
            <div className="relative">
              <select
                value={district ?? ''}
                onChange={(e) => patchParams({ district: e.target.value || undefined })}
                className={selectClass}
                aria-label="უბანი"
              >
                <option value="">ყველა უბანი</option>
                {districtsOf(city).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sv-ink/40" />
            </div>

            {/* Keyword */}
            <label className="relative min-w-[160px] flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sv-ink/35" />
              <input
                value={q}
                onChange={(e) => patchParams({ q: e.target.value || undefined })}
                placeholder="ქუჩა, უბანი, საკვანძო სიტყვა…"
                className={`${inputClass} pl-10`}
                aria-label="საძიებო სიტყვა"
              />
            </label>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => patchParams({ sort: e.target.value === 'date' ? undefined : e.target.value })}
                className={selectClass}
                aria-label="დალაგება"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sv-ink/40" />
            </div>

            {/* View toggle */}
            <div className="ml-auto flex rounded-control bg-sv-ink/[0.05] p-1" aria-label="ხედი">
              <button
                onClick={() => setView('grid')}
                aria-label="ბადე"
                aria-pressed={view === 'grid'}
                className={`grid h-8 w-9 place-items-center rounded-lg transition-colors ${view === 'grid' ? 'bg-white text-sv-blue shadow-sm' : 'text-sv-ink/45 hover:text-sv-ink'}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                aria-label="სია"
                aria-pressed={view === 'list'}
                className={`grid h-8 w-9 place-items-center rounded-lg transition-colors ${view === 'list' ? 'bg-white text-sv-blue shadow-sm' : 'text-sv-ink/45 hover:text-sv-ink'}`}
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Row 2: price + rooms + area */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-black uppercase tracking-wide text-sv-ink/40">ფასი $</span>
              <input
                type="number" min={0} placeholder="მინ"
                value={minPrice ?? ''}
                onChange={(e) => patchParams({ min: e.target.value || undefined })}
                className={`${inputClass} w-[104px]`}
                aria-label="მინიმალური ფასი"
              />
              <span className="text-sv-ink/30">—</span>
              <input
                type="number" min={0} placeholder="მაქს"
                value={maxPrice ?? ''}
                onChange={(e) => patchParams({ max: e.target.value || undefined })}
                className={`${inputClass} w-[104px]`}
                aria-label="მაქსიმალური ფასი"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-black uppercase tracking-wide text-sv-ink/40">ოთახი</span>
              <div className="flex gap-1">
                {ROOM_OPTIONS.map((r, idx) => {
                  const n = idx + 1
                  const active = rooms === n
                  return (
                    <button
                      key={r}
                      onClick={() => patchParams({ rooms: active ? undefined : String(n) })}
                      aria-pressed={active}
                      className={`h-10 min-w-[44px] rounded-control px-2.5 text-[13px] font-extrabold transition-colors ${
                        active
                          ? 'bg-sv-blue text-white shadow-glow-blue-sm'
                          : 'border border-sv-ink/10 bg-white text-sv-ink/60 hover:border-sv-blue/50 hover:text-sv-blue'
                      }`}
                    >
                      {r}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-black uppercase tracking-wide text-sv-ink/40">ფართი მ²</span>
              <input
                type="number" min={0} placeholder="მინ"
                value={minArea ?? ''}
                onChange={(e) => patchParams({ amin: e.target.value || undefined })}
                className={`${inputClass} w-[88px]`}
                aria-label="მინიმალური ფართი"
              />
              <span className="text-sv-ink/30">—</span>
              <input
                type="number" min={0} placeholder="მაქს"
                value={maxArea ?? ''}
                onChange={(e) => patchParams({ amax: e.target.value || undefined })}
                className={`${inputClass} w-[88px]`}
                aria-label="მაქსიმალური ფართი"
              />
            </div>

            {chips.length > 0 && (
              <button
                onClick={resetAll}
                className="ml-auto flex items-center gap-1.5 rounded-control px-3 py-2 text-[13px] font-extrabold text-sv-orange transition-colors hover:bg-sv-orange/10"
              >
                <RotateCcw className="h-3.5 w-3.5" /> გასუფთავება
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="mx-auto max-w-[1440px] px-5 py-8 md:px-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <p className="text-[15px] font-extrabold text-sv-ink" aria-live="polite">
            {loading ? 'იტვირთება…' : `${results.length} განცხადება`}
          </p>
          <AnimatePresence>
            {chips.map((c) => (
              <motion.button
                key={c.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease }}
                onClick={c.clear}
                className="flex items-center gap-1.5 rounded-full bg-sv-blue/10 px-3.5 py-1.5 text-[12px] font-extrabold text-sv-blue transition-colors hover:bg-sv-blue/15"
              >
                {c.label}
                <X className="h-3 w-3" aria-label={`ფილტრის წაშლა: ${c.label}`} />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className={`grid gap-6 ${view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center rounded-card border border-sv-ink/[0.06] bg-white px-6 py-20 text-center shadow-card">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sv-blue/10">
              <SearchX className="h-7 w-7 text-sv-blue" />
            </span>
            <h2 className="mt-5 text-[20px] font-black tracking-[-0.02em] text-sv-ink">
              ვერაფერი მოიძებნა
            </h2>
            <p className="mt-2 max-w-[380px] text-[14px] font-semibold leading-relaxed text-sv-ink/50">
              არჩეული ფილტრებით განცხადება არ არსებობს. სცადე ფილტრების შეცვლა
              ან სრული გასუფთავება.
            </p>
            <button
              onClick={resetAll}
              className="mt-6 flex h-11 items-center gap-2 rounded-full bg-sv-blue px-6 text-[14px] font-extrabold text-white transition-all hover:bg-sv-blue-deep"
            >
              <RotateCcw className="h-4 w-4" /> ფილტრების გასუფთავება
            </button>
          </div>
        ) : (
          <div className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'grid grid-cols-1 gap-5'}>
            {results.map((l, i) => (
              <ListingCard key={l.id} l={l} i={i} layout={view === 'grid' ? 'wide' : 'list'} />
            ))}
          </div>
        )}

        {/* SEO hint */}
        {!loading && results.length > 0 && (
          <p className="mt-10 flex items-start gap-2 text-[13px] font-semibold leading-relaxed text-sv-ink/40">
            <Home className="mt-0.5 h-4 w-4 shrink-0" />
            სივრცეზე ყველა განცხადება ვერიფიცირებულია და თან ახლავს AI ფასის შეფასება —
            ბინები, სახლები და კომერციული ფართები თბილისში, ბათუმსა და ქუთაისში.
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}

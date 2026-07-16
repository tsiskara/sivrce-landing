'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, Banknote, Ruler, SlidersHorizontal, Sparkles, ChevronDown, BadgeCheck, ShieldCheck, Zap } from 'lucide-react'
import HeroBackground from './HeroBackground'

const TABS = ['იყიდება', 'ქირავდება', 'დღიურად', 'ახალი პროექტები']

const QUICK = ['ვაკე', 'საბურთალო', 'მთაწმინდა', 'ბათუმი', 'ძველი თბილისი', 'დიღომი']

const TRUST = [
  { icon: BadgeCheck, label: 'ვერიფიცირებული განცხადებები' },
  { icon: ShieldCheck, label: 'უსაფრთხო გარიგებები' },
  { icon: Zap, label: 'AI ფასის შეფასება' },
]

const ease = [0.21, 0.65, 0.2, 1] as const

export default function Hero() {
  const [tab, setTab] = useState(0)
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const submitSearch = () => {
    if (tab === 3) {
      // „ახალი პროექტები" tab → homepage projects section
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const params = new URLSearchParams()
    if (tab === 0) params.set('deal', 'sale')
    if (tab === 1 || tab === 2) params.set('deal', 'rent')
    if (keyword.trim()) params.set('q', keyword.trim())
    const qs = params.toString()
    router.push(qs ? `/search?${qs}` : '/search')
  }

  const goDistrict = (q: string) => router.push(`/search?q=${encodeURIComponent(q)}`)

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-sv-navy">
      {/* Animated brand background */}
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col items-center justify-center px-5 pb-24 pt-36 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-7 flex items-center gap-2.5 rounded-full glass px-5 py-2.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sv-success opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sv-success" />
          </span>
          <span className="text-[13px] font-bold tracking-wide text-white/90 md:text-[14px]">
            52,400+ აქტიური განცხადება საქართველოში
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="text-balance text-center text-[44px] font-black leading-[1.06] tracking-[-0.03em] text-white md:text-[72px] lg:text-[84px]"
        >
          იპოვე შენი
          <span className="text-gradient-orange"> სივრცე</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease }}
          className="mt-6 max-w-[640px] text-balance text-center text-[16px] font-medium leading-relaxed text-white/70 md:text-[19px]"
        >
          ბინები, სახლები, აგარაკები, მიწა და კომერციული ფართები — ყველაფერი ერთ
          პლატფორმაზე, 3D რუკით და AI შეფასებით
        </motion.p>

        {/* Search panel */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="mt-11 w-full max-w-[980px]"
        >
          {/* Tabs */}
          <div className="mb-0 flex w-fit items-center gap-1 rounded-t-tile glass p-1.5 max-md:mx-auto">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`relative rounded-control px-4 py-2.5 text-[13px] font-extrabold transition-colors md:px-5 md:text-[14px] ${
                  tab === i ? 'text-sv-ink' : 'text-white/75 hover:text-white'
                }`}
              >
                {tab === i && (
                  <motion.span
                    layoutId="hero-tab"
                    className="absolute inset-0 rounded-control bg-white"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="glass rounded-b-tile rounded-tr-tile p-2 shadow-panel-dark backdrop-blur-2xl">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
              <label className="col-span-2 flex items-center gap-3 rounded-control bg-white/[0.07] px-4 py-3.5 transition-colors focus-within:bg-white/[0.12] md:col-span-1">
                <Search className="h-[18px] w-[18px] shrink-0 text-white/50" />
                <input
                  type="text"
                  placeholder="ქალაქი, უბანი, ქუჩა ან ID"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                  className="w-full bg-transparent text-[15px] font-semibold text-white placeholder:text-white/45 focus:outline-none"
                />
              </label>
              {[
                { icon: Home, label: 'ტიპი', value: 'ბინა' },
                { icon: Banknote, label: 'ფასი', value: 'ნებისმიერი' },
                { icon: Ruler, label: 'ფართი', value: '40+ მ²' },
              ].map((f) => (
                <button
                  key={f.label}
                  className="group flex items-center gap-3 rounded-control bg-white/[0.07] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.12]"
                >
                  <f.icon className="h-[18px] w-[18px] shrink-0 text-white/50" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-white/45">
                      {f.label}
                    </span>
                    <span className="block truncate text-[14px] font-bold text-white">{f.value}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/40 transition-transform group-hover:translate-y-0.5" />
                </button>
              ))}
              <button
                onClick={submitSearch}
                className="col-span-2 flex items-center justify-center gap-2.5 rounded-control bg-sv-orange px-7 py-3.5 text-[15px] font-extrabold text-white shadow-glow-orange transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-orange-lg md:col-span-1"
              >
                <Search className="h-[18px] w-[18px]" />
                ძიება
              </button>
            </div>

            {/* Sub row */}
            <div className="mt-2 flex flex-wrap items-center gap-2 px-1 pb-1">
              <button
                onClick={() => router.push('/search')}
                className="flex items-center gap-2 rounded-control px-3 py-2 text-[13px] font-bold text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <SlidersHorizontal className="h-4 w-4" /> დეტალური ფილტრი
              </button>
              <button className="flex items-center gap-2 rounded-control px-3 py-2 text-[13px] font-bold text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white">
                <MapPin className="h-4 w-4" /> ძიება რუკით
              </button>
              <button className="flex items-center gap-2 rounded-control bg-gradient-to-r from-sv-blue/25 to-sv-violet/25 px-3 py-2 text-[13px] font-bold text-sv-blue-light ring-1 ring-inset ring-sv-blue/40 transition-colors hover:text-white">
                <Sparkles className="h-4 w-4" /> AI ძიება ბუნებრივი ენით
              </button>
            </div>
          </div>

          {/* Quick chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[13px] font-bold text-white/45">პოპულარული:</span>
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => goDistrict(q)}
                className="rounded-full glass px-4 py-1.5 text-[13px] font-bold text-white/85 transition-all duration-200 hover:bg-white/20 hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 text-white/60">
              <t.icon className="h-[18px] w-[18px] text-sv-success" />
              <span className="text-[13px] font-bold md:text-[14px]">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  )
}

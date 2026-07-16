import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart, Globe, Menu, X, Plus, User } from 'lucide-react'
import { Logo } from '../components/Reveal'
import { useFavorites } from '../lib/favorites'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count } = useFavorites()
  const { pathname } = useLocation()

  // On dark hero (homepage top) the bar is transparent with white text.
  // Everywhere else (or once scrolled) it uses the light glass style.
  const light = scrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const NAV_LINKS = [
    { label: 'იყიდება', to: '/search?deal=sale' },
    { label: 'ქირავდება', to: '/search?deal=rent' },
    { label: 'ძიება', to: '/search' },
    { label: 'ახალი პროექტები', to: `${pathname === '/' ? '' : '/'}#projects` },
    { label: 'სერვისები', to: `${pathname === '/' ? '' : '/'}#services` },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.65, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-500 md:px-10 ${
          light
            ? 'mt-3 max-w-[1240px] rounded-tile glass-light shadow-card md:mt-4'
            : 'bg-transparent'
        }`}
      >
        <Logo light={!light} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="მთავარი ნავიგაცია">
          {NAV_LINKS.map((l) =>
            l.to.includes('#') ? (
              <a
                key={l.label}
                href={l.to}
                className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors duration-200 ${
                  light
                    ? 'text-sv-ink/80 hover:bg-sv-ink/5 hover:text-sv-ink'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors duration-200 ${
                  light
                    ? 'text-sv-ink/80 hover:bg-sv-ink/5 hover:text-sv-ink'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
          <button
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
              light
                ? 'text-sv-ink/80 hover:bg-sv-ink/5'
                : 'text-white/85 hover:bg-white/10'
            }`}
          >
            მეტი <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/search"
            aria-label={`ფავორიტები${count > 0 ? ` — ${count}` : ''}`}
            className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors ${
              light ? 'text-sv-ink/70 hover:bg-sv-ink/5' : 'text-white/85 hover:bg-white/10'
            }`}
          >
            <Heart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-sv-orange px-1 text-[10px] font-black text-white">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
          <button
            className={`flex h-10 items-center gap-1.5 rounded-full px-3 text-[14px] font-bold transition-colors ${
              light ? 'text-sv-ink/70 hover:bg-sv-ink/5' : 'text-white/85 hover:bg-white/10'
            }`}
          >
            <Globe className="h-4 w-4" /> KA
          </button>
          <button
            className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-bold transition-colors ${
              light ? 'text-sv-ink hover:bg-sv-ink/5' : 'text-white hover:bg-white/10'
            }`}
          >
            <User className="h-4 w-4" /> შესვლა
          </button>
          <a
            href="#"
            className="group flex h-11 items-center gap-2 rounded-full bg-sv-orange px-5 text-[14px] font-extrabold text-white shadow-glow-orange transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-orange-lg"
          >
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            განცხადება
          </a>
        </div>

        <button
          className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
            light ? 'text-sv-ink' : 'text-white'
          }`}
          onClick={() => setOpen(!open)}
          aria-label="მენიუ"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 rounded-tile glass-light p-4 shadow-card md:hidden"
          >
            {NAV_LINKS.map((l) =>
              l.to.includes('#') ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-control px-4 py-3 text-[16px] font-semibold text-sv-ink hover:bg-sv-ink/5"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-control px-4 py-3 text-[16px] font-semibold text-sv-ink hover:bg-sv-ink/5"
                >
                  {l.label}
                </Link>
              ),
            )}
            <a
              href="#"
              className="mt-2 flex items-center justify-center gap-2 rounded-control bg-[#ff6a2d] px-4 py-3.5 text-[15px] font-extrabold text-white"
            >
              <Plus className="h-4 w-4" /> განცხადების დამატება
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart, Globe, Menu, X, Plus, User } from 'lucide-react'
import { Logo } from '../components/Reveal'

const NAV_LINKS = [
  { label: 'იყიდება', href: '#' },
  { label: 'ქირავდება', href: '#' },
  { label: 'დღიურად', href: '#' },
  { label: 'ახალი პროექტები', href: '#projects' },
  { label: 'სერვისები', href: '#services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.65, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-500 md:px-10 ${
          scrolled
            ? 'mt-3 max-w-[1240px] rounded-2xl glass-light shadow-card md:mt-4'
            : 'bg-transparent'
        }`}
      >
        <Logo light={!scrolled} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="მთავარი ნავიგაცია">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors duration-200 ${
                scrolled
                  ? 'text-[#0a1030]/80 hover:bg-[#0a1030]/5 hover:text-[#0a1030]'
                  : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
              scrolled
                ? 'text-[#0a1030]/80 hover:bg-[#0a1030]/5'
                : 'text-white/85 hover:bg-white/10'
            }`}
          >
            მეტი <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            aria-label="ფავორიტები"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
              scrolled ? 'text-[#0a1030]/70 hover:bg-[#0a1030]/5' : 'text-white/85 hover:bg-white/10'
            }`}
          >
            <Heart className="h-[18px] w-[18px]" />
          </button>
          <button
            className={`flex h-10 items-center gap-1.5 rounded-full px-3 text-[14px] font-bold transition-colors ${
              scrolled ? 'text-[#0a1030]/70 hover:bg-[#0a1030]/5' : 'text-white/85 hover:bg-white/10'
            }`}
          >
            <Globe className="h-4 w-4" /> KA
          </button>
          <button
            className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-bold transition-colors ${
              scrolled ? 'text-[#0a1030] hover:bg-[#0a1030]/5' : 'text-white hover:bg-white/10'
            }`}
          >
            <User className="h-4 w-4" /> შესვლა
          </button>
          <a
            href="#"
            className="group flex h-11 items-center gap-2 rounded-full bg-[#ff6a2d] px-5 text-[14px] font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(255,106,45,0.8)] transition-all duration-300 hover:bg-[#ff5a14] hover:shadow-[0_12px_32px_-8px_rgba(255,106,45,0.9)]"
          >
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            განცხადება
          </a>
        </div>

        <button
          className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
            scrolled ? 'text-[#0a1030]' : 'text-white'
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
            className="mx-4 mt-2 rounded-2xl glass-light p-4 shadow-card md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[16px] font-semibold text-[#0a1030] hover:bg-[#0a1030]/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#ff6a2d] px-4 py-3.5 text-[15px] font-extrabold text-white"
            >
              <Plus className="h-4 w-4" /> განცხადების დამატება
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative block shrink-0 transition-transform duration-300 group-hover:scale-[1.06] group-active:scale-95"
      style={{ width: size, height: size }}
    >
      {/* Squircle tile */}
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id="sv-tile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4d8bff" />
            <stop offset="55%" stopColor="#2e6bff" />
            <stop offset="100%" stopColor="#1a3fc0" />
          </linearGradient>
          <linearGradient id="sv-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dbe7ff" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="46" height="46" rx="14" fill="url(#sv-tile)" />
        {/* inner top light */}
        <rect x="1" y="1" width="46" height="23" rx="14" fill="#ffffff" opacity="0.12" />
        <rect x="1.75" y="1.75" width="44.5" height="44.5" rx="13" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" />
        {/* S — smooth infinite curve, the shape of a path through space */}
        <path
          d="M31.5 16.6C30 13.6 27.1 12 23.8 12c-4 0-7 1.9-7 4.9 0 6.6 14.6 3.6 14.6 10.9 0 3.2-3.2 5.1-7.3 5.1-3.4 0-6.2-1.4-7.7-3.8"
          fill="none"
          stroke="url(#sv-s)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Brand point — the space marker */}
        <circle cx="33.4" cy="33.8" r="3.1" fill="#ff6a2d" />
        <circle cx="33.4" cy="33.8" r="1.2" fill="#ffd7c2" />
      </svg>
      {/* Soft brand shadow */}
      <span className="absolute inset-0 -z-10 rounded-[14px] bg-sv-blue opacity-40 blur-md" />
    </span>
  )
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="სივრცე — მთავარი">
      <LogoMark size={36} />
      {!compact && (
        <span
          className={`text-[22px] font-extrabold tracking-[-0.045em] ${
            light ? 'text-white' : 'text-sv-ink'
          }`}
        >
          sivrce
          <span className="text-sv-orange">.</span>
        </span>
      )}
    </Link>
  )
}

/**
 * SIVRCE — country flags for the language switcher.
 * Pure inline SVG, circular crop, hairline ring for definition on any
 * surface. No emoji (BRAND.md: vector-only UI), no network requests.
 */

import type { ReactNode } from 'react'

export type FlagCode = 'ge' | 'gb' | 'ru'

const FLAG_ART: Record<FlagCode, ReactNode> = {
  /* Georgia — white field, large red cross, four small crosses */
  ge: (
    <>
      <rect x="0" y="3" width="24" height="18" fill="#ffffff" />
      <rect x="10" y="3" width="4" height="18" fill="#ff0000" />
      <rect x="0" y="10" width="24" height="4" fill="#ff0000" />
      {[
        [5, 6.5],
        [19, 6.5],
        [5, 16.5],
        [19, 16.5],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} fill="#ff0000">
          <rect x={cx - 0.55} y={cy - 1.9} width="1.1" height="3.8" />
          <rect x={cx - 1.9} y={cy - 0.55} width="3.8" height="1.1" />
        </g>
      ))}
    </>
  ),
  /* United Kingdom — Union Jack */
  gb: (
    <>
      <rect x="0" y="3" width="24" height="18" fill="#012169" />
      <path d="M0 3 L24 21 M24 3 L0 21" stroke="#ffffff" strokeWidth="3.4" />
      <path d="M0 3 L24 21 M24 3 L0 21" stroke="#C8102E" strokeWidth="1.15" />
      <rect x="10.1" y="3" width="3.8" height="18" fill="#ffffff" />
      <rect x="0" y="10.1" width="24" height="3.8" fill="#ffffff" />
      <rect x="10.85" y="3" width="2.3" height="18" fill="#C8102E" />
      <rect x="0" y="10.85" width="24" height="2.3" fill="#C8102E" />
    </>
  ),
  /* Russia — white / blue / red tricolor */
  ru: (
    <>
      <rect x="0" y="3" width="24" height="6" fill="#ffffff" />
      <rect x="0" y="9" width="24" height="6" fill="#0039a6" />
      <rect x="0" y="15" width="24" height="6" fill="#d52b1e" />
    </>
  ),
}

export function Flag({ code, size = 16 }: { code: FlagCode; size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(10,16,48,0.12)]"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <clipPath id={`sv-flag-clip-${code}`}>
            <circle cx="12" cy="12" r="12" />
          </clipPath>
        </defs>
        <g clipPath={`url(#sv-flag-clip-${code})`}>{FLAG_ART[code]}</g>
      </svg>
    </span>
  )
}

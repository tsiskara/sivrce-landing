'use client'

/**
 * SIVRCE — language switcher. Segmented control with circular flag icons
 * and a sliding active pill (spring physics, per-instance layoutId so the
 * desktop + mobile instances never fight). Georgian / English / Russian.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Flag, type FlagCode } from '@/components/Flag'
import { useI18n, LANGS } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/context'

const LANG_FLAG: Record<Lang, FlagCode> = { ka: 'ge', en: 'gb', ru: 'ru' }

export function LangSwitcher({ light = false }: { light?: boolean }) {
  const { lang, setLang, t } = useI18n()
  const reduceMotion = useReducedMotion()
  const layoutId = useId()

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`flex items-center rounded-full p-1 ${light ? 'bg-sv-ink/[0.05]' : 'bg-white/10'}`}
    >
      {LANGS.map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`relative flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-extrabold uppercase leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sv-blue focus-visible:ring-offset-2 ${
              active
                ? 'text-white'
                : light
                  ? 'text-sv-ink/55 hover:text-sv-ink'
                  : 'text-white/70 hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                initial={false}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 500, damping: 38, mass: 0.8 }
                }
                className="absolute inset-0 rounded-full bg-sv-blue shadow-glow-blue-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Flag code={LANG_FLAG[code]} size={15} />
              {code}
            </span>
          </button>
        )
      })}
    </div>
  )
}

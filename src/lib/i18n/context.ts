'use client'

/**
 * SIVRCE — i18n context, hook and translation core.
 * Kept component-free so this module stays fast-refresh clean; the provider
 * component lives in @/components/I18nProvider.
 */

import { createContext, useContext } from 'react'
import { ka, type DictKey } from './ka'
import { en } from './en'
import { ru } from './ru'

export type { DictKey }
export type Lang = 'ka' | 'en' | 'ru'

export const LANGS: readonly Lang[] = ['ka', 'en', 'ru']
const STORAGE_KEY = 'sivrce:lang'
const LANG_EVENT = 'sivrce:lang-changed'

const DICTS: Record<Lang, Record<DictKey, string>> = { ka, en, ru }

export interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: DictKey, vars?: Record<string, string | number>) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

/** Client-only: reads localStorage. Used as the useSyncExternalStore snapshot. */
export function readStoredLang(): Lang {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return LANGS.includes(raw as Lang) ? (raw as Lang) : 'ka'
  } catch {
    return 'ka'
  }
}

export function persistLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

/** Server snapshot for useSyncExternalStore — always the default language. */
export function getServerLang(): Lang {
  return 'ka'
}

/** Subscribe to language changes (same-tab setter + cross-tab storage events). */
export function subscribeLang(onChange: () => void): () => void {
  window.addEventListener(LANG_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(LANG_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function emitLangChange() {
  window.dispatchEvent(new CustomEvent(LANG_EVENT))
}

export function translate(
  lang: Lang,
  key: DictKey,
  vars?: Record<string, string | number>,
): string {
  const template = DICTS[lang][key] ?? ka[key]
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : match,
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}

'use client'

/**
 * SIVRCE — theme provider (next-themes).
 * Class strategy on <html>, system by default, persisted to
 * localStorage('sivrce:theme'). Light/dark only — no `theme="system"`
 * exposed in UI; the toggle flips resolvedTheme.
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="sivrce:theme"
    >
      {children}
    </NextThemesProvider>
  )
}

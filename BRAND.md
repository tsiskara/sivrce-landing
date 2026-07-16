# სივრცე — Brand Lock (v1.1)

Everything user-facing must follow this system. No exceptions.
Code tokens: `src/lib/brand.ts` · CSS variables: `src/index.css` · Tailwind palette: `tailwind.config.js`

## 0. Enforcement (how to build UI)

Never write raw hex in components. Use the locked tokens:

| Token | Class examples | Value |
|---|---|---|
| Blue (primary) | `bg-sv-blue` `text-sv-blue/60` `ring-sv-blue/15` | #2E6BFF |
| Blue light | `text-sv-blue-light` | #8FB4FF |
| Blue deep | `hover:bg-sv-blue-deep` | #1A3FC0 |
| Violet — gradients only | `to-sv-violet` | #7A5CFF |
| Orange (action) | `bg-sv-orange` `text-sv-orange` | #FF6A2D |
| Orange light | `to-sv-orange-light` | #FFB25E |
| Orange deep — gradients only | `to-sv-orange-deep` | #FF4D6D |
| Navy (dark bg) | `bg-sv-navy` | #050B26 |
| Navy soft | `to-sv-navy-soft` | #0A1440 |
| Ink (text on light) | `text-sv-ink` `text-sv-ink/50` | #0A1030 |
| Cloud (light bg) | `bg-sv-cloud` | #F6F7FB |
| Success (dark surfaces only) | `text-sv-success` | #4ADE80 |

Radius: `rounded-card` 26 · `rounded-tile` 22 · `rounded-module` 16 · `rounded-control` 12 · `rounded-full` pill.
Elevation: `shadow-card` `shadow-card-hover` `shadow-soft` `shadow-glow-orange` `shadow-glow-orange-lg`
`shadow-glow-blue` `shadow-glow-blue-sm` `shadow-glow-navy` `shadow-panel-dark` `shadow-showcase-blue`.

## 1. Identity
- **Name:** sivrce (always lowercase in the wordmark) + orange period
- **Tagline:** „უძრავი ქონება ერთ სივრცეში" / "Real estate in one space"
- **Personality:** premium, calm, technological, trustworthy — Apple-grade restraint

## 2. Logo
- `LogoMark` — blue squircle (r=14/48), white infinite-S path, **orange space point** at bottom-right
- Never recolor, rotate, outline, or place on busy backgrounds without a dark scrim
- Min clear space = 50% of tile size on all sides
- Wordmark: Manrope 800, tracking −0.045em, lowercase, orange final period (`text-sv-orange`)

## 3. Color
| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `sv-blue` | #2E6BFF | links, icons, AI features, active states |
| Accent | `sv-orange` | #FF6A2D | CTAs, VIP, highlights, favorites — **action only** |
| Deep bg | `sv-navy` | #050B26 | hero + dark sections + footer |
| Text | `sv-ink` | #0A1030 | headlines/body on light |
| Light bg | `sv-cloud` | #F6F7FB | alternating section background |
| Violet | `sv-violet` | #7A5CFF | gradient partner only, never standalone |

Rules:
- Orange ≤ 10% of any viewport · white space is a feature
- Dark sections always use dot-grid/aurora ambience, never flat color
- **Overlays and image scrims are always navy-tinted** (`bg-sv-navy/55`, `from-sv-navy/70`) — never `bg-black/*`
- Shadows are navy-tinted (`rgba(10,16,48,…)` / `rgba(5,11,38,…)` / `rgba(1,4,20,…)`) — never pure black
- **Positive metrics on light backgrounds use `sv-blue`** (brand-positive), not green;
  `sv-success` green is reserved for dark surfaces (LIVE, verified, trust badges)
- **Hover rules:** blue surfaces → `sv-blue-deep`; orange surfaces → keep color, upgrade
  elevation to `shadow-glow-orange-lg` + `hover:-translate-y-0.5` (never a new hue)
- Category/service icon tints cycle only through `sv-blue → sv-blue-deep → sv-ink`,
  with `sv-orange` reserved for the single promoted item

## 4. Typography
- Stack: Manrope (Latin/digits, weights 400–900 loaded) + Noto Sans Georgian
- Headlines: weight 900 (`font-black`), tracking −0.02em…−0.045em, `text-balance`
- Body: 15–17px, weight 500–600, `sv-ink` at 45–75% opacity
- Numbers/prices: Manrope 800–900
- `index.html` MUST load Manrope 900 — headlines break without it

## 5. Shape & Elevation
- Cards r=26 · tiles r=22 · nested modules r=16 · controls r=12 · buttons pill
- **Concentric rule:** inner radius = outer radius − padding (e.g. segmented control:
  outer 12 + p-1 → inner 8 `rounded-lg`)
- **Icon chips:** ≥44px box → r=16 (`rounded-module`); <44px → r=12 (`rounded-control`)
- Shadows only from `elevation` tokens — never `shadow-lg/2xl` or arbitrary black shadows
- Glass: `.glass` (dark) / `.glass-light` (light) — 20px blur, hairline translucent border only

## 6. Motion
- Ease `[0.21,0.65,0.2,1]`, reveals: y+28 → 0, 0.7s, once (`<Reveal />`)
- Hover: lift −6…−8px + shadow upgrade (≤0.5s)
- Respect `prefers-reduced-motion` (handled globally in index.css)

## 7. Iconography & Imagery
- Lucide icons only, 1.5–2px stroke, rounded — **no emoji/unicode glyphs in UI**
  (ratings use `<Star className="fill-sv-orange text-sv-orange" />`)
- Favorites (heart) states: default `sv-ink`, hover/active `sv-orange` (filled)
- AI-generated imagery: dusk/blue-hour real estate, warm interiors;
  no watermarks, no baked-in text/logos (except developer renders)
- 3D-map visuals: navy #050B26 base, blue pins, ONE orange highlight

## 8. VIP system (locked — `BRAND.vipTiers` is the only source)
- VIP — dark navy badge + Flame
- VIP+ — blue→violet gradient + Flame
- SUPER VIP — orange→red gradient + Crown

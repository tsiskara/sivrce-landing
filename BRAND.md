# სივრცე — Brand Lock (v1.0)

Everything user-facing must follow this system. No exceptions.
Code tokens: `src/lib/brand.ts` · CSS utilities: `src/index.css`

## 1. Identity
- **Name:** sivrce (always lowercase in the wordmark) + orange period
- **Tagline:** „უძრავი ქონება ერთ სივრცეში" / "Real estate in one space"
- **Personality:** premium, calm, technological, trustworthy — Apple-grade restraint

## 2. Logo
- `LogoMark` — blue squircle (r=14/48), white infinite-S path, **orange space point** at bottom-right
- Never recolor, rotate, outline, or place on busy backgrounds without a dark scrim
- Min clear space = 50% of tile size on all sides
- Wordmark: Manrope 800, tracking −0.045em, lowercase, orange final period

## 3. Color
| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `blue` | #2E6BFF | links, icons, AI features, active states |
| Accent | `orange` | #FF6A2D | CTAs, VIP, highlights — **action only** |
| Deep bg | `navy` | #050B26 | hero + dark sections |
| Text | `ink` | #0A1030 | headlines/body on light |
| Light bg | `cloud` | #F6F7FB | alternating section background |
| Violet | `violet` | #7A5CFF | gradient partner only, never standalone |

Rules: orange ≤ 10% of any viewport · white space is a feature ·
dark sections always use dot-grid/aurora ambience, never flat color.

## 4. Typography
- Stack: Manrope (Latin/digits) + Noto Sans Georgian
- Headlines: weight 900, tracking −0.02em…−0.045em, `text-balance`
- Body: 15–17px, weight 500–600, `ink` at 55–75% opacity
- Numbers/prices: Manrope 800–900

## 5. Shape & Elevation
- Cards r=26, tiles r=22, controls r=12, buttons pill
- Shadows only from `elevation` tokens (navy-tinted, never black)
- Glass: `.glass` (dark) / `.glass-light` (light) — 20px blur, no solid borders

## 6. Motion
- Ease `[0.21,0.65,0.2,1]`, reveals: y+28 → 0, 0.7s, once
- Hover: lift −6…−8px + shadow upgrade (≤0.5s)
- Respect `prefers-reduced-motion` (handled globally in index.css)

## 7. Iconography & Imagery
- Lucide icons only, 1.5–2px stroke, rounded
- AI-generated imagery: dusk/blue-hour real estate, warm interiors;
  no watermarks, no baked-in text/logos (except developer renders)
- 3D-map visuals: navy #050B26 base, blue pins, ONE orange highlight

## 8. VIP system (locked)
- VIP — dark navy badge + Flame
- VIP+ — blue→violet gradient + Flame
- SUPER VIP — orange→red gradient + Crown

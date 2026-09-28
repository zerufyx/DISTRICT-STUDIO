# District Studio · Design

Premium studio site played straight, at the craft bar of Apple and luxury houses, in the brand's own materials. Source of truth for values: `assets/css/site.css` (`:root`).

## Color (Restrained: neutrals + one accent)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page ground |
| `--bg-2` | `#0f0f0f` | Alternate section ground |
| `--panel` / `--panel-2` | `#141414` / `#1b1b1b` | Raised surfaces, inputs |
| `--line` / `--line-2` | `#262626` / `#3a3a3a` | Hairlines, borders |
| `--ink` / `--ink-2` / `--muted` | `#f4f4f4` / `#c8c8c8` / `#9b9b9b` | Text levels |
| `--red` | `#e8352a` | The only accent: one word per headline, primary buttons, the closing band |

Red is never a glow or gradient. The closing CTA band is the only red field on a page. Dark only (`color-scheme: dark`).

## Type

- Display: Bebas Neue (self-hosted), all caps by nature. Hero up to 14.5rem, headlines `clamp` scale. One word in red per headline.
- Text: Montserrat variable (self-hosted), 450 body, 600-700 for emphasis.
- No eyebrows or kicker labels above headings. No em dashes in copy.

## Shape

Pill buttons (999px), media and panels 16px, inputs 12px. Hairline rows for lists (services index, process, FAQ).

## Components

- Phone frame (`.phone`, `--pw` sets width) holding real screenshots from `assets/img/work/` (540×1169 WebP).
- Work cover: tinted panel with 1-3 phones or a browser window, name in Bebas below, one-line summary, "Ver el caso".
- Proposals: smaller cards, tagged "Propuesta", no case page.
- Services index: Bebas names on hairline rows with outcome and arrow.
- Mobile dock: floating pill with "Crear mi proyecto" + WhatsApp, shown only between the hero and the closing band.

## Motion

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Content visible by default; reveal only what starts off-screen. Buttons scale 0.97 on press. Everything off under `prefers-reduced-motion`.

## Content rules

No prices anywhere. Proposals never presented as clients. No invented testimonials or metrics.

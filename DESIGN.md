# Zerufy Studio 2.0 · Design

A small creative digital studio, not a service agency: the site proves the craft by being the craft. Premium, editorial, controlled motion. Source of truth for values: `assets/css/site.css` (`:root` and the "Zerufy Studio 2.0" block).

## Color (Restrained, with one red field)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page ground |
| `--bg-2` | `#0f0f0f` | Pinned "sistema" section |
| `--panel` / `--panel-2` | `#141414` / `#1b1b1b` | Media panels, inputs |
| `--line` / `--line-2` | `#262626` / `#3a3a3a` | Hairlines |
| `--ink` / `--ink-2` / `--muted` | `#f4f4f4` / `#c8c8c8` / `#9b9b9b` | Text levels |
| `--red` | `#e8352a` | One word per headline, primary buttons, progress lines, and the manifesto section as the single full red field |

No purple, blue, green or gradients in Zerufy Studio's own UI. Client screenshots keep their own colors.

## Type

- Bebas Neue (self-hosted) for every headline, huge: hero up to 13.5rem, section titles in 2 lines revealed line by line (`lines()` helper).
- Montserrat variable (self-hosted) for text; small labels in 700, uppercase, 0.12em tracking (nav, metadata, "Abrir proyecto").
- Accents on capitals need room: `.line` has 0.14em top padding.

## Layout language

- Editorial lists with hairlines (services 01-06, process timeline), not card grids.
- Real work at full size: stage panels tinted with each client's color, browser frames, phone frames with real screenshots.
- Three project layouts on the home page: full-width, asymmetric (browser + floating phone), horizontal strip.
- Pinned scroll scenes: `[data-scrolly]` sections (installation of 5 interfaces, animated admin demo).

## Motion (expensive, smooth, controlled)

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-io: cubic-bezier(0.77, 0, 0.175, 1)`.
Line reveals, clip-path image reveals, device morph (browser ↔ phone), subtle hero parallax with pointer depth, services preview that follows the cursor (desktop) or opens in place (mobile), "Abrir" cursor over projects, magnetic main buttons, word-by-word manifesto. All off under `prefers-reduced-motion`.

Home intro (once per session, tap to skip): the red brand dot appears, glides and writes ZERUFY STUDIO, a red rule fills, the dot floods the screen and the red curtain lifts into the hero (~3.1s). Reduced motion gets a plain fade. Timings live in `src/layout.mjs` (INTRO_RUN) and the `.intro` block in `site.css`.

## Honesty rules

No prices. Concept projects always say "Concepto". Demo UI (booking page, admin panel) is labeled as a demonstration. Example data (Zerufy cash/inventory) is labeled.

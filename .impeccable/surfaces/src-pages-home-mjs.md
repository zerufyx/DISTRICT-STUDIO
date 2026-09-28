---
version: 1
slug: "src-pages-home-mjs"
primary_target: "src/pages/home.mjs"
related_targets: ["src/layout.mjs"]
---

# Surface: District Studio public site (all routes)

Mode: Persuade. Audience: small-business owners (reventa, comida, carros, servicios) arriving on a phone from Instagram, TikTok, WhatsApp or a QR. Job: believe the studio builds real, working tools and start a WhatsApp conversation or send the "Crear mi proyecto" ticket. Proof: live S91, Zerufy, AMH; five proposals shown as proposals. Constraints: no prices anywhere; static HTML on GitHub Pages; the form keeps saving to Supabase `leads` and always ends in WhatsApp.

Build path: code-led (no image generation available).
Roll: degraded (no challengers reachable). The owner took the standing exit: the category standard, executed at full fidelity.

## Direction contract

THESIS: A premium independent studio site, played straight: giant type, real work at full size, calm dark order. Refuses template tells: bento grids of icon cards, glow, gradient text, eyebrow labels, fake UI.

OWN-WORLD: Near-black (#0a0a0a) with graphite panels (#141414/#1b1b1b), hairlines #262626, off-white ink #f4f4f4. One red (#e8352a) for the single emphasized word in headlines, the action fill and the closing field. Bebas Neue at poster scale for display, Montserrat for reading. Pill buttons, 16px media corners. Real phone screenshots are the only imagery.

STORY: Recognize a business like theirs in real, live work; see the chaos of selling by DM replaced by a link they control; tap WhatsApp or build the project form.

FIRST VIEWPORT: Full-width Bebas headline "Tu negocio, como una app." ("app" red) at clamp(3.6rem, 12vw, 11rem) spanning the page, one-line lead under it, primary "Crear mi proyecto" + WhatsApp button, then three real phones (S91 menu, Zerufy, AMH) rising from the bottom edge, the center one taller and gently scrolling its screen.

FORM: Category standard (canon), owner's choice. Seed key df83bd8c.

SIGNATURE INTERACTION: Headline lines rise from a mask on load; phones drift at different depths with scroll (scroll-driven CSS, off under reduced motion); work covers scale subtly as they enter; services index rows reveal a preview on hover. One grammar: exponential ease-out, 600-900ms for page moments, under 200ms for controls.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

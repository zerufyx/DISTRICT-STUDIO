# District Studio — sitio web

Sitio del estudio: portafolio, servicios, casos de estudio y formulario para captar clientes.
HTML estático generado con Node, sin frameworks ni dependencias. Rápido, bueno para SEO y fácil de mantener.

## Estructura

```
site.config.mjs        ← dominio, WhatsApp, redes, Supabase, Analytics, Meta Pixel
content/
  services.mjs         ← los 6 servicios y los planes (precios)
  projects.mjs         ← el portafolio: cada proyecto = un caso de estudio
  studio.mjs           ← proceso, ruta de crecimiento, preguntas frecuentes, opciones del formulario
src/
  layout.mjs           ← <head> con SEO, encabezado, pie
  components.mjs       ← botones, tarjetas, teléfonos, preguntas, etc.
  seo.mjs              ← datos estructurados para Google (schema.org)
  pages/               ← una plantilla por tipo de página
assets/
  css/site.css         ← todo el diseño (modo claro y oscuro)
  js/site.js           ← menú, filtros, animaciones, Analytics
  js/lead.js           ← formulario "Crear mi proyecto"
  img/work/            ← capturas y portadas de los proyectos
  fonts/               ← tipografía Archivo (variable)
supabase/leads.sql     ← tabla para guardar las solicitudes del formulario
scripts/build.mjs      ← genera el sitio en dist/
dist/                  ← el sitio listo para publicar
```

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Inicio |
| `/services/` | Todos los servicios, planes y preguntas |
| `/websites/` `/menus/` `/catalogs/` `/ecommerce/` `/systems/` `/apps/` | Una página por servicio (cada una apunta a una búsqueda en Google) |
| `/portfolio/` | Trabajos con filtros (`/portfolio/#menus` abre filtrado) |
| `/projects/<proyecto>/` | Caso de estudio: problema, solución, resultado, funciones |
| `/about/` | Nosotros |
| `/contact/` | Formulario. `/contact/#menus` o `/contact/#plan-base` lo abre ya marcado |
| `/dashboard/` | Reservado para el panel interno (no aparece en Google) |
| `/blog/` | Reservado (se activa en `site.config.mjs`) |

## Comandos

Necesitas Node 18 o más nuevo.

```bash
node scripts/build.mjs        # genera dist/
node scripts/serve.mjs        # abre dist/ en http://localhost:4321
node scripts/build.mjs --preview   # versión con rutas relativas (se abre sin servidor)
```

## Publicar en GitHub Pages

1. Crea un repo (por ejemplo `district-studio`) y sube **todo** este folder.
2. En el repo: **Settings → Pages → Source: GitHub Actions**. El archivo `.github/workflows/deploy.yml` construye y publica solo cada vez que subes cambios.
3. Con dominio propio: pon el dominio en `siteUrl` dentro de `site.config.mjs` (el build crea el archivo `CNAME`), y en Namecheap apunta el dominio a GitHub Pages igual que con zerufy.store.
4. Sin dominio todavía: pon `siteUrl: 'https://zerufyx.github.io'` y `basePath: '/district-studio'`.

**Opción sin GitHub Actions:** corre `node scripts/build.mjs` y sube solo el contenido de `dist/` al repo.

## Antes de publicar

- [ ] `siteUrl` con el dominio real (hoy dice `districtstudio.example`)
- [ ] `contact.instagram` y `contact.email` si quieres que aparezcan
- [x] Formulario conectado a Supabase: tablas `leads` y `studio_admins` creadas (migración `district_studio_leads`), anon key puesta y zerufyx@gmail.com como administrador. Las solicitudes se ven en Supabase → Table Editor → `leads`.
- [ ] Reemplazar las portadas de Zerufy y AMH Store con capturas que muestren productos (hoy muestran la portada de cada tienda)

## Cómo agregar un proyecto al portafolio

1. Pon las capturas en `assets/img/work/` en formato `.webp` (teléfono: 540×1169).
2. Pon una portada de 1600×1000 (`<nombre>-cover.webp`) y una de 800×500 (`<nombre>-cover-800.webp`).
3. Copia un bloque en `content/projects.mjs` y cambia los datos.
4. `node scripts/build.mjs`. Se crea la página del caso, aparece en el portafolio, en el filtro y en el sitemap.

## Integraciones (todas se activan desde `site.config.mjs`)

| Integración | Estado | Cómo |
|---|---|---|
| WhatsApp | Activo | `contact.whatsapp` |
| Formulario → Supabase | Listo para activar | `supabase/leads.sql` + anon key |
| Formulario → Notion, Airtable, CRM, email, Google Sheets | Listo para activar | Crea un webhook en Make o Zapier y pégalo en `integrations.webhook` |
| Google Analytics 4 | Listo para activar | `integrations.ga4` |
| Meta Pixel | Listo para activar | `integrations.metaPixel` (mide `Lead` y `Contact`) |
| Stripe, PayPal, calendarios, Google Maps | Para proyectos de clientes | Se agregan en cada proyecto que los necesite |

Eventos que se miden: `lead_submit` (formulario enviado) y `whatsapp_click` (clic en cualquier botón de WhatsApp).

## SEO incluido

Título y descripción por página, Open Graph e imagen para redes, URLs limpias, `sitemap.xml`, `robots.txt`, datos estructurados (negocio local, servicios, preguntas frecuentes, migas, casos de estudio), imágenes WebP con tamaño fijo y carga diferida, fuente propia precargada y cero JavaScript bloqueante.

El sitio está en español. Para posicionar búsquedas en inglés ("web design", "restaurant website", "digital menu") hace falta una versión en inglés: la estructura permite agregarla como `/en/` con el mismo contenido traducido.

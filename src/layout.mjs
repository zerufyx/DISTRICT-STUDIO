// Estructura de cada documento: <head> con SEO, encabezado, pie y barra móvil.
import { esc, icon, wordmark, wa } from './core.mjs';
import { services } from '../content/services.mjs';

const NAV = [
  { href: '/portfolio/', label: 'Trabajos', match: '/portfolio/' },
  { href: '/services/', label: 'Servicios', match: '/services/' },
  { href: '/#proceso', label: 'Proceso', match: '#' },
  { href: '/about/', label: 'Nosotros', match: '/about/' },
];

export function publicConfig(config) {
  const i = config.integrations;
  return {
    whatsapp: config.contact.whatsapp,
    whatsappMessage: config.contact.whatsappMessage,
    supabase: i.supabase.url && i.supabase.anonKey ? { url: i.supabase.url, anonKey: i.supabase.anonKey, table: i.supabase.table } : null,
    webhook: i.webhook || null,
    ga4: i.ga4 || null,
    metaPixel: i.metaPixel || null,
  };
}

function head(ctx, p) {
  const { config } = ctx;
  const canonical = ctx.abs(p.path);
  const og = ctx.abs('/assets/img/' + (p.ogImage || 'og-default.jpg'));
  const fonts =
    ctx.mode === 'preview'
      ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&amp;family=Montserrat:wght@400..800&amp;display=swap">`
      : `<link rel="preload" href="${ctx.asset('/assets/fonts/bebas-neue.woff2')}" as="font" type="font/woff2" crossorigin><link rel="preload" href="${ctx.asset('/assets/fonts/montserrat-var.woff2')}" as="font" type="font/woff2" crossorigin>`;
  const schema = (p.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n');
  // En la vista previa (Artifact) la portada lleva solo el nombre de la marca.
  const docTitle = ctx.mode === 'preview' && p.path === '/' ? ctx.config.name : p.title;
  return `<title>${esc(docTitle)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${p.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0a0a0a">
<meta name="color-scheme" content="dark">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:site_name" content="${esc(config.name)}">
<meta property="og:locale" content="${config.locale}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="${ctx.asset('/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${ctx.asset('/apple-touch-icon.png')}">
<link rel="manifest" href="${ctx.asset('/site.webmanifest')}">
${fonts}
<link rel="stylesheet" href="${ctx.asset(ctx.mode === 'preview' ? '/assets/css/site.preview.css' : '/assets/css/site.css')}">
${schema}
<script>document.documentElement.classList.add('js');window.DS=${JSON.stringify(publicConfig(config))};</script>
<script defer src="${ctx.asset('/assets/js/site.js')}"></script>
${p.scripts ? p.scripts.map((s) => `<script defer src="${ctx.asset(s)}"></script>`).join('\n') : ''}`;
}

function header(ctx) {
  const links = NAV.map(
    (n) => `<li><a href="${ctx.url(n.href)}"${n.match !== '#' && ctx.isActive(n.match) ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  const bigLinks = NAV.concat([{ href: '/contact/', label: 'Contacto', match: '/contact/' }])
    .map((n, i) => `<li style="--i:${i}"><a href="${ctx.url(n.href)}"${n.match !== '#' && ctx.isActive(n.match) ? ' aria-current="page"' : ''}><span class="sheet-n">${String(i + 1).padStart(2, '0')}</span>${n.label}</a></li>`)
    .join('');
  const sheetServices = services
    .map((s) => `<li><a href="${ctx.url(s.path)}">${esc(s.name)}</a></li>`)
    .join('');
  return `<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-head" data-head>
  <div class="wrap head-row">
    <a class="brand" href="${ctx.url('/')}" aria-label="District Studio, inicio">${wordmark()}</a>
    <nav class="nav" aria-label="Principal"><ul>${links}</ul></nav>
    <a class="head-cta" href="${ctx.url('/contact/')}"><span>Empezar un proyecto</span>${icon('arrow', 'ic ic-go')}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-sheet" data-menu-btn>
      <span class="menu-lines" aria-hidden="true"><i></i><i></i></span>
      <span class="sr">Menú</span>
    </button>
  </div>
  <div class="sheet" id="menu-sheet" data-sheet>
    <div class="wrap sheet-inner">
      <ul class="sheet-main">${bigLinks}</ul>
      <p class="sheet-label">Servicios</p>
      <ul class="sheet-services">${sheetServices}</ul>
      <div class="sheet-actions">
        <a class="btn btn-primary btn-lg" href="${ctx.url('/contact/')}"><span>Empezar un proyecto</span>${icon('arrow', 'ic ic-go')}</a>
        <a class="btn btn-ghost btn-lg" href="${wa(ctx.config)}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp')}<span>WhatsApp</span></a>
      </div>
    </div>
  </div>
</header>`;
}

function footer(ctx) {
  const { contact } = ctx.config;
  const year = new Date().getFullYear();
  const svc = services.map((s) => `<li><a href="${ctx.url(s.path)}">${esc(s.name)}${s.status === 'soon' ? ' (pronto)' : ''}</a></li>`).join('');
  return `<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="${ctx.url('/')}" aria-label="District Studio, inicio">${wordmark()}</a>
        <p>Páginas web, menús digitales, catálogos, tiendas y sistemas para negocios que venden por Instagram, TikTok y WhatsApp.</p>
      </div>
      <nav aria-label="Servicios"><h2 class="foot-h">Servicios</h2><ul>${svc}</ul></nav>
      <nav aria-label="Estudio"><h2 class="foot-h">Estudio</h2><ul>
        <li><a href="${ctx.url('/portfolio/')}">Trabajos</a></li>
        <li><a href="${ctx.url('/#proceso')}">Proceso</a></li>
        <li><a href="${ctx.url('/about/')}">Nosotros</a></li>
        <li><a href="${ctx.url('/contact/')}">Empezar un proyecto</a></li>
      </ul></nav>
      <div><h2 class="foot-h">Contacto</h2><ul>
        <li><a href="${wa(ctx.config)}" target="_blank" rel="noopener" data-track="whatsapp_click">WhatsApp <span class="nowrap">${esc(contact.whatsappDisplay)}</span></a></li>
        ${contact.email ? `<li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>` : ''}
        ${contact.instagram ? `<li><a href="https://instagram.com/${esc(contact.instagram)}" target="_blank" rel="noopener">Instagram @${esc(contact.instagram)}</a></li>` : ''}
        ${contact.tiktok ? `<li><a href="https://tiktok.com/@${esc(contact.tiktok)}" target="_blank" rel="noopener">TikTok @${esc(contact.tiktok)}</a></li>` : ''}
        <li>Orlando, Florida</li>
      </ul></div>
    </div>
    <p class="foot-word" aria-hidden="true">District Studio<span class="dot">.</span></p>
    <div class="foot-base"><span>© ${year} ${esc(ctx.config.legalName)}</span><span>Atendemos en español e inglés</span></div>
  </div>
</footer>`;
}

function dock(ctx) {
  return `<div class="dock" data-dock>
  <a class="btn btn-primary" href="${ctx.url('/contact/')}"><span>Empezar un proyecto</span></a>
  <a class="btn btn-ghost btn-icon" href="${wa(ctx.config)}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-track="whatsapp_click">${icon('whatsapp')}</a>
</div>`;
}

/** Documento completo. En preview, la portada se publica sin <html>/<head>/<body>
 *  porque el Artifact le pone su propio esqueleto. */
export function document(ctx, p) {
  const bare = ctx.mode === 'preview' && p.path === '/';
  const body = `${header(ctx)}
<main id="main" class="${esc(p.mainClass || '')}">
${p.main}
</main>
${footer(ctx)}
${p.hideDock ? '' : dock(ctx)}`;
  if (bare) return `${head(ctx, p)}\n${body}\n`;
  return `<!doctype html>
<html lang="${ctx.config.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head(ctx, p)}
</head>
<body>
${body}
</body>
</html>
`;
}

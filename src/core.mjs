// Utilidades compartidas: escape de HTML, rutas y un set pequeño de íconos.

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Contexto de cada página. Resuelve enlaces según el modo de build:
 *  - production: URLs limpias y absolutas (/services/), con basePath
 *  - preview:    rutas relativas a archivos (../services/index.html) para
 *                poder abrir el sitio sin servidor o como Artifact
 */
export function makeCtx({ pagePath, mode, config }) {
  const parts = pagePath.split('/').filter(Boolean);
  const depth = pagePath.endsWith('/') ? parts.length : Math.max(parts.length - 1, 0);
  const up = '../'.repeat(depth);
  return {
    pagePath,
    mode,
    config,
    url(to) {
      const [p, hash] = to.split('#');
      const h = hash ? '#' + hash : '';
      if (mode === 'preview') {
        const clean = p.replace(/^\//, '');
        const file = clean === '' || clean.endsWith('/') ? clean + 'index.html' : clean;
        return up + file + h;
      }
      return config.basePath + p + h;
    },
    asset(p) {
      return mode === 'preview' ? up + p.replace(/^\//, '') : config.basePath + p;
    },
    abs(p) {
      return config.siteUrl + config.basePath + p;
    },
    isActive(prefix) {
      return prefix === '/' ? pagePath === '/' : pagePath.startsWith(prefix);
    },
  };
}

export const wa = (config, text) =>
  `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(text || config.contact.whatsappMessage)}`;

const paths = {
  web: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18M6.5 6.25h.01M9 6.25h.01"/>',
  menu: '<rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><path d="M14 14h2.5v2.5H14zM17.5 17.5H20V20h-2.5zM14 20h1M20 14v1"/>',
  catalog: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M13.5 15h7M13.5 18.5h4.5"/>',
  bag: '<path d="M5 8h14l-1.1 12.1a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9L5 8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>',
  system: '<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.5 18.5h3"/>',
  external: '<path d="M7 17 17 7M9 7h8v8"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12.5v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  sort: '<path d="M4 7h16M4 12h10M4 17h6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  burger: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
  x: '<path d="M7 7l10 10M17 7 7 17"/>',
  price: '<path d="M3.5 12.2V4.8a1.3 1.3 0 0 1 1.3-1.3h7.4l8.3 8.3a1.3 1.3 0 0 1 0 1.8l-7.4 7.4a1.3 1.3 0 0 1-1.8 0L3.5 12.2z"/><circle cx="8.2" cy="8.2" r="1.4"/>',
  soldout: '<circle cx="12" cy="12" r="8.5"/><path d="M6 18 18 6"/>',
  photo: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m20.5 15.5-4.8-4.8L6 19.5"/>',
  order: '<path d="M8 4.5h8M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v15l-3-1.8-3.5 1.8-3.5-1.8-3 1.8V5A1.5 1.5 0 0 1 7 3.5z"/><path d="M9 9.5h6M9 13h4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M8 13.5h2M14 13.5h2M8 17h2"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
};

const whatsappPath =
  'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01';

export function icon(name, cls = 'ic') {
  if (name === 'whatsapp')
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${whatsappPath}"/></svg>`;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;
}

// Marca: "Zerufy Studio." con Zerufy y el punto en rojo.
export const wordmark = () => `<span class="d">Zerufy</span>&nbsp;Studio<span class="dot">.</span>`;

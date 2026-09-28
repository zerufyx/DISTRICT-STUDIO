// Datos estructurados (schema.org) para Google.

export function organization(ctx) {
  const { config } = ctx;
  const sameAs = [];
  if (config.contact.instagram) sameAs.push(`https://instagram.com/${config.contact.instagram}`);
  if (config.contact.tiktok) sameAs.push(`https://tiktok.com/@${config.contact.tiktok}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ctx.abs('/#organization'),
    name: config.name,
    url: ctx.abs('/'),
    logo: ctx.abs('/apple-touch-icon.png'),
    image: ctx.abs('/assets/img/og-default.jpg'),
    description: 'Estudio digital que diseña y construye páginas web, menús digitales, catálogos, tiendas online y sistemas para negocios.',
    telephone: '+' + config.contact.whatsapp,
    ...(config.contact.email ? { email: config.contact.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: config.city, addressRegion: config.region, addressCountry: config.country },
    areaServed: [{ '@type': 'City', name: 'Orlando' }, { '@type': 'State', name: 'Florida' }],
    knowsLanguage: ['es', 'en'],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function website(ctx) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: ctx.config.name, url: ctx.abs('/'), inLanguage: ctx.config.lang, publisher: { '@id': ctx.abs('/#organization') } };
}

export function breadcrumb(ctx, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: ctx.abs(it.href) })),
  };
}

export function service(ctx, s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.lead,
    url: ctx.abs(s.path),
    provider: { '@id': ctx.abs('/#organization') },
    areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'Place', name: 'Latinoamérica' }],
  };
}

export function faqPage(list) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function caseStudy(ctx, p) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${p.name}: ${p.type}`,
    description: p.summary,
    url: ctx.abs(`/projects/${p.slug}/`),
    image: ctx.abs(`/assets/img/${p.og || 'og-default.jpg'}`),
    creator: { '@id': ctx.abs('/#organization') },
    ...(p.year ? { dateCreated: String(p.year) } : {}),
    inLanguage: 'es',
  };
}

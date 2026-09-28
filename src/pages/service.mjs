import { esc, icon } from '../core.mjs';
import { btn, sectionHead, workGrid, ctaBand, crumbs, faqList, serviceIndex } from '../components.mjs';
import { services } from '../../content/services.mjs';
import { projects } from '../../content/projects.mjs';
import { faq } from '../../content/studio.mjs';
import { breadcrumb, service as serviceSchema, faqPage } from '../seo.mjs';

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// Preguntas que aplican a cada servicio
const faqFor = {
  websites: [0, 3, 5, 6],
  menus: [1, 2, 3, 5],
  catalogs: [1, 2, 4, 5],
  ecommerce: [4, 0, 2, 3],
  systems: [0, 1, 2, 6],
  apps: [0, 6],
};

export default function servicePage(ctx, s) {
  const ex = s.examples.map((k) => bySlug[k]).filter(Boolean);
  const others = services.filter((o) => o.key !== s.key);
  const qs = (faqFor[s.key] || []).map((i) => faq[i]);
  const items = [{ href: '/', label: 'Inicio' }, { href: '/services/', label: 'Servicios' }, { href: s.path, label: s.name }];

  const main = `
<section class="page-hero svc-hero">
  <div class="wrap">
    ${crumbs(ctx, items)}
    <h1 class="display-2">${esc(s.name)}</h1>
    <p class="svc-outcome-lg">${esc(s.outcome)}${s.status === 'soon' ? ' <span class="tag">Próximamente</span>' : ''}</p>
    <p class="hero-lead">${esc(s.lead)}</p>
    ${s.statusNote ? `<p class="note">${esc(s.statusNote)}</p>` : ''}
    <div class="hero-actions">
      ${btn(ctx.url('/contact/#' + s.key), s.status === 'soon' ? 'Contarte mi idea' : 'Crear mi proyecto', { size: 'lg' })}
      ${ex.length ? btn(ctx.url(`/projects/${ex[0].slug}/`), 'Ver un ejemplo real', { variant: 'ghost', size: 'lg' }) : ''}
    </div>
    <dl class="facts">
      <div><dt>Para</dt><dd>${esc(s.forWho.slice(0, 4).join(', '))}${s.forWho.length > 4 ? ' y más' : ''}</dd></div>
    </dl>
  </div>
</section>

<section class="section tight-top" aria-labelledby="ben-t">
  <div class="wrap">
    <h2 class="sr" id="ben-t">Beneficios</h2>
    <ul class="benefit-cols" role="list">${s.benefits.map((b) => `<li><h3 class="h4">${esc(b.t)}</h3><p>${esc(b.d)}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="feat-t">
  <div class="wrap split">
    <div class="split-aside">
      ${sectionHead('Qué incluye', 'Cada proyecto se ajusta a tu negocio. Esto es lo que normalmente construimos.', { id: 'feat-t' })}
      <h3 class="aside-label">Para quién es</h3>
      <ul class="chips-static" role="list">${s.forWho.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
    </div>
    <ul class="feat-grid" role="list">${s.features.map((f) => `<li><h3 class="h5">${esc(f.t)}</h3><p>${esc(f.d)}</p></li>`).join('')}</ul>
  </div>
</section>

${
  ex.length
    ? `<section class="section work" aria-labelledby="ex-t">
  <div class="wrap">
    ${sectionHead(ex.length > 1 ? 'Ejemplos reales' : 'Un ejemplo real', 'Proyectos en línea que puedes abrir desde tu celular.', { id: 'ex-t' })}
    ${workGrid(ctx, ex)}
  </div>
</section>`
    : ''
}

${
  qs.length
    ? `<section class="section" aria-labelledby="faq-t"><div class="wrap split"><div class="split-aside">${sectionHead('Preguntas', null, { id: 'faq-t' })}</div>${faqList(qs)}</div></section>`
    : ''
}

<section class="section" aria-labelledby="oth-t">
  <div class="wrap">
    ${sectionHead('También hacemos', null, { id: 'oth-t' })}
    ${serviceIndex(ctx, others)}
  </div>
</section>

${ctaBand(ctx, { need: s.key, title: s.status === 'soon' ? '¿Tienes la idea de una app?' : 'Cuéntanos de tu negocio.', text: s.status === 'soon' ? 'Cuéntanos qué quieres que haga y la planificamos contigo.' : undefined })}
`;

  return {
    path: s.path,
    title: s.seo.title,
    description: s.seo.description,
    schema: [breadcrumb(ctx, items), serviceSchema(ctx, s), ...(qs.length ? [faqPage(qs)] : [])],
    main,
    priority: '0.8',
  };
}

import { esc, icon } from '../core.mjs';
import { btn, sectionHead, workGrid, ctaBand, crumbs, faqList, serviceIndex } from '../components.mjs';
import { services } from '../../content/services.mjs';
import { guide, weHandle } from '../../content/service-guide.mjs';
import { projects } from '../../content/projects.mjs';
import { faq } from '../../content/studio.mjs';
import { breadcrumb, service as serviceSchema, faqPage } from '../seo.mjs';

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// Preguntas que aplican a cada servicio
const faqFor = {
  websites: [0, 1, 4, 6],
  menus: [1, 2, 3, 5],
  catalogs: [1, 2, 4, 5],
  booking: [0, 1, 3, 5],
  systems: [0, 1, 2, 6],
  apps: [0, 6],
};

export default function servicePage(ctx, s) {
  const ex = s.examples.map((k) => bySlug[k]).filter(Boolean);
  const g = guide[s.key] || { gives: [], control: [], how: [] };
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
      ${btn(ctx.url('/contact/#' + s.key), s.status === 'soon' ? 'Contarte mi idea' : 'Empezar un proyecto', { size: 'lg', arrow: true })}
      ${ex.length ? btn(ctx.url(`/projects/${ex[0].slug}/`), 'Ver un ejemplo', { variant: 'ghost', size: 'lg', arrow: true }) : ''}
    </div>
    <dl class="facts">
      <div><dt>Para</dt><dd>${esc(s.forWho.slice(0, 4).join(', '))}${s.forWho.length > 4 ? ' y más' : ''}</dd></div>
    </dl>
  </div>
</section>

${g.gives.length ? `<section class="section tight-top" aria-labelledby="give-t">
  <div class="wrap split">
    <div class="split-aside">
      ${sectionHead('Lo que te <em>damos</em>', null, { id: 'give-t' })}
      <h3 class="aside-label">Para quién es</h3>
      <ul class="chips-static" role="list">${s.forWho.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
    </div>
    <ul class="gives gives-lg" role="list">${g.gives.map((x) => `<li>${icon('check', 'ic')}<span>${esc(x)}</span></li>`).join('')}</ul>
  </div>
</section>` : ''}

${g.control.length ? `<section class="section ctl" aria-labelledby="ctl-t">
  <div class="wrap">
    ${sectionHead('Tú lo manejas, sin depender de <em>nadie.</em>', 'Todos los proyectos se entregan con tu panel de administración. Haces tus cambios desde el celular, sin llamarnos.', { id: 'ctl-t' })}
    <ul class="ctl-grid" role="list">${g.control.map((c) => `<li><span class="ctl-ic">${icon(c.i, 'ic')}</span><h3 class="h5">${esc(c.t)}</h3><p>${esc(c.d)}</p></li>`).join('')}</ul>
  </div>
</section>` : ''}

${s.status !== 'soon' ? `<section class="section" aria-labelledby="we-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('De esto nos encargamos <em>nosotros.</em>', 'Tú tienes el control de tu negocio. Nosotros damos el soporte y el mantenimiento.', { id: 'we-t' })}</div>
    <ul class="feat-grid" role="list">${weHandle.map((f) => `<li><h3 class="h5">${esc(f.t)}</h3><p>${esc(f.d)}</p></li>`).join('')}</ul>
  </div>
</section>` : ''}

${g.how.length ? `<section class="section" aria-labelledby="how-t">
  <div class="wrap">
    ${sectionHead('Cómo <em>funciona</em>', null, { id: 'how-t' })}
    <ol class="how" role="list">${g.how.map((h, i) => `<li><span class="how-n">${String(i + 1).padStart(2, '0')}</span><h3 class="h5">${esc(h.t)}</h3><p>${esc(h.d)}</p></li>`).join('')}</ol>
    ${g.not ? `<p class="how-note"><strong>Para que quede claro:</strong> ${esc(g.not)}</p>` : ''}
  </div>
</section>` : g.not ? `<section class="section tight-top"><div class="wrap"><p class="how-note">${esc(g.not)}</p></div></section>` : ''}

<section class="section tagline" aria-label="Nuestra idea">
  <div class="wrap"><p class="tagline-t">Nosotros te damos la herramienta. <em>Tú manejas tu negocio.</em></p></div>
</section>

${
  ex.length
    ? `<section class="section work" aria-labelledby="ex-t">
  <div class="wrap">
    ${sectionHead(ex.length > 1 ? 'Ejemplos' : 'Un ejemplo', 'Proyectos que diseñamos y construimos. Los que dicen Concepto son prototipos preparados para un negocio.', { id: 'ex-t' })}
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

${ctaBand(ctx, { need: s.key, ...(s.status === 'soon' ? { q: '¿Tienes la idea de una app?', title: 'Planifiquémosla <em>juntos.</em>' } : {}) })}
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

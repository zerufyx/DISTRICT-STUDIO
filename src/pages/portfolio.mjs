import { esc } from '../core.mjs';
import { workGrid, proposalCard, sectionHead, ctaBand, crumbs, btn } from '../components.mjs';
import { projects, proposals, categories } from '../../content/projects.mjs';
import { breadcrumb } from '../seo.mjs';

export default function portfolio(ctx) {
  const count = (k) => projects.filter((p) => p.categories.includes(k)).length;
  const chips = [`<li><button type="button" class="chip" aria-pressed="true" data-filter="all">En línea <span class="chip-n">${projects.length}</span></button></li>`]
    .concat(categories.filter((c) => count(c.key) > 0).map((c) => `<li><button type="button" class="chip" aria-pressed="false" data-filter="${c.key}">${esc(c.label)} <span class="chip-n">${count(c.key)}</span></button></li>`))
    .join('');

  const main = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(ctx, [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }])}
    <h1 class="display-2">Trabajo <em>real.</em></h1>
    <p class="hero-lead">Proyectos en línea que puedes abrir desde tu celular. Entra a cada caso para ver qué necesitaba el negocio, qué construimos y qué cambió.</p>
  </div>
</section>

<section class="section tight-top work" aria-label="Proyectos">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Filtrar por tipo de proyecto">
      <ul class="chip-row" role="list" data-filters>${chips}</ul>
    </div>
    <p class="sr" aria-live="polite" data-filter-status></p>
    ${workGrid(ctx, projects, { level: 2, eagerFirst: true })}
    <div class="empty" data-empty hidden>
      <p class="empty-t" data-empty-t>Todavía no hay proyectos publicados en esta categoría.</p>
      <p data-empty-d>Si tu proyecto va por aquí, podemos empezar por el tuyo.</p>
      ${btn(ctx.url('/contact/'), 'Crear mi proyecto')}
    </div>
  </div>
</section>

<section class="section props" aria-labelledby="props-t">
  <div class="wrap">
    ${sectionHead('Propuestas', 'Prototipos funcionales que diseñamos para presentar a otros negocios: autos, perfumes, ropa y accesorios. Así se ve lo que llevamos a la primera reunión.', { id: 'props-t' })}
    <div class="prop-grid">${proposals.map((p) => proposalCard(ctx, p)).join('')}</div>
  </div>
</section>

${ctaBand(ctx, { title: '¿Tu negocio es el siguiente?', text: 'Cuéntanos qué vendes y cómo te llegan los clientes. Te proponemos por dónde empezar.' })}
`;

  return {
    path: '/portfolio/',
    title: 'Trabajos: menús digitales, catálogos y sistemas | District Studio',
    description: 'Proyectos reales de District Studio: el menú digital de S91 House Grill, los catálogos de Zerufy y AMH Store, el panel que los administra y propuestas para autos, perfumes, ropa y accesorios.',
    schema: [breadcrumb(ctx, [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }])],
    main,
    priority: '0.9',
  };
}

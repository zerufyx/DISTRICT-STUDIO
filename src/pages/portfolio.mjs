import { esc } from '../core.mjs';
import { workGrid, ctaBand, crumbs, btn, lines } from '../components.mjs';
import { projects, categories } from '../../content/projects.mjs';
import { breadcrumb } from '../seo.mjs';

export default function portfolio(ctx) {
  const count = (k) => projects.filter((p) => p.categories.includes(k)).length;
  const chips = [`<li><button type="button" class="chip" aria-pressed="true" data-filter="all">Todos <span class="chip-n">${projects.length}</span></button></li>`]
    .concat(categories.filter((c) => count(c.key) > 0).map((c) => `<li><button type="button" class="chip" aria-pressed="false" data-filter="${c.key}">${esc(c.label)} <span class="chip-n">${count(c.key)}</span></button></li>`))
    .join('');

  const main = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(ctx, [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }])}
    <h1 class="display-2">${lines(['Lo que', 'hemos <em>hecho.</em>'])}</h1>
    <p class="hero-lead">Proyectos diseñados y construidos por Zerufy Studio. Los que dicen <strong>Concepto</strong> son prototipos funcionales que preparamos para un negocio; S91 House Grill, Zerufy y AMH Store están en línea hoy.</p>
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
      ${btn(ctx.url('/contact/'), 'Empezar un proyecto', { arrow: true })}
    </div>
  </div>
</section>

${ctaBand(ctx, { q: '¿Te gustó lo que viste?', title: 'El siguiente puede ser <em>el tuyo.</em>' })}
`;

  return {
    path: '/portfolio/',
    title: 'Trabajos: menús digitales, catálogos y sistemas | Zerufy Studio',
    description: 'Trabajos de Zerufy Studio: el menú digital de S91 House Grill, los catálogos de Zerufy y AMH Store, el panel que los administra y conceptos para autos, perfumes, ropa y accesorios.',
    schema: [breadcrumb(ctx, [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }])],
    main,
    priority: '0.9',
  };
}

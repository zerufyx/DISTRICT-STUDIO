import { esc, icon } from '../core.mjs';
import { btn, img, phone, stage, ctaBand, crumbs, catLabel } from '../components.mjs';
import { projects } from '../../content/projects.mjs';
import { breadcrumb, caseStudy } from '../seo.mjs';

export default function projectPage(ctx, p) {
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const items = [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }, { href: `/projects/${p.slug}/`, label: p.name }];
  const paras = (arr) => arr.map((t) => `<p>${esc(t)}</p>`).join('');
  const needKey = p.categories.find((c) => ['menus', 'catalogs', 'websites', 'ecommerce', 'systems'].includes(c));

  const phones = p.gallery.filter((g) => !g.wide);
  const wides = p.gallery.filter((g) => g.wide);

  const main = `
<article class="case">
  <header class="page-hero case-hero">
    <div class="wrap">
      ${crumbs(ctx, items)}
      <h1 class="display-2">${esc(p.name)}</h1>
      <p class="hero-lead">${esc(p.summary)}</p>
      <dl class="facts">
        <div><dt>Negocio</dt><dd>${esc(p.sector)}${p.location ? `, ${esc(p.location)}` : ''}</dd></div>
        <div><dt>Qué hicimos</dt><dd>${esc(p.type)}</dd></div>
        ${p.year ? `<div><dt>Año</dt><dd>${p.year}</dd></div>` : ''}
        ${p.url ? `<div><dt>En línea</dt><dd><a class="link" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.urlLabel)}${icon('external', 'ic ic-sm')}</a></dd></div>` : ''}
      </dl>
    </div>
    <div class="wrap">
      <div class="case-cover">${stage(ctx, p, { eager: true })}</div>
    </div>
  </header>

  <div class="wrap story">
    <section class="story-row" aria-labelledby="s-prob"><h2 class="story-h" id="s-prob">Problema</h2><div class="story-b">${paras(p.problem)}</div></section>
    <section class="story-row" aria-labelledby="s-sol"><h2 class="story-h" id="s-sol">Solución</h2><div class="story-b">${paras(p.solution)}</div></section>
    <section class="story-row" aria-labelledby="s-res"><h2 class="story-h" id="s-res">Resultado</h2><div class="story-b">${paras(p.result)}</div></section>
    <section class="story-row" aria-labelledby="s-fun"><h2 class="story-h" id="s-fun">Funciones</h2><div class="story-b">
      <ul class="check-list" role="list">${p.features.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
    </div></section>
    <section class="story-row" aria-labelledby="s-tec"><h2 class="story-h" id="s-tec">Tecnología</h2><div class="story-b">
      <ul class="chips-static" role="list">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <p class="story-cats">Categorías: ${p.categories.map((c) => `<a class="link" href="${ctx.url('/portfolio/#' + c)}">${esc(catLabel[c])}</a>`).join(', ')}</p>
    </div></section>
  </div>

  <section class="section gallery-sec" aria-labelledby="g-t">
    <div class="wrap"><h2 class="h2" id="g-t">Pantallas</h2></div>
    ${
      phones.length
        ? `<ul class="rail" role="list">${phones
            .map((g) => `<li>${phone(ctx, { src: g.src, alt: g.alt })}<p class="cap">${esc(g.caption)}</p></li>`)
            .join('')}</ul>`
        : ''
    }
    ${wides
      .map(
        (g) => `<figure class="wrap browser-fig"><div class="browser"><div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(p.urlLabel || '')}</span></div>${img(ctx, g.src, { alt: g.alt, w: 1440, h: 540 })}</div><figcaption>${esc(g.caption)}</figcaption></figure>`
      )
      .join('')}
    ${p.url ? `<div class="wrap live-row">${btn(p.url, `Abrir ${p.urlLabel}`, { variant: 'ghost', external: true, cls: 'btn-ext' })}</div>` : ''}
  </section>

  <nav class="wrap next-case" aria-label="Siguiente proyecto">
    <a href="${ctx.url(`/projects/${next.slug}/`)}">
      <span class="next-name">Siguiente: ${esc(next.name)} <span class="next-arrow" aria-hidden="true">${icon('external')}</span></span>
      <span class="next-type">${esc(next.type)}</span>
    </a>
  </nav>
</article>

${ctaBand(ctx, { title: '¿Quieres algo así para tu negocio?', text: 'Cuéntanos qué vendes y cómo te llegan los clientes. Te decimos qué construiríamos, cuánto cuesta y cuándo lo tienes.', need: needKey })}
`;

  return {
    path: `/projects/${p.slug}/`,
    title: `${p.name}: ${p.type} | District Studio`,
    description: `${p.summary} Caso de estudio de District Studio: problema, solución, resultado y funciones.`,
    ogImage: p.og,
    ogType: 'article',
    schema: [breadcrumb(ctx, items), caseStudy(ctx, p)],
    main,
    priority: '0.7',
  };
}

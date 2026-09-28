import { esc, icon } from '../core.mjs';
import { btn, img, phone, stage, ctaBand, crumbs, lines, catLabel } from '../components.mjs';
import { projects } from '../../content/projects.mjs';
import { breadcrumb, caseStudy } from '../seo.mjs';

const pad = (n) => String(n).padStart(2, '0');

function browser(ctx, src, alt, h = 900, label = '') {
  return `<div class="browser"><div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(label)}</span></div>${img(ctx, src, { alt, w: 1440, h })}</div>`;
}

/** Capítulo del caso: número, título, texto y las pantallas que existan. */
function chapter(ctx, p, c, i) {
  const alts = Object.fromEntries((p.gallery || []).map((g) => [g.src, g.alt]));
  let media = '';
  if (c.web) media = `<div class="chap-media is-web">${browser(ctx, c.web, alts[c.web] || c.t, (p.web && p.web.h) || 900, p.urlLabel || '')}</div>`;
  else if (c.shots && c.shots.length)
    media = `<div class="chap-media${c.shots.length > 1 ? ' is-duo' : ''}">${c.shots.map((s) => phone(ctx, { src: s, alt: alts[s] || c.t })).join('')}</div>`;
  return `<section class="chap${media ? '' : ' is-text'}" aria-labelledby="ch-${i}">
  <div class="chap-copy">
    <span class="chap-n">${pad(i + 1)}</span>
    <h3 class="chap-t" id="ch-${i}">${esc(c.t)}</h3>
    <p>${esc(c.d)}</p>
    ${c.note ? `<p class="chap-note">${esc(c.note)}</p>` : ''}
  </div>
  ${media}
</section>`;
}

export default function projectPage(ctx, p) {
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const items = [{ href: '/', label: 'Inicio' }, { href: '/portfolio/', label: 'Trabajos' }, { href: `/projects/${p.slug}/`, label: p.name }];
  const paras = (arr) => arr.map((t) => `<p>${esc(t)}</p>`).join('');
  const needKey = p.categories.find((c) => ['menus', 'catalogs', 'websites', 'booking', 'systems'].includes(c));
  const concept = p.kind === 'concept';
  const status = concept ? 'Concepto' : p.url ? 'En línea' : 'Plataforma propia';

  const story = p.problem
    ? `<div class="wrap story">
    <section class="story-row" aria-labelledby="s-prob"><h2 class="story-h" id="s-prob">Problema</h2><div class="story-b">${paras(p.problem)}</div></section>
    <section class="story-row" aria-labelledby="s-sol"><h2 class="story-h" id="s-sol">Solución</h2><div class="story-b">${paras(p.solution)}</div></section>
    <section class="story-row" aria-labelledby="s-res"><h2 class="story-h" id="s-res">Resultado</h2><div class="story-b">${paras(p.result)}</div></section>
  </div>`
    : '';

  const chapters = p.chapters
    ? `<section class="section chaps" aria-labelledby="chaps-t">
    <div class="wrap">
      <h2 class="h2" id="chaps-t">${lines(['Lo que', '<em>construimos.</em>'])}</h2>
      ${p.chapters.map((c, k) => chapter(ctx, p, c, k)).join('')}
    </div>
  </section>`
    : '';

  const conceptBlock = concept
    ? `<section class="section chaps" aria-labelledby="con-t">
    <div class="wrap">
      <h2 class="h2" id="con-t">${lines(['Lo que', '<em>diseñamos.</em>'])}</h2>
      <p class="lead con-lead">Un prototipo funcional preparado para un negocio de ${esc(p.sector.toLowerCase())}: así se vería y funcionaría su propio catálogo, en la computadora y en el celular.</p>
      ${p.web ? `<figure class="con-web" data-clip>${browser(ctx, p.web.src, p.web.alt, p.web.h || 900, p.name)}</figure>` : ''}
      <div class="con-grid">
        <div class="con-phones">${p.phones.map((s) => phone(ctx, { src: s.src, alt: s.alt })).join('')}</div>
        <div>
          <h3 class="con-h">Incluye</h3>
          <ul class="check-list" role="list">${p.features.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>`
    : '';

  const detail = !concept
    ? `<div class="wrap story">
    <section class="story-row" aria-labelledby="s-fun"><h2 class="story-h" id="s-fun">Funciones</h2><div class="story-b">
      <ul class="check-list" role="list">${p.features.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
    </div></section>
    <section class="story-row" aria-labelledby="s-tec"><h2 class="story-h" id="s-tec">Tecnología</h2><div class="story-b">
      <ul class="chips-static" role="list">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <p class="story-cats">Categorías: ${p.categories.map((c) => `<a class="link" href="${ctx.url('/portfolio/#' + c)}">${esc(catLabel[c])}</a>`).join(', ')}</p>
    </div></section>
  </div>`
    : '';

  const gallery =
    !p.chapters && p.gallery
      ? `<section class="section gallery-sec" aria-labelledby="g-t">
    <div class="wrap"><h2 class="h2" id="g-t">Pantallas</h2></div>
    <ul class="rail" role="list">${p.gallery.map((g) => `<li>${phone(ctx, { src: g.src, alt: g.alt })}<p class="cap">${esc(g.caption)}</p></li>`).join('')}</ul>
  </section>`
      : '';

  const main = `
<article class="case">
  <header class="page-hero case-hero">
    <div class="wrap">
      ${crumbs(ctx, items)}
      <p class="fx-meta case-meta"><span>${esc(p.meta || p.type)}</span><span class="${concept ? '' : 'is-live'}">${status}</span></p>
      <h1 class="display-2 case-t">${lines([esc(p.name)])}</h1>
      <p class="hero-lead">${esc(p.summary)}</p>
      <dl class="facts">
        <div><dt>Negocio</dt><dd>${esc(p.sector)}${p.location ? `, ${esc(p.location)}` : ''}</dd></div>
        <div><dt>${concept ? 'Qué diseñamos' : 'Qué hicimos'}</dt><dd>${esc(p.type)}</dd></div>
        ${p.year ? `<div><dt>Año</dt><dd>${p.year}</dd></div>` : ''}
        ${p.url ? `<div><dt>En línea</dt><dd><a class="link" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.urlLabel)}${icon('external', 'ic ic-sm')}</a></dd></div>` : ''}
      </dl>
    </div>
    <div class="wrap">
      <div class="case-cover" data-clip>${stage(ctx, p, { eager: true })}</div>
    </div>
  </header>

  ${story}
  ${chapters}
  ${conceptBlock}
  ${gallery}
  ${detail}
  ${p.url ? `<div class="wrap live-row">${btn(p.url, `Abrir ${p.urlLabel}`, { variant: 'ghost', external: true, arrow: true })}</div>` : ''}

  <nav class="wrap next-case" aria-label="Siguiente proyecto">
    <a href="${ctx.url(`/projects/${next.slug}/`)}" data-cursor="Siguiente">
      <span class="next-name">Siguiente: ${esc(next.name)} <span class="next-arrow" aria-hidden="true">${icon('arrow')}</span></span>
      <span class="next-type">${esc(next.meta || next.type)}</span>
    </a>
  </nav>
</article>

${ctaBand(ctx, { q: '¿Quieres algo así?', title: 'Hagamos el de tu <em>negocio.</em>', need: needKey })}
`;

  return {
    path: `/projects/${p.slug}/`,
    title: `${p.name}: ${p.type} | District Studio`,
    description: concept
      ? `${p.summary} Concepto diseñado por District Studio.`
      : `${p.summary} Caso de estudio de District Studio: problema, solución, resultado y funciones.`,
    ogImage: p.og || 'og-default.jpg',
    ogType: 'article',
    schema: [breadcrumb(ctx, items), caseStudy(ctx, p)],
    main,
    priority: p.kind === 'concept' ? '0.5' : '0.7',
  };
}

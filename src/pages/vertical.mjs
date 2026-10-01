import { esc, icon, wa } from '../core.mjs';
import { btn, phone, img, lines, sectionHead, workGrid, ctaBand, crumbs, faqList } from '../components.mjs';
import { verticals, studioSide } from '../../content/verticals.mjs';
import { projects } from '../../content/projects.mjs';
import { breadcrumb, faqPage } from '../seo.mjs';

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const pad = (n) => String(n).padStart(2, '0');

function heroMedia(ctx, v) {
  const h = v.hero;
  const ph = phone(ctx, { src: h.phone, alt: '', tall: h.tall, scroll: !!h.scroll, eager: true, cls: 'vh-phone' });
  const web = h.web ? `<div class="browser vh-web">${img(ctx, h.web, { alt: '', w: 1440, h: 900, eager: true })}</div>` : '';
  return `<div class="vh-media${h.web ? ' has-web' : ''}" aria-hidden="true">${web}${ph}<p class="vh-label">${esc(h.label)}</p></div>`;
}

/** Demostración: lo que cambias en tu panel aparece en lo que ve tu cliente. */
function liveDemo(v) {
  const d = v.demo;
  const all = d.items.concat([d.add]);
  const hue = (i) => [8, 210, 150, 38][i % 4];
  const row = (it, i) => `<li class="lv-row${i === all.length - 1 ? ' is-hidden' : ''}" data-k="${i}" style="--h:${hue(i)}">
      <span class="lv-th">${icon(d.icon, 'ic')}</span>
      <span class="lv-tx"><b>${esc(it.n)}</b><small>${esc(it.m)}</small></span>
      <span class="lv-p" data-p>${esc(it.p)}</span>
      <span class="lv-sw" aria-hidden="true"><i></i></span>
    </li>`;
  const card = (it, i) => `<li class="lv-card${i === all.length - 1 ? ' is-hidden' : ''}" data-k="${i}" style="--h:${hue(i)}">
      <span class="lv-img">${icon(d.icon, 'ic')}<em class="lv-badge" data-off>${esc(d.off)}</em><em class="lv-new">Nuevo</em></span>
      <b>${esc(it.n)}</b><small>${esc(it.m)}</small><span class="lv-p" data-p>${esc(it.p)}</span>
    </li>`;
  const cfg = { steps: d.steps, add: all.length - 1, orig: all.map((x) => x.p) };
  return `<div class="live" data-live='${esc(JSON.stringify(cfg))}'>
    <ol class="live-steps" role="list">${d.steps.map((s, i) => `<li data-s="${i}"><span>${pad(i + 1)}</span>${esc(s.cap)}</li>`).join('')}</ol>
    <div class="live-devs">
      <figure class="lv-dev lv-admin">
        <figcaption>Tu panel</figcaption>
        <div class="lv-screen">
          <div class="lv-bar"><span>Panel</span><b>${esc(d.brand)}</b></div>
          <ul class="lv-list" role="list">${all.map(row).join('')}</ul>
          <span class="lv-addbtn">${icon('plus', 'ic ic-sm')} Agregar</span>
          <span class="lv-toast" data-toast>Guardado</span>
        </div>
      </figure>
      <div class="lv-sync" aria-hidden="true"><i></i><i></i><i></i></div>
      <figure class="lv-dev lv-shop">
        <figcaption>Lo que ve tu cliente</figcaption>
        <div class="lv-screen">
          <div class="lv-bar is-shop"><b>${esc(d.brand)}</b>${icon('whatsapp', 'ic ic-sm')}</div>
          <ul class="lv-grid" role="list">${all.map(card).join('')}</ul>
        </div>
      </figure>
    </div>
    <p class="live-note">Demostración. Así funciona el panel que te entregamos.</p>
  </div>`;
}

export default function verticalPage(ctx, v) {
  const items = [{ href: '/', label: 'Inicio' }, { href: '/negocios/', label: 'Tu negocio' }, { href: `/negocios/${v.slug}/`, label: v.short }];
  const ex = v.examples.map((k) => bySlug[k]).filter(Boolean);
  const waHref = wa(ctx.config, v.wa);
  const waBtnHtml = btn(waHref, 'Lo quiero para mi negocio', { size: 'lg', ic: 'whatsapp', external: true, track: 'whatsapp_click', cls: 'magnetic' });

  const main = `
<section class="vh" aria-labelledby="vh-t">
  <div class="wrap vh-grid">
    <div class="vh-copy">
      ${crumbs(ctx, items)}
      <p class="vh-for">${esc(v.for)}</p>
      <h1 class="vh-t" id="vh-t">${lines(v.title)}</h1>
      <p class="hero-lead">${esc(v.lead)}</p>
      <div class="hero-actions">
        ${waBtnHtml}
        <a class="btn btn-ghost btn-lg" href="#panel"><span>Ver cómo funciona</span>${icon('arrow', 'ic ic-go')}</a>
      </div>
      <p class="vh-inc">${icon('check', 'ic ic-sm')} Incluye tu panel para hacer los cambios tú mismo</p>
    </div>
    ${heroMedia(ctx, v)}
  </div>
</section>

<section class="section pn-sec" aria-labelledby="pn-t">
  <div class="wrap">
    <header class="sec-head"><h2 class="h2" id="pn-t">${lines(['¿Todavía', 'vendes <em>así?</em>'])}</h2></header>
    <ul class="pn" role="list">${v.pains
      .map(([a, b], i) => `<li class="pn-i" data-in style="--i:${i}"><p class="pn-old"><span>${esc(a)}</span></p><p class="pn-new">${icon('arrow', 'ic ic-sm')}<span>${esc(b)}</span></p></li>`)
      .join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="gv-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('Lo que te <em>damos</em>', 'Todo listo y funcionando, con tu marca.', { id: 'gv-t' })}</div>
    <ul class="gives gives-lg" role="list">${v.gives.map((x, i) => `<li data-in style="--i:${i}">${icon('check', 'ic')}<span>${esc(x)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section lv-sec" id="panel" aria-labelledby="lv-t">
  <div class="wrap">
    <header class="sec-head lv-head">
      <h2 class="h2" id="lv-t">${lines(['Lo cambias aquí.', 'Se ve <em>allá.</em>'])}</h2>
      <p class="lead">Todos nuestros proyectos se entregan con un panel de administración. Tú haces tus cambios desde el celular, cuando quieras, sin llamarnos.</p>
    </header>
    ${liveDemo(v)}
  </div>
</section>

<section class="section" aria-labelledby="hw-t">
  <div class="wrap">
    <header class="sec-head"><h2 class="h2" id="hw-t">${lines(['Cómo <em>se vende</em>'])}</h2></header>
    <ol class="how how-v" role="list">${v.how.map((h, i) => `<li data-in style="--i:${i}"><span class="how-n">${pad(i + 1)}</span><h3 class="h5">${esc(h.t)}</h3><p>${esc(h.d)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section tv" aria-labelledby="tv-t">
  <div class="wrap">
    <h2 class="sr" id="tv-t">Quién hace qué</h2>
    <div class="tv-grid">
      <div class="tv-col is-you" data-in>
        <p class="tv-k">Tú controlas</p>
        <p class="tv-t">Tu negocio, desde tu panel.</p>
        <ul role="list">${v.control.map((c) => `<li>${icon('check', 'ic ic-sm')}${esc(c)}</li>`).join('')}</ul>
      </div>
      <div class="tv-col is-us" data-in style="--i:1">
        <p class="tv-k">Nosotros nos encargamos</p>
        <p class="tv-t">De que todo funcione.</p>
        <ul role="list">${studioSide.map((c) => `<li>${icon('check', 'ic ic-sm')}${esc(c)}</li>`).join('')}</ul>
      </div>
    </div>
    <p class="tagline-t tv-line">Nosotros te damos la herramienta. <em>Tú manejas tu negocio.</em></p>
  </div>
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

<section class="section" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('Preguntas', null, { id: 'faq-t' })}</div>
    ${faqList(v.faq)}
  </div>
</section>

<section class="fin" aria-labelledby="fin-t">
  <div class="wrap">
    <h2 class="fin-t" id="fin-t"><span class="line"><span class="fin-q">${esc(v.close.q)}</span></span><span class="line"><span style="--i:1">${v.close.t}</span></span></h2>
    <div class="fin-actions">
      ${btn(waHref, 'Lo quiero para mi negocio', { size: 'lg', ic: 'whatsapp', external: true, track: 'whatsapp_click', cls: 'magnetic' })}
      ${btn(ctx.url('/contact/#' + v.need), 'Llenar el formulario', { variant: 'ghost', size: 'lg', arrow: true, cls: 'magnetic' })}
    </div>
    <p class="fin-wa">Te respondemos por WhatsApp y te mostramos un ejemplo funcionando.</p>
  </div>
</section>
`;

  return {
    path: `/negocios/${v.slug}/`,
    title: `${v.name}: catálogo, menú o página con tu panel | Zerufy Studio`,
    description: v.lead,
    schema: [breadcrumb(ctx, items), faqPage(v.faq)],
    main,
    priority: '0.8',
  };
}

/** Selector "¿Qué negocio tienes?" (se usa en /negocios/ y en el inicio). */
export function chooser(ctx, { level = 3 } = {}) {
  return `<ul class="ng" role="list">${verticals
    .map(
      (v, i) => `<li><a class="ng-a" href="${ctx.url(`/negocios/${v.slug}/`)}" data-cursor="Ver">
        <span class="ng-n">${pad(i + 1)}</span>
        <h${level} class="ng-t">${esc(v.short)}</h${level}>
        <span class="ng-d">${esc(v.for)}</span>
        <span class="ng-go">${icon('arrow', 'ic')}</span>
        <span class="ng-img" aria-hidden="true">${img(ctx, v.preview, { alt: '', w: 540, h: 1169 })}</span>
      </a></li>`,
    )
    .join('')}</ul>`;
}

export function verticalsIndex(ctx) {
  const items = [{ href: '/', label: 'Inicio' }, { href: '/negocios/', label: 'Tu negocio' }];
  const main = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(ctx, items)}
    <h1 class="display-2">${lines(['¿Qué negocio', '<em>tienes?</em>'])}</h1>
    <p class="hero-lead">Elige el tuyo y mira en un minuto lo que te entregamos, cómo lo manejas tú desde tu panel y cómo vendes con él.</p>
  </div>
</section>
<section class="section tight-top"><div class="wrap">${chooser(ctx, { level: 2 })}</div></section>
${ctaBand(ctx, { q: '¿Tu negocio no está en la lista?', title: 'Cuéntanos y lo <em>armamos.</em>' })}
`;
  return {
    path: '/negocios/',
    title: 'Soluciones por tipo de negocio: restaurantes, tiendas, concesionarios y citas | Zerufy Studio',
    description: 'Menús digitales para restaurantes, catálogos para tiendas y concesionarios, y páginas de citas para barberías y salones. Todos con tu panel de administración.',
    schema: [breadcrumb(ctx, items)],
    main,
    priority: '0.9',
  };
}

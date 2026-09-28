import { esc, icon } from '../core.mjs';
import { btn, phone, sectionHead, faqList, ctaBand, crumbs } from '../components.mjs';
import { services } from '../../content/services.mjs';
import { projects } from '../../content/projects.mjs';
import { faq } from '../../content/studio.mjs';
import { breadcrumb, faqPage, service as serviceSchema } from '../seo.mjs';

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export default function servicesPage(ctx) {
  const blocks = services
    .map((s) => {
      const ex = s.examples.map((k) => bySlug[k]).filter(Boolean);
      const shot = ex[0] && ex[0].phones ? ex[0].phones[Math.min(1, ex[0].phones.length - 1)] : s.key === 'booking' ? { src: 'booking-demo', alt: 'Demostración de una página de reservas' } : null;
      return `<article class="svc-block${s.status === 'soon' ? ' is-soon' : ''}" id="${s.key}" aria-labelledby="t-${s.key}">
    <div class="svc-block-head">
      <h2 class="h2" id="t-${s.key}">${esc(s.name)}${s.status === 'soon' ? ' <span class="tag">Próximamente</span>' : ''}</h2>
      <p class="svc-outcome-lg">${esc(s.outcome)}</p>
      <p>${esc(s.lead)}</p>
      ${shot ? `<div class="svc-shot">${phone(ctx, { src: shot.src, alt: shot.alt })}</div>` : ''}
    </div>
    <div class="svc-block-body">
      <ul class="benefits" role="list">${s.benefits.map((b) => `<li><strong>${esc(b.t)}.</strong> ${esc(b.d)}</li>`).join('')}</ul>
      <ul class="feat-inline" role="list" aria-label="Incluye">${s.features.slice(0, 5).map((f) => `<li>${esc(f.t)}</li>`).join('')}</ul>
      ${ex.length ? `<p class="svc-ex">Ejemplos: ${ex.map((p) => `<a class="link" href="${ctx.url(`/projects/${p.slug}/`)}">${esc(p.name)}</a>${p.kind === 'concept' ? ' (concepto)' : ''}`).join(', ')}</p>` : ''}
      <div class="svc-foot">
        ${btn(ctx.url('/contact/#' + s.key), s.status === 'soon' ? 'Contarte mi idea' : 'Empezar un proyecto', { arrow: true })}
        <a class="link" href="${ctx.url(s.path)}">Ver detalles</a>
      </div>
    </div>
  </article>`;
    })
    .join('');

  const main = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(ctx, [{ href: '/', label: 'Inicio' }, { href: '/services/', label: 'Servicios' }])}
    <h1 class="display-2">Lo que construimos para tu <em>negocio.</em></h1>
    <p class="hero-lead">Desde un menú con código QR hasta un sistema con panel, inventario y pedidos. Empieza por lo que necesitas hoy y agrega lo demás cuando tu negocio lo pida.</p>
    <nav class="jump" aria-label="Ir a un servicio"><ul role="list">${services.map((s) => `<li><a href="#${s.key}">${esc(s.name)}</a></li>`).join('')}</ul></nav>
  </div>
</section>

<section class="section tight-top">
  <div class="wrap svc-blocks">${blocks}</div>
</section>

<section class="section" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('Preguntas', 'Si la tuya no está aquí, escríbenos por WhatsApp.', { id: 'faq-t' })}</div>
    ${faqList(faq)}
  </div>
</section>

${ctaBand(ctx)}
`;

  return {
    path: '/services/',
    title: 'Servicios: páginas web, menús digitales, catálogos y tiendas online | District Studio',
    description: 'Páginas web, menús digitales con QR, catálogos, tiendas online, sistemas a medida y apps. Con panel de administración para que cambies precios y productos tú mismo.',
    schema: [breadcrumb(ctx, [{ href: '/', label: 'Inicio' }, { href: '/services/', label: 'Servicios' }]), faqPage(faq), ...services.map((s) => serviceSchema(ctx, s))],
    main,
    priority: '0.9',
  };
}

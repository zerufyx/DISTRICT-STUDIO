import { esc } from '../core.mjs';
import { sectionHead, ctaBand, crumbs, stage, growthLine, lines } from '../components.mjs';
import { principles, growth } from '../../content/studio.mjs';
import { projects } from '../../content/projects.mjs';
import { breadcrumb, organization } from '../seo.mjs';

export default function about(ctx) {
  const items = [{ href: '/', label: 'Inicio' }, { href: '/about/', label: 'Nosotros' }];
  const live = projects.filter((p) => p.url);

  const main = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(ctx, items)}
    <h1 class="display-2">${lines(['Un estudio', 'para negocios', 'que <em>venden.</em>'])}</h1>
    <p class="hero-lead">Zerufy Studio diseña y construye la parte digital de negocios locales: la página, el menú, el catálogo, la tienda y el sistema que los mantiene al día. Estamos en Orlando, Florida, y trabajamos con negocios de Estados Unidos y Latinoamérica, en español e inglés.</p>
  </div>
</section>

<section class="section tight-top" aria-labelledby="hist-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('Cómo empezamos', null, { id: 'hist-t' })}</div>
    <div class="prose">
      <p>Empezamos construyendo el sistema de una tienda de reventa: un catálogo propio, un carrito que manda el pedido por WhatsApp, un panel para subir productos y un control de caja e inventario. Esa tienda fue Zerufy, y ahí probamos todo antes de ofrecerlo a nadie.</p>
      <p>Después vino una tienda de relojes y joyería, AMH Store, y un food truck a días de abrir, S91 House Grill. Cada proyecto hizo más fuerte la base: hoy todos corren sobre la misma plataforma, cada uno con su panel y sus datos.</p>
      <p>Por eso cada proyecto trae su panel y sus datos. Lo que entregamos es la infraestructura con la que un negocio vende, se organiza y crece.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="pr-t">
  <div class="wrap">
    ${sectionHead('Cómo pensamos cada proyecto', null, { id: 'pr-t' })}
    <ul class="principles" role="list">${principles.map((p) => `<li><h3 class="h4">${esc(p.t)}</h3><p>${esc(p.d)}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="grow-t">
  <div class="wrap">
    ${sectionHead('Empieza con un link. Crece hasta una <em>plataforma.</em>', 'Lo que construimos hoy es la base de lo que tu negocio va a necesitar mañana, sobre los mismos datos y sin empezar de cero.', { id: 'grow-t' })}
    ${growthLine(growth)}
  </div>
</section>

<section class="section" aria-labelledby="live-t">
  <div class="wrap">
    ${sectionHead('En línea <em>ahora.</em>', 'Ábrelos desde tu celular y pruébalos como lo haría un cliente.', { id: 'live-t' })}
    <ul class="live-list" role="list">${live
      .map(
        (p) => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">
      ${stage(ctx, p)}
      <span><strong>${esc(p.name)}</strong><span class="live-url">${esc(p.urlLabel)}</span></span>
    </a></li>`
      )
      .join('')}</ul>
  </div>
</section>

${ctaBand(ctx)}
`;

  return {
    path: '/about/',
    title: 'Nosotros: estudio digital en Orlando, Florida | Zerufy Studio',
    description: 'Zerufy Studio es un estudio digital en Orlando que construye páginas web, menús, catálogos, tiendas y sistemas para negocios locales, en español e inglés.',
    schema: [breadcrumb(ctx, items), organization(ctx)],
    main,
    priority: '0.6',
  };
}

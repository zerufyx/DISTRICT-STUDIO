import { esc, icon } from '../core.mjs';
import { btn, waBtn, phone, sectionHead, serviceIndex, workList, steps, faqList, ctaBand } from '../components.mjs';
import { services } from '../../content/services.mjs';
import { projects } from '../../content/projects.mjs';
import { process, beforeAfter, faq, control } from '../../content/studio.mjs';
import { organization, website } from '../seo.mjs';

export default function home(ctx) {
  const ba = beforeAfter;
  const live = projects.filter((p) => p.url);

  const main = `
<section class="hero" aria-labelledby="hero-t">
  <div class="wrap">
    <h1 class="display hero-t" id="hero-t"><span class="line"><span style="--i:0">Tu negocio,</span></span><span class="line"><span style="--i:1">como una <em>app.</em></span></span></h1>
    <div class="hero-row">
      <p class="hero-lead">Construimos la infraestructura digital de tu negocio: páginas web, menús, catálogos y tiendas que tú mismo manejas desde el celular.</p>
      <div class="hero-actions">
        ${btn(ctx.url('/contact/'), 'Crear mi proyecto', { size: 'lg' })}
        ${waBtn(ctx, { size: 'lg' })}
      </div>
    </div>
  </div>
  <div class="hero-stage" aria-label="Proyectos en línea">
    <div class="drift" style="--drift:-30px">${phone(ctx, { src: 's91-bebidas', alt: 'Bebidas con fotos en el menú de S91 House Grill', cls: 'ph-side', eager: true, style: '--i:1' })}</div>
    <div class="drift" style="--drift:-90px">${phone(ctx, { src: 's91-menu-scroll', tall: 3600, scroll: true, alt: 'Menú digital de S91 House Grill en un celular', cls: 'ph-mid', eager: true, style: '--i:0' })}</div>
    <div class="drift" style="--drift:-50px">${phone(ctx, { src: 's91-panel', alt: 'Panel donde la dueña de S91 House Grill maneja su menú', cls: 'ph-side', eager: true, style: '--i:2' })}</div>
  </div>
</section>

<section class="section ba" aria-labelledby="ba-t">
  <div class="wrap">
    ${sectionHead('¿Todavía vendes <em>así?</em>', 'Los mismos clientes, el mismo negocio. Lo que cambia es lo que ven cuando te encuentran.', { id: 'ba-t' })}
    <div class="ba-grid">
      <div class="ba-col ba-before">
        <p class="ba-label">${esc(ba.before.quote)}</p>
        <div class="chat" aria-label="Mensajes típicos de clientes">
          <p class="bub">precio?</p>
          <p class="bub">tienes en talla M?</p>
          <p class="bub">mándame fotos de todo lo que tienes</p>
          <p class="bub">sigue disponible??</p>
        </div>
        <ul class="ba-list" role="list">${ba.before.items.map((t) => `<li>${icon('x')}<span>${esc(t)}</span></li>`).join('')}</ul>
      </div>
      <div class="ba-col ba-after">
        <p class="ba-label">${esc(ba.after.quote)}</p>
        <div class="chat" aria-label="Pedido que llega por WhatsApp desde un catálogo">
          <p class="bub bub-order"><strong>Hola, quiero hacer este pedido:</strong><span>1 × Hoodie negro, talla L</span><span>1 × Gorra trucker</span><span>Entrega a domicilio</span></p>
          <p class="chat-note">Ejemplo de un pedido que llega desde el catálogo.</p>
        </div>
        <ul class="ba-list" role="list">${ba.after.items.map((t) => `<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>

<section class="section work" aria-labelledby="work-t">
  <div class="wrap">
    ${sectionHead('Trabajo real, en línea <em>hoy.</em>', 'Negocios que ya venden con lo que construimos. Entra a cada caso y ábrelo desde tu celular.', { id: 'work-t' })}
    ${workList(ctx, live)}
    <p class="more">${btn(ctx.url('/portfolio/'), 'Ver todos los trabajos', { variant: 'ghost', size: 'lg' })}</p>
  </div>
</section>

<section class="section" aria-labelledby="svc-t">
  <div class="wrap">
    ${sectionHead('Lo que <em>construimos.</em>', 'Empieza por lo que necesitas hoy. Todo se combina y crece después.', { id: 'svc-t' })}
    ${serviceIndex(ctx, services)}
  </div>
</section>

<section class="section control" aria-labelledby="ctl-t">
  <div class="wrap control-grid">
    <div class="control-phones">
      ${phone(ctx, { src: 's91-panel', alt: 'Panel de administración de S91 House Grill con categorías y platos' })}
      ${phone(ctx, { src: 's91-panel-edit', alt: 'Edición de un plato desde el panel, con precio y disponibilidad' })}
    </div>
    <div>
      ${sectionHead('Tu negocio, siempre <em>al día.</em>', 'Cada proyecto viene con su panel. Lo manejas tú, desde el celular, sin depender de nadie.', { id: 'ctl-t' })}
      <ul class="cap-list" role="list">${control.map((c) => `<li>${icon(c.ic)}<div><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" id="proceso" aria-labelledby="proc-t">
  <div class="wrap">
    ${sectionHead('Cómo <em>trabajamos.</em>', 'Tú nos cuentas tu negocio. Nosotros nos encargamos del resto.', { id: 'proc-t' })}
    ${steps(process)}
  </div>
</section>

<section class="section" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="split-aside">${sectionHead('Preguntas', 'Si la tuya no está aquí, escríbenos por WhatsApp.', { id: 'faq-t' })}</div>
    ${faqList(faq.slice(0, 6))}
  </div>
</section>

${ctaBand(ctx)}
`;

  return {
    path: '/',
    title: 'District Studio | Páginas web, menús digitales y catálogos para negocios',
    ogTitle: 'District Studio: tu negocio, como una app',
    description: 'Diseñamos y construimos páginas web, menús digitales con QR, catálogos y tiendas online para negocios, con un panel para que tú cambies precios, fotos y productos desde el celular.',
    schema: [organization(ctx), website(ctx)],
    mainClass: 'home',
    main,
    priority: '1.0',
  };
}

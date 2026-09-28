import { esc, icon, wa } from '../core.mjs';
import { crumbs, btn } from '../components.mjs';
import { form } from '../../content/studio.mjs';
import { breadcrumb } from '../seo.mjs';

export default function contact(ctx) {
  const items = [{ href: '/', label: 'Inicio' }, { href: '/contact/', label: 'Crear mi proyecto' }];
  const { contact: c } = ctx.config;

  const main = `
<section class="page-hero contact-hero">
  <div class="wrap">
    ${crumbs(ctx, items)}
    <h1 class="display-2">Cuéntanos tu <em>proyecto.</em></h1>
    <p class="hero-lead">Toma unos dos minutos. Con esto te respondemos con una propuesta clara: qué construimos, cuánto cuesta y cuándo lo tienes.</p>
  </div>
</section>

<section class="section tight-top">
  <div class="wrap contact-grid">
    <div class="form-shell">
      <form class="lead-form" id="lead-form" novalidate data-lead-form>
        <fieldset class="field-group">
          <legend class="fg-legend">¿Qué necesitas? <span class="req-note">Elige una o varias</span></legend>
          <div class="chip-row choice" data-needs>
            ${form.needs.map((n) => `<label class="chip-check"><input type="checkbox" name="needs" value="${n.key}" id="need-${n.key}"><span>${esc(n.label)}</span></label>`).join('')}
          </div>
          <p class="field-error" id="needs-error" data-error-for="needs" hidden>Elige al menos una opción.</p>
        </fieldset>

        <fieldset class="field-group">
          <legend class="fg-legend">Tu negocio</legend>
          <div class="fields two">
            <div class="field">
              <label for="business">Nombre del negocio</label>
              <input id="business" name="business" type="text" autocomplete="organization" required maxlength="120">
              <p class="field-error" data-error-for="business" hidden>Escribe el nombre de tu negocio.</p>
            </div>
            <div class="field">
              <label for="btype">Tipo de negocio <span class="opt">opcional</span></label>
              <select id="btype" name="btype">
                <option value="">Selecciona uno</option>
                ${form.businessTypes.map((t) => `<option>${esc(t)}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="instagram">Instagram <span class="opt">opcional</span></label>
              <div class="affix"><span aria-hidden="true">@</span><input id="instagram" name="instagram" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="60" placeholder="tunegocio"></div>
            </div>
          </div>
        </fieldset>

        <fieldset class="field-group">
          <legend class="fg-legend">Tus datos</legend>
          <div class="fields two">
            <div class="field">
              <label for="name">Nombre</label>
              <input id="name" name="name" type="text" autocomplete="name" required maxlength="80">
              <p class="field-error" data-error-for="name" hidden>Escribe tu nombre.</p>
            </div>
            <div class="field">
              <label for="phone">Teléfono o WhatsApp</label>
              <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="30" placeholder="(407) 000-0000">
              <p class="field-error" data-error-for="phone" hidden>Escribe un número con al menos 10 dígitos.</p>
            </div>
            <div class="field">
              <label for="email">Email <span class="opt">opcional</span></label>
              <input id="email" name="email" type="email" autocomplete="email" maxlength="120" placeholder="tu@correo.com">
              <p class="field-error" data-error-for="email" hidden>Revisa el email: parece incompleto.</p>
            </div>
          </div>
        </fieldset>

        <fieldset class="field-group">
          <legend class="fg-legend">¿Qué tan grande lo imaginas? <span class="opt">opcional</span></legend>
          <div class="chip-row choice">
            ${form.budgets.map((b, i) => `<label class="chip-check"><input type="radio" name="budget" value="${esc(b)}" id="budget-${i}"><span>${esc(b)}</span></label>`).join('')}
          </div>
        </fieldset>

        <div class="field">
          <label for="message">Cuéntanos del proyecto <span class="opt">opcional</span></label>
          <textarea id="message" name="message" rows="5" maxlength="2000" placeholder="Qué vendes, cómo te llegan los clientes hoy y qué te gustaría que hiciera tu página."></textarea>
        </div>

        <div class="hp" aria-hidden="true"><label for="website_url">No llenes este campo</label><input id="website_url" name="website_url" type="text" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="plan" id="plan" value="">

        <div class="form-foot">
          <button class="btn btn-primary btn-lg" type="submit" data-submit><span data-submit-label>Enviar mi proyecto</span></button>
          <p class="fine">Solo usamos tus datos para responderte sobre este proyecto.</p>
        </div>
        <p class="form-alert" data-form-alert role="alert" hidden></p>
      </form>

      <div class="done" data-done hidden tabindex="-1" aria-live="polite">
        <span class="done-mark">${icon('check')}</span>
        <h2 class="h2" data-done-t>Recibimos tu proyecto.</h2>
        <p class="lead" data-done-d>Te vamos a escribir para conversar los detalles y mandarte una propuesta.</p>
        <dl class="done-sum" data-done-sum></dl>
        <div class="done-actions">
          <a class="btn btn-primary" data-done-wa href="${wa(ctx.config)}" target="_blank" rel="noopener">${icon('whatsapp')}<span data-done-wa-label>Enviar también por WhatsApp</span></a>
          ${btn(ctx.url('/portfolio/'), 'Ver trabajos mientras tanto', { variant: 'ghost' })}
        </div>
      </div>
    </div>

    <aside class="contact-aside" aria-label="Otras formas de contacto">
      <div class="aside-block">
        <h2 class="h4">¿Prefieres escribir directo?</h2>
        <p>Mándanos un mensaje y lo conversamos por ahí.</p>
        ${btn(wa(ctx.config), 'WhatsApp', { variant: 'ghost', ic: 'whatsapp', external: true, track: 'whatsapp_click' })}
        <p class="copy-line"><span data-copy-src>${esc(c.whatsappDisplay)}</span><button type="button" class="copy-btn" data-copy="${esc(c.whatsappDisplay)}">${icon('copy', 'ic ic-sm')}<span>Copiar</span></button></p>
        ${c.email ? `<p class="copy-line"><span>${esc(c.email)}</span><button type="button" class="copy-btn" data-copy="${esc(c.email)}">${icon('copy', 'ic ic-sm')}<span>Copiar</span></button></p>` : ''}
      </div>
      <div class="aside-block">
        <h2 class="h4">Qué pasa después</h2>
        <ol class="next-steps">
          <li><strong>Revisamos tu proyecto</strong> y vemos qué necesita tu negocio.</li>
          <li><strong>Te escribimos</strong> por WhatsApp o email para aclarar detalles.</li>
          <li><strong>Te mandamos la propuesta</strong> con alcance, precio y fecha de entrega.</li>
        </ol>
      </div>
    </aside>
  </div>
</section>
`;

  return {
    path: '/contact/',
    title: 'Crear mi proyecto: cotiza tu página web, menú o catálogo | District Studio',
    description: 'Cuéntanos sobre tu negocio y lo que necesitas: página web, menú digital, catálogo, tienda online, sistema o app. Te respondemos con una propuesta clara.',
    schema: [breadcrumb(ctx, items)],
    main,
    hideDock: true,
    scripts: ['/assets/js/lead.js'],
    priority: '0.8',
  };
}

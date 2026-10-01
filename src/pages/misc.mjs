import { esc } from '../core.mjs';
import { btn } from '../components.mjs';

export function notFound(ctx) {
  const main = `
<section class="page-hero nf">
  <div class="wrap">
    <p class="display-2" aria-hidden="true">404</p>
    <h1 class="h2">Esta página no existe.</h1>
    <p class="hero-lead">Puede que el enlace esté mal escrito o que la página se haya movido. Desde aquí puedes seguir:</p>
    <div class="hero-actions">
      ${btn(ctx.url('/'), 'Ir al inicio')}
      ${btn(ctx.url('/portfolio/'), 'Ver trabajos', { variant: 'ghost' })}
      ${btn(ctx.url('/services/'), 'Ver servicios', { variant: 'ghost' })}
    </div>
  </div>
</section>`;
  return { path: '/404.html', title: 'Página no encontrada | Zerufy Studio', description: 'Esta página no existe.', noindex: true, main, sitemap: false };
}

// Espacio reservado para el panel interno (leads, clientes, proyectos, pedidos).
export function dashboard(ctx) {
  const modules = [
    ['Solicitudes', 'Cada formulario de “Crear mi proyecto”, con estado: nuevo, en conversación, propuesta, cerrado.', 'Tabla lista: leads'],
    ['Clientes', 'Negocios activos, contacto, plan y fecha de pago.', 'Por construir'],
    ['Proyectos', 'Lo que está en diseño, en construcción o publicado.', 'Por construir'],
    ['Portafolio', 'Casos de estudio que aparecen en el sitio.', 'Hoy en content/projects.mjs'],
    ['Servicios', 'Servicios del sitio.', 'Hoy en content/services.mjs'],
    ['Catálogos y menús', 'Acceso a los paneles de cada negocio.', 'Plataforma existente'],
    ['Pedidos', 'Pedidos de las tiendas de los clientes.', 'Por construir'],
    ['Contenido', 'Textos del sitio y futuras entradas del blog.', 'Por construir'],
  ];
  const main = `
<section class="page-hero">
  <div class="wrap">
    <h1 class="display-2">Panel del estudio</h1>
    <p class="hero-lead">Esta ruta está reservada para el panel interno de Zerufy Studio. Se conectará a Supabase con acceso por correo y contraseña. Esta página no aparece en Google.</p>
  </div>
</section>
<section class="section tight-top">
  <div class="wrap">
    <ul class="dash-list" role="list">${modules
      .map(([t, d, s]) => `<li><h2 class="h4">${esc(t)}</h2><p>${esc(d)}</p><span class="tag">${esc(s)}</span></li>`)
      .join('')}</ul>
  </div>
</section>`;
  return { path: '/dashboard/', title: 'Panel del estudio | Zerufy Studio', description: 'Panel interno de Zerufy Studio.', noindex: true, main, sitemap: false, hideDock: true };
}

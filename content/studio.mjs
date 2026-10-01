// Contenido compartido: proceso, ruta de crecimiento, antes/después, FAQ y principios.

export const process = [
  { t: 'Descubrir', d: 'Entendemos tu negocio: qué vendes, a quién y cómo te compran hoy.' },
  { t: 'Diseñar', d: 'Definimos cómo se ve y cómo se usa, empezando por el celular.' },
  { t: 'Construir', d: 'Programamos la experiencia real, con tu panel para manejarla.' },
  { t: 'Lanzar', d: 'Conectamos tu dominio, WhatsApp y herramientas, y lo publicamos.' },
];

// La ruta de crecimiento. now: true = disponible hoy.
export const growth = [
  { t: 'Presencia', d: 'Página web, menú digital o catálogo con tu dominio.', now: true },
  { t: 'Ventas', d: 'Carrito y pedidos organizados que llegan por WhatsApp.', now: true },
  { t: 'Operación', d: 'Panel, inventario, caja y clientes.', now: true },
  { t: 'Automatización', d: 'Avisos, formularios e integraciones con tus herramientas.', now: false },
  { t: 'Apps móviles', d: 'Tu negocio en iPhone y Android.', now: false },
  { t: 'Software a medida', d: 'Sistemas hechos solo para tu operación.', now: false },
];

export const faq = [
  { q: '¿Cuánto cuesta?', a: 'Depende de lo que tu negocio necesite: no cuesta lo mismo un menú con QR que un sistema a medida. Escríbenos por WhatsApp, cuéntanos qué vendes y te damos el precio exacto, sin compromiso.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende de lo que construyamos y de qué tan rápido tengamos tus fotos, textos y precios. Antes de empezar te decimos la fecha de entrega.' },
  { q: '¿Puedo hacer los cambios yo mismo?', a: 'Sí. Todos los proyectos se entregan con tu panel de administración: cambias precios, fotos, productos, horarios y lo que se agotó, desde tu celular. Nosotros quedamos de soporte y mantenimiento.' },
  { q: '¿Qué incluye la mensualidad?', a: 'El hosting, el soporte y el mantenimiento para que tu página, menú o catálogo siga en línea y funcionando.' },
  { q: '¿Necesito tener dominio?', a: 'No. Te ayudamos a elegir y comprar uno (tunegocio.com) y lo conectamos por ti.' },
  { q: '¿El cliente paga en la página?', a: 'Por ahora no. El pedido te llega completo por WhatsApp y el pago lo acuerdas directo con tu cliente: efectivo, Zelle, transferencia o tu propio link de pago.' },
  { q: '¿Qué necesito para empezar?', a: 'Tu logo si lo tienes, fotos de tus productos o platos, precios y tu WhatsApp. Si te falta algo, lo resolvemos juntos.' },
  { q: '¿Trabajan solo en Orlando?', a: 'Estamos en Orlando, Florida, pero trabajamos por WhatsApp y videollamada con negocios de cualquier lugar, en español o en inglés.' },
];

// Lo que el dueño maneja desde su panel
export const control = [
  { ic: 'price', t: 'Cambias precios', d: 'Subió un costo, cambias el precio en segundos. Sin reimprimir nada y sin capturas viejas circulando.' },
  { ic: 'soldout', t: 'Marcas lo agotado', d: 'Lo que se acabó desaparece o sale marcado. Nadie te escribe por algo que no tienes.' },
  { ic: 'photo', t: 'Subes fotos y productos', d: 'Nuevo producto o plato nuevo, lo agregas desde el celular con su foto y descripción.' },
  { ic: 'order', t: 'Recibes pedidos armados', d: 'El cliente elige, el pedido te llega por WhatsApp con todo listo para confirmar.' },
];

export const principles = [
  { t: 'Primero el celular', d: 'Tus clientes llegan desde Instagram, TikTok, WhatsApp y códigos QR. Diseñamos para el teléfono y después lo llevamos a la computadora.' },
  { t: 'Tú tienes el control', d: 'Cada proyecto viene con su panel. Cambiar un precio no debería depender de nadie.' },
  { t: 'Sin plantillas', d: 'Cada negocio tiene su marca, su forma de vender y sus clientes. El diseño parte de ahí.' },
  { t: 'Crecemos contigo', d: 'Empiezas con un link. Cuando lo necesites, agregas tienda, sistema o app sobre la misma base.' },
];

// Opciones del formulario de proyecto
export const form = {
  needs: [
    { key: 'websites', label: 'Sitio web' },
    { key: 'catalogs', label: 'Catálogo digital' },
    { key: 'menus', label: 'Menú digital' },
    { key: 'booking', label: 'Reservas' },
    { key: 'systems', label: 'Sistema a medida' },
    { key: 'unsure', label: 'Aún no sé' },
  ],
  businessTypes: ['Restaurante', 'Food truck', 'Tienda de ropa', 'Barbería', 'Salón de belleza', 'Concesionario', 'Joyería o accesorios', 'Profesional independiente', 'Marca personal', 'Otro'],
  budgets: ['Algo sencillo para empezar', 'Algo completo', 'Un sistema a medida', 'Aún no lo sé'],
  timelines: ['Lo antes posible', 'En 1 a 2 meses', 'Sin prisa', 'Aún no lo sé'],
};

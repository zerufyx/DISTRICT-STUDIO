// Contenido compartido: proceso, ruta de crecimiento, antes/después, FAQ y principios.

export const process = [
  { t: 'Cuéntanos sobre tu negocio', d: 'Llenas el formulario o nos escribes por WhatsApp. Hablamos de qué vendes, a quién y cómo te llegan los clientes hoy.' },
  { t: 'Definimos la idea', d: 'Te proponemos qué construir y qué incluye. Sabes cuánto cuesta y cuándo lo tienes antes de empezar.' },
  { t: 'Diseñamos', d: 'Llevamos tu marca a la pantalla: colores, tipografía, fotos y el orden en que el cliente ve las cosas.' },
  { t: 'Construimos', d: 'Programamos la página, el catálogo o el sistema, y conectamos WhatsApp, redes, mapas o pagos.' },
  { t: 'Revisamos', d: 'Lo pruebas en tu celular antes de publicarlo y ajustamos textos, precios y detalles contigo.' },
  { t: 'Lanzamos', d: 'Publicamos con tu dominio, te entregamos el código QR y te enseñamos a usar tu panel.' },
  { t: 'Seguimos mejorando', d: 'Mantenemos todo en línea, hacemos cambios y agregamos funciones cuando tu negocio las pida.' },
];

// La ruta de crecimiento. now: true = disponible hoy.
export const growth = [
  { t: 'Presencia', d: 'Página web, menú digital o catálogo con tu dominio.', now: true },
  { t: 'Ventas', d: 'Carrito, pedidos, pagos en línea y cupones.', now: true },
  { t: 'Operación', d: 'Panel, inventario, caja y clientes.', now: true },
  { t: 'Automatización', d: 'Avisos, formularios e integraciones con tus herramientas.', now: false },
  { t: 'Apps móviles', d: 'Tu negocio en iPhone y Android.', now: false },
  { t: 'Software a medida', d: 'Sistemas hechos solo para tu operación.', now: false },
];

export const beforeAfter = {
  before: {
    quote: 'Solo tengo Instagram.',
    items: [
      'Mandas fotos y precios uno por uno por mensaje.',
      'Los precios viejos siguen circulando en capturas.',
      'Los pedidos se pierden entre conversaciones.',
      'Si te buscan en Google, no apareces.',
    ],
  },
  after: {
    quote: 'Tengo mi propia plataforma.',
    items: [
      'Un link con todo tu menú o catálogo, con fotos y precios al día.',
      'Los pedidos llegan por WhatsApp ya armados.',
      'Cambias precios, fotos y agotados desde tu celular.',
      'Tu negocio aparece en Google con su propio dominio.',
    ],
  },
};

export const faq = [
  { q: '¿Cuánto cuesta?', a: 'Depende de lo que tu negocio necesite: no cuesta lo mismo un menú con QR que una tienda con pagos. Escríbenos por WhatsApp, cuéntanos qué vendes y te damos el precio exacto, sin compromiso.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende de lo que construyamos y de qué tan rápido tengamos tus fotos, textos y precios. Antes de empezar te decimos la fecha de entrega.' },
  { q: '¿Puedo cambiar precios y productos yo mismo?', a: 'Sí. Los menús y catálogos incluyen un panel donde cambias precios, fotos y descripciones, y marcas lo que se agotó, desde tu celular.' },
  { q: '¿Qué incluye la mensualidad?', a: 'El hosting, el soporte y el mantenimiento para que tu página, menú o catálogo siga en línea y funcionando.' },
  { q: '¿Necesito tener dominio?', a: 'No. Te ayudamos a elegir y comprar uno (tunegocio.com) y lo conectamos por ti.' },
  { q: '¿Pueden cobrar con tarjeta en línea?', a: 'Sí. En tiendas online integramos pagos con Stripe o PayPal. Muchos negocios empiezan con pedidos por WhatsApp y agregan pagos después.' },
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
    { key: 'websites', label: 'Página web' },
    { key: 'menus', label: 'Menú digital' },
    { key: 'catalogs', label: 'Catálogo' },
    { key: 'ecommerce', label: 'Tienda online' },
    { key: 'systems', label: 'Sistema personalizado' },
    { key: 'apps', label: 'Aplicación' },
    { key: 'other', label: 'Otro' },
  ],
  businessTypes: ['Restaurante', 'Food truck', 'Tienda de ropa', 'Barbería', 'Salón de belleza', 'Concesionario', 'Joyería o accesorios', 'Profesional independiente', 'Marca personal', 'Otro'],
  budgets: ['Algo sencillo para empezar', 'Algo completo', 'Un sistema a medida', 'Aún no lo sé'],
};

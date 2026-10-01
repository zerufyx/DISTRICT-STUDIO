// Servicios. Cada uno genera su propia página (path) y aparece en /services/.
// status: 'available' | 'soon'

export const services = [
  {
    key: 'websites',
    path: '/websites/',
    name: 'Páginas web',
    icon: 'web',
    status: 'available',
    outcome: 'Una presencia en internet a la altura de tu marca.',
    lead: 'Tu sitio con lo que un cliente busca antes de visitarte o comprarte: qué haces, precios, horarios, ubicación y cómo escribirte. Diseñado para el celular, listo para aparecer en Google y con tu panel para cambiarlo tú mismo.',
    forWho: ['Restaurantes', 'Barberías', 'Salones de belleza', 'Tiendas', 'Profesionales', 'Marcas personales', 'Negocios locales'],
    examples: ['ibrows', 'jircars', 's91-house-grill'],
    seo: {
      title: 'Diseño de páginas web para negocios en Orlando | Zerufy Studio',
      description: 'Páginas web a medida para restaurantes, barberías, salones, tiendas y negocios locales. Rápidas en el celular, con dominio propio y listas para Google.',
    },
  },
  {
    key: 'menus',
    path: '/menus/',
    name: 'Menús digitales',
    icon: 'menu',
    status: 'available',
    outcome: 'Tu menú en un QR, siempre con el precio correcto.',
    lead: 'Un menú con fotos, precios y categorías que tus clientes abren desde un código QR o un link. Cuando cambia un precio o se acaba un plato, lo cambias tú desde el celular y listo.',
    forWho: ['Restaurantes', 'Food trucks', 'Cafeterías', 'Panaderías', 'Heladerías', 'Bares'],
    examples: ['s91-house-grill'],
    seo: {
      title: 'Menú digital con QR para restaurantes y food trucks | Zerufy Studio',
      description: 'Menú digital con fotos, precios, código QR y pedidos por WhatsApp. Cambias precios y platos agotados desde tu celular. Para restaurantes y food trucks.',
    },
  },
  {
    key: 'catalogs',
    path: '/catalogs/',
    name: 'Catálogos digitales',
    icon: 'catalog',
    status: 'available',
    outcome: 'Un solo link con todo lo que vendes.',
    lead: 'Mucho más que un PDF: un catálogo con fotos, categorías, variantes y precios, donde el cliente busca, filtra y te hace el pedido. Lo compartes en tu bio, en WhatsApp o en un QR.',
    forWho: ['Tiendas de ropa', 'Reventa y streetwear', 'Joyería y relojes', 'Accesorios', 'Concesionarios', 'Distribuidores'],
    examples: ['aureon', 'zerufy', 'amh-store'],
    seo: {
      title: 'Catálogo digital para tiendas: un link con todos tus productos | Zerufy Studio',
      description: 'Catálogo online con fotos, variantes, precios, búsqueda y pedidos por WhatsApp. Un solo link para tu bio, tus chats y tus clientes.',
    },
  },
  {
    key: 'booking',
    path: '/booking/',
    name: 'Reservas',
    icon: 'calendar',
    status: 'available',
    outcome: 'Tus clientes reservan solos, a cualquier hora.',
    lead: 'Una página donde el cliente elige el servicio, el día y la hora, y la cita te llega lista por WhatsApp. Para estudios de cejas y pestañas, salones, uñas y profesionales que hoy agendan por mensaje.',
    forWho: ['Cejas y pestañas', 'Salones de belleza', 'Uñas', 'Barberías', 'Tatuajes', 'Estudios de entrenamiento', 'Consultorios', 'Profesionales independientes'],
    examples: ['ibrows'],
    seo: {
      title: 'Página de reservas y citas para estudios de belleza y salones | Zerufy Studio',
      description: 'Páginas de reservas para estudios de cejas y pestañas, salones y profesionales: el cliente elige servicio, día y hora, y la cita te llega por WhatsApp.',
    },
  },
  {
    key: 'systems',
    path: '/systems/',
    name: 'Sistemas a medida',
    icon: 'system',
    status: 'available',
    outcome: 'Pedidos, clientes e inventario en un solo lugar.',
    lead: 'Paneles y herramientas hechas para la forma en que trabaja tu negocio: pedidos, reservaciones, inventario, caja y clientes. Menos notas en el teléfono y menos capturas perdidas.',
    forWho: ['Negocios con inventario', 'Restaurantes con pedidos', 'Barberías y salones con citas', 'Equipos de ventas', 'Negocios con varias sucursales'],
    examples: ['panel-zerufy', 'zerufy'],
    seo: {
      title: 'Sistemas a medida y paneles de administración para negocios | Zerufy Studio',
      description: 'Paneles de administración, control de inventario y caja, pedidos, reservaciones y automatizaciones hechos a la medida de tu negocio.',
    },
  },
  {
    key: 'apps',
    path: '/apps/',
    name: 'Apps móviles',
    icon: 'phone',
    status: 'soon',
    outcome: 'Tu negocio en la pantalla de inicio de tus clientes.',
    lead: 'Apps para iPhone y Android para pedir, reservar, acumular puntos o recibir avisos. Es el siguiente paso para los negocios que ya tienen su plataforma con nosotros.',
    statusNote: 'Estamos preparando esta línea. Si ya tienes la idea, cuéntanosla y la planificamos contigo.',
    forWho: ['Restaurantes', 'Tiendas', 'Gimnasios y membresías', 'Barberías y salones', 'Negocios con clientes frecuentes'],
    examples: [],
    seo: {
      title: 'Apps móviles para restaurantes y tiendas (iPhone y Android) | Zerufy Studio',
      description: 'Apps para iPhone y Android con pedidos, membresías, puntos y notificaciones, conectadas al mismo panel de tu negocio.',
    },
  },
];

// Orden en que se muestran en todo el sitio
const ORDER = ['websites', 'catalogs', 'menus', 'booking', 'systems', 'apps'];
services.sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));

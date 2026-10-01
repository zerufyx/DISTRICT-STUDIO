// Cómo funciona cada servicio, en el formato del pitch de Zerufy Studio:
// lo que te damos, lo que tú controlas, de qué nos encargamos, cómo funciona
// y lo que no hace (para que nadie compre algo que no es). Sin precios.

// Lo que hace el estudio en todos los proyectos
export const weHandle = [
  { t: 'Diseño con tu marca', d: 'Tu logo, tus colores y tu forma de hablar.' },
  { t: 'Hosting y seguridad', d: 'Tu página en línea, rápida y con conexión segura.' },
  { t: 'Dominio conectado', d: 'Tu link listo para compartir, o tunegocio.com si lo quieres.' },
  { t: 'Soporte y mantenimiento', d: 'Si algo falla, lo arreglamos, y mantenemos todo al día.' },
];

export const guide = {
  websites: {
    gives: [
      'Tu página con lo que el cliente busca: qué haces, fotos, horarios y ubicación',
      'Botones a WhatsApp, llamada, Instagram y Google Maps',
      'Hecha para verse bien en el celular',
      'Lista para aparecer en Google cuando te buscan',
      'Tu panel de administración para hacer tus cambios tú mismo',
    ],
    control: [
      { i: 'photo', t: 'Textos y fotos', d: 'Cambias lo que dice tu página y sus fotos.' },
      { i: 'clock', t: 'Horarios y datos', d: 'Horario, teléfono y dirección siempre al día.' },
      { i: 'price', t: 'Servicios y precios', d: 'Agregas, quitas o cambias lo que ofreces.' },
      { i: 'share', t: 'Compartir', d: 'Tu link en la bio, en tus historias y en tus tarjetas.' },
    ],
    how: [
      { t: 'Nos cuentas de tu negocio', d: 'Qué haces, a quién le vendes y qué quieres que la gente haga al entrar.' },
      { t: 'La diseñamos', d: 'Con tu marca, tus fotos y tus textos.' },
      { t: 'La revisas', d: 'Nos dices qué cambiar antes de publicarla.' },
      { t: 'Sale en línea', d: 'Con tu link o tu dominio, lista para compartir.' },
    ],
    not: 'No es una tienda: si quieres que tus clientes vean productos y hagan pedidos, lo tuyo es un catálogo.',
  },
  menus: {
    gives: [
      'Tu menú con fotos, precios y categorías, con tu logo y tus colores',
      'Un código QR para la mesa, la ventanilla o los volantes',
      'Botón para pedir por WhatsApp con el pedido ya escrito',
      'Ubicación, horarios y redes en el mismo lugar',
      'Tu panel para cambiar el menú desde el celular',
    ],
    control: [
      { i: 'plus', t: 'Agregar platos', d: 'Foto, descripción y precio.' },
      { i: 'price', t: 'Cambiar precios', d: 'Al instante, sin reimprimir nada.' },
      { i: 'soldout', t: 'Marcar agotado', d: 'Se acabó un plato y lo quitas en un toque.' },
      { i: 'sort', t: 'Ordenar el menú', d: 'Secciones y platos en el orden que quieras.' },
    ],
    how: [
      { t: 'El cliente escanea el QR', d: 'O abre tu link desde Instagram o WhatsApp. No descarga nada.' },
      { t: 'Ve el menú completo', d: 'Con fotos y precios correctos.' },
      { t: 'Te escribe su pedido', d: 'Por WhatsApp, ya sabiendo lo que quiere.' },
      { t: 'Tú lo preparas', d: 'Y el cobro lo haces como siempre.' },
    ],
    not: 'El menú no cobra por ti: el pedido llega por WhatsApp y el pago lo manejas tú, como hoy.',
  },
  catalogs: {
    gives: [
      'Un catálogo tipo app con todos tus productos, tu logo y tus colores',
      'Fotos, precios, categorías y tallas o variantes',
      'Carrito: el pedido te llega por WhatsApp con todo escrito',
      'Un solo link para tu bio, tus historias y tus chats',
      'Tu panel para manejar el catálogo desde el celular',
    ],
    control: [
      { i: 'plus', t: 'Subir productos', d: 'Fotos, precio, tallas y descripción.' },
      { i: 'price', t: 'Cambiar precios', d: 'Cuando quieras, al instante.' },
      { i: 'soldout', t: 'Marcar agotado', d: 'Lo que ya no tienes deja de salir.' },
      { i: 'catalog', t: 'Organizar', d: 'Por categoría, como lo buscaría tu cliente.' },
      { i: 'share', t: 'Compartir', d: 'Tu catálogo completo o un producto exacto.' },
    ],
    how: [
      { t: 'Tu cliente ve todo el catálogo', d: 'Desde su celular, sin que le mandes fotos una por una.' },
      { t: 'Arma su pedido', d: 'Elige productos, tallas y cantidades en el carrito.' },
      { t: 'Te llega por WhatsApp', d: 'Con todo escrito y el total.' },
      { t: 'Tú cierras la venta', d: 'Confirmas, cobras y entregas como tú trabajes.' },
    ],
    not: 'El catálogo no cobra por ti: el pago lo acuerdas tú con tu cliente. Si también quieres llevar caja e inventario, se agrega aparte.',
  },
  booking: {
    gives: [
      'Una página con tus servicios, su duración y tus horarios',
      'El cliente elige servicio, día y hora',
      'La cita te llega por WhatsApp, lista para confirmar',
      'Tu panel para cambiar servicios, horarios y días libres',
    ],
    control: [
      { i: 'plus', t: 'Tus servicios', d: 'Corte, barba, uñas… cada uno con su tiempo.' },
      { i: 'calendar', t: 'Tus horarios', d: 'Abres y cierras los días y horas que quieras.' },
      { i: 'soldout', t: 'Días libres', d: 'Bloqueas un día y nadie reserva.' },
    ],
    how: [
      { t: 'El cliente entra a tu link', d: 'Desde tu bio, un QR o WhatsApp.' },
      { t: 'Elige servicio, día y hora', d: 'Solo ve los horarios que tú abriste.' },
      { t: 'Te llega la cita', d: 'Por WhatsApp, con todo escrito.' },
      { t: 'Tú la confirmas', d: 'Y atiendes como siempre.' },
    ],
    not: 'No cobra depósitos ni pagos: la cita llega por WhatsApp y el cobro lo manejas tú.',
  },
  systems: {
    gives: [
      'Un panel hecho para cómo trabaja tu negocio',
      'Pedidos, clientes, caja e inventario en un solo lugar',
      'Acceso con usuario y contraseña, desde el celular',
      'Empiezas con lo que necesitas y agregas después',
    ],
    control: [
      { i: 'order', t: 'Pedidos', d: 'Todos en una lista, con su estado.' },
      { i: 'price', t: 'Caja', d: 'Ventas, compras y retiros del día.' },
      { i: 'catalog', t: 'Inventario', d: 'Cuánto te queda de cada producto.' },
      { i: 'system', t: 'Tus números', d: 'Lo importante a primera vista.' },
    ],
    how: [
      { t: 'Nos cuentas cómo trabajas hoy', d: 'Libretas, notas, capturas: lo que uses.' },
      { t: 'Diseñamos el panel', d: 'Solo con lo que te sirve.' },
      { t: 'Lo pruebas', d: 'Con datos reales de tu negocio.' },
      { t: 'Lo usas todos los días', d: 'Y lo ajustamos si hace falta.' },
    ],
    not: 'Cada sistema se cotiza según lo que necesites. Te decimos el alcance antes de empezar.',
  },
  apps: {
    gives: [
      'Tu negocio en iPhone y Android',
      'Conectada al mismo panel que ya usas',
    ],
    control: [],
    how: [],
    not: 'Esta línea todavía no está disponible. Si tienes la idea, la planificamos contigo.',
  },
};

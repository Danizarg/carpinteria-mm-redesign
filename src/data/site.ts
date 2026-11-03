/**
 * Business facts. Everything here is taken from the company's own published
 * information (carpinteriaebanisteriamym.webnode.es) — do not invent details.
 */

export const site = {
  name: "Carpintería y Ebanistería M&M",
  shortName: "M&M",
  monogram: "M&M",
  tagline: "La madera convertida en arte.",
  city: "Marbella",
  /** Production origin — drives metadataBase, canonicals, OG and the sitemap. */
  url: "https://carpinteria-mm-redesign-danizargs-projects.vercel.app",
  locale: "es-ES",
  /** From «¿Quiénes somos?»: "más de 30 años de experiencia en el sector". */
  yearsOfExperience: 30,
  description:
    "Taller de carpintería y ebanistería en Marbella con más de 30 años de experiencia. Diseño, fabricación y colocación de puertas, vestidores, ventanas, pérgolas, pasamanos y mobiliario a medida.",
} as const;

export const contact = {
  street: "C/ Madera 4",
  area: "Polígono Industrial La Ermita",
  city: "Marbella",
  addressLines: ["C/ Madera 4", "Polígono Industrial La Ermita", "Marbella"],
  phones: [
    { label: "952 926 759", href: "tel:+34952926759" },
    { label: "691 756 583", href: "tel:+34691756583" },
  ],
  /** The mobile line, used for WhatsApp. */
  whatsapp: { number: "34691756583", label: "691 756 583" },
  email: "madertech08@hotmail.com",
  /** From the «Contacto» page: "Horarios de oficina: 08:00/13:00 — 15:00/18:00". */
  officeHours: ["08:00 – 13:00", "15:00 – 18:00"],
  mapsQuery: "C/ Madera 4, Polígono Industrial La Ermita, Marbella",
} as const;

export type ServiceKey = "puertas" | "vestidores" | "exteriores" | "banos";

export type Service = {
  key: ServiceKey;
  slug: string;
  href: string;
  /** Short name for navigation. */
  nav: string;
  /** Full title as used on the page. */
  title: string;
  /** Oversized display title, split for typographic layout. */
  display: [string, string];
  number: string;
  summary: string;
  /** Long-form introduction for the service page. */
  intro: string[];
  /** Concrete, honest capability list. */
  capabilities: string[];
  /** Materials & finishes genuinely offered. */
  notes: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    key: "puertas",
    slug: "puertas-de-entrada-y-de-paso",
    href: "/servicios/puertas-de-entrada-y-de-paso",
    nav: "Puertas de entrada y de paso",
    title: "Puertas de entrada y de paso",
    display: ["Puertas de entrada", "y de paso"],
    number: "01",
    summary:
      "Puertas macizas de entrada, cancelas y puertas de paso. De la talla tradicional andaluza al listón horizontal contemporáneo.",
    intro: [
      "La puerta es la primera pieza de carpintería que alguien toca al entrar en una casa. Por eso la tratamos como una pieza de ebanistería y no como un elemento de obra: bastidor macizo, despiece estudiado, herrajes elegidos uno a uno y un ajuste al hueco medido en el propio emplazamiento.",
      "Fabricamos tanto puertas de entrada de gran formato —talladas, claveteadas, en arco o de listón horizontal— como series completas de puertas de paso para toda la vivienda, con la misma madera y el mismo acabado de principio a fin.",
    ],
    capabilities: [
      "Puertas de entrada macizas y acorazadas",
      "Cancelas y portones de acceso",
      "Puertas de paso, correderas y ocultas",
      "Puertas de garaje y basculantes en madera",
      "Arcos, celosías y tallas tradicionales",
      "Herrajes, tiradores y cerrajería a medida",
    ],
    notes: [
      { label: "Maderas", value: "Iroko, sapeli, roble, pino melis, cedro" },
      { label: "Acabados", value: "Barniz, lacado, aceite natural, envejecido" },
      { label: "Medición", value: "Siempre a pie de obra" },
    ],
  },
  {
    key: "vestidores",
    slug: "vestidores-y-mobiliario-a-medida",
    href: "/servicios/vestidores-y-mobiliario-a-medida",
    nav: "Vestidores y mobiliario a medida",
    title: "Vestidores y mobiliario a medida",
    display: ["Vestidores", "y mobiliario"],
    number: "02",
    summary:
      "Vestidores, armarios empotrados, bibliotecas y mobiliario de salón y dormitorio resueltos milímetro a milímetro.",
    intro: [
      "Un vestidor bien hecho se nota en lo que no se ve: el fondo útil aprovechado hasta el último centímetro, los cajones que cierran sin ruido, las baldas que no se vencen y las juntas que siguen siendo líneas rectas diez años después.",
      "Partimos del hueco real, no de un catálogo. Estudiamos el recorrido de la luz, la altura de los techos y lo que de verdad se va a guardar, y a partir de ahí dibujamos el despiece completo antes de cortar la primera plancha.",
    ],
    capabilities: [
      "Vestidores abiertos y con frentes",
      "Armarios empotrados y frentes correderos",
      "Bibliotecas y librerías a pared completa",
      "Mobiliario de salón y dormitorio",
      "Islas, cajoneras y zapateros interiores",
      "Mecanismos de cierre amortiguado e iluminación integrada",
    ],
    notes: [
      { label: "Interiores", value: "Melamina de alta densidad, chapa natural, lacado" },
      { label: "Mecanismos", value: "Guías de extracción total y cierre amortiguado" },
      { label: "Proyecto", value: "Despiece y visualización previa" },
    ],
  },
  {
    key: "exteriores",
    slug: "ventanas-pergolas-y-pasamanos",
    href: "/servicios/ventanas-pergolas-y-pasamanos",
    nav: "Ventanas, pérgolas y pasamanos",
    title: "Ventanas, pérgolas y pasamanos",
    display: ["Ventanas, pérgolas", "y pasamanos"],
    number: "03",
    summary:
      "Carpintería que vive a la intemperie: ventanas y contraventanas, pérgolas, porches, escaleras y barandillas.",
    intro: [
      "En la costa, la madera exterior trabaja: sol directo, salitre y una diferencia de humedad notable entre el día y la noche. La carpintería de exterior se diseña contando con ese movimiento, no ignorándolo.",
      "Elegimos especies estables, resolvemos los encuentros con pendiente y goterón, y protegemos cada pieza con sistemas pensados para mantenimiento, no para durar un verano. El resultado es una pérgola, una ventana o un pasamanos que se puede recuperar en lugar de sustituir.",
    ],
    capabilities: [
      "Ventanas practicables, oscilobatientes y correderas",
      "Contraventanas, celosías y mallorquinas",
      "Pérgolas, porches y estructuras de sombra",
      "Escaleras de madera y peldañeado",
      "Pasamanos y barandillas interiores y exteriores",
      "Revestimientos, frentes ventilados y remates",
    ],
    notes: [
      { label: "Maderas", value: "Iroko, cedro, pino tratado en autoclave" },
      { label: "Protección", value: "Lasures y barnices de exterior renovables" },
      { label: "Detalle", value: "Goterón, pendiente y ventilación de testas" },
    ],
  },
  {
    key: "banos",
    slug: "muebles-de-bano",
    href: "/servicios/muebles-de-bano",
    nav: "Muebles de baño",
    title: "Muebles de baño",
    display: ["Muebles", "de baño"],
    number: "04",
    summary:
      "Encimeras, bajolavabos y frentes de almacenaje preparados para convivir con el agua y el vapor.",
    intro: [
      "El baño es el ambiente más exigente de la casa para la madera. Un mueble de baño bien resuelto empieza por el canteado y el sellado de los cantos, sigue por una fijación que deja respirar la pared y termina en un acabado que soporta la limpieza diaria.",
      "Trabajamos el mueble de baño como una pieza de ebanistería completa: encimera, bajolavabo, columnas y espejo con el mismo despiece y la misma veta, de modo que el conjunto se lea como una sola pieza.",
    ],
    capabilities: [
      "Bajolavabos suspendidos y de apoyo",
      "Encimeras en madera maciza y chapada",
      "Columnas y muebles auxiliares",
      "Frentes de armario y espejos enmarcados",
      "Soluciones para aseos de cortesía",
      "Coordinación con fontanería y alicatado",
    ],
    notes: [
      { label: "Tratamiento", value: "Cantos sellados y acabados hidrófugos" },
      { label: "Montaje", value: "Fijación oculta y ventilación posterior" },
      { label: "Conjunto", value: "Veta continua entre piezas" },
    ],
  },
];

export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s])) as Record<
  ServiceKey,
  Service
>;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Nuestra empresa", href: "/nuestra-empresa" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/servicios", children: services.map((s) => ({ label: s.nav, href: s.href })) },
  { label: "Contacto", href: "/contacto" },
] as const;

/** The two divisions the company describes on its «Nuestros Trabajos» page. */
export const divisions = [
  {
    title: "Carpintería arquitectónica",
    body: "Diseños de carpintería arquitectónica personalizados, con soluciones integrales de remodelación y diseño de espacios.",
  },
  {
    title: "Trabajos de ebanistería",
    body: "Muebles e inmobiliario en madera y una amplia gama de accesorios y acabados en general, para el hogar y la oficina.",
  },
] as const;

/** The working method, written from what the company states about its process. */
export const process = [
  {
    number: "01",
    title: "Visita y medición",
    body: "Vamos al emplazamiento, tomamos medidas reales y entendemos el uso, la luz y los encuentros con el resto de la obra.",
  },
  {
    number: "02",
    title: "Diseño y visualización",
    body: "Con nuestro soporte informático de diseño estudiamos sus necesidades y le ofrecemos una visión anticipada del producto final.",
  },
  {
    number: "03",
    title: "Presupuesto sin compromiso",
    body: "Recibe un presupuesto detallado, por partidas, sin ningún compromiso y con los plazos de fabricación por escrito.",
  },
  {
    number: "04",
    title: "Taller",
    body: "Fabricamos en nuestro taller de Marbella, combinando maderas con otros materiales y mecanismos avanzados.",
  },
  {
    number: "05",
    title: "Colocación",
    body: "Instalamos nosotros mismos. El ajuste final, los herrajes y los remates los hace quien ha fabricado la pieza.",
  },
] as const;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${contact.whatsapp.number}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.mapsQuery
)}`;

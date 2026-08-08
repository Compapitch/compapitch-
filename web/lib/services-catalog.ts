export type ServiceDefinition = {
  slug: string;
  name: string;
  category: string;
  description: string;
  checkmarks: string[];
  iconKey: string;
  iconBg: string;
  iconColor: string;
};

// Static catalog — unlike `tools`, servicios personalizados are quoted
// manually by Rodrigo, not metered by credits, so there's no runtime need
// for these to live in the database yet.
export const SERVICES: ServiceDefinition[] = [
  {
    slug: "crm-a-la-medida",
    name: "CRM a la medida",
    category: "Gestión de clientes",
    description: "Diseñado alrededor de tu flujo de ventas, no al revés.",
    checkmarks: [
      "Pipeline diseñado para ti",
      "Automatizaciones incluidas",
      "Integración con WhatsApp",
      "Capacitación incluida",
    ],
    iconKey: "grid",
    iconBg: "#DCE9FB",
    iconColor: "#3B6FC4",
  },
  {
    slug: "pagina-web",
    name: "Página web",
    category: "Presencia digital",
    description: "Landing con scroll de una sola página, lista para captar leads.",
    checkmarks: [
      "Diseño y dominio incluidos",
      "Optimizada para leads",
      "Adaptada a móvil",
      "Formulario de contacto",
    ],
    iconKey: "globe",
    iconBg: "#DDF3E4",
    iconColor: "#2F9E5B",
  },
  {
    slug: "video-con-ia",
    name: "Video con IA",
    category: "Contenido",
    description: "Videos de propiedades o marca personal, listos para redes.",
    checkmarks: [
      "Guión y edición incluidos",
      "Listo para redes sociales",
      "Voz e IA de imagen",
      "Entrega en 5 días",
    ],
    iconKey: "play",
    iconBg: "#FDF0D5",
    iconColor: "#C98A1F",
  },
  {
    slug: "presentaciones-ia",
    name: "Presentaciones IA",
    category: "Contenido",
    description: "Presentaciones para clientes o inversionistas, con tu marca.",
    checkmarks: [
      "Diseño con tu marca",
      "Textos e imágenes generados",
      "Formato editable",
      "Entrega en 48 horas",
    ],
    iconKey: "slides",
    iconBg: "#EDE3FB",
    iconColor: "#7C51C9",
  },
  {
    slug: "campanas-con-ia",
    name: "Campañas con IA",
    category: "Marketing",
    description: "Campañas pagadas segmentadas para vender propiedades específicas.",
    checkmarks: [
      "Segmentación por zona",
      "Creativos generados con IA",
      "Reportes de desempeño",
      "Optimización continua",
    ],
    iconKey: "scatter",
    iconBg: "#DDF4F1",
    iconColor: "#1F9C8A",
  },
  {
    slug: "email-marketing-ia",
    name: "Email marketing IA",
    category: "Marketing",
    description: "Secuencias de correo automáticas para dar seguimiento a leads.",
    checkmarks: [
      "Secuencias automatizadas",
      "Copy generado con IA",
      "Segmentación de leads",
      "Métricas de apertura",
    ],
    iconKey: "envelope-frame",
    iconBg: "#FCE1D6",
    iconColor: "#D96B3F",
  },
  {
    slug: "analisis-y-reportes",
    name: "Análisis y reportes",
    category: "Análisis",
    description: "Dashboards a la medida para dar seguimiento a tu negocio.",
    checkmarks: [
      "Dashboard personalizado",
      "Métricas en tiempo real",
      "Reportes automáticos",
      "Integración con tus datos",
    ],
    iconKey: "bars",
    iconBg: "#FDE4EF",
    iconColor: "#C4478E",
  },
  {
    slug: "otros-servicios",
    name: "Otros servicios",
    category: "Bajo pedido",
    description: "¿Tienes algo distinto en mente? Cuéntanos y lo evaluamos contigo.",
    checkmarks: [
      "Diagnóstico inicial gratuito",
      "Propuesta a tu medida",
      "Sin compromiso",
      "Respuesta en 24 horas",
    ],
    iconKey: "dots",
    iconBg: "#F4F5F6",
    iconColor: "#515151",
  },
];

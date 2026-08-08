import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  ...props,
});

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M6 9l6 6 6-6"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 13l4 4L19 7"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSliders(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 7h9M17 7h3M4 17h3M9 17h11"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <circle cx={12} cy={7} r={2.3} strokeWidth={1.6} />
      <circle cx={6} cy={17} r={2.3} strokeWidth={1.6} />
    </svg>
  );
}

export function IconAdjust(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <circle cx={12} cy={12} r={3.5} strokeWidth={1.6} />
    </svg>
  );
}

export function IconGrowthBars(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={4} y={14} width={3.2} height={7} rx={0.8} strokeWidth={1.6} />
      <rect
        x={10.4}
        y={9}
        width={3.2}
        height={12}
        rx={0.8}
        strokeWidth={1.6}
      />
      <rect
        x={16.8}
        y={4}
        width={3.2}
        height={17}
        rx={0.8}
        strokeWidth={1.6}
      />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={12} cy={12} r={9} strokeWidth={1.8} />
      <path
        d="M12 7v5l3.5 2"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPeople(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={9} cy={9} r={3.5} strokeWidth={1.6} />
      <path
        d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path d="M16 9.5a3 3 0 100-6" strokeWidth={1.6} strokeLinecap="round" />
      <path
        d="M18 14c2 .6 3.5 2.6 3.5 6"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={3} y={5} width={18} height={14} rx={2} strokeWidth={1.6} />
      <path
        d="M4 7l8 6 8-6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWhatsapp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 20l1.4-4.2A8 8 0 1112 20a8 8 0 01-4-1.1L4 20z"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M9 10c0 3 2 5 5 5" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx={12} cy={9.5} r={2.4} strokeWidth={1.6} />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={11} cy={11} r={7} strokeWidth={1.8} />
      <path d="M21 21l-4.3-4.3" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

/** Chart / activity icon — SmartComps */
export function IconBarsChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={3} y={12} width={4} height={9} rx={1} strokeWidth={1.6} />
      <rect x={10} y={7} width={4} height={14} rx={1} strokeWidth={1.6} />
      <rect x={17} y={3} width={4} height={18} rx={1} strokeWidth={1.6} />
    </svg>
  );
}

/** Document with lines — Cotizador */
export function IconDocument(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={5} y={3} width={14} height={18} rx={2} strokeWidth={1.6} />
      <path
        d="M8.5 8h7M8.5 12h7M8.5 16h4"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** House on a base — Home Staging */
export function IconHouseBase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 11l8-6 8 6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9h12v-9"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 19v-5h4v5" strokeWidth={1.6} />
    </svg>
  );
}

/** House with a checkmark — Evaluador de Airbnb */
export function IconHouseCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 11l8-6 8 6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9h12v-9"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14l2.5-2.5L14 13l3-3"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Grid / spreadsheet — CRM en Sheets */
export function IconGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={3} y={4} width={18} height={16} rx={2} strokeWidth={1.6} />
      <path d="M3 9h18M9 9v11" strokeWidth={1.6} />
    </svg>
  );
}

/** House on columns — Comparador de Tasas */
export function IconHouseColumns(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M3 10l9-6 9 6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10v9h14v-9"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 13v6M12 13v6M15 13v6" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

/** Globe-ish circle with lines — Página web */
export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={12} cy={12} r={9} strokeWidth={1.6} />
      <path
        d="M8 12h8M8 8.5c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5M8 15.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5"
        strokeWidth={1.4}
      />
    </svg>
  );
}

/** Rect with play triangle — Video con IA */
export function IconPlay(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={4} y={5} width={16} height={12} rx={2} strokeWidth={1.6} />
      <path d="M10 9l5 3-5 3V9z" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M8 20h8" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

/** Rect with a small bar-chart — Presentaciones IA */
export function IconSlides(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={4} y={4} width={16} height={12} rx={2} strokeWidth={1.6} />
      <path d="M9 20h6M12 16v4" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

/** Scatter / campaign reach dots — Campañas con IA */
export function IconScatter(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20V10M12 20V4M20 20v-7" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={4} cy={7} r={1.6} fill="currentColor" stroke="none" />
      <circle cx={12} cy={4} r={1.6} fill="currentColor" stroke="none" />
      <circle cx={20} cy={10} r={1.6} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Envelope inside a rect frame — Email marketing IA */
export function IconEnvelopeFrame(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h16v12H4z" strokeWidth={1.6} />
      <path
        d="M4 7l8 6 8-6"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDots(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={6} cy={12} r={1.6} fill="currentColor" stroke="none" />
      <circle cx={12} cy={12} r={1.6} fill="currentColor" stroke="none" />
      <circle cx={18} cy={12} r={1.6} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 4v11M8 11l4 4 4-4M5 19h14"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M15 4H7a2 2 0 00-2 2v12a2 2 0 002 2h8M18 15l4-3-4-3M22 12H10"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 16V4M8 8l4-4 4 4M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconLayoutGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x={3} y={3} width={8} height={8} rx={1.6} strokeWidth={1.6} />
      <rect x={13} y={3} width={8} height={8} rx={1.6} strokeWidth={1.6} />
      <rect x={3} y={13} width={8} height={8} rx={1.6} strokeWidth={1.6} />
      <rect x={13} y={13} width={8} height={8} rx={1.6} strokeWidth={1.6} />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx={12} cy={8} r={3.5} strokeWidth={1.6} />
      <path
        d="M4.5 20c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCoins(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx={12} cy={6} rx={8} ry={3} strokeWidth={1.6} />
      <path
        d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

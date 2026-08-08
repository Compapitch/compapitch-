import type { ComponentType, SVGProps } from "react";
import {
  IconBarsChart,
  IconDocument,
  IconHouseBase,
  IconHouseCheck,
  IconGrid,
  IconHouseColumns,
  IconGlobe,
  IconPlay,
  IconSlides,
  IconScatter,
  IconEnvelopeFrame,
  IconGrowthBars,
  IconDots,
} from "@/components/ui/icons";

export const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "bars-chart": IconBarsChart,
  document: IconDocument,
  "house-base": IconHouseBase,
  "house-check": IconHouseCheck,
  grid: IconGrid,
  "house-columns": IconHouseColumns,
  globe: IconGlobe,
  play: IconPlay,
  slides: IconSlides,
  scatter: IconScatter,
  "envelope-frame": IconEnvelopeFrame,
  bars: IconGrowthBars,
  dots: IconDots,
};

export function resolveIcon(key: string) {
  return ICON_MAP[key] ?? IconDots;
}

import type { BrandingValue } from "@/components/dashboard/BrandingForm";
import { runSmartComps } from "./adapters/smartcomps";

export type ToolAdapter = (
  input: Record<string, string>,
  branding: BrandingValue | null
) => Promise<string>;

/**
 * The molde: a new active tool needs a row in `tools` (Supabase) plus one
 * entry here pointing at its adapter. Nothing else in the run pipeline
 * changes — charge/refund, branding, form rendering are all generic.
 */
export const TOOL_ADAPTERS: Record<string, ToolAdapter> = {
  smartcomps: runSmartComps,
};

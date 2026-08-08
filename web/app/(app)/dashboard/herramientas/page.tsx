import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CatalogGrid, type CatalogItem } from "@/components/marketing/CatalogGrid";

export const metadata: Metadata = { title: "Herramientas" };

export default async function HubHerramientasPage() {
  const supabase = await createClient();
  const { data: tools } = await supabase
    .from("tools")
    .select("*")
    .order("sort_order");

  const items: CatalogItem[] = (tools ?? []).map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    iconKey: tool.icon_key,
    iconBg: tool.icon_bg,
    iconColor: tool.icon_color,
    checkmarks: tool.checkmarks,
    cta:
      tool.status === "active"
        ? {
            type: "link",
            href: `/dashboard/herramientas/${tool.slug}`,
            label: "Usar",
          }
        : { type: "badge", label: "Próximamente" },
  }));

  return (
    <div className="mx-auto max-w-[1240px] px-8 pb-24 pt-12">
      <div className="mb-10">
        <h1 className="mb-2 text-[32px] font-extrabold tracking-tight">
          Herramientas
        </h1>
        <p className="text-[15px] text-ink-secondary">
          Paga solo en créditos por lo que uses.
        </p>
      </div>

      <CatalogGrid items={items} searchPlaceholder="Buscar herramienta" />
    </div>
  );
}

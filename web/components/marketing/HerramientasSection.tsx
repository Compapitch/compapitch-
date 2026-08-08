import { PillButton } from "@/components/ui/Button";
import { BenefitBar } from "@/components/marketing/BenefitBar";
import { CatalogGrid, type CatalogItem } from "@/components/marketing/CatalogGrid";
import { IconCheck, IconClock, IconGrowthBars } from "@/components/ui/icons";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

export function HerramientasSection({ tools }: { tools: Tool[] }) {
  const items: CatalogItem[] = tools.map((tool) => ({
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
            label: "Ver herramienta",
          }
        : { type: "badge", label: "Próximamente" },
  }));

  return (
    <section id="herramientas" className="mx-auto max-w-[1240px] scroll-mt-8 px-8 py-24">
      <div className="mb-12 max-w-[640px]">
        <h2 className="mb-4 text-[38px] font-extrabold leading-tight tracking-tight">
          Herramientas que impulsan tus ventas
        </h2>
        <p className="text-[17px] leading-relaxed text-ink-secondary">
          Paga solo en créditos por lo que uses. Sin suscripción, sin
          mínimos.
        </p>
      </div>

      <BenefitBar
        items={[
          { icon: IconCheck, label: "Listas para usar" },
          { icon: IconClock, label: "Ahorra tiempo" },
          { icon: IconGrowthBars, label: "Mejores resultados" },
        ]}
      />

      <CatalogGrid items={items} searchPlaceholder="Buscar herramienta" />

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-card bg-ink p-14">
        <div className="max-w-[520px]">
          <h3 className="mb-3 text-[26px] font-extrabold tracking-tight text-white">
            ¿No encuentras lo que necesitas?
          </h3>
          <p className="text-[16px] leading-relaxed text-ink-muted">
            Solicita una herramienta personalizada y la construimos a la
            medida de cómo vendes.
          </p>
        </div>
        <PillButton href="/?topic=Herramienta+personalizada#contacto" variant="light" icon className="flex-shrink-0">
          Solicitar herramienta
        </PillButton>
      </div>
    </section>
  );
}

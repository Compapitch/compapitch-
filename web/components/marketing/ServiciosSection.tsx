import { PillButton } from "@/components/ui/Button";
import { BenefitBar } from "@/components/marketing/BenefitBar";
import { CatalogGrid, type CatalogItem } from "@/components/marketing/CatalogGrid";
import { IconAdjust, IconGrowthBars, IconSliders } from "@/components/ui/icons";
import { SERVICES } from "@/lib/services-catalog";

export function ServiciosSection() {
  const items: CatalogItem[] = SERVICES.map((service) => ({
    slug: service.slug,
    name: service.name,
    description: service.description,
    category: service.category,
    iconKey: service.iconKey,
    iconBg: service.iconBg,
    iconColor: service.iconColor,
    checkmarks: service.checkmarks,
    cta: {
      type: "link",
      href: `/?topic=${encodeURIComponent(service.name)}#contacto`,
      label: "Solicitar servicio",
    },
  }));

  return (
    <section id="servicios" className="mx-auto max-w-[1240px] scroll-mt-8 px-8 py-24">
      <div className="mb-12 max-w-[640px]">
        <h2 className="mb-4 text-[38px] font-extrabold leading-tight tracking-tight">
          Soluciones hechas a la medida de cómo vendes
        </h2>
        <p className="text-[17px] leading-relaxed text-ink-secondary">
          Cuéntanos qué necesitas, te cotizamos por separado. Sin créditos de
          por medio.
        </p>
      </div>

      <BenefitBar
        items={[
          { icon: IconSliders, label: "Hechos a la medida" },
          { icon: IconAdjust, label: "Flexibilidad total" },
          { icon: IconGrowthBars, label: "Resultados reales" },
        ]}
      />

      <CatalogGrid items={items} searchPlaceholder="Buscar servicio" />

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-card bg-ink p-14">
        <div className="max-w-[560px]">
          <h3 className="mb-3 text-[26px] font-extrabold tracking-tight text-white">
            ¿Tienes un proyecto en mente?
          </h3>
          <p className="text-[16px] leading-relaxed text-ink-muted">
            Cuéntanos qué necesitas y diseñamos la solución perfecta para
            cómo vendes.
          </p>
        </div>
        <PillButton href="/?topic=Hablar+con+un+asesor#contacto" variant="accent" icon className="flex-shrink-0">
          Hablar con un asesor
        </PillButton>
      </div>
    </section>
  );
}

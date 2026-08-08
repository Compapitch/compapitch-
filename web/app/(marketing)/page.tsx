import { createClient } from "@/lib/supabase/server";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { PillButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Breadcrumb";
import { HerramientasSection } from "@/components/marketing/HerramientasSection";
import { ServiciosSection } from "@/components/marketing/ServiciosSection";
import { NosotrosSection } from "@/components/marketing/NosotrosSection";
import { ContactoSection } from "@/components/marketing/ContactoSection";
import {
  IconBolt,
  IconSliders,
  IconAdjust,
  IconGrowthBars,
} from "@/components/ui/icons";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: tools } = await supabase
    .from("tools")
    .select("*")
    .order("sort_order");

  return (
    <>
      {/* HERO */}
      <section className="relative mb-14 h-[600px] w-full overflow-hidden">
        <PhotoPlaceholder
          label="Foto de Rodrigo — luz natural, fondo claro"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.82)_0%,rgba(16,16,16,0.55)_42%,rgba(16,16,16,0.05)_70%)]" />
        <div className="relative mx-auto flex h-full max-w-[1240px] items-center px-8">
          <div className="max-w-[560px]">
            <span className="mb-4 block text-[13px] font-bold uppercase tracking-wide text-accent-light">
              Inteligencia artificial para brokers
            </span>
            <h1 className="mb-6 text-[52px] font-extrabold leading-[1.1] tracking-tight text-white">
              Pon la IA
              <br />
              a trabajar por
              <br />
              tus ventas.
            </h1>
            <p className="mb-8 max-w-[440px] text-[18px] leading-relaxed text-border">
              Regístrate gratis, recibe 80 créditos de bienvenida y usa
              herramientas listas o pide una solución hecha a la medida de tu
              negocio.
            </p>
            <PillButton href="/registro" variant="accent" icon>
              Empezar ahora
            </PillButton>
          </div>
        </div>
      </section>

      {/* TARJETA DOS COLUMNAS */}
      <section className="mx-auto max-w-[1240px] px-8 pb-24">
        <div className="grid grid-cols-1 gap-14 rounded-card border border-border bg-surface p-14 md:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-bg">
              <IconBolt width={24} height={24} className="text-ink" />
            </span>
            <Eyebrow>Herramientas</Eyebrow>
            <h3 className="mb-3.5 text-[26px] font-extrabold tracking-tight">
              Herramientas listas para usar
            </h3>
            <p className="mb-7 max-w-[400px] text-[16px] leading-relaxed text-ink-secondary">
              SmartComps, cotizador, home staging y más. Paga solo en
              créditos por lo que uses.
            </p>
            <PillButton href="#herramientas" variant="dark" size="sm" icon>
              Ver herramientas
            </PillButton>
          </div>
          <div className="border-border pt-0 md:border-l md:pl-14">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-bg">
              <IconSliders width={24} height={24} className="text-ink" />
            </span>
            <Eyebrow>Servicios</Eyebrow>
            <h3 className="mb-3.5 text-[26px] font-extrabold tracking-tight">
              Soluciones personalizadas
            </h3>
            <p className="mb-7 max-w-[400px] text-[16px] leading-relaxed text-ink-secondary">
              CRM a la medida, video con IA, páginas web y más. Se cotiza
              aparte, según cómo vendes.
            </p>
            <PillButton href="#servicios" variant="dark" size="sm" icon>
              Ver servicios
            </PillButton>
          </div>
        </div>
      </section>

      {/* LO QUE HACEMOS */}
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-8 pb-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between pb-12">
          <div>
            <Eyebrow>Lo que hacemos</Eyebrow>
            <h2 className="mb-8 text-[36px] font-extrabold leading-[1.15] tracking-tight">
              IA aplicada a tus ventas.
            </h2>
            <div className="flex flex-col gap-6">
              <Feature
                icon={<IconAdjust width={20} height={20} className="mt-0.5 flex-shrink-0 text-accent" />}
                title="Herramientas prácticas"
                body="Listas para usar, sin complicaciones."
              />
              <Feature
                icon={<IconSliders width={20} height={20} className="mt-0.5 flex-shrink-0 text-accent" strokeWidth={1.6} />}
                title="Soluciones personalizadas"
                body="Diseñadas alrededor de cómo vendes."
              />
              <Feature
                icon={<IconGrowthBars width={20} height={20} className="mt-0.5 flex-shrink-0 text-accent" />}
                title="Resultados reales"
                body="Más velocidad, menos trabajo manual."
              />
            </div>
          </div>
          <PillButton href="#nosotros" variant="dark" size="sm" icon className="self-start">
            Conocer más
          </PillButton>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-card">
          <PhotoPlaceholder
            label="Foto de trabajo / setup"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,16,0.55)_0%,rgba(16,16,16,0.78)_60%,rgba(16,16,16,0.92)_100%)]" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <div>
              <span className="mb-3.5 block text-[13px] font-bold uppercase tracking-wide text-accent-light">
                Trabajemos juntos
              </span>
              <h3 className="mb-4 text-[28px] font-extrabold leading-tight tracking-tight text-white">
                Hagamos que la IA trabaje por tus clientes.
              </h3>
              <p className="max-w-[440px] text-[16px] leading-relaxed text-border">
                Ya sea con una herramienta lista para usar o una solución a
                la medida, te ayudo a encontrar la mejor forma de aplicar IA
                en lo que haces.
              </p>
            </div>
            <PillButton href="#contacto" variant="light" size="sm" icon className="self-start">
              Hablemos
            </PillButton>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="mx-auto max-w-[1240px] px-8 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-card border border-border bg-surface p-9 px-12">
          <div className="max-w-[600px]">
            <Eyebrow>Por qué ahora</Eyebrow>
            <h3 className="text-[22px] font-bold leading-relaxed">
              El 68% de los brokers inmobiliarios ya usa IA en su día a día.
              Los que no se suben, se quedan atrás.
            </h3>
          </div>
          <div className="flex flex-shrink-0 items-center gap-6">
            <div
              className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#6B7A90 0% 68%, #DCE3EC 68% 100%)",
              }}
            >
              <div className="h-[72px] w-[72px] rounded-full bg-surface" />
            </div>
            <div>
              <span className="block text-[52px] font-extrabold leading-none tracking-tight">
                68%
              </span>
              <span className="mt-2 block text-[14px] font-semibold text-ink-muted">
                de brokers inmobiliarios
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="divide-y divide-border">
        <HerramientasSection tools={tools ?? []} />
        <ServiciosSection />
        <NosotrosSection />
        <ContactoSection />
      </div>
    </>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      {icon}
      <div>
        <h4 className="mb-1 text-[17px] font-bold">{title}</h4>
        <p className="text-[15px] leading-snug text-ink-secondary">{body}</p>
      </div>
    </div>
  );
}

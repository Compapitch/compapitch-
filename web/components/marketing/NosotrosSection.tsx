import { PillButton } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { IconCheck, IconGrowthBars, IconSliders } from "@/components/ui/icons";

export function NosotrosSection() {
  return (
    <section id="nosotros" className="scroll-mt-8 py-24">
      <div className="relative mb-24 h-[560px] w-full overflow-hidden">
        <PhotoPlaceholder
          label="Foto de Rodrigo — luz natural, fondo claro"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.82)_0%,rgba(16,16,16,0.55)_42%,rgba(16,16,16,0.05)_70%)]" />
        <div className="relative flex h-full items-center px-8">
          <div className="mx-auto w-full max-w-[1240px]">
            <div className="max-w-[560px]">
              <span className="mb-4 block text-[13px] font-bold uppercase tracking-wide text-accent-light">
                Nosotros
              </span>
              <h2 className="mb-5 text-[42px] font-extrabold leading-[1.15] tracking-tight text-white">
                Hecho por un broker, para brokers.
              </h2>
              <p className="text-[17px] leading-relaxed text-border">
                Soy Rodrigo. Vendí propiedades antes de construir herramientas
                para vender propiedades. El Compapitch nació de lo que a mí
                me hubiera servido tener desde el primer día.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-8">
        {/* HISTORIA */}
        <div className="mb-24 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-3.5 block text-[13px] font-bold uppercase tracking-wide text-accent">
              Nuestra historia
            </span>
            <h3 className="mb-6 text-[30px] font-extrabold leading-tight tracking-tight">
              Por qué existe El Compapitch
            </h3>
            <div className="flex flex-col gap-5">
              <p className="text-[16px] leading-loose text-ink-secondary">
                Empecé como broker independiente, compitiendo contra agencias
                con equipos completos de diseño, análisis y marketing. Cada
                cotización, cada comparable, cada presentación me tomaba
                horas que ellos resolvían con un clic.
              </p>
              <p className="text-[16px] leading-loose text-ink-secondary">
                Con el tiempo aprendí a usar IA para hacer ese trabajo en
                minutos. Y noté que la mayoría de los brokers nuevos —los que
                más lo necesitan— no tienen ni el tiempo ni el conocimiento
                técnico para llegar ahí solos.
              </p>
              <p className="text-[16px] leading-loose text-ink-secondary">
                El Compapitch es esa brecha resuelta: herramientas listas
                para usar, sin necesidad de entender de IA, para que
                cualquier broker compita de tú a tú con las agencias más
                grandes.
              </p>
            </div>
          </div>
          <PhotoPlaceholder
            label="Foto de Rodrigo — detrás de cámaras / escritorio de trabajo"
            className="min-w-0 h-[440px] w-full rounded-image"
          />
        </div>

        {/* COMO TRABAJAMOS */}
        <div className="mb-20">
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <span className="mb-3.5 block text-[13px] font-bold uppercase tracking-wide text-accent">
              Cómo trabajamos
            </span>
            <h3 className="text-[30px] font-extrabold tracking-tight">
              En qué creemos
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ValueCard
              icon={<IconCheck width={24} height={24} className="text-white" strokeWidth={2} />}
              title="Herramientas reales, no promesas"
              body='Cada herramienta funciona desde el primer uso. Sin demos falsas, sin "próximamente" eterno.'
            />
            <ValueCard
              icon={<IconSliders width={24} height={24} className="text-white" strokeWidth={1.8} />}
              title="Sin complicaciones técnicas"
              body="No necesitas saber de IA. Llenas un formulario y listo."
            />
            <ValueCard
              icon={<IconGrowthBars width={24} height={24} className="text-white" />}
              title="Resultados que se notan"
              body="Menos tiempo en tareas operativas, más tiempo cerrando ventas."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-card bg-ink px-16 py-16 text-center">
          <h3 className="mb-4 text-[32px] font-extrabold tracking-tight text-white">
            ¿Listo para empezar?
          </h3>
          <p className="mb-8 text-[17px] text-ink-muted">
            80 créditos de bienvenida. Sin tarjeta.
          </p>
          <PillButton href="/registro" variant="accent" size="md">
            Únete gratis
          </PillButton>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-card border border-border bg-surface p-8">
      <span className="mb-5 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-ink">
        {icon}
      </span>
      <h4 className="mb-2.5 text-[18px] font-bold">{title}</h4>
      <p className="text-[15px] leading-relaxed text-ink-secondary">{body}</p>
    </div>
  );
}

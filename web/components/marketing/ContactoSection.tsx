import { Suspense } from "react";
import { Faq } from "@/components/ui/Faq";
import {
  IconClock,
  IconMail,
  IconPin,
  IconShield,
  IconWhatsapp,
} from "@/components/ui/icons";
import { ContactoForm } from "./ContactoForm";

export function ContactoSection() {
  return (
    <section id="contacto" className="mx-auto max-w-[1240px] scroll-mt-8 px-8 py-24">
      {/* HERO */}
      <div className="mb-14 max-w-[520px]">
        <h2 className="mb-4 text-[40px] font-extrabold leading-[1.15] tracking-tight text-ink">
          Hablemos de tus ventas.
        </h2>
        <p className="text-[17px] leading-relaxed text-ink-secondary">
          Cuéntanos qué necesitas — te respondemos en menos de 24 horas.
        </p>
      </div>

      {/* BENEFICIOS */}
      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <ContactBenefit icon={IconClock} label="Respuesta rápida" />
        <ContactBenefit icon={IconShield} label="Información segura" />
        <ContactBenefit icon={IconWhatsapp} label="Atención personalizada" />
      </div>

      {/* FORMULARIO + CONTACTO DIRECTO */}
      <div className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <Suspense fallback={null}>
          <ContactoForm />
        </Suspense>

        <div className="flex flex-col gap-4">
          <DirectContact
            icon={IconMail}
            label="Correo"
            value="hola@compapitch.com"
            href="mailto:hola@compapitch.com"
          />
          <DirectContact
            icon={IconWhatsapp}
            label="WhatsApp"
            value="+52 33 1234 5678"
            href="https://wa.me/523312345678"
          />
          <DirectContact
            icon={IconClock}
            label="Agendar llamada"
            value="30 minutos, sin costo"
            href="#"
          />
          <DirectContact
            icon={IconPin}
            label="Ubicación"
            value="Guadalajara, Jalisco"
          />
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <h3 className="text-[30px] font-extrabold tracking-tight">
            Preguntas frecuentes
          </h3>
        </div>
        <Faq
          items={[
            {
              question: "¿Cómo funcionan los créditos?",
              answer:
                "Cada herramienta tiene un costo fijo en créditos que se cobra al generar el resultado. Recibes 80 créditos gratis al registrarte y puedes comprar más cuando los necesites.",
            },
            {
              question: "¿Cuánto tardan los servicios personalizados?",
              answer:
                "Depende del servicio — desde 48 horas para una presentación hasta 2-3 semanas para un CRM a la medida. Te damos un tiempo estimado exacto al cotizar.",
            },
            {
              question: "¿Necesito saber de IA para usar las herramientas?",
              answer:
                "No. Llenas un formulario simple y la herramienta hace el trabajo. No necesitas conocimiento técnico de ningún tipo.",
            },
          ]}
        />
      </div>

      {/* CIERRE */}
      <div className="mx-auto flex max-w-[760px] flex-wrap items-center justify-between gap-6 rounded-card bg-ink px-14 py-12">
        <div>
          <h3 className="mb-1.5 text-[20px] font-bold text-white">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-[15px] text-ink-muted">
            Escríbenos y te respondemos directamente.
          </p>
        </div>
        <a
          href="mailto:hola@compapitch.com"
          className="flex-shrink-0 rounded-pill bg-accent px-7 py-3.5 text-[15px] font-bold text-white hover:bg-accent-hover"
        >
          Escríbenos
        </a>
      </div>
    </section>
  );
}

function ContactBenefit({
  icon: Icon,
  label,
}: {
  icon: typeof IconClock;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-[24px] border border-border bg-surface px-6 py-5">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-ink">
        <Icon width={20} height={20} className="text-white" />
      </span>
      <span className="text-[15px] font-bold text-ink">{label}</span>
    </div>
  );
}

function DirectContact({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof IconClock;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-ink">
        <Icon width={22} height={22} className="text-white" />
      </span>
      <div>
        <span className="block text-[15px] font-bold text-ink">{label}</span>
        <span className="block text-[14px] text-ink-secondary">{value}</span>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-[24px] border border-border bg-surface p-6";

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

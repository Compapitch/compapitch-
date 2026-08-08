import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/images/logo-compapitch.png"
            alt="compapitch!"
            width={120}
            height={22}
            className="mb-4 h-[22px] w-auto invert"
          />
          <p className="max-w-[260px] text-[14px] leading-relaxed text-ink-muted">
            Inteligencia artificial aplicada a bienes raíces.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="mb-1 text-[13px] font-bold uppercase tracking-wide text-white">
            Navegación
          </span>
          <FooterLink href="#herramientas">Herramientas</FooterLink>
          <FooterLink href="#contacto">Contacto</FooterLink>
          <FooterLink href="/dashboard">Mi dashboard</FooterLink>
        </div>

        <div className="flex flex-col gap-3">
          <span className="mb-1 text-[13px] font-bold uppercase tracking-wide text-white">
            Recursos
          </span>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Tutoriales</FooterLink>
          <FooterLink href="#">Guías</FooterLink>
          <FooterLink href="#">Casos de uso</FooterLink>
        </div>

        <div>
          <span className="mb-3 block text-[13px] font-bold uppercase tracking-wide text-white">
            Newsletter
          </span>
          <p className="mb-4 text-[14px] leading-snug text-ink-muted">
            Tips y novedades de IA para brokers.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Tu correo"
              className="min-w-0 flex-1 rounded-input border border-[#333] bg-[#1A1A1A] px-4 py-3 text-[14px] text-white placeholder:text-ink-muted"
            />
            <button
              type="submit"
              className="rounded-pill bg-white px-5 py-3 text-[14px] font-bold text-ink hover:bg-accent-light"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-[#2A2A2A] px-8 py-6">
        <div className="flex gap-5">
          <FooterLink href="#">Aviso de privacidad</FooterLink>
          <FooterLink href="#">Términos y condiciones</FooterLink>
        </div>
        <div className="flex gap-5">
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">TikTok</FooterLink>
          <FooterLink href="#">YouTube</FooterLink>
          <FooterLink href="#">LinkedIn</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="text-[13px] text-ink-muted hover:text-white">
      {children}
    </a>
  );
}

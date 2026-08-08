import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Herramientas", href: "#herramientas" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-y-4 px-8 py-7">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/images/logo-compapitch.png"
          alt="compapitch!"
          width={140}
          height={26}
          className="h-[26px] w-auto"
          priority
        />
      </Link>
      <nav className="flex flex-wrap items-center gap-7">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-[15px] font-semibold text-ink hover:text-accent"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/iniciar-sesion"
          className="whitespace-nowrap text-[15px] font-semibold text-ink-secondary hover:text-ink"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/dashboard"
          className="whitespace-nowrap rounded-pill bg-ink px-6 py-3 text-[15px] font-bold text-white hover:bg-ink/90"
        >
          Mi dashboard
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-[14px] text-ink-muted">/</span>}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[14px] font-semibold text-ink-muted hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-[14px] font-semibold ${
                  isLast ? "text-ink" : "text-ink-muted"
                }`}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mb-3.5 block text-[13px] font-bold uppercase tracking-wide text-accent ${className}`}
    >
      {children}
    </span>
  );
}

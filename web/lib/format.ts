export function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Hoy, ${time}`;
  if (diffDays === 1) return `Ayer, ${time}`;
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
}

export function formatMXN(cents: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

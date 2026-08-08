import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-card border border-border bg-surface ${className}`}
      {...props}
    />
  );
}

export function IconTile({
  color,
  size = 52,
  children,
}: {
  color: string;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center rounded-2xl"
      style={{ width: size, height: size, background: color }}
    >
      {children}
    </span>
  );
}

export function Badge({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3.5 py-1.5 text-[13px] font-bold ${className}`}
    >
      {children}
    </span>
  );
}

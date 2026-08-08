import type { ComponentType, SVGProps } from "react";

type Benefit = { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string };

export function BenefitBar({
  items,
  variant = "plain",
}: {
  items: Benefit[];
  variant?: "plain" | "tile";
}) {
  return (
    <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3.5 rounded-[24px] border border-border bg-surface px-6 py-5"
        >
          {variant === "tile" ? (
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-ink">
              <Icon width={20} height={20} className="text-white" />
            </span>
          ) : (
            <Icon width={24} height={24} className="flex-shrink-0 text-accent" />
          )}
          <span className="text-[15px] font-bold text-ink">{label}</span>
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
import { resolveIcon } from "@/lib/icon-map";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";

export type CatalogCardCta =
  | { type: "link"; href: string; label: string }
  | { type: "badge"; label: string };

export function CatalogCard({
  iconKey,
  iconBg,
  iconColor,
  name,
  category,
  description,
  checkmarks,
  cta,
}: {
  iconKey: string;
  iconBg: string;
  iconColor: string;
  name: string;
  category: string;
  description: string;
  checkmarks: string[];
  cta: CatalogCardCta;
}) {
  const Icon = resolveIcon(iconKey);

  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-surface p-8">
      <span
        className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl"
        style={{ background: iconBg }}
      >
        <Icon width={24} height={24} style={{ color: iconColor }} />
      </span>
      <div>
        <h3 className="mb-1 text-[20px] font-bold">{name}</h3>
        <span className="text-[13px] font-bold" style={{ color: iconColor }}>
          {category}
        </span>
      </div>
      <p className="text-[15px] leading-snug text-ink-secondary">
        {description}
      </p>
      <div className="flex flex-1 flex-col gap-2.5">
        {checkmarks.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 text-[14px] text-ink-secondary"
          >
            <IconCheck
              width={14}
              height={14}
              style={{ color: iconColor }}
              className="flex-shrink-0"
            />
            {item}
          </span>
        ))}
      </div>
      {cta.type === "link" ? (
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-ink px-5 py-3 text-[14px] font-bold text-white hover:bg-ink/90"
        >
          {cta.label}
          <IconArrowRight width={14} height={14} strokeWidth={2} />
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center rounded-pill bg-border px-5 py-3 text-[14px] font-bold text-ink-muted">
          {cta.label}
        </span>
      )}
    </div>
  );
}

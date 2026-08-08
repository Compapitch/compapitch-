import Link from "next/link";
import { resolveIcon } from "@/lib/icon-map";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

export function QuickAccessCard({ tool }: { tool: Tool }) {
  const Icon = resolveIcon(tool.icon_key);
  const isActive = tool.status === "active";

  const inner = (
    <>
      <span
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: isActive ? tool.icon_bg : "#E8EAEC" }}
      >
        <Icon
          width={20}
          height={20}
          style={{ color: isActive ? tool.icon_color : "#8B8F95" }}
        />
      </span>
      {isActive ? (
        <span className="text-[14px] font-bold text-ink">{tool.name}</span>
      ) : (
        <div>
          <span className="mb-1.5 block text-[14px] font-bold text-ink">
            {tool.name}
          </span>
          <span className="inline-block rounded-pill bg-border px-2.5 py-1 text-[12px] font-bold text-ink-muted">
            Próximamente
          </span>
        </div>
      )}
    </>
  );

  const className =
    "flex min-w-0 flex-col gap-3.5 rounded-card border border-border bg-surface p-5";

  return isActive ? (
    <Link href={`/dashboard/herramientas/${tool.slug}`} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={`${className} opacity-55`}>{inner}</div>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { resolveIcon } from "@/lib/icon-map";
import { ToolRunner } from "./ToolRunner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: tool }, { data: branding }] = await Promise.all([
    supabase.from("tools").select("*").eq("slug", slug).single(),
    user
      ? supabase
          .from("broker_branding")
          .select("logo_url, brand_color, contact_whatsapp")
          .eq("profile_id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  if (!tool) notFound();

  const Icon = resolveIcon(tool.icon_key);

  return (
    <div className="mx-auto max-w-[760px] px-8 pb-24 pt-12">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Herramientas", href: "/dashboard/herramientas" },
          { label: tool.name },
        ]}
      />

      <div className="mb-10 flex items-center gap-4">
        <span
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ background: tool.icon_bg }}
        >
          <Icon width={26} height={26} style={{ color: tool.icon_color }} />
        </span>
        <div>
          <h1 className="mb-1 text-[28px] font-extrabold tracking-tight">
            {tool.name}
          </h1>
          <p className="text-[15px] text-ink-secondary">{tool.description}</p>
        </div>
      </div>

      {tool.status === "active" ? (
        <ToolRunner
          tool={tool}
          initialBranding={
            branding
              ? {
                  logoUrl: branding.logo_url,
                  brandColor: branding.brand_color,
                  contactWhatsapp: branding.contact_whatsapp,
                }
              : null
          }
        />
      ) : (
        <div className="rounded-card border border-border bg-surface p-10 text-center">
          <span className="mb-3 inline-block rounded-pill bg-border px-4 py-1.5 text-[13px] font-bold text-ink-muted">
            Próximamente
          </span>
          <p className="text-[15px] text-ink-secondary">
            Estamos construyendo esta herramienta. Mientras tanto, prueba{" "}
            <a href="/dashboard/herramientas/smartcomps" className="font-semibold text-accent">
              SmartComps
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

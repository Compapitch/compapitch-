import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PillButton } from "@/components/ui/Button";
import { resolveIcon } from "@/lib/icon-map";
import { formatRelativeDate } from "@/lib/format";
import { MiCuentaBranding } from "./MiCuentaBranding";

export const metadata: Metadata = { title: "Mi cuenta" };

export default async function MiCuentaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: branding }, { data: runs }, { data: tools }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("broker_branding")
        .select("logo_url, brand_color, contact_whatsapp")
        .eq("profile_id", user.id)
        .maybeSingle(),
      supabase
        .from("tool_runs")
        .select("id, tool_slug, status, credits_charged, created_at")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase.from("tools").select("slug, name, icon_key, icon_bg, icon_color"),
    ]);

  const toolBySlug = new Map((tools ?? []).map((t) => [t.slug, t]));

  return (
    <div className="mx-auto max-w-[860px] px-8 pb-24 pt-12">
      <h1 className="mb-2 text-[32px] font-extrabold tracking-tight">
        Mi cuenta
      </h1>
      <p className="mb-10 text-[15px] text-ink-secondary">
        {profile?.full_name} · {profile?.email}
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-[18px] font-bold">Tu marca</h2>
        <MiCuentaBranding
          initial={
            branding
              ? {
                  logoUrl: branding.logo_url,
                  brandColor: branding.brand_color,
                  contactWhatsapp: branding.contact_whatsapp,
                }
              : null
          }
        />
      </section>

      <section className="mb-10 flex items-center justify-between gap-6 rounded-card bg-ink p-9">
        <div>
          <h3 className="mb-1.5 text-[18px] font-bold text-white">
            ¿Necesitas más créditos?
          </h3>
          <p className="text-[14px] text-ink-muted">
            Compra un paquete y síguele sin interrupciones.
          </p>
        </div>
        <PillButton href="/dashboard/creditos" variant="accent" icon className="flex-shrink-0">
          Comprar créditos
        </PillButton>
      </section>

      <section>
        <h2 className="mb-4 text-[18px] font-bold">Historial de uso</h2>
        <div className="rounded-card border border-border bg-surface p-8">
          {runs && runs.length > 0 ? (
            <div className="flex flex-col">
              {runs.map((run, i) => {
                const tool = toolBySlug.get(run.tool_slug);
                const Icon = resolveIcon(tool?.icon_key ?? "dots");
                const isRefunded = run.status === "refunded";
                return (
                  <div
                    key={run.id}
                    className={`flex items-center justify-between gap-3 py-3.5 ${
                      i < runs.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: tool?.icon_bg ?? "#DCE3EC" }}
                      >
                        <Icon
                          width={18}
                          height={18}
                          style={{ color: tool?.icon_color ?? "#55657C" }}
                        />
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate text-[15px] font-semibold text-ink">
                          {tool?.name ?? run.tool_slug}
                        </span>
                        <span className="block text-[13px] text-ink-muted">
                          {formatRelativeDate(run.created_at)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 text-[14px] font-bold ${
                        isRefunded ? "text-accent-hover" : "text-ink-secondary"
                      }`}
                    >
                      {isRefunded
                        ? `+${run.credits_charged} reembolsados`
                        : `-${run.credits_charged} créditos`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[15px] text-ink-muted">
              Todavía no usas ninguna herramienta.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

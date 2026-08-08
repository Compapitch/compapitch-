import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PillButton } from "@/components/ui/Button";
import { QuickAccessCard } from "@/components/dashboard/QuickAccessCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { resolveIcon } from "@/lib/icon-map";
import { formatRelativeDate } from "@/lib/format";

export const metadata: Metadata = { title: "Mi dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [
    { data: balance },
    { data: welcomeGrant },
    { data: purchases },
    { data: recentRuns },
    { data: tools },
    { data: usageRuns },
  ] = await Promise.all([
    supabase.rpc("get_credit_balance"),
    supabase
      .from("credit_ledger")
      .select("amount")
      .eq("profile_id", user.id)
      .eq("type", "welcome_grant")
      .maybeSingle(),
    supabase
      .from("credit_ledger")
      .select("id")
      .eq("profile_id", user.id)
      .eq("type", "purchase")
      .limit(1),
    supabase
      .from("tool_runs")
      .select("id, tool_slug, status, credits_charged, created_at")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase.from("tools").select("*").order("sort_order"),
    supabase
      .from("tool_runs")
      .select("tool_slug, status, credits_charged, created_at")
      .eq("profile_id", user.id)
      .eq("status", "success")
      .gte("created_at", thirtyDaysAgo),
  ]);

  const toolBySlug = new Map((tools ?? []).map((t) => [t.slug, t]));
  const creditBalance = balance ?? 0;
  const welcomeAmount = welcomeGrant?.amount ?? 80;
  const hasPurchased = (purchases?.length ?? 0) > 0;
  const progressPct = Math.min((creditBalance / welcomeAmount) * 100, 100);

  // Usage chart aggregation
  const weeklyTotals = [0, 0, 0, 0];
  const perTool = new Map<string, number>();
  let totalCredits = 0;
  for (const run of usageRuns ?? []) {
    const daysAgo = Math.floor(
      (Date.now() - new Date(run.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.min(3, Math.floor(daysAgo / 7));
    const bucket = 3 - weekIndex; // oldest week first, left-to-right
    weeklyTotals[bucket] += run.credits_charged;
    perTool.set(
      run.tool_slug,
      (perTool.get(run.tool_slug) ?? 0) + run.credits_charged
    );
    totalCredits += run.credits_charged;
  }
  const breakdown = Array.from(perTool.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([slug, credits]) => ({
      name: toolBySlug.get(slug)?.name ?? slug,
      pct: totalCredits > 0 ? Math.round((credits / totalCredits) * 100) : 0,
    }));

  return (
    <div className="mx-auto max-w-[1240px] px-8 pb-24 pt-2">
      {/* CREDITOS + ACTIVIDAD */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-w-0 flex-col justify-between rounded-card bg-accent p-10">
          <div>
            <span className="mb-4 block text-[13px] font-bold uppercase tracking-wide text-accent-light">
              Créditos disponibles
            </span>
            <span className="mb-6 block text-[56px] font-extrabold leading-none tracking-tight text-white">
              {creditBalance}
            </span>
            <div className="mb-2.5 h-2 w-full overflow-hidden rounded-pill bg-white/25">
              <div
                className="h-full rounded-pill bg-white"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[13px] text-accent-light">
              {hasPurchased
                ? `${creditBalance} créditos disponibles`
                : `${creditBalance} de ${welcomeAmount} créditos de bienvenida`}
            </span>
          </div>
          <PillButton
            href="/dashboard/creditos"
            variant="light"
            size="sm"
            icon
            className="mt-7 self-start"
          >
            Comprar créditos
          </PillButton>
        </div>

        <div className="min-w-0 rounded-card border border-border bg-surface p-9">
          <h3 className="mb-5 text-[18px] font-bold">Actividad reciente</h3>
          {recentRuns && recentRuns.length > 0 ? (
            <div className="flex flex-col">
              {recentRuns.map((run, i) => {
                const tool = toolBySlug.get(run.tool_slug);
                const Icon = resolveIcon(tool?.icon_key ?? "dots");
                const isRefunded = run.status === "refunded";
                return (
                  <div
                    key={run.id}
                    className={`flex items-center justify-between gap-3 py-3.5 ${
                      i < recentRuns.length - 1 ? "border-b border-border" : ""
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
            <p className="py-6 text-[15px] text-ink-muted">
              Todavía no usas ninguna herramienta — tu actividad va a
              aparecer aquí.
            </p>
          )}
        </div>
      </div>

      {/* ACCESO RAPIDO */}
      <div className="mb-6">
        <h3 className="mb-4 text-[18px] font-bold">
          Acceso rápido a herramientas
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tools?.map((tool) => (
            <QuickAccessCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>

      {/* GRAFICA DE USO */}
      <UsageChart
        totalCredits={totalCredits}
        weeklyTotals={weeklyTotals}
        breakdown={breakdown}
      />
    </div>
  );
}

export function UsageChart({
  totalCredits,
  weeklyTotals,
  breakdown,
}: {
  totalCredits: number;
  weeklyTotals: number[];
  breakdown: { name: string; pct: number }[];
}) {
  const maxWeek = Math.max(...weeklyTotals, 1);

  return (
    <div className="rounded-card border border-border bg-surface p-9">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[18px] font-bold">Uso de los últimos 30 días</h3>
        <span className="text-[13px] font-semibold text-ink-muted">
          {totalCredits} créditos gastados en total
        </span>
      </div>

      {totalCredits === 0 ? (
        <p className="py-10 text-center text-[15px] text-ink-muted">
          Genera tu primer reporte para ver tu actividad aquí.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex h-40 items-end gap-3 border-b border-border">
              {weeklyTotals.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg bg-accent-light"
                  style={{
                    height: `${Math.max((value / maxWeek) * 100, 4)}%`,
                    background: i === weeklyTotals.length - 1 ? "#6B7A90" : undefined,
                  }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex justify-between">
              {weeklyTotals.map((_, i) => (
                <span key={i} className="text-[12px] text-ink-muted">
                  Semana {i + 1}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-4 block text-[13px] font-bold text-ink">
              Herramienta más usada
            </span>
            <div className="flex flex-col gap-3.5">
              {breakdown.map((item) => (
                <div key={item.name}>
                  <div className="mb-1.5 flex justify-between">
                    <span className="text-[14px] font-semibold">
                      {item.name}
                    </span>
                    <span className="text-[14px] text-ink-muted">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-pill bg-bg">
                    <div
                      className="h-full rounded-pill bg-accent"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

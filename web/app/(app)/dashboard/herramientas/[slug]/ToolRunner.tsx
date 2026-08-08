"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { PillButton } from "@/components/ui/Button";
import { BrandingForm, type BrandingValue } from "@/components/dashboard/BrandingForm";
import type { Database, ToolFormField } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

type RunState =
  | { phase: "form" }
  | { phase: "branding" }
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "success"; output: string };

export function ToolRunner({
  tool,
  initialBranding,
}: {
  tool: Tool;
  initialBranding: BrandingValue | null;
}) {
  const router = useRouter();
  const [branding, setBranding] = useState<BrandingValue | null>(initialBranding);
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, setState] = useState<RunState>({ phase: "form" });

  const fields = tool.form_schema as ToolFormField[];

  function setField(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function runTool() {
    setState({ phase: "loading" });

    try {
      const res = await fetch(`/api/tools/${tool.slug}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: values }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState({
          phase: "error",
          message: data.error ?? "No se pudo generar tu reporte.",
        });
        return;
      }

      setState({ phase: "success", output: data.output as string });
      router.refresh();
    } catch {
      setState({
        phase: "error",
        message:
          "No se pudo generar tu reporte, tus créditos fueron reembolsados.",
      });
    }
  }

  function handleGenerateClick() {
    if (!branding) {
      setState({ phase: "branding" });
      return;
    }
    runTool();
  }

  if (state.phase === "branding") {
    return (
      <BrandingForm
        initial={branding}
        onSaved={(value) => {
          setBranding(value);
          setState({ phase: "form" });
          runTool();
        }}
      />
    );
  }

  return (
    <>
      <div className="mb-6 rounded-card border border-border bg-surface p-10">
        <div className="mb-8 flex flex-col gap-5">
          {fields.map((field) =>
            field.type === "select" ? (
              <SelectField
                key={field.key}
                label={field.label}
                required={field.required}
                value={values[field.key] ?? ""}
                onChange={(e) => setField(field.key, e.target.value)}
                options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
              />
            ) : field.type === "textarea" ? (
              <TextAreaField
                key={field.key}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                value={values[field.key] ?? ""}
                onChange={(e) => setField(field.key, e.target.value)}
              />
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.key] ?? ""}
                onChange={(e) => setField(field.key, e.target.value)}
              />
            )
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div>
            <span className="mb-1 block text-[13px] text-ink-muted">
              Costo por reporte
            </span>
            <span className="inline-flex items-center rounded-pill bg-accent-light px-3.5 py-1.5 text-[14px] font-bold text-accent-hover">
              {tool.cost_credits} créditos
            </span>
          </div>
          <PillButton
            type="button"
            variant="accent"
            icon
            onClick={handleGenerateClick}
            disabled={state.phase === "loading"}
          >
            {state.phase === "loading" ? "Generando…" : "Generar reporte"}
          </PillButton>
        </div>
        <p className="mt-3.5 text-right text-[13px] text-ink-muted">
          Se descuentan {tool.cost_credits} créditos al generar el reporte.
        </p>
      </div>

      {state.phase === "error" && (
        <p className="mb-4 rounded-2xl bg-red-50 px-5 py-4 text-[14px] font-semibold text-red-600">
          {state.message}
        </p>
      )}

      {state.phase === "success" ? (
        <div className="animate-fade-in rounded-card border border-border bg-surface p-9">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-[17px] font-bold">Tu resultado</h3>
            <button
              type="button"
              onClick={() => downloadTextFile(`${tool.slug}-reporte.txt`, state.output)}
              className="rounded-pill bg-ink px-5 py-2.5 text-[13px] font-bold text-white hover:bg-ink/90"
            >
              Descargar
            </button>
          </div>
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink-secondary">
            {state.output}
          </div>
        </div>
      ) : (
        <div className="rounded-card border-2 border-dashed border-border px-8 py-16 text-center">
          <span className="text-[15px] font-semibold text-ink-muted">
            Tu resultado aparecerá aquí
          </span>
        </div>
      )}
    </>
  );
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

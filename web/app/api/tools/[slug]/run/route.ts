import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TOOL_ADAPTERS } from "@/lib/tools/registry";
import type { ToolFormField } from "@/lib/supabase/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tool || tool.status !== "active") {
    return NextResponse.json({ error: "tool_not_available" }, { status: 403 });
  }

  const adapter = TOOL_ADAPTERS[slug];
  if (!adapter) {
    return NextResponse.json({ error: "tool_not_configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const input: Record<string, string> = body?.input ?? {};

  for (const field of tool.form_schema as ToolFormField[]) {
    if (field.required && !input[field.key]?.trim()) {
      return NextResponse.json(
        { error: `missing_field:${field.key}` },
        { status: 400 }
      );
    }
  }

  const { data: runId, error: chargeError } = await supabase.rpc(
    "charge_credits",
    { p_tool_slug: slug }
  );

  if (chargeError || !runId) {
    const message = chargeError?.message ?? "";
    if (message.includes("insufficient_credits")) {
      return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
    }
    if (message.includes("already_unlocked")) {
      return NextResponse.json({ error: "already_unlocked" }, { status: 409 });
    }
    return NextResponse.json({ error: "charge_failed" }, { status: 500 });
  }

  const { data: branding } = await supabase
    .from("broker_branding")
    .select("logo_url, brand_color, contact_whatsapp")
    .eq("profile_id", user.id)
    .maybeSingle();

  try {
    const output = await adapter(
      input,
      branding
        ? {
            logoUrl: branding.logo_url,
            brandColor: branding.brand_color,
            contactWhatsapp: branding.contact_whatsapp,
          }
        : null
    );

    await supabase.rpc("complete_run", { p_run_id: runId, p_output: { text: output } });

    return NextResponse.json({ output });
  } catch (err) {
    await supabase.rpc("refund_credits", {
      p_run_id: runId,
      p_error: err instanceof Error ? err.message : "unknown_error",
    });

    return NextResponse.json(
      {
        error: "generation_failed",
        message:
          "No se pudo generar tu reporte, tus créditos fueron reembolsados.",
      },
      { status: 500 }
    );
  }
}

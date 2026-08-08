import Anthropic from "@anthropic-ai/sdk";
import type { BrandingValue } from "@/components/dashboard/BrandingForm";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// Sonnet 5 is a deliberate cost/latency choice for a per-use, credit-metered
// report tool — override with ANTHROPIC_SMARTCOMPS_MODEL if deeper reasoning
// is worth the extra cost per report.
const MODEL = process.env.ANTHROPIC_SMARTCOMPS_MODEL ?? "claude-sonnet-5";

const SYSTEM_PROMPT = `Eres SmartComps, un analista de valuación inmobiliaria para brokers en México.
Con la herramienta de búsqueda web, encuentra comparables reales (propiedades similares en venta o vendidas recientemente cerca de la dirección dada) y arma un reporte de valuación en español, en texto plano (sin markdown, sin asteriscos), con esta estructura:

RESUMEN EJECUTIVO
(2-3 líneas: rango de valor estimado y confianza del análisis)

COMPARABLES ENCONTRADOS
(lista de 3-6 comparables: dirección o zona, precio, m2, precio/m2, fuente)

ANÁLISIS
(breve interpretación de los comparables frente a la propiedad evaluada)

RANGO DE VALUACIÓN ESTIMADO
(un rango en pesos mexicanos)

METODOLOGÍA
(1-2 líneas explicando cómo se llegó al rango)

Si no encuentras suficientes comparables reales, dilo explícitamente en vez de inventar cifras.`;

export async function runSmartComps(
  input: Record<string, string>,
  branding: BrandingValue | null
): Promise<string> {
  const address = input.address?.trim();
  const propertyType = input.property_type?.trim() || "Casa";
  if (!address) throw new Error("missing_address");

  let messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `Genera un reporte SmartComps para esta propiedad:\nDirección o link: ${address}\nTipo de propiedad: ${propertyType}`,
    },
  ];

  let response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
    messages,
  });

  // Server-side web search can pause after its default iteration cap —
  // resend once to let it resume rather than silently truncating.
  if (response.stop_reason === "pause_turn") {
    messages = [...messages, { role: "assistant", content: response.content }];
    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }],
      messages,
    });
  }

  if (response.stop_reason === "refusal") {
    throw new Error("generation_refused");
  }

  const body = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n\n")
    .trim();

  if (!body) throw new Error("empty_response");

  return stampBranding(body, branding);
}

function stampBranding(report: string, branding: BrandingValue | null): string {
  const contact = branding?.contactWhatsapp;
  const header = contact
    ? `Reporte preparado por tu contacto: ${contact}\n${"=".repeat(40)}\n\n`
    : "";
  return `${header}${report}`;
}

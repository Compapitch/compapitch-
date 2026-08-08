"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "@/components/ui/Field";
import { PillButton } from "@/components/ui/Button";

const COLOR_PRESETS = ["#6B7A90", "#101010", "#2F9E5B", "#C98A1F", "#7C51C9", "#D96B3F"];

export type BrandingValue = {
  logoUrl: string | null;
  brandColor: string | null;
  contactWhatsapp: string | null;
};

export function BrandingForm({
  initial,
  onSaved,
  title = "Antes de tu primer reporte, personaliza tu marca",
  subtitle = "Todo lo que generes sale con tu logo y tu WhatsApp — nunca con la marca de El Compapitch.",
}: {
  initial: BrandingValue | null;
  onSaved: (value: BrandingValue) => void;
  title?: string;
  subtitle?: string;
}) {
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? null);
  const [brandColor, setBrandColor] = useState(initial?.brandColor ?? COLOR_PRESETS[0]);
  const [contactWhatsapp, setContactWhatsapp] = useState(
    initial?.contactWhatsapp ?? ""
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const ext = file.name.split(".").pop();
    const path = `${user.id}/logo.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("broker-logos")
      .upload(path, file, { upsert: true });

    setUploading(false);

    if (uploadError) {
      setError("No pudimos subir tu logo. Intenta de nuevo.");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("broker-logos").getPublicUrl(path);
    setLogoUrl(`${publicUrl}?t=${Date.now()}`);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error: saveError } = await supabase.from("broker_branding").upsert({
      profile_id: user.id,
      logo_url: logoUrl,
      brand_color: brandColor,
      contact_whatsapp: contactWhatsapp || null,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (saveError) {
      setError("No pudimos guardar tu marca. Intenta de nuevo.");
      return;
    }

    onSaved({ logoUrl, brandColor, contactWhatsapp: contactWhatsapp || null });
  }

  return (
    <form
      onSubmit={handleSave}
      className="animate-slide-up rounded-card border border-border bg-surface p-9"
    >
      <h3 className="mb-1.5 text-[19px] font-bold">{title}</h3>
      <p className="mb-7 text-[14px] leading-relaxed text-ink-secondary">
        {subtitle}
      </p>

      <div className="mb-5 flex items-center gap-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Tu logo" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[11px] font-semibold text-ink-muted">
              Sin logo
            </span>
          )}
        </div>
        <label className="cursor-pointer rounded-pill border border-border bg-surface px-5 py-2.5 text-[13px] font-bold text-ink hover:bg-bg">
          {uploading ? "Subiendo…" : "Subir logo"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="hidden"
            onChange={handleLogoChange}
          />
        </label>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-[13px] font-semibold text-ink">
          Color de marca
        </label>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setBrandColor(c)}
              className={`h-9 w-9 rounded-full border-2 ${
                brandColor === c ? "border-ink" : "border-transparent"
              }`}
              style={{ background: c }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <TextField
          label="WhatsApp de contacto"
          optional
          type="tel"
          placeholder="+52 33 1234 5678"
          value={contactWhatsapp}
          onChange={(e) => setContactWhatsapp(e.target.value)}
        />
      </div>

      {error && (
        <p className="mb-4 text-[13px] font-semibold text-red-600">{error}</p>
      )}

      <PillButton type="submit" variant="accent" disabled={saving || uploading}>
        {saving ? "Guardando…" : "Guardar y continuar"}
      </PillButton>
    </form>
  );
}

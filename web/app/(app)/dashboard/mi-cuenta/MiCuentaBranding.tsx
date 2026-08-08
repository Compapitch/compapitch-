"use client";

import { useState } from "react";
import { BrandingForm, type BrandingValue } from "@/components/dashboard/BrandingForm";

export function MiCuentaBranding({ initial }: { initial: BrandingValue | null }) {
  const [value, setValue] = useState(initial);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  return (
    <div>
      <BrandingForm
        initial={value}
        title="Marca con la que salen tus reportes"
        subtitle="Logo, color y WhatsApp de contacto — así se ve en todo lo que generes."
        onSaved={(v) => {
          setValue(v);
          setSavedAt(Date.now());
        }}
      />
      {savedAt && (
        <p key={savedAt} className="mt-3 animate-fade-in text-[13px] font-semibold text-accent-hover">
          Guardado.
        </p>
      )}
    </div>
  );
}

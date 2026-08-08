"use client";

import { useState } from "react";
import { PillButton } from "@/components/ui/Button";
import { formatMXN } from "@/lib/format";
import type { Database } from "@/lib/supabase/types";

type CreditPackage = Database["public"]["Tables"]["credit_packages"]["Row"];

export function PackageCard({ pkg }: { pkg: CreditPackage }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "checkout_failed");
      }

      window.location.href = data.url;
    } catch {
      setError("No se pudo iniciar el pago. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col gap-6 rounded-card border p-9 ${
        pkg.is_featured
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface"
      }`}
    >
      {pkg.is_featured && (
        <span className="w-fit rounded-pill bg-white/20 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white">
          Recomendado
        </span>
      )}
      <div>
        <h3
          className={`mb-1 text-[20px] font-bold ${
            pkg.is_featured ? "text-white" : "text-ink"
          }`}
        >
          {pkg.name}
        </h3>
        <span
          className={`block text-[15px] ${
            pkg.is_featured ? "text-accent-light" : "text-ink-secondary"
          }`}
        >
          {pkg.credits} créditos
        </span>
      </div>
      <span
        className={`text-[40px] font-extrabold leading-none tracking-tight ${
          pkg.is_featured ? "text-white" : "text-ink"
        }`}
      >
        {formatMXN(pkg.price_mxn_cents)}
      </span>

      {error && (
        <p
          className={`text-[13px] font-semibold ${
            pkg.is_featured ? "text-white" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}

      <PillButton
        type="button"
        variant={pkg.is_featured ? "light" : "dark"}
        onClick={handleBuy}
        disabled={loading}
        className="mt-auto w-full"
      >
        {loading ? "Redirigiendo…" : "Comprar"}
      </PillButton>
    </div>
  );
}

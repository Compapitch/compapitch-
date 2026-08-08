import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PackageCard } from "@/components/dashboard/PackageCard";

export const metadata: Metadata = { title: "Recarga de créditos" };

export default async function CreditosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: balance }, { data: packages }] = await Promise.all([
    supabase.rpc("get_credit_balance"),
    supabase.from("credit_packages").select("*").order("sort_order"),
  ]);

  return (
    <div className="mx-auto max-w-[1000px] px-8 pb-24 pt-12">
      <div className="mb-10">
        <h1 className="mb-2 text-[32px] font-extrabold tracking-tight">
          Recarga de créditos
        </h1>
        <p className="text-[15px] text-ink-secondary">
          Tienes <strong>{balance ?? 0}</strong> créditos disponibles. Elige un
          paquete — el pago es seguro con Stripe, incluye Apple Pay.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {packages?.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

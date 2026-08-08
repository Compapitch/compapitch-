/**
 * One-time setup: creates Stripe products/prices (test mode) for the
 * credit packages and writes the resulting price IDs back into
 * `credit_packages.stripe_price_id` in Supabase.
 *
 * Run with: npm run seed:stripe
 * Requires STRIPE_SECRET_KEY and the Supabase service-role env vars in .env.local.
 */
import "dotenv/config";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const PACKAGES = [
  { id: "starter", name: "Starter", credits: 100, price_mxn_cents: 19900 },
  { id: "popular", name: "Popular", credits: 300, price_mxn_cents: 39900 },
  { id: "pro", name: "Pro", credits: 700, price_mxn_cents: 79900 },
];

async function main() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeKey || !supabaseUrl || !serviceRoleKey) {
    console.error(
      "Faltan STRIPE_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local"
    );
    process.exit(1);
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-07-29.dahlia" });
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  for (const pkg of PACKAGES) {
    const existing = await stripe.products.search({
      query: `metadata['package_id']:'${pkg.id}'`,
    });

    let product = existing.data[0];
    if (!product) {
      product = await stripe.products.create({
        name: `El Compapitch — ${pkg.name} (${pkg.credits} créditos)`,
        metadata: { package_id: pkg.id },
      });
      console.log(`Producto creado: ${product.id} (${pkg.id})`);
    } else {
      console.log(`Producto existente: ${product.id} (${pkg.id})`);
    }

    const prices = await stripe.prices.list({ product: product.id, active: true });
    let price = prices.data.find(
      (p) => p.unit_amount === pkg.price_mxn_cents && p.currency === "mxn"
    );

    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        currency: "mxn",
        unit_amount: pkg.price_mxn_cents,
      });
      console.log(`Precio creado: ${price.id}`);
    } else {
      console.log(`Precio existente: ${price.id}`);
    }

    const { error } = await supabase
      .from("credit_packages")
      .update({ stripe_price_id: price.id })
      .eq("id", pkg.id);

    if (error) {
      console.error(`No se pudo actualizar credit_packages para ${pkg.id}:`, error.message);
    }
  }

  console.log("\nListo. Corre las migraciones y el seed.sql de Supabase antes si aún no lo hiciste.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

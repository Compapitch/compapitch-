import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { packageId } = await request.json().catch(() => ({}));
  if (!packageId) {
    return NextResponse.json({ error: "missing_package_id" }, { status: 400 });
  }

  const { data: pkg } = await supabase
    .from("credit_packages")
    .select("*")
    .eq("id", packageId)
    .single();

  if (!pkg) {
    return NextResponse.json({ error: "package_not_found" }, { status: 404 });
  }

  if (!pkg.stripe_price_id) {
    return NextResponse.json(
      {
        error: "package_not_configured",
        message:
          "Este paquete no tiene un precio de Stripe todavía — corre npm run seed:stripe.",
      },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.headers.get("origin")!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: pkg.stripe_price_id, quantity: 1 }],
    // Omitting payment_method_types lets Stripe-hosted Checkout surface
    // whatever's enabled in the Dashboard automatically — Apple Pay / Google
    // Pay included, with no separate domain verification needed.
    success_url: `${siteUrl}/dashboard/creditos?success=1`,
    cancel_url: `${siteUrl}/dashboard/creditos?canceled=1`,
    customer_email: user.email,
    metadata: {
      profile_id: user.id,
      package_id: pkg.id,
      credits: String(pkg.credits),
    },
  });

  return NextResponse.json({ url: session.url });
}

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const profileId = session.metadata?.profile_id;
    const credits = Number(session.metadata?.credits ?? 0);
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.id;

    if (profileId && credits > 0) {
      const supabase = createServiceRoleClient();
      const { error } = await supabase.rpc("purchase_credits", {
        p_profile_id: profileId,
        p_credits: credits,
        p_stripe_payment_intent_id: paymentIntentId,
      });

      if (error) {
        // Let Stripe retry the webhook rather than silently dropping credits.
        return NextResponse.json({ error: "credit_failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}

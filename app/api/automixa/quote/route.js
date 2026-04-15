import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAutomixaPlan, getPlanQuote, normalizePromoCode } from "@/lib/automixa";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  return NextResponse.json({
    plans: ["starter", "growth", "pro"].map((planId) => getAutomixaPlan(planId)),
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const planId = body.planId || "starter";
    const promoCode = normalizePromoCode(body.promoCode);

    const plan = getAutomixaPlan(planId);
    let promo = null;

    if (promoCode) {
      const { data, error } = await supabaseAdmin
        .from("automixa_promo_codes")
        .select("*")
        .eq("code", promoCode)
        .eq("active", true)
        .single();

      if (error && error.code !== "PGRST116") {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!data) {
        return NextResponse.json({ error: "Invalid promo code" }, { status: 404 });
      }

      if (data.max_uses > 0 && data.uses_count >= data.max_uses) {
        return NextResponse.json({ error: "Promo code has expired" }, { status: 400 });
      }

      if (Array.isArray(data.applicable_plans) && data.applicable_plans.length > 0) {
        if (!data.applicable_plans.includes(plan.id)) {
          return NextResponse.json({ error: "Promo code is not valid for this plan" }, { status: 400 });
        }
      }

      promo = data;
    }

    const quote = getPlanQuote(plan.id, promo);

    return NextResponse.json({
      ...quote,
      promo: promo
        ? {
            code: promo.code,
            description: promo.description,
            discount_type: promo.discount_type,
            discount_value: promo.discount_value,
            feature_unlocks: promo.feature_unlocks || [],
          }
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to generate quote" },
      { status: 500 }
    );
  }
}

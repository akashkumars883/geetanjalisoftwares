import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getAutomixaPlan,
  getEnabledFeatures,
  normalizePromoCode,
} from "@/lib/automixa";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function resolvePromo(code) {
  const promoCode = normalizePromoCode(code);

  if (!promoCode) return null;

  const { data } = await supabaseAdmin
    .from("automixa_promo_codes")
    .select("*")
    .eq("code", promoCode)
    .eq("active", true)
    .single();

  return data || null;
}

async function hydrateIntegration(integration) {
  const plan = getAutomixaPlan(integration.plan_tier);
  const promo = await resolvePromo(integration.promo_code);

  return {
    ...integration,
    plan,
    enabled_features: getEnabledFeatures(plan, promo),
    promo,
  };
}

function buildPayload(body) {
  const plan = getAutomixaPlan(body.plan_tier);

  return {
    user_id: body.user_id || null,
    page_id: body.page_id || null,
    ig_id: body.ig_id || null,
    page_access_token: body.page_access_token || null,
    platform_name: body.platform_name || "meta",
    is_active: body.is_active ?? true,
    page_name: body.page_name || null,
    daily_limit: body.daily_limit || plan.limits.daily_limit,
    usage_count: body.usage_count || 0,
    last_sync: body.last_sync || new Date().toISOString(),
    api_status: body.api_status || "connected",
    profile_picture_url: body.profile_picture_url || null,
    auto_like: body.auto_like ?? plan.featureFlags.auto_like,
    schedule_active: body.schedule_active ?? plan.featureFlags.scheduling,
    start_time: body.start_time || "00:00",
    end_time: body.end_time || "23:59",
    timezone: body.timezone || "UTC",
    ig_username: body.ig_username || null,
    persona: body.persona || "Professional",
    bio_settings: body.bio_settings || {
      bio: "",
      show_stats: true,
      custom_links: [],
    },
    knowledge_base: body.knowledge_base || null,
    expires_at: body.expires_at || null,
    plan_tier: plan.id,
    promo_code: normalizePromoCode(body.promo_code) || null,
    discount_percent: body.discount_percent || 0,
    subscription_status: body.subscription_status || "active",
    feature_overrides: body.feature_overrides || [],
  };
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("integrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const integrations = await Promise.all((data || []).map(hydrateIntegration));
    return NextResponse.json(integrations);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = buildPayload(body);

    const promo = await resolvePromo(payload.promo_code);
    if (payload.promo_code && !promo) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 404 });
    }

    if (promo) {
      payload.discount_percent =
        promo.discount_type === "fixed"
          ? 0
          : Number(promo.discount_value || 0);
      if (Array.isArray(promo.feature_unlocks)) {
        payload.feature_overrides = promo.feature_unlocks;
      }
    }

    const { data, error } = await supabaseAdmin
      .from("integrations")
      .insert([payload])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (promo) {
      await supabaseAdmin
        .from("automixa_promo_codes")
        .update({
          uses_count: Number(promo.uses_count || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("code", promo.code);
    }

    return NextResponse.json(await hydrateIntegration(data), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing integration id" }, { status: 400 });
    }

    const existing = await supabaseAdmin
      .from("integrations")
      .select("*")
      .eq("id", id)
      .single();

    if (existing.error) {
      return NextResponse.json({ error: existing.error.message }, { status: 500 });
    }

    const plan = getAutomixaPlan(updates.plan_tier || existing.data.plan_tier);
    const promoCode = normalizePromoCode(updates.promo_code || existing.data.promo_code);
    const promo = promoCode ? await resolvePromo(promoCode) : null;

    const payload = {
      ...updates,
      plan_tier: plan.id,
      promo_code: promoCode || null,
      daily_limit: updates.daily_limit || plan.limits.daily_limit,
      auto_like:
        updates.auto_like ?? plan.featureFlags.auto_like ?? existing.data.auto_like,
      schedule_active:
        updates.schedule_active ?? plan.featureFlags.scheduling ?? existing.data.schedule_active,
      feature_overrides: Array.isArray(updates.feature_overrides)
        ? updates.feature_overrides
        : existing.data.feature_overrides || [],
    };

    if (promo) {
      payload.discount_percent =
        promo.discount_type === "fixed"
          ? 0
          : Number(promo.discount_value || 0);
      if (Array.isArray(promo.feature_unlocks)) {
        payload.feature_overrides = promo.feature_unlocks;
      }
    }

    const { data, error } = await supabaseAdmin
      .from("integrations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(await hydrateIntegration(data));
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing integration id" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("integrations")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Integration deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

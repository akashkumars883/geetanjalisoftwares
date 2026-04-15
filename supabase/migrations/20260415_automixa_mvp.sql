-- Automixa MVP: plan metadata + promo code storage

create table if not exists public.automixa_promo_codes (
  code text primary key,
  description text,
  discount_type text not null default 'percent',
  discount_value numeric(10,2) not null default 0,
  max_uses integer not null default 0,
  uses_count integer not null default 0,
  active boolean not null default true,
  applicable_plans text[] not null default '{}'::text[],
  feature_unlocks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.integrations
  add column if not exists plan_tier text not null default 'starter',
  add column if not exists promo_code text,
  add column if not exists discount_percent numeric(5,2) not null default 0,
  add column if not exists subscription_status text not null default 'active',
  add column if not exists feature_overrides jsonb not null default '[]'::jsonb;

create index if not exists integrations_plan_tier_idx on public.integrations (plan_tier);
create index if not exists automixa_promo_codes_active_idx on public.automixa_promo_codes (active);

insert into public.automixa_promo_codes (
  code,
  description,
  discount_type,
  discount_value,
  max_uses,
  uses_count,
  active,
  applicable_plans,
  feature_unlocks
)
values
  (
    'LAUNCH10',
    '10% launch discount for all Automixa plans',
    'percent',
    10,
    500,
    0,
    true,
    array['starter', 'growth', 'pro'],
    '[]'::jsonb
  ),
  (
    'PRO20',
    '20% off the Pro plan with priority onboarding',
    'percent',
    20,
    100,
    0,
    true,
    array['pro'],
    '["priority_support"]'::jsonb
  )
on conflict (code) do update set
  description = excluded.description,
  discount_type = excluded.discount_type,
  discount_value = excluded.discount_value,
  max_uses = excluded.max_uses,
  active = excluded.active,
  applicable_plans = excluded.applicable_plans,
  feature_unlocks = excluded.feature_unlocks,
  updated_at = now();

-- Adds the missing expiry column expected by the usage/integration layer.
-- Safe to run multiple times.
alter table public.integrations
add column if not exists expires_at timestamptz null;

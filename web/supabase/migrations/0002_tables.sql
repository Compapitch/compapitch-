-- Brokers. One row per auth.users id, created by the handle_new_user trigger
-- (see 0003_functions.sql) the moment they request a magic link — not when
-- they click it — so welcome credits exist without waiting on confirmation.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null,
  whatsapp text,
  created_at timestamptz not null default now()
);

-- The catalog "mold": one row per tool, active or coming_soon. Adding a new
-- tool to the product is a row here + an adapter file, nothing else.
create table if not exists public.tools (
  slug text primary key,
  name text not null,
  description text not null,
  icon_key text not null,
  category text not null,
  cost_credits integer not null check (cost_credits >= 0),
  status text not null default 'coming_soon' check (status in ('active', 'coming_soon')),
  output_type text not null default 'text_report' check (output_type in ('text_report', 'image', 'video')),
  -- per_use: charged every run (SmartComps). one_time_unlock: charged once
  -- ever per broker, then the tool stays unlocked (CRM en Sheets).
  charge_type text not null default 'per_use' check (charge_type in ('per_use', 'one_time_unlock')),
  -- array of { key, label, type, required, placeholder?, options? }
  form_schema jsonb not null default '[]'::jsonb,
  checkmarks jsonb not null default '[]'::jsonb,
  icon_bg text not null default '#DCE3EC',
  icon_color text not null default '#55657C',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_runs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  tool_slug text not null references public.tools (slug),
  input jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'success', 'refunded')),
  output jsonb,
  credits_charged integer not null,
  error text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists tool_runs_profile_created_idx
  on public.tool_runs (profile_id, created_at desc);

-- The single source of truth for a broker's balance: sum(amount). Never
-- written to directly by client code — only through the SECURITY DEFINER
-- functions in 0003_functions.sql.
create table if not exists public.credit_ledger (
  id bigint generated always as identity primary key,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null,
  type text not null check (type in ('welcome_grant', 'debit', 'refund', 'purchase')),
  tool_slug text references public.tools (slug),
  run_id uuid references public.tool_runs (id),
  stripe_payment_intent_id text,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists credit_ledger_profile_idx
  on public.credit_ledger (profile_id, created_at desc);

-- Guards against granting the welcome bonus twice for the same broker.
create unique index if not exists credit_ledger_one_welcome_grant
  on public.credit_ledger (profile_id)
  where (type = 'welcome_grant');

-- Guards against double-crediting on Stripe webhook retries.
create unique index if not exists credit_ledger_one_purchase_per_intent
  on public.credit_ledger (stripe_payment_intent_id)
  where (stripe_payment_intent_id is not null);

-- White-label info, captured the first time a broker generates a result —
-- not at registration.
create table if not exists public.broker_branding (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  logo_url text,
  brand_color text,
  contact_whatsapp text,
  updated_at timestamptz not null default now()
);

create table if not exists public.credit_packages (
  id text primary key,
  name text not null,
  credits integer not null,
  price_mxn_cents integer not null,
  stripe_price_id text,
  is_featured boolean not null default false,
  sort_order integer not null default 0
);

-- Servicios personalizados: quote requests, a qualified-lead source for Rodrigo.
create table if not exists public.service_leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  service_slug text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  topic text,
  message text not null,
  created_at timestamptz not null default now()
);

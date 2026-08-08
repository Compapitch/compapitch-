alter table public.profiles enable row level security;
alter table public.tools enable row level security;
alter table public.tool_runs enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.broker_branding enable row level security;
alter table public.credit_packages enable row level security;
alter table public.service_leads enable row level security;
alter table public.contact_messages enable row level security;

-- profiles: a broker can read/update their own row. Insert only happens via
-- the handle_new_user trigger (SECURITY DEFINER, bypasses RLS) — no insert
-- policy for client roles.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- tools: public catalog, readable by anyone (marketing pages are unauthenticated).
drop policy if exists "tools_select_all" on public.tools;
create policy "tools_select_all" on public.tools
  for select using (true);

-- tool_runs: a broker can read their own run history. Writes only via the
-- SECURITY DEFINER functions (charge_credits / complete_run / refund_credits).
drop policy if exists "tool_runs_select_own" on public.tool_runs;
create policy "tool_runs_select_own" on public.tool_runs
  for select using (auth.uid() = profile_id);

-- credit_ledger: a broker can read their own transactions. No client writes —
-- SECURITY DEFINER functions and the Stripe webhook (service role) are the
-- only writers.
drop policy if exists "credit_ledger_select_own" on public.credit_ledger;
create policy "credit_ledger_select_own" on public.credit_ledger
  for select using (auth.uid() = profile_id);

-- broker_branding: no credits/money involved here, so the broker can write
-- directly (Mi cuenta screen).
drop policy if exists "broker_branding_select_own" on public.broker_branding;
create policy "broker_branding_select_own" on public.broker_branding
  for select using (auth.uid() = profile_id);
drop policy if exists "broker_branding_insert_own" on public.broker_branding;
create policy "broker_branding_insert_own" on public.broker_branding
  for insert with check (auth.uid() = profile_id);
drop policy if exists "broker_branding_update_own" on public.broker_branding;
create policy "broker_branding_update_own" on public.broker_branding
  for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- credit_packages: public catalog for the Recarga screen.
drop policy if exists "credit_packages_select_all" on public.credit_packages;
create policy "credit_packages_select_all" on public.credit_packages
  for select using (true);

-- service_leads / contact_messages: anyone (including anonymous visitors) can
-- submit; nobody can read back through the client API — Rodrigo reviews leads
-- via the Supabase dashboard / service role. profile_id can only be set to
-- the caller's own id or left null (guards against spoofing another broker's
-- lead).
drop policy if exists "service_leads_insert_any" on public.service_leads;
create policy "service_leads_insert_any" on public.service_leads
  for insert with check (profile_id is null or profile_id = auth.uid());
drop policy if exists "contact_messages_insert_any" on public.contact_messages;
create policy "contact_messages_insert_any" on public.contact_messages
  for insert with check (true);

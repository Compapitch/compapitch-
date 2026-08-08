-- ============================================================================
-- Welcome credits
-- ============================================================================

create or replace function public.grant_welcome_credits(p_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.credit_ledger (profile_id, amount, type, description)
  values (p_profile_id, 80, 'welcome_grant', '80 créditos de bienvenida')
  on conflict do nothing; -- credit_ledger_one_welcome_grant makes this idempotent
end;
$$;

-- ============================================================================
-- New broker bootstrap: fires when a magic link is requested (auth.users row
-- is created then), not when it's clicked — so credits exist immediately,
-- matching "sin tarjeta, sin compromiso".
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, whatsapp)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    new.raw_user_meta_data ->> 'whatsapp'
  )
  on conflict (id) do nothing;

  perform public.grant_welcome_credits(new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Balance = sum(amount). Derived from auth.uid(), never trusts a client-passed id.
-- ============================================================================

create or replace function public.get_credit_balance()
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(sum(amount), 0)::integer
  from public.credit_ledger
  where profile_id = auth.uid();
$$;

-- ============================================================================
-- Charge before generating. Serialized per-broker via an advisory xact lock
-- so two concurrent requests can't both pass the balance check.
-- ============================================================================

create or replace function public.charge_credits(p_tool_slug text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile_id uuid := auth.uid();
  v_tool public.tools;
  v_balance integer;
  v_run_id uuid;
begin
  if v_profile_id is null then
    raise exception 'not_authenticated';
  end if;

  select * into v_tool from public.tools where slug = p_tool_slug;
  if not found or v_tool.status <> 'active' then
    raise exception 'tool_not_available';
  end if;

  perform pg_advisory_xact_lock(hashtext(v_profile_id::text));

  if v_tool.charge_type = 'one_time_unlock' and exists (
    select 1 from public.tool_runs
    where profile_id = v_profile_id and tool_slug = p_tool_slug and status = 'success'
  ) then
    raise exception 'already_unlocked';
  end if;

  select coalesce(sum(amount), 0) into v_balance
  from public.credit_ledger
  where profile_id = v_profile_id;

  if v_balance < v_tool.cost_credits then
    raise exception 'insufficient_credits';
  end if;

  v_run_id := gen_random_uuid();

  insert into public.tool_runs (id, profile_id, tool_slug, credits_charged, status)
  values (v_run_id, v_profile_id, p_tool_slug, v_tool.cost_credits, 'pending');

  insert into public.credit_ledger (profile_id, amount, type, tool_slug, run_id, description)
  values (v_profile_id, -v_tool.cost_credits, 'debit', p_tool_slug, v_run_id, 'Cobro por uso de herramienta');

  return v_run_id;
end;
$$;

-- ============================================================================
-- Mark a run as delivered.
-- ============================================================================

create or replace function public.complete_run(p_run_id uuid, p_output jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.tool_runs
  set status = 'success', output = p_output, completed_at = now()
  where id = p_run_id and profile_id = auth.uid() and status = 'pending';

  if not found then
    raise exception 'run_not_found_or_not_pending';
  end if;
end;
$$;

-- ============================================================================
-- Refund on technical failure only. Idempotent: a run can only be refunded
-- once (status check), so a retried refund call is a no-op.
-- ============================================================================

create or replace function public.refund_credits(p_run_id uuid, p_error text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_run public.tool_runs;
begin
  select * into v_run
  from public.tool_runs
  where id = p_run_id and profile_id = auth.uid() and status = 'pending'
  for update;

  if not found then
    return; -- already resolved (success/refunded) or not this broker's run
  end if;

  update public.tool_runs
  set status = 'refunded', error = p_error, completed_at = now()
  where id = p_run_id;

  insert into public.credit_ledger (profile_id, amount, type, tool_slug, run_id, description)
  values (v_run.profile_id, v_run.credits_charged, 'refund', v_run.tool_slug, p_run_id, 'Reembolso por falla técnica');
end;
$$;

-- ============================================================================
-- Stripe webhook credits a purchase. Called with the service-role key only
-- (no user session at that point), so it does not check auth.uid(). The
-- unique index on stripe_payment_intent_id makes it safe against webhook
-- retries.
-- ============================================================================

create or replace function public.purchase_credits(
  p_profile_id uuid,
  p_credits integer,
  p_stripe_payment_intent_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.credit_ledger (profile_id, amount, type, stripe_payment_intent_id, description)
  values (p_profile_id, p_credits, 'purchase', p_stripe_payment_intent_id, 'Compra de créditos')
  on conflict do nothing; -- credit_ledger_one_purchase_per_intent
end;
$$;

-- ============================================================================
-- Permissions: only authenticated brokers can call their own-scoped RPCs.
-- purchase_credits and grant_welcome_credits stay un-grantable — reachable
-- only via the service-role key (webhook) or the trigger.
-- ============================================================================

revoke execute on function public.grant_welcome_credits(uuid) from public, anon, authenticated;
revoke execute on function public.purchase_credits(uuid, integer, text) from public, anon, authenticated;

grant execute on function public.get_credit_balance() to authenticated;
grant execute on function public.charge_credits(text) to authenticated;
grant execute on function public.complete_run(uuid, jsonb) to authenticated;
grant execute on function public.refund_credits(uuid, text) to authenticated;

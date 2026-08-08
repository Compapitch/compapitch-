-- Bucket for broker-uploaded logos (Mi cuenta screen). Public read (logos are
-- stamped onto reports/PDFs that get shared with the broker's own clients),
-- writes scoped to the broker's own folder ("<uid>/...").
insert into storage.buckets (id, name, public)
values ('broker-logos', 'broker-logos', true)
on conflict (id) do nothing;

drop policy if exists "broker_logos_public_read" on storage.objects;
create policy "broker_logos_public_read"
  on storage.objects for select
  using (bucket_id = 'broker-logos');

drop policy if exists "broker_logos_owner_write" on storage.objects;
create policy "broker_logos_owner_write"
  on storage.objects for insert
  with check (
    bucket_id = 'broker-logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "broker_logos_owner_update" on storage.objects;
create policy "broker_logos_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'broker-logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'broker-logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "broker_logos_owner_delete" on storage.objects;
create policy "broker_logos_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'broker-logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- gen_random_uuid() lives here; Supabase projects usually have it enabled
-- already, this is just a defensive no-op if so.
create extension if not exists pgcrypto;

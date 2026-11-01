-- Run this in Supabase → SQL Editor.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Visitors can only INSERT. Nobody can read through the public key;
-- read your messages in the Supabase dashboard (Table Editor).
create policy "anyone can send a message"
  on public.messages for insert
  to anon
  with check (true);

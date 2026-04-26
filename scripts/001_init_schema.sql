-- ============================================================================
-- Office Management Platform — Initial Schema
-- Tables: workspaces (offices), users (profiles)
-- ============================================================================

-- 1. Workspaces (an "office" / tenant)
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  office_name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Users — public profile / KYC data linked 1:1 to auth.users
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone_number text,
  role text,
  workspace_id uuid references public.workspaces(id) on delete set null,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_workspace_id_idx on public.users (workspace_id);
create index if not exists workspaces_owner_id_idx on public.workspaces (owner_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.users enable row level security;
alter table public.workspaces enable row level security;

-- USERS policies — a user can only read/write their own profile row
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

drop policy if exists "users_delete_own" on public.users;
create policy "users_delete_own" on public.users
  for delete using (auth.uid() = id);

-- WORKSPACES policies — an owner can read/write their own workspace
drop policy if exists "workspaces_select_own" on public.workspaces;
create policy "workspaces_select_own" on public.workspaces
  for select using (auth.uid() = owner_id);

drop policy if exists "workspaces_insert_own" on public.workspaces;
create policy "workspaces_insert_own" on public.workspaces
  for insert with check (auth.uid() = owner_id);

drop policy if exists "workspaces_update_own" on public.workspaces;
create policy "workspaces_update_own" on public.workspaces
  for update using (auth.uid() = owner_id);

drop policy if exists "workspaces_delete_own" on public.workspaces;
create policy "workspaces_delete_own" on public.workspaces
  for delete using (auth.uid() = owner_id);

-- ============================================================================
-- Auto-create a profile row when a new auth.users row is inserted
-- (so the KYC form has a row to update instead of insert)
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

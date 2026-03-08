-- ============================================================
-- Palet – Supabase schema with Supabase native authentication
-- Setup Instructions:
-- 1. Enable Email/Password auth in Supabase Dashboard (Auth > Sign In / Up > Email)
-- 2. Enable Anonymous Sign-Ins in Supabase Dashboard (Auth > Sign In / Up > Anonymous Sign-Ins)
-- 3. Enable Google OAuth in Supabase Dashboard (Auth > Sign In / Up > Google)
-- 4. (Recommended) Enable invisible CAPTCHA in Supabase Dashboard (Auth > Bot and Abuse Protection)
--    - Use Cloudflare Turnstile (invisible mode) for seamless bot protection without user interaction
--    - Turnstile silently verifies requests server-side, perfect for anonymous sign-ins
--    - Alternative: hCaptcha in passive mode also works invisibly
--    - Reference: https://supabase.com/docs/guides/auth/auth-captcha
-- 5. Run this migration in the Supabase SQL Editor
-- 6. Create the "fonts" storage bucket in Supabase Dashboard (Storage > New Bucket)
-- ============================================================

-- -------------------------------------------------------
-- 1. Palettes table
-- -------------------------------------------------------
create table if not exists public.palettes (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid(),
  name        text not null,
  colors      text[] not null,
  tags        text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Create indexes for RLS performance
create index if not exists idx_palettes_user_id on public.palettes(user_id);

alter table public.palettes enable row level security;

-- Users can only SELECT their own palettes (required for UPDATE/DELETE to work)
create policy "Users can view own palettes"
  on public.palettes for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can only INSERT palettes for themselves
create policy "Users can insert own palettes"
  on public.palettes for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only UPDATE their own palettes
create policy "Users can update own palettes"
  on public.palettes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can only DELETE their own palettes
create policy "Users can delete own palettes"
  on public.palettes for delete
  to authenticated
  using (auth.uid() = user_id);

-- -------------------------------------------------------
-- 2. Fonts table
-- -------------------------------------------------------
create table if not exists public.fonts (
  id            bigint generated always as identity primary key,
  user_id       uuid not null default auth.uid(),
  name          text not null,
  category      text not null default 'Sans Serif',
  preview_text  text not null default 'The quick brown fox jumps over the lazy dog.',
  weight        text not null default '400',
  file_size     text not null,
  storage_path  text,
  is_favorite   boolean not null default false,
  added_at      timestamptz not null default now()
);

-- Create indexes for RLS performance
create index if not exists idx_fonts_user_id on public.fonts(user_id);

alter table public.fonts enable row level security;

-- Users can only SELECT their own fonts (required for UPDATE/DELETE to work)
create policy "Users can view own fonts"
  on public.fonts for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can only INSERT fonts for themselves
create policy "Users can insert own fonts"
  on public.fonts for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only UPDATE their own fonts
create policy "Users can update own fonts"
  on public.fonts for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can only DELETE their own fonts
create policy "Users can delete own fonts"
  on public.fonts for delete
  to authenticated
  using (auth.uid() = user_id);

-- -------------------------------------------------------
-- 3. Supabase Storage bucket for font files (JWT-authenticated)
-- -------------------------------------------------------
-- IMPORTANT: Create the bucket manually in Supabase Dashboard (Storage > New bucket)
-- Bucket configuration:
--   Name: fonts
--   Public: FALSE (users must be authenticated to access files)
--   File size limit: 10 MB per file (adjust as needed)
--   Allowed MIME types: font/ttf, font/otf, application/x-font-woff (optional)
--
-- File path format: {random_uuid}.{ext}
-- Example: a1b2c3d4-e5f6-7890-abcd-ef1234567890.ttf

-- Authenticated users (including anonymous) can upload fonts
create policy "Auth users can upload fonts"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'fonts');

-- Authenticated users can read font files (lookup controlled by fonts table RLS)
create policy "Auth users can read font files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'fonts');

-- Authenticated users can delete font files (lookup controlled by fonts table RLS)
create policy "Auth users can delete font files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'fonts');

-- -------------------------------------------------------
-- 4. Data transfer function for anonymous-to-real account migration
-- -------------------------------------------------------
-- Called when an anonymous user logs into an existing account.
-- Moves palettes & fonts from the old anonymous user_id to the
-- currently authenticated user_id.

create or replace function public.transfer_anonymous_data(old_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only allow transfer from genuine anonymous users
  if not exists (
    select 1 from auth.users
    where id = old_user_id
      and is_anonymous = true
  ) then
    raise exception 'Invalid transfer: source user is not anonymous';
  end if;

  -- Transfer palettes
  update public.palettes
  set user_id = auth.uid()
  where user_id = old_user_id;

  -- Transfer fonts
  update public.fonts
  set user_id = auth.uid()
  where user_id = old_user_id;
end;
$$;

-- Allow any authenticated user to call the transfer function
grant execute on function public.transfer_anonymous_data(uuid) to authenticated;

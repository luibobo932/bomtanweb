create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id text primary key,
  slug text not null unique,
  full_name text not null,
  role text not null check (role in ('super_admin', 'nhan_vien', 'cong_tac_vien')),
  phone text,
  avatar_url text,
  bio text not null default '',
  specialty_districts text[] not null default '{}',
  specialty_segment text not null default '',
  achievements text[] not null default '{}',
  facebook_url text,
  tiktok_url text,
  zalo_url text,
  follow_count integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id text primary key,
  slug text not null unique,
  title text not null,
  district text not null default '',
  ward text not null default '',
  street text not null default '',
  address_line text not null default '',
  price_label text not null default '',
  area_label text not null default '',
  dimensions text not null default '',
  layout_text text not null default '',
  house_type text not null default '',
  legal_status text not null default '',
  occupancy_status text not null default '',
  status text not null check (status in ('con_ban', 'dang_thuong_luong', 'da_ban', 'ngung_ban')),
  advantages text[] not null default '{}',
  caution_notes text not null default '',
  suitable_for text[] not null default '{}',
  manager_profile_id text,
  manager_slug text not null default '',
  manager_name text not null default '',
  hero_note text not null default '',
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.listings(id) on delete cascade,
  media_type text not null default 'image',
  file_url text not null,
  sort_order integer not null default 0,
  alt_text text
);

create table if not exists public.videos (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text not null default '',
  video_source_type text not null check (video_source_type in ('tiktok', 'youtube', 'facebook', 'cdn')),
  video_url text not null,
  embed_code text null,
  embed_url text null,
  thumbnail_url text,
  duration_seconds integer not null default 0,
  content_type text not null check (content_type in ('review_nha', 'kien_thuc')),
  listing_id text null references public.listings(id) on delete set null,
  reviewer_profile_id text not null references public.profiles(id) on delete restrict,
  reviewer_slug text not null,
  reviewer_name text not null,
  district_tag text not null default '',
  street_tag text not null default '',
  price_tag text not null default '',
  house_type_tag text not null default '',
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
  view_count_label text not null default '0',
  like_count_label text not null default '0',
  comment_count_label text not null default '0',
  share_count_label text not null default 'Share',
  created_at timestamptz not null default now(),
  published_at timestamptz null
);

create table if not exists public.buyer_leads (
  id text primary key,
  full_name text not null,
  phone text not null,
  preferred_district text not null default '',
  budget_label text not null default '',
  house_type text not null default '',
  dimensions_request text not null default '',
  purpose text not null default '',
  notes text not null default '',
  source_type text not null check (source_type in ('video', 'listing', 'profile', 'kien_thuc', 'direct')),
  source_id text null,
  assigned_profile_id text null references public.profiles(id) on delete set null,
  assigned_profile_name text null,
  status text not null default 'moi' check (status in ('moi', 'da_lien_he', 'dang_tu_van', 'da_xem_nha', 'dang_dam_phan', 'chot', 'huy')),
  created_at timestamptz not null default now()
);

create table if not exists public.owner_leads (
  id text primary key,
  owner_name text not null,
  phone text not null,
  address_line text not null,
  expected_price text not null default '',
  dimensions_text text not null default '',
  layout_text text not null default '',
  legal_status text not null default '',
  occupancy_status text not null default '',
  media_notes text not null default '',
  source_type text not null check (source_type in ('video', 'listing', 'profile', 'kien_thuc', 'direct')),
  source_id text null,
  assigned_profile_id text null references public.profiles(id) on delete set null,
  assigned_profile_name text null,
  status text not null default 'moi' check (status in ('moi', 'dang_xac_minh', 'du_dieu_kien', 'tu_choi', 'da_chuyen_listing')),
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id text not null,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists videos_approval_status_idx on public.videos (approval_status, created_at desc);
create index if not exists videos_listing_id_idx on public.videos (listing_id);
create index if not exists listings_approval_status_idx on public.listings (approval_status, created_at desc);
create index if not exists buyer_leads_status_idx on public.buyer_leads (status, created_at desc);
create index if not exists owner_leads_status_idx on public.owner_leads (status, created_at desc);
create index if not exists activity_logs_entity_idx on public.activity_logs (entity_type, entity_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_media enable row level security;
alter table public.videos enable row level security;
alter table public.buyer_leads enable row level security;
alter table public.owner_leads enable row level security;
alter table public.activity_logs enable row level security;

drop policy if exists profiles_public_select on public.profiles;
create policy profiles_public_select on public.profiles for select using (is_active = true);

drop policy if exists listings_public_select on public.listings;
create policy listings_public_select
  on public.listings
  for select
  using (approval_status = 'approved' and status in ('con_ban', 'dang_thuong_luong'));

drop policy if exists listing_media_public_select on public.listing_media;
create policy listing_media_public_select
  on public.listing_media
  for select
  using (exists (select 1 from public.listings where listings.id = listing_media.listing_id and listings.approval_status = 'approved'));

drop policy if exists videos_public_select on public.videos;
create policy videos_public_select on public.videos for select using (approval_status = 'approved');

drop policy if exists listings_authenticated_insert on public.listings;
create policy listings_authenticated_insert on public.listings for insert to authenticated with check (true);

drop policy if exists listings_authenticated_update on public.listings;
create policy listings_authenticated_update on public.listings for update to authenticated using (true) with check (true);

drop policy if exists videos_authenticated_insert on public.videos;
create policy videos_authenticated_insert on public.videos for insert to authenticated with check (true);

drop policy if exists videos_authenticated_update on public.videos;
create policy videos_authenticated_update on public.videos for update to authenticated using (true) with check (true);

drop policy if exists buyer_leads_insert_all on public.buyer_leads;
create policy buyer_leads_insert_all on public.buyer_leads for insert with check (true);

drop policy if exists owner_leads_insert_all on public.owner_leads;
create policy owner_leads_insert_all on public.owner_leads for insert with check (true);

drop policy if exists buyer_leads_authenticated_select on public.buyer_leads;
create policy buyer_leads_authenticated_select on public.buyer_leads for select to authenticated using (true);

drop policy if exists buyer_leads_authenticated_update on public.buyer_leads;
create policy buyer_leads_authenticated_update on public.buyer_leads for update to authenticated using (true) with check (true);

drop policy if exists owner_leads_authenticated_select on public.owner_leads;
create policy owner_leads_authenticated_select on public.owner_leads for select to authenticated using (true);

drop policy if exists owner_leads_authenticated_update on public.owner_leads;
create policy owner_leads_authenticated_update on public.owner_leads for update to authenticated using (true) with check (true);

drop policy if exists activity_logs_authenticated_insert on public.activity_logs;
create policy activity_logs_authenticated_insert on public.activity_logs for insert to authenticated with check (true);

# Architecture MVP

## Stack de xuat

- Frontend: Next.js 16 App Router + React 19 + Tailwind 4
- Backend de san xuat: Supabase Auth + Postgres + Edge Functions
- Hosting: Vercel
- Video phase 1: luu `video_url` va/hoac `embed_code` cho TikTok / YouTube / Facebook / CDN; khong upload file video vao app

## Ly do chon stack

- Next.js hop voi website public, SEO, mobile-first va toc do scaffold nhanh
- Supabase hop voi bai toan CRUD + role + lead intake + metadata video + admin dashboard
- Vercel hop cho deploy MVP nhanh, preview branch ro rang cho team

## Surface MVP

- Public
  - Trang chu
  - Feed video
  - Kho nha
  - Chi tiet can nha
  - Profile moi gioi
  - Kho kien thuc
  - Form buyer lead
  - Form owner lead
- Admin
  - Quan ly video
  - Quan ly listing
  - Quan ly buyer leads
  - Quan ly owner leads
  - Quan ly user / role / trang thai

## Nguyen tac backend

- Moi video va listing do nhan vien / CTV tao ra mac dinh o trang thai `pending`
- Chi `super_admin` duoc publish
- Moi lead phai luu `source_type`, `source_id`, `assigned_user_id`, `status`
- Role thap khong duoc xem toan bo lead va khong duoc export full data
- Chu nha gui nha ban chi tao `owner_lead`, khong tao listing cong khai ngay
- Feed public chi doc metadata video da duyet, thumbnail, `video_url` va `embed_code/embed_url`
- Next.js/Vercel khong serve file video lon
- Video backend phase 2 neu can upload: tach sang dich vu video rieng co transcode/CDN
- Admin route doc role tu Supabase session, uu tien `profiles.role`
- Audit log duoc ghi khi tao video metadata va doi trang thai duyet

## Buoc tiep theo cho doi IT

1. Tao project Supabase va chay migration `supabase/migrations/20260524_create_videos_metadata.sql`
2. Cau hinh login theo `docs/supabase-auth-setup.md`
3. Cap env theo `.env.example`
4. Thay mock fallback bang query that cho listing, profiles, leads
5. Tighten RLS/policies theo schema that cua team

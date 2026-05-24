# Supabase auth setup

## Muc tieu

- Dang nhap admin bang Supabase Auth email/password
- Doc role tu `profiles.role` la uu tien cao nhat
- Fallback role tu `app_metadata.role` hoac `user_metadata.role`

## Viec can lam tren Supabase

1. Bat Email auth provider
2. Tao bang `profiles` neu chua co, toi thieu:
   - `id` text hoac uuid trung voi `auth.users.id`
   - `full_name`
   - `role` (`super_admin`, `nhan_vien`, `cong_tac_vien`)
3. Chay migration trong `supabase/migrations/20260524_create_videos_metadata.sql`
4. Tao it nhat 1 user `super_admin`
5. Dam bao user do co:
   - row trong `profiles`, hoac
   - `app_metadata.role = super_admin`

## Hanh vi trong app

- `/admin/login`: dang nhap bang Supabase
- `/admin`: neu chua dang nhap va co env Supabase, redirect sang login
- Neu chua co env Supabase, `/admin` chay demo fallback local

## Luu y

- API admin khong con doc `x-demo-role`
- Duyet video chi cho `super_admin`
- Nhan vien / CTV van co the tao video metadata, nhung se vao `pending`

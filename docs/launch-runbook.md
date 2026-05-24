# Launch runbook

## 1. Supabase production

1. Tao hoac dung project production da link.
2. Chay migration trong `supabase/migrations/20260524_create_videos_metadata.sql`.
3. Nap du lieu khoi tao trong `supabase/seed/20260524_seed_bomtanweb.sql`.
4. Bat Email auth provider.
5. Tao `super_admin` dau tien va row `profiles`.

## 2. Env production

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` hoac `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SECRET_KEY` hoac `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 3. Vercel

1. Link repo vao Vercel.
2. Tao env cho Preview va Production.
3. Gan domain that va bat HTTPS.
4. Deploy preview.
5. Smoke test:
   - `/`
   - `/feed`
   - `/nha-ban`
   - `/gui-nhu-cau`
   - `/gui-nha-ban`
   - `/admin/login`

## 4. Seed du lieu toi thieu

- 5 profiles dang active
- 10 listings approved
- 10 videos approved
- it nhat 1 listing co video gan kem

## 5. Kiem tra sau launch

- Gui 1 buyer lead that
- Gui 1 owner lead that
- Dang nhap admin that
- Duyet 1 video
- Doi trang thai 1 listing
- Phan cong 1 buyer lead

## 6. Rollback

Neu deploy loi:
- rollback deployment tren Vercel
- tam tat traffic form neu API lead gap loi
- giu listing/video approved cu tren Supabase cho den khi deploy on dinh

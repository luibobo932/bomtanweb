# BomTan Video Hub

MVP scaffold cho website bat dong san nha pho theo tu duy video-first.

## Da co trong repo nay

- Trang chu theo huong TikTok cho nha pho
- Feed video
- Kho listing
- Trang chi tiet can nha
- Profile nhan vien / cong tac vien
- Kho kien thuc
- Form nguoi mua gui nhu cau
- Form chu nha gui nha ban
- Admin dashboard shell
- Tai lieu kien truc, schema va roadmap

## Chay local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Mo `http://localhost:3000`

## File can doc truoc

- `docs/architecture.md`
- `docs/schema.md`
- `docs/implementation-roadmap.md`
- `docs/supabase-auth-setup.md`
- `docs/launch-runbook.md`

## Luu y

- Hien tai repo dang dung mock data trong `data/mock-data.ts`
- Neu chua cap env Supabase, app se fallback sang mock data/in-memory cho listing, profile, lead va video de demo flow
- Video MVP nhan `video_url` va/hoac `embed_code` tu TikTok / YouTube / Facebook / CDN, khong upload file vao app
- Admin login that nam o `/admin/login` khi da noi Supabase Auth
- Huong production de xuat: Next.js + Supabase + Vercel

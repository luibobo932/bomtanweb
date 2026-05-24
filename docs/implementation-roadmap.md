# Implementation roadmap

## Phase 0 - Nen

1. Khoa scope MVP: public site + admin shell + RBAC + lead intake
2. Chot schema va source of truth cho status enums
3. Tao Supabase project, env, storage buckets

## Phase 1 - Public MVP

1. Feed video + bo loc
2. Kho listing + chi tiet can nha
3. Profile moi gioi
4. Form buyer / owner lead

## Phase 2 - Admin MVP

1. Dang nhap va phan quyen
2. CRUD listing, video, profiles
3. Queue duyet listing / video
4. Phan cong va cap nhat lead

## Phase 3 - Van hanh

1. Tracking source lead
2. Audit log
3. Dashboard KPI co ban
4. Upload video / thumbnail / gallery

## Phase 4 - Knowledge Hub (Chien luoc tang traffic giai doan dau)

Xem chi tiet: docs/vision.md

1. Schema DB: bang `articles` + bang `influencers`
2. Trang /kien-thuc danh sach bai theo category
3. Trang /kien-thuc/[slug] chi tiet bai viet + related listings tu dong
4. Mo rong trang /doi-ngu/[slug] them phan noi dung tu chuyen gia
5. Admin CRUD articles + gan influencer

## Phase 5 - Engagement & Growth

1. Follow topics / influencers (localStorage -> Supabase)
2. Email digest hang tuan
3. Search toan bo noi dung
4. Related content ("ban doc bai nay cung xem...")
5. Structured data Schema.org cho SEO organic

# Deploy Checklist — NhàPhốSG

Làm theo đúng thứ tự. Đánh dấu [x] từng bước khi hoàn tất.

---

## Bước 1 — Supabase Production

### 1.1 Tạo project
- [ ] Vào [supabase.com](https://supabase.com) → New project
- [ ] Đặt tên: `nhaphosg-prod`, region: Southeast Asia (Singapore)
- [ ] Lưu lại **Database Password** (chỉ hiện 1 lần)

### 1.2 Chạy schema
```sql
-- Chạy trong Supabase SQL Editor theo thứ tự:
-- 1. docs/schema.md (tạo bảng)
-- 2. supabase/seed/ (seed data mẫu nếu cần)
```
- [ ] Tạo bảng: `profiles`, `videos`, `listings`, `buyer_leads`, `owner_leads`, `activity_logs`
- [ ] Tạo bảng: `chat_sessions`, `chat_messages` (cho live chat sau này)

### 1.3 Row Level Security (RLS)
```sql
-- Bật RLS cho tất cả bảng nhạy cảm
ALTER TABLE buyer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Chỉ service_role đọc được leads (không ai đọc từ frontend)
CREATE POLICY "service only" ON buyer_leads
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service only" ON owner_leads
  FOR ALL USING (auth.role() = 'service_role');

-- Videos và listings: public đọc approved
CREATE POLICY "public read approved videos" ON videos
  FOR SELECT USING (approval_status = 'approved');
CREATE POLICY "public read approved listings" ON listings
  FOR SELECT USING (approval_status = 'approved');
```
- [ ] RLS đã bật và test

### 1.4 Tạo admin user
- [ ] Supabase Dashboard → Authentication → Users → Invite user
- [ ] Email admin (email của Duy)
- [ ] Vào bảng `profiles` → thêm record với `role = 'super_admin'`, `id` = UUID của user vừa tạo

### 1.5 Lấy keys
- [ ] Copy **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
- [ ] Copy **anon/public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Copy **service_role key** — chỉ dùng server-side (SUPABASE_SERVICE_ROLE_KEY)

---

## Bước 2 — Resend (Email thông báo lead)

- [ ] Đăng ký tại [resend.com](https://resend.com) — free 3,000 email/tháng
- [ ] Verify domain (thêm DNS record TXT vào domain của bạn)
- [ ] Tạo API Key → copy vào env `RESEND_API_KEY`
- [ ] Set `RESEND_FROM_EMAIL=noreply@tên-domain.com`
- [ ] Set `ADMIN_NOTIFY_EMAIL=email-nhận-thông-báo@gmail.com`
- [ ] Test bằng cách submit 1 buyer lead sau khi deploy

---

## Bước 3 — Tawk.to (Live chat)

- [ ] Đăng ký tại [tawk.to](https://www.tawk.to) — free mãi mãi
- [ ] Tải app Tawk.to trên điện thoại (iOS/Android)
- [ ] Tạo property → đặt tên "NhàPhốSG"
- [ ] Administration → Chat Widget → copy **Property ID** và **Widget ID**
- [ ] Set `NEXT_PUBLIC_TAWKTO_PROPERTY_ID=...`
- [ ] Set `NEXT_PUBLIC_TAWKTO_WIDGET_ID=default`

---

## Bước 4 — Vercel Deployment

### 4.1 Kết nối repo
- [ ] Push code lên GitHub (nếu chưa có remote): `git remote add origin <url>`
- [ ] Vào [vercel.com](https://vercel.com) → Import Git Repository
- [ ] Chọn framework: **Next.js**

### 4.2 Cấu hình Environment Variables
Thêm TẤT CẢ các biến sau vào Vercel → Settings → Environment Variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Site
NEXT_PUBLIC_SITE_URL=https://tên-domain.com

# Zalo
NEXT_PUBLIC_ZALO_URL=https://zalo.me/số-điện-thoại

# Tawk.to
NEXT_PUBLIC_TAWKTO_PROPERTY_ID=xxx
NEXT_PUBLIC_TAWKTO_WIDGET_ID=default

# Email (Resend)
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@tên-domain.com
ADMIN_NOTIFY_EMAIL=email-của-bạn@gmail.com
```

- [ ] Tất cả env vars đã thêm
- [ ] Deploy lần đầu thành công (không có build error)

### 4.3 Kiểm tra build
```bash
# Test local trước khi deploy
npm run build
npm run start
```
- [ ] Build không có error TypeScript
- [ ] Không có warning ESLint

---

## Bước 5 — Domain

- [ ] Mua domain tại Namecheap / GoDaddy / NhânHòa (VN)
- [ ] Vercel → Settings → Domains → Add domain
- [ ] Trỏ DNS: thêm CNAME record `@` → `cname.vercel-dns.com`
- [ ] Hoặc thêm A record → `76.76.21.21`
- [ ] Chờ SSL tự cấp (~5 phút)
- [ ] Test: `https://tên-domain.com` hiện đúng trang

---

## Bước 6 — Google Search Console

- [ ] Vào [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add property → nhập domain
- [ ] Verify bằng DNS TXT record (thêm vào Namecheap/domain provider)
- [ ] Submit sitemap: `https://tên-domain.com/sitemap.xml`
- [ ] Chờ 3–7 ngày Google index

---

## Bước 7 — Test end-to-end trước khi chia sẻ

Làm hết checklist này trên domain thật:

**Public flow:**
- [ ] Trang chủ load < 3 giây
- [ ] Feed video hiện video, filter hoạt động, "Xem thêm" hoạt động
- [ ] Trang `/nha-ban` filter theo quận + giá hoạt động
- [ ] Trang chi tiết listing có đầy đủ thông tin
- [ ] Form `/gui-nhu-cau`: submit → success screen → admin nhận email
- [ ] Form `/gui-nha-ban`: submit → success screen → admin nhận email
- [ ] Zalo button hoạt động (mở đúng Zalo)
- [ ] Tawk.to chat widget hiện ở góc phải
- [ ] Test trên điện thoại: mobile nav hamburger hoạt động

**Admin flow:**
- [ ] `/admin/login` hiện form đăng nhập
- [ ] Đăng nhập bằng email admin đã tạo ở Bước 1.4
- [ ] Xem được danh sách leads mới
- [ ] Duyệt video/listing thành công
- [ ] Đăng xuất hoạt động

**SEO:**
- [ ] `https://tên-domain.com/sitemap.xml` trả về XML hợp lệ
- [ ] `https://tên-domain.com/robots.txt` trả về đúng
- [ ] Share link lên Facebook → hiện OG image đúng
- [ ] Share link lên Zalo → hiện preview đúng

---

## Bước 8 — Sau khi go-live

Làm trong tuần đầu:
- [ ] Post lên Facebook/Zalo cá nhân giới thiệu web
- [ ] Nhờ 5–10 người test và submit lead thử
- [ ] Kiểm tra Vercel Analytics xem traffic từ đâu
- [ ] Kiểm tra Tawk.to — có ai chat chưa
- [ ] Đăng listing thật đầu tiên qua Admin Dashboard

---

## Tham khảo nhanh

| Service | URL | Dùng cho |
|---------|-----|----------|
| Supabase | supabase.com | Database + Auth |
| Vercel | vercel.com | Deploy + Hosting |
| Resend | resend.com | Email thông báo |
| Tawk.to | tawk.to | Live chat |
| Search Console | search.google.com/search-console | SEO Google |
| Vercel Analytics | vercel.com/analytics | Traffic stats |

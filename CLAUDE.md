# BomTan Web — Hướng dẫn cho AI Agent

## Bạn đang làm việc với dự án gì?

**BomTan Web** là nền tảng video bất động sản nhà phố tại TP.HCM.
Chủ dự án: Duy (trandangrice@gmail.com)
Stack: Next.js 16 App Router + Supabase + Tailwind CSS 4 + TypeScript

---

## Tâm huyết & Mục đích tạo ra web này

### 1. Vấn đề thị trường mà web này giải quyết

Khách hàng có nhu cầu mua nhà phố tại TP.HCM hiện nay rất khó tiếp cận thông tin **thực chất, trung thực**. Thị trường tràn ngập quảng cáo thiếu minh bạch, còn kiến thức thực sự về mua nhà (pháp lý, định giá, chọn hướng, thương lượng...) nằm rải rác khắp nơi, khó tìm, khó theo dõi.

### 2. Chiến lược tăng traffic giai đoạn đầu — Knowledge Hub

Chủ dự án có ý tưởng cốt lõi:
> **Hệ thống hóa kiến thức chia sẻ của các influencer về bất động sản — trình bày dễ xem, dễ theo dõi — để web trở thành nơi cung cấp thông tin giá trị nhất cho người có nhu cầu mua nhà.**

Cụ thể:
- Thu thập và tổng hợp nội dung từ các influencer BDS có uy tín (TikTok, YouTube, Facebook)
- Hệ thống hóa theo chủ đề: pháp lý, định giá, khu vực, phong thủy, tài chính...
- Người dùng có thể **theo dõi chủ đề** hoặc **theo dõi influencer** mình tin tưởng
- Mỗi bài kiến thức đều được gắn tag quận/loại nhà để liên kết tự nhiên sang listing thật
- Nội dung giá trị → SEO organic → traffic → leads → doanh thu

Đây không chỉ là trang listing nhà — **đây là trung tâm kiến thức mua nhà tại TP.HCM.**

### 3. Flywheel (vòng lặp tăng trưởng) của web

```
Nội dung kiến thức giá trị
        ↓
Người dùng tìm thấy qua SEO / mạng xã hội
        ↓
Xem video review nhà thật từ đội ngũ BomTan
        ↓
Thấy listing phù hợp → gửi yêu cầu tư vấn (lead)
        ↓
Được tư vấn bởi chuyên gia → tin tưởng → giao dịch
        ↓
Đội ngũ chia sẻ thêm kiến thức từ kinh nghiệm thực tế (lặp lại)
```

### 4. Điểm khác biệt so với các trang BDS thông thường

| Trang BDS thường | BomTan Web |
|------------------|------------|
| Đăng tin quảng cáo | Video review trung thực từ chuyên gia |
| Thông tin sơ sài | Kiến thức chuyên sâu có hệ thống |
| Khách hàng thụ động | Khách hàng theo dõi, học hỏi, tự tin hơn khi mua |
| Lead lạnh, không có context | Lead ấm — khách đã đọc/xem nhiều nội dung trước |

---

## Kiến trúc kỹ thuật tóm tắt

```
app/                  - Next.js App Router pages
  feed/               - Video feed (TikTok-style filtering)
  nha-ban/            - Danh sách & chi tiết listing
  doi-ngu/[slug]      - Profile chuyên gia
  kien-thuc/          - Knowledge hub (đang phát triển)
  gui-nhu-cau/        - Form buyer lead
  gui-nha-ban/        - Form owner lead
  admin/              - Admin CRM (yêu cầu Supabase auth)

components/           - React components
lib/                  - Business logic & repositories
data/mock-data.ts     - Types + seed data (single source of truth)
middleware.ts         - Rate limiting cho public APIs
```

## Trạng thái hiện tại (tính đến 2026-05-24)

- Phase 0, 1, 2 đã hoàn thiện (public site + admin CRM)
- Đã fix các vấn đề bảo mật: auth demo mode, input validation (Zod), rate limiting, error boundaries
- Phase 3 (vận hành): upload media, email notification, analytics
- Phase 4 (Knowledge Hub): đang lên kế hoạch — xem `docs/vision.md`

## Kênh liên hệ khách hàng

| Kênh | Component | Env var cần thiết |
|------|-----------|-------------------|
| Zalo | `components/zalo-cta.tsx` (floating button) | `NEXT_PUBLIC_ZALO_URL` |
| Live chat | `components/live-chat.tsx` (Tawk.to widget) | `NEXT_PUBLIC_TAWKTO_PROPERTY_ID` + `NEXT_PUBLIC_TAWKTO_WIDGET_ID` |

Tawk.to setup: đăng ký tại tawk.to → tạo property → copy Property ID và Widget ID vào env.
Admin nhận tin nhắn qua app Tawk.to trên điện thoại (iOS/Android).

## Lưu ý quan trọng khi làm việc với codebase này

1. **Không bao giờ** bỏ Supabase env trên production — auth sẽ throw error
2. Runtime mock stores (`runtimeVideos`, `runtimeListings`...) chỉ hoạt động ở dev — không persist trên serverless
3. Mọi input từ user phải qua Zod schema trong `lib/validation.ts`
4. UI dùng dark theme: màu nền `#0a0a0a`, brand orange `#d84e1e`, utility classes trong `globals.css`
5. Text hiển thị cho user là tiếng Việt; code/variable names là tiếng Anh
6. Xem `docs/` để biết schema DB, auth setup, và runbook deploy

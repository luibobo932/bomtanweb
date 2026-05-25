# Prompt rebuild NhàPhốSG

---

Xây dựng cho tôi một nền tảng web bất động sản nhà phố tại TP.HCM tên là **NhàPhốSG**.

---

## Ý tưởng cốt lõi

Đây **không phải** trang đăng tin mua bán nhà thông thường.

Đây là **trung tâm kiến thức + video review trung thực** cho người có nhu cầu mua nhà phố tại TP.HCM. Người dùng vào đây để học, để xem video review nhà thật từ chuyên gia, và khi sẵn sàng thì liên hệ tư vấn — không bị ép mua, không quảng cáo lố.

**Vấn đề thị trường đang giải quyết:**
- Người mua nhà không biết tin ai vì môi giới hay tô vẽ
- Kiến thức thực về pháp lý, định giá, chọn khu vực nằm rải rác trên TikTok/YouTube
- Không có nơi nào tổng hợp video review nhà thật, trung thực, có hệ thống

---

## Tính năng chính

### 1. Video Feed
Trang xem video review nhà phố — giống TikTok nhưng trên web. Mỗi video gắn với một căn nhà thật: quận, loại nhà, giá, tên chuyên gia review. Người dùng lọc theo quận, loại nhà, khoảng giá. Video nhúng từ TikTok/YouTube/Facebook.

### 2. Listings — Nhà đang bán
Danh sách nhà phố đang bán thật sự. Mỗi listing có: địa chỉ, giá, diện tích, pháp lý, ai phụ trách, điểm mạnh, lưu ý, và video review liên quan (nếu có). Có trang chi tiết đầy đủ cho từng căn.

### 3. Đội ngũ chuyên gia
Trang giới thiệu các chuyên gia trong team. Mỗi người có profile riêng: chuyên quận nào, phân khúc nào, thành tích, liên hệ Zalo. Khách hàng có thể chọn chuyên gia phù hợp để liên hệ.

### 4. Kho kiến thức
Các bài viết/video kiến thức được hệ thống hóa theo chủ đề: pháp lý, định giá, chọn khu vực, tài chính, kỹ năng thương lượng. Nội dung lấy từ các chuyên gia và influencer BDS uy tín.

### 5. Form gửi nhu cầu (cho người mua)
Người có nhu cầu mua nhà điền form: ngân sách, quận muốn mua, loại nhà, ghi chú. Đội ngũ liên hệ lại trong 2 giờ.

### 6. Form đăng nhà bán (cho chủ nhà)
Chủ nhà muốn bán điền thông tin cơ bản. Đội ngũ xác minh và tư vấn miễn phí.

### 7. Admin CRM (nội bộ)
Trang quản lý nội bộ: xem leads, duyệt video/listing, quản lý hồ sơ chuyên gia. Đăng nhập bằng email/password.

---

## Tech stack

- Next.js App Router + TypeScript
- Supabase (database + auth)
- Tailwind CSS
- Vercel deploy
- Resend (email thông báo khi có lead)

---

## Database đơn giản

5 bảng chính:
- `profiles` — hồ sơ chuyên gia (slug, tên, role, bio, Zalo, chuyên quận, chuyên phân khúc)
- `videos` — video review (slug, title, link video, chuyên gia nào review, gắn listing nào)
- `listings` — nhà đang bán (slug, title, giá, địa chỉ, pháp lý, chuyên gia phụ trách)
- `buyer_leads` — lead người mua (tên, SĐT, ngân sách, quận muốn mua)
- `owner_leads` — lead chủ nhà muốn bán (tên, SĐT, địa chỉ nhà, giá kỳ vọng)

---

## Tone & cảm giác

- Chuyên nghiệp nhưng gần gũi — như người bạn hiểu biết, không phải sales
- Trung thực là ưu tiên số 1: không che nhược điểm, không hoa hồng ẩn
- Target: người có nhu cầu mua nhà phố TP.HCM dưới 20 tỷ, đặc biệt Q1/Q3/Q5/Q10

---

## Yêu cầu

- Text hiển thị cho user là tiếng Việt đầy đủ dấu
- Có trang 404 branded
- Responsive mobile
- SEO metadata cho từng trang listing và profile chuyên gia

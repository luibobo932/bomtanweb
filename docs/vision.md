# Tầm nhìn sản phẩm — BomTan Web

> Tài liệu này ghi lại mục đích, chiến lược, và ý tưởng cốt lõi của dự án.
> Cập nhật khi tầm nhìn thay đổi.

---

## Vấn đề cần giải quyết

Người mua nhà phố tại TP.HCM đối mặt với 3 rào cản lớn:

1. **Thiếu thông tin trung thực** — thị trường tràn quảng cáo, khó biết nhà nào đáng giá
2. **Kiến thức phân tán** — nội dung giá trị (pháp lý, định giá, tài chính) nằm rải rác trên TikTok, YouTube, Facebook, không có nơi tổng hợp
3. **Không biết tin ai** — nhiều môi giới thiếu chuyên nghiệp, khách hàng mất niềm tin

## Giải pháp

BomTan Web là **trung tâm kiến thức + marketplace tin cậy** cho nhà phố TP.HCM:

- Cung cấp kiến thức có hệ thống từ các chuyên gia & influencer uy tín
- Review nhà trung thực bằng video (không quảng cáo lố)
- Kết nối khách hàng đã được giáo dục với đội ngũ tư vấn chuyên sâu

---

## Chiến lược tăng trưởng giai đoạn đầu: Knowledge Hub

### Ý tưởng cốt lõi

> Thu thập, hệ thống hóa, và trình bày kiến thức từ các influencer BDS theo cách dễ theo dõi nhất — để web trở thành nơi người mua nhà ghé thăm thường xuyên, không chỉ khi có nhu cầu cấp bách.

### Tại sao cách này hiệu quả?

- **SEO organic**: Nội dung chất lượng cao → Google index → traffic miễn phí bền vững
- **Trust building**: Người dùng học được điều gì đó → tin tưởng thương hiệu → khi cần mua họ nhớ đến BomTan
- **Lead ấm hơn**: Khách đã xem 10 bài kiến thức trước khi gửi lead → dễ chốt hơn nhiều
- **Viral potential**: Nội dung giá trị được chia sẻ trên Zalo, Facebook groups BDS

### Cấu trúc Knowledge Hub (đề xuất)

```
/kien-thuc
  /phap-ly          - Sổ đỏ, sổ hồng, quy trình sang tên...
  /dinh-gia         - Cách định giá nhà phố, so sánh thị trường
  /tai-chinh        - Vay ngân hàng, lãi suất, tính toán khả năng mua
  /chon-khu-vuc     - Phân tích từng quận: tiện ích, tiềm năng, rủi ro
  /ky-nang-mua      - Thương lượng, check nhà, tránh bẫy môi giới
  /theo-doi/[slug]  - Trang influencer: tổng hợp nội dung từ 1 người
```

### Nguồn nội dung

| Nguồn | Cách tích hợp |
|-------|---------------|
| TikTok influencer BDS | Embed video + tóm tắt key takeaways |
| YouTube chuyên gia | Embed + transcript được format đẹp |
| Facebook posts giá trị | Quote + credit nguồn |
| Đội ngũ BomTan tự sản xuất | Bài viết gốc + video review thực tế |

### Hệ thống theo dõi (Follow system)

Người dùng có thể:
- **Theo dõi chủ đề** (pháp lý, quận X, loại nhà Y...) → nhận thông báo khi có nội dung mới
- **Theo dõi influencer/chuyên gia** → xem tất cả nội dung từ người đó
- **Lưu bài** để đọc lại sau

Không cần tài khoản bắt buộc — lưu bằng localStorage trước, nâng lên account sau.

---

## Flywheel tăng trưởng

```
1. CONTENT
   Kiến thức chất lượng cao được hệ thống hóa
        ↓
2. DISCOVERY
   SEO organic + share trên mạng xã hội
        ↓
3. ENGAGEMENT
   Người dùng theo dõi, đọc nhiều bài, xem video
        ↓
4. TRUST
   BomTan trở thành nguồn thông tin đáng tin cậy
        ↓
5. CONVERSION
   Khi có nhu cầu thật → gửi lead, liên hệ đội ngũ
        ↓
6. TRANSACTION
   Giao dịch thành công → đội ngũ có thêm kinh nghiệm thực tế
        ↓
   (Kinh nghiệm → tạo thêm content → lặp lại từ bước 1)
```

---

## Điểm khác biệt (Unique Value Proposition)

**"BomTan là người bạn hiểu biết nhất trong hành trình mua nhà của bạn."**

Không phải trang đăng tin. Không phải môi giới truyền thống.
Là nơi bạn học, hiểu, và tự tin hơn trước khi đưa ra quyết định lớn nhất cuộc đời.

---

## Các tính năng cần xây dựng (Knowledge Hub)

### MVP Knowledge Hub (Phase 4)

- [ ] Schema DB: bảng `articles` (title, slug, body_mdx, category, tags, source_url, source_type, influencer_id, published_at)
- [ ] Bảng `influencers` (name, slug, platform, profile_url, avatar_url, bio, follower_count, specialty)
- [ ] Trang `/kien-thuc` — danh sách bài theo category
- [ ] Trang `/kien-thuc/[slug]` — chi tiết bài viết + related listings
- [ ] Trang `/doi-ngu/[slug]` mở rộng thêm phần "Nội dung từ chuyên gia này"
- [ ] Tag-linking: bài kiến thức về quận X → tự hiển thị listing ở quận X
- [ ] Admin: CRUD articles + link influencer

### Nâng cao (Phase 5)

- [ ] Follow topics / influencers (localStorage → Supabase account)
- [ ] Email digest: "5 bài kiến thức mới tuần này"
- [ ] Search toàn bộ nội dung
- [ ] "Bạn đọc bài này cũng xem..." — related content
- [ ] Structured data (Schema.org Article) cho SEO

---

## KPIs theo dõi

| Giai đoạn | Chỉ số | Mục tiêu 3 tháng đầu |
|-----------|--------|----------------------|
| Traffic | Unique visitors/tháng | 1,000+ |
| Engagement | Avg. pages/session | 3+ |
| Lead | Leads/tháng | 20+ |
| Quality | Lead-to-consultation rate | 40%+ |
| Content | Bài kiến thức published | 50+ |

export type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  authorSlug: string;
  readMinutes: number;
  district: string;
  featured: boolean;
  content: string;
};

export const TOPIC_TAGS = ["Tất cả", "Pháp lý", "Định giá", "Khu vực", "Tài chính", "Phong thủy"] as const;
export type TopicTag = (typeof TOPIC_TAGS)[number];

export const tagColors: Record<string, string> = {
  "Pháp lý": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Định giá": "bg-green-500/10 text-green-400 border-green-500/30",
  "Tài chính": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Phong thủy": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Khu vực": "bg-orange-500/10 text-[var(--brand)] border-[var(--brand)]/30",
};

export const articles: ArticleItem[] = [
  {
    slug: "kinh-nghiem-mua-nha-pho",
    title: "Kinh nghiệm mua nhà phố — những điều cần biết trước khi xuống cọc",
    excerpt: "Từ người đã mua nhà thực tế tại Q1, Q3, Q5 — các bẫy phổ biến và cách tránh.",
    tag: "Pháp lý",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 5,
    district: "Quận 3",
    featured: true,
    content: `Mua nhà phố tại TP.HCM là quyết định tài chính lớn nhất của nhiều gia đình. Sau nhiều năm tư vấn thực tế, tôi tổng hợp lại những bẫy phổ biến nhất mà người mua hay gặp phải.

## 1. Không kiểm tra quy hoạch trước khi đặt cọc

Nhiều người bị "sốc" sau khi ký hợp đồng mới phát hiện căn nhà nằm trong diện giải tỏa hoặc lộ giới. Hãy tra bản đồ quy hoạch 1/2000 tại Sở Quy hoạch - Kiến trúc TP.HCM trước khi xuống cọc bất kỳ khoản tiền nào.

## 2. Tin vào "sổ hồng" mà không kiểm tra thực tế

Sổ hồng cần được đối chiếu với thực địa: diện tích, ranh đất, và các thông tin trên sổ có khớp với căn nhà thực không. Thuê luật sư hoặc công chứng viên để kiểm tra là đáng tiền nhất.

## 3. Bỏ qua kiểm tra kết cấu

Nhà phố cũ tại TP.HCM nhiều căn có vấn đề về móng, dầm, sàn. Chi phí sửa kết cấu thường cao gấp 3-5 lần chi phí hoàn thiện. Bỏ 1-2 triệu thuê kỹ sư xây dựng kiểm tra là đầu tư xứng đáng.

## 4. Không thương lượng vì "sợ mất nhà"

Giá chào và giá thực luôn có khoảng cách. Ở thị trường hiện tại, mức thương lượng 3-7% là bình thường. Đừng sợ hỏi — môi giới tốt sẽ giúp bạn thương lượng đúng cách.

## Checklist trước khi đặt cọc

- [ ] Đã tra quy hoạch 1/2000
- [ ] Đã xem sổ gốc và đối chiếu thực địa
- [ ] Đã kiểm tra không có tranh chấp, thế chấp
- [ ] Đã hỏi về nghĩa vụ tài chính (thuế, phí)
- [ ] Đã có hợp đồng đặt cọc rõ ràng điều khoản`,
  },
  {
    slug: "checklist-truoc-khi-dat-coc",
    title: "Checklist 15 điểm trước khi đặt cọc — pháp lý, kết cấu, quy hoạch",
    excerpt: "15 điểm kiểm tra pháp lý, kết cấu và quy hoạch để không mất tiền oan khi mua nhà phố.",
    tag: "Pháp lý",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 7,
    district: "Quận 10",
    featured: false,
    content: `Đây là danh sách 15 điểm tôi luôn kiểm tra trước khi tư vấn khách hàng xuống cọc bất kỳ căn nhà phố nào tại TP.HCM.

## Nhóm Pháp lý (6 điểm)

**1. Kiểm tra sổ hồng/sổ đỏ gốc** — Không chấp nhận bản photocopy. Xem sổ gốc, đối chiếu thông tin chủ sở hữu.

**2. Tra cứu thông tin thế chấp** — Liên hệ văn phòng đăng ký đất đai để biết căn nhà có đang thế chấp ngân hàng không.

**3. Kiểm tra tranh chấp** — Hỏi UBND phường về tình trạng tranh chấp, khiếu kiện liên quan đến thửa đất.

**4. Xác nhận quy hoạch 1/2000** — Tra tại Sở Quy hoạch hoặc qua app iHanoi/HCMGIS.

**5. Kiểm tra lộ giới đường** — Xem bản đồ giao thông để biết đường trước nhà có bị mở rộng không.

**6. Xác minh nghĩa vụ tài chính** — Hỏi về thuế đất còn nợ, phí cấp sổ, tiền sử dụng đất chưa nộp.

## Nhóm Kết cấu (5 điểm)

**7. Kiểm tra móng và tầng hầm** — Dấu hiệu nứt, thấm, sụt lún là cờ đỏ.

**8. Kiểm tra hệ thống điện** — Tuổi thọ dây điện, công suất cầu dao, tiêu chuẩn an toàn.

**9. Kiểm tra hệ thống nước** — Áp suất, đường ống, bể phốt, khả năng thoát nước.

**10. Đánh giá kết cấu chịu lực** — Dầm, cột, sàn. Thuê kỹ sư nếu nhà trên 20 năm tuổi.

**11. Kiểm tra mái và thấm dột** — Đặc biệt quan trọng với nhà cấp 4 và nhà có sân thượng cải tạo.

## Nhóm Thực tế (4 điểm)

**12. Đo đạc thực tế** — Diện tích thực thường nhỏ hơn số liệu trên sổ 5-10%.

**13. Khảo sát hàng xóm** — Hỏi về an ninh, ngập lụt, tiếng ồn, tranh chấp ranh giới.

**14. Kiểm tra ngập lụt** — Hỏi người dân địa phương về tình trạng ngập theo mùa mưa.

**15. Định giá thị trường** — So sánh 3-5 căn tương tự đã giao dịch trong 6 tháng gần nhất.`,
  },
  {
    slug: "hem-xe-hoi-vs-mat-tien",
    title: "Hẻm xe hơi, hẻm ba gác, mặt tiền — giá trị và thanh khoản khác nhau thế nào?",
    excerpt: "Phân tích giá trị và thanh khoản của từng loại hẻm theo từng quận. Mua loại nào có lợi hơn?",
    tag: "Định giá",
    author: "Phạm Bảo Long",
    authorSlug: "bao-long",
    readMinutes: 6,
    district: "Quận 5",
    featured: true,
    content: `Một trong những câu hỏi phổ biến nhất tôi nhận được: "Mua nhà hẻm hay mặt tiền tốt hơn?" Câu trả lời phụ thuộc vào mục đích mua và quận bạn nhắm đến.

## Phân loại đường và hẻm tại TP.HCM

| Loại | Chiều rộng | Đặc điểm |
|------|-----------|-----------|
| Mặt tiền đường lớn | >10m | Giá cao nhất, thanh khoản tốt nhất |
| Mặt tiền đường nhỏ | 6-10m | Cân bằng giữa giá và tiện ích |
| Hẻm xe hơi | 3.5-6m | Phổ biến nhất, giá hợp lý |
| Hẻm ba gác | 2-3.5m | Hạn chế xe tải, giá thấp hơn 15-25% |
| Hẻm nhỏ | <2m | Chỉ phù hợp ở, thanh khoản thấp |

## Chênh lệch giá thực tế tại các quận

**Quận 3:** Mặt tiền so với hẻm xe hơi cùng đường thường chênh 40-60%. Hẻm xe hơi Quận 3 vẫn rất thanh khoản vì nhu cầu ở cao.

**Quận 5:** Mặt tiền chạy dọc tuyến đường thương mại (Trần Hưng Đạo, Châu Văn Liêm) chênh 2-3 lần so với hẻm. Nhưng hẻm xe hơi Quận 5 có tỷ suất cho thuê tốt hơn do người Hoa thích khu cộng đồng.

**Quận 10:** Khoảng cách giá mặt tiền/hẻm ít hơn, hẻm xe hơi được ưa chuộng cho mục đích ở thuần túy.

## Khuyến nghị theo mục đích

**Ở thuần túy:** Hẻm xe hơi là lựa chọn tốt nhất. Yên tĩnh hơn, giá hợp lý hơn, đủ tiện nghi.

**Kinh doanh/cho thuê thương mại:** Mặt tiền là bắt buộc. Premium giá là chi phí kinh doanh.

**Đầu tư dài hạn:** Hẻm xe hơi ở các quận trung tâm (Q1, Q3) có tỷ suất sinh lời tốt hơn mặt tiền nhờ giá vốn thấp hơn.

**Cho thuê nhà ở:** Hẻm xe hơi tại Q3, Q10 có vacancy rate thấp và yield ổn định 4-6%/năm.`,
  },
  {
    slug: "cach-dinh-gia-nha-dong-tien",
    title: "Cách định giá nhà và đọc dòng tiền — công thức tính lợi suất cho thuê",
    excerpt: "Công thức định giá nhanh và cách tính lợi suất cho thuê để biết mua có lời không.",
    tag: "Tài chính",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 8,
    district: "Quận 10",
    featured: false,
    content: `Định giá nhà là kỹ năng quan trọng nhất khi mua nhà phố. Bài này tôi chia sẻ công thức thực tế, không phải lý thuyết.

## Công thức định giá nhanh

### Phương pháp so sánh (áp dụng được ngay)

**Bước 1:** Tìm 3-5 căn tương tự đã giao dịch thực trong 6 tháng gần nhất tại cùng khu vực.

**Bước 2:** Tính giá/m² = Giá giao dịch ÷ Diện tích sử dụng

**Bước 3:** Điều chỉnh theo các yếu tố:
- Mặt tiền vs hẻm: ±30-50%
- Tầng (nhà phố): tầng 1 = 100%, tầng 2 = 70%, tầng 3 = 50%
- Hướng: Nam/Đông Nam = chuẩn, Tây = -5%, Bắc = -3%
- Pháp lý: Sổ hồng đầy đủ = chuẩn, giấy tay = -20-30%

## Công thức tính lợi suất cho thuê (Rental Yield)

**Gross Yield** = (Tiền thuê/tháng × 12) / Giá mua × 100%

**Net Yield** = (Tiền thuê - Chi phí vận hành) × 12 / Giá mua × 100%

**Ví dụ thực tế:**
- Nhà Q10, hẻm xe hơi, 4x15m = 60m², 4 tầng
- Giá mua: 8 tỷ
- Cho thuê: 25 triệu/tháng (toàn bộ)
- Chi phí: 2 triệu/tháng (bảo trì, thuế, môi giới tìm khách)

**Kết quả:** Gross Yield = (25 × 12) / 8,000 × 100% = 3.75% | Net Yield = ((25-2) × 12) / 8,000 × 100% = 3.45%

## Ngưỡng lợi suất nên kỳ vọng

| Loại nhà | Gross Yield tốt | Ghi chú |
|----------|----------------|---------|
| Nhà ở hẻm | 4-6% | Khó đạt do giá đất cao |
| Nhà thương mại mặt tiền | 3-5% | Ổn định hơn, ít rủi ro trống |
| Shophouse | 5-7% | Cao hơn nhưng rủi ro kinh doanh |

**Lưu ý quan trọng:** Ở TP.HCM, yield 4-5% đã là tốt. Nhiều căn chỉ 2-3% nhưng người mua chấp nhận vì kỳ vọng tăng giá đất dài hạn.

## Khi nào không nên mua?

- Giá chào cao hơn 15% so với giá thị trường tương đương
- Yield dưới 2.5% mà không có lý do tăng giá rõ ràng
- Chi phí sửa chữa kết cấu ước tính >10% giá mua`,
  },
  {
    slug: "kiem-tra-quy-hoach-truoc-khi-mua",
    title: "Cách kiểm tra quy hoạch trước khi mua — tra quy hoạch 1/2000 trực tuyến",
    excerpt: "Hướng dẫn từng bước tra quy hoạch — tránh mua phải đất dính quy hoạch.",
    tag: "Pháp lý",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 4,
    district: "Quận 1",
    featured: false,
    content: `Kiểm tra quy hoạch là bước bắt buộc trước khi mua bất kỳ bất động sản nào tại TP.HCM. Dưới đây là hướng dẫn cụ thể, từng bước.

## Tại sao phải kiểm tra quy hoạch?

Đất dính quy hoạch sẽ không được cấp phép xây mới, không được sang tên, và có thể bị thu hồi với giá đền bù thấp hơn thị trường. Nhiều người mua nhà rẻ mà không biết lý do "rẻ" là vì quy hoạch.

## Cách 1: Tra trực tuyến (HCMGIS)

**Bước 1:** Truy cập trang web của Sở Quy hoạch-Kiến trúc TP.HCM hoặc ứng dụng HCMGIS

**Bước 2:** Tìm kiếm địa chỉ hoặc zoom đến vị trí cần tra

**Bước 3:** Bật layer "Quy hoạch sử dụng đất" hoặc "Quy hoạch xây dựng"

**Bước 4:** Nhấn vào thửa đất để xem thông tin: loại đất, ký hiệu quy hoạch, lộ giới

## Cách 2: Đến trực tiếp UBND Phường

Yêu cầu xác nhận thông tin quy hoạch bằng văn bản. Đây là cách chính thức và có giá trị pháp lý nhất. Mang theo:
- Bản photocopy sổ hồng/sổ đỏ
- Giấy tờ tùy thân
- Đơn xin xác nhận quy hoạch

## Giải mã ký hiệu quy hoạch

| Ký hiệu | Ý nghĩa | Có thể xây? |
|---------|---------|------------|
| ODT | Đất ở đô thị | ✅ Có |
| TM | Đất thương mại dịch vụ | ✅ Có (điều kiện) |
| CC | Công trình công cộng | ❌ Không |
| GT | Giao thông | ❌ Không |
| CX | Công viên, cây xanh | ❌ Không |
| CN | Công nghiệp | ⚠️ Hạn chế |

## Dấu hiệu nhà bị quy hoạch

- Không có sổ hồng riêng (chung với đất lớn)
- Giấy phép xây dựng từ >20 năm trước không được gia hạn
- Nhà cấp 4 tạm trong khu vực đang phát triển
- Chênh lệch giá bất thường (quá rẻ so với xung quanh)`,
  },
  {
    slug: "so-hong-so-do-rui-ro-phap-ly",
    title: "Sổ hồng, sổ đỏ, giấy tờ tay — rủi ro nào cần tránh và khi nào cần luật sư",
    excerpt: "Phân biệt các loại giấy tờ nhà đất và cách đọc sổ để không bị lừa khi giao dịch.",
    tag: "Pháp lý",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 9,
    district: "Quận 3",
    featured: false,
    content: `Trong thực tế tư vấn, tôi gặp rất nhiều trường hợp người mua bị thiệt hại do không hiểu rõ về các loại giấy tờ nhà đất. Bài này giải thích chi tiết và thực tế.

## Phân biệt các loại giấy tờ

### Sổ hồng (Giấy chứng nhận quyền sử dụng đất + quyền sở hữu nhà ở)
- Màu hồng đỏ (mẫu mới từ 2009)
- Là loại giấy tờ đầy đủ nhất, được cấp cho nhà ở
- An toàn nhất để giao dịch

### Sổ đỏ (Giấy chứng nhận quyền sử dụng đất)
- Màu đỏ (mẫu cũ trước 2009)
- Chỉ chứng nhận quyền sử dụng đất, không bao gồm công trình trên đất
- Cần kiểm tra thêm giấy phép xây dựng

### Giấy tờ tay
- Hợp đồng mua bán, giấy viết tay chưa được công chứng
- Rủi ro rất cao: có thể bị bán cho nhiều người, tranh chấp không có căn cứ pháp lý
- Chỉ chấp nhận nếu biết rõ lý do và có luật sư hỗ trợ

## Cách đọc sổ hồng

**Thông tin quan trọng cần kiểm tra:**

1. **Tên chủ sở hữu** — Phải khớp với người bán và CMND/CCCD
2. **Số thửa, số tờ bản đồ** — Để đối chiếu với bản đồ thực địa
3. **Diện tích đất** — Đôi khi khác diện tích xây dựng thực tế
4. **Mục đích sử dụng đất** — ODT (ở đô thị), TM (thương mại)...
5. **Thời hạn sử dụng** — Đất ở thường là lâu dài
6. **Ghi chú/hạn chế** — Đây là phần quan trọng nhất!

## Khi nào cần luật sư?

✅ **Bắt buộc cần luật sư khi:**
- Giao dịch >5 tỷ đồng
- Nhà có tranh chấp thừa kế
- Giấy tờ không đầy đủ hoặc có điểm nghi ngờ
- Nhà đang thế chấp ngân hàng
- Nhiều đồng sở hữu

⚠️ **Nên tư vấn luật sư khi:**
- Mua nhà cũ từ 1975-1990 (phức tạp về nguồn gốc đất)
- Người bán ủy quyền cho bên thứ ba
- Nhà chưa có giấy phép xây dựng

## Chi phí thuê luật sư

Thông thường 3-10 triệu đồng cho một giao dịch nhà ở. Đây là chi phí xứng đáng so với rủi ro mất hàng tỷ đồng.`,
  },
  {
    slug: "phong-thuy-nha-pho-co-dang-quan-tam",
    title: "Phong thủy nhà phố — có đáng quan tâm không và những điểm nào thực sự ảnh hưởng giá trị?",
    excerpt: "Góc nhìn thực tế từ chuyên gia: yếu tố phong thủy nào được người mua để ý và ảnh hưởng đến giá.",
    tag: "Phong thủy",
    author: "Phạm Bảo Long",
    authorSlug: "bao-long",
    readMinutes: 5,
    district: "Quận 5",
    featured: false,
    content: `Phong thủy là chủ đề nhạy cảm nhưng thực tế nó ảnh hưởng đến giá nhà và thanh khoản — bất kể bạn tin hay không. Đây là góc nhìn thực dụng từ thực tế thị trường.

## Phong thủy ảnh hưởng đến giá như thế nào?

Đơn giản nhất: phong thủy ảnh hưởng đến số lượng người mua quan tâm. Càng ít người quan tâm → thanh khoản thấp hơn → giá thấp hơn.

Tại TP.HCM, khoảng 60-70% người mua (theo khảo sát không chính thức của nhóm tư vấn) có ít nhất một tiêu chí phong thủy khi chọn nhà.

## Các yếu tố phong thủy ảnh hưởng rõ nhất đến giá

### 1. Hướng nhà
- Hướng Nam và Đông Nam: được ưa chuộng nhất, không có tác động tiêu cực
- Hướng Đông: chấp nhận được
- Hướng Tây: nhiều người kiêng (-3-5% giá theo khảo sát)
- Hướng Bắc: ít người thích ở TP.HCM (-2-4%)

### 2. Đối diện ngã ba, ngõ cụt
Nhà đối diện ngã ba "đâm thẳng vào mặt tiền" hoặc cuối ngõ cụt: một số người rất kiêng. Ảnh hưởng thanh khoản nhiều hơn là giá.

### 3. Số tầng lẻ/chẵn
Ít ảnh hưởng đến đa số người mua nhưng với người kinh doanh, số tầng đôi khi là tiêu chí.

### 4. Gần nghĩa trang, bệnh viện
Ảnh hưởng thực tế và đáng kể, giảm 10-20% so với khu tương đương không gần các công trình này.

## Quan điểm thực dụng

Nếu bạn mua để ở: chọn hướng nhà phù hợp khí hậu TP.HCM (Nam/Đông Nam để tránh nắng Tây buổi chiều) là đúng cả về phong thủy lẫn thực tế.

Nếu mua để đầu tư: chú ý nhiều hơn đến việc tránh các điều kiêng phổ biến để không bị hạn chế thanh khoản khi bán lại.

Đừng trả giá cao hơn 5% chỉ vì "hướng tốt" nếu các yếu tố khác không tốt bằng.`,
  },
  {
    slug: "tong-quan-gia-nha-quan-1-q3-q5",
    title: "Tổng quan giá nhà Q1, Q3, Q5 năm 2026 — mua khu nào có lợi nhất?",
    excerpt: "So sánh giá thực tế từng khu vực, xu hướng giá và lý do người mua ở nên chọn Q3.",
    tag: "Khu vực",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 6,
    district: "Quận 1",
    featured: true,
    content: `Sau nhiều năm theo dõi thị trường nhà phố tại TP.HCM, đây là tổng quan thực tế về giá và xu hướng tại ba quận trung tâm được nhiều người mua quan tâm nhất.

## Quận 1 — Cao nhất, ít nguồn hàng

**Mức giá hiện tại (giữa 2026):**
- Mặt tiền đường lớn: 400-800 triệu/m²
- Hẻm xe hơi trung tâm: 150-250 triệu/m²
- Hẻm nhỏ: 80-120 triệu/m²

**Nhận xét:** Quận 1 phù hợp cho kinh doanh thương mại hơn là để ở. Nguồn hàng ít, thanh khoản cao nhưng yield cho thuê thấp (1.5-2.5%) do giá đất quá cao.

## Quận 3 — Cân bằng tốt nhất

**Mức giá hiện tại:**
- Mặt tiền đường lớn: 150-300 triệu/m²
- Hẻm xe hơi tốt: 80-120 triệu/m²
- Hẻm nhỏ: 50-70 triệu/m²

**Nhận xét:** Quận 3 là lựa chọn tốt nhất cho người mua ở kết hợp đầu tư. Cơ sở hạ tầng tốt, gần trung tâm, yield cho thuê 3-5% — cao nhất trong ba quận này.

**Khu vực nên chú ý:** Đường Võ Thị Sáu, Trần Quý Cáp, hẻm Pasteur. Tránh những hẻm sâu phía sau đường Nguyễn Thị Minh Khai (tiếng ồn lớn).

## Quận 5 — Cộng đồng ổn định, giá hợp lý

**Mức giá hiện tại:**
- Mặt tiền đường thương mại: 100-200 triệu/m²
- Hẻm xe hơi: 60-90 triệu/m²
- Hẻm nhỏ: 35-55 triệu/m²

**Nhận xét:** Quận 5 có cộng đồng người Hoa ổn định, nhu cầu thuê nhà để kinh doanh cao. Giá thấp hơn Q3 cùng diện tích, yield tốt nếu có mặt bằng kinh doanh.

## So sánh tổng hợp

| Tiêu chí | Quận 1 | Quận 3 | Quận 5 |
|----------|--------|--------|--------|
| Giá/m² trung bình | 200+ tr | 100 tr | 70 tr |
| Yield cho thuê | 1.5-2.5% | 3-5% | 3-4.5% |
| Thanh khoản | Cao | Rất cao | Trung bình |
| Phù hợp ở | Không | ✅ Tốt | ✅ Tốt |
| Phù hợp KD | ✅ Tốt | Trung bình | ✅ Tốt |

## Khuyến nghị 2026

Với ngân sách 8-12 tỷ: **Quận 3, hẻm xe hơi** là lựa chọn tốt nhất. Tìm hẻm thông, diện tích 40-60m², 3-4 tầng.

Với ngân sách 5-8 tỷ: **Quận 5, hẻm xe hơi** gần các trục thương mại. Ưu tiên có mặt bằng kinh doanh tầng trệt.`,
  },
];

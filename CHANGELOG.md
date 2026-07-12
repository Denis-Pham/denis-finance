# Changelog — denis-finance

> **Quy ước cho AI agents (Claude, Hermes):**
> 1. ĐỌC file này trước khi sửa bất kỳ thứ gì; ghi entry mới sau khi sửa xong.
> 2. KHÔNG dùng iframe YouTube (Error 153) — video chỉ render thumbnail `i.ytimg.com` + link (component `VideoCard.astro`).
> 3. Brand/tên kênh đổi ở `src/config/site.ts`; màu & token ở `src/styles/global.css` (gold chỉ dành cho CTA chính).
> 4. Chủ đề = file json trong `src/content/topics/` (mỗi chủ đề map 1 playlist YouTube); bài viết = markdown trong `src/content/posts/`.
> 5. Code nằm ở `D:\claude agent\denis-finance` (npm không chạy trên Google Drive). Không commit `dist/`, `node_modules/`.

## [0.1.4] — 2026-07-14

- Thêm chủ đề **Tài chính đời thực** (`tai-chinh-doi-thuc`) — điều chỉnh công thức tiền bạc theo những hoàn cảnh sống rất Việt Nam.
- Thêm bài **Đủ tiền mua nhà chưa phải đủ tiền sống trong căn nhà** (`du-tien-mua-nha-chua-phai-du-tien-song`).
- Thêm bài **Nuôi con theo từng giai đoạn, lập quỹ giáo dục từ sớm** (`nuoi-con-theo-giai-doan-va-quy-giao-duc`).
- Thêm bài **Hỗ trợ cha mẹ trong ngân sách gia đình: chủ động để cùng nhẹ lòng** (`ho-tro-cha-me-trong-ngan-sach-gia-dinh`).
- Thêm bài **Chậm một nhịp trước lừa đảo tài chính** (`cham-mot-nhip-truoc-lua-dao-tai-chinh`).
- Ảnh minh họa `topic-tai-chinh-doi-thuc.png` (hoa sen vàng + lá emerald, gpt-image-2 qua container hermes) + icon fallback hoa sen trong `TopicCard.astro` + job regenerate trong `tools/gen-images.mjs`.

## [0.1.3] — 2026-07-13

- Thêm chủ đề **Bảo hiểm – Thuế – Hưu trí** (`bao-hiem-thue-huu-tri`) — lớp phòng vệ hiện tại và kế hoạch tài chính dài hạn.
- Thêm bài **Ưu tiên bảo hiểm cho gia đình: bảo vệ điều quan trọng trước** (`uu-tien-bao-hiem-cho-gia-dinh`).
- Thêm bài **Chuẩn bị hưu trí từ tuổi 30: thời gian quan trọng hơn khởi đầu lớn** (`chuan-bi-huu-tri-tu-tuoi-30`).
- Ảnh minh họa `topic-bao-hiem-thue-huu-tri.png` (ô dù + đồng hồ cát, gpt-image-2 qua container hermes) + icon fallback ô dù trong `TopicCard.astro` + job regenerate trong `tools/gen-images.mjs`.

## [0.1.2] — 2026-07-13

- Thêm chủ đề **Nợ & Tín dụng** (`no-va-tin-dung`) — chủ đề thứ 6, theo đề xuất taxonomy của Hermes.
- Thêm bài **Ba câu hỏi trước khi vay: nhìn rõ khoản nợ trước khi ký** (`ba-cau-hoi-truoc-khi-vay`).
- Thêm bài **Dùng thẻ tín dụng không rơi vào bẫy: đọc sao kê, trả đúng hạn** (`dung-the-tin-dung-khong-roi-vao-bay`).
- Ảnh minh họa `topic-no-va-tin-dung.png` (gpt-image-2 qua container hermes) + icon fallback thẻ tín dụng trong `TopicCard.astro` + job regenerate trong `tools/gen-images.mjs`.

## [0.1.1] — 2026-07-12

Bổ sung 2 bài viết thực hành:

- **Tự động tiết kiệm ngày nhận lương: trả cho mình trước** — cách chọn tỉ lệ tiết kiệm, chia tài khoản và duy trì lệnh chuyển khi thu nhập biến động.
- **Phân vai vợ chồng khi quản lý tiền chung: rõ việc, không giấu số** — mô hình “một người làm, hai người thấy” với trách nhiệm và quyền quyết định rõ ràng.

## [0.1.0] — 2026-07-12

Khởi tạo site (Claude Code + Hermes):

- Astro 5 static, content collections `topics` (5 chủ đề seed) + `posts` (7 bài seed tiếng Việt).
- Trang: home (hero 3D Three.js — coin vàng + bụi ánh kim, poster fallback), /chu-de/ + trang từng chủ đề (playlist + video + bài viết), /bai-viet/ (lọc theo chủ đề qua `?chu-de=`), bài viết chi tiết (prose + VideoCard + related), /gioi-thieu/, RSS, sitemap, 404.
- Motion: Lenis smooth scroll + GSAP ScrollTrigger reveal + tilt 3D card (tôn trọng `prefers-reduced-motion`).
- Hình minh họa: `tools/gen-images.mjs` gọi Hermes Image Studio (gpt-image-2) — hero + 5 topic + og; fallback SVG khi thiếu ảnh.
- Deploy kit: Dockerfile multi-stage (node build → nginx:1.27-alpine), nginx.conf (gzip, cache immutable `/_astro/`), docker-compose (localhost-only 8688), README hướng dẫn VPS/local/Pages.
- PLACEHOLDER cần Denis thay: tên kênh + channelUrl (`src/config/site.ts`), domain (`astro.config.mjs`, `robots.txt`), `playlistUrl`/`videos` trong topics.

### Gợi ý từ Hermes (review 2026-07-12, CHƯA triển khai — chờ Denis quyết)

- Chủ đề nên bổ sung dần: **nợ & tín dụng**; **bảo hiểm – thuế – hưu trí**; tình huống đặc thù VN (mua nhà, nuôi con, hỗ trợ cha mẹ, phòng lừa đảo tài chính).
- 3 tên kênh gợi ý thay placeholder "Denis Finance": **Tiền Cho Đúng**, **Ví Nhà Mình**, **Hiểu Tiền Sống Nhẹ**.

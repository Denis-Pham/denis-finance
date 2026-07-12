# Changelog — denis-finance

> **Quy ước cho AI agents (Claude, Hermes):**
> 1. ĐỌC file này trước khi sửa bất kỳ thứ gì; ghi entry mới sau khi sửa xong.
> 2. KHÔNG dùng iframe YouTube (Error 153) — video chỉ render thumbnail `i.ytimg.com` + link (component `VideoCard.astro`).
> 3. Brand/tên kênh đổi ở `src/config/site.ts`; màu & token ở `src/styles/global.css` (gold chỉ dành cho CTA chính).
> 4. Chủ đề = file json trong `src/content/topics/` (mỗi chủ đề map 1 playlist YouTube); bài viết = markdown trong `src/content/posts/`.
> 5. Code nằm ở `D:\claude agent\denis-finance` (npm không chạy trên Google Drive). Không commit `dist/`, `node_modules/`.

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

# Denis Finance — Landing page blog cho kênh YouTube tài chính

Website tĩnh (Astro 5) dạng blog **tra cứu theo chủ đề** — mỗi chủ đề map một playlist YouTube.
Hero 3D (Three.js), cuộn mượt + reveal (GSAP/Lenis), hình minh họa tạo bằng Hermes (gpt-image-2).
Build ra `dist/` thuần HTML/CSS/JS → host được ở bất kỳ đâu: VPS, Docker, GitHub Pages, hay máy local.

> **Quy ước cho AI agents:** đọc `CHANGELOG.md` trước khi sửa, ghi entry sau khi sửa.
> KHÔNG dùng iframe YouTube (bài học Error 153) — chỉ thumbnail + link.

## Chạy trên máy dev

Yêu cầu: Node.js 20+ (chỉ cần khi dev/build — runtime không cần).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # xuất site tĩnh ra dist/
npm run preview    # xem thử bản build
```

Xem bản build **không cần Node** (chỉ cần Python):

```bash
python -m http.server 8080 --directory dist
```

## Deploy

### Cách 1 — VPS bằng Docker (khuyên dùng)

```bash
git clone <repo> && cd denis-finance/deploy
docker compose up -d --build
# site chạy ở 127.0.0.1:8688 — trỏ reverse proxy (nginx/caddy) vào đây + gắn HTTPS
```

Compose bind `127.0.0.1` có chủ đích: expose public nên đi qua reverse proxy để có
HTTPS/HTTP2 và giấu container. Ví dụ Caddyfile: `taichinh.example.com { reverse_proxy 127.0.0.1:8688 }`.

### Cách 2 — VPS bằng nginx thuần (không Docker)

```bash
npm run build
rsync -avz --delete dist/ user@vps:/var/www/denis-finance/
```

Rồi dùng server block trong [deploy/nginx.conf](deploy/nginx.conf) (đổi `root` thành
`/var/www/denis-finance`).

### Cách 3 — GitHub Pages

Site là static thuần nên chỉ cần build rồi đẩy `dist/` lên Pages (hoặc dùng GitHub Actions
`withastro/action`). Lưu ý: nếu chạy ở địa chỉ `https://<user>.github.io/<repo>/` thì phải thêm
`base: '/<repo>'` vào `astro.config.mjs` — dùng custom domain thì không cần.

## Tuỳ biến

### Đổi brand / tên kênh (PLACEHOLDER hiện tại: "Denis Finance")

1. `src/config/site.ts` — tên, tagline, mô tả, **URL kênh YouTube thật**.
2. `astro.config.mjs` — `site:` domain thật (cho canonical/OG/sitemap/RSS).
3. `public/robots.txt` — sửa URL sitemap theo domain.

### Thêm chủ đề (= playlist mới)

Tạo `src/content/topics/<slug>.json`:

```json
{
  "title": "Tên chủ đề",
  "tagline": "Một câu mô tả ngắn",
  "description": "Đoạn giới thiệu đầy đủ.",
  "order": 6,
  "color": "#d4af37",
  "playlistUrl": "https://www.youtube.com/playlist?list=PLxxxx",
  "videos": [{ "id": "dQw4w9WgXcQ", "title": "Tên video" }],
  "illustration": "topic-<slug>"
}
```

- `playlistUrl` để `""` khi playlist chưa có → trang hiện khối "playlist đang dựng".
- `videos[].id` là mã 11 ký tự trong URL YouTube; để `""` → card "sắp ra mắt".

### Thêm bài viết

Tạo `src/content/posts/<slug>.md`:

```markdown
---
title: "Tiêu đề bài"
description: "Mô tả 1–2 câu (hiện ở card + SEO)."
topic: quan-ly-chi-tieu
pubDate: 2026-07-15
videoId: ""
---

Nội dung markdown...
```

`topic` phải trùng tên file json chủ đề. `videoId` (tuỳ chọn) gắn video minh hoạ đầu bài.

### Tạo lại hình minh họa (Hermes)

```bash
# 1. Bật backend Hermes Image Studio (venv python của Hermes):
#    powershell "G:\My Drive\Project X\hermes-image-studio\run-windows.ps1"
# 2. Chạy:
node tools/gen-images.mjs          # bỏ qua ảnh đã có
node tools/gen-images.mjs --force  # tạo lại tất cả
```

Ảnh rơi vào `src/assets/illustrations/` (Astro tự tối ưu sang webp khi build).
Không có ảnh → site tự fallback icon SVG + gradient, không vỡ layout.

## Cấu trúc

```
src/
├── config/site.ts        # brand, URL kênh — đổi 1 chỗ áp toàn site
├── content/topics/*.json # chủ đề (playlist)
├── content/posts/*.md    # bài viết
├── layouts/, components/ # khung trang + card (TopicCard, PostCard, VideoCard…)
├── scripts/hero-scene.ts # Three.js hero (coin 3D, tự tắt khi reduced-motion/no-WebGL)
├── scripts/fx.ts         # Lenis + GSAP reveal + tilt card
└── pages/                # /, /chu-de/, /chu-de/<slug>/, /bai-viet/, /bai-viet/<slug>/,
                          # /gioi-thieu/, /rss.xml, 404
deploy/                   # Dockerfile + nginx.conf + docker-compose.yml
tools/gen-images.mjs      # gọi Hermes Image Studio tạo minh họa
```

## Ghi chú hiệu năng 3D

- three.js chỉ load bằng dynamic import khi trình duyệt rảnh (không chặn LCP).
- `prefers-reduced-motion` hoặc máy không có WebGL → hero giữ poster tĩnh.
- Render tự dừng khi tab ẩn / hero ra khỏi màn hình; DPR clamp ≤ 2 (mobile 1.5).

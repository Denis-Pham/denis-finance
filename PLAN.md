# Denis Finance — Landing page blog cho kênh YouTube tài chính — Implementation Plan

> **For agentic workers:** Thực thi task-by-task theo thứ tự (inline execution). Mỗi task kết thúc bằng verify chạy thật + commit. Project KHÔNG có test infra (content site) → verify = build pass + chạy thật trong browser, theo CLAUDE.md §4.

**Goal:** Landing page dạng blog cho kênh YouTube tài chính của Denis — tra cứu bài viết theo chủ đề, mỗi chủ đề map 1 playlist YouTube, hero 3D (Three.js), hình minh họa do hermes tạo (gpt-image-2), deploy được lên VPS hoặc tự host local.

**Architecture:** Astro 5 static site (content collections: `topics` data + `posts` markdown) build ra `dist/` thuần static → serve bằng nginx/Docker trên VPS hoặc python http.server ở local. Lớp 3D/motion (Three.js + GSAP + Lenis) bundle qua npm — không CDN, site tự chứa 100% (fonts self-host qua @fontsource). Hình minh họa tạo qua hermes-image-studio backend (`POST 127.0.0.1:8765/api/hermes/generate`), có SVG/gradient fallback nếu backend không chạy.

**Tech Stack:** Astro ^5, Three.js, GSAP (ScrollTrigger), Lenis, @fontsource/be-vietnam-pro + @fontsource/playfair-display (subset vietnamese), sharp, nginx (deploy), Docker multi-stage.

## Global Constraints

- Code nằm ở `D:\claude agent\denis-finance` — npm KHÔNG chạy được trên Google Drive (bài học yuvomi; spec collab §3). `G:\My Drive\Project X\docs\superpowers\plans\` chỉ giữ pointer doc.
- KHÔNG dùng iframe YouTube — thumbnail `https://i.ytimg.com/vi/<id>/hqdefault.jpg` + link mở tab mới (bài học Error 153 từ vivi-soul).
- Brand/tên kênh là PLACEHOLDER "Denis Finance" — đổi tại MỘT chỗ: `src/config/site.ts` (kèm channel URL, socials). Playlist ID cũng placeholder trong `src/content/topics/*.json`.
- Design DNA kế thừa vivi-soul/Lamborghini DESIGN.md: nền tối gần đen, elevation bằng surface sáng dần (không shadow), gold `#d4af37` CHỈ cho CTA chính + accent nhỏ; thêm emerald `#27c08b` cho ngữ nghĩa "tăng trưởng". Interaction màu-only trên button; tilt 3D chỉ trên card.
- 3D phải degrade tử tế: `prefers-reduced-motion` → poster tĩnh; WebGL fail → poster; mobile giảm instance count; pause khi tab ẩn/hero ra khỏi viewport (Core Web Vitals).
- Tiếng Việt: mọi file UTF-8; font phải có subset vietnamese; verify render dấu trong demo.
- Không hardcode secret. Không push GitHub/bare repo trước khi Denis duyệt demo (checkpoint [human-verify] ở Task 10).
- Mọi commit message tiếng Anh, prefix `feat:`/`chore:`/`docs:`, kết bằng `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## Cấu trúc file (lock quyết định phân rã)

```
denis-finance/
├── PLAN.md                      ← file này
├── README.md                    ← chạy local + deploy VPS/Docker/Pages + đổi brand/thêm bài
├── CHANGELOG.md                 ← quy ước Project X: AI agent đọc trước khi sửa, ghi entry sau khi sửa
├── package.json / astro.config.mjs / tsconfig.json / .gitignore
├── public/                      ← favicon.svg, robots.txt (asset không qua pipeline)
├── src/
│   ├── config/site.ts           ← SITE: name, tagline, description, channelUrl, url, locale
│   ├── content.config.ts        ← schema 2 collections: topics (json), posts (md)
│   ├── content/topics/*.json    ← 5 chủ đề (title, slug qua filename, tagline, description,
│   │                               order, color, playlistUrl, videos[], illustration)
│   ├── content/posts/*.md       ← 7 bài seed tiếng Việt, frontmatter: title, description,
│   │                               topic (reference), pubDate, videoId?, draft
│   ├── layouts/BaseLayout.astro  ← <head> SEO/OG/theme + Header + Footer + fx init
│   ├── components/Header.astro, Footer.astro, TopicCard.astro, PostCard.astro,
│   │   VideoCard.astro, EmptyPlaylist.astro, Hero3D.astro, SectionHead.astro
│   ├── scripts/hero-scene.ts    ← Three.js: instanced gold coins + particles, parallax chuột,
│   │   │                           DPR clamp, IntersectionObserver + visibilitychange pause
│   │   └── fx.ts                ← Lenis + GSAP ScrollTrigger reveal + card tilt (hover-capable only)
│   ├── styles/global.css        ← design tokens + base + utilities
│   ├── assets/illustrations/    ← ảnh hermes tạo (hero.png, topic-*.png, og.png)
│   └── pages/index.astro, chu-de/index.astro, chu-de/[slug].astro,
│       bai-viet/index.astro, bai-viet/[slug].astro, gioi-thieu.astro,
│       rss.xml.ts, 404.astro
├── deploy/Dockerfile, nginx.conf, docker-compose.yml
└── tools/gen-images.mjs         ← gọi hermes-image-studio API, copy PNG về src/assets
```

**Design tokens (chốt):** `--bg:#05070d; --surface:#0b101c; --surface-2:#121a2b; --fg:#eef3fb; --muted:#b9c4d8; --muted-soft:#7e8ba3; --border:rgba(255,255,255,.08); --gold:#d4af37; --gold-deep:#a8841f; --gold-soft:#f0dfa8; --emerald:#27c08b; --emerald-deep:#178f66`. Display: Playfair Display 600/700; body/UI: Be Vietnam Pro 400/500/600/700. Radius: 0 cho button (Lamborghini), 14px cho card/media.

**5 chủ đề seed (= 5 playlist tương lai):**
| slug | title | minh họa |
|---|---|---|
| `quan-ly-chi-tieu` | Quản lý chi tiêu | ví + dòng coin |
| `tiet-kiem-quy-du-phong` | Tiết kiệm & Quỹ dự phòng | lá chắn + heo đất |
| `dau-tu-cho-nguoi-moi` | Đầu tư cho người mới | cây mọc từ đồng xu |
| `tai-chinh-gia-dinh` | Tài chính gia đình | ngôi nhà + coin |
| `tu-duy-tien-bac` | Tư duy & Thói quen tiền bạc | la bàn/não vàng |

**7 bài seed:** 50/30/20 ở VN (chi tiêu) · Quỹ dự phòng 6 tháng từ 500k (tiết kiệm) · Tháp tài sản 5 tầng (đầu tư) · ETF cho người mới (đầu tư) · Họp tài chính gia đình 30 phút (gia đình) · Pay yourself first (tư duy) · Tự làm dashboard chi tiêu (chi tiêu).

---

### Task 0 [auto] — Repo + PLAN (đang làm)
Git init `main`, identity local `Denis-Pham <manhduc1703@gmail.com>`, PLAN.md này, pointer doc bên Drive.
**Verify:** `git log` có commit đầu chứa PLAN.md.

### Task 1 [auto] — Scaffold Astro + deps
**Files:** package.json, astro.config.mjs, tsconfig.json, .gitignore, src/config/site.ts, src/styles/global.css, public/robots.txt, public/favicon.svg.
Scaffold tay (không dùng wizard interactive). Deps: `astro @astrojs/rss @astrojs/sitemap three gsap lenis @fontsource/be-vietnam-pro @fontsource/playfair-display sharp` + devDeps `@types/three typescript`. Scripts: `dev`, `build`, `preview`.
**Verify:** `npm install` exit 0; `npm run build` tạo `dist/` (trang tạm). Commit `feat: scaffold astro project`.

### Task 2 [auto] — Content collections + seed content
**Files:** src/content.config.ts, src/content/topics/*.json ×5, src/content/posts/*.md ×7.
Schema topics: `{ title, tagline, description, order, color, playlistUrl (placeholder), videos: [{id,title}] (rỗng → EmptyPlaylist), illustration }`. Schema posts: `{ title, description, topic: reference('topics'), pubDate, videoId?, draft }`.
**Verify:** `npm run build` pass, không lỗi schema. Commit.

### Task 3 [auto] — Layout + components tĩnh
**Files:** BaseLayout.astro (SEO/OG/JSON-LD WebSite), Header (sticky, blur, nav: Chủ đề/Bài viết/Giới thiệu + CTA gold "Đăng ký kênh"), Footer, TopicCard, PostCard, VideoCard (thumbnail i.ytimg.com + play badge, không iframe), EmptyPlaylist, SectionHead.
**Verify:** build pass. Commit.

### Task 4 [auto] — Pages
**Files:** index.astro (hero + chủ đề grid + bài mới + về kênh + CTA cuối), chu-de/index.astro, chu-de/[slug].astro (mô tả + nút playlist + videos/EmptyPlaylist + bài viết thuộc chủ đề), bai-viet/index.astro (lọc client theo chủ đề bằng URL param, progressive enhancement), bai-viet/[slug].astro (prose + VideoCard nếu có videoId + bài liên quan), gioi-thieu.astro, rss.xml.ts, 404.astro.
**Verify:** `npm run dev` → mọi route 200, điều hướng chéo đúng, filter chủ đề đúng. Commit.

### Task 5 [auto] — Lớp 3D + motion
**Files:** src/scripts/hero-scene.ts, src/scripts/fx.ts, components/Hero3D.astro.
Hero3D: `<canvas>` + poster fallback (ảnh hero hoặc gradient). hero-scene: ~28 coin instanced (CylinderGeometry, MeshStandardMaterial metalness .9), particles, lights gold/emerald, fog; camera parallax theo chuột (lerp); DPR ≤ 2; mobile: 14 coins; pause khi `document.hidden` hoặc hero out-of-view; `prefers-reduced-motion` / WebGL fail → poster, KHÔNG init. fx.ts: Lenis smooth scroll + GSAP ScrollTrigger reveal `[data-reveal]` + tilt `[data-tilt]` (chỉ `(hover:hover) and (pointer:fine)`).
**Verify:** dev server — hero render 3D, console 0 error; tắt bằng emulate reduced-motion vẫn ra poster. Commit.

### Task 6 [auto] — Hình minh họa từ hermes
**Files:** tools/gen-images.mjs, src/assets/illustrations/*.png (7 ảnh: hero 16:9 medium, 5 topic 1:1 low, og 16:9 medium).
Chạy backend: `powershell "G:\My Drive\Project X\hermes-image-studio\run-windows.ps1"` (background) → `GET /api/health` ok → POST từng prompt (style thống nhất: "minimal premium 3D render, gold and emerald on deep navy-black background, soft cinematic glow, no text, no watermark") → copy PNG từ `%LOCALAPPDATA%\hermes\cache\images\` vào src/assets/illustrations.
**Fallback:** backend fail → giữ gradient + SVG icon (site vẫn hoàn chỉnh), ghi chú trong CHANGELOG, không block demo.
**Verify:** ảnh hiện trên trang chủ + topic pages, `npm run build` optimize sang webp. Commit (ảnh commit vào repo — site tự chứa).

### Task 7 [auto] — Deploy kit + docs
**Files:** deploy/Dockerfile (node:24-alpine build → nginx:1.27-alpine), deploy/nginx.conf (gzip, cache `/_astro/*` immutable, security headers, error_page 404), deploy/docker-compose.yml (8688:80), README.md (dev/local-serve/VPS-docker/VPS-nginx/GitHub-Pages + đổi brand + thêm bài + gen ảnh), CHANGELOG.md.
**Verify:** `npm run build` pass; README lệnh chạy được (docker build optional — chỉ khi Docker Desktop đang chạy). Commit.

### Task 8 [auto] — Demo + verification loop
Thêm 2 config vào `G:\My Drive\Project X\.claude\launch.json`: `denis-finance` (npm dev, port 4321), `denis-finance-preview` (astro preview dist, port 4322). Mở browser pane: check console/network sạch, click qua các route, resize mobile 375px + desktop, screenshot làm bằng chứng.
**Verify:** screenshot desktop + mobile + route chủ đề; console 0 error; font tiếng Việt render đúng dấu.

### Task 9 [auto] — Tổng kết + hỏi ý hermes
`hermes -z` 1 câu review taxonomy chủ đề/tên brand (collab đúng nghĩa, không block). Cập nhật CHANGELOG.md, commit cuối.

### Task 10 [human-verify] — Denis duyệt demo → git remote
CHỜ Denis xem demo. Sau khi duyệt: bare repo `E:\HerBot\data\projects\denis-finance.git` + remote `hermes` + push main + `hermes project create` bind board `project-x` (theo phụ lục spec collab); GitHub chỉ khi Denis yêu cầu. Task nội dung giao hermes (viết thêm bài, audit a11y) tạo sau bước này.

## Out of scope (không tự làm)
- YouTube Data API sync tự động video/playlist (cần API key — Denis quyết sau).
- Newsletter backend, comments, analytics, CI/CD.
- Đổi compose/hạ tầng hermes; bump version bất kỳ dependency đã pin nào của hệ thống khác.

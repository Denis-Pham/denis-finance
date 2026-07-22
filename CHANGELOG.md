# Changelog — denis-finance

> **Quy ước cho AI agents (Claude, Hermes):**
> 1. ĐỌC file này trước khi sửa bất kỳ thứ gì; ghi entry mới sau khi sửa xong.
> 2. KHÔNG dùng iframe YouTube (Error 153) — video chỉ render thumbnail `i.ytimg.com` + link (component `VideoCard.astro`).
> 3. Brand/tên kênh đổi ở `src/config/site.ts`; màu & token ở `src/styles/global.css` (gold chỉ dành cho CTA chính).
> 4. Chủ đề = file json trong `src/content/topics/` (mỗi chủ đề map 1 playlist YouTube); bài viết = markdown trong `src/content/posts/`.
> 5. Code nằm ở `D:\claude agent\denis-finance` (npm không chạy trên Google Drive). Không commit `dist/`, `node_modules/`.

## [0.3.13] — 2026-07-21

**Card EP12 (Denis chốt lịch 20/8 trong chat):**

- Topic `tai-chinh-doi-thuc`: thêm card **EP12 Bảo hiểm: mua cái khiên, đừng mua cái mền** (20:00 thứ Tư 20/8) — id thật `EUMf-hV3gW8` (private hẹn giờ) + `upcoming: true`.
## [0.3.12] — 2026-07-20

**Điền id EP11 (upload xong trong ngày, đúng lời hẹn 0.3.11):**

- Topic `tai-chinh-doi-thuc`: card EP11 nhận id thật `_0Ii5H-_uXw` (private hẹn giờ Chủ nhật 17/8 20:00), giữ `upcoming: true`.
## [0.3.11] — 2026-07-20

**Card EP11 (Denis: "làm luôn card ep11 trên site đi"):**

- Topic `tai-chinh-doi-thuc`: thêm card **EP11 Tiền với cha mẹ già: biếu bao nhiêu là đủ?** (20:00 Chủ nhật 17/8) — id rỗng, điền ngay khi upload xong (đang sản xuất; lịch 17/8 Denis chốt trong chat). Arc gia đình ba thế hệ đủ bộ: EP09 vợ chồng · EP10 dạy con · EP11 cha mẹ già.
## [0.3.10] — 2026-07-20

**Card EP10 (Denis: "làm luôn card ep10 trên site đi"):**

- Topic `tai-chinh-doi-thuc`: thêm card **EP10 Dạy con hiểu tiền: việc thật, tiền thật, sai thật** (20:00 thứ Sáu 14/8) — id thật `01gymUu4tkI` (upload 20/7, hẹn giờ) + `upcoming: true`; khi public chỉ xoá cờ + bỏ ngày. Topic này giờ đủ arc ba tập gia đình: EP08 thu nhập · EP09 tiền chung · EP10 dạy con.
## [0.3.9] — 2026-07-19

**Điền id EP09 (upload xong trong ngày, đúng lời hẹn 0.3.8):**

- Topic `tai-chinh-doi-thuc`: card EP09 nhận id thật `rIiP4_DW2jo` (private hẹn giờ thứ Ba 11/8 20:00), giữ `upcoming: true` — khi public chỉ cần xoá cờ + bỏ ngày.
## [0.3.8] — 2026-07-19

**Card EP09 + hoàn thiện id EP08 (Denis: "làm luôn card ep09 trên site đi"):**

- Topic `tai-chinh-doi-thuc`: điền id EP08 `qkE8aOOYiDI` (đã upload 19/7, hẹn giờ 8/8) + `upcoming: true`; thêm card **EP09 Tiền chung của hai người: gộp, góp hay chia?** (20:00 thứ Ba 11/8) — id rỗng, điền ngay khi upload xong (đang sản xuất, dự kiến trong ngày).
## [0.3.7] — 2026-07-19

**Điền sẵn id thật cho 5 card "Sắp ra mắt" + cờ `upcoming` (Denis: "id có trong YouTube rồi, bỏ vào luôn"):**

- Schema topics + `VideoCard.astro` + trang chủ đề: thêm field `upcoming: boolean` (default false) — card có id nhưng `upcoming: true` vẫn render "Sắp ra mắt" (video private hẹn giờ → link/thumbnail YouTube chưa hoạt động, không cho bấm nhầm).
- Điền id: EP03 `F7D5e-4sg0M` (tiet-kiem, 22/7) · EP04 `zxqrecxw-L0` (no-va-tin-dung, 26/7) · EP05 `syPlRuNC-EA` · EP06 `HwX1yihRoPE` · EP07 `QZzI29LaHvE` (dau-tu, 30/7 · 2/8 · 5/8) — tất cả kèm `upcoming: true`.
- EP08 (tai-chinh-doi-thuc, 8/8) chưa upload → id vẫn rỗng (pattern cũ vẫn dùng cho tập chưa upload).
- **Pattern MỚI khi từng tập public:** chỉ xoá `"upcoming": true` + bỏ ngày khỏi title — id đã nằm sẵn, hết cảnh tra id.

## [0.3.6] — 2026-07-19

**1 bài viết mới (Hermes, posts round 5):**

- Thêm bài **Tiền riêng trong hôn nhân: khoản tự do, không phải quỹ đen** (`tien-rieng-minh-bach-trong-hon-nhan`).

## [0.3.5] — 2026-07-19

**4 bài viết mới (Hermes, posts round 4):**

- Thêm bài **Để quỹ dự phòng ở đâu: dễ rút khi cần, khó tiêu khi thèm** (`de-quy-du-phong-o-dau`).
- Thêm bài **Lãi kép: bắt đầu sớm quan trọng hơn bắt đầu lớn** (`lai-kep-bat-dau-som-quan-trong-hon-bat-dau-lon`).
- Thêm bài **Món đồ này giá bao nhiêu giờ làm việc?** (`mon-do-nay-gia-bao-nhieu-gio-lam-viec`).
- Thêm bài **Ngân sách phong bì thời quét QR** (`ngan-sach-phong-bi-thoi-quet-qr`).

## [0.3.4] — 2026-07-19

**Card "Sắp ra mắt" cho EP05–EP08 (lịch Denis chốt trong chat 19/7):**

- Topic `dau-tu-cho-nguoi-moi`: 3 card — **EP05 Lãi kép** (thứ Năm 30/7, id thật `syPlRuNC-EA` điền sau public), **EP06 Rủi ro & Lợi nhuận** (CN 2/8, id `HwX1yihRoPE`), **EP07 Đa dạng hóa** (thứ Tư 5/8, id điền khi upload xong).
- Topic `tai-chinh-doi-thuc`: card **EP08 Tăng thu nhập** (thứ Bảy 8/8, id điền khi upload xong).
- Pattern giữ nguyên: card chờ = id rỗng + ngày trong title; public rồi = id thật + title sạch.

## [0.3.3] — 2026-07-19

**Cập nhật lịch publish mới (Denis dời trong Studio 19/7, verify qua YouTube API):**

- Topic `quan-ly-chi-tieu`: EP02 đã PUBLIC → điền id thật `Dff44SK5Y7s`, bỏ ngày khỏi title (pattern giống EP01).
- Topic `tiet-kiem-quy-du-phong`: EP03 dời CN 2/8 → **thứ Tư 22/7 20:00** (id thật `F7D5e-4sg0M`, điền sau khi public).
- Topic `no-va-tin-dung`: EP04 dời CN 9/8 → **CN 26/7 20:00** (id thật `zxqrecxw-L0`, điền sau khi public).
- Lịch tiếp theo: EP05 hẹn thứ Năm 30/7 20:00 — chưa có card trên site (chưa rõ topic), thêm sau.

## [0.3.2] — 2026-07-19

- Topic `no-va-tin-dung`: card "Sắp ra mắt" cho **EP04 — "Trả nợ trước hay để dành trước? Cách gỡ nợ đúng thứ tự"** (đã upload private 19/7, hẹn giờ public YouTube CN 9/8 20:00) — điền id thật sau khi public: `zxqrecxw-L0`. Pattern y hệt card EP02/EP03 (id rỗng + ngày trong title).

## [0.3.1] — 2026-07-18

**Kết nối kênh YouTube thật (Ví Nhà Mình TV đã lên sóng 17/7):**

- `src/config/site.ts`: handle thật **@vinhaminhtv** (xác nhận qua YouTube API `channels.list` customUrl — KHÁC dự kiến `@ViNhaMinh` cũ); channelUrl cập nhật theo. Header CTA + footer + JSON-LD tự ăn theo.
- Topic `tu-duy-tien-bac`: gắn video EP01 `lNTOrJg7pcw` ("Vì sao càng kiếm nhiều tiền vẫn càng thấy thiếu?" — PUBLIC 18/7).
- Topic `quan-ly-chi-tieu` + `tiet-kiem-quy-du-phong`: card "Sắp ra mắt" cho EP02/EP03 (đã hẹn giờ public YouTube: CN 26/7 và CN 2/8, 20:00) — điền id thật sau khi public: EP02 `Dff44SK5Y7s`, EP03 `F7D5e-4sg0M`.
- Bài `lam-phat-loi-song-tang-luong-van-het-tien`: thêm `videoId: lNTOrJg7pcw` (VideoCard cuối bài).
- Còn placeholder: domain, `playlistUrl` (kênh chưa tạo playlist).

## [0.3.0] — 2026-07-13

**Chốt tên kênh: Ví Nhà Mình** (một trong 3 gợi ý của Hermes, Denis quyết):

- `src/config/site.ts`: name "Ví Nhà Mình", shortName "VNM", channel handle dự kiến `@ViNhaMinh` (CHỜ XÁC NHẬN khi tạo kênh YouTube thật — trùng handle thì đổi lại tại đây), description thêm "tài chính gia đình" + câu brand "Tiền là chuyện của cả nhà."
- Favicon `D` → `V`. README cập nhật brand.
- Còn placeholder: domain (`astro.config.mjs` + `robots.txt`), `playlistUrl`/`videos` trong topics.
- Repo/URL giữ nguyên `denis-finance` (đổi tên repo sẽ gãy Pages URL + remotes + kanban — brand site không cần trùng tên repo).

## [0.2.4] — 2026-07-17

- Thêm bài **Kiểm toán chi tiêu: săn phí ẩn và thuê bao quên huỷ** (`kiem-toan-chi-tieu-san-phi-an-thue-bao`).
- Thêm bài **Quỹ chìm: để dành trước cho những khoản biết trước** (`quy-chim-de-danh-cho-khoan-biet-truoc`).
- Thêm bài **5 sai lầm kinh điển của người mới đầu tư** (`5-sai-lam-nguoi-moi-dau-tu`).
- Thêm bài **Dạy con hiểu tiền theo từng độ tuổi** (`day-con-hieu-tien-theo-tung-do-tuoi`).

## [0.2.3] — 2026-07-16

- Thêm bài **Năm lối tắt tâm lý khiến mình tiêu nhiều hơn dự định** (`loi-tat-tam-ly-khien-ta-tieu-nhieu-hon`).
- Thêm bài **Lạm phát lối sống: tăng lương rồi vẫn hết tiền** (`lam-phat-loi-song-tang-luong-van-het-tien`).

## [0.2.2] — 2026-07-15

- Thêm bài **Nhiều khoản nợ cùng lúc: chọn snowball hay avalanche?** (`chon-snowball-hay-avalanche-khi-co-nhieu-khoan-no`).
- Thêm bài **Trả nợ trước hạn: khi nào đáng, khi nào chưa?** (`tra-no-truoc-han-khi-nao-dang`).
- Thêm bài **Quyết toán thuế thu nhập cá nhân không hoảng loạn** (`quyet-toan-thue-thu-nhap-ca-nhan-khong-hoang-loan`).
- Thêm bài **Đọc hợp đồng bảo hiểm trong 30 phút: checklist trước khi ký** (`doc-hop-dong-bao-hiem-trong-30-phut`).

## [0.2.1] — 2026-07-12

Deploy GitHub Pages (https://denis-pham.github.io/denis-finance/):

- Workflow `.github/workflows/deploy.yml` — build + deploy tự động mỗi lần push main (withastro/action, actions/deploy-pages, tự bật Pages qua configure-pages `enablement: true`).
- `astro.config.mjs` đọc `DEPLOY_SITE`/`DEPLOY_BASE` từ env: Pages build ở subpath `/denis-finance`, build local/VPS giữ nguyên root `/`.
- Helper `withBase()` (`src/config/site.ts`) áp cho MỌI link nội bộ viết tay (header, footer, card, chip, breadcrumb, RSS, favicon...) — quy ước mới: link nội bộ luôn qua `withBase()`, đừng hardcode `href="/..."`.

## [0.2.0] — 2026-07-12

Nâng cấp 3D theo yêu cầu Denis (trước đây chỉ hero có 3D):

- **Lớp 3D ambient toàn trang** (`src/scripts/ambient-scene.ts` + canvas trong `BaseLayout.astro`): coin vàng + bụi ánh kim trôi sau nội dung ở MỌI trang, parallax theo scroll (mỗi coin một tốc độ, wrap dọc vô tận). Trang bài viết dùng biến thể mờ (`ambient="dim"`) để dễ đọc. Desktop pointer-fine ≥900px; tự tắt khi reduced-motion/không WebGL; pause khi tab ẩn; hero che ambient bằng nền đặc (hero có scene riêng dày hơn).
- **Con trỏ chuột = đồng xu vàng 3D** (`initCoinCursor` trong `fx.ts` + CSS `.coin-cursor`): xoay rotateY liên tục, phóng to khi hover link/nút/card, thu nhỏ khi click; chỉ desktop, không áp cho touch/reduced-motion.
- Reveal khi cuộn thêm lật nhẹ `rotationX` (cảm giác chiều sâu ở mọi section).

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

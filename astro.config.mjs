import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(Denis): đổi `site` mặc định khi có domain thật (dùng cho canonical/OG/sitemap/RSS).
// GitHub Pages build set DEPLOY_SITE + DEPLOY_BASE qua workflow (.github/workflows/deploy.yml)
// vì Pages chạy ở subpath /denis-finance — build local/VPS giữ nguyên root '/'.
export default defineConfig({
  site: process.env.DEPLOY_SITE ?? 'https://denis-finance.example.com',
  base: process.env.DEPLOY_BASE ?? '/',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});

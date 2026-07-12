import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(Denis): đổi `site` khi có domain thật (dùng cho canonical/OG/sitemap/RSS).
export default defineConfig({
  site: 'https://denis-finance.example.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});

/**
 * Cấu hình brand — ĐỔI Ở ĐÂY LÀ ĐỔI TOÀN SITE.
 * Tên kênh "Ví Nhà Mình" — Denis chốt 2026-07-13.
 * Kênh thật "Ví Nhà Mình TV" đã lên sóng 2026-07-17; handle thật @vinhaminhtv
 * (xác nhận qua YouTube API channels.list customUrl, 2026-07-18).
 */
/**
 * Prefix base path cho link nội bộ — cần cho GitHub Pages (subpath /denis-finance).
 * Build local/VPS có base '/' nên trả về path nguyên vẹn.
 * Dùng cho MỌI href/src nội bộ viết tay: withBase('/chu-de/').
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path}`;
}

export const SITE = {
  name: 'Ví Nhà Mình',
  shortName: 'VNM',
  tagline: 'Hiểu tiền — từng đồng, từng bước',
  description:
    'Blog và kênh YouTube về tài chính cá nhân, tài chính gia đình thực chiến: quản lý chi tiêu, tiết kiệm, đầu tư cho người mới — kể bằng trải nghiệm thật, số liệu thật. Tiền là chuyện của cả nhà.',
  url: 'https://denis-finance.example.com',
  channelUrl: 'https://www.youtube.com/@vinhaminhtv',
  channelHandle: '@vinhaminhtv',
  author: 'Denis Phạm',
  locale: 'vi',
} as const;

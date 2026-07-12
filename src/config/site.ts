/**
 * Cấu hình brand — ĐỔI Ở ĐÂY LÀ ĐỔI TOÀN SITE.
 * TODO(Denis): thay tên kênh, handle và channelUrl bằng kênh thật.
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
  name: 'Denis Finance',
  shortName: 'DF',
  tagline: 'Hiểu tiền — từng đồng, từng bước',
  description:
    'Blog và kênh YouTube về tài chính cá nhân thực chiến: quản lý chi tiêu, tiết kiệm, đầu tư cho người mới và tài chính gia đình — kể bằng trải nghiệm thật, số liệu thật.',
  url: 'https://denis-finance.example.com',
  channelUrl: 'https://www.youtube.com/@DenisFinance',
  channelHandle: '@DenisFinance',
  author: 'Denis Phạm',
  locale: 'vi',
} as const;

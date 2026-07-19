import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * topics — mỗi chủ đề map 1 playlist YouTube.
 * `playlistUrl` để "" khi playlist chưa tạo → UI hiện EmptyPlaylist + CTA kênh.
 * `videos` là danh sách video của playlist (id YouTube 11 ký tự) — điền tay,
 * id để "" sẽ render card "sắp ra mắt" (không ảnh hỏng).
 * `upcoming: true` = đã có id (video upload + hẹn giờ) nhưng CHƯA public
 * → vẫn render card "sắp ra mắt"; đến ngày public chỉ cần xoá cờ + bỏ ngày khỏi title.
 */
const topics = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    order: z.number(),
    color: z.string(),
    playlistUrl: z.string().default(''),
    videos: z
      .array(z.object({ id: z.string(), title: z.string(), upcoming: z.boolean().default(false) }))
      .default([]),
    illustration: z.string(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: reference('topics'),
    pubDate: z.coerce.date(),
    videoId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { topics, posts };

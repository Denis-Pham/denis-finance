/**
 * Tạo hình minh họa qua Hermes Image Studio backend (gpt-image-2).
 *
 * Yêu cầu: backend đang chạy — `G:\My Drive\Project X\hermes-image-studio\run-windows.ps1`
 * (PHẢI chạy bằng venv python của Hermes, xem README của hermes-image-studio).
 *
 * Chạy:  node tools/gen-images.mjs [--force]
 * Ảnh lưu vào src/assets/illustrations/<name>.png (og.png ~ ảnh chia sẻ mạng xã hội).
 * Đã có file → bỏ qua (trừ khi --force). Backend tắt → thoát êm, site dùng fallback SVG.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = process.env.HIS_API ?? 'http://127.0.0.1:8765';
const FORCE = process.argv.includes('--force');
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'illustrations');

const STYLE =
  'Minimal premium 3D render, polished gold and emerald green accents on a deep navy-black background, ' +
  'soft cinematic rim light, subtle glow particles, high detail. No text, no letters, no numbers, no watermark, no people.';

const JOBS = [
  {
    name: 'hero',
    aspect: '16:9',
    model: 'gpt-image-2-medium',
    prompt: `Wide cinematic composition: floating golden coins of various sizes drifting around a rising emerald glass bar chart, gentle depth of field. ${STYLE}`,
  },
  {
    name: 'topic-quan-ly-chi-tieu',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A sleek dark leather wallet, slightly open, with golden coins hovering above it. ${STYLE}`,
  },
  {
    name: 'topic-tiet-kiem-quy-du-phong',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A golden piggy bank protected under a translucent emerald glass shield dome. ${STYLE}`,
  },
  {
    name: 'topic-dau-tu-cho-nguoi-moi',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A small tree with emerald glass leaves sprouting from a neat stack of golden coins. ${STYLE}`,
  },
  {
    name: 'topic-tai-chinh-gia-dinh',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A cozy miniature modern house with warm golden glowing windows standing on a dark pedestal, a few golden coins around its base. ${STYLE}`,
  },
  {
    name: 'topic-tu-duy-tien-bac',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `An elegant golden compass with an emerald needle resting on dark marble. ${STYLE}`,
  },
  {
    name: 'topic-no-va-tin-dung',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `An elegant dark credit card with golden edges resting beside a small golden balance scale, calm and trustworthy mood. ${STYLE}`,
  },
  {
    name: 'topic-bao-hiem-thue-huu-tri',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A golden umbrella sheltering a neat stack of golden coins, beside an elegant golden hourglass with emerald glass sand, calm protective mood. ${STYLE}`,
  },
  {
    name: 'topic-tai-chinh-doi-thuc',
    aspect: '1:1',
    model: 'gpt-image-2-low',
    prompt: `A golden lotus flower with emerald glass leaves floating on a calm dark pond, golden coins resting like lily pads around it, serene Vietnamese-inspired mood. ${STYLE}`,
  },
  {
    name: 'og',
    aspect: '16:9',
    model: 'gpt-image-2-medium',
    prompt: `Elegant wide banner: golden coins orbiting along an ascending emerald growth curve, luxurious and calm. ${STYLE}`,
  },
];

async function health() {
  try {
    const r = await fetch(`${API}/api/health`, { signal: AbortSignal.timeout(4000) });
    return r.ok;
  } catch {
    return false;
  }
}

async function generate(job) {
  const res = await fetch(`${API}/api/hermes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: job.prompt,
      settings: { count: 1, aspect_ratio: job.aspect, model: job.model },
    }),
    signal: AbortSignal.timeout(300_000),
  });
  const data = await res.json();
  if (!res.ok || !data.ok || !data.images?.[0]?.url) {
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }
  const img = await fetch(`${API}${data.images[0].url}`);
  if (!img.ok) throw new Error(`fetch image failed: HTTP ${img.status}`);
  return Buffer.from(await img.arrayBuffer());
}

const ok = await health();
if (!ok) {
  console.error(`[gen-images] Backend không chạy tại ${API} — bỏ qua, site sẽ dùng fallback SVG.`);
  process.exit(2);
}

await mkdir(OUT_DIR, { recursive: true });
let done = 0;
let failed = 0;

for (const job of JOBS) {
  const target = path.join(OUT_DIR, `${job.name}.png`);
  if (existsSync(target) && !FORCE) {
    console.log(`[skip] ${job.name}.png đã có`);
    done++;
    continue;
  }
  const t0 = Date.now();
  process.stdout.write(`[gen ] ${job.name} (${job.aspect}, ${job.model}) ... `);
  try {
    const buf = await generate(job);
    await writeFile(target, buf);
    done++;
    console.log(`OK ${(buf.length / 1024).toFixed(0)}KB, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  } catch (err) {
    failed++;
    console.log(`FAIL: ${err.message}`);
  }
}

console.log(`\n[gen-images] xong: ${done}/${JOBS.length} ok, ${failed} lỗi.`);
process.exit(failed > 0 ? 1 : 0);

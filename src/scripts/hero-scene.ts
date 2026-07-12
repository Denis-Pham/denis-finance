/**
 * Hero 3D — đồng xu vàng + hạt bụi ánh kim trôi trong sương tối.
 * Nguyên tắc hiệu năng (theo PLAN.md):
 *  - three.js load bằng dynamic import khi trình duyệt rảnh → không chặn LCP
 *  - prefers-reduced-motion / không có WebGL → giữ poster tĩnh, không init
 *  - DPR clamp ≤ 2 (mobile 1.5), mobile giảm số coin
 *  - Dừng render khi tab ẩn hoặc hero ra khỏi viewport
 */

export function maybeInitHero(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return;
  } catch {
    return;
  }

  const start = () => {
    init(canvas).catch((err) => {
      // Thất bại thì poster tĩnh vẫn ở đó — chỉ log cho dev.
      console.warn('[hero-scene] init failed:', err);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as Window & typeof globalThis).requestIdleCallback(start, { timeout: 1500 });
  } else {
    setTimeout(start, 300);
  }
}

async function init(canvas: HTMLCanvasElement): Promise<void> {
  const THREE = await import('three');

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const COIN_COUNT = isMobile ? 13 : 26;
  const BG = 0x05070d;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.042);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  camera.position.set(0, 0.6, 15);

  scene.add(new THREE.AmbientLight(0x8899bb, 0.38));
  const keyLight = new THREE.DirectionalLight(0xffe9b0, 1.5);
  keyLight.position.set(6, 8, 5);
  scene.add(keyLight);
  const emeraldLight = new THREE.PointLight(0x27c08b, 22, 40, 1.8);
  emeraldLight.position.set(-9, -4, 2);
  scene.add(emeraldLight);
  const goldLight = new THREE.PointLight(0xd4af37, 14, 34, 1.8);
  goldLight.position.set(8, 3, -4);
  scene.add(goldLight);

  // ---- Đồng xu (instanced) ----
  const coinGeo = new THREE.CylinderGeometry(1, 1, 0.15, 42);
  const coinMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.92,
    roughness: 0.32,
  });
  const coins = new THREE.InstancedMesh(coinGeo, coinMat, COIN_COUNT);
  const dummy = new THREE.Object3D();

  type CoinState = {
    pos: InstanceType<typeof THREE.Vector3>;
    rot: InstanceType<typeof THREE.Euler>;
    scale: number;
    spin: number;
    bobAmp: number;
    bobSpeed: number;
    phase: number;
  };
  const states: CoinState[] = [];
  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  for (let i = 0; i < COIN_COUNT; i++) {
    states.push({
      pos: new THREE.Vector3(rand(-10, 10), rand(-4.5, 5), rand(-7, 2.5)),
      rot: new THREE.Euler(rand(0, Math.PI), rand(0, Math.PI), rand(0, Math.PI)),
      scale: rand(0.28, 0.9),
      spin: rand(0.15, 0.55) * (Math.random() > 0.5 ? 1 : -1),
      bobAmp: rand(0.25, 0.7),
      bobSpeed: rand(0.3, 0.75),
      phase: rand(0, Math.PI * 2),
    });
  }
  scene.add(coins);

  // ---- Bụi ánh kim (2 đám hạt: vàng + ngọc lục bảo) ----
  const makeDust = (count: number, color: number, size: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = rand(-14, 14);
      positions[i * 3 + 1] = rand(-7, 7);
      positions[i * 3 + 2] = rand(-9, 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  };
  const goldDust = makeDust(isMobile ? 90 : 170, 0xd4af37, 0.055);
  const emeraldDust = makeDust(isMobile ? 50 : 90, 0x27c08b, 0.045);
  scene.add(goldDust, emeraldDust);

  // ---- Tương tác chuột (parallax nhẹ) ----
  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );

  // ---- Resize theo container ----
  const resize = () => {
    const w = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement ?? canvas);

  // ---- Pause khi không nhìn thấy ----
  let inView = true;
  let hidden = document.hidden;
  let rafId = 0;
  let running = false;

  const clock = new THREE.Clock();

  const frame = () => {
    if (!inView || hidden) {
      running = false;
      return;
    }
    rafId = requestAnimationFrame(frame);

    const t = clock.getElapsedTime();
    for (let i = 0; i < COIN_COUNT; i++) {
      const s = states[i]!;
      dummy.position.set(
        s.pos.x,
        s.pos.y + Math.sin(t * s.bobSpeed + s.phase) * s.bobAmp,
        s.pos.z
      );
      dummy.rotation.set(s.rot.x + t * s.spin, s.rot.y + t * s.spin * 0.7, s.rot.z);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      coins.setMatrixAt(i, dummy.matrix);
    }
    coins.instanceMatrix.needsUpdate = true;

    goldDust.rotation.y = t * 0.02;
    emeraldDust.rotation.y = -t * 0.016;

    camera.position.x += (pointer.x * 1.3 - camera.position.x) * 0.045;
    camera.position.y += (0.6 - pointer.y * 0.9 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  const resume = () => {
    if (!running && inView && !hidden) {
      running = true;
      clock.getDelta();
      rafId = requestAnimationFrame(frame);
    }
  };

  new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      if (inView) resume();
    },
    { threshold: 0 }
  ).observe(canvas);

  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden;
    if (!hidden) resume();
    else cancelAnimationFrame(rafId);
  });

  canvas.classList.add('is-live');
  resume();
}

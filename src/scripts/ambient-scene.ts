/**
 * Lớp 3D ambient TOÀN TRANG — canvas fixed sau nội dung (mọi page).
 * Đồng xu vàng + bụi ánh kim trôi, parallax theo scroll (mỗi coin một tốc độ,
 * wrap dọc vô tận nên trang dài bao nhiêu cũng có coin).
 * Guard: desktop pointer-fine ≥900px, không reduced-motion, có WebGL;
 * three.js dynamic import khi trình duyệt rảnh; pause khi tab ẩn.
 */

export function maybeInitAmbient(canvas: HTMLCanvasElement | null): void {
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)').matches) return;

  try {
    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return;
  } catch {
    return;
  }

  const start = () => {
    init(canvas).catch((err) => console.warn('[ambient-scene] init failed:', err));
  };
  if ('requestIdleCallback' in window) {
    (window as Window & typeof globalThis).requestIdleCallback(start, { timeout: 2500 });
  } else {
    setTimeout(start, 600);
  }
}

async function init(canvas: HTMLCanvasElement): Promise<void> {
  const THREE = await import('three');

  const COIN_COUNT = 14;
  const BG = 0x05070d;
  const Y_RANGE = 9; // coin sống trong dải y [-9, 9], wrap vòng

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.06);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(0, 0, 13);

  scene.add(new THREE.AmbientLight(0x8899bb, 0.4));
  const key = new THREE.DirectionalLight(0xffe9b0, 1.2);
  key.position.set(5, 7, 4);
  scene.add(key);
  const rim = new THREE.PointLight(0x27c08b, 12, 30, 1.9);
  rim.position.set(-8, -3, 0);
  scene.add(rim);

  const coinGeo = new THREE.CylinderGeometry(1, 1, 0.15, 36);
  const coinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.35 });
  const coins = new THREE.InstancedMesh(coinGeo, coinMat, COIN_COUNT);
  const dummy = new THREE.Object3D();
  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  type CoinState = {
    x: number; y0: number; z: number;
    scale: number; spin: number; drift: number; // drift = hệ số parallax theo scroll
    rot: InstanceType<typeof THREE.Euler>;
  };
  const states: CoinState[] = [];
  for (let i = 0; i < COIN_COUNT; i++) {
    states.push({
      x: rand(-11, 11),
      y0: rand(-Y_RANGE, Y_RANGE),
      z: rand(-8, -1),
      scale: rand(0.1, 0.42),
      spin: rand(0.12, 0.5) * (Math.random() > 0.5 ? 1 : -1),
      drift: rand(0.0016, 0.0046),
      rot: new THREE.Euler(rand(0, Math.PI), rand(0, Math.PI), rand(0, Math.PI)),
    });
  }
  scene.add(coins);

  const makeDust = (count: number, color: number, size: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = rand(-14, 14);
      positions[i * 3 + 1] = rand(-8, 8);
      positions[i * 3 + 2] = rand(-9, 0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color, size, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  };
  const goldDust = makeDust(130, 0xd4af37, 0.05);
  const emeraldDust = makeDust(55, 0x27c08b, 0.042);
  scene.add(goldDust, emeraldDust);

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // wrap v vào [-range, range]
  const wrap = (v: number, range: number) => {
    const span = range * 2;
    return ((((v + range) % span) + span) % span) - range;
  };

  let hidden = document.hidden;
  let rafId = 0;
  let running = false;
  const clock = new THREE.Clock();

  const frame = () => {
    if (hidden) { running = false; return; }
    rafId = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();

    for (let i = 0; i < COIN_COUNT; i++) {
      const s = states[i]!;
      // cuộn xuống → coin trôi lên với tốc độ riêng (parallax), wrap vòng vô tận
      const y = wrap(s.y0 + scrollY * s.drift, Y_RANGE);
      dummy.position.set(s.x, y, s.z);
      dummy.rotation.set(s.rot.x + t * s.spin, s.rot.y + t * s.spin * 0.6, s.rot.z);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      coins.setMatrixAt(i, dummy.matrix);
    }
    coins.instanceMatrix.needsUpdate = true;

    goldDust.rotation.y = t * 0.014;
    goldDust.position.y = wrap(scrollY * 0.0012, 4);
    emeraldDust.rotation.y = -t * 0.011;

    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.45 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  const resume = () => {
    if (!running && !hidden) {
      running = true;
      clock.getDelta();
      rafId = requestAnimationFrame(frame);
    }
  };

  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden;
    if (!hidden) resume();
    else cancelAnimationFrame(rafId);
  });

  canvas.classList.add('is-live');
  resume();
}

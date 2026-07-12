/**
 * Lớp motion toàn site: Lenis (cuộn mượt) + GSAP ScrollTrigger (reveal)
 * + tilt 3D cho card. Tôn trọng prefers-reduced-motion: tắt toàn bộ.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  initScroll();
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    initTilt();
  }
}

function initScroll(): void {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.115 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor link cuộn mượt qua Lenis
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -70 });
    });
  });

  // Reveal khi cuộn tới
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 26,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function initTilt(): void {
  const MAX_X = 7;
  const MAX_Y = 9;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.classList.remove('tilt-reset');
      card.style.setProperty('--rx', `${(0.5 - py) * MAX_X}deg`);
      card.style.setProperty('--ry', `${(px - 0.5) * MAX_Y}deg`);
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.add('tilt-reset');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

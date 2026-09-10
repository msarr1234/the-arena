document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('[data-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    const text = line.textContent;
    line.innerHTML = `<span class="line-inner" style="display:inline-block; transform: translateY(110%);">${text}</span>`;
  });

  const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTimeline
    .to('.eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    .to('.hero-title .line-inner', { y: 0, duration: 1.1, stagger: 0.12 }, '-=0.4')
    .to('.hero-sub', { opacity: 1, duration: 0.9 }, '-=0.5')
    .to('.hero-ctas', { opacity: 1, duration: 0.9 }, '-=0.6');

  gsap.set('.eyebrow, .hero-sub, .hero-ctas', { y: 14 });

  const revealUp = (selector, opts = {}) => {
    document.querySelectorAll(selector).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          ...opts,
        }
      );
    });
  };

  revealUp('.reveal-up');
  revealUp('.step', { stagger: 0.08 });
  revealUp('.evidence-card', { stagger: 0.08 });

  document.querySelectorAll('.reveal, .reveal-line').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 1, scrollTrigger: { trigger: el, start: 'top 90%' } }
    );
  });

  gsap.to('.hero-watermark', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.to('.hero-grid', {
    backgroundPosition: '64px 64px',
    duration: 40,
    repeat: -1,
    ease: 'none',
  });
});

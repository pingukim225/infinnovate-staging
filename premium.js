/* Infinnovate Premium — Shared JS */

// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) menuBtn.onclick = () => mobileNav.classList.toggle('hidden');

// Scroll reveal (supports .reveal and .reveal-stagger)
// Uses scroll listener instead of IntersectionObserver for maximum compatibility
function revealOnScroll() {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('show');
      // Trigger not-real animation
      const grid = el.closest('.not-real-grid');
      if (grid) {
        grid.querySelectorAll('.animate-left, .animate-right').forEach((item, i) => {
          item.style.animation = i % 2 === 0 ? 'slideInLeft 0.8s ease forwards' : 'slideInRight 0.8s ease forwards';
          item.style.animationDelay = `${(Math.floor(i/2)) * 0.3}s`;
        });
      }
    }
  });
}
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);
revealOnScroll();

// Animated counters (scroll-based for maximum compatibility)
function initCounters() {
  document.querySelectorAll('[data-counter]:not([data-counted])').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.setAttribute('data-counted', 'true');
      const target = Number(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dur = 1600; const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick); else el.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(tick);
    }
  });
}
window.addEventListener('scroll', initCounters, { passive: true });
window.addEventListener('load', initCounters);
document.addEventListener('DOMContentLoaded', initCounters);
initCounters();

// Countdown to Parent Night
const deadline = new Date('2026-03-31T18:30:00-07:00').getTime();
function paintCountdown() {
  const dist = deadline - Date.now();
  if (dist <= 0) { ['days','hours','minutes','seconds'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '0'; }); return; }
  const d = Math.floor(dist / 864e5);
  const h = Math.floor((dist % 864e5) / 36e5);
  const m = Math.floor((dist % 36e5) / 6e4);
  const s = Math.floor((dist % 6e4) / 1e3);
  [['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,val]) => {
    const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2,'0');
  });
}
paintCountdown(); setInterval(paintCountdown, 1000);

// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
if (slides.length) {
  let idx = 0; slides[0].classList.add('active');
  setInterval(() => { slides[idx].classList.remove('active'); idx = (idx + 1) % slides.length; slides[idx].classList.add('active'); }, 5000);
}

// Audio player
const audioButtons = document.querySelectorAll('[data-audio-btn]');
const audioEl = document.getElementById('audioPlayer');
const audioTitle = document.getElementById('audioTitle');
const audioStatus = document.getElementById('audioStatus');
audioButtons.forEach(btn => btn.addEventListener('click', () => {
  if (btn.dataset.disabled === 'true') return;
  audioButtons.forEach(b => b.classList.remove('ring-2','ring-gold'));
  btn.classList.add('ring-2','ring-gold');
  if (audioEl) audioEl.src = btn.dataset.src;
  if (audioTitle) audioTitle.textContent = btn.dataset.label;
  if (audioStatus) audioStatus.textContent = 'Ready to play';
}));
if (audioEl && audioStatus) { audioEl.addEventListener('play', () => audioStatus.textContent = 'Playing'); audioEl.addEventListener('pause', () => audioStatus.textContent = 'Paused'); }

// Registration form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    const subject = encodeURIComponent('Parent Night Registration Inquiry');
    const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nStudent Age/Grade: ${fd.get('student')}\nMessage: ${fd.get('message')}`);
    window.location.href = `mailto:info@infinnovateinc.com?subject=${subject}&body=${body}`;
  });
}

// Sticky header scroll effect (for transparent headers)
const hdr = document.getElementById('site-header');
if (hdr && hdr.classList.contains('bg-transparent')) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
      hdr.classList.add('bg-navy/90','backdrop-blur','border-b','border-white/10');
      hdr.classList.remove('bg-transparent');
    } else {
      hdr.classList.remove('bg-navy/90','backdrop-blur','border-b','border-white/10');
      hdr.classList.add('bg-transparent');
    }
  }, { passive: true });
}

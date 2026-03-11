/* ==========================================================================
   Infinnovate — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- AOS Init ----------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  // ---------- Navbar Scroll ----------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMenu(open) {
    const isOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('active');
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
    mobileOverlay?.addEventListener('click', () => toggleMenu(false));
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // ---------- Active Nav Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Stats Counter Animation ----------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;

      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = prefix + target + suffix;
          el.classList.add('counted');
          return;
        }
        el.textContent = prefix + current + suffix;
        requestAnimationFrame(tick);
      };
      tick();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ---------- ESBIE Timeline Scroll Reveal ----------
  const esbieNodes = document.querySelectorAll('.esbie-node');
  const esbieConnectors = document.querySelectorAll('.esbie-connector');

  if (esbieNodes.length) {
    const esbieObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const node = entry.target;
          const index = parseInt(node.dataset.index, 10);
          // Stagger reveal
          setTimeout(() => {
            node.classList.add('visible');
            // Fill the connector before this node
            if (index > 0 && esbieConnectors[index - 1]) {
              esbieConnectors[index - 1].classList.add('filled');
            }
          }, index * 200);
          esbieObserver.unobserve(node);
        }
      });
    }, { threshold: 0.2 });

    esbieNodes.forEach(n => esbieObserver.observe(n));
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Form Validation (Light) ----------
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#E8703A';
          field.addEventListener('input', () => {
            field.style.borderColor = '';
          }, { once: true });
        }
      });
      if (!valid) {
        e.preventDefault();
      }
    });
  });

});

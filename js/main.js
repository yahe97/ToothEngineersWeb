/* Tooth Engineers — Main JS */

// ── Mobile nav ──────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu && mobileMenu.classList.remove('open');
  });
});

// ── Active nav link ──────────────────────
(function markActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Counter animation ────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll('.stat-number[data-target]');
if (counterEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => io.observe(el));
}

// ── Article filter (articles page) ──────
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    articleCards.forEach(card => {
      const match = cat === 'all' || card.dataset.category === cat;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ── Contact form validation ──────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name',    errorId: 'nameError',    msg: 'Please enter your name.' },
      { id: 'email',   errorId: 'emailError',   msg: 'Please enter a valid email.', isEmail: true },
      { id: 'message', errorId: 'messageError', msg: 'Please enter your message.' },
    ];

    fields.forEach(({ id, errorId, msg, isEmail }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(errorId);
      if (!input || !errEl) return;
      const val = input.value.trim();
      const bad = !val || (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      errEl.textContent = bad ? msg : '';
      input.style.borderColor = bad ? '#DC2626' : '';
      if (bad) valid = false;
    });

    if (valid) {
      contactForm.reset();
      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        setTimeout(() => { successEl.style.display = 'none'; }, 5000);
      }
    }
  });
}

// ── Newsletter / notify forms ────────────
document.querySelectorAll('.newsletter-form, .shop-notify-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim()) return;
    const btn = form.querySelector('button');
    if (btn) {
      btn.textContent = '✓ Subscribed!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Notify Me';
        btn.disabled = false;
        if (input) input.value = '';
      }, 3000);
    }
  });
});

// ── Scroll-reveal ────────────────────────
const revealEls = document.querySelectorAll('.card, .article-card, .value-card, .team-card, .product-teaser');
if (revealEls.length && 'IntersectionObserver' in window) {
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealIO.observe(el));
}

// ── Footer year ──────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle with persistence
(function () {
  const html = document.documentElement;
  const toggle = document.getElementById('toggleTheme');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('cropSelectorTheme') || 'light';

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
  }

  html.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-bs-theme');
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-bs-theme', next);
      localStorage.setItem('cropSelectorTheme', next);
      updateThemeIcon(next);
      toggle.style.transform = 'rotate(360deg)';
      setTimeout(() => (toggle.style.transform = ''), 450);
    });
  }
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Intersection-based reveal animations
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || elements.length === 0) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => io.observe(el));
})();

// Footer year
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Subtle parallax on background overlay
(function () {
  const overlay = document.querySelector('.bg-overlay');
  if (!overlay) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = window.scrollY * 0.05;
        overlay.style.backgroundPosition = `center calc(50% + ${offset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
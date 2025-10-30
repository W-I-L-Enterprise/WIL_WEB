// YEAR ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// SECTION SCROLL REVEAL ----------------------------------------
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // Reveal only once
    }
  });
}, {
  threshold: 0.15, // Trigger when 15% of section is visible
  rootMargin: '0px 0px -50px 0px' // So it triggers slightly before fully visible
});

sections.forEach(section => observer.observe(section));

// SMOOTH KEYBOARD NAVIGATION (optional) -------------------------
const scrollSections = [...sections];
let lockScroll = false;

window.addEventListener('keydown', (e) => {
  if (lockScroll) return;

  const current = scrollSections.findIndex(s => {
    const r = s.getBoundingClientRect();
    return r.top <= window.innerHeight * 0.6 && r.bottom >= window.innerHeight * 0.4;
  });

  if (e.key === 'PageDown' || e.key === 'ArrowDown') {
    const next = scrollSections[Math.min(current + 1, scrollSections.length - 1)];
    if (next) {
      lockScroll = true;
      next.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => lockScroll = false, 700);
    }
  } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
    const prev = scrollSections[Math.max(current - 1, 0)];
    if (prev) {
      lockScroll = true;
      prev.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => lockScroll = false, 700);
    }
  }
}, { passive: true });

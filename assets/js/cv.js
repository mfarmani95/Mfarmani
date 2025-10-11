// === Scroll progress bar ===
const progressBar = document.getElementById('scrollProgress');
const updateProgress = () => {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop || document.body.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height ? (scrolled / height) * 100 : 0;
  progressBar.style.width = pct + '%';
};
window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);

// === IntersectionObserver for fade-in & skills ===
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.progress-bar span').forEach(bar => {
        const target = bar.getAttribute('data-target');
        if (target && !bar.dataset.done) {
          bar.style.width = target + '%';
          bar.dataset.done = '1';
        }
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(section => io.observe(section));

// === Back to top button ===
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ===== Scroll progress bar =====
const progressBar = document.getElementById('progressBar');
const footer = document.getElementById('footer');

function updateProgress(){
  const scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
  const docHeight = document.scrollingElement.scrollHeight - window.innerHeight;
  const pct = Math.max(0, Math.min(1, scrollTop / docHeight));
  progressBar.style.width = (pct * 100) + '%';
}

// Fade out when footer in view
const footerObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    progressBar.style.opacity = entry.isIntersecting ? '0' : '1';
  });
}, {threshold:0.35});
footerObserver.observe(footer);

// ===== Back to top =====
const backBtn = document.getElementById('backToTop');
function toggleBackBtn(){
  if(window.scrollY > 350){
    backBtn.style.opacity = '1';
    backBtn.style.visibility = 'visible';
  } else {
    backBtn.style.opacity = '0';
    backBtn.style.visibility = 'hidden';
  }
}
backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// ===== Parallax video =====
const parallaxEls = document.querySelectorAll('[data-parallax]');
let ticking = false;
function applyParallax(){
  parallaxEls.forEach(el=>{
    const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
    const rect = el.parentElement.getBoundingClientRect();
    const center = rect.top + rect.height/2 - window.innerHeight/2;
    const translate = -center * speed;
    const vid = el.querySelector('video');
    if(vid) vid.style.transform = `translate(-50%, calc(-50% + ${translate}px))`;
  });
}
function onScroll(){
  updateProgress();
  toggleBackBtn();
  if(!ticking){
    window.requestAnimationFrame(()=>{
      applyParallax();
      ticking = false;
    });
    ticking = true;
  }
}

// ===== Fade-in on scroll =====
const faders = document.querySelectorAll('p, .lead, ul.expertise li');
const io = new IntersectionObserver((entries, obs)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      obs.unobserve(e.target);
    }
  });
}, {threshold:0.15});
faders.forEach(el=> io.observe(el));

// Init
updateProgress();
toggleBackBtn();
applyParallax();
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('resize', ()=> { applyParallax(); updateProgress(); });


// Minimal rotating news rail. Safe & self-contained.

// Your items (edit anytime)
const NEWS_ITEMS = [
  {
    html: `<span class="badge">Release</span> Check out the first public version of the SMM Toolkit. <a href="software.html#smm-toolkit">Docs</a>`
  },
  {
    html: `<span class="badge">Update</span> Paper accepted in <b>WRR</b>: Baseflow generation mechanisms in the arid Southwest. <a href="publications.html">Read more</a>`
  },
  {
    html: `<span class="badge">Release</span> Python package <b>pyBFI</b> published. <a href="software.html#bfi-toolkit">Docs</a>`
  },
  {
  html: `<span class="badge">🏆 News</span> I received the <strong>Arizona Hydrological Society Annual Academic Scholarship</strong>. <a href="https://azhydrosoc.org/for-students/academic-scholarships/" target="_blank">AHS Annual Academic Scholarship</a>`
  },
  {
    html: `<span class="badge">🏆 News</span> I received the <strong>2nd Place Central Arizona Project Award for Water Research</strong>. <a href="https://www.cap-az.com/community/education/award-for-research/">CAP Award</a>`
  }
];

(function(){
  const rail = document.querySelector('.news-rail');
  const track = document.querySelector('.news-track');
  const prev = document.querySelector('.news-nav.prev');
  const next = document.querySelector('.news-nav.next');
  if(!rail || !track) return;

  // build slides
  NEWS_ITEMS.forEach((n, i)=>{
    const s = document.createElement('div');
    s.className = 'news-slide' + (i===0 ? ' active' : '');
    s.innerHTML = n.html;
    track.appendChild(s);
  });
  rail.style.opacity = '1';
  rail.style.transform = 'translateY(0)';

  const slides = [...track.querySelectorAll('.news-slide')];
  let idx = 0, timer = null;

  function show(i){
    slides[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
  }
  function start(){ stop(); timer = setInterval(()=> show(idx+1), 6000); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  prev.addEventListener('click', ()=>{ show(idx-1); start(); });
  next.addEventListener('click', ()=>{ show(idx+1); start(); });

  // pause on hover
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  start();
})();


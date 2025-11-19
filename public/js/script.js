/* Farzana Trading - script.js
   Controls: animated nav, parallax, sliders, icon animations, slide-in observer, contact form
*/

(() => {
  // helper
  const q = (s, el=document) => el.querySelector(s);
  const qa = (s, el=document) => Array.from(el.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded', ()=>{
    // year
    const year = new Date().getFullYear();
    const elYear = document.getElementById('year');
    if(elYear) elYear.textContent = year;

    // mobile nav
    const navToggle = q('.nav-toggle');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `<div class="panel">${q('.main-nav').innerHTML}<div style="margin-top:12px;text-align:right"><button id='closeMobile' class='btn ghost'>Close</button></div></div>`;
    document.body.appendChild(mobileNav);
    navToggle && navToggle.addEventListener('click', ()=> mobileNav.classList.toggle('show'));
    mobileNav.addEventListener('click', (ev)=>{ if(ev.target===mobileNav) mobileNav.classList.remove('show'); });
    const closeMobile = q('#closeMobile', mobileNav);
    closeMobile && closeMobile.addEventListener('click', ()=> mobileNav.classList.remove('show'));

    // animated nav icons tiny tilt on mousemove
    qa('.main-nav a').forEach(a=>{
      a.addEventListener('mousemove', e=>{
        const rect = a.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
        a.style.transform = `translate3d(${dx*6}px, ${dy*6}px, 0) rotate(${dx*2}deg)`;
      });
      a.addEventListener('mouseleave', ()=> a.style.transform='');
    });

    // Intersection observer for slide-in
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){ ent.target.classList.add('visible'); obs.unobserve(ent.target); }
      });
    },{threshold:.12});
    qa('.slide-in').forEach(el=> io.observe(el));

    // Parallax for hero
    const hero = q('.hero');
    const par = q('.hero-parallax');
    const onScroll = ()=>{
      if(!hero || !par) return;
      const rect = hero.getBoundingClientRect();
      const speed = 0.28;
      const y = Math.max(-rect.top*speed, -140);
      par.style.transform = `translateY(${y}px) scale(1.06)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // Sliders for all .slider elements
    qa('.slider').forEach(initSlider);

    // icon animations - subtle bob/pulse
    qa('.animated-icon').forEach(icon => {
      icon.addEventListener('mouseenter', ()=> icon.classList.add('pulse'));
      icon.addEventListener('mouseleave', ()=> icon.classList.remove('pulse'));
    });

    // contact form basic
    const contact = q('#contactForm');
    if(contact){
      contact.addEventListener('submit', e=>{
        e.preventDefault();
        const fm = new FormData(contact);
        const name = fm.get('name')?.toString().trim();
        const email = fm.get('email')?.toString().trim();
        const msg = fm.get('message')?.toString().trim();
        if(!name||!email||!msg){ alert('Please fill all fields.'); return; }
        alert('Thanks '+name + '! We received your message.');
        contact.reset();
      });
    }

    // small hover spin on 'clients' icons if any
    qa('.client-list li').forEach(li=>{
      li.addEventListener('mouseenter', ()=> li.classList.add('spin'));
      li.addEventListener('mouseleave', ()=> li.classList.remove('spin'));
    });

  }); // DOMContentLoaded

  /* Slider builder */
  function initSlider(root){
    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'slides';
    const imgs = Array.from(root.querySelectorAll('img'));
    imgs.forEach(img=>{
      const s = document.createElement('div'); s.className='slide'; s.appendChild(img.cloneNode(true)); slidesWrap.appendChild(s);
    });
    // clear and append
    root.innerHTML = '';
    root.appendChild(slidesWrap);

    const controls = document.createElement('div'); controls.className='slider-controls';
    const dots = imgs.map((_,i)=>{
      const d = document.createElement('button'); d.className='slider-dot'; d.setAttribute('aria-label', 'slide '+(i+1));
      d.addEventListener('click', ()=> go(i)); controls.appendChild(d); return d;
    });
    root.appendChild(controls);

    let index = 0; let timer = null;
    function go(i){ index = i; slidesWrap.style.transform = `translateX(-${index*100}%)`; dots.forEach((d,idx)=> d.classList.toggle('active', idx===index)); }
    function next(){ go((index+1)%imgs.length); }
    if(imgs.length>1){ timer = setInterval(next, 4200); root.addEventListener('mouseenter', ()=> clearInterval(timer)); root.addEventListener('mouseleave', ()=> timer=setInterval(next,4200)); }
    go(0);
  }

})();

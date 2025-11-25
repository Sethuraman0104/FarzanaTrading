// ===== Slide-in Animation =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

document.querySelectorAll('.slide-in').forEach(el => observer.observe(el));

// ===== Smooth Scroll to Top when Logo Clicked =====
document.getElementById('logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Header Scroll Effect =====
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// ===== Hamburger Menu =====
const navToggle = document.querySelector('.nav-toggle');
const wireMenu = document.querySelector('.wire-menu');
navToggle.addEventListener('click', () => wireMenu.classList.toggle('show'));

// ===== Mobile Dropdown Toggle =====
document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('click', (e) => {
    if (window.innerWidth <= 880) {
      e.preventDefault();
      drop.classList.toggle('show');
    }
  });
});

// ===== Close menu on link click (Mobile) =====
document.querySelectorAll('.wire-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (wireMenu.classList.contains('show')) {
      wireMenu.classList.remove('show');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
    }
  });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) scrollTopBtn.style.display = "block";
  else scrollTopBtn.style.display = "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Logo Typing Animation =====
const logoText = "Farzana Trading W.L.L";
const logoSpan = document.getElementById('logo-text');
let i = 0, forward = true;
function typeLogo() {
  if (forward) { i++; if(i > logoText.length){ forward=false; setTimeout(typeLogo,800); return;} }
  else { i--; if(i<0){ forward=true; setTimeout(typeLogo,400); return;} }
  logoSpan.textContent = logoText.slice(0,i);
  setTimeout(typeLogo,150);
}
window.addEventListener('load', typeLogo);

// ===== Image Modal & Slider =====
document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImage");
  let modalClose = document.getElementById("modalClose");
  let modalPrev = document.getElementById("modalPrev");
  let modalNext = document.getElementById("modalNext");
  let currentIndex = 0;
  let images = [];

  document.querySelectorAll(".scrap-slider .slides img").forEach(img => {
    img.addEventListener("click", function () {
      const slider = this.closest(".scrap-slider");
      images = [...slider.querySelectorAll("img")];
      currentIndex = images.indexOf(this);
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  modalNext.onclick = () => { currentIndex = (currentIndex + 1) % images.length; modalImg.src = images[currentIndex].src; };
  modalPrev.onclick = () => { currentIndex = (currentIndex - 1 + images.length) % images.length; modalImg.src = images[currentIndex].src; };
  modalClose.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if(e.target===modal) modal.style.display="none"; };

  // Slider Dots
  document.querySelectorAll('.scrap-slider').forEach(slider => {
    const slides = slider.querySelector('.slides');
    const imgs = slides.querySelectorAll('img');
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.scrap-prev');
    const nextBtn = slider.querySelector('.scrap-next');
    let current = 0;

    imgs.forEach((img,i)=> {
      const dot = document.createElement("div");
      dot.className = "dot" + (i===0 ? " active" : "");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateSlider() {
      slides.style.transform = `translateX(-${current*100}%)`;
      dots.forEach(d=>d.classList.remove("active"));
      dots[current].classList.add("active");
    }

    function nextSlide() { current = (current + 1) % imgs.length; updateSlider(); }
    function prevSlide() { current = (current - 1 + imgs.length) % imgs.length; updateSlider(); }

    nextBtn.onclick = nextSlide;
    prevBtn.onclick = prevSlide;

    dots.forEach(dot => { dot.onclick = ()=> { current=parseInt(dot.dataset.index); updateSlider(); }; });

    setInterval(nextSlide, 3000);
  });
});

// Slide-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // optional: stop observing once visible
    }
  });
}, {
  root: null,         // viewport
  rootMargin: '0px',  // extra offset
  threshold: 0.1      // lower threshold for mobile
});

// Scroll to top when logo or text is clicked
document.getElementById('logo').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // smooth scroll effect
  });
});

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

// Smooth scroll dynamic header
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Mobile nav toggle
toggle.onclick = () => {
  nav.classList.toggle("active");
};

// Get the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling down
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to top smoothly when button clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// observe all slide-in elements
document.querySelectorAll('.slide-in').forEach(el => observer.observe(el));

// Hamburger toggle
const navToggle = document.querySelector('.nav-toggle');
const wireMenu = document.querySelector('.wire-menu');
const dropdown = document.querySelector('.dropdown');

navToggle.addEventListener('click', () => {
  wireMenu.classList.toggle('show');
});

// Mobile dropdown toggle
dropdown.addEventListener('click', (e) => {
  if (window.innerWidth <= 880) {
    e.preventDefault();
    dropdown.classList.toggle('show');
  }
});

// Animate logo typing
const logoText = "Farzana Trading W.L.L";
const logoSpan = document.getElementById('logo-text');
let i = 0, forward = true;
function typeLogo() {
  if (forward) { i++; if (i > logoText.length) { forward = false; setTimeout(typeLogo, 800); return; } }
  else { i--; if (i < 0) { forward = true; setTimeout(typeLogo, 400); return; } }
  logoSpan.textContent = logoText.slice(0, i);
  setTimeout(typeLogo, 150);
}
window.addEventListener('load', typeLogo);

document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImage");
  let modalClose = document.getElementById("modalClose");
  let modalPrev = document.getElementById("modalPrev");
  let modalNext = document.getElementById("modalNext");

  let currentModalIndex = 0;
  let currentModalImages = [];

  // Open modal when clicking slider image
  document.querySelectorAll(".scrap-slider .slides img").forEach(img => {
    img.addEventListener("click", function () {

      const slider = this.closest(".scrap-slider");
      currentModalImages = [...slider.querySelectorAll("img")];

      currentModalIndex = currentModalImages.indexOf(this);

      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });

  modalNext.onclick = function () {
    currentModalIndex = (currentModalIndex + 1) % currentModalImages.length;
    modalImg.src = currentModalImages[currentModalIndex].src;
  };

  modalPrev.onclick = function () {
    currentModalIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
    modalImg.src = currentModalImages[currentModalIndex].src;
  };

  modalClose.onclick = () => modal.style.display = "none";

  window.onclick = function (e) {
    if (e.target === modal) modal.style.display = "none";
  };
});

document.querySelectorAll('.scrap-slider').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const images = slides.querySelectorAll('img');
  const dotsContainer = slider.querySelector('.slider-dots');
  const prev = slider.querySelector('.scrap-prev');
  const next = slider.querySelector('.scrap-next');

  let current = 0;

  // Create dots
  images.forEach((img, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.dataset.index = i;
    dotsContainer.appendChild(d);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateSlider() {
    slides.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach(d => d.classList.remove("active"));
    dots[current].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    updateSlider();
  }

  function prevSlide() {
    current = (current - 1 + images.length) % images.length;
    updateSlider();
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  dots.forEach(dot => {
    dot.onclick = () => {
      current = parseInt(dot.dataset.index);
      updateSlider();
    };
  });

  // Auto-play every 3 seconds
  setInterval(nextSlide, 3000);
});
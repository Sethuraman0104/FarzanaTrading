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

// Get the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling down
window.onscroll = function() {
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
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.wire-menu');
    toggle.addEventListener('click', () => nav.classList.toggle('show'));

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

    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("imgModal");
      const modalImg = document.getElementById("modalImg");
      const closeBtn = modal.querySelector(".close");

      // Open modal on image click
      document.querySelectorAll(".modal-img").forEach(img => {
        img.addEventListener("click", () => {
          modal.style.display = "flex";  // only opens on click
          modalImg.src = img.src;
          modalImg.alt = img.alt || "Preview";
        });
      });

      // Close modal on close button click
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Close modal on clicking outside image
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    });
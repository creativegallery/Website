document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. SCROLL ANIMATIONS
     ========================================= */
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('section, header').forEach(s => observer.observe(s));

  /* =========================================
     2. NAVIGATION HIGHLIGHT
     ========================================= */
  const currentPath = window.location.pathname.split("/").pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active-page');
    }
  });

  /* =========================================
     4. LIGHTBOX MODAL
     ========================================= */
  const modal = document.getElementById('modal-preview');
  const modalImg = document.getElementById('modal-image');

  if (modal && modalImg) {
    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => { if(!modal.classList.contains('active')) modalImg.src = ""; }, 300);
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.imgwrap img, .polaroid-img, .stack-front, .cat-img-wrap img').forEach(img => {
      img.addEventListener('click', (e) => {
        if (img.src.includes('base64') || img.classList.contains('logo')) return;
        e.preventDefault(); e.stopPropagation();
        modalImg.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modal.addEventListener('click', closeModal);
  }
});

/* =========================================
     MOMENTUM SCROLLING ENGINE
     ========================================= */
  // Initialize Lenis
  const lenis = new Lenis({
    duration: 1.2, // Higher = slower, smoother stop
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for "luxury" feel
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Keep false for mobile to feel native but smooth
    touchMultiplier: 2,
  });

  // Animation Loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
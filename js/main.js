/* =========================================
  Scroll Animations & Smooth Scrolling
  ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SCROLL ANIMATIONS
  const observerOptions = { 
   threshold: 0.1, 
   rootMargin: "0px 0px -50px 0px" 
  };
  
  const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
   });
  }, observerOptions);
  
  document.querySelectorAll('section, header').forEach(section => {
   if (!section.classList.contains('animate')) {
    observer.observe(section);
   }
  });

  // 2. NAVIGATION HIGHLIGHT
  const currentPath = window.location.pathname.split("/").pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
   const href = link.getAttribute('href');
   if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active-page');
   }
  });

  // 3. LIGHTBOX MODAL
  const modal = document.getElementById('modal-preview');
  const modalImg = document.getElementById('modal-image');

  if (modal && modalImg) {
   const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => { 
      if (!modal.classList.contains('active')) {
       modalImg.src = ""; 
      }
    }, 300);
    document.body.style.overflow = '';
   };

   document.querySelectorAll('.imgwrap img, .polaroid-img, .stack-front, .cat-img-wrap img').forEach(img => {
    img.addEventListener('click', (e) => {
      if (img.src.includes('base64') || img.classList.contains('logo')) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      modalImg.src = img.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
   });

   modal.addEventListener('click', closeModal);
  }

  // 4. SMOOTH SCROLLING (Lenis)
  const lenis = new Lenis({
   duration: 1.0,
   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
   direction: 'vertical',
   gestureDirection: 'vertical',
   smooth: true,
   mouseMultiplier: 0.8,
   smoothTouch: false,
   touchMultiplier: 1.5,
   wheelMultiplier: 0.8,
   infinite: false
  });

  function raf(time) {
   lenis.raf(time);
   requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 5. PREVENT DOUBLE-TAP ZOOM ON MOBILE
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
   const now = Date.now();
   if (now - lastTouchEnd <= 300) {
    event.preventDefault();
   }
   lastTouchEnd = now;
  }, false);

  // 6. FIX iOS 100vh ISSUE
  function setVH() {
   const vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  // 7. HOME PAGE TEXT ALIGNMENT
  function fixHomepageTextAlignment() {
   const isHomepage = window.location.pathname.includes('index.html') || 
                window.location.pathname === '/' || 
                window.location.pathname === '';
   
   if (!isHomepage) return;

   const elements = {
    heroContent: document.querySelector('.hero-content'),
    heroTitle: document.querySelector('.hero-title'),
    heroDesc: document.querySelector('.hero-desc')
   };

   if (elements.heroContent) {
    Object.assign(elements.heroContent.style, {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '600px',
      width: '100%'
    });
   }
   
   if (elements.heroTitle) {
    Object.assign(elements.heroTitle.style, {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%'
    });
   }
   
   if (elements.heroDesc) {
    Object.assign(elements.heroDesc.style, {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '90%'
    });
   }
  }

  fixHomepageTextAlignment();
  window.addEventListener('resize', fixHomepageTextAlignment);

  // 8. LAZY LOAD IMAGES
  document.querySelectorAll('img:not([loading])').forEach(img => {
   img.setAttribute('loading', 'lazy');
  });
});

// 9. DYNAMIC VH CALCULATION
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

// 10. GLIMMER EFFECT
function addSimpleGlimmer() {
  const style = document.createElement('style');
  style.textContent = `
   .glimmer-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0.3;
   }
  `;
  document.head.appendChild(style);
  
  const glimmer = document.createElement('div');
  glimmer.className = 'glimmer-effect';
  document.body.appendChild(glimmer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addSimpleGlimmer);
} else {
  addSimpleGlimmer();
}

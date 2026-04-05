/**
 * script.js - Handles scroll animations, smooth navigation, 
 * scroll-to-top visibility, and accessibility enhancements.
 * Lightweight, dependency-free, and optimized for GitHub Pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Intersection Observer for scroll-triggered fade-ins
  const fadeElements = document.querySelectorAll('.fade-in-section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 2. Scroll-to-top button logic
  const scrollBtn = document.getElementById('scroll-to-top');
  const scrollThreshold = 400;

  const toggleScrollButton = () => {
    if (window.scrollY > scrollThreshold) {
      scrollBtn.classList.add('visible');
      scrollBtn.removeAttribute('hidden');
    } else {
      scrollBtn.classList.remove('visible');
      // Keep in DOM but hide after transition to prevent layout shift
      setTimeout(() => {
        if (window.scrollY <= scrollThreshold) scrollBtn.setAttribute('hidden', '');
      }, 300);
    }
  };

  window.addEventListener('scroll', toggleScrollButton, { passive: true });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Active Navigation Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const activateNavLink = () => {
    const scrollPos = window.scrollY + 150; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = ''; // Reset
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--accent)';
            link.style.fontWeight = '600';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });
});

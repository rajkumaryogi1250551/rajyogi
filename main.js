/**
 * Ganpati Hotel & Restaurant
 * Main JavaScript - Minimal, Accessible, Progressive Enhancement
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Update copyright year dynamically
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('primary-nav');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      
      // Trap focus in mobile menu when open (basic implementation)
      if (!isExpanded) {
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
    
    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('active');
        }
      });
    });
  }
  
  // Smooth Scroll for Anchor Links (with offset for sticky header)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip if not an internal anchor
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for sticky header (~70px)
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
  // Form Validation Placeholder (Enhance with backend/third-party)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Prevent default for demo; remove in production when backend is ready
      e.preventDefault();
      
      // Basic validation feedback
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.setAttribute('aria-invalid', 'true');
          // Add visual error state
          field.style.borderColor = 'var(--color-error)';
          
          // Show error message (placeholder)
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-msg';
            errorMsg.style.color = 'var(--color-error)';
            errorMsg.textContent = 'This field is required';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        } else {
          field.removeAttribute('aria-invalid');
          field.style.borderColor = '';
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.remove();
          }
        }
      });
      
      if (isValid) {
        // Show success message (placeholder)
        alert('Thank you! Your inquiry has been received. We will contact you shortly.');
        form.reset();
        
        // In production: 
        // - Submit via fetch() to your backend
        // - Or integrate with Formspree, Netlify Forms, etc.
        // Example:
        /*
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            // Show success
          }
        })
        .catch(error => {
          // Show error
        });
        */
      } else {
        // Focus first invalid field
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
      }
    });
    
    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.removeAttribute('aria-invalid');
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
          errorMsg.remove();
        }
      });
    });
  });
  
  // Lazy Loading Enhancement (for browsers that don't support loading="lazy")
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback: Load images immediately
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.removeAttribute('loading');
    });
  }
  
  // Intersection Observer for scroll animations (progressive enhancement)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe section elements for fade-in animation
    document.querySelectorAll('.section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
  
  // Console welcome message (optional)
  console.log('🏨 Ganpati Hotel & Restaurant - Website loaded successfully');
  console.log('📞 Contact: +91 99502 27734');
  console.log('🌐 Built with accessibility and performance in mind');
});

// Utility: Debounce function for scroll/resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optional: Add to window for global access if needed
window.GanpatiUtils = { debounce };

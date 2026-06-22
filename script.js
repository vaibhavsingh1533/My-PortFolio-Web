document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = mobileNavToggle.querySelector('.menu-icon');
  const closeIcon = mobileNavToggle.querySelector('.close-icon');

  function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    
    // Toggle body scroll when menu is active
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  // 3. Smooth Scrolling & Menu Closing
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId === '#' ? 'body' : targetId);
      
      if (targetElement) {
        // If mobile menu is open, close it first
        if (navLinks.classList.contains('active')) {
          toggleMobileMenu();
        }

        // Adjust scroll offset due to sticky header
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. Active Section Navigation Link Highlight
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const activeSectionObserverOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '-20% 0px -40% 0px' // Adjust active threshold range
  };

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, activeSectionObserverOptions);

  sections.forEach(section => {
    activeSectionObserver.observe(section);
  });
});

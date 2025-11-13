document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Create backdrop element
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-menu-backdrop';
  document.body.appendChild(backdrop);

  // Toggle mobile menu
  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    backdrop.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Update aria-expanded attribute
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
  }

  // Close menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking on backdrop
  backdrop.addEventListener('click', toggleMenu);

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      toggleMenu();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Vanta.js background
  if (typeof VANTA !== 'undefined') {
      VANTA.NET({
          el: "#vanta-bg",
          mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x94a2fa, 
  //color: 0x1e80ff,
  backgroundColor: 0x0
      });
  } else {
      console.error('VANTA.NET is not defined. Make sure Vanta.js is properly included.');
  }
});


// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// Sticky form close
document.getElementById('close-form').addEventListener('click', () => {
    document.getElementById('sticky-contact-form').classList.add('hidden');
});






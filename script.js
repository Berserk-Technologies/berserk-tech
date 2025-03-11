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
  backgroundColor: 0x0
      });
  } else {
      console.error('VANTA.NET is not defined. Make sure Vanta.js is properly included.');
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('close-form');
    const form = document.getElementById('sticky-contact-form');

    if (closeButton && form) {
        closeButton.addEventListener('click', function() {
            // Remove md:block and add hidden to ensure it hides on all screens
            form.classList.remove('md:block');
            form.classList.add('hidden');
        });
    } else {
        console.error('Close button or form not found in the DOM');
    }
});






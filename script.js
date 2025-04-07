document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize or update Vanta.js with responsive spacing
    let vantaEffect = null;

    function initVanta() {
        // Destroy existing effect if it exists
        if (vantaEffect) {
            vantaEffect.destroy();
        }

        // Set spacing based on screen width
        const isMobile = window.innerWidth < 768; // Matches Tailwind's md breakpoint
        const spacingValue = isMobile ? 30 : 15; // Larger spacing for mobile, default for desktop

        // Initialize Vanta.js background
        if (typeof VANTA !== 'undefined') {
            vantaEffect = VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x94a2fa,
                backgroundColor: 0x0,
                spacing: spacingValue // Dynamic spacing
            });
        } else {
            console.error('VANTA.NET is not defined. Make sure Vanta.js is properly included.');
        }
    }

    // Initial call to set up Vanta
    initVanta();

    // Update Vanta on window resize
    window.addEventListener('resize', function() {
        initVanta();
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

});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-form');

    // Show form with slide animation after 2 seconds
    setTimeout(() => {
        form.classList.remove('form-hidden');
        form.classList.add('form-visible');
        overlay.classList.remove('hidden');
    }, 3000);

    // Close form function
    function closeForm() {
        form.classList.remove('form-visible');
        form.classList.add('form-hidden');
        overlay.classList.add('hidden');
    }

    // Close form on button click
    closeBtn.addEventListener('click', closeForm);

    // Close form on outside click
    overlay.addEventListener('click', closeForm);

    // Optional: Handle form submission (no auto-close here as per request)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted (add backend logic here)');
        // You can add your submission logic here
    });
});


    // Sticky form functionality
    const form = document.getElementById('sticky-contact-form');
    const overlay = document.getElementById('overlay');
    const closeFormBtn = document.getElementById('close-form');

    // Show form after 2 seconds
    setTimeout(() => {
        form.classList.remove('form-hidden');
        form.classList.add('form-visible');
        overlay.classList.remove('hidden');
    }, 2000);

    // Close form function
    function closeForm() {
        form.classList.remove('form-visible');
        form.classList.add('form-hidden');
        overlay.classList.add('hidden');
    }

    // Close form on button click
    closeFormBtn.addEventListener('click', closeForm);

    // Close form on outside click
    overlay.addEventListener('click', closeForm);

    // Form submission (basic console log - add your backend logic here)
    form.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        // Add your submission logic here if needed
    });
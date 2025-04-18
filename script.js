document.addEventListener('DOMContentLoaded', function() {
    // Vanta.js Background Animation
    let vantaEffect = null;

    function initVanta() {
        if (vantaEffect) {
            vantaEffect.destroy();
        }

        const isMobile = window.innerWidth < 768;
        const spacingValue = isMobile ? 30 : 15;

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
                points: 8.00,
                spacing: spacingValue
            });
        } else {
            console.error('VANTA.NET is not defined. Ensure Vanta.js is included.');
        }
    }

    initVanta();
    window.addEventListener('resize', initVanta);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Sticky Form Functionality
    const stickyForm = document.getElementById('sticky-contact-form');
    const overlay = document.getElementById('overlay');
    const closeFormBtn = document.getElementById('close-form');

    function closeStickyForm() {
        stickyForm.classList.remove('form-visible');
        stickyForm.classList.add('form-hidden');
        overlay.classList.add('hidden');
    }

    setTimeout(() => {
        stickyForm.classList.remove('form-hidden');
        stickyForm.classList.add('form-visible');
        overlay.classList.remove('hidden');
    }, 3000);

    closeFormBtn.addEventListener('click', closeStickyForm);
    overlay.addEventListener('click', closeStickyForm);

    // Form Submission Handling for Both Forms
    const handleSubmit = (event) => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);
        const submitButton = myForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            myForm.reset();
            submitButton.textContent = "Sent!";
            alert("Thank you! Your message has been submitted successfully.");
            setTimeout(() => {
                submitButton.textContent = myForm.name === "main-contact" ? "Send Message" : "Send";
                submitButton.disabled = false;
            }, 2000);
        })
        .catch((error) => {
            console.error("Form submission error:", error);
            alert("Oops! Something went wrong. Please try again later.");
            submitButton.textContent = myForm.name === "main-contact" ? "Send Message" : "Send";
            submitButton.disabled = false;
        });
    };

    // Apply submission handler to both forms
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', handleSubmit);
    });
});
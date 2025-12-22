// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu && menuIcon && closeIcon) {
        const isOpen = mobileMenu.classList.contains('menu-open');
        
        if (isOpen) {
            mobileMenu.classList.remove('menu-open');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = ''; // Restore body scroll
        } else {
            mobileMenu.classList.add('menu-open');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        }
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu && menuIcon && closeIcon) {
        mobileMenu.classList.remove('menu-open');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Initialize mobile menu on DOM load
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on mobile menu links
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
});

// Service Navigation Functions
function showService(index) {
    // Hide all service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.classList.add('hidden');
        card.classList.remove('active');
    });
    
    // Show selected service card
    const selectedCard = document.getElementById(`service-${index}`);
    if (selectedCard) {
        selectedCard.classList.remove('hidden');
        selectedCard.classList.add('active');
    }
    
    // Update navigation buttons
    const buttons = document.querySelectorAll('.service-nav-btn');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.remove('bg-white', 'text-black', 'border-2', 'border-black', 'hover:bg-black', 'hover:text-white');
            btn.classList.add('bg-black', 'text-white');
        } else {
            btn.classList.remove('bg-black', 'text-white');
            btn.classList.add('bg-white', 'text-black', 'border-2', 'border-black', 'hover:bg-black', 'hover:text-white');
        }
    });
}

function toggleSubService(serviceIndex, subIndex) {
    const desc = document.getElementById(`desc-${serviceIndex}-${subIndex}`);
    const icon = document.getElementById(`icon-${serviceIndex}-${subIndex}`);
    
    if (desc && icon) {
        desc.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

function toggleMore(serviceIndex, subIndex) {
    const moreContent = document.getElementById(`more-${serviceIndex}-${subIndex}`);
    const btn = document.getElementById(`btn-${serviceIndex}-${subIndex}`);
    
    if (moreContent && btn) {
        moreContent.classList.toggle('hidden');
        if (moreContent.classList.contains('hidden')) {
            btn.textContent = 'Know more';
        } else {
            btn.textContent = 'Show less';
        }
    }
}

// Testimonial Carousel Functions
let activeTestimonial = 4;
const totalTestimonials = 9;
let autoScrollInterval;

function updateCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Get screen width for responsive spacing
    const screenWidth = window.innerWidth;
    let spacing1, spacing2, spacing3, spacing4;
    
    // Adjust spacing based on screen size
    if (screenWidth < 640) { // Mobile
        spacing1 = 50;
        spacing2 = 45;
        spacing3 = 40;
        spacing4 = 35;
    } else if (screenWidth < 768) { // Small tablets
        spacing1 = 55;
        spacing2 = 50;
        spacing3 = 45;
        spacing4 = 40;
    } else if (screenWidth < 1024) { // Tablets
        spacing1 = 58;
        spacing2 = 52;
        spacing3 = 47;
        spacing4 = 42;
    } else { // Desktop
        spacing1 = 60;
        spacing2 = 55;
        spacing3 = 50;
        spacing4 = 45;
    }
    
    cards.forEach((card, index) => {
        // Calculate circular distance for infinite scroll effect
        let diff = index - activeTestimonial;
        
        // Wrap around for infinite effect
        if (diff > totalTestimonials / 2) diff -= totalTestimonials;
        if (diff < -totalTestimonials / 2) diff += totalTestimonials;
        
        const absDiff = Math.abs(diff);
        
        let transform, opacity, zIndex;
        
        if (absDiff === 0) {
            transform = 'translateX(0) scale(1)';
            opacity = 1;
            zIndex = 10;
        } else if (absDiff === 1) {
            transform = `translateX(${diff * spacing1}%) scale(0.88)`;
            opacity = 1;
            zIndex = 8;
        } else if (absDiff === 2) {
            transform = `translateX(${diff * spacing2}%) scale(0.76)`;
            opacity = 1;
            zIndex = 6;
        } else if (absDiff === 3) {
            transform = `translateX(${diff * spacing3}%) scale(0.64)`;
            opacity = 1;
            zIndex = 4;
        } else {
            transform = `translateX(${diff * spacing4}%) scale(0.52)`;
            opacity = 0;
            zIndex = 0;
        }
        
        card.style.transform = transform;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
    });
    
    dots.forEach((dot, index) => {
        if (index === activeTestimonial) {
            dot.classList.remove('w-2', 'bg-gray-300');
            dot.classList.add('w-6', 'bg-gray-900');
        } else {
            dot.classList.remove('w-6', 'bg-gray-900');
            dot.classList.add('w-2', 'bg-gray-300');
        }
    });
}

function autoAdvance() {
    activeTestimonial = activeTestimonial === totalTestimonials - 1 ? 0 : activeTestimonial + 1;
    updateCarousel();
}

function prevTestimonial() {
    clearInterval(autoScrollInterval);
    activeTestimonial = activeTestimonial === 0 ? totalTestimonials - 1 : activeTestimonial - 1;
    updateCarousel();
    startAutoScroll();
}

function nextTestimonial() {
    clearInterval(autoScrollInterval);
    activeTestimonial = activeTestimonial === totalTestimonials - 1 ? 0 : activeTestimonial + 1;
    updateCarousel();
    startAutoScroll();
}

function setTestimonial(index) {
    clearInterval(autoScrollInterval);
    activeTestimonial = index;
    updateCarousel();
    startAutoScroll();
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        autoAdvance();
    }, 2000); // Auto-scroll every 2 seconds
}

// Initialize testimonial carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            setTestimonial(index);
        });
    });

    // Initialize
    updateCarousel();
    startAutoScroll();

    // Update on window resize for responsive spacing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 150);
    });

    // Pause on hover
    const carouselContainer = document.getElementById('testimonial-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }
});

// Video Scroll-to-Play Functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceVideos = [
        document.getElementById('video-service-0'),
        document.getElementById('video-service-1'),
        document.getElementById('video-service-2'),
        document.getElementById('video-service-3')
    ];

    // Filter out null videos (in case some don't exist)
    const videos = serviceVideos.filter(video => video !== null);

    if (videos.length === 0) return;

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Play when 50% of video is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(error => {
                    // Handle autoplay restrictions
                    console.log('Video autoplay prevented:', error);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, observerOptions);

    // Observe all service videos
    videos.forEach(video => {
        observer.observe(video);
    });

    // Also handle service switching - play video when service becomes active
    function handleServiceSwitch() {
        const activeServiceCard = document.querySelector('.service-card.active');
        if (activeServiceCard) {
            const videoId = activeServiceCard.id.replace('service-', 'video-service-');
            const video = document.getElementById(videoId);
            if (video) {
                // Check if video is in viewport
                const rect = video.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInView) {
                    video.play().catch(error => {
                        console.log('Video autoplay prevented:', error);
                    });
                }
            }
        }
    }

    // Override showService to also handle video playback
    const originalShowService = window.showService;
    if (originalShowService) {
        window.showService = function(index) {
            originalShowService(index);
            // Small delay to ensure DOM is updated
            setTimeout(handleServiceSwitch, 100);
        };
    }
});


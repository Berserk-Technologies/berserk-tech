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

// Testimonial Carousel Functions
let activeTestimonial = 4;
const totalTestimonials = 9;
let autoScrollInterval;

function updateCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    
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
            transform = `translateX(${diff * 60}%) scale(0.88)`;
            opacity = 1;
            zIndex = 8;
        } else if (absDiff === 2) {
            transform = `translateX(${diff * 55}%) scale(0.76)`;
            opacity = 1;
            zIndex = 6;
        } else if (absDiff === 3) {
            transform = `translateX(${diff * 50}%) scale(0.64)`;
            opacity = 1;
            zIndex = 4;
        } else {
            transform = `translateX(${diff * 45}%) scale(0.52)`;
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


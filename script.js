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

// Number Animation for Stats Section
document.addEventListener('DOMContentLoaded', function() {
    const animateNumber = (element) => {
        const target = parseFloat(element.getAttribute('data-animate-number'));
        const suffix = element.getAttribute('data-suffix') || '';
        const prefix = element.getAttribute('data-prefix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            // Format the number
            let displayValue = currentValue.toString();
            if (prefix) displayValue = prefix + displayValue;
            if (suffix) displayValue = displayValue + suffix;
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value is set
                let finalValue = target.toString();
                if (prefix) finalValue = prefix + finalValue;
                if (suffix) finalValue = finalValue + suffix;
                element.textContent = finalValue;
            }
        };
        
        requestAnimationFrame(animate);
    };
    
    // Use Intersection Observer to trigger animation when stats section comes into view
    const statsSection = document.getElementById('stats-section');
    const numberElements = document.querySelectorAll('[data-animate-number]');
    
    if (statsSection && numberElements.length > 0) {
        const triggerAnimation = () => {
            numberElements.forEach(element => {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    animateNumber(element);
                }
            });
        };
        
        // Check if section is already visible on page load
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            // Section is already visible, trigger animation immediately
            triggerAnimation();
        } else {
            // Use Intersection Observer for when section comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        triggerAnimation();
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the section is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
            });
            
            observer.observe(statsSection);
        }
    }
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            // Check if this item is currently open
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherItem !== item) {
                    otherAnswer.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal(event) {
    if (!event || event.target === event.currentTarget) {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
            }
        }
    }
}

// Initialize Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone') || '',
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Get submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-not-allowed');
            
            try {
                // API endpoint - change this to your production API URL when deploying
                //const API_URL = 'http://localhost:3000/api/send-email';
                const API_URL = 'https://node-smtp-for-berserk-website.onrender.com/api/send-email';
                
                // Send data to API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Success
                    submitButton.textContent = '✓ Sent!';
                    submitButton.classList.remove('bg-black', 'hover:bg-gray-800');
                    submitButton.classList.add('bg-green-600');
                    
                    // Show success message
                    setTimeout(() => {
                        alert('Thank you for contacting us! We will get back to you soon.');
                        // Close modal and reset form
                        closeContactModal();
                        // Reset button
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        submitButton.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600');
                        submitButton.classList.add('bg-black', 'hover:bg-gray-800');
                    }, 500);
                } else {
                    // Error from API
                    const errorMessage = result.message || 'Failed to send email. Please try again.';
                    throw new Error(errorMessage);
                }
            } catch (error) {
                // Network error or API error
                console.error('Error sending email:', error);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
                
                // Show appropriate error message
                let errorMessage = 'Sorry, there was an error sending your message. ';
                if (error.message.includes('fetch')) {
                    errorMessage += 'Please check your internet connection and try again.';
                } else if (error.message) {
                    errorMessage += error.message;
                } else {
                    errorMessage += 'Please try again later or contact us directly via phone or email.';
                }
                
                alert(errorMessage);
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactModal();
        }
    });
});

// Web Development Page - Horizontal Scrollers
document.addEventListener('DOMContentLoaded', () => {
    const scrollers = document.querySelectorAll('[data-scroller]');
    scrollers.forEach((scroller) => {
        const root = scroller.closest('article') || scroller.parentElement;
        const prev = root ? root.querySelector('.scroller-prev') : null;
        const next = root ? root.querySelector('.scroller-next') : null;

        const step = () => Math.max(280, Math.floor(scroller.clientWidth * 0.85));

        prev?.addEventListener('click', () => {
            scroller.scrollBy({ left: -step(), behavior: 'smooth' });
        });
        next?.addEventListener('click', () => {
            scroller.scrollBy({ left: step(), behavior: 'smooth' });
        });
    });
});

// Web Development Page - Modal Functions
function openModal(url) {
    const modal = document.getElementById('websiteModal');
    const iframe = document.getElementById('websiteFrame');
    
    if (modal && iframe) {
        iframe.src = url;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        // Reset to desktop view when opening
        setView('desktop');
    }
}

function closeModal() {
    const modal = document.getElementById('websiteModal');
    const iframe = document.getElementById('websiteFrame');
    
    if (modal && iframe) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        iframe.src = '';
        document.body.style.overflow = 'auto';
    }
}

function setView(view) {
    const modal = document.getElementById('websiteModal');
    const buttons = document.querySelectorAll('.view-toggle-btn');
    
    if (modal) {
        // Remove all view classes
        modal.classList.remove('view-desktop', 'view-tablet', 'view-mobile');
        // Add selected view class
        modal.classList.add('view-' + view);
        
        // Update button states
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        const viewBtn = document.getElementById('view-' + view + '-btn');
        if (viewBtn) {
            viewBtn.classList.add('active');
        }
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const websiteModal = document.getElementById('websiteModal');
    if (websiteModal) {
        websiteModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }
});

// Web Development Page - Toggle expand all examples
function toggleExpandAll(serviceId) {
    const container = document.querySelector(`[data-service="${serviceId}"].examples-container`);
    const navButtons = document.querySelector(`[data-service="${serviceId}"].navigation-buttons`);
    const viewAllBtn = document.querySelector(`[data-service="${serviceId}"].view-all-btn`);
    
    if (container && viewAllBtn) {
        if (container.classList.contains('expanded')) {
            // Collapse
            container.classList.remove('expanded');
            viewAllBtn.textContent = 'View all';
            if (navButtons) navButtons.style.display = 'flex';
        } else {
            // Expand
            container.classList.add('expanded');
            viewAllBtn.textContent = 'Show less';
            if (navButtons) navButtons.style.display = 'none';
        }
    }
}


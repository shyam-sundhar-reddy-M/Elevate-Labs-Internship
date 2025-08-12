// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initTypingAnimation();
    initFlashMessages();
    initFormValidation();
    initAnimations();
    initParticles();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll effects and scroll-to-top button
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .project-card, .skill-category, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Full Stack Developer',
        'Python Enthusiast',
        'Web Developer',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeEffect, 1000);
}

// Flash message handling
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        // Auto-hide flash messages after 5 seconds
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    });
}

// Close flash message function (called from HTML)
function closeFlashMessage() {
    const flashMessage = document.getElementById('flash-message');
    if (flashMessage) {
        flashMessage.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => {
            flashMessage.remove();
        }, 500);
    }
}

// Form validation and enhancement
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('.form-input');
    
    // Add real-time validation
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
        });
    });
    
    // Form submission with loading state
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            showLoadingSpinner();
            // Form will submit normally, Flask will handle it
        } else {
            e.preventDefault();
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    removeFieldError(field);
    
    // Required field validation
    if (value === '') {
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
    }
    // Email validation
    else if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Length validation
    else if (fieldName === 'name' && value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long';
        isValid = false;
    }
    else if (fieldName === 'subject' && value.length < 5) {
        errorMessage = 'Subject must be at least 5 characters long';
        isValid = false;
    }
    else if (fieldName === 'message' && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
        field.classList.add('error');
    } else {
        field.classList.remove('error');
        field.classList.add('valid');
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

// Remove field error
function removeFieldError(field) {
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
}

// Loading spinner functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('show');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
}

// Animation initialization
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.card, .project-card, .skill-category');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });
    
    // Parallax effect for background shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.bg-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Particle effect (simplified version)
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const opacity = Math.random() * 0.5 + 0.2;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, ${opacity});
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s infinite linear;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimized scroll listener
const optimizedScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Update scroll-dependent elements
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrolled > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    if (scrolled > 500) {
        scrollTopBtn?.classList.add('show');
    } else {
        scrollTopBtn?.classList.remove('show');
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive updates
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Preload images
function preloadImages() {
    const images = [
        // Add your image paths here
        'images/project1.jpg',
        'images/project2.jpg',
        'images/project3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Add custom CSS animations
const customStyles = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease forwards;
        animation-play-state: paused;
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    .form-input.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-input.valid {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
    
    .form-group.focused .form-label {
        color: var(--primary-color) !important;
    }
    
    .particle {
        filter: blur(1px);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .fade-in-up,
        .particle,
        .bg-shape {
            animation: none !important;
            transform: none !important;
        }
    }
`;

// Inject custom styles
const styleSheet = document.createElement('style');
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close flash messages with Escape
        const flashMessage = document.getElementById('flash-message');
        if (flashMessage) {
            closeFlashMessage();
        }
    }
});

// Focus management for mobile menu
function handleFocusTrapping() {
    const navMenu = document.getElementById('nav-menu');
    const focusableElements = navMenu?.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    document.addEventListener('keydown', function(e) {
        if (!navMenu?.classList.contains('active')) return;
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize focus trapping
handleFocusTrapping();

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.querySelectorAll('.bg-shape, .particle').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page is visible
        document.querySelectorAll('.bg-shape, .particle').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Built with Flask, HTML5, CSS3 & JavaScript
🎨 Featuring modern animations and effects
📱 Fully responsive design
🌟 Optimized for performance

GitHub: https://github.com/yourusername
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Export functions for global access
window.closeFlashMessage = closeFlashMessage;
window.showLoadingSpinner = showLoadingSpinner;
window.hideLoadingSpinner = hideLoadingSpinner;
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle active state for navigation links
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Use debouncing for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const setActiveLink = debounce(() => {
        const scrollPosition = window.scrollY;
        
        // Find the current section more efficiently
        for (const section of document.querySelectorAll('section')) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= (sectionTop - sectionHeight/3)) {
                const current = section.id;
                document.querySelector('.nav-link.active')?.classList.remove('active');
                document.querySelector(`.nav-link[href="#${current}"]`)?.classList.add('active');
            }
        }
    }, 100);

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Update the Smooth Scrolling code
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Add animation class to target section
                targetSection.classList.add('section-entering');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    targetSection.classList.remove('section-entering');
                }, 1000);
            });
        });
    }

    // Scroll Animation for Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('feature-visible');
                featureObserver.unobserve(entry.target); // Stop observing after animation
            }
        }),
        { threshold: 0.5 }
    );

    featureCards.forEach(card => {
        card.classList.add('feature-hidden');
        featureObserver.observe(card);
    });

    // Update the review slider code
    function setupInfiniteReviewSlider() {
        const track = document.querySelector('.review-track');
        if (!track) return;

        // Clone cards once and use fragment for better performance
        const fragment = document.createDocumentFragment();
        track.querySelectorAll('.review-card').forEach(card => {
            fragment.appendChild(card.cloneNode(true));
        });
        track.appendChild(fragment);
    }

    // Initialize the slider
    setupInfiniteReviewSlider();
    initSmoothScroll();

    // Instead, add this more efficient form handling
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}); 
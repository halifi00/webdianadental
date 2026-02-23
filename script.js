// Klinik Pergigian Diana - Main JavaScript

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===================================
// NAVIGATION
// ===================================

// Sticky navigation with scroll effect
const navigation = document.getElementById('navigation');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
    
    if (navMenu.classList.contains('mobile-open')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.navigation-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Close mobile menu after clicking
            if (navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }
    });
});

// ===================================
// CAROUSEL
// ===================================

const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentSlideIndex = 0;
const totalSlides = 5;

// Update carousel position
function updateCarousel() {
    const translateValue = -currentSlideIndex * 100;
    carouselTrack.style.transform = `translateX(${translateValue}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Next slide
nextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
});

// Previous slide
prevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlideIndex = index;
        updateCarousel();
    });
});

// Auto-play carousel (optional - every 5 seconds)
let autoPlayInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Pause auto-play on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselWrapper.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
});

// ===================================
// FLOATING BUTTONS
// ===================================

const floatingButtons = document.getElementById('floatingButtons');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingButtons.classList.add('visible');
    } else {
        floatingButtons.classList.remove('visible');
    }
});

// ===================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just \"#\" or empty
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

// Fade in elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.service-card, .review-card, .feature-item, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// PREVENT LOADING FLASH
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===================================
// KEYBOARD NAVIGATION FOR CAROUSEL
// ===================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    } else if (e.key === 'ArrowRight') {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarousel();
    }
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👨‍⚕️ Klinik Pergigian Diana Kuantan', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%c✨ Premium Dental Care with a Gentle Touch', 'font-size: 14px; color: #666666;');
console.log('%c📞 Call us: 014-606 8252', 'font-size: 12px; color: #333333;');

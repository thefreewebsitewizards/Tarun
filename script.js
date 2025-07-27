// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Changed from 80 to 70 to match navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Changed from 80 to 70
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert(`Thank you${name ? ', ' + name : ''}! We'll notify you when we launch.`);
    
    // Reset form
    signupForm.reset();
});

// Add loading animation to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Parallax effect for hero section (disabled completely)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    
    // Disable parallax effect entirely - keep image fixed
    if (heroImg) {
        heroImg.style.transform = 'none';
    }
});

// Also reset transform on window resize
window.addEventListener('resize', function() {
    const heroImg = document.querySelector('.hero-img');
    
    if (heroImg) {
        heroImg.style.transform = 'none';
    }
});

// Add hover effects to kit cards
document.querySelectorAll('.kit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Why Choose Us Carousel Functionality
let currentIndex = 0;
const cards = document.querySelectorAll('.feature-card');
const dots = document.querySelectorAll('.dot');
const carousel = document.getElementById('featuresCarousel');

function updateCarousel(index) {
    // Remove active class from all cards and dots
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current card and dot
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Calculate transform to center the active card
    const cardWidth = 300 + 32; // card width + gap
    const containerWidth = carousel.parentElement.offsetWidth;
    const offset = (containerWidth / 2) - (cardWidth / 2) - (index * cardWidth);
    
    carousel.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
}

// Add click event listeners to cards
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        updateCarousel(index);
    });
});

// Add click event listeners to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateCarousel(index);
    });
});

// Initialize carousel
if (cards.length > 0) {
    updateCarousel(0);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (cards.length > 0) {
        updateCarousel(currentIndex);
    }
});

// Remove any existing carousel JavaScript as the animation is now pure CSS
// The infinite loop is handled entirely by CSS animations
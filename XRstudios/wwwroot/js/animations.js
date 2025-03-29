document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollAnimations();
    initNavbarScroll();
    createFloatingShapes();
});

// Reveal elements as they scroll into view
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load as well
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.nav-container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Create random floating shapes in background
function createFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    if (!container) {
        // Create the container if it doesn't exist
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        document.body.appendChild(shapesContainer);

        const colors = ['rgba(0, 255, 200, 0.1)', 'rgba(255, 0, 102, 0.1)', 'rgba(255, 255, 255, 0.05)'];
        const shapes = ['circle', 'square', 'triangle'];

        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';

            // Random shape class
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            shape.classList.add(shapeType);

            // Random position
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.left = `${Math.random() * 100}%`;

            // Random size
            const size = 20 + Math.random() * 100;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;

            // Random color
            shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            shape.style.borderColor = 'rgba(0, 255, 200, 0.2)';

            // Random animation duration and delay
            shape.style.animationDuration = `${10 + Math.random() * 20}s`;
            shape.style.animationDelay = `${Math.random() * 5}s`;

            shapesContainer.appendChild(shape);
        }
    }
}

// Add hover effects to cards
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollAnimations();
    initNavbarScroll();
    createFloatingShapes();
    initBentoGrid();
    initCardHoverEffects();
    addFloatingIconsEffect();
});

// Reveal elements as they scroll into view
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.bento-item)');

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

// Initialize Bento Grid animations and interactions
function initBentoGrid() {
    const bentoItems = document.querySelectorAll('.bento-item');

    // Reveal animation on scroll with staggered delay
    const revealBentoItems = () => {
        bentoItems.forEach((item, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = item.getBoundingClientRect().top;
            const elementVisible = 150;

            // Add staggered delay based on index
            setTimeout(() => {
                if (elementTop < windowHeight - elementVisible) {
                    item.classList.add('active');
                }
            }, index * 100); // 100ms staggered delay
        });
    };

    window.addEventListener('scroll', revealBentoItems);

    // Trigger on initial load as well
    setTimeout(revealBentoItems, 500);

    // Enhanced hover effects
    bentoItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Add a subtle dim effect to other items
            bentoItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.98)';
                }
            });

            // Add an extra glow effect to the current item
            this.style.boxShadow = `0 10px 30px rgba(0, 255, 200, 0.3), 0 0 20px rgba(0, 255, 200, 0.2)`;
        });

        item.addEventListener('mouseleave', function () {
            // Reset all items
            bentoItems.forEach(otherItem => {
                otherItem.style.opacity = '';
                otherItem.style.transform = '';
            });

            // Reset glow effect
            this.style.boxShadow = '';
        });
    });

    // Mouse parallax effect
    const showcase = document.querySelector('.showcase');
    if (showcase) {
        showcase.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = showcase.offsetWidth / 2;
            const centerY = showcase.offsetHeight / 2;

            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;

            bentoItems.forEach((item, index) => {
                // Different movement intensity for each item
                const factorX = 1 - (index * 0.1);
                const factorY = 1 - (index * 0.1);

                // Apply subtle movement based on mouse position
                const currentTransform = item.style.transform;
                if (item.classList.contains('active')) {
                    item.style.transform = `translateX(${moveX * factorX}px) translateY(${moveY * factorY}px)`;
                }
            });
        });

        // Reset position when mouse leaves the section
        showcase.addEventListener('mouseleave', () => {
            bentoItems.forEach(item => {
                if (item.classList.contains('active')) {
                    item.style.transform = '';
                }
            });
        });
    }

    // Create animated gradients for items without images
    const gradientItems = document.querySelectorAll('.bento-item[style*="radial-gradient"], .bento-item[style*="linear-gradient"]');

    gradientItems.forEach(item => {
        // Subtle animation effect for gradient items
        let hue = 0;
        const interval = setInterval(() => {
            hue = (hue + 1) % 360;

            // Change the accent color in the gradient slightly
            if (item.style.background.includes('rgba(0, 255, 200')) {
                // For items with primary color gradients
                item.style.background = item.style.background.replace(
                    /rgba\(0, 255, 200, ([\d\.]+)\)/g,
                    `hsla(${170 + Math.sin(hue / 30) * 10}, 100%, 50%, $1)`
                );
            } else if (item.style.background.includes('rgba(255, 0, 102')) {
                // For items with accent color gradients
                item.style.background = item.style.background.replace(
                    /rgba\(255, 0, 102, ([\d\.]+)\)/g,
                    `hsla(${340 + Math.sin(hue / 30) * 10}, 100%, 50%, $1)`
                );
            }
        }, 100);

        // Clean up interval when needed
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(interval);
            }
        });
    });
}

// Add hover effects to cards
function initCardHoverEffects() {
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
}

// Add floating effect for bento icons
function addFloatingIconsEffect() {
    const bentoIcons = document.querySelectorAll('.bento-icon');

    bentoIcons.forEach(icon => {
        let floatY = 0;
        let floatDirection = 1;
        let floatSpeed = 0.2 + Math.random() * 0.3;

        function animateFloat() {
            floatY += floatSpeed * floatDirection;

            // Change direction when moving too far
            if (Math.abs(floatY) > 5) {
                floatDirection *= -1;
            }

            icon.style.transform = `translateY(${floatY}px)`;
            requestAnimationFrame(animateFloat);
        }

        animateFloat();
    });
}


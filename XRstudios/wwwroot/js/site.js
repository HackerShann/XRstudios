// Main site functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu toggle if needed
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Add active class to current nav link based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation ||
            (currentLocation === '/' && linkPath === '/Home/Index')) {
            link.classList.add('active');
        }
    });

    // Initialize form validation if contact form exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation example
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (valid) {
                // Show success message or submit the form
                alert('Thanks for your message! We\'ll be in touch soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Function to transition between pages if needed
function pageTransition(url) {
    // Add a page transition effect
    const transition = document.createElement('div');
    transition.classList.add('page-transition');
    document.body.appendChild(
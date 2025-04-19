/**
 * contact.js - Form validation and animations for XRstudios Contact page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initContactForm();
    initAnimations();
    initMapInteraction();
    initFAQInteraction();
});

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Create error message elements for each form field
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.id = `${input.id}-error`;
            group.appendChild(errorMessage);

            // Add real-time validation on blur
            input.addEventListener('blur', () => {
                validateField(input);
            });

            // Clear error state on focus
            input.addEventListener('focus', () => {
                input.classList.remove('invalid');
                const errorMsg = document.getElementById(`${input.id}-error`);
                if (errorMsg) errorMsg.classList.remove('show');
            });
        }
    });

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea, select');

        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Add submission animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">✓</div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                `;

                // Add success animation
                const successMsg = contactForm.querySelector('.success-message');
                successMsg.style.opacity = '0';
                successMsg.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    successMsg.style.opacity = '1';
                    successMsg.style.transform = 'translateY(0)';
                }, 100);

            }, 1500);
        }
    });
}

/**
 * Validate a single form field
 * @param {Element} field - The input element to validate
 * @return {boolean} - Whether the field is valid
 */
function validateField(field) {
    if (!field) return true;

    const errorMsg = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorText = '';

    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorText = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            isValid = false;
            errorText = 'Please enter a valid email address';
        }
    }
    // Phone validation (optional field)
    else if (field.type === 'tel' && field.value.trim()) {
        const phonePattern = /^[\d\s\+\-\(\)]{7,20}$/;
        if (!phonePattern.test(field.value)) {
            isValid = false;
            errorText = 'Please enter a valid phone number';
        }
    }

    // Update UI based on validation result
    if (!isValid) {
        field.classList.add('invalid');
        if (errorMsg) {
            errorMsg.textContent = errorText;
            errorMsg.classList.add('show');
        }
    } else {
        field.classList.remove('invalid');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }

    return isValid;
}

/**
 * Initialize animations for the contact page
 */
function initAnimations() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                // Add staggered delay based on element index
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100); // 100ms staggered delay
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 300); // Initial check

    // Hover effects for contact info items
    const contactInfoItems = document.querySelectorAll('.contact-info-item');
    contactInfoItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

/**
 * Initialize map interaction with Leaflet
 */
function initMapInteraction() {
    const mapContainer = document.getElementById('contactMap');
    if (!mapContainer) return;

    // San Francisco coordinates (replace with your actual location)
    const lat = 37.7749;
    const lng = -122.4194;

    // Initialize the map
    const map = L.map('contactMap').setView([lat, lng], 15);

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    // Add a marker for your location
    const marker = L.marker([lat, lng]).addTo(map);

    // Add a popup to the marker
    marker.bindPopup("<strong>XRstudios</strong><br>123 Tech Hub Street<br>San Francisco, CA 94105").openPopup();

    // Add a subtle circle around your location
    const circle = L.circle([lat, lng], {
        color: '#00ffc8',
        fillColor: '#00ffc8',
        fillOpacity: 0.1,
        radius: 200
    }).addTo(map);

    // Make the map responsive
    window.addEventListener('resize', function () {
        map.invalidateSize();
    });
}

/**
 * Initialize FAQ interaction
 */
function initFAQInteraction() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        // Add click handler if you want expandable FAQs
        item.addEventListener('click', function () {
            // Toggle expanded state
            this.classList.toggle('expanded');

            // Find the answer paragraph
            const question = this.querySelector('h3');
            const answer = this.querySelector('p');

            if (this.classList.contains('expanded')) {
                // Expand answer
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                // Add visual indicator if desired
                if (question) question.classList.add('active');
            } else {
                // Collapse answer
                if (answer) answer.style.maxHeight = null;
                // Remove visual indicator
                if (question) question.classList.remove('active');
            }
        });

        // Add hover effects
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 255, 200, 0.2)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Add CSS styles for expanded FAQ items if they don't exist in CSS
 */
function addFAQStyles() {
    // Only add these styles if they're not already in the CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .faq-item {
            cursor: pointer;
        }
        
        .faq-item p {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-item.expanded p {
            max-height: 1000px; /* Arbitrary large value */
        }
        
        .faq-item h3.active {
            color: var(--accent);
        }
    `;
    document.head.appendChild(styleEl);
}

// Initialize FAQ styles
addFAQStyles();
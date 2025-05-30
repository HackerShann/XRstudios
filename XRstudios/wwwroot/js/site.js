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

    // Initialize project modal functionality
    initProjectModal();

    // Initialization for portfolio page
    initPortfolioFilters();
    initPortfolioItems();
    initTestimonialSlider();
});

// Function to transition between pages if needed
function pageTransition(url) {
    // Add a page transition effect
    const transition = document.createElement('div');
    transition.classList.add('page-transition');
    document.body.appendChild(transition);

    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Gallery Variables
let currentImageIndex = 0;
let galleryImages = [];

// Extract images from gallery
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));
}

// Open fullscreen gallery
function openFullscreenGallery() {
    initializeGallery();

    const fullscreenGallery = document.getElementById('fullscreenGallery');
    const thumbnailStrip = document.getElementById('thumbnailStrip');

    // Generate thumbnails
    thumbnailStrip.innerHTML = '';
    galleryImages.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => goToImage(index);

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;

        thumbnail.appendChild(img);
        thumbnailStrip.appendChild(thumbnail);
    });

    // Set initial image
    currentImageIndex = 0;
    loadFullscreenImage(0);
    updateImageCounter();
    updateNavigationButtons();

    // Show gallery
    fullscreenGallery.classList.add('show');
}

// Close fullscreen gallery
function closeFullscreenGallery() {
    document.getElementById('fullscreenGallery').classList.remove('show');
}

// Load image with loading state
function loadFullscreenImage(index) {
    const fullscreenImage = document.getElementById('fullscreenImage');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Show loading
    loadingOverlay.classList.remove('hidden');

    // Create new image to preload
    const newImg = new Image();
    newImg.onload = function () {
        fullscreenImage.src = this.src;
        fullscreenImage.alt = galleryImages[index].alt;

        // Hide loading after a short delay
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 200);
    };

    newImg.src = galleryImages[index].src;
}

// Change image
function changeFullscreenImage(direction) {
    const newIndex = currentImageIndex + direction;

    if (newIndex >= 0 && newIndex < galleryImages.length) {
        goToImage(newIndex);
    }
}

// Go to specific image
function goToImage(index) {
    if (index >= 0 && index < galleryImages.length) {
        currentImageIndex = index;
        loadFullscreenImage(index);
        updateImageCounter();
        updateThumbnails();
        updateNavigationButtons();
    }
}

// Update image counter
function updateImageCounter() {
    document.getElementById('currentImageIndex').textContent = currentImageIndex + 1;
    document.getElementById('totalImages').textContent = galleryImages.length;
}

// Update thumbnail active state
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.fullscreen-prev');
    const nextBtn = document.querySelector('.fullscreen-next');

    if (prevBtn && nextBtn) {
        prevBtn.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentImageIndex === galleryImages.length - 1 ? '0.3' : '1';

        prevBtn.style.pointerEvents = currentImageIndex === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentImageIndex === galleryImages.length - 1 ? 'none' : 'auto';
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function (e) {
    const fullscreenGallery = document.getElementById('fullscreenGallery');

    if (fullscreenGallery && fullscreenGallery.classList.contains('show')) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                changeFullscreenImage(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                changeFullscreenImage(1);
                break;
            case 'Home':
                e.preventDefault();
                goToImage(0);
                break;
            case 'End':
                e.preventDefault();
                goToImage(galleryImages.length - 1);
                break;
            case 'Escape':
                e.preventDefault();
                closeFullscreenGallery();
                break;
        }
    }
});

// Close on outside click
document.addEventListener('click', function (e) {
    const fullscreenGallery = document.getElementById('fullscreenGallery');
    if (fullscreenGallery && e.target === fullscreenGallery) {
        closeFullscreenGallery();
    }
});

// Prevent image dragging
document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (e) {
    const fullscreenGallery = document.getElementById('fullscreenGallery');
    if (fullscreenGallery && fullscreenGallery.classList.contains('show')) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function (e) {
    const fullscreenGallery = document.getElementById('fullscreenGallery');
    if (fullscreenGallery && fullscreenGallery.classList.contains('show')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            changeFullscreenImage(1);
        } else {
            changeFullscreenImage(-1);
        }
    }
}

// Project Modal functionality
function initProjectModal() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    // Project details
    const projectDetails = {
        project1: {
            title: "Industrial Safety Training",
            category: "Virtual Reality",
            client: "Industrial Innovations Inc.",
            date: "January 2025",
            technologies: ["Unreal Engine 5", "HTC Vive Pro", "Custom Haptic Controllers"],
            description: `
                <p>A comprehensive VR training platform designed to prepare workers for high-risk industrial environments.</p>
                <ul>
                    <li>Real-time feedback on user actions</li>
                    <li>Performance analytics dashboard</li>
                    <li>Customizable scenarios based on facility layout</li>
                </ul>
            `,
            images: [
                "/Assets/Portfolio/Design-System/Button.jpg",
                "/Assets/Portfolio/Design-System/Input.jpg",
                "/Assets/Portfolio/Design-System/Card.jpg"
            ]
        }
        // Add more projects here...
    };

    // Open modal with project details
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const projectId = button.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                // Create modal content WITH gallery expand button
                modalBody.innerHTML = `
                    <div class="project-detail">
                        <div class="project-detail-header">
                            <h2>${project.title}</h2>
                            <div class="project-category">${project.category}</div>
                        </div>
                        
                        <div class="project-detail-gallery">
                            <!-- Gallery expand button -->
                            <div class="gallery-expand" onclick="openFullscreenGallery()" title="View full gallery">
                                ⛶
                            </div>
                            
                            ${project.images.map((img, index) => `
                                <div class="gallery-item ${index === 0 ? 'active' : ''}" onClick="openFullscreenGallery()" style="cursor: pointer;" title="Click to view full gallery">
                                    <img src="${img}" alt="${project.title} - Image ${index + 1}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="project-detail-content">
                            <div class="project-info">
                                <div class="info-item">
                                    <strong>Client:</strong> ${project.client}
                                </div>
                                <div class="info-item">
                                    <strong>Date:</strong> ${project.date}
                                </div>
                                <div class="info-item">
                                    <strong>Technologies:</strong> ${project.technologies.join(', ')}
                                </div>
                            </div>
                            
                            <div class="project-description">
                                ${project.description}
                            </div>
                        </div>
                    </div>
                `;

                // Show modal
                modal.classList.add('show');
                document.body.classList.add('modal-open');

                // Initialize gallery functionality
                if (project.images.length > 1) {
                    initGallerySlider();
                }

                // Initialize fullscreen gallery
                setTimeout(() => {
                    initializeGallery();
                }, 100);
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        });
    }

    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    });
}

// Enhanced gallery slider for project details
function initGallerySlider() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length <= 1) return;

    // Add navigation buttons if multiple images
    const gallery = document.querySelector('.project-detail-gallery');

    // Create navigation if it doesn't exist
    if (!document.querySelector('.gallery-nav')) {
        const navPrev = document.createElement('div');
        navPrev.className = 'gallery-nav gallery-prev';
        navPrev.innerHTML = '←';

        const navNext = document.createElement('div');
        navNext.className = 'gallery-nav gallery-next';
        navNext.innerHTML = '→';

        gallery.appendChild(navPrev);
        gallery.appendChild(navNext);

        // Add active class to first item
        galleryItems[0].classList.add('active');

        // Set up navigation functions
        let currentIndex = 0;

        navPrev.addEventListener('click', () => {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
            galleryItems[currentIndex].classList.add('active');
        });

        navNext.addEventListener('click', () => {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
            galleryItems[currentIndex].classList.add('active');
        });
    }
}

// Portfolio filtering functionality  
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get selected filter category
            const filterValue = button.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Add slight delay for staggered animation
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100);
                } else {
                    item.classList.remove('visible');
                    // Hide after transition completes
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Set all visible initially
    setTimeout(() => {
        portfolioItems.forEach(item => {
            item.classList.add('visible');
        });
    }, 300);
}

// Portfolio item hover effects
function initPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        // Enhanced hover effect
        item.addEventListener('mouseenter', function () {
            this.classList.add('hover');

            // Scale image slightly
            const media = this.querySelector('.portfolio-media');
            if (media) {
                media.style.transform = 'scale(1.05)';
            }
        });

        item.addEventListener('mouseleave', function () {
            this.classList.remove('hover');

            // Reset image scale
            const media = this.querySelector('.portfolio-media');
            if (media) {
                media.style.transform = '';
            }
        });
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const items = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!slider || items.length <= 1) return;

    let currentIndex = 0;

    // Show first item
    items[0].classList.add('active');

    // Previous button
    prevBtn.addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        items[currentIndex].classList.add('active');
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        items[currentIndex].classList.add('active');
    });

    // Auto-rotate testimonials
    let interval = setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        items[currentIndex].classList.add('active');
    }, 5000);

    // Pause rotation on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Resume rotation on mouse leave
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            items[currentIndex].classList.add('active');
        }, 5000);
    });
}
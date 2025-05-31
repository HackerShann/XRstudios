document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio elements
    initPortfolioFilters();
    initPortfolioItems();
    initProjectModal();
    initTestimonialSlider();
});

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

// Project Modal functionality - CORRECT VERSION WITH GALLERY
function initProjectModal() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    // Project details
    const projectDetails = {
        project1: {
            title: "Truck Design System",
            category: "UX/UI",
            client: "AutoNation",
            date: "January 2025",
            technologies: ["Figma", "Adobe XD", "Design Systems", "User Research"],
            description: `
                <p>A comprehensive UX Design System created for AutoNation, the largest automotive retailer in America. This system standardizes the user experience across all digital touchpoints.</p>
                
                <p>Key features include:</p>
                <ul>
                    <li>Component library with 50+ reusable UI elements</li>
                    <li>Design tokens for consistent styling</li>
                    <li>Accessibility guidelines and color contrast standards</li>
                    <li>Mobile-first responsive design patterns</li>
                </ul>
                
                <p>The system has improved design consistency by 85% and reduced development time by 40% across all AutoNation digital products.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg",
                "/Assets/Truck-Design-System.png"
            ]
        },
        project2: {
            title: "Retail Visualization Suite",
            category: "Augmented Reality",
            client: "ModernHome Furnishings",
            date: "November 2024",
            technologies: ["Unity", "ARKit", "ARCore", "Cloud Anchors"],
            description: `
                <p>An augmented reality application allowing customers to visualize furniture and home decor products in their actual living spaces before making a purchase decision.</p>
                
                <p>Key features include:</p>
                <ul>
                    <li>Realistic product visualization with accurate scaling</li>
                    <li>Light estimation for realistic shadows and reflections</li>
                    <li>Social sharing capabilities</li>
                    <li>Integrated purchasing directly through the app</li>
                </ul>
                
                <p>The solution increased conversion rates by 42% and reduced product returns by 37%.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg"
            ]
        },
        project3: {
            title: "Interactive Museum Experience",
            category: "Mixed Reality",
            client: "National History Museum",
            date: "October 2024",
            technologies: ["Microsoft HoloLens 2", "Unity", "Azure Spatial Anchors"],
            description: `
                <p>A mixed reality application that brings historical artifacts to life within museum settings. This solution transforms static exhibits into interactive experiences, revealing hidden stories and details.</p>
                
                <p>Features include:</p>
                <ul>
                    <li>Historical figure holograms that guide visitors</li>
                    <li>Interactive timeline visualizations</li>
                    <li>3D reconstructions of fragile artifacts</li>
                    <li>Educational mini-games and quizzes</li>
                </ul>
                
                <p>The installation increased visitor engagement time by 120% and received overwhelmingly positive feedback from both staff and visitors.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg"
            ]
        },
        project4: {
            title: "Product Configurator",
            category: "3D Modeling",
            client: "TechGear Industries",
            date: "September 2024",
            technologies: ["WebGL", "Three.js", "React", "GLSL Shaders"],
            description: `
                <p>A browser-based 3D product configurator for customizing high-end consumer electronics. This interactive platform allows customers to personalize products with different colors, materials, and components.</p>
                
                <p>The solution features:</p>
                <ul>
                    <li>Photorealistic 3D models with physically-based rendering</li>
                    <li>Real-time configuration updates</li>
                    <li>Cross-device compatibility</li>
                    <li>Social media integration</li>
                </ul>
                
                <p>Implementation resulted in a 28% increase in average order value and significantly improved customer satisfaction scores.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg"
            ]
        },
        project5: {
            title: "Medical Training Platform",
            category: "Virtual Reality",
            client: "Medical Education Center",
            date: "August 2024",
            technologies: ["Unity", "Oculus Quest Pro", "Custom Haptic Devices"],
            description: `
                <p>An advanced VR platform for medical professionals to practice complex surgical procedures. This high-fidelity simulation provides realistic haptic feedback and anatomical precision.</p>
                
                <p>Key components include:</p>
                <ul>
                    <li>Accurate anatomical modeling with deformation physics</li>
                    <li>Procedural guidance with step-by-step instructions</li>
                    <li>Performance metrics and assessment tools</li>
                    <li>Various medical scenarios and difficulty levels</li>
                </ul>
                
                <p>The system has been adopted by three major medical schools and has shown to improve procedural accuracy by 43% compared to traditional training methods.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg"
            ]
        },
        project6: {
            title: "Architectural Visualization",
            category: "Augmented Reality",
            client: "Modern Spaces Architecture",
            date: "July 2024",
            technologies: ["ARKit", "ARCore", "Unity", "Revit Integration"],
            description: `
                <p>An augmented reality solution that enables architects and clients to visualize architectural designs in real-world environments. This tool bridges the gap between technical blueprints and the final built environment.</p>
                
                <p>Features include:</p>
                <ul>
                    <li>1:1 scale visualization of buildings and interiors</li>
                    <li>Material and lighting customization in real-time</li>
                    <li>Collaborative review tools for multiple stakeholders</li>
                    <li>Direct integration with architectural design software</li>
                </ul>
                
                <p>The platform has increased client approval rates by 45% and shortened the design feedback cycle by 60%.</p>
            `,
            images: [
                "/Assets/Truck-cover3.jpg"
            ]
        }
    };

    // Open modal with project details
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const projectId = button.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                // Create modal content WITH gallery expand button AND clickable images
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
                                <div class="gallery-item ${index === 0 ? 'active' : ''}" onclick="openFullscreenGallery()" style="cursor: pointer;" title="Click to view full gallery">
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
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
            items[currentIndex].classList.add('active');
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            items[currentIndex].classList.add('active');
        });
    }

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
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

// Enhanced Project modal functionality with Smart Preview
function initProjectModal() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    // Project details with Smart Preview support
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
                // Create modal content with Smart Preview
                modalBody.innerHTML = `
                    <div class="project-detail">
                        <div class="project-detail-header">
                            <h2>${project.title}</h2>
                            <div class="project-category">${project.category}</div>
                        </div>
                        
                        <div class="project-detail-gallery">
                            ${project.images.map((img, index) => `
                                <div class="gallery-item ${index === 0 ? 'active' : ''}" data-image="${img}">
                                    <img src="${img}" alt="${project.title} - Image ${index + 1}">
                                    <div class="smart-overlay">
                                        <div class="view-full-btn">
                                            🔍 View Full Size
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            
                            ${project.images.length > 1 ? `
                                <div class="gallery-nav gallery-prev">←</div>
                                <div class="gallery-nav gallery-next">→</div>
                            ` : ''}
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

                // Show modal with animation
                modal.classList.add('show');
                document.body.classList.add('modal-open');

                // Initialize Smart Preview functionality
                initSmartPreviewGallery(project.title);
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    });

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

// Smart Preview Gallery functionality
function initSmartPreviewGallery(projectTitle) {
    console.log('Initializing Smart Preview for:', projectTitle); // Debug log

    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length); // Debug log

    // Add click listeners for Smart Preview
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const viewFullBtn = item.querySelector('.view-full-btn');

        if (!img || !viewFullBtn) {
            console.log(`Missing elements in gallery item ${index}`);
            return;
        }

        // Click on view full button
        viewFullBtn.addEventListener('click', (e) => {
            console.log('View full button clicked!');
            e.stopPropagation();
            e.preventDefault();
            openFullscreen(img.src, projectTitle);
        });

        // Click on image itself
        item.addEventListener('click', (e) => {
            console.log('Gallery item clicked!');
            if (!e.target.closest('.view-full-btn')) {
                e.preventDefault();
                openFullscreen(img.src, projectTitle);
            }
        });
    });

    // Gallery navigation if multiple images
    if (galleryItems.length > 1) {
        let currentIndex = 0;

        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                galleryItems[currentIndex].classList.remove('active');
                currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
                galleryItems[currentIndex].classList.add('active');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                galleryItems[currentIndex].classList.remove('active');
                currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
                galleryItems[currentIndex].classList.add('active');
            });
        }
    }
}

// Enhanced Full-screen image functionality with Zoom
function openFullscreen(imageSrc, projectTitle) {
    console.log('Opening fullscreen for:', projectTitle, 'Image:', imageSrc);

    // Create or get fullscreen overlay
    let overlay = document.getElementById('imageFullscreenOverlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'imageFullscreenOverlay';
        overlay.className = 'image-fullscreen-overlay';
        document.body.appendChild(overlay);

        // Add close on background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
    }

    overlay.innerHTML = `
        <div class="fullscreen-content">
            <span class="fullscreen-close">&times;</span>
            <div class="zoom-container">
                <img src="${imageSrc}" alt="${projectTitle}" class="fullscreen-image" id="zoomableImage">
            </div>
            <div class="zoom-controls">
                <button class="zoom-btn zoom-in" title="Zoom In">🔍+</button>
                <button class="zoom-btn zoom-out" title="Zoom Out">🔍−</button>
                <button class="zoom-btn zoom-reset" title="Reset Zoom">⌂</button>
                <span class="zoom-level">100%</span>
            </div>
            <div class="fullscreen-info">
                <p><strong>${projectTitle}</strong></p>
                <p>Scroll to zoom • Click and drag to pan • Use +/- keys • Press ESC to close</p>
            </div>
        </div>
    `;

    // Show overlay first
    overlay.classList.add('show');

    // Wait a moment for the overlay to render, then initialize zoom
    setTimeout(() => {
        initImageZoom();
    }, 100);

    // Add close button functionality
    const closeBtn = overlay.querySelector('.fullscreen-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeFullscreen();
        });
    }
}

// Close fullscreen function
function closeFullscreen() {
    const overlay = document.getElementById('imageFullscreenOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Image zoom functionality
function initImageZoom() {
    const image = document.getElementById('zoomableImage');
    const container = document.querySelector('.zoom-container');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const resetBtn = document.querySelector('.zoom-reset');
    const zoomLevelDisplay = document.querySelector('.zoom-level');

    if (!image || !container) {
        console.log('Zoom elements not found');
        return;
    }

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;

    const minScale = 0.5;
    const maxScale = 5;
    const scaleStep = 0.25;

    // Update transform
    function updateTransform() {
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        zoomLevelDisplay.textContent = Math.round(scale * 100) + '%';

        // Update button states
        if (zoomInBtn) zoomInBtn.disabled = scale >= maxScale;
        if (zoomOutBtn) zoomOutBtn.disabled = scale <= minScale;

        // Add visual feedback for disabled buttons
        if (zoomInBtn) zoomInBtn.classList.toggle('disabled', scale >= maxScale);
        if (zoomOutBtn) zoomOutBtn.classList.toggle('disabled', scale <= minScale);
    }

    // Constrain translation to keep image visible
    function constrainTranslation() {
        if (scale <= 1) {
            translateX = 0;
            translateY = 0;
            return;
        }

        const rect = container.getBoundingClientRect();
        const imgRect = image.getBoundingClientRect();

        // Calculate bounds
        const maxX = (imgRect.width * scale - rect.width) / 2;
        const maxY = (imgRect.height * scale - rect.height) / 2;

        // Constrain translation
        translateX = Math.max(-maxX, Math.min(maxX, translateX));
        translateY = Math.max(-maxY, Math.min(maxY, translateY));
    }

    // Zoom functions
    function zoomIn() {
        if (scale < maxScale) {
            scale = Math.min(maxScale, scale + scaleStep);
            constrainTranslation();
            updateTransform();
        }
    }

    function zoomOut() {
        if (scale > minScale) {
            scale = Math.max(minScale, scale - scaleStep);
            constrainTranslation();
            updateTransform();
        }
    }

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }

    // Mouse wheel zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate mouse position relative to image center
        const imgCenterX = rect.width / 2;
        const imgCenterY = rect.height / 2;

        const deltaX = mouseX - imgCenterX;
        const deltaY = mouseY - imgCenterY;

        const oldScale = scale;

        if (e.deltaY < 0) {
            // Zoom in
            if (scale < maxScale) {
                scale = Math.min(maxScale, scale + scaleStep);
            }
        } else {
            // Zoom out
            if (scale > minScale) {
                scale = Math.max(minScale, scale - scaleStep);
            }
        }

        // Adjust translation to zoom towards mouse position
        if (scale !== oldScale) {
            const scaleRatio = scale / oldScale;
            translateX = translateX * scaleRatio + deltaX * (1 - scaleRatio);
            translateY = translateY * scaleRatio + deltaY * (1 - scaleRatio);

            constrainTranslation();
            updateTransform();
        }
    });

    // Mouse drag to pan
    container.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            lastTranslateX = translateX;
            lastTranslateY = translateY;
            container.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = lastTranslateX + (e.clientX - startX);
            translateY = lastTranslateY + (e.clientY - startY);
            constrainTranslation();
            updateTransform();
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = scale > 1 ? 'grab' : 'default';
        }
    });

    // Button event listeners
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
    if (resetBtn) resetBtn.addEventListener('click', resetZoom);

    // Keyboard shortcuts
    const keyHandler = (e) => {
        const overlay = document.getElementById('imageFullscreenOverlay');
        if (overlay && overlay.classList.contains('show')) {
            switch (e.key) {
                case '+':
                case '=':
                    e.preventDefault();
                    zoomIn();
                    break;
                case '-':
                case '_':
                    e.preventDefault();
                    zoomOut();
                    break;
                case '0':
                    e.preventDefault();
                    resetZoom();
                    break;
            }
        }
    };

    document.addEventListener('keydown', keyHandler);

    // Set initial cursor
    container.style.cursor = 'default';

    // Initialize transform
    updateTransform();
}

// Global escape key handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('imageFullscreenOverlay');
        if (overlay && overlay.classList.contains('show')) {
            closeFullscreen();
        }
    }
});

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
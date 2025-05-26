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

// Project modal functionality
function initProjectModal() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    // Project details (would typically come from a database)
    const projectDetails = {
        project1: {
            title: "Industrial Safety Training",
            category: "Virtual Reality",
            client: "Industrial Innovations Inc.",
            date: "January 2025",
            technologies: ["Unreal Engine 5", "HTC Vive Pro", "Custom Haptic Controllers"],
            description: `
                <p>A comprehensive VR training platform designed to prepare workers for high-risk industrial environments. This immersive solution allows employees to practice dangerous scenarios without physical risk.</p>
                
                <p>The system includes:</p>
                <ul>
                    <li>Real-time feedback on user actions</li>
                    <li>Performance analytics dashboard</li>
                    <li>Customizable scenarios based on facility layout</li>
                    <li>Multi-user training capabilities</li>
                </ul>
                
                <p>Since implementation, client has reported a 65% reduction in workplace safety incidents and 78% improvement in training retention.</p>
            `,
            images: [
                "/assets/Truck-cover3.jpg",
                "/img/portfolio/project1/detail2.jpg",
                "/img/portfolio/project1/detail3.jpg"
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
                "/img/portfolio/project2/detail1.jpg",
                "/img/portfolio/project2/detail2.jpg",
                "/img/portfolio/project2/detail3.jpg"
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
                "/img/portfolio/project3/detail1.jpg",
                "/img/portfolio/project3/detail2.jpg",
                "/img/portfolio/project3/detail3.jpg"
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
                "/img/portfolio/project4/detail1.jpg",
                "/img/portfolio/project4/detail2.jpg",
                "/img/portfolio/project4/detail3.jpg"
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
                "/img/portfolio/project5/detail1.jpg",
                "/img/portfolio/project5/detail2.jpg",
                "/img/portfolio/project5/detail3.jpg"
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
                "/img/portfolio/project6/detail1.jpg",
                "/img/portfolio/project6/detail2.jpg",
                "/img/portfolio/project6/detail3.jpg"
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
                // Create modal content
                modalBody.innerHTML = `
                    <div class="project-detail">
                        <div class="project-detail-header">
                            <h2>${project.title}</h2>
                            <div class="project-category">${project.category}</div>
                        </div>
                        
                        <div class="project-detail-gallery">
                            ${project.images.map(img => `
                                <div class="gallery-item">
                                    <img src="${img}" alt="${project.title}">
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

                // Show modal with animation
                modal.classList.add('show');
                document.body.classList.add('modal-open');

                // Add gallery functionality if multiple images
                initGallerySlider();
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

// Gallery slider for project details
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
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('grid-container');
    const content = document.getElementById('content');
    const title = document.getElementById('title');
    const totalCubes = 300; // More cubes for fuller effect

    // Create and animate cubes
    for (let i = 0; i < totalCubes; i++) {
        const cube = document.createElement('div');
        cube.className = 'cube';

        // Random horizontal position across the entire bottom
        cube.style.left = `${Math.random() * window.innerWidth}px`;

        // Random animation delay (staggered start)
        const delay = Math.random() * 3;
        cube.style.animationDelay = `${delay}s`;

        // Random animation duration (some faster, some slower)
        const duration = 6 + Math.random() * 4;
        cube.style.animationDuration = `${duration}s`;

        container.appendChild(cube);
    }

    // Wait for cubes to reach halfway (approximately 3 seconds with the delays)
    setTimeout(() => {
        // Show content
        content.style.animation = 'fadeIn 1.5s forwards';

        // Wait a moment, then change title color
        setTimeout(() => {
            title.classList.add('color-change');
        }, 1000);
    }, 3000); // 3 seconds delay - adjust if needed to match when cubes reach halfway
});
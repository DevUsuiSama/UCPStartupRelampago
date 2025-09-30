class ProfessionalMatrixService {
    constructor() {
        this.matrixContainer = document.getElementById('matrix-bg');
        this.chars = '01ABCDEFabcdef';
        this.maxChars = 15;
        this.isRunning = false;
        this.animationId = null;
    }

    init() {
        this.createSubtleMatrix();
        this.startAnimation();

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createSubtleMatrix() {
        this.matrixContainer.innerHTML = '';
        const numChars = Math.min(this.maxChars, Math.floor(window.innerWidth / 100));

        for (let i = 0; i < numChars; i++) {
            setTimeout(() => {
                this.createMatrixChar();
            }, i * 200);
        }
    }

    createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.style.left = Math.random() * window.innerWidth + 'px';
        char.style.animationDelay = Math.random() * 5 + 's';
        char.style.animationDuration = (Math.random() * 8 + 8) + 's';
        char.textContent = this.chars.charAt(Math.floor(Math.random() * this.chars.length));

        this.matrixContainer.appendChild(char);

        // Remove after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 16000);
    }

    startAnimation() {
        this.isRunning = true;
        this.animate();
    }

    animate() {
        if (!this.isRunning) return;

        // Occasionally add new characters
        if (Math.random() > 0.97) {
            this.createMatrixChar();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.createSubtleMatrix();
        }, 500);
    }

    onThemeChange(theme) {
        // Adjust visibility based on theme
        this.matrixContainer.style.opacity = theme === 'dark' ? '0.03' : '0.01';
    }
}
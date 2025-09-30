/**
 * Professional Matrix Animation Service
 */
class ProfessionalMatrixService {
    constructor() {
        this.matrixContainer = null;
        this.chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.maxChars = 20;
        this.isRunning = false;
        this.animationId = null;
    }

    init() {
        this.matrixContainer = document.getElementById('matrix-bg');
        if (!this.matrixContainer) {
            console.warn('Matrix container not found');
            return;
        }
        
        this.createSubtleMatrix();
        this.startAnimation();

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createSubtleMatrix() {
        if (!this.matrixContainer) return;
        
        this.matrixContainer.innerHTML = '';
        const numChars = Math.min(this.maxChars, Math.floor(window.innerWidth / 80));

        for (let i = 0; i < numChars; i++) {
            setTimeout(() => {
                this.createMatrixChar();
            }, i * 150);
        }
    }

    createMatrixChar() {
        if (!this.matrixContainer) return;
        
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.style.left = Math.random() * window.innerWidth + 'px';
        char.style.animationDelay = (Math.random() * 5) + 's';
        char.style.animationDuration = (Math.random() * 8 + 8) + 's';
        char.textContent = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        
        this.matrixContainer.appendChild(char);

        setTimeout(() => {
            if (char.parentNode === this.matrixContainer) {
                this.matrixContainer.removeChild(char);
            }
        }, 16000);
    }

    startAnimation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
    }

    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate() {
        if (!this.isRunning) return;

        if (Math.random() > 0.95) {
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
        if (this.matrixContainer) {
            this.matrixContainer.style.opacity = theme === 'dark' ? '0.03' : '0.01';
        }
    }
}
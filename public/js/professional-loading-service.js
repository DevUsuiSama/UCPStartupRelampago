/**
 * Professional Loading Service
 */
class ProfessionalLoadingService {
    constructor() {
        this.element = document.querySelector('.loading');
        this.isVisible = false;
    }

    show() {
        if (this.element) {
            this.element.style.display = 'block';
            this.isVisible = true;
        }
    }

    hide() {
        if (this.element) {
            this.element.style.display = 'none';
            this.isVisible = false;
        }
    }

    setMessage(message) {
        if (this.element) {
            const messageElement = this.element.querySelector('p');
            if (messageElement) {
                messageElement.textContent = message;
            }
        }
    }
}
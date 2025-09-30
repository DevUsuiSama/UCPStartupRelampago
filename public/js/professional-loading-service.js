class ProfessionalLoadingService {
    constructor() {
        this.element = document.querySelector('.loading');
        this.isVisible = false;
    }

    show() {
        this.element.style.display = 'block';
        this.isVisible = true;
    }

    hide() {
        this.element.style.display = 'none';
        this.isVisible = false;
    }
}
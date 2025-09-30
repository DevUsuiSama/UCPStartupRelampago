class ProfessionalThemeService {
    constructor() {
        this.currentTheme = 'dark';
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(theme) {
        this.observers.forEach(observer => observer.onThemeChange && observer.onThemeChange(theme));
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.currentTheme);
        this.notifyObservers(this.currentTheme);

        // Store preference
        try {
            localStorage.setItem('preferred-theme', this.currentTheme);
        } catch (e) {
            console.log('Theme preference could not be stored');
        }
    }

    initTheme() {
        let savedTheme = 'dark';
        try {
            savedTheme = localStorage.getItem('preferred-theme') || 'dark';
        } catch (e) {
            console.log('Could not retrieve saved theme');
        }

        this.currentTheme = savedTheme;
        document.body.setAttribute('data-theme', this.currentTheme);
    }
}
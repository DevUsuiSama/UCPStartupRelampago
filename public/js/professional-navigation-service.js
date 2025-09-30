class ProfessionalNavigationService {
    constructor() {
        this.currentSection = 'home';
        this.sections = document.querySelectorAll('.section');
        this.navItems = document.querySelectorAll('.nav-item');
        this.mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        this.observers = [];
        this.mobileNav = document.getElementById('mobile-nav');
        this.mobileNavToggle = document.getElementById('mobile-nav-toggle');
        this.isMobileNavOpen = false;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(section) {
        this.observers.forEach(observer => {
            if (observer.update) observer.update(section);
        });
    }

    navigateTo(sectionId) {
        // Smooth transition
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            this.updateNavigation();
            this.notifyObservers(sectionId);

            // Update page title
            this.updatePageTitle(sectionId);

            // Close mobile nav if open
            if (this.isMobileNavOpen) {
                this.toggleMobileNav();
            }
        }
    }

    updateNavigation() {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === this.currentSection) {
                item.classList.add('active');
            }
        });

        this.mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === this.currentSection) {
                item.classList.add('active');
            }
        });
    }

    updatePageTitle(section) {
        const titles = {
            home: 'Inicio | Cybersecurity Developer',
            about: 'Acerca de | Cybersecurity Developer',
            projects: 'Proyectos | Cybersecurity Developer',
            skills: 'Habilidades | Cybersecurity Developer',
            contact: 'Contacto | Cybersecurity Developer'
        };

        document.title = titles[section] || 'Cybersecurity Developer';
    }

    toggleMobileNav() {
        this.isMobileNavOpen = !this.isMobileNavOpen;

        if (this.isMobileNavOpen) {
            this.mobileNav.classList.add('active');
            this.mobileNavToggle.classList.add('active');
            this.mobileNavToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            this.mobileNav.classList.remove('active');
            this.mobileNavToggle.classList.remove('active');
            this.mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    initMobileNav() {
        if (this.mobileNavToggle) {
            this.mobileNavToggle.addEventListener('click', () => {
                this.toggleMobileNav();
            });

            // Close mobile nav when clicking on a link
            this.mobileNavItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.target.dataset.section;
                    if (section) {
                        this.navigateTo(section);
                    }
                });
            });
        }
    }
}
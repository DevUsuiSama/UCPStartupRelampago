/**
 * Professional Navigation Service
 */
class ProfessionalNavigationService {
    constructor() {
        this.currentSection = 'home';
        this.sections = [];
        this.navItems = [];
        this.mobileNavItems = [];
        this.observers = [];
        this.mobileNav = null;
        this.mobileNavToggle = null;
        this.isMobileNavOpen = false;
    }

    init() {
        this.sections = Array.from(document.querySelectorAll('.section'));
        this.navItems = Array.from(document.querySelectorAll('.nav-item'));
        this.mobileNavItems = Array.from(document.querySelectorAll('.mobile-nav-item'));
        this.mobileNav = document.getElementById('mobile-nav');
        this.mobileNavToggle = document.getElementById('mobile-nav-toggle');

        this.initMobileNav();
        this.updateNavigation();
    }

    addObserver(observer) {
        if (typeof observer === 'object' && observer !== null) {
            this.observers.push(observer);
        }
    }

    notifyObservers(section) {
        this.observers.forEach(observer => {
            if (observer && typeof observer.update === 'function') {
                observer.update(section);
            }
        });
    }

    navigateTo(sectionId) {
        if (this.currentSection === sectionId) return;

        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            this.updateNavigation();
            this.notifyObservers(sectionId);
            this.updatePageTitle(sectionId);

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
        
        if (this.mobileNav && this.mobileNavToggle) {
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
    }

    initMobileNav() {
        if (this.mobileNavToggle) {
            this.mobileNavToggle.addEventListener('click', () => {
                this.toggleMobileNav();
            });

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

        document.addEventListener('click', (e) => {
            if (this.isMobileNavOpen && 
                this.mobileNav && 
                !this.mobileNav.contains(e.target) && 
                this.mobileNavToggle && 
                !this.mobileNavToggle.contains(e.target)) {
                this.toggleMobileNav();
            }
        });
    }
}
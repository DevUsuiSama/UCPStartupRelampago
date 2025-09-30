class ProfessionalPortfolioApp {
    constructor() {
        // Initialize services with dependency injection
        this.i18nService = new ProfessionalI18nService();
        this.themeService = new ProfessionalThemeService();
        this.navigationService = new ProfessionalNavigationService();
        this.matrixService = new ProfessionalMatrixService();
        this.terminalService = new TerminalAnimationService(this.i18nService);
        this.projectService = new ProfessionalProjectService();
        this.projectsComponent = new ProfessionalProjectsComponent(
            this.projectService,
            ProfessionalProjectFactory
        );

        // Setup observers
        this.professionalObserver = new ProfessionalObserver(this.terminalService);
        this.navigationService.addObserver(this.professionalObserver);
        this.themeService.addObserver(this.professionalObserver);
        this.themeService.addObserver(this.matrixService);

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeServices();
        this.startInitialAnimations();
    }

    initializeServices() {
        this.themeService.initTheme();
        this.i18nService.updateUI();
        this.matrixService.init();
        this.navigationService.initMobileNav();
    }

    setupEventListeners() {
        // Navigation handling
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item') || e.target.matches('[data-section]')) {
                e.preventDefault();
                const section = e.target.dataset.section;
                if (section) {
                    this.navigationService.navigateTo(section);
                }
            }
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeService.toggleTheme();
            });
        }

        // Language selector
        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.addEventListener('change', (e) => {
                this.i18nService.setLanguage(e.target.value);
                // Update terminal animations with new language
                setTimeout(() => {
                    this.terminalService.updateTerminals();
                }, 100);
            });
        }

        // Lazy loading for projects
        this.navigationService.addObserver({
            update: (section) => {
                if (section === 'projects') {
                    this.projectsComponent.render();
                }
            }
        });

        // Professional keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Only if Ctrl/Cmd is pressed and no input is focused
            if ((e.ctrlKey || e.metaKey) && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                switch (e.key) {
                    case '1': this.navigationService.navigateTo('home'); break;
                    case '2': this.navigationService.navigateTo('about'); break;
                    case '3': this.navigationService.navigateTo('projects'); break;
                    case '4': this.navigationService.navigateTo('skills'); break;
                    case '5': this.navigationService.navigateTo('contact'); break;
                }
            }
        });

        // Accessibility: Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNav = document.getElementById('mobile-nav');
            const mobileNavToggle = document.getElementById('mobile-nav-toggle');

            if (this.navigationService.isMobileNavOpen &&
                !mobileNav.contains(e.target) &&
                !mobileNavToggle.contains(e.target)) {
                this.navigationService.toggleMobileNav();
            }
        });
    }

    startInitialAnimations() {
        // Start terminal animation on home page
        setTimeout(() => {
            this.terminalService.animateTerminal('terminal-home', 'home.terminal');
        }, 1000);

        // Add entrance animations to main elements
        this.addEntranceAnimations();
    }

    addEntranceAnimations() {
        // Animate navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });

        // Animate cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + index * 200);
        });
    }

    // Method to handle responsive behavior
    handleResize() {
        // Responsive adjustments could go here
        if (window.innerWidth < 768) {
            // Mobile optimizations
            this.optimizeForMobile();
        } else {
            // Desktop optimizations
            this.optimizeForDesktop();
        }
    }

    optimizeForMobile() {
        // Mobile-specific optimizations
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.padding = '1.5rem';
        });
    }

    optimizeForDesktop() {
        // Desktop-specific optimizations
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.padding = '3rem';
        });
    }
}

// Initialize the professional application
document.addEventListener('DOMContentLoaded', () => {
    // Professional initialization
    const app = new ProfessionalPortfolioApp();

    // Handle window resize
    window.addEventListener('resize', () => {
        app.handleResize();
    });

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when page is not visible
            app.matrixService.isRunning = false;
        } else {
            // Resume animations when page becomes visible
            app.matrixService.isRunning = true;
            app.matrixService.startAnimation();
        }
    });

    // Professional console greeting
    setTimeout(() => {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    PROFESSIONAL PORTFOLIO                    ║
║                                                              ║
║  Welcome to a secure, professional development portfolio    ║
║                                                              ║
║  🔒 Security-first approach                                  ║
║  💼 Enterprise-ready solutions                               ║
║  🚀 Modern development practices                             ║
║                                                              ║
║  Navigation shortcuts:                                       ║
║  Ctrl+1: Home      Ctrl+2: About     Ctrl+3: Projects       ║
║  Ctrl+4: Skills    Ctrl+5: Contact                          ║
║                                                              ║
║  Built with SOLID principles and professional standards     ║
╚══════════════════════════════════════════════════════════════╝
                `);
    }, 2000);
});

// Add CSS for keyboard navigation focus states
const style = document.createElement('style');
style.textContent = `
            body.keyboard-navigation *:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px;
            }
            
            body:not(.keyboard-navigation) *:focus {
                outline: none;
            }
        `;
document.head.appendChild(style);
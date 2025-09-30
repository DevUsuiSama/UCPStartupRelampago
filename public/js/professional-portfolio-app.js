/**
 * Main Professional Portfolio Application
 */
class ProfessionalPortfolioApp {
    constructor() {
        console.log('🔧 Inicializando ProfessionalPortfolioApp...');

        try {
            this.initializeServices();
            this.setupObservers();
            this.init();
        } catch (error) {
            console.error('❌ Error en constructor de ProfessionalPortfolioApp:', error);
            throw error;
        }
    }

    initializeServices() {
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

        this.imageLoader = new ConcurrentImageLoader();
        this.projectLoader = new ConcurrentProjectLoader();
        this.performanceMonitor = new PerformanceMonitor();
    }

    setupObservers() {
        this.professionalObserver = new ProfessionalObserver(this.terminalService);

        this.navigationService.addObserver(this.professionalObserver);
        this.themeService.addObserver(this.professionalObserver);
        this.themeService.addObserver(this.matrixService);

        this.navigationService.addObserver({
            update: (section) => {
                if (section === 'projects') {
                    this.loadProjectsWithConcurrency();
                }
            }
        });
    }

    init() {
        console.log('🚀 Iniciando aplicación portfolio...');

        this.setupEventListeners();
        this.initializeServicesRuntime();
        this.startInitialAnimations();
        this.initializeConcurrentLoaders();
    }

    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');

        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item') || e.target.matches('[data-section]')) {
                e.preventDefault();
                const section = e.target.dataset.section;
                if (section) {
                    this.navigationService.navigateTo(section);
                }
            }
        });

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeService.toggleTheme();
            });
        }

        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.addEventListener('change', (e) => {
                const newLang = e.target.value;

                // Cambiar idioma solo si es distinto al actual
                if (this.i18nService.getCurrentLanguage() !== newLang) {
                    this.i18nService.setLanguage(newLang);

                    setTimeout(() => {
                        // Limpiar terminales antes de actualizar para evitar duplicados
                        document.querySelectorAll('.terminal-line').forEach(el => el.remove());

                        this.terminalService.updateTerminals();
                    }, 100);
                }
            });
        }


        document.addEventListener('keydown', (e) => {
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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        this.setupConcurrentEventListeners();
    }

    setupConcurrentEventListeners() {
        document.addEventListener('projectLoadProgress', (event) => {
            this.updateProgressUI(event.detail);
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('retry-concurrent-load')) {
                e.preventDefault();
                this.loadProjectsWithConcurrency();
            }
        });
    }

    initializeServicesRuntime() {
        this.themeService.initTheme();
        this.i18nService.updateUI();
        this.matrixService.init();
        this.navigationService.init();
    }

    startInitialAnimations() {
        setTimeout(() => {
            this.terminalService.animateTerminal('terminal-home', 'home.terminal');
        }, 1000);

        this.addEntranceAnimations();
    }

    addEntranceAnimations() {
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

    initializeConcurrentLoaders() {
        this.performanceMonitor.startMonitoring();
        console.log('🚀 Carga concurrente inicializada');
    }

    async loadProjectsWithConcurrency() {
        console.log('🔧 Iniciando carga concurrente de proyectos...');

        try {
            this.showLoadingState();

            const projects = await this.projectLoader.loadProjects(
                await this.projectService.getAllProjects(),
                'high'
            );

            await this.projectsComponent.renderWithConcurrency(projects);
            await this.initializeImageLoading();

            this.hideLoadingState();
            this.performanceMonitor.recordProjectLoad();

            console.log('✅ Carga concurrente completada exitosamente');

        } catch (error) {
            console.error('❌ Error en carga concurrente:', error);
            this.handleLoadError(error);
        }
    }

    async initializeImageLoading() {
        const projectImages = document.querySelectorAll('.project-image');
        const imageUrls = this.generateTestImageUrls(projectImages.length);

        projectImages.forEach((imageElement, index) => {
            const imageUrl = imageUrls[index % imageUrls.length];
            this.imageLoader.registerImage(imageElement, imageUrl);
        });

        setTimeout(() => {
            this.imageLoader.loadAllImagesImmediately();
        }, 100);
    }

    generateTestImageUrls(count) {
        const baseUrls = [
            'https://source.unsplash.com/random/400x300?sig=1',
            'https://source.unsplash.com/random/400x300?sig=2',
            'https://source.unsplash.com/random/400x300?sig=3',
            'https://source.unsplash.com/random/400x300?sig=4',
            'https://source.unsplash.com/random/400x300?sig=5',
            'https://source.unsplash.com/random/400x300?sig=6',
            'https://source.unsplash.com/random/400x300?sig=7',
            'https://source.unsplash.com/random/400x300?sig=8',
            'https://source.unsplash.com/random/400x300?sig=9',
            'https://source.unsplash.com/random/400x300?sig=10'
        ];


        return [...baseUrls].sort(() => Math.random() - 0.5)
            .slice(0, Math.max(count, baseUrls.length));
    }

    showLoadingState() {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="card loading-state">
                    <div class="spinner"></div>
                    <p>Cargando proyectos de manera optimizada...</p>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <p class="loading-text">Preparando contenido...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        const loadingState = document.querySelector('.loading-state');
        if (loadingState) {
            loadingState.remove();
        }
    }

    updateProgressUI(progress) {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = `Cargando... ${progress.current}/${progress.total} lotes`;
        }

        const progressBar = document.querySelector('.progress-bar .progress');
        if (progressBar) {
            progressBar.style.width = `${progress.progress}%`;
        }
    }

    handleLoadError(error) {
        console.error('Error de carga:', error);
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="card error-state">
                    <h3>⚠️ Error de Carga Concurrente</h3>
                    <p>No se pudieron cargar los proyectos. ${error.message}</p>
                    <button class="btn retry-btn retry-concurrent-load">Reintentar Carga Optimizada</button>
                </div>
            `;
        }
    }

    handleResize() {
        if (window.innerWidth < 768) {
            this.optimizeForMobile();
        } else {
            this.optimizeForDesktop();
        }
    }

    optimizeForMobile() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.padding = '1.5rem';
        });
    }

    optimizeForDesktop() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.padding = '3rem';
        });
    }
}

// Inicialización global
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        try {
            if (typeof ProfessionalPortfolioApp !== 'undefined') {
                window.portfolioApp = new ProfessionalPortfolioApp();
                console.log('✅ Portfolio Profesional inicializado correctamente');
            } else {
                console.error('❌ ProfessionalPortfolioApp no está definido');
            }
        } catch (error) {
            console.error('❌ Error crítico al inicializar la aplicación:', error);
        }
    }, 100);
});
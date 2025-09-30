/**
 * Professional Projects Component
 */
class ProfessionalProjectsComponent {
    constructor(dataService, factory) {
        this.element = document.getElementById('projects-grid');
        this.dataService = dataService;
        this.factory = factory;
        this.loadingService = new ProfessionalLoadingService();
        this.isLoaded = false;
    }

    async render() {
        if (this.isLoaded) return;

        this.loadingService.show();
        this.element.innerHTML = '';

        try {
            const projects = await this.dataService.getAllProjects();
            
            projects.forEach((project, index) => {
                const projectCard = this.factory.createProjectCard(project);
                projectCard.style.animationDelay = `${index * 0.15}s`;
                this.element.appendChild(projectCard);
            });

            this.isLoaded = true;

        } catch (error) {
            console.error('Error loading projects:', error);
            this.showErrorState();
        } finally {
            this.loadingService.hide();
        }
    }

    async renderWithConcurrency(projects) {
        if (this.isLoaded) return;

        this.loadingService.show();
        this.element.innerHTML = '';

        try {
            for (let i = 0; i < projects.length; i++) {
                const project = projects[i];
                const projectCard = this.factory.createProjectCard(project);
                projectCard.style.animationDelay = `${i * 0.1}s`;
                this.element.appendChild(projectCard);
                
                await this.delay(50);
            }

            this.isLoaded = true;

        } catch (error) {
            console.error('Error in concurrent rendering:', error);
            this.showErrorState();
        } finally {
            this.loadingService.hide();
        }
    }

    showErrorState() {
        if (this.element) {
            this.element.innerHTML = `
                <div class="card error-state">
                    <h3>⚠️ Error de Carga</h3>
                    <p>No se pudieron cargar los proyectos. Por favor, intenta nuevamente.</p>
                    <button class="btn retry-btn" onclick="location.reload()">Reintentar</button>
                </div>
            `;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
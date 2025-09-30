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

        try {
            const projects = await this.dataService.getAllProjects();
            this.element.innerHTML = '';

            projects.forEach((project, index) => {
                const projectCard = this.factory.createProjectCard(project);
                projectCard.style.animationDelay = `${index * 0.15}s`;
                this.element.appendChild(projectCard);
            });

            this.isLoaded = true;

        } catch (error) {
            console.error('Error loading projects:', error);
            this.element.innerHTML = `
                        <div class="card">
                            <p>Error al cargar proyectos. Por favor, intenta nuevamente.</p>
                        </div>
                    `;
        } finally {
            this.loadingService.hide();
        }
    }
}
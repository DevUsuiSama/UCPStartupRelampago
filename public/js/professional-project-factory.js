class ProfessionalProjectFactory {
    static createProjectCard(project) {
        const cardElement = document.createElement('div');
        cardElement.className = 'project-card';

        const statusIcons = {
            'production': '🚀',
            'beta': '🔬',
            'development': '🛠️'
        };

        cardElement.innerHTML = `
                    <div class="project-image">
                        ${project.image}
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">
                            ${project.title} 
                            <small>${statusIcons[project.status] || ''}</small>
                        </h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('')}
                        </div>
                        <a href="#" class="btn">Ver Detalles</a>
                    </div>
                `;

        return cardElement;
    }
}
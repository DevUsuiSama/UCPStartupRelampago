/**
 * Professional Project Component Factory
 */
class ProfessionalProjectFactory {
    static createProjectCard(project = {}) {
        const cardElement = document.createElement('div');
        cardElement.className = 'project-card';

        const statusIcons = {
            production: '🚀',
            beta: '🔬',
            development: '🛠️'
        };

        // Asegurar valores por defecto
        const imageUrl = Array.isArray(project.imageUrls) && project.imageUrls.length > 0 
            ? project.imageUrls[0] 
            : '';
        const title = project.title || 'Proyecto sin título';
        const description = project.description || 'Sin descripción disponible';
        const statusIcon = statusIcons[project.status] || '';
        const technologies = Array.isArray(project.technologies) 
            ? project.technologies 
            : [];

        cardElement.innerHTML = `
            <div class="project-image" data-src="${imageUrl}" data-loaded="false">
                ${project.image || ''}
            </div>
            <div class="project-content">
                <h3 class="project-title">
                    ${title} 
                    <small>${statusIcon}</small>
                </h3>
                <p class="project-description">${description}</p>
                <div class="project-tech">
                    ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="#" class="btn">Ver Detalles</a>
            </div>
        `;

        return cardElement;
    }
}

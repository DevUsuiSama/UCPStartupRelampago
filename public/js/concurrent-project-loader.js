/**
 * Concurrent Project Loader
 */
class ConcurrentProjectLoader {
    constructor() {
        this.concurrentLimit = 2;
        this.priorityWeights = {
            'enterprise': 10,
            'security': 9,
            'healthcare': 8,
            'ecommerce': 7,
            'devops': 6,
            'identity': 5,
            'production': 3,
            'development': 1
        };
    }

    async loadProjects(projects, priority = 'medium') {
        console.log(`🚀 Cargando ${projects.length} proyectos con prioridad: ${priority}`);
        
        const prioritized = this.prioritizeProjects(projects, priority);
        const batches = this.createBatches(prioritized, this.concurrentLimit);
        
        const results = [];
        for (let i = 0; i < batches.length; i++) {
            console.log(`📦 Procesando lote ${i + 1}/${batches.length}`);
            
            const batchResults = await this.processBatch(batches[i], i);
            results.push(...batchResults);
            
            this.updateProgress(i + 1, batches.length);
        }
        
        return results;
    }

    prioritizeProjects(projects, priority) {
        return projects.sort((a, b) => {
            const scoreA = this.calculateProjectScore(a, priority);
            const scoreB = this.calculateProjectScore(b, priority);
            return scoreB - scoreA;
        });
    }

    calculateProjectScore(project, priority) {
        let score = 0;
        
        score += this.priorityWeights[project.category] || 0;
        score += this.priorityWeights[project.status] || 0;
        
        if (project.priority === 'high') score += 5;
        if (priority === 'high') score *= 1.5;
        
        return score;
    }

    createBatches(projects, batchSize) {
        const batches = [];
        for (let i = 0; i < projects.length; i += batchSize) {
            batches.push(projects.slice(i, i + batchSize));
        }
        return batches;
    }

    async processBatch(projects, batchIndex) {
        const batchPromises = projects.map((project, projectIndex) => 
            this.loadProject(project, batchIndex * this.concurrentLimit + projectIndex)
        );
        
        return Promise.allSettled(batchPromises);
    }

    async loadProject(project, globalIndex) {
        await this.delay(100 + Math.random() * 200);
        await this.loadProjectResources(project);
        
        console.log(`✅ Proyecto cargado: ${project.title} (índice: ${globalIndex})`);
        
        return {
            ...project,
            loadedAt: new Date().toISOString(),
            loadIndex: globalIndex
        };
    }

    async loadProjectResources(project) {
        const resources = [
            this.preloadImages(project.imageUrls || []),
            this.loadMetadata(project),
            this.initializeComponents(project)
        ];
        
        return Promise.allSettled(resources);
    }

    async preloadImages(urls) {
        const preloadPromises = urls.map(url => 
            new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = url;
            })
        );
        
        return Promise.allSettled(preloadPromises);
    }

    async loadMetadata(project) {
        await this.delay(50);
        return { ...project, metadataLoaded: true };
    }

    async initializeComponents(project) {
        await this.delay(30);
        return { ...project, componentsInitialized: true };
    }

    updateProgress(current, total) {
        const progress = (current / total) * 100;
        
        const event = new CustomEvent('projectLoadProgress', {
            detail: { progress, current, total }
        });
        document.dispatchEvent(event);
        
        console.log(`📊 Progreso: ${progress.toFixed(1)}% (${current}/${total})`);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
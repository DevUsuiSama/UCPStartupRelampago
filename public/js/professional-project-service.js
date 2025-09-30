/**
 * Professional Project Data Service
 */
class ProfessionalProjectService {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "SecureBank Platform",
                description: "Enterprise banking application with advanced security features, multi-factor authentication, and real-time fraud detection.",
                image: "🏦",
                technologies: ["React", "Node.js", "PostgreSQL", "JWT", "2FA", "Encryption"],
                status: "production",
                category: "enterprise",
                priority: "high",
                imageUrls: [
                    "https://picsum.photos/400/300?random=11",
                    "https://picsum.photos/400/300?random=12"
                ]
            },
            {
                id: 2,
                title: "CloudGuard Dashboard",
                description: "Cloud security monitoring dashboard with threat detection, vulnerability scanning, and compliance reporting.",
                image: "🛡️",
                technologies: ["Vue.js", "Python", "AWS", "Docker", "ElasticSearch", "Grafana"],
                status: "production",
                category: "security",
                priority: "high",
                imageUrls: [
                    "https://picsum.photos/400/300?random=13",
                    "https://picsum.photos/400/300?random=14"
                ]
            },
            {
                id: 3,
                title: "E-Commerce Security Suite",
                description: "Comprehensive security solution for e-commerce platforms including payment protection and data encryption.",
                image: "🛒",
                technologies: ["Next.js", "Stripe", "MongoDB", "Redis", "OAuth", "HTTPS"],
                status: "production",
                category: "ecommerce",
                priority: "medium",
                imageUrls: [
                    "https://picsum.photos/400/300?random=15",
                    "https://picsum.photos/400/300?random=16"
                ]
            },
            {
                id: 4,
                title: "Healthcare Data Platform",
                description: "HIPAA-compliant healthcare data management system with end-to-end encryption and audit trails.",
                image: "⚕️",
                technologies: ["Angular", "Express", "MySQL", "AES-256", "HIPAA", "Audit"],
                status: "production",
                category: "healthcare",
                priority: "high",
                imageUrls: [
                    "https://picsum.photos/400/300?random=17",
                    "https://picsum.photos/400/300?random=18"
                ]
            },
            {
                id: 5,
                title: "DevSecOps Pipeline",
                description: "Automated CI/CD pipeline with integrated security testing, vulnerability scanning, and deployment automation.",
                image: "⚙️",
                technologies: ["Jenkins", "Docker", "Kubernetes", "OWASP ZAP", "SonarQube", "Terraform"],
                status: "production",
                category: "devops",
                priority: "medium",
                imageUrls: [
                    "https://picsum.photos/400/300?random=19",
                    "https://picsum.photos/400/300?random=20"
                ]
            },
            {
                id: 6,
                title: "Identity Management System",
                description: "Enterprise identity and access management solution with SSO, role-based permissions, and audit logging.",
                image: "🔐",
                technologies: ["React", "LDAP", "SAML", "OAuth 2.0", "JWT", "Node.js"],
                status: "production",
                category: "identity",
                priority: "medium",
                imageUrls: [
                    "https://picsum.photos/400/300?random=21",
                    "https://picsum.photos/400/300?random=22"
                ]
            }
        ];
    }

    async getAllProjects() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.projects);
            }, 800);
        });
    }

    async getProjectsByPriority(priority) {
        const projects = await this.getAllProjects();
        return projects.filter(project => project.priority === priority);
    }

    async preloadCriticalProjects() {
        const criticalProjects = await this.getProjectsByPriority('high');
        return this.preloadProjectImages(criticalProjects);
    }

    async preloadProjectImages(projects) {
        const imageUrls = projects.flatMap(project => project.imageUrls || []);
        const preloadPromises = imageUrls.map(url => this.preloadImage(url));
        
        return Promise.allSettled(preloadPromises);
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });
    }
}
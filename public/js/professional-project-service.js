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
                category: "enterprise"
            },
            {
                id: 2,
                title: "CloudGuard Dashboard",
                description: "Cloud security monitoring dashboard with threat detection, vulnerability scanning, and compliance reporting.",
                image: "🛡️",
                technologies: ["Vue.js", "Python", "AWS", "Docker", "ElasticSearch", "Grafana"],
                status: "production",
                category: "security"
            },
            {
                id: 3,
                title: "E-Commerce Security Suite",
                description: "Comprehensive security solution for e-commerce platforms including payment protection and data encryption.",
                image: "🛒",
                technologies: ["Next.js", "Stripe", "MongoDB", "Redis", "OAuth", "HTTPS"],
                status: "production",
                category: "ecommerce"
            },
            {
                id: 4,
                title: "Healthcare Data Platform",
                description: "HIPAA-compliant healthcare data management system with end-to-end encryption and audit trails.",
                image: "⚕️",
                technologies: ["Angular", "Express", "MySQL", "AES-256", "HIPAA", "Audit"],
                status: "production",
                category: "healthcare"
            },
            {
                id: 5,
                title: "DevSecOps Pipeline",
                description: "Automated CI/CD pipeline with integrated security testing, vulnerability scanning, and deployment automation.",
                image: "⚙️",
                technologies: ["Jenkins", "Docker", "Kubernetes", "OWASP ZAP", "SonarQube", "Terraform"],
                status: "production",
                category: "devops"
            },
            {
                id: 6,
                title: "Identity Management System",
                description: "Enterprise identity and access management solution with SSO, role-based permissions, and audit logging.",
                image: "🔐",
                technologies: ["React", "LDAP", "SAML", "OAuth 2.0", "JWT", "Node.js"],
                status: "production",
                category: "identity"
            }
        ];
    }

    async getAllProjects() {
        // Simulate API call with realistic delay
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.projects), 1200);
        });
    }

    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
}
class ProfessionalI18nService {
    constructor() {
        this.currentLang = 'es';
        this.translations = {
            es: {
                title: 'Cybersecurity Developer',
                subtitle: 'Desarrollador Full Stack | Especialista en Seguridad | Innovación Digital',
                controls: {
                    theme: 'Tema'
                },
                nav: {
                    home: 'Inicio',
                    about: 'Acerca de',
                    projects: 'Proyectos',
                    skills: 'Habilidades',
                    contact: 'Contacto'
                },
                loading: 'Cargando contenido profesional...',
                home: {
                    explore: 'Explorar Proyectos',
                    terminal: [
                        '$ whoami',
                        'Desarrollador Full Stack especializado en Ciberseguridad',
                        '$ cat mission.txt',
                        'Creando soluciones digitales seguras y escalables para empresas modernas.',
                        'Combinando expertise técnico con mejores prácticas de seguridad.',
                        '$ status',
                        'Sistema listo para nuevos desafíos...'
                    ]
                },
                about: {
                    title: 'Perfil Profesional',
                    expertise: 'Áreas de Especialización',
                    experience: 'Experiencia',
                    security: 'Seguridad de Aplicaciones',
                    fullstack: 'Desarrollo Full Stack',
                    cloud: 'Arquitectura Cloud',
                    devops: 'DevSecOps',
                    webdev: 'Desarrollo Web',
                    cybersec: 'Ciberseguridad',
                    completed: 'Completados',
                    solutions: 'Soluciones',
                    terminal: [
                        '$ cat profile.md',
                        'Profesional con más de 5 años de experiencia en desarrollo web',
                        'y 3 años especializándose en ciberseguridad empresarial.',
                        '',
                        '$ grep -i "expertise" skills.db',
                        '✓ Desarrollo de aplicaciones web seguras y escalables',
                        '✓ Implementación de arquitecturas cloud robustas',
                        '✓ Auditorías de seguridad y penetration testing',
                        '✓ DevSecOps y automatización de procesos'
                    ]
                },
                projects: {
                    title: 'Proyectos Destacados',
                    description: 'Una selección de proyectos que demuestran expertise técnico y enfoque en seguridad.'
                },
                skills: {
                    title: 'Competencias Técnicas',
                    frontend: 'Frontend Development',
                    backend: 'Backend Development',
                    security: 'Cybersecurity',
                    cloud: 'Cloud & DevOps'
                },
                contact: {
                    title: 'Contacto Profesional',
                    website: 'Sitio Web',
                    terminal: [
                        '$ ping professional.network',
                        'Conectando con profesionales del sector...',
                        '',
                        '$ echo "¿Interesado en colaborar?"',
                        'Disponible para proyectos de desarrollo seguro,',
                        'consultoría en ciberseguridad y soluciones enterprise.',
                        '',
                        '$ cat availability.status',
                        'Estado: Disponible para nuevos proyectos',
                        'Respuesta: Dentro de 24 horas'
                    ]
                },
                footer: {
                    copyright: '© 2025 Cybersecurity Developer Portfolio. Todos los derechos reservados.',
                    disclaimer: 'Enfocado en soluciones seguras y desarrollo profesional'
                }
            },
            en: {
                title: 'Cybersecurity Developer',
                subtitle: 'Full Stack Developer | Security Specialist | Digital Innovation',
                controls: {
                    theme: 'Theme'
                },
                nav: {
                    home: 'Home',
                    about: 'About',
                    projects: 'Projects',
                    skills: 'Skills',
                    contact: 'Contact'
                },
                loading: 'Loading professional content...',
                home: {
                    explore: 'Explore Projects',
                    terminal: [
                        '$ whoami',
                        'Full Stack Developer specialized in Cybersecurity',
                        '$ cat mission.txt',
                        'Creating secure and scalable digital solutions for modern enterprises.',
                        'Combining technical expertise with security best practices.',
                        '$ status',
                        'System ready for new challenges...'
                    ]
                },
                about: {
                    title: 'Professional Profile',
                    expertise: 'Areas of Expertise',
                    experience: 'Experience',
                    security: 'Application Security',
                    fullstack: 'Full Stack Development',
                    cloud: 'Cloud Architecture',
                    devops: 'DevSecOps',
                    webdev: 'Web Development',
                    cybersec: 'Cybersecurity',
                    completed: 'Completed',
                    solutions: 'Solutions',
                    terminal: [
                        '$ cat profile.md',
                        'Professional with 5+ years of experience in web development',
                        'and 3 years specializing in enterprise cybersecurity.',
                        '',
                        '$ grep -i "expertise" skills.db',
                        '✓ Development of secure and scalable web applications',
                        '✓ Implementation of robust cloud architectures',
                        '✓ Security audits and penetration testing',
                        '✓ DevSecOps and process automation'
                    ]
                },
                projects: {
                    title: 'Featured Projects',
                    description: 'A selection of projects demonstrating technical expertise and security focus.'
                },
                skills: {
                    title: 'Technical Competencies',
                    frontend: 'Frontend Development',
                    backend: 'Backend Development',
                    security: 'Cybersecurity',
                    cloud: 'Cloud & DevOps'
                },
                contact: {
                    title: 'Professional Contact',
                    website: 'Website',
                    terminal: [
                        '$ ping professional.network',
                        'Connecting with industry professionals...',
                        '',
                        '$ echo "Interested in collaboration?"',
                        'Available for secure development projects,',
                        'cybersecurity consulting and enterprise solutions.',
                        '',
                        '$ cat availability.status',
                        'Status: Available for new projects',
                        'Response: Within 24 hours'
                    ]
                },
                footer: {
                    copyright: '© 2025 Cybersecurity Developer Portfolio. All rights reserved.',
                    disclaimer: 'Focused on secure solutions and professional development'
                }
            },
            jp: {
                title: 'サイバーセキュリティ開発者',
                subtitle: 'フルスタック開発者 | セキュリティ専門家 | デジタルイノベーション',
                controls: {
                    theme: 'テーマ'
                },
                nav: {
                    home: 'ホーム',
                    about: 'プロフィール',
                    projects: 'プロジェクト',
                    skills: 'スキル',
                    contact: '連絡先'
                },
                loading: 'プロフェッショナルコンテンツを読み込み中...',
                home: {
                    explore: 'プロジェクトを探索',
                    terminal: [
                        '$ whoami',
                        'サイバーセキュリティ専門のフルスタック開発者',
                        '$ cat mission.txt',
                        '現代企業向けの安全でスケーラブルなデジタルソリューションを作成。',
                        '技術的専門知識とセキュリティベストプラクティスを組み合わせ。',
                        '$ status',
                        'システムは新しい挑戦の準備ができています...'
                    ]
                },
                about: {
                    title: 'プロフェッショナルプロフィール',
                    expertise: '専門分野',
                    experience: '経験',
                    security: 'アプリケーションセキュリティ',
                    fullstack: 'フルスタック開発',
                    cloud: 'クラウドアーキテクチャ',
                    devops: 'DevSecOps',
                    webdev: 'Web開発',
                    cybersec: 'サイバーセキュリティ',
                    completed: '完了済み',
                    solutions: 'ソリューション',
                    terminal: [
                        '$ cat profile.md',
                        'Web開発で5年以上の経験を持つプロフェッショナル',
                        'エンタープライズサイバーセキュリティで3年の専門経験。',
                        '',
                        '$ grep -i "expertise" skills.db',
                        '✓ 安全でスケーラブルなWebアプリケーションの開発',
                        '✓ 堅牢なクラウドアーキテクチャの実装',
                        '✓ セキュリティ監査とペネトレーションテスト',
                        '✓ DevSecOpsとプロセス自動化'
                    ]
                },
                projects: {
                    title: '注目プロジェクト',
                    description: '技術的専門知識とセキュリティ重視を示すプロジェクト選集。'
                },
                skills: {
                    title: '技術的能力',
                    frontend: 'フロントエンド開発',
                    backend: 'バックエンド開発',
                    security: 'サイバーセキュリティ',
                    cloud: 'クラウド & DevOps'
                },
                contact: {
                    title: 'プロフェッショナル連絡先',
                    website: 'ウェブサイト',
                    terminal: [
                        '$ ping professional.network',
                        '業界のプロフェッショナルと接続中...',
                        '',
                        '$ echo "コラボレーションに興味がありますか？"',
                        '安全な開発プロジェクト、',
                        'サイバーセキュリティコンサルティング、エンタープライズソリューションに対応可能。',
                        '',
                        '$ cat availability.status',
                        'ステータス: 新しいプロジェクトに対応可能',
                        'レスポンス: 24時間以内'
                    ]
                },
                footer: {
                    copyright: '© 2025 サイバーセキュリティ開発者ポートフォリオ。全著作権所有。',
                    disclaimer: '安全なソリューションとプロフェッショナル開発に焦点'
                }
            }
        };
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateUI();
        }
    }

    translate(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];

        for (const k of keys) {
            translation = translation?.[k];
        }

        return translation || key;
    }

    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation) {
                element.innerHTML = translation;
            }
        });
    }
}

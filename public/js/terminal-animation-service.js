class TerminalAnimationService {
    constructor(i18nService, options = {}) {
        this.i18nService = i18nService;
        this.typewriterSpeed = options.typewriterSpeed || 50;
        this.lineDelay = options.lineDelay || 800;

        // Registro de líneas ya mostradas por terminal
        this.renderedLines = new Map(); 
    }

    async animateTerminal(containerId, contentKey, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`[TerminalAnimationService] Contenedor no encontrado: ${containerId}`);
            return;
        }

        const lines = this.i18nService.translate(contentKey);
        if (!Array.isArray(lines)) {
            console.warn(`[TerminalAnimationService] No se encontró contenido para la clave: ${contentKey}`);
            return;
        }

        // Inicializar registro si no existe
        if (!this.renderedLines.has(containerId)) {
            this.renderedLines.set(containerId, new Set());
        }
        const shown = this.renderedLines.get(containerId);

        container.innerHTML = '';

        for (const line of lines) {
            if (shown.has(line)) {
                // Saltar si ya fue mostrado
                continue;
            }
            await this.typeLine(container, line, options.typewriterSpeed || this.typewriterSpeed);
            shown.add(line);
            await this.wait(options.lineDelay || this.lineDelay);
        }
    }

    async typeLine(container, text, speed) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        container.appendChild(lineDiv);

        const markup = this.getLineMarkup(text);

        for (let i = 0; i < markup.length; i++) {
            lineDiv.innerHTML = markup.slice(0, i + 1);
            await this.wait(speed);
        }

        lineDiv.style.opacity = '1';
    }

    getLineMarkup(text) {
        if (text.startsWith('$ ')) return `<span class="command">${text}</span>`;
        if (text.trim() === '') return '&nbsp;';
        return `<span class="output">${text}</span>`;
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateTerminals() {
        const terminals = [
            { id: 'terminal-home', key: 'home.terminal' },
            { id: 'terminal-about', key: 'about.terminal' },
            { id: 'terminal-contact', key: 'contact.terminal' }
        ];

        return Promise.all(
            terminals.map(t => {
                if (document.getElementById(t.id)) {
                    return this.animateTerminal(t.id, t.key);
                }
            })
        );
    }
}

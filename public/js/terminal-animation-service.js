class TerminalAnimationService {
    constructor(i18nService) {
        this.i18nService = i18nService;
        this.typewriterSpeed = 50;
        this.lineDelay = 800;
    }

    async animateTerminal(containerId, contentKey) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lines = this.i18nService.translate(contentKey);
        if (!Array.isArray(lines)) return;

        container.innerHTML = '';

        for (let i = 0; i < lines.length; i++) {
            await this.typeLine(container, lines[i], i === 0);
            await this.wait(this.lineDelay);
        }
    }

    async typeLine(container, text, isFirst = false) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';

        if (text.startsWith('$ ')) {
            lineDiv.innerHTML = `<span class="command">${text}</span>`;
        } else if (text === '') {
            lineDiv.innerHTML = '&nbsp;';
        } else {
            lineDiv.innerHTML = `<span class="output">${text}</span>`;
        }

        container.appendChild(lineDiv);

        // Animate the line appearing
        await this.wait(100);
        lineDiv.style.opacity = '1';

        return Promise.resolve();
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Method to update terminals when language changes
    updateTerminals() {
        this.animateTerminal('terminal-home', 'home.terminal');
        setTimeout(() => {
            this.animateTerminal('terminal-about', 'about.terminal');
        }, 500);
        setTimeout(() => {
            this.animateTerminal('terminal-contact', 'contact.terminal');
        }, 1000);
    }
}
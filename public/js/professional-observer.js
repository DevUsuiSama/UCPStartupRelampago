class ProfessionalObserver {
    constructor(terminalService) {
        this.terminalService = terminalService;
    }

    update(section) {
        // Trigger terminal animations based on section
        switch (section) {
            case 'home':
                setTimeout(() => this.terminalService.animateTerminal('terminal-home', 'home.terminal'), 300);
                break;
            case 'about':
                setTimeout(() => this.terminalService.animateTerminal('terminal-about', 'about.terminal'), 300);
                break;
            case 'contact':
                setTimeout(() => this.terminalService.animateTerminal('terminal-contact', 'contact.terminal'), 300);
                break;
        }
    }

    onThemeChange(theme) {
        console.log(`Professional theme changed to: ${theme}`);
    }
}
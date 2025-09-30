/**
 * Professional Application Observer
 */
class ProfessionalObserver {
    constructor(terminalService) {
        this.terminalService = terminalService;
    }

    update(section) {
        switch (section) {
            case 'home':
                setTimeout(() => {
                    if (this.terminalService) {
                        this.terminalService.animateTerminal('terminal-home', 'home.terminal');
                    }
                }, 300);
                break;
            case 'about':
                setTimeout(() => {
                    if (this.terminalService) {
                        this.terminalService.animateTerminal('terminal-about', 'about.terminal');
                    }
                }, 300);
                break;
            case 'contact':
                setTimeout(() => {
                    if (this.terminalService) {
                        this.terminalService.animateTerminal('terminal-contact', 'contact.terminal');
                    }
                }, 300);
                break;
        }
    }

    onThemeChange(theme) {
        console.log(`Professional theme changed to: ${theme}`);
    }
}
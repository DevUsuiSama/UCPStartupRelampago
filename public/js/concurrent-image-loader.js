/**
 * Concurrent Image Loader - Versión SPA
 */
class ConcurrentImageLoader {
    constructor() {
        this.pendingImages = new Map();
        this.loadingQueue = [];
        this.activeLoads = 0;
        this.maxConcurrentLoads = 3;
        this.cache = new Map();
        this.loadedImages = new Set();
        this.isSPAMode = true;
    }

    /**
     * Carga todas las imágenes inmediatamente (modo SPA)
     */
    loadAllImagesImmediately() {
        console.log('🔄 Iniciando carga inmediata de todas las imágenes (modo SPA)...');
        
        const imagesToLoad = Array.from(this.pendingImages.entries());
        this.pendingImages.clear();
        
        imagesToLoad.forEach(([element, src]) => {
            this.queueImageLoad(element, src);
        });
    }

    registerImage(element, src) {
        if (!element || !src) return;

        if (this.cache.has(src)) {
            this.applyImage(element, this.cache.get(src));
            return;
        }

        element.setAttribute('data-src', src);
        element.setAttribute('data-loaded', 'false');
        
        this.setPlaceholder(element);
        this.pendingImages.set(element, src);
        
        if (this.isSPAMode) {
            this.queueImageLoad(element, src);
            this.pendingImages.delete(element);
        }
    }

    queueImageLoad(element, src) {
        const existingInQueue = this.loadingQueue.find(item => 
            item.element === element && item.src === src
        );
        
        if (!existingInQueue) {
            this.loadingQueue.push({ element, src });
        }
        
        this.processQueue();
    }

    async processQueue() {
        while (this.loadingQueue.length > 0 && this.activeLoads < this.maxConcurrentLoads) {
            const { element, src } = this.loadingQueue.shift();
            
            if (element.getAttribute('data-loaded') === 'true') {
                continue;
            }
            
            this.activeLoads++;
            
            try {
                await this.loadImage(element, src);
            } catch (error) {
                console.error(`❌ Error cargando imagen: ${src}`, error);
                this.setErrorState(element);
            } finally {
                this.activeLoads--;
                this.processQueue();
            }
        }
    }

    async loadImage(element, src) {
        if (this.cache.has(src)) {
            this.applyImage(element, this.cache.get(src));
            return;
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.cache.set(src, img.src);
                this.applyImage(element, img.src);
                this.loadedImages.add(src);
                resolve();
            };
            
            img.onerror = () => {
                console.error(`🖼️ Falló carga de imagen: ${src}`);
                reject(new Error(`Failed to load image: ${src}`));
            };
            
            img.src = src;
            
            setTimeout(() => {
                if (element.getAttribute('data-loaded') !== 'true') {
                    reject(new Error(`Image load timeout: ${src}`));
                }
            }, 15000);
        });
    }

    applyImage(element, src) {
        if (!document.body.contains(element)) {
            return;
        }
        
        if (element.getAttribute('data-loaded') === 'true') {
            return;
        }

        element.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
        element.style.backgroundImage = `url('${src}')`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (document.body.contains(element)) {
                element.style.opacity = '1';
                element.setAttribute('data-loaded', 'true');
                element.classList.add('image-loaded');
                
                element.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    if (document.body.contains(element)) {
                        element.style.transform = 'scale(1)';
                    }
                }, 300);
            }
        }, 50);
    }

    setPlaceholder(element) {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary-color') || '#1a202c';
        
        element.style.background = `
            linear-gradient(45deg, ${color} 25%, transparent 25%), 
            linear-gradient(-45deg, ${color} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${color} 75%),
            linear-gradient(-45deg, transparent 75%, ${color} 75%)
        `;
        element.style.backgroundSize = '20px 20px';
        element.style.backgroundPosition = '0 0, 0 10px, 10px -10px, -10px 0px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
    }

    setErrorState(element) {
        element.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
        element.innerHTML = '<span style="color: white; font-size: 2rem;">⚠️</span>';
        element.setAttribute('data-loaded', 'error');
    }

    preloadCriticalImages(urls) {
        if (!urls || !Array.isArray(urls)) return;
        
        urls.forEach(url => {
            if (!this.cache.has(url)) {
                const img = new Image();
                img.onload = () => {
                    this.cache.set(url, img.src);
                };
                img.src = url;
            }
        });
    }

    getStats() {
        return {
            totalLoaded: this.loadedImages.size,
            totalCached: this.cache.size,
            queueLength: this.loadingQueue.length,
            activeLoads: this.activeLoads
        };
    }

    cleanup() {
        if (this.cache.size > 50) {
            const entries = Array.from(this.cache.entries());
            this.cache = new Map(entries.slice(-50));
        }
    }
}
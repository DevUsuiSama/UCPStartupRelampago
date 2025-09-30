/**
 * Performance Monitor
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.startTime = performance.now();
        this.imageLoadTimes = [];
        this.projectLoadTimes = [];
    }

    startMonitoring() {
        this.setupPerformanceObserver();
        this.setupImageMonitoring();
        this.setupProjectMonitoring();
        this.setupLoadTimeTracking();
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        this.recordMetric(entry.name, entry.duration);
                    });
                });
                
                observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
            } catch (error) {
                console.warn('PerformanceObserver not supported:', error);
            }
        }
    }

    setupImageMonitoring() {
        document.addEventListener('projectLoadProgress', (event) => {
            this.recordProjectProgress(event.detail);
        });
    }

    setupProjectMonitoring() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const start = performance.now();
            return originalFetch.apply(this, args).then(response => {
                const duration = performance.now() - start;
                console.log(`🌐 Fetch completed in ${duration.toFixed(2)}ms: ${args[0]}`);
                return response;
            });
        };
    }

    setupLoadTimeTracking() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            this.recordMetric('total_load_time', loadTime);
            this.reportMetrics();
        });
    }

    recordProjectLoad() {
        const loadTime = performance.now() - this.startTime;
        this.projectLoadTimes.push(loadTime);
        this.recordMetric('project_load', loadTime);
    }

    recordProjectProgress(progress) {
        this.recordMetric('load_progress', progress.progress);
    }

    recordMetric(name, value) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name).push(value);
    }

    reportMetrics() {
        console.group('🚀 Performance Metrics');
        this.metrics.forEach((values, name) => {
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            console.log(`${name}: ${avg.toFixed(2)}ms (${values.length} samples)`);
        });
        console.groupEnd();
    }

    getMetrics() {
        const result = {};
        this.metrics.forEach((values, name) => {
            result[name] = {
                average: values.reduce((a, b) => a + b, 0) / values.length,
                min: Math.min(...values),
                max: Math.max(...values),
                samples: values.length
            };
        });
        return result;
    }
}
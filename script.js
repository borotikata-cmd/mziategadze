// --- Lenis (Smooth Scroll) ---
const lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.8 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// --- Preloader ---
window.onload = function() {
    setTimeout(() => { document.body.classList.add('loaded'); }, 1000);
};

// --- Intersection Observer (Text Fade-in) ---
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
}, { threshold: 0.5 });
const textContents = document.querySelectorAll('.text-content');
textContents.forEach(content => { textObserver.observe(content); });

// --- Intersection Observer (Lazy Loading Images) ---
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
});
const lazyImages = document.querySelectorAll('.lazy');
lazyImages.forEach(img => { imageObserver.observe(img); });

// --- Scrollytelling Animations ---
const featureSections = document.querySelectorAll('.feature-section');
if (featureSections.length > 0) {
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    lenis.on('scroll', () => {
        featureSections.forEach(section => {
            const imagePanel = section.querySelector('.image-panel');
            const textPanel = section.querySelector('.text-panel');
            if (!imagePanel || !textPanel) return;
            const rect = section.getBoundingClientRect();
            const start = window.innerHeight;
            const end = -section.offsetHeight;
            let progress = (rect.top - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));
            const easedProgress = ease(progress);
            const animationType = section.dataset.animation;
            if (animationType === 'scale-out') {
                imagePanel.style.opacity = 1 - easedProgress;
                imagePanel.style.transform = `scale(${1 + easedProgress * 0.1})`;
            } 
            else if (animationType === 'slide-in') {
                imagePanel.style.opacity = easedProgress;
                imagePanel.style.transform = `translateX(${-50 + easedProgress * 50}%)`;
                textPanel.style.opacity = easedProgress;
                textPanel.style.transform = `translateX(${50 - easedProgress * 50}%)`;
            }
            else if (animationType === 'reveal-up') {
                imagePanel.style.opacity = easedProgress;
                imagePanel.style.transform = `translateY(${50 - easedProgress * 50}%)`;
            }
        });
    });
}

// --- Spotlight Cursor ---
const spotlight = document.querySelector('.spotlight');
if (spotlight) {
    window.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--x', e.clientX + 'px');
        spotlight.style.setProperty('--y', e.clientY + 'px');
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        if (elementUnderCursor && (elementUnderCursor.closest('.feature-section') || elementUnderCursor.closest('.artwork-hero'))) {
            spotlight.classList.add('on-art');
        } else {
            spotlight.classList.remove('on-art');
        }
    });
    const interactiveElements = document.querySelectorAll('a, .image-panel img, .image-panel video, .grid-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => { spotlight.classList.add('hovered'); });
        el.addEventListener('mouseleave', () => { spotlight.classList.remove('hovered'); });
    });
}

// --- Magnetic Buttons ---
const magneticElements = document.querySelectorAll('.logo, nav ul a');
if (magneticElements.length > 0) {
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.4}px, ${y * 0.6}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

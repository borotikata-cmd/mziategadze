:root {
    --text-primary: #f5f5f7;
    --text-secondary: #86868b;
    --background: #000;
    --border-color: #333;
    --x: 50%; /* JS-ით კონტროლირებადი X */
    --y: 50%; /* JS-ით კონტროლირებადი Y */
}

/* Lenis (Smooth Scroll) Styles */
html.lenis {
    height: auto;
}
.lenis.lenis-smooth {
    scroll-behavior: auto !important;
}

body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--background);
    color: var(--text-primary);
    overflow-x: hidden;
    cursor: default;
}

/* Evil Mode - გააქტიურდება Easter Egg-ის დროს */
body.evil-mode {
    filter: invert(1) hue-rotate(180deg) saturate(2);
    transition: filter 1s cubic-bezier(0.4, 0, 0.2, 1);
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 2.5rem;
    z-index: 1000;
    box-sizing: border-box;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

/* Magnetic Elements Base Styles */
.logo, nav ul a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    padding: 10px 22px;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    display: inline-block;
    /* transition: transform 0.1s ease-out; -- JS მართავს მოძრაობას */
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.logo {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

nav a:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin-left: 0.8rem;
}

main {
    padding-top: 0;
}

.full-screen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.hero-content h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.04em;
}

.hero-content p {
    font-size: 1.4rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 1rem auto;
}

/* Feature Sections */
.feature-section {
    position: relative;
    height: 150vh;
}

.feature-content {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.image-panel, .text-panel {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* მნიშვნელოვანი: ვაუქმებთ CSS transition-ს, რადგან JS მართავს მას სქროლისას */
    transition: none !important; 
}

.image-panel img, .image-panel video {
    width: 85%;
    height: auto;
    max-height: 75vh;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    border: 1px solid var(--border-color);
}

/* Text Content Intersection Observer Styles */
.text-content {
    max-width: 420px;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.text-content.visible {
    opacity: 1;
    transform: translateY(0);
}

.text-content h2 {
    font-size: 3.5rem;
    margin: 0 0 1.5rem 0;
    font-weight: 700;
}

.text-content p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Lazy Loading Support */
.lazy {
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.lazy.loaded {
    opacity: 1;
}

/* --- Spotlight Cursor --- */
.spotlight {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 999;
    background: radial-gradient(
        circle 150px at var(--x) var(--y), 
        transparent 0%, 
        rgba(0, 0, 0, 0.96) 100%
    );
    will-change: background, transform;
    transition: transform 0.3s ease-out;
}

.spotlight.on-art {
    background: radial-gradient(
        circle 250px at var(--x) var(--y), 
        transparent 0%, 
        rgba(0, 0, 0, 0.85) 100%
    );
}

.spotlight.hovered {
    transform: scale(1.5);
}

/* --- Preloader --- */
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    transition: opacity 1s ease, visibility 1s ease;
}

.loaded .preloader {
    opacity: 0;
    visibility: hidden;
}

.preloader-logo {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
}

.preloader-logo span {
    display: inline-block;
    opacity: 0;
    transform: translateY(10px);
    animation: letterFadeIn 0.4s ease-out forwards;
}

@keyframes letterFadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Gallery & Grid */
.gallery-page-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 160px 40px 80px 40px;
}

.gallery-page-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

.grid-item {
    aspect-ratio: 1 / 1;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    background: #111;
    border: 1px solid var(--border-color);
}

.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.grid-item:hover img {
    transform: scale(1.08);
}

footer {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
    border-top: 1px solid var(--border-color);
}

/* Responsive */
@media (max-width: 768px) {
    .feature-content {
        flex-direction: column;
    }
    .image-panel, .text-panel {
        width: 100%;
        height: 50%;
    }
    .hero-content h1 {
        font-size: 3rem;
    }
    .spotlight {
        display: none;
    }
}

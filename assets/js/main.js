/**
 * Main JavaScript for Real Estate Landing Page System
 * Handles property listing, filtering, and navigation
 */

// Configuration
const CONFIG = {
    whatsappNumber: '59173174612',
    defaultMessage: 'Hola, estoy interesado en una propiedad',
    propertyName: 'NovaMontero',
    propertiesFile: '../../data/properties.json'
};

// DOM Elements
const elements = {
    mobileMenuBtn: null,
    mobileMenu: null,
    propertiesGrid: null,
    filterButtons: null,
    loader: null,
    noResults: null,
    contactForm: null
};

// Properties Data
let properties = [];

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeEventListeners();
    loadProperties();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeParticles();
    initializeThemeToggle();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    elements.mobileMenu = document.getElementById('mobileMenu');
    elements.propertiesGrid = document.getElementById('propertiesGrid');
    elements.filterButtons = document.querySelectorAll('.filter-btn');
    elements.loader = document.getElementById('loader');
    elements.noResults = document.getElementById('noResults');
    elements.contactForm = document.getElementById('contactForm');
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Mobile menu toggle
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.mobileMenu.contains(e.target) && !elements.mobileMenuBtn.contains(e.target)) {
                elements.mobileMenu.classList.add('hidden');
            }
        });
    }

    // Filter buttons
    if (elements.filterButtons) {
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    }

    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Close mobile menu on link click
    const mobileLinks = elements.mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                elements.mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('hidden');
}

/**
 * Load properties data
 */
async function loadProperties() {
    showLoader();
    
    try {
        // Try to load from JSON file first
        const response = await fetch(CONFIG.propertiesFile);
        if (response.ok) {
            properties = await response.json();
        } else {
            // Fallback to sample data
            properties = getSampleProperties();
        }
    } catch (error) {
        console.warn('Could not load properties file, using sample data:', error);
        properties = getSampleProperties();
    }
    
    hideLoader();
    renderProperties(properties);
}

/**
 * Get sample properties data
 */
function getSampleProperties() {
    return [
        {
            id: 1,
            title: 'Casa Moderna en Residencial Las Flores',
            type: 'casa',
            location: 'Monterrey, Santa Cruz',
            price: 850000,
            priceFormatted: '$850,000 Bs',
            rooms: 4,
            bathrooms: 3,
            area: 280,
            parking: 2,
            image: 'assets/images/propiedad 1/principal.png',
            description: 'Hermosa casa moderna con acabados de lujo...',
            whatsappMessage: 'Hola, vi la Casa Moderna en Residencial Las Flores y estoy interesado'
        },
        {
            id: 2,
            title: 'Propiedad 2',
            type: 'casa',
            location: 'Monterrey, Santa Cruz',
            price: 650000,
            priceFormatted: '$650,000 Bs',
            rooms: 3,
            bathrooms: 2,
            area: 200,
            parking: 1,
            image: 'assets/images/propiedad 1/principal.png',
            description: 'Esta es la propiedad 2. Una hermosa casa en Monterrey.',
            whatsappMessage: 'Hola, vi la Propiedad 2 y estoy interesado'
        }
    ];
}

/**
 * Render properties to the grid
 */
function renderProperties(propertiesToRender) {
    if (!elements.propertiesGrid) return;
    
    if (propertiesToRender.length === 0) {
        elements.propertiesGrid.innerHTML = '';
        showNoResults();
        return;
    }
    
    hideNoResults();
    
    elements.propertiesGrid.innerHTML = propertiesToRender.map(property => createPropertyCard(property)).join('');
    
    // Add animation to cards
    const cards = elements.propertiesGrid.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fadeIn');
    });
}

/**
 * Create property card HTML
 */
function createPropertyCard(property) {
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(property.whatsappMessage || CONFIG.defaultMessage)}`;
    
    return `
        <div class="card property-card" data-type="${property.type}">
            <div class="relative overflow-hidden rounded-lg mb-4">
                <img src="${property.image}" alt="${property.title}" class="property-image w-full h-48 object-cover">
                <span class="property-badge">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
            </div>
            
            <div class="space-y-3">
                <h3 class="text-xl font-bold text-gray-800 line-clamp-2">${property.title}</h3>
                
                <p class="text-gray-600 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    ${property.location}
                </p>
                
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        ${property.rooms} Hab
                    </span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
                        </svg>
                        ${property.bathrooms} Baños
                    </span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                        </svg>
                        ${property.area} m²
                    </span>
                </div>
                
                <div class="pt-3 border-t border-gray-100">
                    <p class="property-price">${property.priceFormatted}</p>
                </div>
                
                <div class="flex gap-2">
                    <a href="propiedades/${property.id}/index.html" class="flex-1 bg-gold-400 text-black py-2 rounded-lg text-center font-medium hover:bg-gold-500 transition">
                        Ver Detalles
                    </a>
                    <a href="${whatsappUrl}" target="_blank" class="flex-1 bg-green-500 text-white py-2 rounded-lg text-center font-medium hover:bg-green-600 transition">
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Handle filter button click
 */
function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    
    // Update active button
    elements.filterButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-gold-400', 'text-black');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    e.target.classList.add('active', 'bg-gold-400', 'text-black');
    e.target.classList.remove('bg-gray-200', 'text-gray-700');
    
    // Filter properties
    const filteredProperties = filter === 'todos' 
        ? properties 
        : properties.filter(p => p.type === filter);
    
    renderProperties(filteredProperties);
}

/**
 * Handle contact form submission
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hola, soy ${name}. ${message}`;
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    e.target.reset();
    
    // Show success message
    showNotification('Mensaje enviado por WhatsApp', 'success');
}

/**
 * Show loader
 */
function showLoader() {
    if (elements.loader) {
        elements.loader.classList.remove('hidden');
    }
    if (elements.propertiesGrid) {
        elements.propertiesGrid.classList.add('hidden');
    }
}

/**
 * Hide loader
 */
function hideLoader() {
    if (elements.loader) {
        elements.loader.classList.add('hidden');
    }
    if (elements.propertiesGrid) {
        elements.propertiesGrid.classList.remove('hidden');
    }
}

/**
 * Show no results message
 */
function showNoResults() {
    if (elements.noResults) {
        elements.noResults.classList.remove('hidden');
    }
}

/**
 * Hide no results message
 */
function hideNoResults() {
    if (elements.noResults) {
        elements.noResults.classList.add('hidden');
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize gold particles animation
 */
function initializeParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            this.opacity += this.fadeDirection * 0.005;
            if (this.opacity >= 0.7 || this.opacity <= 0.1) {
                this.fadeDirection *= -1;
            }
            
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function createParticles() {
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

/**
 * Initialize theme toggle (dark/light mode)
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const sunIconMobile = document.getElementById('sunIconMobile');
    const moonIconMobile = document.getElementById('moonIconMobile');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    }
    
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
    }
    
    function updateIcons(isDark) {
        if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
        if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
        if (sunIconMobile) sunIconMobile.classList.toggle('hidden', !isDark);
        if (moonIconMobile) moonIconMobile.classList.toggle('hidden', isDark);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform translate-x-full ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-gold-400 text-black'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Format price to currency
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Generate QR Code URL
 */
function generateQRCodeUrl(url) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
}

// Export functions for use in property pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        formatPrice,
        generateQRCodeUrl
    };
}
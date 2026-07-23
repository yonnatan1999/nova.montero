/**
 * JavaScript for Individual Property Pages
 * Handles property data loading and display
 */

// Configuration
const CONFIG = {
    whatsappNumber: '59173174612',
    defaultMessage: 'Hola, vi esta propiedad y estoy interesado'
};

// DOM Elements
const elements = {
    heroImage: null,
    propertyType: null,
    propertyTitle: null,
    propertyLocation: null,
    propertyPrice: null,
    statRooms: null,
    statBathrooms: null,
    statArea: null,
    statParking: null,
    propertyDescription: null,
    propertyFeatures: null,
    propertyGallery: null,
    whatsappBtn: null,
    whatsappFloat: null,
    mobileMenuBtn: null,
    mobileMenu: null
};

// Property Data
let propertyData = null;

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    loadPropertyData();
    initializeEventListeners();
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
    elements.heroImage = document.getElementById('heroImage');
    elements.propertyType = document.getElementById('propertyType');
    elements.propertyTitle = document.getElementById('propertyTitle');
    elements.propertyLocation = document.getElementById('propertyLocation');
    elements.propertyPrice = document.getElementById('propertyPrice');
    elements.statRooms = document.getElementById('statRooms');
    elements.statBathrooms = document.getElementById('statBathrooms');
    elements.statArea = document.getElementById('statArea');
    elements.statParking = document.getElementById('statParking');
    elements.propertyDescription = document.getElementById('propertyDescription');
    elements.propertyFeatures = document.getElementById('propertyFeatures');
    elements.propertyGallery = document.getElementById('propertyGallery');
    elements.whatsappBtn = document.getElementById('whatsappBtn');
    elements.whatsappFloat = document.getElementById('whatsappFloat');
    elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    elements.mobileMenu = document.getElementById('mobileMenu');
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Mobile menu toggle
    if (elements.mobileMenuBtn && elements.mobileMenu) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.mobileMenu.contains(e.target) && !elements.mobileMenuBtn.contains(e.target)) {
                elements.mobileMenu.classList.add('hidden');
            }
        });
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
    
    // Theme toggle
    initializeThemeToggle();
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
 * Load property data from script or meta tags
 */
function loadPropertyData() {
    // Try to get data from page elements (placeholders replaced)
    propertyData = getPropertyFromPage();
    
    if (propertyData) {
        updatePageContent(propertyData);
        updateWhatsAppLinks(propertyData);
    }
}

/**
 * Get property data from page elements
 */
function getPropertyFromPage() {
    // Check if data attributes exist on body
    const body = document.body;
    
    if (body.dataset.property) {
        try {
            return JSON.parse(body.dataset.property);
        } catch (e) {
            console.warn('Could not parse property data from body:', e);
        }
    }
    
    // Try to extract from page content (placeholders)
    const title = elements.propertyTitle?.textContent;
    if (title && !title.includes('[')) {
        return {
            title: title,
            type: elements.propertyType?.textContent || 'propiedad',
            location: elements.propertyLocation?.textContent?.trim() || '',
            price: elements.propertyPrice?.textContent || '',
            rooms: elements.statRooms?.textContent || '0',
            bathrooms: elements.statBathrooms?.textContent || '0',
            area: elements.statArea?.textContent || '0',
            parking: elements.statParking?.textContent || '0',
            description: elements.propertyDescription?.innerHTML || '',
            imageUrl: elements.heroImage?.src || ''
        };
    }
    
    return null;
}

/**
 * Update page content with property data
 */
function updatePageContent(property) {
    // Update hero image
    if (elements.heroImage && property.imageUrl) {
        elements.heroImage.src = property.imageUrl;
        elements.heroImage.alt = property.title;
    }
    
    // Update meta tags
    updateMetaTags(property);
    
    // Update features if available
    if (property.features && elements.propertyFeatures) {
        renderFeatures(property.features);
    }
    
    // Update gallery if available
    if (property.gallery && elements.propertyGallery) {
        renderGallery(property.gallery);
    }
}

/**
 * Update meta tags for SEO
 */
function updateMetaTags(property) {
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (metaDescription) {
        metaDescription.content = `${property.description.substring(0, 160)} - ${property.location}`;
    }
    
    if (metaKeywords) {
        metaKeywords.content = `${property.type}, ${property.location}, venta, inmobiliaria, ${property.rooms} habitaciones`;
    }
    
    if (ogTitle) {
        ogTitle.content = property.title;
    }
    
    if (ogDescription) {
        ogDescription.content = property.description;
    }
    
    if (ogImage && property.imageUrl) {
        ogImage.content = property.imageUrl;
    }
}

/**
 * Update WhatsApp links with property info
 */
function updateWhatsAppLinks(property) {
    const message = property.whatsappMessage || 
        `Hola, vi "${property.title}" en venta por ${property.price} y estoy interesado. ¿Podría darme más información?`;
    
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Update main WhatsApp button
    if (elements.whatsappBtn) {
        elements.whatsappBtn.href = whatsappUrl;
    }
    
    // Update floating WhatsApp button
    if (elements.whatsappFloat) {
        elements.whatsappFloat.href = whatsappUrl;
    }
}

/**
 * Render features list
 */
function renderFeatures(features) {
    if (!elements.propertyFeatures) return;
    
    const featuresHtml = features.map(feature => `
        <div class="feature-item">
            <div class="feature-icon">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
            </div>
            <span class="feature-text">${feature}</span>
        </div>
    `).join('');
    
    elements.propertyFeatures.innerHTML = featuresHtml;
}

/**
 * Render gallery
 */
function renderGallery(gallery) {
    if (!elements.propertyGallery) return;
    
    const galleryHtml = gallery.map((image, index) => `
        <div class="gallery-item">
            <img src="${image.url}" alt="${image.alt || `Imagen ${index + 1}`}" loading="lazy">
            <div class="gallery-overlay">
                <span class="text-white font-medium">${image.alt || `Ver imagen ${index + 1}`}</span>
            </div>
        </div>
    `).join('');
    
    elements.propertyGallery.innerHTML = galleryHtml;
}

/**
 * Generate QR Code
 */
function generateQRCode(url) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
}

/**
 * Format price to currency
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Share property on social media
 */
function shareProperty(platform, property) {
    const url = window.location.href;
    const text = `Mira esta propiedad: ${property.title}`;
    
    let shareUrl;
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/**
 * Print property details
 */
function printProperty() {
    window.print();
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        formatPrice,
        generateQRCode,
        shareProperty,
        printProperty
    };
}
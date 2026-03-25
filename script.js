// script.js - ISP Landing Page (No Payment/Subscription - Focus on Inquiries)

// ========================
// Package Data (Display Only)
// ========================
const packagesData = {
    daily: [
        {
            name: "Daily Lite",
            price: "KES 50",
            speed: "5 Mbps",
            duration: "24 hours",
            features: ["Unlimited Data", "5 Mbps Speed", "24/7 Support", "Fair Usage Policy"]
        },
        {
            name: "Daily Turbo",
            price: "KES 100",
            speed: "10 Mbps",
            duration: "24 hours",
            features: ["Unlimited Data", "10 Mbps Speed", "Priority Support", "HD Streaming Ready"]
        },
        {
            name: "Daily Ultra",
            price: "KES 150",
            speed: "20 Mbps",
            duration: "24 hours",
            features: ["Unlimited Data", "20 Mbps Speed", "4K Streaming", "Premium Support"]
        }
    ],
    weekly: [
        {
            name: "Weekly Starter",
            price: "KES 300",
            speed: "10 Mbps",
            duration: "7 days",
            features: ["Unlimited Data", "10 Mbps Speed", "24/7 Support", "7 Days Validity"]
        },
        {
            name: "Weekly Pro",
            price: "KES 500",
            speed: "20 Mbps",
            duration: "7 days",
            features: ["Unlimited Data", "20 Mbps Speed", "Priority Support", "HD Streaming"]
        },
        {
            name: "Weekly Max",
            price: "KES 800",
            speed: "50 Mbps",
            duration: "7 days",
            features: ["Unlimited Data", "50 Mbps Speed", "4K Streaming", "Premium Support"]
        }
    ],
    monthly: [
        {
            name: "Monthly Basic",
            price: "KES 1,500",
            speed: "20 Mbps",
            duration: "30 days",
            features: ["Unlimited Data", "20 Mbps Speed", "Standard Support", "30 Days Validity"]
        },
        {
            name: "Monthly Turbo",
            price: "KES 2,500",
            speed: "50 Mbps",
            duration: "30 days",
            features: ["Unlimited Data", "50 Mbps Speed", "Priority Support", "Free Installation"]
        },
        {
            name: "Monthly Ultimate",
            price: "KES 4,000",
            speed: "100 Mbps",
            duration: "30 days",
            features: ["Unlimited Data", "100 Mbps Speed", "Premium 24/7 Support", "Static IP"]
        }
    ],
    yearly: [
        {
            name: "Yearly Essential",
            price: "KES 15,000",
            speed: "50 Mbps",
            duration: "365 days",
            features: ["Unlimited Data", "50 Mbps Speed", "2 Months Free", "Priority Support"]
        },
        {
            name: "Yearly Premium",
            price: "KES 25,000",
            speed: "100 Mbps",
            duration: "365 days",
            features: ["Unlimited Data", "100 Mbps Speed", "3 Months Free", "Premium Support"]
        },
        {
            name: "Yearly Business",
            price: "KES 45,000",
            speed: "500 Mbps",
            duration: "365 days",
            features: ["Unlimited Data", "500 Mbps Speed", "6 Months Free", "Dedicated Account Manager"]
        }
    ]
};

// ========================
// DOM Elements
// ========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const tabBtns = document.querySelectorAll('.tab-btn');
const packagesGrid = document.getElementById('packagesGrid');
const locationInput = document.getElementById('locationInput');
const checkCoverageBtn = document.getElementById('checkCoverageBtn');
const coverageResult = document.getElementById('coverageResult');
const heroViewPackages = document.getElementById('heroViewPackages');
const heroContactUs = document.getElementById('heroContactUs');
const closePromoBtn = document.getElementById('closePromoBtn');
const promoBanner = document.getElementById('promoBanner');
const whatsappCTA = document.getElementById('whatsappCTA');
const whatsappContact = document.getElementById('whatsappContact');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

// ========================
// Navigation & Mobile Menu
// ========================
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========================
// Smooth Scrolling for Navigation Links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80; // Height of sticky navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// Package Tab Switching & Rendering
// ========================
function renderPackages(planType) {
    const packages = packagesData[planType];
    if (!packages) return;

    packagesGrid.innerHTML = '';
    
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        card.innerHTML = `
            <h3>${pkg.name}</h3>
            <div class="price">${pkg.price}</div>
            <div class="speed"><i class="fas fa-tachometer-alt"></i> ${pkg.speed}</div>
            <div class="duration"><i class="far fa-clock"></i> ${pkg.duration}</div>
            <ul class="features">
                ${pkg.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>
            <button class="contact-btn" data-package-name="${pkg.name}" data-package-price="${pkg.price}">
                <i class="fas fa-headset"></i> Contact to Get Connected
            </button>
        `;
        packagesGrid.appendChild(card);
        
        // Add animation
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add event listeners to contact buttons
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packageName = btn.getAttribute('data-package-name');
            const packagePrice = btn.getAttribute('data-package-price');
            scrollToContactWithMessage(packageName, packagePrice);
        });
    });
}

// Function to scroll to contact section with pre-filled message intent
function scrollToContactWithMessage(packageName, packagePrice) {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offset = 80;
        const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Optional: Highlight or show a small notification
        setTimeout(() => {
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                const prefilledMessage = `Hi, I'm interested in the ${packageName} (${packagePrice}). Please help me get connected.`;
                formMessage.value = prefilledMessage;
                formMessage.focus();
                
                // Add a subtle highlight effect
                formMessage.style.border = '2px solid var(--primary)';
                setTimeout(() => {
                    formMessage.style.border = '';
                }, 2000);
            }
        }, 800);
    }
}

// Tab switching logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const planType = btn.getAttribute('data-plan');
        renderPackages(planType);
    });
});

// ========================
// Coverage Checker (Mock Logic)
// ========================
const coveredAreas = [
    'nairobi', 'nairobi cbd', 'westlands', 'kilimani', 'langata',
    'mombasa', 'nyali', 'bamburi', 'kisumu', 'nakuru', 'eldoret',
    'thika', 'kiambu', 'ruiru', 'athiriver', 'machakos'
];

function checkCoverage() {
    const location = locationInput.value.trim().toLowerCase();
    
    if (location === "") {
        coverageResult.innerHTML = '<span style="color: var(--warning);"><i class="fas fa-exclamation-triangle"></i> Please enter a location to check coverage.</span>';
        coverageResult.style.animation = 'fadeIn 0.3s ease';
        return;
    }
    
    // Mock logic: Check if location matches any covered area
    const isCovered = coveredAreas.some(area => location.includes(area));
    
    if (isCovered) {
        coverageResult.innerHTML = `
            <span style="color: var(--success);">
                <i class="fas fa-check-circle"></i> ✅ Great news! NexusWave is available in ${locationInput.value.trim()}!
            </span>
            <br><small style="color: var(--gray-text);">Contact us to get connected within 24 hours.</small>
        `;
    } else {
        coverageResult.innerHTML = `
            <span style="color: var(--warning);">
                <i class="fas fa-map-marked-alt"></i> We're expanding to ${locationInput.value.trim()} soon!
            </span>
            <br><small style="color: var(--gray-text);">Contact us to confirm coverage or request early access.</small>
        `;
    }
    
    // Add animation
    coverageResult.style.animation = 'none';
    setTimeout(() => {
        coverageResult.style.animation = 'fadeIn 0.3s ease';
    }, 10);
}

if (checkCoverageBtn) {
    checkCoverageBtn.addEventListener('click', checkCoverage);
}

if (locationInput) {
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCoverage();
    });
}

// ========================
// Hero Buttons Actions
// ========================
if (heroViewPackages) {
    heroViewPackages.addEventListener('click', () => {
        document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    });
}

if (heroContactUs) {
    heroContactUs.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========================
// WhatsApp Links (Simulated)
// ========================
function setupWhatsAppLinks() {
    const phoneNumber = '254700123456';
    const whatsappMessage = encodeURIComponent('Hi! I\'m interested in NexusWave internet services. Please help me get connected.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    
    const whatsappElements = [whatsappCTA, whatsappContact];
    whatsappElements.forEach(elem => {
        if (elem) {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                // Open WhatsApp in new window (simulated alert for demo)
                alert(`📱 WhatsApp: +254700123456\n\nClick OK to continue to WhatsApp chat.\n\nMessage: "Hi! I'm interested in NexusWave internet services."`);
                // In production, you would use: window.open(whatsappUrl, '_blank');
                // For demo, we show alert to avoid actual redirect
            });
        }
    });
}

// ========================
// Contact Form Validation & Submission (Frontend Only)
// ========================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('formName')?.value.trim();
        const email = document.getElementById('formEmail')?.value.trim();
        const phone = document.getElementById('formPhone')?.value.trim();
        const message = document.getElementById('formMessage')?.value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            formFeedback.innerHTML = '<span style="color: var(--warning);"><i class="fas fa-exclamation-circle"></i> Please fill in all required fields (Name, Email, Message).</span>';
            formFeedback.style.color = 'var(--warning)';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formFeedback.innerHTML = '<span style="color: var(--warning);"><i class="fas fa-envelope"></i> Please enter a valid email address.</span>';
            return;
        }
        
        // Phone validation (optional but if provided, validate)
        if (phone && !/^(\+?254|0)[17]\d{8}$/.test(phone)) {
            formFeedback.innerHTML = '<span style="color: var(--warning);"><i class="fas fa-phone-alt"></i> Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678).</span>';
            return;
        }
        
        // Simulate form submission
        formFeedback.innerHTML = '<span style="color: var(--success);"><i class="fas fa-check-circle"></i> ✓ Thank you! Our team will contact you within 24 hours.</span>';
        formFeedback.style.color = 'var(--success)';
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            formFeedback.innerHTML = '';
        }, 5000);
    });
}

// ========================
// Promo Banner Close
// ========================
if (closePromoBtn && promoBanner) {
    closePromoBtn.addEventListener('click', () => {
        promoBanner.style.display = 'none';
    });
}

// ========================
// Dark Mode Toggle (Optional Enhancement)
// ========================
// Create dark mode toggle button in navbar
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.background = 'none';
darkModeToggle.style.border = 'none';
darkModeToggle.style.color = 'var(--light-text)';
darkModeToggle.style.fontSize = '1.2rem';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.marginLeft = '1rem';
darkModeToggle.style.padding = '8px';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.transition = 'all 0.3s';

// Insert dark mode toggle next to hamburger
const navContainer = document.querySelector('.nav-container');
if (navContainer && !document.querySelector('.dark-mode-toggle')) {
    const rightSection = document.createElement('div');
    rightSection.style.display = 'flex';
    rightSection.style.alignItems = 'center';
    rightSection.style.gap = '1rem';
    rightSection.appendChild(darkModeToggle);
    navContainer.appendChild(rightSection);
}

let isDarkMode = true; // Dark mode is default

darkModeToggle.addEventListener('click', () => {
    if (isDarkMode) {
        // Switch to light mode
        document.documentElement.style.setProperty('--dark-bg', '#f8fafc');
        document.documentElement.style.setProperty('--dark-surface', '#ffffff');
        document.documentElement.style.setProperty('--light-text', '#0f172a');
        document.documentElement.style.setProperty('--gray-text', '#475569');
        document.documentElement.style.setProperty('--card-bg', 'rgba(241, 245, 249, 0.9)');
        document.documentElement.style.setProperty('--border-color', 'rgba(6, 182, 212, 0.2)');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDarkMode = false;
    } else {
        // Switch back to dark mode
        document.documentElement.style.setProperty('--dark-bg', '#0f172a');
        document.documentElement.style.setProperty('--dark-surface', '#1e293b');
        document.documentElement.style.setProperty('--light-text', '#f1f5f9');
        document.documentElement.style.setProperty('--gray-text', '#94a3b8');
        document.documentElement.style.setProperty('--card-bg', 'rgba(30, 41, 59, 0.7)');
        document.documentElement.style.setProperty('--border-color', 'rgba(6, 182, 212, 0.3)');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        isDarkMode = true;
    }
});

// ========================
// Scroll Animations (Optional)
// ========================
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ========================
// Initialize
// ========================
function init() {
    renderPackages('monthly');
    setupWhatsAppLinks();
    
    // Set default coverage result message
    if (coverageResult) {
        coverageResult.innerHTML = '<span style="color: var(--gray-text);"><i class="fas fa-map-marker-alt"></i> Enter your location to check coverage availability</span>';
    }
    
    // Add active class to current nav link based on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom && id) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add active class style
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Optional: Initialize scroll animations after a short delay
    setTimeout(() => {
        handleScrollAnimations();
    }, 500);
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
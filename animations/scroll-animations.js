// Animations au scroll pour H-Link

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les animations
    initScrollAnimations();
    initHeaderScroll();
    initScrollIndicator();
    initScrollToTop();
    initCustomCursor();
    initFAQToggle();
    initNumberCounter();
    
    // Ajouter automatiquement des classes d'animation aux éléments communs
    autoAddAnimationClasses();
});

// Fonction pour ajouter automatiquement des classes d'animation aux éléments communs
function autoAddAnimationClasses() {
    // Sélectionner les éléments de section header
    document.querySelectorAll('.section-header h2').forEach((el, index) => {
        if (!el.classList.contains('animate')) {
            el.classList.add('animate', 'fade-up');
        }
    });
    
    document.querySelectorAll('.section-header p').forEach((el, index) => {
        if (!el.classList.contains('animate')) {
            el.classList.add('animate', 'fade-up', 'delay-200');
        }
    });
    
    // Animer les cartes et éléments de contenu
    const contentElements = [
        { selector: '.feature-card', animation: 'fade-up', baseDelay: 300 },
        { selector: '.plan-card', animation: 'fade-up', baseDelay: 300 },
        { selector: '.step', animation: 'fade-up', baseDelay: 300 },
        { selector: '.testimonial', animation: 'fade-up', baseDelay: 300 },
        { selector: '.faq-item', animation: 'fade-right', baseDelay: 300 },
        { selector: '.contact-info .info-item', animation: 'fade-right', baseDelay: 300 },
        { selector: '.form-group', animation: 'fade-up', baseDelay: 300 },
        { selector: '.map-container', animation: 'scale-up', baseDelay: 400 },
        { selector: '.cta-content', animation: 'scale-up', baseDelay: 0 }
    ];
    
    contentElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach((el, index) => {
            if (!el.classList.contains('animate')) {
                el.classList.add('animate', item.animation);
                // Ajouter un délai progressif
                const delay = item.baseDelay + (index * 100);
                if (delay <= 800) { // Limiter le délai maximum à 800ms
                    el.classList.add(`delay-${delay}`);
                }
            }
        });
    });
}

// Fonction pour initialiser les animations au scroll
function initScrollAnimations() {
    // Sélectionner tous les éléments avec la classe 'animate'
    const animatedElements = document.querySelectorAll('.animate');
    
    // Observer les éléments
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est visible
            if (entry.isIntersecting) {
                // Ajouter la classe 'animated'
                entry.target.classList.add('animated');
                // Arrêter d'observer l'élément
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Déclencher lorsque 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px' // Déclencher un peu avant que l'élément soit visible
    });
    
    // Observer chaque élément
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Fonction pour animer le header au scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Fonction pour initialiser l'indicateur de scroll
function initScrollIndicator() {
    // Vérifier si l'indicateur existe déjà
    if (!document.querySelector('.scroll-indicator')) {
        // Créer l'élément indicateur
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
    }
    
    // Mettre à jour l'indicateur au scroll
    window.addEventListener('scroll', () => {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            indicator.style.width = scrolled + '%';
        }
    });
}

// Fonction pour initialiser le bouton de retour en haut
function initScrollToTop() {
    // Vérifier si le bouton existe déjà
    if (!document.querySelector('.scroll-top')) {
        // Créer le bouton
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
    }
    
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Action au clic
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour initialiser le curseur personnalisé
function initCustomCursor() {
    // Vérifier si le curseur existe déjà
    if (!document.querySelector('.custom-cursor')) {
        // Créer l'élément curseur
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        // Suivre le mouvement de la souris
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Effet au clic
        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
        
        // Effet au survol des liens et boutons
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .plan-card, .faq-item, .social-links a');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
}

// Fonction pour initialiser les toggles FAQ
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const toggle = otherItem.querySelector('.faq-toggle i');
                        if (toggle) {
                            toggle.className = 'fas fa-plus';
                        }
                    }
                });
                
                // Toggle l'item actuel
                item.classList.toggle('active');
                const toggle = item.querySelector('.faq-toggle i');
                if (toggle) {
                    toggle.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
                }
            });
        }
    });
}

// Fonction pour animer les compteurs de chiffres
function initNumberCounter() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 secondes
                    const step = target / (duration / 16); // 60 FPS
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        counter.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}
// Définir le contenu du header directement dans le JavaScript
const headerTemplate = `
<header>
    <div class="container">
        <div class="logo-text">
            <h1>H-LINK</h1>
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link" data-page="index">Accueil</a></li>
                <li><a href="forfaits/forfaits.html" class="nav-link" data-page="forfaits">Nos Forfaits</a></li>
                <li><a href="comment-ca-marche/comment-ca-marche.html" class="nav-link" data-page="comment-ca-marche">Comment ça marche</a></li>
                <li><a href="professionnel/professionnel.html" class="nav-link" data-page="professionnel">Professionnel</a></li>
                <li><a href="contact/contact.html" class="nav-link" data-page="contact">Contact</a></li>
                <li><a href="compte/compte.html" class="nav-link" data-page="compte">Compte</a></li>
            </ul>
        </nav>
        <!-- Bouton de basculement de thème -->
        <button id="theme-toggle" class="theme-toggle" onclick="toggleTheme()">
            <i id="theme-icon" class="fas fa-moon"></i>
            <span id="theme-text">Mode nuit</span>
        </button>
        <div class="burger-menu">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </div>
</header>
`;

// Définir le contenu du footer directement dans le JavaScript
const footerTemplate = `
<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-logo">
                <h2>H-LINK</h2>
                <p>Internet haut débit pour étudiants</p>
            </div>
            <div class="footer-links">
                <h3>Navigation</h3>
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="forfaits/forfaits.html">Nos Forfaits</a></li>
                    <li><a href="comment-ca-marche/comment-ca-marche.html">Comment ça marche</a></li>
                    <li><a href="contact/contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h3>Informations</h3>
                <ul>
                    <li><a href="a-propos/a-propos.html">À propos de nous</a></li>
                    <li><a href="conditions/conditions.html">Conditions générales</a></li>
                    <li><a href="confidentialite/confidentialite.html">Politique de confidentialité</a></li>
                    <li><a href="mentions-legales/mentions-legales.html">Mentions légales</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h3>Contact</h3>
                <p><i class="fas fa-map-marker-alt"></i> 123 Avenue des Étudiants, 75000 Paris</p>
                <p><i class="fas fa-phone"></i> 01 23 45 67 89</p>
                <p><i class="fas fa-envelope"></i> contact@h-link.fr</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 H-Link. Tous droits réservés.</p>
        </div>
    </div>
</footer>

<!-- Éléments d'animation globaux -->
<div class="scroll-indicator"></div>
<div class="scroll-top">
    <i class="fas fa-arrow-up"></i>
</div>
`;

// Fonction pour insérer le header et le footer
function insertHeaderAndFooter() {
    // Insérer le header
    const headerElement = document.getElementById('header');
    if (headerElement) {
        headerElement.innerHTML = headerTemplate;
    }
    
    // Insérer le footer
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerTemplate;
    }
    
    // Corriger les chemins des liens
    fixLinks();
    
    // Activer le lien correspondant à la page actuelle
    activateCurrentLink();
    
    // Initialiser le menu burger
    initBurgerMenu();
    
    // Ajouter les fichiers CSS et JS d'animation s'ils ne sont pas déjà présents
    addAnimationResources();
}

// Fonction pour ajouter les ressources d'animation
function addAnimationResources() {
    // Ajouter le CSS d'animation s'il n'est pas déjà présent
    if (!document.querySelector('link[href*="animations.css"]')) {
        const animationCSS = document.createElement('link');
        animationCSS.rel = 'stylesheet';
        animationCSS.href = getPathToRoot() + 'animations/animations.css';
        document.head.appendChild(animationCSS);
    }
    
    // Ajouter le JS d'animation s'il n'est pas déjà présent
    if (!document.querySelector('script[src*="scroll-animations.js"]')) {
        const animationJS = document.createElement('script');
        animationJS.src = getPathToRoot() + 'animations/scroll-animations.js';
        document.body.appendChild(animationJS);
    }
}

// Fonction pour corriger les chemins des liens
function fixLinks() {
    // Obtenir le chemin relatif vers la racine
    const pathToRoot = getPathToRoot();
    
    // Sélectionner tous les liens dans le header et le footer
    const links = document.querySelectorAll('#header a, #footer a');
    
    // Parcourir tous les liens et corriger les chemins
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Ne pas modifier les liens externes ou les ancres
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            // Si nous ne sommes pas à la racine, ajuster le chemin
            if (pathToRoot !== './') {
                // Si le lien ne contient pas déjà le chemin relatif
                if (!href.startsWith('../') && !href.startsWith('./')) {
                    link.setAttribute('href', pathToRoot + href);
                }
            }
        }
    });
}

// Fonction pour déterminer le chemin relatif vers la racine
function getPathToRoot() {
    // Récupérer le chemin de la page actuelle
    const path = window.location.pathname;
    
    // Compter le nombre de segments dans le chemin (après le domaine)
    const segments = path.split('/').filter(segment => segment !== '');
    
    // Si nous sommes à la racine ou dans un fichier à la racine
    if (segments.length <= 1) {
        return './';
    }
    
    // Sinon, remonter d'autant de niveaux que nécessaire
    return '../'.repeat(segments.length - 1);
}

// Fonction pour activer le lien correspondant à la page actuelle
function activateCurrentLink() {
    // Récupérer le chemin de la page actuelle
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Parcourir les liens et activer celui qui correspond à la page actuelle
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Extraire le nom de fichier du href
        const hrefPage = href.split('/').pop();
        
        // Vérifier si le nom de fichier correspond à la page actuelle
        if (hrefPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && (href === './' || href === '../' || href.endsWith('index.html'))) {
            // Cas spécial pour la page d'accueil
            link.classList.add('active');
        }
    });
}

// Fonction pour initialiser le menu burger
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
        });
    }
}

// Exécuter la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', insertHeaderAndFooter);
// Fonction pour basculer entre les thèmes clair et sombre
function toggleTheme() {
    // Basculer la classe dark-theme sur l'élément racine (html)
    document.documentElement.classList.toggle("dark-theme")

    // Mettre à jour l'icône et le texte du bouton
    updateThemeToggle()

    // Sauvegarder la préférence dans localStorage
    const isDarkTheme = document.documentElement.classList.contains("dark-theme")
    localStorage.setItem("darkTheme", isDarkTheme ? "dark" : "light")
}

// Fonction pour mettre à jour l'icône et le texte du bouton
function updateThemeToggle() {
    const themeIcon = document.getElementById("theme-icon")
    const themeText = document.getElementById("theme-text")

    if (document.documentElement.classList.contains("dark-theme")) {
        themeIcon.className = "fas fa-sun"
        themeText.textContent = "Mode clair"
    } else {
        themeIcon.className = "fas fa-moon"
        themeText.textContent = "Mode nuit"
    }
}

// Fonction pour initialiser le thème au chargement de la page
function initTheme() {
    // Vérifier s'il y a une préférence sauvegardée
    const savedTheme = localStorage.getItem("darkTheme")

    if (savedTheme === "dark") {
        // Appliquer le thème sombre
        document.documentElement.classList.add("dark-theme")
    } else if (savedTheme === null) {
        // Si pas de préférence sauvegardée, vérifier la préférence système
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

        if (prefersDarkScheme.matches) {
            document.documentElement.classList.add("dark-theme")
        }
    }

    // Mettre à jour l'icône et le texte du bouton
    updateThemeToggle()
}

// Exécuter initTheme au chargement de la page
document.addEventListener("DOMContentLoaded", initTheme)

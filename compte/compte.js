// Script pour la page Compte

document.addEventListener("DOMContentLoaded", () => {
    // Gestion des onglets du tableau de bord
    const navLinks = document.querySelectorAll(".dashboard-nav a")
    const sections = document.querySelectorAll(".dashboard-section")

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            // Récupérer l'ID de la section à afficher
            const targetId = this.getAttribute("href").substring(1)

            // Masquer toutes les sections
            sections.forEach((section) => {
                section.classList.remove("active")
            })

            // Afficher la section cible
            document.getElementById(targetId).classList.add("active")

            // Mettre à jour la classe active dans la navigation
            navLinks.forEach((navLink) => {
                navLink.parentElement.classList.remove("active")
            })
            this.parentElement.classList.add("active")
        })
    })

    // Gestion des éléments FAQ
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")

        question.addEventListener("click", function () {
            // Toggle la classe active sur l'élément FAQ
            item.classList.toggle("active")

            // Changer l'icône
            const icon = this.querySelector(".faq-toggle i")
            if (item.classList.contains("active")) {
                icon.className = "fas fa-minus"
            } else {
                icon.className = "fas fa-plus"
            }
        })
    })

    // Simulation de données pour le graphique d'utilisation
    const usageChart = document.querySelector(".chart-fill")
    if (usageChart) {
        // Simuler une mise à jour périodique de l'utilisation
        setInterval(() => {
            const randomUsage = Math.floor(Math.random() * 10) + 60 // Entre 60% et 70%
            usageChart.style.width = `${randomUsage}%`

            const usageText = document.querySelector(".chart-info strong")
            if (usageText) {
                usageText.textContent = `${randomUsage}%`
            }
        }, 10000) // Mise à jour toutes les 10 secondes
    }

    // Gestion du formulaire de profil
    const profileForm = document.querySelector(".profile-form")
    if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Simuler une sauvegarde réussie
            alert("Vos modifications ont été enregistrées avec succès !")
        })
    }
})

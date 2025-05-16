// Script pour le menu burger
document.querySelector('.burger-menu').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('nav-active');
    document.querySelector('.burger-menu').classList.toggle('toggle');
});

// Script pour les FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Fermer tous les items actifs
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
            faqItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
        });

        // Si l'item n'était pas actif, l'ouvrir
        if (!isActive) {
            item.classList.add('active');
            question.querySelector('.faq-toggle i').className = 'fas fa-minus';
        }
    });
});

// Script pour le filtre des forfaits
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');

        // Filtrer les forfaits
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.plan-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

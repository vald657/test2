// eligibility-form.js

// Configuration EmailJS
const EMAILJS_USER_ID = "service_ub7xt8f"; // Remplacez par votre ID utilisateur EmailJS
const EMAILJS_SERVICE_ID = "service_ub7xt8f"; // Remplacez par votre ID de service
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Remplacez par votre ID de template

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser EmailJS
    emailjs.init(EMAILJS_USER_ID);
    
    // Récupérer le formulaire
    const eligibilityForm = document.querySelector('.eligibility-form form');
    
    // Ajouter un écouteur d'événement pour la soumission du formulaire
    eligibilityForm.addEventListener('submit', handleFormSubmit);
    
    // Prévisualisation de l'image
    const fileInput = document.getElementById('student-card');
    const fileLabel = document.querySelector('.file-label');
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Créer un aperçu de l'image
            const reader = new FileReader();
            reader.onload = function(event) {
                // Créer un élément d'aperçu s'il n'existe pas déjà
                let previewElement = document.querySelector('.file-preview');
                if (!previewElement) {
                    previewElement = document.createElement('div');
                    previewElement.className = 'file-preview';
                    fileLabel.parentNode.insertBefore(previewElement, fileLabel.nextSibling);
                }
                
                // Mettre à jour l'aperçu
                previewElement.innerHTML = `
                    <div class="preview-container">
                        <img src="${event.target.result}" alt="Aperçu de la localisation">
                        <span class="file-name">${file.name}</span>
                    </div>
                `;
                
                // Mettre à jour le texte du label
                fileLabel.innerHTML = '<i class="fas fa-check"></i> Image téléchargée';
                fileLabel.classList.add('file-uploaded');
            };
            reader.readAsDataURL(file);
        }
    });
});

// Fonction pour gérer la soumission du formulaire
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Afficher un indicateur de chargement
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    try {
        // Récupérer les données du formulaire
        const address = document.getElementById('address').value;
        const fileInput = document.getElementById('student-card');
        const file = fileInput.files[0];
        
        if (!file) {
            throw new Error('Veuillez télécharger une image de localisation');
        }
        
        // Convertir l'image en base64
        const base64Image = await convertFileToBase64(file);
        
        // Préparer les données pour EmailJS
        const templateParams = {
            address: address,
            image_name: file.name,
            image_data: base64Image,
            to_email: 'h0rbyvkj@anonaddy.com' // L'adresse email de destination
        };
        
        // Envoyer l'email
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        
        // Afficher un message de succès
        showNotification('Votre demande a été envoyée avec succès! Nous vérifierons votre éligibilité et vous contacterons rapidement.', 'success');
        
        // Réinitialiser le formulaire
        e.target.reset();
        const previewElement = document.querySelector('.file-preview');
        if (previewElement) {
            previewElement.remove();
        }
        
        // Réinitialiser le label du fichier
        const fileLabel = document.querySelector('.file-label');
        fileLabel.innerHTML = '<i class="fas fa-upload"></i> Télécharger la localisation du logement';
        fileLabel.classList.remove('file-uploaded');
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        showNotification(error.message || 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.', 'error');
    } finally {
        // Restaurer le bouton
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

// Fonction pour convertir un fichier en base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Obtenir uniquement la partie base64
        reader.onerror = error => reject(error);
    });
}

// Fonction pour afficher une notification
function showNotification(message, type) {
    // Créer l'élément de notification s'il n'existe pas déjà
    let notificationElement = document.getElementById('notification');
    if (!notificationElement) {
        notificationElement = document.createElement('div');
        notificationElement.id = 'notification';
        document.body.appendChild(notificationElement);
    }
    
    // Définir le contenu et la classe
    notificationElement.textContent = message;
    notificationElement.className = `notification ${type}`;
    
    // Afficher la notification
    notificationElement.classList.add('show');
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 5000);
}
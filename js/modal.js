// Modal functionality for promotions
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.createElement('div');
    modal.className = 'promo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="modal-title">Promoción Especial</h3>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image-container">
                    <img src="" alt="Promoción" class="modal-image" id="modal-image">
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Promotion data
    const promotions = [
        {
            id: 1,
            title: 'Paquete Completo',
            image: 'images/promo_web.jpeg',
            description: 'Sesión completa de depilación láser en zona completa con productos post-tratamiento incluidos. Ideal para quienes buscan resultados duraderos.',
            originalPrice: '$150.000',
            currentPrice: '$105.000'
        },
        {
            id: 2,
            title: 'Tratamiento Facial',
            image: 'images/promo 2_web.jpeg',
            description: 'Depilación facial completa con tecnología avanzada y sesión de hidratación post-tratamiento. Perfecto para un rostro perfecto.',
            originalPrice: '$80.000',
            currentPrice: '$60.000'
        },
        {
            id: 3,
            title: 'Zonas Corporales',
            image: 'images/promo 3_web.jpeg',
            description: 'Tratamiento para piernas completas y brazos con tecnología láser de última generación. Resultados visibles desde la primera sesión.',
            originalPrice: '$120.000',
            currentPrice: '$72.000'
        },
        {
            id: 4,
            title: 'Sesión Express',
            image: 'images/promo 4_web.jpeg',
            description: 'Tratamiento rápido para zonas pequeñas con resultados inmediatos y duraderos. Ideal para mantenimiento mensual.',
            originalPrice: '$50.000',
            currentPrice: '$40.000'
        }
    ];
    
    // Get modal elements
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    
    // Add click events to promo cards
    document.querySelectorAll('.promo-card').forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on the CTA button
            if (e.target.classList.contains('promo-cta')) {
                return;
            }
            
            const promo = promotions[index];
            if (promo) {
                openModal(promo);
            }
        });
    });
    
    // Open modal function
    function openModal(promo) {
        modalTitle.textContent = promo.title;
        modalImage.src = promo.image;
        modalImage.alt = promo.title;
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Add hover effect to promo cards
    document.querySelectorAll('.promo-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

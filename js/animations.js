// Animación para las tarjetas de servicios
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del observador de intersección
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar la animación cuando el elemento es visible
                if (entry.target.classList.contains('left-card')) {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                } else if (entry.target.classList.contains('right-card')) {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }
                // Dejar de observar una vez que se ha mostrado la animación
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Añadir clase al hacer scroll para activar animaciones
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                if (card.classList.contains('left-card')) {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                } else if (card.classList.contains('right-card')) {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }
            }
        });
    });
});
